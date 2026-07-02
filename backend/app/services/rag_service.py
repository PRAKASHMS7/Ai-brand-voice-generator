import hashlib
import time
from urllib.parse import urlparse
from typing import List, Dict, Any, Set
from .website_crawler import WebsiteCrawler
from .pdf_parser import PDFParser
from .docx_parser import DOCXParser
from .chunker import Chunker
from .embeddings import EmbeddingGenerator
from .vector_store import ChromaVectorStore
from .retriever import Retriever

class RAGService:
    def __init__(self):
        self.embeddings = EmbeddingGenerator()
        self.vector_store = ChromaVectorStore()
        self.retriever = Retriever(self.vector_store, self.embeddings)
        
        self.source_cache: Dict[str, Dict[str, Any]] = {}
        self.indexed_sources: Set[str] = set()

    def _get_hash(self, content: bytes) -> str:
        return hashlib.md5(content).hexdigest()

    async def index_website(self, brand_name: str, url: str) -> int:
        if not url:
            return 0
            
        if url in self.indexed_sources:
            return len(self.source_cache[url]["chunks"])

        if url in self.source_cache:
            cache = self.source_cache[url]
            self.vector_store.add_chunks(
                ids=cache["ids"],
                documents=cache["chunks"],
                embeddings=cache["embeddings"],
                metadatas=cache["metadatas"]
            )
            self.indexed_sources.add(url)
            return len(cache["chunks"])

        crawled_pages = await WebsiteCrawler.crawl_website(url)
        all_chunks_data = []
        
        for page_url, clean_text in crawled_pages.items():
            if not clean_text.strip():
                continue
            chunks = Chunker.split_text(clean_text)
            
            for idx, chunk in enumerate(chunks):
                chunk_id = f"web_{hashlib.md5(page_url.encode('utf-8')).hexdigest()}_{idx}"
                all_chunks_data.append({
                    "id": chunk_id,
                    "chunk": chunk,
                    "metadata": {
                        "brandName": brand_name,
                        "sourceType": "website",
                        "sourceFile": "",
                        "pageNumber": 1,
                        "url": page_url,
                        "chunkId": chunk_id,
                        "createdAt": str(int(time.time()))
                    }
                })

        if not all_chunks_data:
            return 0

        ids = [item["id"] for item in all_chunks_data]
        chunks = [item["chunk"] for item in all_chunks_data]
        metadatas = [item["metadata"] for item in all_chunks_data]
        
        embeddings_list = self.embeddings.generate_embeddings(chunks)
        self.vector_store.add_chunks(ids, chunks, embeddings_list, metadatas)
        
        self.source_cache[url] = {
            "ids": ids,
            "chunks": chunks,
            "embeddings": embeddings_list,
            "metadatas": metadatas
        }
        self.indexed_sources.add(url)
        return len(chunks)

    def index_file(self, brand_name: str, filename: str, content: bytes) -> int:
        file_hash = self._get_hash(content)
        if file_hash in self.indexed_sources:
            return len(self.source_cache[file_hash]["chunks"])

        if file_hash in self.source_cache:
            cache = self.source_cache[file_hash]
            self.vector_store.add_chunks(
                ids=cache["ids"],
                documents=cache["chunks"],
                embeddings=cache["embeddings"],
                metadatas=cache["metadatas"]
            )
            self.indexed_sources.add(file_hash)
            return len(cache["chunks"])

        ext = filename.split(".")[-1].lower()
        all_chunks_data = []

        if ext == "pdf":
            pages = PDFParser.extract_pages(content)
            chunk_idx = 0
            for page in pages:
                page_text = page["text"]
                page_num = page["pageNumber"]
                chunks = Chunker.split_text(page_text)
                for chunk in chunks:
                    chunk_id = f"pdf_{file_hash}_{chunk_idx}"
                    all_chunks_data.append({
                        "id": chunk_id,
                        "chunk": chunk,
                        "metadata": {
                            "brandName": brand_name,
                            "sourceType": "pdf",
                            "sourceFile": filename,
                            "pageNumber": page_num,
                            "url": "",
                            "chunkId": chunk_id,
                            "createdAt": str(int(time.time()))
                        }
                    })
                    chunk_idx += 1
        elif ext == "docx":
            text = DOCXParser.extract_text(content)
            if text.strip():
                chunks = Chunker.split_text(text)
                for idx, chunk in enumerate(chunks):
                    chunk_id = f"docx_{file_hash}_{idx}"
                    all_chunks_data.append({
                        "id": chunk_id,
                        "chunk": chunk,
                        "metadata": {
                            "brandName": brand_name,
                            "sourceType": "docx",
                            "sourceFile": filename,
                            "pageNumber": 1,
                            "url": "",
                            "chunkId": chunk_id,
                            "createdAt": str(int(time.time()))
                        }
                    })
        else:
            raise ValueError(f"Unsupported file extension: {ext}")

        if not all_chunks_data:
            return 0

        ids = [item["id"] for item in all_chunks_data]
        chunks = [item["chunk"] for item in all_chunks_data]
        metadatas = [item["metadata"] for item in all_chunks_data]
        
        embeddings_list = self.embeddings.generate_embeddings(chunks)
        self.vector_store.add_chunks(ids, chunks, embeddings_list, metadatas)
        
        self.source_cache[file_hash] = {
            "ids": ids,
            "chunks": chunks,
            "embeddings": embeddings_list,
            "metadatas": metadatas
        }
        self.indexed_sources.add(file_hash)
        return len(chunks)

    def retrieve_context(self, brand_name: str, industry: str, audience: str, tone: str, writing_style: str, tagline: str, writing_sample: str, k: int = 5) -> str:
        query_parts = []
        if brand_name:
            query_parts.append(f"Brand: {brand_name}")
        if industry:
            query_parts.append(f"Industry: {industry}")
        if audience:
            query_parts.append(f"Audience: {audience}")
        if tone:
            query_parts.append(f"Tone: {tone}")
        if writing_style:
            query_parts.append(f"Writing Style: {writing_style}")
        if tagline:
            query_parts.append(f"Tagline: {tagline}")
        if writing_sample:
            query_parts.append(f"Writing Sample: {writing_sample[:350]}")
            
        combined_query = " | ".join(query_parts)
        if not combined_query.strip():
            return ""

        results = self.retriever.retrieve(combined_query, k=k)
        if not results:
            return ""

        context_blocks = []
        for idx, item in enumerate(results):
            meta = item["metadata"]
            source_type = meta.get("sourceType", "Unknown")
            
            if source_type == "website":
                source_name = f"Website ({meta.get('url', 'URL Unknown')})"
            elif source_type == "pdf":
                source_name = f"PDF File ({meta.get('sourceFile', 'Filename Unknown')}, Page {meta.get('pageNumber', 1)})"
            elif source_type == "docx":
                source_name = f"DOCX File ({meta.get('sourceFile', 'Filename Unknown')})"
            else:
                source_name = f"Source: {meta.get('sourceFile', 'Unknown')}"

            context_blocks.append(f"--- Document Source {idx+1}: {source_name} ---\n{item['text']}")

        return "\n\n".join(context_blocks)

    def get_indexed_sources_list(self) -> List[Dict[str, str]]:
        sources = []
        seen_names = set()
        
        for key, cache in self.source_cache.items():
            if not cache["metadatas"]:
                continue
            first_meta = cache["metadatas"][0]
            source_type = first_meta.get("sourceType")
            
            if source_type == "website":
                parsed = urlparse(key)
                name = f"Official Website ({parsed.netloc})"
                if name not in seen_names:
                    seen_names.add(name)
                    sources.append({"type": "website", "name": name})
            elif source_type in ["pdf", "docx"]:
                name = first_meta.get("sourceFile", "uploaded file")
                if name not in seen_names:
                    seen_names.add(name)
                    sources.append({"type": source_type, "name": name})
                    
        return sources

    def clear_database(self):
        self.vector_store.clear()
        self.source_cache.clear()
        self.indexed_sources.clear()
