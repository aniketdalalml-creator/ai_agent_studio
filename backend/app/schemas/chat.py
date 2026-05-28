# Pydantic schemas for chat API payloads.
from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Schema for incoming chat messages."""

    copilot_id: str
    message: str = Field(min_length=1)


class ChatResponse(BaseModel):
    """Schema for assistant chat responses."""

    role: Literal["assistant"] = "assistant"
    content: str
