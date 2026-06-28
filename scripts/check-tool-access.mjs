#!/usr/bin/env node
/**
 * Tool Access Checker — verifies all required integrations are configured.
 * Writes docs/release/tool-access-report.md
 */
import fs from "fs";

const NOW = new Date().toISOString();
const OUT  = "docs/release/tool-access-report.md";
fs.mkdirSync("docs/release", { recursive: true });

function check(name, envVars, required = true) {
  const configured = envVars.filter(k => {
    const v = process.env[k];
    return v && v.trim() !== "" && !v.startsWith("your_") && !v.startsWith("sk_test_PLACEHOLDER");
  });
  return {
    name,
    status: configured.length === envVars.length ? "✅ CONFIGURED"
          : configured.length > 0               ? "⚠️  PARTIAL"
          : required                             ? "❌ MISSING (REQUIRED)"
          : "⚠️  MISSING (OPTIONAL)",
    configured: configured.length,
    total: envVars.length,
    vars: envVars,
  };
}

const checks = [
  check("GitHub",             ["GITHUB_APP_ID","GITHUB_PRIVATE_KEY","GITHUB_REPO"]),
  check("Vercel",             ["VERCEL_TOKEN","VERCEL_ORG_ID","VERCEL_PROJECT_ID"]),
  check("Google Workspace",   ["GOOGLE_SERVICE_ACCOUNT_JSON","GOOGLE_DRIVE_ROOT_FOLDER_ID"]),
  check("Supabase",           ["NEXT_PUBLIC_SUPABASE_URL","NEXT_PUBLIC_SUPABASE_ANON_KEY","SUPABASE_SERVICE_ROLE_KEY"]),
  check("Stripe",             ["STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET"]),
  check("Square",             ["SQUARE_ACCESS_TOKEN","SQUARE_LOCATION_ID"], false),
  check("WhatChimp",          ["WHATCHIMP_API_KEY","WHATCHIMP_WORKSPACE_ID"], false),
  check("Twilio",             ["TWILIO_ACCOUNT_SID","TWILIO_AUTH_TOKEN"]),
  check("OpenAI/AI Gateway",  ["OPENAI_API_KEY"]),
  check("Screenshot Storage", ["BLOB_READ_WRITE_TOKEN","SCREENSHOT_STORAGE_BUCKET"], false),
  check("Cron Security",      ["CRON_SECRET","QA_AGENT_SECRET","AUTOFIX_AGENT_SECRET"]),
  check("XPS Visualizer",     ["XPS_VISUALIZER_URL"]),
];

const configured  = checks.filter(c=>c.status.startsWith("✅")).length;
const partial     = checks.filter(c=>c.status.startsWith("⚠️")).length;
const missing     = checks.filter(c=>c.status.startsWith("❌")).length;

console.log(`\n=== TOOL ACCESS CHECK ===`);
checks.forEach(c => console.log(`  ${c.status.split(" ")[0]} ${c.name}: ${c.configured}/${c.total} vars`));
console.log(`\n  ✅ Configured: ${configured}/${checks.length}`);
console.log(`  ⚠️  Partial:    ${partial}/${checks.length}`);
console.log(`  ❌ Missing:    ${missing}/${checks.length}`);

const table = checks.map(c=>
  `| ${c.name} | ${c.status} | ${c.configured}/${c.total} |`
).join("\n");

const report = `# Tool Access Report
**Generated:** ${NOW}

## Summary
- ✅ Configured: ${configured}/${checks.length}
- ⚠️ Partial: ${partial}/${checks.length}
- ❌ Missing: ${missing}/${checks.length}

## Detail
| Integration | Status | Vars |
|-------------|--------|------|
${table}

## Required Actions
${checks.filter(c=>c.status.startsWith("❌")).map(c=>`- Add ${c.vars.join(", ")} to Vercel env`).join("\n") || "None — all required vars configured"}

## Optional Actions
${checks.filter(c=>c.status.startsWith("⚠️") && c.status.includes("OPTIONAL")).map(c=>`- Configure ${c.name}: ${c.vars.join(", ")}`).join("\n") || "None"}
`;

fs.writeFileSync(OUT, report);
console.log(`\n  Report: ${OUT}`);
process.exit(missing > 0 ? 1 : 0);
