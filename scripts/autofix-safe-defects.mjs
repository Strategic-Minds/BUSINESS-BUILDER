#!/usr/bin/env node
/**
 * APEX Safe Auto-Fix Loop v1.0
 * Fixes only pre-approved categories of defects.
 * NEVER touches: live deploys, payments, WhatsApp, DNS, secrets, DB migrations.
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const NOW = new Date().toISOString();
const RECEIPTS_DIR = "docs/release/receipts/autofix";
fs.mkdirSync(RECEIPTS_DIR, { recursive: true });

const fixes = [];
const blocked = [];

function fix(category, description, action) {
  try {
    action();
    fixes.push({ category, description, status: "fixed", ts: NOW });
    console.log(`  ✅ [${category}] ${description}`);
  } catch(e) {
    fixes.push({ category, description, status: "failed", error: e.message, ts: NOW });
    console.error(`  ❌ [${category}] ${description}: ${e.message}`);
  }
}

// ── FIX 1: Create missing directories ──────────────────────────────
fix("infrastructure", "Create docs/release/screenshots dir", () => {
  fs.mkdirSync("docs/release/screenshots", { recursive: true });
});
fix("infrastructure", "Create docs/release/receipts dir", () => {
  fs.mkdirSync("docs/release/receipts", { recursive: true });
});
fix("infrastructure", "Create docs/agents dir", () => {
  fs.mkdirSync("docs/agents", { recursive: true });
});
fix("infrastructure", "Create src/app dir", () => {
  fs.mkdirSync("src/app", { recursive: true });
});
fix("infrastructure", "Create public dir", () => {
  fs.mkdirSync("public", { recursive: true });
});

// ── FIX 2: Create .env.example if missing ──────────────────────────
if (!fs.existsSync(".env.example")) {
  fix("env-docs", "Create .env.example with all required vars", () => {
    const example = `# AI Business Factory — Environment Variables
# Copy to .env.local for local development. NEVER commit real values.
# ─── App ────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Strategic Minds AI Business Factory
NEXT_PUBLIC_PRIMARY_VERTICAL=epoxy
NEXT_PUBLIC_DEFAULT_THEME=dark

# ─── Supabase ────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ─── Stripe ──────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_GROWTH=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# ─── Square (optional) ───────────────────────────────────────────────
SQUARE_ACCESS_TOKEN=
SQUARE_LOCATION_ID=
SQUARE_ENVIRONMENT=sandbox

# ─── WhatChimp / WhatsApp ─────────────────────────────────────────────
WHATCHIMP_API_KEY=
WHATCHIMP_WORKSPACE_ID=
WHATCHIMP_WEBHOOK_SECRET=
WHATCHIMP_WHATSAPP_FROM=
WHATCHIMP_DEFAULT_TEMPLATE_PROJECT_UPDATE=
WHATCHIMP_DEFAULT_TEMPLATE_PROPOSAL_READY=
WHATCHIMP_DEFAULT_TEMPLATE_PAYMENT_DUE=
WHATCHIMP_DEFAULT_TEMPLATE_REVIEW_REQUEST=

# ─── Twilio fallback ─────────────────────────────────────────────────
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=whatsapp:+15559730487
TWILIO_SMS_FROM=+15616780328

# ─── Google Workspace ────────────────────────────────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_DRIVE_ROOT_FOLDER_ID=1WWqV5ejMsdH0sa7-cHlyDBeXOqU0Z_Nr
GOOGLE_SERVICE_ACCOUNT_JSON=
GOOGLE_CALENDAR_ID=
GOOGLE_TASKLIST_ID=
GOOGLE_FORMS_FOLDER_ID=
GOOGLE_SHEETS_FOLDER_ID=
GOOGLE_DOCS_FOLDER_ID=
GOOGLE_VAULT_ENABLED=false

# ─── AI / OpenAI ─────────────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-...
VERCEL_AI_GATEWAY_API_KEY=
AI_GATEWAY_PROVIDER=openai
AI_MODEL_PRIMARY=gpt-4o
AI_MODEL_FALLBACK=gpt-4o-mini

# ─── GitHub ──────────────────────────────────────────────────────────
GITHUB_APP_ID=
GITHUB_INSTALLATION_ID=
GITHUB_PRIVATE_KEY=
GITHUB_REPO=Strategic-Minds/BUSINESS-BUILDER

# ─── Vercel Automation ───────────────────────────────────────────────
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
CRON_SECRET=
QA_AGENT_SECRET=
AUTOFIX_AGENT_SECRET=
RELEASE_GATE_SECRET=

# ─── SEO ─────────────────────────────────────────────────────────────
GOOGLE_SEARCH_CONSOLE_SITE_URL=
GOOGLE_ANALYTICS_ID=
GOOGLE_TAG_MANAGER_ID=
GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID=
GOOGLE_BUSINESS_PROFILE_LOCATION_ID=
SEO_AGENT_ENABLED=true

# ─── XPS / Visualizer ────────────────────────────────────────────────
XPS_VISUALIZER_URL=https://xtremepolishingsystems.com/pages/flake-visualizer
XPS_PRODUCT_CATALOG_URL=
XPS_ASSET_LICENSE_STATUS=public-link-only
CUSTOM_VISUALIZER_ENABLED=false

# ─── Storage ─────────────────────────────────────────────────────────
BLOB_READ_WRITE_TOKEN=
SCREENSHOT_STORAGE_BUCKET=
VALIDATION_REPORTS_BUCKET=
`;
    fs.writeFileSync(".env.example", example);
  });
}

// ── FIX 3: Create minimal robots.txt if missing ────────────────────
if (!fs.existsSync("public/robots.txt")) {
  fix("seo", "Create public/robots.txt", () => {
    fs.writeFileSync("public/robots.txt",
`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://your-domain.com/sitemap.xml
`);
  });
}

// ── FIX 4: Create manifest.json if missing ─────────────────────────
if (!fs.existsSync("public/manifest.json")) {
  fix("pwa", "Create public/manifest.json", () => {
    fs.writeFileSync("public/manifest.json", JSON.stringify({
      name: "AI Business Factory",
      short_name: "BizFactory",
      description: "Strategic Minds AI Business Factory — Epoxy & Decorative Concrete OS",
      start_url: "/",
      display: "standalone",
      background_color: "#0A0A0A",
      theme_color: "#F6B800",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
      ]
    }, null, 2));
  });
}

// ── FIX 5: Add missing alt text placeholder doc ─────────────────────
fix("seo", "Create alt-text standards doc", () => {
  fs.writeFileSync("docs/release/alt-text-standards.md",
`# Image Alt Text Standards
All images must have descriptive alt text. Format:
- Products: "XPS [product name] — [color/finish]"
- Gallery: "Epoxy [finish type] floor in [city], [state]"
- Hero: "Professional epoxy floor coating in [room/space]"
- Before/after: "Before: concrete slab | After: [finish] epoxy floor"
`);
});

// ── BLOCKED ACTIONS (logged, never executed) ───────────────────────
blocked.push({ action: "live_deploy", reason: "Requires human approval" });
blocked.push({ action: "stripe_charge", reason: "Payment actions require approval" });
blocked.push({ action: "whatsapp_send", reason: "Messaging requires approval" });
blocked.push({ action: "dns_change", reason: "DNS changes require approval" });
blocked.push({ action: "secret_write", reason: "Secrets require approval" });
blocked.push({ action: "db_migration", reason: "Schema changes require approval" });

// ── Write receipt ──────────────────────────────────────────────────
const receipt = {
  generated_at: NOW,
  fixes_applied: fixes.filter(f=>f.status==="fixed").length,
  fixes_failed: fixes.filter(f=>f.status==="failed").length,
  blocked_actions: blocked.length,
  fixes,
  blocked,
};
fs.writeFileSync(
  path.join(RECEIPTS_DIR, `autofix-receipt-${Date.now()}.json`),
  JSON.stringify(receipt, null, 2)
);

console.log(`\n=== AUTO-FIX COMPLETE ===`);
console.log(`  Applied:  ${receipt.fixes_applied} fixes`);
console.log(`  Failed:   ${receipt.fixes_failed} fixes`);
console.log(`  Blocked:  ${receipt.blocked_actions} actions (require approval)`);
console.log(`  Receipt:  ${RECEIPTS_DIR}/autofix-receipt-*.json`);
