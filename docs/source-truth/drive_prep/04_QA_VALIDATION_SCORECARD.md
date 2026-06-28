# QA Validation and Auto-Heal Scorecard

## Score Categories
- Frontend quality: 10
- Mobile responsiveness: 10
- UX clarity: 10
- Workflow integrity: 10
- API reliability: 10
- Payment env safety: 8
- WhatChimp readiness: 8
- SEO readiness: 10
- Security posture: 8
- Documentation completeness: 8
- Release readiness: 8

## Scoring Rules
100 = enterprise-grade and fully validated.
90-99 = strong but incomplete.
70-89 = usable but not enterprise-grade.
Below 70 = materially incomplete.

Never round weak evidence to 100.

## Required Tests
- Homepage desktop and mobile.
- Intake form.
- Package/payment page.
- Client dashboard.
- Admin dashboard.
- Visualizer page.
- Proposal preview.
- API health.
- Cron endpoints.
- WhatChimp preview messages.
- SEO metadata/schema/sitemap/robots.
- No exposed secrets.
- No broken links.
- Screenshot review.

## Auto-Fix Allowed
- Broken links.
- Missing metadata.
- Missing alt text.
- Route crashes.
- Mobile overflow.
- Missing setup notices.
- Missing receipts.
- Minor CSS defects.

## Auto-Fix Not Allowed
- Live payments.
- Live WhatsApp sends.
- DNS changes.
- Secret writes.
- Destructive database actions.
