# Authentication router with token lifecycle endpoints.
from fastapi import APIRouter, Request

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/refresh")
def refresh_token() -> dict[str, str]:
    """Return a placeholder refreshed access token response."""
    return {"access_token": "test-admin-token-org001-admin"}


@router.get("/me")
def get_current_user(request: Request) -> dict[str, str]:
    """Return the authenticated user profile."""
    return request.state.user
