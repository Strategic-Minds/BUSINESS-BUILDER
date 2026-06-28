#!/usr/bin/env node
/**
 * Lighthouse runner — saves JSON + HTML report to docs/release/
 */
import { execSync } from "child_process";
import fs from "fs";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const OUT_DIR  = "docs/release";
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`Running Lighthouse against ${BASE_URL}...`);
try {
  execSync(
    `npx lighthouse ${BASE_URL} ` +
    `--output=json,html ` +
    `--output-path=${OUT_DIR}/lighthouse-report ` +
    `--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" ` +
    `--quiet`,
    { stdio: "pipe" }
  );
  const report = JSON.parse(fs.readFileSync(`${OUT_DIR}/lighthouse-report.report.json`, "utf8"));
  const perf = Math.round((report.categories?.performance?.score ?? 0) * 100);
  const a11y = Math.round((report.categories?.accessibility?.score ?? 0) * 100);
  const seo  = Math.round((report.categories?.seo?.score ?? 0) * 100);
  const bp   = Math.round((report.categories?.["best-practices"]?.score ?? 0) * 100);
  console.log(`  Performance:     ${perf}/100`);
  console.log(`  Accessibility:   ${a11y}/100`);
  console.log(`  SEO:             ${seo}/100`);
  console.log(`  Best Practices:  ${bp}/100`);
  // Fail CI if any score below threshold
  if (perf < 70 || a11y < 90 || seo < 90) {
    console.error(`  ❌ Scores below threshold (perf>=70, a11y>=90, seo>=90)`);
    process.exit(1);
  }
  console.log(`  ✅ All scores pass threshold`);
} catch(e) {
  console.error(`Lighthouse failed: ${e.message}`);
  console.log("If dev server is not running: npm run dev, then retry.");
  process.exit(1);
}
