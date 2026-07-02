import chromadb
import os
from typing import List, Dict, Any

CHROMA_DB_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "chromadb_data"
)

class ChromaVectorStore:
    def __init__(self):
        os.makedirs(CHROMA_DB_DIR, exist_ok=True)
        self.client = chromadb.PersistentClient(path=CHROMA_DB_DIR)
        self.collection = self.client.get_or_create_collection(name="brand_voice_knowledge")

    def add_chunks(self, ids: List[str], documents: List[str], embeddings: List[List[float]], metadatas: List[Dict[str, Any]]):
        if not ids:
            return
        
        # Ensure all metadata values are primitive types (chromadb constraints)
        cleaned_metadatas = []
        for meta in metadatas:
            clean_meta = {}
            for k, v in meta.items():
                if v is None:
                    clean_meta[k] = ""
                elif isinstance(v, (str, int, float, bool)):
                    clean_meta[k] = v
                else:
                    clean_meta[k] = str(v)
            cleaned_metadatas.append(clean_meta)

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=cleaned_metadatas
        )

    def query(self, query_embeddings: List[List[float]], n_results: int = 5) -> Dict[str, Any]:
        if not query_embeddings:
            return {}
        
        results = self.collection.query(
            query_embeddings=query_embeddings,
            n_results=n_results
        )
        return results

    def clear(self):
        try:
            self.client.delete_collection("brand_voice_knowledge")
        except Exception:
            pass
        self.collection = self.client.get_or_create_collection(name="brand_voice_knowledge")
