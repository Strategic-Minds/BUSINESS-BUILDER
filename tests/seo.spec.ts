import { test, expect } from "@playwright/test";

test.describe("SEO Compliance", () => {
  test("homepage has title tag", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    expect(title.length).toBeLessThan(70);
  });

  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");
    const desc = await page.locator("meta[name=description]").getAttribute("content");
    expect(desc).toBeTruthy();
    expect((desc ?? "").length).toBeGreaterThan(50);
  });

  test("homepage has canonical link", async ({ page }) => {
    await page.goto("/");
    const canonical = await page.locator("link[rel=canonical]").getAttribute("href");
    expect(canonical).toBeTruthy();
  });

  test("homepage has Open Graph tags", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page.locator("meta[property='og:title']").getAttribute("content");
    const ogDesc  = await page.locator("meta[property='og:description']").getAttribute("content");
    expect(ogTitle).toBeTruthy();
    expect(ogDesc).toBeTruthy();
  });

  test("robots.txt exists", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const text = await page.content();
    expect(text.toLowerCase()).toContain("user-agent");
  });

  test("sitemap.xml exists", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const text = await page.content();
    expect(text.toLowerCase()).toContain("urlset");
  });

  test("homepage has LocalBusiness or Service schema", async ({ page }) => {
    await page.goto("/");
    const ld = await page.locator("script[type='application/ld+json']").allTextContents();
    const hasSchema = ld.some(s => s.includes("LocalBusiness") || s.includes("Service") || s.includes("Organization"));
    expect(hasSchema).toBeTruthy();
  });
});
