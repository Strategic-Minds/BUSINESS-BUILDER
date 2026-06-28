# Agent and MCP Requirements

## Required Agents
- Autonomous Build Orchestrator
- Headless QA Agent
- Auto-Fix Agent
- SEO Persistence Agent
- WhatChimp Messaging Agent
- Proposal Generation Agent
- Payment Gate Agent
- Google Workspace Agent
- GitHub PR Agent
- Vercel Deployment Agent
- Visualizer/Product Data Agent

## MCP / Tool Access Requirements
- GitHub read/write branch, file, PR, issue, and Actions access.
- Google Drive folder/file/doc/sheet/form/calendar/task access.
- Vercel project/env/deploy/cron access.
- Supabase schema and preview database access.
- Stripe/Square sandbox access.
- WhatChimp API/webhook access.
- OpenAI/Vercel AI Gateway access.
- Headless browser runtime with Playwright.
- Screenshot and report artifact storage.
- N8N MCP endpoint: https://xtremepolishingsystems.app.n8n.cloud/mcp-server/http

## Blocker Prevention Rule
Every agent must produce a tool-access report before build starts. Missing access should create an actionable blocker record, not silent failure.

## Pending Credential Handling
- Stripe missing: payment UI and APIs must stay setup-safe.
- Square missing: optional module must stay disabled.
- WhatChimp missing: WhatsApp workflows use preview mode or Twilio fallback only.
- N8N token must never be stored in Drive, GitHub, screenshots, or chat.
