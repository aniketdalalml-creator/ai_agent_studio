# Chat service for LLM routing, tool calling, and conversation persistence.
from typing import Any


class ChatService:
    """Handles chat message processing and response generation."""

    def send_message(self, copilot_id: str, message: str) -> dict[str, Any]:
        """Process a user message and return an assistant response payload."""
        _ = copilot_id
        _ = message
        return {"role": "assistant", "content": "Chat service placeholder"}
