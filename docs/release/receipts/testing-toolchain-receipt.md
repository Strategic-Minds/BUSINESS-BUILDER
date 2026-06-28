# Testing Toolchain Receipt
**Date:** 2026-06-28T06:41:00Z | **Agent:** APEX | **Status:** INSTALLED

## Dependencies Added (package.json)
- @playwright/test ^1.47.0
- vitest ^2.1.0
- lighthouse ^12.0.0
- axe-core ^4.10.0
- playwright ^1.47.0
- sharp ^0.33.0
- pixelmatch ^6.0.0
- pngjs ^7.0.0
- wait-on ^8.0.0
- start-server-and-test ^2.0.0

## Scripts Added
- npm test — vitest unit tests
- npm run test:e2e — playwright tests
- npm run test:lighthouse — lighthouse audit
- npm run test:a11y — axe accessibility
- npm run test:screenshots — screenshot capture
- npm run validate — full validation chain
- npm run qa:score — QA scoring
- npm run qa:full — validate + score
- npm run autofix — safe defect fixes
- npm run check-tools — tool access check

## Not yet installed (needs npm install)
Run: npm install && npx playwright install --with-deps chromium
