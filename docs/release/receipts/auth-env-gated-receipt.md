# Auth Env-Gated Receipt

Status: staged and implemented.

Supabase auth routes and `/auth` render without credentials. Missing environment variables produce setup notices instead of crashes.

Required env vars:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY remains server-only and is documented but not exposed.
