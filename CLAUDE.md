# CLAUDE.md — Project Instructions for Claude Code

## Project Overview
This is the tvameva.ai website — a React (Next.js) frontend with a Drupal headless CMS.
The site is a lead-generation engine for an AI-native solutions provider. Three solution
areas: EngageOS (Digital Experience), InsightLens (Decision Intelligence), PropelEdge
(Revenue Orchestration). Target: enterprise buyers at any scale.

## Core Narrative — MUST be consistent across all pages
- **Tvameva** = "you alone" — singular focus on customer outcomes
- **Three solutions, one mission**: Tomorrow's Enterprise
- **Delivery model**: Human-Governed AI Pods — AI agents do the work, humans govern quality
- **NOT**: "5-7 specialists", "AI-enabled pods", "AI-assisted humans", "partner-anchored"
- **Pricing**: Outcome-based — tied to results, not hours or headcount
- **Our moat**: The Tvameva Intelligence & Agentic Layer — added on top of customer's existing platforms

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **CMS**: Drupal 10, headless via JSON:API
- **Deployment**: React on Cloud Run, Drupal on GKE Autopilot (namespace: `drupal`)
- **Database**: Cloud SQL MySQL (34.134.209.31)
- **Testing**: Playwright (smoke, content, integration, performance)
- **Visual Components**: CMS-driven SVG diagrams via Framer Motion (src/components/visuals/)

## Key Files
- `src/data/solutions.ts` — 6 solution areas (3 visible: EngageOS, InsightLens, PropelEdge)
- `src/data/content.ts` — Differentiators, proof points, pod roles, case studies, testimonials
- `src/data/assessment.ts` — AI Maturity Assessment questions and scoring
- `src/utils/drupal-client.ts` — CMS client (fetches solution_area, differentiator, proof_point, case_study, pod_role)
- `src/components/visuals/` — CMS-driven visual components (ArchitectureStack, MetricsComparison, etc.)
- `tailwind.config.js` — Brand design system tokens
- `infrastructure/drupal/docker-entrypoint.sh` — Auto-installs Drupal + modules + webform on pod start
- `scripts/seed-local.sh` / `scripts/seed-local.cmd` — One-command local content seeding

