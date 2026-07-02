import re
import asyncio
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import requests
from typing import List, Dict
from playwright.async_api import async_playwright

class WebsiteCrawler:
    @staticmethod
    def is_valid_url(url: str, base_domain: str) -> bool:
        try:
            parsed = urlparse(url)
            return parsed.netloc == base_domain or parsed.netloc == f"www.{base_domain}"
        except Exception:
            return False

    @classmethod
    def get_links(cls, base_url: str, html: str) -> List[str]:
        soup = BeautifulSoup(html, "html.parser")
        base_domain = urlparse(base_url).netloc.replace("www.", "")
        links = []
        
        # Prioritize: Home, About, Services, Products, Mission, Vision, Values, FAQ, Blog, Contact
        important_keywords = ["about", "service", "product", "mission", "vision", "value", "faq", "blog", "contact"]
        
        for anchor in soup.find_all("a", href=True):
            href = anchor["href"]
            resolved = urljoin(base_url, href)
            resolved_clean = resolved.split("#")[0]
            
            if cls.is_valid_url(resolved_clean, base_domain):
                path = urlparse(resolved_clean).path.lower()
                is_important = any(kw in path for kw in important_keywords) or path in ["", "/", "/index.html"]
                if is_important and resolved_clean not in links:
                    links.append(resolved_clean)
                    
        return links[:8]

    @staticmethod
    def extract_clean_text(html: str) -> str:
        soup = BeautifulSoup(html, "html.parser")
        
        # Remove scripts, styles, headers, footers, navigation, cookie banners, advertisements
        tags_to_remove = ["script", "style", "noscript", "iframe", "header", "footer", "nav", "aside"]
        for element in soup(tags_to_remove):
            element.decompose()
            
        unwanted_patterns = ["nav", "navigation", "footer", "header", "cookie", "banner", "menu", "ad", "ads", "advertisement", "popup"]
        for pattern in unwanted_patterns:
            for element in soup.find_all(attrs={"class": re.compile(rf"\b{pattern}\b", re.I)}):
                element.decompose()
            for element in soup.find_all(attrs={"id": re.compile(rf"\b{pattern}\b", re.I)}):
                element.decompose()

        text_elements = soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "span"])
        lines = []
        for el in text_elements:
            text = el.get_text(strip=True)
            if len(text) > 8:
                lines.append(text)
                
        seen = set()
        clean_lines = []
        for line in lines:
            if line not in seen:
                seen.add(line)
                clean_lines.append(line)
                
        return " ".join(clean_lines)

    @classmethod
    async def crawl_with_playwright(cls, start_url: str) -> Dict[str, str]:
        crawled_data = {}
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            try:
                await page.goto(start_url, wait_until="networkidle", timeout=15000)
                main_html = await page.content()
                crawled_data[start_url] = cls.extract_clean_text(main_html)
                
                links = cls.get_links(start_url, main_html)
                for link in links:
                    if link != start_url and link not in crawled_data:
                        try:
                            await page.goto(link, wait_until="networkidle", timeout=10000)
                            link_html = await page.content()
                            crawled_data[link] = cls.extract_clean_text(link_html)
                        except Exception as sub_err:
                            print(f"Playwright subpage crawl error on {link}: {sub_err}")
                            try:
                                fallback_text = cls.crawl_with_requests_page(link)
                                if fallback_text:
                                    crawled_data[link] = fallback_text
                            except Exception:
                                pass
            finally:
                await browser.close()
        return crawled_data

    @classmethod
    def crawl_with_requests_page(cls, url: str) -> str:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        res = requests.get(url, headers=headers, timeout=5)
        if res.status_code == 200:
            return cls.extract_clean_text(res.text)
        return ""

    @classmethod
    def crawl_with_requests_fallback(cls, start_url: str) -> Dict[str, str]:
        crawled_data = {}
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        try:
            res = requests.get(start_url, headers=headers, timeout=10)
            if res.status_code != 200:
                return {}
            
            main_html = res.text
            crawled_data[start_url] = cls.extract_clean_text(main_html)
            
            links = cls.get_links(start_url, main_html)
            for link in links:
                if link != start_url and link not in crawled_data:
                    try:
                        sub_res = requests.get(link, headers=headers, timeout=5)
                        if sub_res.status_code == 200:
                            crawled_data[link] = cls.extract_clean_text(sub_res.text)
                    except Exception:
                        continue
        except Exception as e:
            print(f"Requests crawler fallback failed: {e}")
        return crawled_data

    @classmethod
    async def crawl_website(cls, start_url: str) -> Dict[str, str]:
        try:
            print(f"Attempting to crawl {start_url} with Playwright...")
            return await cls.crawl_with_playwright(start_url)
        except Exception as e:
            print(f"Playwright crawler failed: {e}. Falling back to requests + BeautifulSoup...")
            loop = asyncio.get_running_loop()
            return await loop.run_in_executor(None, cls.crawl_with_requests_fallback, start_url)
