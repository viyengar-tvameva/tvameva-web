# CMS Content Guide

## Overview
All website content is managed through Drupal CMS and delivered via JSON:API. The React frontend fetches content from Drupal and falls back to static data (in `src/data/`) when the CMS is unavailable.

## Drupal Admin Access
- **Local**: http://localhost:8080/user/login (admin/admin)
- **Production**: http://34.56.251.119/user/login (or https://cms.tvameva.ai)

## Content Types

### Solution Area (`/admin/content` → type: Solution Area)
Each solution area page on the website. Currently 3 visible: EngageOS, InsightLens, PropelEdge.

**Key fields:**
| Field | Description |
|-------|-------------|
| Title | Solution area name (e.g., "PropelEdge") |
| field_slug | URL slug (e.g., "propeledge") — must be unique |
| field_tagline | Short tagline below the name |
| field_headline | Hero section main headline |
| field_hero_subheadline | Hero section body text |
| field_challenge_headline | "The problem" section title |
| field_challenge_body | "The problem" section body |
| field_value_drivers | JSON array of value drivers (see format below) |
| field_proof_points | JSON array of proof point cases |
| field_color | Theme color: "teal", "blue", "orange" |
| field_icon | Lucide icon name: "Layout", "BarChart3", "Rocket" |
| field_sa_priority | Sort order (1 = first) |

**Value Driver JSON format:**
```json
{
  "id": "opportunity-intake",
  "category": "Opportunity Intake",
  "headline": "Qualify leads in under an hour.",
  "body": "Full description...",
  "outcomeMetrics": ["Metric 1", "Metric 2"],
  "proofPoint": "A professional services team..."
}
```

### Differentiator (`/admin/content` → type: Differentiator)
Homepage "How we're different" section. 4 items.

| Field | Description |
|-------|-------------|
| Title | Differentiator name |
| field_what_we_say | What we claim |
| field_what_buyer_hears | What resonates with buyers |
| field_priority_order | Display order |
| field_icon | Lucide icon name |

### Proof Point (`/admin/content` → type: Proof Point)
Homepage stats bar and Results page. 4 items.

| Field | Description |
|-------|-------------|
| Title | Metric label (e.g., "Cost reduction") |
| field_stat_number | The stat (e.g., "67%") |
| field_context | Contextual explanation |
| field_priority | Display order |

### Case Study (`/admin/content` → type: Case Study)
Results page case studies. 2 items.

| Field | Description |
|-------|-------------|
| Title | Case study title |
| field_company_size | Company size descriptor |
| field_challenge | Challenge description |
| field_result | Result description |
| field_metrics_json | JSON array of {label, value} metrics |
| field_vertical_label | Industry vertical |

### Pod Role (`/admin/content` → type: Pod Role)
How We Deliver page pod composition. 6 roles.

| Field | Description |
|-------|-------------|
| Title | Role name |
| field_responsibility | Role responsibility |
| field_ai_augmentation | How AI augments this role |
| field_icon | Lucide icon name |
| field_priority | Display order |

## Content Guardrails

**NEVER include these names in any content:**
- LTTS
- Omnissa
- SiTime

**Use instead:**
- "Fortune 500 ISV"
- "Enterprise digital platform client"

**Safe to mention (platform partners):**
- Acquia, Google Cloud, Salesforce, Algolia, Threekit

The seed script automatically checks for restricted names and aborts if found.

## How Content Flows

```
Drupal CMS (edit content)
    ↓ JSON:API
React Frontend (fetches on page load)
    ↓ ISR (5-min revalidation)
Visitor sees updated content
```

Changes in Drupal appear on the website within 5 minutes (ISR revalidation).

## Seeding Content from Code

If you update content in `src/data/solutions.ts` or `src/data/content.ts`:

```bash
# Local
bash scripts/seed-local.sh

# Production (requires kubectl access)
# See docs/DEPLOYMENT.md for full commands
```

## Adding a New Solution Area

1. Add the SA data to `src/data/solutions.ts`
2. Add to `scripts/extract-solution-json.ts` priorityMap
3. Update Navbar, Footer, SolutionAreasGrid to show the new SA
4. Run `bash scripts/seed-local.sh` to test locally
5. Seed to production Drupal (see DEPLOYMENT.md)
6. Run regression tests: `bash scripts/test-regression.sh`
