#!/usr/bin/env node
/**
 * Accessibility audit using axe-core via Playwright
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const PAGES = ["/", "/intake", "/payment", "/admin/system-readiness"];
const OUT = "docs/release/a11y-report.json";
fs.mkdirSync("docs/release", { recursive: true });

const browser = await chromium.launch();
const results = {};
let violations = 0;

for (const pg of PAGES) {
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}${pg}`);
  const analysis = await new AxeBuilder({ page }).analyze();
  results[pg] = { violations: analysis.violations.length, passes: analysis.passes.length };
  violations += analysis.violations.length;
  if (analysis.violations.length > 0) {
    console.error(`  ❌ ${pg}: ${analysis.violations.length} violations`);
    analysis.violations.slice(0,3).forEach(v => console.error(`     - ${v.id}: ${v.description}`));
  } else {
    console.log(`  ✅ ${pg}: no violations`);
  }
  await page.close();
}

await browser.close();
fs.writeFileSync(OUT, JSON.stringify({ ts: new Date().toISOString(), pages: results, total_violations: violations }, null, 2));
console.log(`\n  Total violations: ${violations}`);
process.exit(violations === 0 ? 0 : 1);
