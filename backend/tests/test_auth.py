# Authentication middleware tests — unauthenticated and invalid token handling.
import pytest
from httpx import AsyncClient

# HIPAA REQUIRED


@pytest.mark.asyncio
async def test_unauthenticated_request_returns_401(client: AsyncClient) -> None:
    response = await client.get("/api/copilots")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_invalid_token_returns_401(client: AsyncClient) -> None:
    response = await client.get(
        "/api/copilots",
        headers={"Authorization": "Bearer garbage-token-value"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_expired_token_returns_401(client: AsyncClient) -> None:
    response = await client.get(
        "/api/copilots",
        headers={"Authorization": "Bearer expired-token"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_valid_token_allows_access(client: AsyncClient, admin_token: str) -> None:
    response = await client.get(
        "/api/copilots",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code != 401
