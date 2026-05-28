// E2E automation — knowledge base screen accessibility for authenticated users.
import { expect, test } from "@playwright/test";

import { mockCopilotApi } from "./helpers/api";
import { seedAuthenticatedSession } from "./helpers/auth";

test.beforeEach(async ({ page }) => {
  await seedAuthenticatedSession(page);
  await mockCopilotApi(page);
});

test("knowledge base page loads for authenticated user", async ({ page }) => {
  await page.goto("/knowledge-base");
  await expect(page).toHaveURL(/\/knowledge-base/);
  await expect(page.getByText("Knowledge Base")).toBeVisible();
});
