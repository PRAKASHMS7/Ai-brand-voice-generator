from pypdf import PdfReader
import io
from typing import List, Dict, Any

class PDFParser:
    @staticmethod
    def extract_pages(file_bytes: bytes) -> List[Dict[str, Any]]:
        pdf_file = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_file)
        pages_data = []
        for idx, page in enumerate(reader.pages):
            page_num = idx + 1
            text = page.extract_text()
            if text and text.strip():
                pages_data.append({
                    "pageNumber": page_num,
                    "text": text
                })
        return pages_data
