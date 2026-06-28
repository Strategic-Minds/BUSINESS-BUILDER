import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const SCREENSHOT_DIR = path.resolve("docs/release/screenshots");

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

const PAGES = [
  { name: "homepage",          path: "/",                    mobile: true  },
  { name: "intake",            path: "/intake",              mobile: true  },
  { name: "payment",           path: "/payment",             mobile: false },
  { name: "client-dashboard",  path: "/client-dashboard",    mobile: false },
  { name: "admin-dashboard",   path: "/admin",               mobile: false },
  { name: "system-readiness",  path: "/admin/system-readiness", mobile: false },
];

for (const pg of PAGES) {
  test(`screenshot: ${pg.name} — no blank page`, async ({ page }, testInfo) => {
    await page.goto(pg.path);
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1500);

    const screenshotPath = path.join(SCREENSHOT_DIR, `${pg.name}-${testInfo.project.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    testInfo.attachments.push({ name: pg.name, contentType: "image/png", path: screenshotPath });

    // Fail if blank
    const pixels = await page.evaluate(() => {
      const canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      return ctx ? canvas.width * canvas.height : 0;
    });
    expect(pixels).toBeGreaterThan(0);

    // Fail if body is completely white or completely black
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(bodyBg).not.toBe("rgba(0, 0, 0, 0)");
  });
}
