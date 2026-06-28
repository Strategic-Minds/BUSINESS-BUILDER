# Env and Access Readiness Matrix

Do not store real secrets in Drive. Track only configured, missing, owner, and notes.

## Vercel
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
- CRON_SECRET
- QA_AGENT_SECRET
- AUTOFIX_AGENT_SECRET

## Google Workspace
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_REFRESH_TOKEN
- GOOGLE_DRIVE_ROOT_FOLDER_ID
- GOOGLE_CALENDAR_ID
- GOOGLE_TASKLIST_ID
- GOOGLE_SERVICE_ACCOUNT_JSON

## GitHub
- GITHUB_APP_ID
- GITHUB_INSTALLATION_ID
- GITHUB_PRIVATE_KEY
- GITHUB_REPO

## Supabase
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## Payments
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_STARTER
- STRIPE_PRICE_GROWTH
- STRIPE_PRICE_PRO
- STRIPE_PRICE_ENTERPRISE
- SQUARE_ACCESS_TOKEN
- SQUARE_LOCATION_ID
- SQUARE_ENVIRONMENT

Status:
- Stripe: pending user credentials.
- Square: pending user credentials and optional for MVP.
- Payment modules must render setup notices and use preview-safe behavior until credentials are added.

## WhatsApp / WhatChimp
- WHATCHIMP_API_KEY
- WHATCHIMP_WORKSPACE_ID
- WHATCHIMP_WEBHOOK_SECRET
- WHATCHIMP_WHATSAPP_FROM
- WHATCHIMP_DEFAULT_TEMPLATE_PROJECT_UPDATE
- WHATCHIMP_DEFAULT_TEMPLATE_PROPOSAL_READY
- WHATCHIMP_DEFAULT_TEMPLATE_PAYMENT_DUE
- WHATCHIMP_DEFAULT_TEMPLATE_REVIEW_REQUEST

Status:
- WhatChimp: pending user credentials.
- Twilio fallback: available per pipeline status, but live sends remain approval-gated.
- WhatChimp routes should be scaffolded with setup notices and activate only when envs exist.

## AI
- OPENAI_API_KEY
- VERCEL_AI_GATEWAY_API_KEY
- AI_MODEL_PRIMARY
- AI_MODEL_FALLBACK

## N8N / MCP Automation
- N8N_API_BASE_URL=https://xtremepolishingsystems.app.n8n.cloud
- N8N_MCP_ENDPOINT=https://xtremepolishingsystems.app.n8n.cloud/mcp-server/http
- N8N_API_TOKEN

Status:
- N8N endpoint provided.
- Token presence reported by Base44, but do not store token in Drive.

## SEO
- GOOGLE_SEARCH_CONSOLE_SITE_URL
- GOOGLE_ANALYTICS_ID
- GOOGLE_TAG_MANAGER_ID
- GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID
- GOOGLE_BUSINESS_PROFILE_LOCATION_ID

## Visualizer
- XPS_VISUALIZER_URL
- XPS_PRODUCT_CATALOG_URL
- XPS_ASSET_LICENSE_STATUS
- CUSTOM_VISUALIZER_ENABLED
