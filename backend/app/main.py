from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from .services.rag_service import RAGService

app = FastAPI(title="Brand Voice Generator RAG Backend")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_service = RAGService()

class RetrieveRequest(BaseModel):
    brandName: str
    industry: str
    targetAudience: str
    tone: str
    writingStyle: str
    tagline: Optional[str] = ""
    writingSamples: Optional[str] = ""
    k: Optional[int] = 5

@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "Backend is active"}

@app.post("/api/index")
async def index_data(
    brandName: str = Form(...),
    websiteUrl: Optional[str] = Form(""),
    files: Optional[List[UploadFile]] = File(None)
):
    try:
        total_chunks = 0
        if websiteUrl and websiteUrl.strip():
            chunks = await rag_service.index_website(brandName, websiteUrl.strip())
            total_chunks += chunks
            
        if files:
            for file in files:
                if file.filename:
                    content = await file.read()
                    chunks = rag_service.index_file(brandName, file.filename, content)
                    total_chunks += chunks
                    
        indexed_sources = rag_service.get_indexed_sources_list()
        return {
            "status": "success",
            "chunks_indexed": total_chunks,
            "sources": indexed_sources,
            "message": f"Successfully indexed {total_chunks} chunks."
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/retrieve")
async def retrieve_data(request: RetrieveRequest):
    try:
        context = rag_service.retrieve_context(
            brand_name=request.brandName,
            industry=request.industry,
            audience=request.targetAudience,
            tone=request.tone,
            writing_style=request.writingStyle,
            tagline=request.tagline,
            writing_sample=request.writingSamples,
            k=request.k
        )
        indexed_sources = rag_service.get_indexed_sources_list()
        return {
            "status": "success",
            "context": context,
            "sources": indexed_sources
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/clear")
async def clear_data():
    try:
        rag_service.clear_database()
        return {"status": "success", "message": "Vector database cleared."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
