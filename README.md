# Strategic Minds Enterprise Site V2

Preview branch build for Strategic Minds Advisory.

## Scope

- Full homepage replacement using the uploaded dark/electric-blue AI consulting reference as visual source.
- Dark/light theme with localStorage persistence.
- Branded installable PWA.
- Supabase-auth-ready `/auth` page and auth API routes.
- Stripe-checkout-ready `/payment`, success, cancel, and checkout API route.
- Client portal with 10-step gated approval journey and deliverable library.
- Admin operations dashboard with release gates and integration status.
- WhatsApp/SMS notification preview, send gate, and log routes.
- Supabase schema draft with clients, projects, project steps, deliverables, approvals, payments, notifications, receipts, admin users, and client users.
- Vercel 5-minute cron route at `/api/cron/5min`.

## Required Environment

See `.env.example`. Missing Supabase, Stripe, and Twilio variables produce setup notices instead of runtime crashes.

## Release Gate

This branch is preview-safe. Do not merge, deploy to production, run live Stripe payments, send live SMS/WhatsApp, write secrets, or run destructive Supabase actions without operator approval.
