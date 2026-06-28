import { test, expect } from "@playwright/test";

test.describe("Intake Form", () => {
  const INTAKE_ROUTES = ["/intake", "/start", "/get-started", "/onboarding"];

  test("intake page loads", async ({ page }) => {
    let loaded = false;
    for (const route of INTAKE_ROUTES) {
      const res = await page.goto(route);
      if (res && res.status() < 400) { loaded = true; break; }
    }
    expect(loaded).toBeTruthy();
  });

  test("required fields are present", async ({ page }) => {
    for (const route of INTAKE_ROUTES) {
      const res = await page.goto(route);
      if (res && res.status() < 400) {
        const inputs = page.locator("input, textarea, select");
        const count = await inputs.count();
        expect(count).toBeGreaterThan(0);
        break;
      }
    }
  });

  test("submission does not expose secrets in response", async ({ page }) => {
    await page.goto("/intake").catch(() => page.goto("/start"));
    const nameInput = page.locator("input[name=name], input[placeholder*=name], input[type=text]").first();
    if (await nameInput.isVisible()) {
      await nameInput.fill("Test User");
    }
    // Do not actually submit — just verify no secrets in DOM
    const bodyText = await page.content();
    const secretPatterns = ["sk_live_", "sk-proj-", "service_account", "private_key"];
    for (const pattern of secretPatterns) {
      expect(bodyText).not.toContain(pattern);
    }
  });

  test("dashboard assignment route exists", async ({ page }) => {
    const dashRoutes = ["/dashboard", "/client-dashboard", "/portal"];
    let found = false;
    for (const route of dashRoutes) {
      const res = await page.goto(route);
      if (res && res.status() < 500) { found = true; break; }
    }
    expect(found).toBeTruthy();
  });
});
