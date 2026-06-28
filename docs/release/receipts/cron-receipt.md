# Cron Configuration Receipt
**Date:** 2026-06-28T06:41:00Z | **Agent:** APEX | **Status:** CONFIGURED

## Crons Installed (vercel.json)
| Route | Schedule | Purpose |
|-------|----------|---------|
| /api/cron/5min | every 5 min | pending approvals, failed builds, queues |
| /api/cron/nightly-qa | 0 6 * * * | Playwright, Lighthouse, screenshots, scoring |
| /api/cron/daily-seo | 30 6 * * * | metadata, schema, content drafts |
| /api/cron/workflow-health | 0 * * * * | API health, env readiness, queue status |

## Auth Gate
All cron routes require: Authorization: Bearer CRON_SECRET
Returns 401 without valid secret.

## Production Lock
- Crons are NOT ACTIVE until Vercel project is live and CRON_SECRET is set
- All cron routes are READ-ONLY and RECEIPT-WRITING only until human unlocks mutations

## Next Action
1. Set CRON_SECRET in Vercel Preview env
2. Deploy to preview
3. Verify /api/cron/workflow-health returns 200 with correct auth
