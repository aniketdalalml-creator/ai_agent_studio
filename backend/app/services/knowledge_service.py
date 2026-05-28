# Knowledge service for file upload, ingestion, and RAG pipeline logic.
from typing import Any


class KnowledgeService:
    """Handles knowledge base file and embedding workflows."""

    def list_files(self, copilot_id: str) -> list[dict[str, Any]]:
        """Return knowledge files for a copilot."""
        _ = copilot_id
        return []
