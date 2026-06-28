# Headless QA Agent Specification
**Version:** 1.0 | **Date:** 2026-06-28 | **Status:** ACTIVE

## Role
The Headless QA Agent runs automated quality validation against every build.
It operates without human input on allowed actions and surfaces defects with receipts.

## Trigger Conditions
- GitHub Actions preview-validation.yml (PR or dispatch)
- Nightly cron /api/cron/nightly-qa
- Manual: npm run qa:full

## Responsibilities

### 1. Run Playwright Test Suite
- Runs all .spec.ts files in tests/
- 3 browser targets: desktop Chrome, iPhone, Android
- Saves artifacts to playwright-report/ and docs/release/screenshots/

### 2. Capture Screenshots
- Captures: homepage, intake, payment, client-dashboard, admin, system-readiness
- Fails if: blank page, body overflow, 5xx response, secret in DOM

### 3. Inspect Console Errors
- Fails if: non-favicon errors present on page load

### 4. Inspect Network Errors
- Monitors responses for 5xx codes
- Fails if: any 500+ during page load

### 5. Inspect Mobile Layout
- iPhone 14 Pro and Pixel 7 viewports
- Validates: no horizontal overflow, CTAs accessible

### 6. Inspect Forms
- Required fields present, labels exist, no secrets in DOM

### 7. Inspect Payment Setup Notices
- Setup notice appears when Stripe/Square env not configured
- No live secret keys in client bundle

### 8. Score System
- 11 dimensions, 1-100, enterprise threshold = 90
- Writes docs/release/qa-score.json + docs/release/qa-report.md

### 9. Write Defect Report
- docs/release/defect-report-{ts}.md

### 10. Trigger Safe Auto-Fix
- Only L1/L2 defects (infra, docs, metadata, missing files)
- Never: live deploy, payments, WhatsApp, DNS, secrets, DB

## Authority Boundary
| Action | Allowed |
|--------|---------|
| Run Playwright | YES - Auto |
| Capture screenshots | YES - Auto |
| Write QA reports | YES - Auto |
| Auto-fix L1/L2 defects | YES - Auto |
| Live deploy | NO - Requires approval |
| WhatsApp/SMS | NO - Requires approval |
| Stripe charges | NO - Requires approval |
| DB migration | NO - Requires approval |

## Output Artifacts
- playwright-report/
- docs/release/screenshots/
- docs/release/qa-score.json
- docs/release/qa-report.md
- docs/release/tool-access-report.md
- docs/release/receipts/qa-agent-receipt.md
