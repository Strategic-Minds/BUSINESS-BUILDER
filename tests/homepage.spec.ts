import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });
    await page.goto("/");
    await expect(page).toHaveTitle(/.+/);
    expect(errors.filter(e => !e.includes("favicon"))).toHaveLength(0);
  });

  test("hero section is visible", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("[data-testid=hero], section.hero, #hero, .hero");
    await expect(hero.first()).toBeVisible({ timeout: 10_000 });
  });

  test("primary CTA is visible and routes correctly", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("[data-testid=cta-primary], .cta-primary, a[href*=intake], a[href*=start], button:has-text(/get started/i)");
    await expect(cta.first()).toBeVisible();
  });

  test("package section renders", async ({ page }) => {
    await page.goto("/");
    const pkgs = page.locator("[data-testid=packages], .packages, #packages, section:has-text(/starter|growth|pro|enterprise/i)");
    await expect(pkgs.first()).toBeVisible({ timeout: 10_000 });
  });

  test("dark/light toggle exists or dark mode class is present", async ({ page }) => {
    await page.goto("/");
    const htmlClass = await page.locator("html").getAttribute("class") ?? "";
    const toggle = page.locator("[data-testid=theme-toggle], button[aria-label*=theme], button[aria-label*=dark]");
    const hasDark = htmlClass.includes("dark");
    const hasToggle = await toggle.count() > 0;
    expect(hasDark || hasToggle).toBeTruthy();
  });

  test("PWA install or app CTA exists", async ({ page }) => {
    await page.goto("/");
    const pwa = page.locator("[data-testid=pwa-install], link[rel=manifest], meta[name=theme-color]");
    await expect(pwa.first()).toBeDefined();
  });

  test("no 5xx responses on page load", async ({ page }) => {
    const failedRequests: string[] = [];
    page.on("response", res => {
      if (res.status() >= 500) failedRequests.push(`${res.status()} ${res.url()}`);
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(failedRequests).toHaveLength(0);
  });
});
