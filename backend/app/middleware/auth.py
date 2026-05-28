# Authentication middleware for validating bearer tokens on protected routes.
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import parse_bearer_token

PUBLIC_PATHS = {"/health", "/api/auth/refresh", "/api/auth/login"}


class AuthMiddleware(BaseHTTPMiddleware):
    """Reject unauthenticated access to protected API routes."""

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        if request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        if not request.url.path.startswith("/api"):
            return await call_next(request)

        authorization = request.headers.get("Authorization")
        if authorization is None or not authorization.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"detail": "Not authenticated"})

        token = authorization.removeprefix("Bearer ").strip()
        user = parse_bearer_token(token)
        if user is None:
            return JSONResponse(status_code=401, content={"detail": "Invalid or expired token"})

        request.state.user = user
        return await call_next(request)
