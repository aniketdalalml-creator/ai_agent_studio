# Chat endpoint automation tests — authentication and response contract.
import pytest
from httpx import AsyncClient

# HIPAA REQUIRED


@pytest.mark.asyncio
async def test_chat_requires_authentication(client: AsyncClient) -> None:
    response = await client.post("/api/chat", json={"copilot_id": "cop-001", "message": "Hi"})
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_chat_returns_assistant_message_with_valid_token(
    client: AsyncClient,
    admin_token: str,
) -> None:
    response = await client.post(
        "/api/chat",
        json={"copilot_id": "cop-001", "message": "Hello"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["role"] == "assistant"
    assert "Echo:" in body["content"]
