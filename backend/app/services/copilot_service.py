# Copilot service for copilot CRUD and configuration business logic.
from typing import Any


class CopilotService:
    """Handles copilot-related database and orchestration operations."""

    def list_copilots(self, org_id: str) -> list[dict[str, Any]]:
        """Return copilots for the given organization."""
        _ = org_id
        return []
