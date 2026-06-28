# Rollback Plan

If production release is approved and a regression is found:

1. Stop new promotion or deployment actions.
2. Revert to the previous Vercel production deployment.
3. Disable live notification sends.
4. Pause Stripe promotion if checkout behavior is affected.
5. Preserve receipts, logs, and screenshots for review.
6. Open a remediation branch and rerun validation before another release gate.
