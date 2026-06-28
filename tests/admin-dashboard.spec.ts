import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard", () => {
  const ROUTES = ["/admin", "/admin/dashboard", "/admin/system-readiness"];

  test("admin route loads (or redirects to auth)", async ({ page }) => {
    let ok = false;
    for (const r of ROUTES) {
      const res = await page.goto(r);
      if (res && res.status() < 500) { ok = true; break; }
    }
    expect(ok).toBeTruthy();
  });

  test("system readiness page accessible", async ({ page }) => {
    const res = await page.goto("/admin/system-readiness");
    const status = res?.status() ?? 0;
    expect(status).toBeLessThan(500);
  });

  test("admin page does not expose secrets", async ({ page }) => {
    await page.goto("/admin/system-readiness").catch(() => page.goto("/admin"));
    const content = await page.content();
    expect(content).not.toContain("sk_live_");
    expect(content).not.toContain("SUPABASE_SERVICE_ROLE");
    expect(content).not.toContain("service_account");
    expect(content).not.toContain("private_key");
  });

  test("env status section exists", async ({ page }) => {
    await page.goto("/admin/system-readiness");
    const content = await page.content();
    // Should show configured/missing labels
    const hasReadiness = content.toLowerCase().includes("configured") || 
                         content.toLowerCase().includes("missing") ||
                         content.toLowerCase().includes("env") ||
                         content.toLowerCase().includes("readiness");
    expect(hasReadiness).toBeTruthy();
  });
});
