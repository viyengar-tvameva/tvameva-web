# Site Architecture — tvameva.ai

Last updated: 2026-04-03

## Page Map

### Navigation Structure
```
Navbar:
  Solutions ▾
    ├── EngageOS          /solutions/engageos     [Acquia / Drupal]
    ├── InsightLens       /solutions/insightlens  [Google Cloud]
    └── PropelEdge        /solutions/propeledge   [Tvameva AI Platform]
  How We Deliver          /how-we-deliver
  Customer Success        /results
  Advisory                /advisory
  About                   /about
  Contact                 /contact
  [Schedule Assessment]   /advisory (CTA button)

Footer:
  Solutions: EngageOS, InsightLens, PropelEdge
  Company: How We Deliver, Customer Success, About, Careers
  Resources: Advisory Assessments, AI Maturity Assessment, Partner Ecosystem
  Legal: Privacy Policy, Terms of Service
```

## Page Details

### Homepage (`/`)
- **File**: `src/app/page.tsx`
- **Sections**: Hero → ProofPointsBar → PartnerLogos → SolutionAreasGrid (3 SAs) → DifferentiatorsSection → ICPSection → AdvisoryCTA
- **Data**: CMS (proof points, differentiators) with static fallback from `content.ts`

### Solution Pages (`/solutions/[slug]`)
- **File**: `src/app/solutions/[slug]/page.tsx`
- **Enriched layout** (EngageOS, InsightLens, PropelEdge): Hero with ArchitectureStack → Challenge → AgentPipelineFlow (if workflow data) → MetricsComparison (if metrics data) → ValueDrivers → PodModel → TechStack → ProofPoints → Testimonials → MarketContext → ExpansionPath → AdvisoryExtended
- **Basic layout** (ResolveIQ, SearchCore, VisualForge — hidden): Capabilities → IP → Metrics → Market → Expansion → AdvisoryCTA
- **Data**: CMS first (`drupalClient.getSolutionBySlug`), falls back to `solutions.ts`
- **Visual components**: ArchitectureStack (hero diagram), AgentPipelineFlow (PropelEdge), MetricsComparison (PropelEdge), RelationshipGraph (expansion paths)

### How We Deliver (`/how-we-deliver`)
- **File**: `src/app/how-we-deliver/page.tsx`
- **Sections**: Hero with PodCompositionDiagram → Model Comparison (Traditional vs AI Pod) → MetricsComparison → AI Pod Composition (agents + humans) → Evidence/Numbers → Accelerator Arsenal → Security-First Delivery → Case Study (tvameva.ai build) → Outcome-Based Pricing → CTA
- **Data**: CMS (pod roles) with static fallback from `content.ts`

### Customer Success (`/results`)
- **File**: `src/app/results/page.tsx`
- **Sections**: Hero with SuccessMetricsVisual → Case Studies → Testimonials → CTA
- **Data**: CMS (proof points, case studies) with static fallback. Testimonials from `content.ts`

### Advisory (`/advisory`)
- **File**: `src/app/advisory/page.tsx`
- **Sections**: Hero → Assessment cards → Testimonial (advisory) → CTA
- **Data**: `solutions.ts` (advisory fields per SA) + `content.ts` (testimonials)

### AI Maturity Assessment (`/advisory/ai-maturity`)
- **File**: `src/app/advisory/ai-maturity/page.tsx`
- **Sections**: Interactive 15-question assessment with scoring, radar chart results, lead capture gate
- **Data**: `assessment.ts` (5 dimensions, 3 questions each, client-side scoring)

### Contact (`/contact`)
- **File**: `src/app/contact/page.tsx`
- **Sections**: Form + Calendly link
- **Integration**: Drupal webform REST API (`/webform_rest/submit`)

### About (`/about`)
- **File**: `src/app/about/page.tsx`
- **Sections**: Why we exist, How we work, Platform ecosystem
- **Data**: Hardcoded

### Static Pages
| Page | File | Purpose |
|---|---|---|
| Careers | `src/app/careers/page.tsx` | Hiring messaging + contact CTA |
| Partners | `src/app/partners/page.tsx` | Acquia, GCP, Salesforce, Algolia, Threekit |
| Privacy | `src/app/privacy/page.tsx` | Privacy policy |
| Terms | `src/app/terms/page.tsx` | Terms of service |

