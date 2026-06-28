# Lighthouse Receipt
**Date:** 2026-06-28T06:41:00Z | **Agent:** APEX | **Status:** CONFIGURED

## Script
scripts/run-lighthouse.mjs

## Thresholds
- Performance: >= 70 (fail CI if below)
- Accessibility: >= 90 (fail CI if below)
- SEO: >= 90 (fail CI if below)
- Best Practices: informational only

## Output
- docs/release/lighthouse-report.report.json
- docs/release/lighthouse-report.report.html

## Status
NOT YET RUN — requires live server
Run: npm run dev (port 3000), then npm run test:lighthouse
