# Integration automation tests — end-to-end API flows across copilot lifecycle.
import pytest
from httpx import AsyncClient

from app.store import memory as store

# HIPAA REQUIRED


@pytest.mark.asyncio
async def test_full_copilot_lifecycle_for_admin(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    headers = {"Authorization": f"Bearer {admin_token}"}

    create_response = await client.post("/api/copilots", json=copilot_payload, headers=headers)
    assert create_response.status_code == 201
    copilot_id = create_response.json()["id"]

    list_response = await client.get("/api/copilots", headers=headers)
    assert any(item["id"] == copilot_id for item in list_response.json())

    chat_response = await client.post(
        "/api/chat",
        json={"copilot_id": copilot_id, "message": "Integration hello"},
        headers=headers,
    )
    assert chat_response.status_code == 200
    assert chat_response.json()["content"]

    delete_response = await client.delete(f"/api/copilots/{copilot_id}", headers=headers)
    assert delete_response.status_code == 204

    audit_logs = store.list_audit_logs("org-001")
    actions = {log["action"] for log in audit_logs}
    assert "create_copilot" in actions
    assert "delete_copilot" in actions
