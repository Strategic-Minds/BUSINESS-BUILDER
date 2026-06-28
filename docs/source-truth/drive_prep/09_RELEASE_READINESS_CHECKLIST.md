# Release Readiness Checklist

## Required Before Production
- QA score 100.
- No critical defects.
- Mobile screenshots verified.
- Desktop screenshots verified.
- Forms tested.
- API routes tested.
- Payment sandbox tested.
- WhatChimp preview tested.
- SEO metadata/schema verified.
- No exposed secrets.
- Env readiness complete.
- Rollback plan complete.
- Operator production approval received.

## Blockers
- Dependency install blocked.
- Build not run.
- Headless validation not run.
- Missing credentials.
- Missing domain approval.
- Missing payment approval.
- Missing WhatChimp approval.
- Missing XPS asset license.

## Release Rule
Draft PR and preview deploy are not production release. Production requires separate explicit approval.
