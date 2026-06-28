import { defineConfig, devices } from "@playwright/test";
import path from "path";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["github"],
    ["line"],
  ],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "on",
    video: "on-first-retry",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  outputDir: "playwright-report/artifacts",
  snapshotDir: "docs/release/screenshots",
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "chromium-mobile-iphone",
      use: { ...devices["iPhone 14 Pro"], isMobile: true },
    },
    {
      name: "chromium-mobile-android",
      use: { ...devices["Pixel 7"], isMobile: true },
    },
  ],
  webServer: process.env.CI
    ? { command: "npm run start", url: BASE_URL, reuseExistingServer: false, timeout: 120_000 }
    : undefined,
});
