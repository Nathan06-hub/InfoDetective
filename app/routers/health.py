from fastapi import APIRouter
from app.config import settings

router = APIRouter(tags=["Health & Status"])

@router.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "InfoDetective Backend",
        "version": "1.1",
        "mock_demo_mode": settings.MOCK_DEMO_MODE,
        "has_gemini_key": bool(settings.GEMINI_API_KEY)
    }
