from .vector_store import ChromaVectorStore
from .embeddings import EmbeddingGenerator
from typing import List, Dict, Any

class Retriever:
    def __init__(self, vector_store: ChromaVectorStore, embedding_generator: EmbeddingGenerator):
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator

    def retrieve(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        if not query.strip():
            return []
        
        query_embedding = self.embedding_generator.generate_embedding(query)
        results = self.vector_store.query([query_embedding], n_results=k)
        
        retrieved_items = []
        if results and "documents" in results and results["documents"] and len(results["documents"]) > 0:
            docs = results["documents"][0]
            metas = results["metadatas"][0] if "metadatas" in results and results["metadatas"] else [{}] * len(docs)
            distances = results["distances"][0] if "distances" in results and results["distances"] else [0.0] * len(docs)
            
            for i in range(len(docs)):
                retrieved_items.append({
                    "text": docs[i],
                    "metadata": metas[i],
                    "score": float(1.0 - distances[i])
                })
        return retrieved_items
