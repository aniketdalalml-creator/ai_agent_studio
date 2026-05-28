# Pydantic schemas for copilot API payloads.
from typing import Literal

from pydantic import BaseModel, Field


class CopilotTools(BaseModel):
    """Enabled tool flags for a copilot."""

    web_search: bool = False
    db_query: bool = False
    memory: bool = False


class CopilotBase(BaseModel):
    """Shared copilot fields for create and update operations."""

    name: str
    description: str = ""
    persona: str = ""
    model_provider: str
    model_name: str
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    status: Literal["active", "draft", "archived"] = "draft"
    tools: CopilotTools = Field(default_factory=CopilotTools)


class CopilotCreate(CopilotBase):
    """Schema for creating a new copilot."""

    api_key: str | None = None


class CopilotResponse(CopilotBase):
    """Schema for copilot API responses."""

    id: str
    org_id: str
    created_at: str
    updated_at: str
    conversation_count: int = 0
    last_edited: str