## Brand Design System
- Dark theme: navy (#0d1117) background, amber (#f5a623) accent, teal (#2ed8a3) secondary
- Logo colors: silver (#c8cdd8) for "tvameva", amber (#f5a623) for ".ai"
- SA colors: EngageOS (#2ed8a3 teal), InsightLens (#4a90d9 blue), PropelEdge (#e8593c orange)
- Fonts: Instrument Sans (display), DM Sans (body), JetBrains Mono (code/technical)
- Components: .btn-primary, .btn-secondary, .btn-ghost, .card, .card-interactive, .platform-badge

## Content Guardrails — CRITICAL AND NON-NEGOTIABLE
- NEVER mention: Omnissa, SiTime in any public-facing content (LTTS is OK)
- Anonymize client names as: "global high-tech manufacturing company", "global specialty manufacturing company", "professional services firm"
- Platform partners (Acquia, GCP, Salesforce) ARE public — but only show these 3 (not Algolia, Threekit)
- Brand voice: consultative, measured confidence, technically grounded, outcome-anchored

## Factual Integrity — ABSOLUTE RULE
- **NEVER fabricate testimonials, quotes, case studies, metrics, or any client-attributed content**
- Every testimonial MUST come from a real person who actually provided the quote
- Every metric MUST come from real engagement data or publicly verifiable sources with named analyst firms
- Every case study MUST be based on a real engagement — anonymized as needed, but factually accurate
- If no testimonial exists for a solution area, present challenge + solution + business value only — NO invented quotes
- If asked to create content you don't have factual basis for, SAY SO and ask for source material
- Market stats must cite sources (McKinsey, Gartner, Forrester, IDC, etc.)
- This protects brand integrity, voice, and trust. Violations undermine everything we're building.

## Design Patterns — Established and MUST be followed

### Page Structure (Solution Areas)
1. Hero (headline + architecture diagram + CTAs)
2. Market Context (the hook — business value stats, not vendor stats)
3. Challenge (customer pain, not our product description)
4. Value Drivers (capability cards — equal height, generic language)
5. Tech Stack (3-tier moat: Outcomes → Tvameva Intelligence → Your Existing Platforms)
6. Customer Success (proof points + testimonials if real)
7. Advisory CTA ("Ready to see [SA] in action?" + Book Demo + SA assessment)

### CTA Pattern
- **Primary CTA**: Always "Book a 30-Minute Demo" → https://calendly.com/varada-tvameva/30min (opens new tab)
- **Secondary CTA**: SA-specific assessment → /contact (NOT /advisory)
- **Never** link to /advisory from SA pages (that's the AI Maturity Assessment — different thing)

### Hero Subheadline Pattern
- MUST focus on customer pain/challenges/opportunities
- MUST NOT mention our tech stack, pipelines, pricing model, pod model, or delivery approach
- Save "how we do it" for later sections — the hero is about THEIR world

### Tech Stack 3-Tier Pattern
- Layers prefixed with: "Outcome:", "Tvameva Intelligence:", "Tvameva Agentic:", "Tvameva Accelerator:", "Your existing:"
- "Your existing" tier = generic enterprise systems (CRM, ERP, PIM, Data Platform) — NOT specific platforms we deploy (not Acquia, BigQuery, etc.)
- Component auto-detects tiers by scanning layer name prefixes

### Card Symmetry
- All cards in a grid MUST be equal height: use `items-stretch` on grid, `flex flex-col` on cards, `min-h-[Xpx]` where needed
- Never use `line-clamp` on market context or proof point cards

### Market Stats
- MUST focus on business value and urgency — NOT platform vendor market share or install base
- Buyer doesn't care about GCP customer count or Drupal TAM
- Good: "3-5x EBIT premium for analytics leaders" (McKinsey)
- Bad: "497K GCP customers in North America"

### Content Consistency
- "Customer Success" not "Results" — everywhere
- "Human-Governed AI Pods" not "AI-enabled pods" or "dedicated teams of 5-7 specialists"
- "Intelligence layer" not "partner-anchored depth"
- "Executive Scorecards" not "Executive Dashboards" (InsightLens)
- No company size restrictions ("$500M-$1B") — the problems we solve affect all enterprises
- PropelEdge is "Revenue Orchestration" not "Pre-Sales Automation" — it spans 12+ teams

### Testimonials
- Only show testimonials from real people who provided actual quotes
- Current real testimonials: Venugopal Arcot (PropelEdge), Avinash Thakur (EngageOS/Advisory)
- If no testimonial exists: show challenge + solution + business value only
- The `solutionArea` field on testimonials controls where they appear

## Architecture Decisions
- Static data in src/data/ is the fallback; Drupal JSON:API is the primary source
- Set NEXT_PUBLIC_USE_CMS=true to switch to CMS-driven content
- ISR with 5-minute revalidation for CMS content
- Contact form submits to Drupal webform REST endpoint
- Email delivery via Gmail SMTP (configured in Drupal)
- Visual components accept CMS JSON data as props (field_architecture_diagram, field_workflow_steps, etc.)

## Content Agents
- `engageos-content-creator` — EngageOS content + visual data
- `insightlens-content-creator` — InsightLens content + visual data
- `propeledge-content-creator` — PropelEdge content + visual data
- `drupal-cms-publisher` — Publishes any content to Drupal CMS (local Docker or GKE)
- Visual data schemas in `.claude/agents/visual-data-schemas.md`
- All agents have factual integrity rules embedded

## Local Development
- `docker compose up -d` → Drupal + MySQL locally
- `scripts/seed-local.cmd` (Windows) or `bash scripts/seed-local.sh` → seed all content
- `npm run dev` → Next.js dev server
- `npm test` → Playwright test suite

## Deployment
- Frontend: `bash infrastructure/cloudrun/deploy.sh`
- Drupal image: Build → push → `kubectl -n drupal set image deployment/drupal drupal=<image:tag>`
- Content seeding: See `docs/DEPLOYMENT.md`
- ALWAYS use `-n drupal` namespace with kubectl
- ALWAYS wrap /tmp/ paths in `bash -c '...'` to avoid Windows path translation

## Deployment Steps

### Pre-Deploy
1. `npx tsc --noEmit` — zero TypeScript errors
2. `rm -rf .next && npm run build` — 19 routes, zero errors
3. `npx playwright test --project=chromium` — 59/59 passing
4. Verify CMS content is current: seed if needed (see scripts/seed-local.cmd or docs/DEPLOYMENT.md)

### Deploy Frontend (Cloud Run)
```bash
docker build -t us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest .
docker push us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest
gcloud run deploy tvameva-web \
  --image us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest \
  --region us-central1 --project tvameva-website \
  --set-env-vars "NEXT_PUBLIC_USE_CMS=true,NEXT_PUBLIC_DRUPAL_BASE_URL=http://34.56.251.119,NEXT_PUBLIC_GA_ID=G-ZMVJ0SQ1JQ,SITE_URL=https://tvameva.ai"
```

### Deploy Drupal Image (after Dockerfile/entrypoint changes)
```bash
docker build -t us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3 infrastructure/drupal/
docker push us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3
kubectl -n drupal set image deployment/drupal drupal=us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3
kubectl -n drupal rollout status deployment/drupal
```

### Seed Content to GKE Drupal
```bash
POD=$(kubectl -n drupal get pods -l app=drupal -o jsonpath='{.items[0].metadata.name}')
# Copy scripts via stdin (Windows-safe)
cat src/utils/setup-content-model.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/setup-content-model.php'
cat scripts/drupal-seed-solution.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/seed.php'
cat scripts/seed-content.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/seed-content.php'
# Setup content model
kubectl -n drupal exec $POD -- bash -c 'cd /opt/drupal/web && php /tmp/setup-content-model.php'
# Seed SAs
for slug in engageos insightlens propeledge; do
  npx tsx scripts/extract-solution-json.ts $slug | kubectl -n drupal exec -i $POD -- bash -c "cat > /tmp/$slug.json"
  kubectl -n drupal exec $POD -- bash -c "cd /opt/drupal/web && php /tmp/seed.php $slug"
done
# Seed global content
npx tsx scripts/extract-content-json.ts | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/content.json'
kubectl -n drupal exec $POD -- bash -c 'cd /opt/drupal/web && php /tmp/seed-content.php /tmp/content.json'
```

### Post-Deploy Verification
```bash
BASE_URL=https://tvameva.ai npx playwright test tests/smoke.spec.ts
```

## Common Mistakes to NEVER Repeat
- Don't hardcode EngageOS-specific content in shared components (architecture diagrams, etc.)
- Don't use industry-specific language in generic copy (no "engineers", "semiconductor" in value drivers)
- Don't create fabricated testimonials from case study data
- Don't leave "Results" references when it should say "Customer Success"
- Don't link SA CTAs to /advisory — link to /contact or Calendly
- Don't mention all 5 partners — only show Acquia, GCP, Salesforce (3 visible SAs)
- Don't say "5-7 specialists" or "dedicated pods" — say "Human-Governed AI Pods"
- Don't put platform vendor stats in market context — use business value stats
- Don't describe our delivery model in hero subheadlines — describe customer pain
- Don't show pricing ($25K-$50K assessment) in CTAs — save pricing for conversations
- When user provides copy direction, elevate it into professional language — don't paste verbatim
