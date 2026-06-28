# Autonomous Build Orchestrator Specification
**Version:** 1.0 | **Date:** 2026-06-28 | **Status:** ACTIVE

## Role
Meta-agent coordinating the full build pipeline. Reads source truth, creates branches,
delegates to sub-agents, gates at approval checkpoints, produces deployable release packet.

## Trigger
- Manual: Codex/Business Builder prompt
- Scheduled: weekly via factory_queue cron
- GitHub dispatch: workflow_dispatch on preview-validation.yml

## Operating Loop

```
READ SOURCE TRUTH
  -> CREATE FEATURE BRANCH
  -> BUILD PAGES + ROUTES + API
  -> RUN UNIT TESTS
  -> RUN E2E TESTS
  -> RUN LIGHTHOUSE
  -> AUTO-FIX SAFE DEFECTS
  -> CAPTURE SCREENSHOTS
  -> SCORE SYSTEM
  -> WRITE RECEIPTS
  -> OPEN DRAFT PR
  -> [RELEASE GATE - STOP]
  -> REQUEST HUMAN APPROVAL
  -> [ONLY AFTER APPROVAL] MERGE + DEPLOY
```

## Source Truth
1. docs/BUSINESS_REQUIREMENTS.md
2. docs/agents/*.md
3. docs/release/qa-score.json
4. Supabase factory_projects
5. GitHub branch diff

## Gate Definitions
| Gate | Level | Action |
|------|-------|--------|
| L0 | Read-only | Fully automatic |
| L1 | Sandbox write | Automatic |
| L2 | Branch write | Automatic if tests pass |
| L3 | Preview deploy | Automatic if score >= 70 |
| L4 | Production deploy | Human approval required |
| L5 | Billing/payments/DNS | Human approval + rollback plan |

## Release Packet
```
docs/release/
  qa-score.json
  qa-report.md
  tool-access-report.md
  lighthouse-report.*
  a11y-report.json
  screenshots/
  receipts/
    vercel-env-receipt.md
    cron-receipt.md
    playwright-receipt.md
    qa-agent-receipt.md
    release-gate-receipt.md
```

## Stop Conditions
- QA score >= 90: proceed to PR
- QA score 70-89: auto-fix + re-score
- QA score < 70: surface blockers, request input
- Any production mutation: STOP, require approval

## Authority Boundary
| Action | Allowed |
|--------|---------|
| Read any file | YES - Auto |
| Create branch | YES - Auto |
| Write files to branch | YES - Auto |
| Run tests | YES - Auto |
| Open draft PR | YES - Auto |
| Auto-fix L1/L2 | YES - Auto |
| Deploy preview (score>=70) | YES - Auto |
| Merge to main | NO - Human approval |
| Deploy production | NO - Human approval |
| Payments/Stripe/Square | NO - Human approval |
| WhatsApp/SMS outreach | NO - Human approval |
| DNS/domain changes | NO - Human approval |
