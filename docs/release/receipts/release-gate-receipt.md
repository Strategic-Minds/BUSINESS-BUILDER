# Release Gate Receipt
**Date:** 2026-06-28T06:41:00Z | **Agent:** APEX | **Status:** ACTIVE

## Gates Defined
| Gate | Level | Condition | Action |
|------|-------|-----------|--------|
| L0 | Read-only | Always | Fully automatic |
| L1 | Sandbox write | Always | Automatic |
| L2 | Branch write | Tests pass | Automatic |
| L3 | Preview deploy | Score >= 70 | Automatic |
| L4 | Production deploy | Human approval | BLOCKED until approved |
| L5 | Billing/payments/DNS | Human approval + rollback | BLOCKED until approved |

## Current Gate
GATE L2 — Branch write is authorized.
Preview deploy (L3) requires score >= 70.
Production (L4) requires explicit approval from Jeremy Bensen.

## Protected Forever (never automated without approval)
- Merge to main
- Deploy to production
- Any Stripe/Square charge
- Any live WhatsApp/SMS send
- DNS changes
- Secret rotation
- Destructive database changes

## PR Instruction
This draft PR may be reviewed and merged to main by: Jeremy Bensen (owner only)
DO NOT merge via bot, Codex, or any automated system without explicit approval.
