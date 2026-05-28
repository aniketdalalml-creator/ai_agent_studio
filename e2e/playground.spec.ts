// E2E automation — playground screen accessibility for authenticated users.
import { expect, test } from "@playwright/test";

import { mockCopilotApi } from "./helpers/api";
import { seedAuthenticatedSession } from "./helpers/auth";

test.beforeEach(async ({ page }) => {
  await seedAuthenticatedSession(page);
  await mockCopilotApi(page);
});

test("playground page loads for authenticated user", async ({ page }) => {
  await page.goto("/playground");
  await expect(page).toHaveURL(/\/playground/);
  await expect(page.getByText("Test Chat Playground")).toBeVisible();
});
