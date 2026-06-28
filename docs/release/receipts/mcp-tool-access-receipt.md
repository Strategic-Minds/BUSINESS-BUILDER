# MCP Tool Access Receipt
**Date:** 2026-06-28T06:41:00Z | **Agent:** APEX | **Status:** PARTIAL

## Verified Accessible (Strategic Minds MCP)
- GitHub: Strategic-Minds/BUSINESS-BUILDER — accessible via ops.github.*
- Supabase: prhppuuwcnmfdhwsagug — accessible via ops.supabase.*
- Vercel: strategic-minds team — accessible via ops.vercel.*
- Google Drive: PROJECTS root — accessible via ops.drive.*
- Twilio: ACd87b3d... (active account) — accessible via ops.twilio.*
- OpenAI: 124 models via sandbox — restricted from Vercel IPs, Groq fallback active
- HeyGen: 322 plan credits available — accessible via ops.heygen.*

## Pending (operator action required)
- N8N: JWT key present, instance URL not set — provide N8N_API_BASE_URL
- WhatChimp: Not configured — optional for MVP
- Square: Not configured — optional for MVP
- Stripe: Not configured in BUSINESS-BUILDER project — required for payments
- Google Search Console: Not connected — required for SEO monitoring

## Check Script
scripts/check-tool-access.mjs — run: npm run check-tools
