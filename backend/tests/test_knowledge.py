# Knowledge base endpoint automation tests — auth and file listing.
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_knowledge_files_requires_authentication(client: AsyncClient) -> None:
    response = await client.get("/api/knowledge/files")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_knowledge_files_returns_list_with_valid_token(
    client: AsyncClient,
    admin_token: str,
) -> None:
    response = await client.get(
        "/api/knowledge/files",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)
