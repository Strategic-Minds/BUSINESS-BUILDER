# Overnight Autonomous Build Runbook

## Trigger
Operator sends explicit approval.

## Step 1 - Preflight
- Check GitHub access.
- Check Drive access.
- Check Vercel access.
- Check env placeholders.
- Check package install access.
- Check Playwright/headless browser availability.
- Check WhatChimp readiness.
- Check payment sandbox readiness.
- Check N8N MCP endpoint connectivity.
- Confirm Stripe, Square, and WhatChimp are optional/pending if credentials are not present.

## Step 2 - Build
- Create branch.
- Generate app.
- Generate backend routes.
- Generate schema.
- Generate dashboards.
- Generate intake/proposal/payment flows.
- Generate visualizer page.
- Generate SEO engine.
- Generate test suites.
- Generate receipts.

## Step 3 - Validate
- Install dependencies.
- Build.
- Run unit tests.
- Run API tests.
- Run Playwright tests.
- Capture screenshots.
- Run Lighthouse.
- Run SEO scan.
- Score system.

## Step 4 - Auto-Heal
- Fix safe defects.
- Rerun validation.
- Repeat until 100 or blocker.

## Step 5 - Handoff
- Upload archive.
- Create Drive receipt.
- Open GitHub PR.
- Provide preview link if available.
- Stop at release gate.

## Known Pending Integrations
- Stripe credentials pending.
- Square credentials pending.
- WhatChimp credentials pending.
- These must not prevent preview build, QA, dashboard readiness, or scaffold completion.
