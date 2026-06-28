# Stripe Env-Gated Receipt

Status: staged and implemented.

`/payment`, success, cancel, and `/api/payments/checkout` are present. Checkout returns a setup notice until required Stripe variables are configured.

Required env vars:
- STRIPE_SECRET_KEY
- STRIPE_PRICE_STARTER
- STRIPE_PRICE_GROWTH
- STRIPE_PRICE_PRO
- STRIPE_PRICE_ENTERPRISE
- NEXT_PUBLIC_SITE_URL
