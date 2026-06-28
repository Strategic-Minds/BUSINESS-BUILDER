# Cron 5-Minute Receipt

Status: staged and implemented.

Vercel cron is configured at `/api/cron/5min` with a 5-minute schedule.

Cron duties:
- check pending approvals
- check missing deliverables
- check failed notifications
- check payment status placeholders
- check project step status
- write receipt/log placeholder

No production or destructive actions are performed.
