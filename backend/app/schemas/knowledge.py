# Pydantic schemas for knowledge base file API payloads.
from typing import Literal

from pydantic import BaseModel


class KnowledgeFileResponse(BaseModel):
    """Schema for knowledge file API responses."""

    id: str
    copilot_id: str
    filename: str
    file_type: str
    file_size: int
    status: Literal["ready", "processing", "failed"]
    upload_date: str
    storage_path: str
