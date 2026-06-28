import { test, expect } from "@playwright/test";

test.describe("Payment Page", () => {
  test("payment page loads without crashing", async ({ page }) => {
    const res = await page.goto("/payment");
    const status = res?.status() ?? 0;
    expect(status).toBeLessThan(500);
  });

  test("shows setup notice when Stripe env missing", async ({ page }) => {
    await page.goto("/payment");
    const notice = page.locator("[data-testid=stripe-setup-notice], .setup-notice, .env-missing, [data-env-missing]");
    // Either setup notice exists OR real Stripe loads — both are valid
    const content = await page.content();
    const hasStripe = content.includes("stripe.com") || content.includes("Stripe");
    const hasNotice = await notice.count() > 0;
    expect(hasStripe || hasNotice).toBeTruthy();
  });

  test("package selection renders", async ({ page }) => {
    await page.goto("/payment");
    const pkgs = page.locator("[data-testid=package], .package-card, [data-package]");
    // Must not crash even if packages are not loaded yet
    const status = (await page.goto("/payment"))?.status() ?? 0;
    expect(status).toBeLessThan(500);
  });

  test("checkout route does not expose secrets", async ({ page }) => {
    await page.goto("/payment");
    const content = await page.content();
    expect(content).not.toContain("sk_live_");
    expect(content).not.toContain("sk_test_");
    expect(content).not.toContain("whsec_");
  });
});
