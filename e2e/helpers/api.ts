// Playwright API mocking helpers for deterministic E2E automation.
import type { Page } from "@playwright/test";

const defaultCopilots = [
  {
    id: "cop-001",
    org_id: "org-001",
    name: "Support Bot",
    description: "Handles customer support queries",
    persona: "You are a helpful support assistant.",
    model_provider: "anthropic",
    model_name: "claude-sonnet-4-6",
    temperature: 0.7,
    status: "active",
    tools: { web_search: true, db_query: false, memory: true },
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    conversation_count: 450,
    last_edited: "Oct 24, 2023",
  },
];

export async function mockCopilotApi(page: Page): Promise<void> {
  await page.route("**/api/copilots**", async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await route.fulfill({ json: defaultCopilots });
      return;
    }
    if (method === "POST") {
      await route.fulfill({
        status: 201,
        json: {
          id: "cop-new",
          ...defaultCopilots[0],
          name: "New Copilot",
          status: "draft",
        },
      });
      return;
    }
    await route.continue();
  });
}
