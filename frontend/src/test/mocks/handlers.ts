// MSW request handlers — mock all API endpoints.
import { http, HttpResponse } from "msw";

import { mockCopilots, mockFiles, mockUser } from "../fixtures";

export const handlers = [
  http.get("/api/auth/me", () => HttpResponse.json(mockUser)),
  http.get("/api/copilots", () => HttpResponse.json(mockCopilots)),
  http.post("/api/copilots", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: "new-id-123",
        ...body,
        status: "draft",
        created_at: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
  http.put("/api/copilots/:id", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ ...(body as object) });
  }),
  http.delete("/api/copilots/:id", () => new HttpResponse(null, { status: 204 })),
  http.get("/api/copilots/:id/knowledge", () => HttpResponse.json(mockFiles)),
  http.post("/api/copilots/:id/knowledge/upload", () =>
    HttpResponse.json(
      {
        id: "file-123",
        filename: "test.pdf",
        status: "processing",
      },
      { status: 201 },
    ),
  ),
  http.post("/api/chat", () =>
    HttpResponse.json({
      role: "assistant",
      content: "Hello! How can I help you today?",
    }),
  ),
];
