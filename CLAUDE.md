# CLAUDE.md — Project Instructions for Claude Code

## Project Overview
This is the tvameva.ai website — a React (Next.js) frontend with a Drupal headless CMS.
The site is a lead-generation engine for an AI-native solutions provider targeting
enterprise buyers ($500M–$1B revenue).

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **CMS**: Drupal 10/11, headless via JSON:API
- **Deployment**: React on Cloud Run, Drupal on GKE Autopilot
- **Database**: Cloud SQL (MySQL) for Drupal

## Key Files
- `src/data/solutions.ts` — 5 solution areas (source of truth until Drupal is connected)
- `src/data/content.ts` — Differentiators, proof points, pod roles, case studies
- `src/data/assessment.ts` — AI Maturity Assessment questions and scoring
- `src/utils/drupal-client.ts` — API client (falls back to static data when USE_CMS=false)
- `tailwind.config.js` — Brand design system tokens
- `infrastructure/` — GCP setup, Cloud Run deploy, GKE manifests, Drupal content model

## Brand Design System
- Dark theme: navy (#0d1117) background, amber (#f5a623) accent, teal (#2ed8a3) secondary
- Fonts: Instrument Sans (display), DM Sans (body), JetBrains Mono (code/technical)
- Components: .btn-primary, .btn-secondary, .btn-ghost, .card, .card-interactive, .platform-badge
- All component classes defined in src/styles/globals.css

## Content Guardrails — CRITICAL
- NEVER mention: LTTS, Omnissa, SiTime in any public-facing content
- Anonymize as: "Fortune 500 ISV", "enterprise digital platform client"
- Platform partners (Acquia, GCP, Salesforce, Algolia, Threekit) ARE public
- Brand voice: consultative, measured confidence, technically grounded, outcome-anchored

## Architecture Decisions
- Static data in src/data/ is the fallback; Drupal JSON:API is the target
- Set NEXT_PUBLIC_USE_CMS=true to switch to CMS-driven content
- ISR with 5-minute revalidation for CMS content
- Assessment data captured client-side, submitted to Drupal/CRM on gate completion

## Common Tasks
- Add new page: create in src/app/{route}/page.tsx
- Add section component: create in src/components/sections/
- Modify brand colors: update tailwind.config.js and src/styles/globals.css
- Update solution area content: edit src/data/solutions.ts
- Deploy frontend: bash infrastructure/cloudrun/deploy.sh
- Deploy Drupal: kubectl apply -f infrastructure/gke/drupal.yaml
