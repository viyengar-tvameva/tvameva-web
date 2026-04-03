# Testing Guide

## Overview
The project uses Playwright for end-to-end testing across 4 test categories.

## Test Categories

### 1. Smoke Tests (`tests/smoke.spec.ts`)
**Purpose**: Verify all pages load without errors.
- Every page returns HTTP 200
- Page titles are correct
- All navbar and footer links resolve
- robots.txt and sitemap.xml are accessible
- No unexpected console errors

**When to run**: After any page addition/removal, route changes, or layout modifications.

### 2. Page Content Tests (`tests/pages.spec.ts`)
**Purpose**: Verify key content renders on each page.
- Homepage sections (hero, proof points, solutions grid, differentiators)
- Solution pages render enriched layout (challenge, value drivers, etc.)
- Contact form has all required fields
- Advisory and assessment pages load correctly
- New pages (privacy, terms, careers, partners) have content

**When to run**: After content changes, component modifications, or CMS schema changes.

### 3. Integration Tests (`tests/integrations.spec.ts`)
**Purpose**: Verify third-party integrations work.
- GA4 script tag present in DOM
- HubSpot tracking script present
- Calendly links on contact page
- OG meta tags on all pages
- robots.txt and sitemap.xml content validation

**When to run**: After layout.tsx changes, .env changes, or integration modifications.

### 4. Performance Tests (`tests/performance.spec.ts`)
**Purpose**: Verify Web Vitals meet thresholds.
- Page load time < 5s
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- No JS bundles > 200KB
- Heading hierarchy (single h1)
- Image alt text coverage
- Keyboard accessibility basics

**When to run**: After adding images, fonts, large components, or new dependencies.

## Running Tests

```bash
# All tests
npm test

# Individual suites
npm run test:smoke
npm run test:pages
npm run test:integrations
npm run test:perf

# Full regression (build + all tests)
bash scripts/test-regression.sh

# Against production
BASE_URL=https://tvameva.ai npx playwright test tests/smoke.spec.ts

# View HTML report
npm run test:report
```

## Thresholds

| Metric | Threshold | Source |
|--------|-----------|--------|
| Page load time | < 5,000ms | performance.spec.ts |
| LCP | < 2,500ms | performance.spec.ts |
| CLS | < 0.1 | performance.spec.ts |
| JS bundle size | < 200KB each | performance.spec.ts |
| HTTP status | 200 for all pages | smoke.spec.ts |

## When to Run What

| Change Type | Tests to Run |
|-------------|-------------|
| New page added | smoke + pages |
| Component modified | pages + perf |
| Layout/nav changed | smoke + pages + integrations |
| CMS content changed | pages (with USE_CMS=true) |
| .env changed | integrations |
| New dependency added | perf |
| Before deploy | ALL (regression) |

## Adding New Tests
1. Add test to the appropriate file based on category
2. Follow existing patterns for assertions
3. Run the full suite to ensure no regressions
4. Update this document if adding a new test category
