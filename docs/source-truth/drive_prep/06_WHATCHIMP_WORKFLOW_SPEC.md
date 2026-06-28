# WhatChimp WhatsApp Workflow Spec

## Purpose
Use WhatChimp as the WhatsApp communication layer for leads, proposals, payment reminders, job updates, scheduling, and review requests.

## Required Workflows
1. New lead received.
2. Intake incomplete reminder.
3. Proposal ready.
4. Payment due.
5. Contract ready.
6. Job scheduled.
7. Crew assigned.
8. Crew en route.
9. Job started.
10. Job progress update.
11. Job completed.
12. Review request.
13. Private recovery flow for unhappy client.

## Data Fields
- client_name
- business_name
- project_id
- proposal_link
- payment_link
- contract_link
- dashboard_link
- scheduled_date
- crew_leader
- review_link

## Guardrail
Live sends require approval and valid WhatChimp configuration. Preview messages may be generated automatically.

## Current Status
WhatChimp credentials are not available yet.

Implementation rule:
- Build the WhatChimp adapter interface.
- Show setup required in admin readiness.
- Store templates and payload shapes.
- Do not block the rest of the system.
- Use Twilio fallback only for preview-safe or explicitly approved sends.
