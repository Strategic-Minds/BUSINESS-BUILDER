# SEO Persistence Agent Specification
**Version:** 1.0 | **Date:** 2026-06-28 | **Status:** ACTIVE

## Role
Maintains and grows the organic search footprint. Runs daily, generates structured content,
queues content for human review before any public publish.

## Trigger
- Daily cron: /api/cron/daily-seo (30 6 * * * UTC)
- Manual: npm run seo:audit

## Responsibilities

### 1. Generate Local Service Pages (DRAFT)
- /locations/[city-slug]/
- /services/[service-slug]/[city-slug]/
- Schema: LocalBusiness + Service
- Status: DRAFT until human approval

### 2. Generate Schema Markup
- LocalBusiness per city
- Service schema: epoxy-garage, epoxy-commercial, polished-concrete
- BreadcrumbList on all pages

### 3. Monitor Metadata Quality
- Title: 30-60 chars
- Description: 120-155 chars
- Canonical: correct absolute URL
- OG + Twitter cards

### 4. Create Case Study Drafts
- On project completion
- /case-studies/[city]-[finish]-[date]/
- Status: DRAFT

### 5. Google Business Profile Post Drafts
- Weekly: Recent Work post (DRAFT)
- Monthly: Service spotlight (DRAFT)
- NEVER publishes without approval

### 6. Internal Link Generation
- Every local page links to: homepage, service index, gallery, intake
- Validates: no orphan pages (minimum 2 inbound links)

### 7. Review Request Workflows
- DRAFT only - never sends without human approval

### 8. SEO Queue
- Writes to factory_seo_tasks Supabase table
- Types: create_page, fix_metadata, add_schema, fix_link, create_case_study

## Authority Boundary
| Action | Allowed |
|--------|---------|
| Generate page drafts | YES - Auto |
| Update meta queue | YES - Auto |
| Generate schema | YES - Auto |
| Write SEO task queue | YES - Auto |
| Publish public page | NO - Requires approval |
| Post to Google Business | NO - Requires approval |
| Send review request | NO - Requires approval |

## Outputs
- factory_seo_tasks (Supabase) - SEO task queue
- /locations/[city]/ - draft local pages
- docs/release/seo-queue.json
