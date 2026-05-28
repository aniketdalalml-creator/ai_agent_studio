# Knowledge base router for file and ingestion workflows.
from fastapi import APIRouter

router = APIRouter(prefix="/knowledge", tags=["knowledge"])


@router.get("/files")
def list_knowledge_files() -> list[dict[str, str]]:
    """Return a placeholder empty file list."""
    return []