## Component Architecture

### Layout Components (`src/components/layout/`)
- `Navbar.tsx` — Fixed nav with Solutions dropdown (150ms close delay, invisible bridge for hover)
- `Footer.tsx` — 5-column footer with solutions, company, resources, legal, get started
- `Logo.tsx` — Brand SVG logo

### Visual Components (`src/components/visuals/`)
All CMS-driven — accept data props from Drupal JSON fields.

| Component | Purpose | Data Source |
|---|---|---|
| `ArchitectureStack` | Animated layered architecture diagrams | `field_architecture_diagram` |
| `AgentPipelineFlow` | Connected agent workflow with time compression | `field_workflow_steps` |
| `MetricsComparison` | Before/after comparison table | `field_metrics_comparison` |
| `PodCompositionDiagram` | Orbital AI agent + human governance layout | `podModel.roles` |
| `RelationshipGraph` | Hub-and-spoke SA connections | `field_relationship_graph` |
| `SuccessMetricsVisual` | Animated metrics for Customer Success hero | Hardcoded (4 metrics) |
| `TestimonialCard` | Client testimonial with photo, quote, highlights | `content.ts` testimonials |

### Section Components (`src/components/sections/solution/`)
Enriched SA page sections — each accepts a `SolutionArea` prop.

| Component | Section | Key Data Fields |
|---|---|---|
| `SolutionHero` | Hero with headline + CTA + architecture diagram | headline, heroSubheadline, heroCTAs, architectureDiagram |
| `SolutionChallenge` | "The problem" section | challenge.headline, challenge.body |
| `SolutionValueDrivers` | Expandable value driver cards | valueDrivers[] |
| `SolutionPodModel` | Pod composition + AI agent types | podModel |
| `SolutionTechStack` | Layered tech stack | techStack.layers, techStack.connectors |
| `SolutionProofPoints` | Case-style proof points | proofPoints[] |
| `SolutionMarketContext` | Market stats with context | marketContext.stats[] |
| `SolutionExpansionPath` | Hub-and-spoke expansion | expansionPath.connections[] |
| `SolutionAdvisoryExtended` | Advisory CTA with scope items | advisoryExtended |

## Data Flow

```
Content Creator Agent
  → writes to src/data/solutions.ts or src/data/content.ts
    → Drupal CMS Publisher Agent
      → extracts JSON (extract-solution-json.ts)
      → seeds to Drupal (drupal-seed-solution.php)
        → Drupal stores in MySQL (Cloud SQL)
          → React frontend fetches via JSON:API (drupal-client.ts)
            → ISR revalidation every 5 minutes
              → Visitor sees updated content
```

## Integrations

| Integration | Status | Config |
|---|---|---|
| GA4 | Active | `NEXT_PUBLIC_GA_ID=G-ZMVJ0SQ1JQ` in layout.tsx via Analytics component |
| HubSpot | Ready (env var needed) | `NEXT_PUBLIC_HUBSPOT_ID` — uncomment in .env.local |
| Calendly | Active (link) | Direct link on contact page |
| Drupal JSON:API | Active | `NEXT_PUBLIC_DRUPAL_BASE_URL`, 5-min ISR revalidation |
| Drupal Webform | Active | Contact form submits to `/webform_rest/submit` |

## Content Agents

| Agent | File | Purpose |
|---|---|---|
| `engageos-content-creator` | `.claude/agents/engageos-content-creator.md` | EngageOS content + visual data |
| `insightlens-content-creator` | `.claude/agents/insightlens-content-creator.md` | InsightLens content + visual data |
| `propeledge-content-creator` | `.claude/agents/propeledge-content-creator.md` | PropelEdge content + visual data |
| `drupal-cms-publisher` | `.claude/agents/drupal-cms-publisher.md` | Publishes any content to Drupal CMS |

All content agents can produce visual component data (architecture diagrams, workflow steps, metrics comparisons, relationship graphs) per the schemas in `.claude/agents/visual-data-schemas.md`.
