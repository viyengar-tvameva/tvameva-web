---
name: InsightLens Content Enrichment — Initial Build
description: Records the full enriched InsightLens content strategy, structure decisions, and what was built in the initial content pass
type: project
---

InsightLens in `src/data/solutions.ts` was enriched from a bare-minimum entry to a fully populated rich content page on par with EngageOS.

**Why:** InsightLens is a flagship solution targeting enterprise leaders at $500M–$1B revenue companies. The bare entry (no valueDrivers, no challenge, no podModel) was rendering the non-enriched fallback path — a far weaker page.

**How to apply:** The InsightLens entry now triggers `hasEnrichedContent()` and renders the full enriched component stack. Any future content updates should maintain all enriched fields.

## Structure built

Six value drivers (matching the six EngageOS drivers in depth):
1. Pipeline Engineering — Cloud Composer, dbt, BigQuery foundation
2. Predictive Analytics — Vertex AI models, churn/demand/revenue forecasting
3. Prescriptive Intelligence — Recommendation engines, reinforcement learning loops
4. Conversational Analytics — NLP/Gemini query interfaces over BigQuery
5. Executive Dashboards — Looker/LookML, decision-workflow-first design philosophy
6. Data Governance — Dataplex, Data Catalog, dbt contracts, audit readiness

Two anonymized proof points:
- "B2B Technology / SaaS" — revenue ops transformation, CFO monthly close reduction
- "Manufacturing / Industrial" — demand forecasting, 18pp accuracy improvement

Tech stack (9 layers):
Orchestration → Ingestion & Streaming → Storage & Lakehouse → Transformation → ML Platform → NLP & Generative AI → Visualization → Governance & Catalog → CRM Integration

Three connector IP items:
- GCP-Salesforce Data Bridge
- Vertex AI Pipeline Scaffolding (Kubeflow templates)
- Looker Block Library

## Component changes
- `SolutionValueDrivers.tsx`: Added 6 InsightLens category entries to `categoryConfig` (Pipeline Engineering, Predictive Analytics, Prescriptive Intelligence, Conversational Analytics, Executive Dashboards, Data Governance). Also made the section headline dynamic by `solution.id` — InsightLens gets "Six capabilities that turn raw data into decision intelligence."
- `SolutionTechStack.tsx`: Added 9 InsightLens-specific layer color entries to `layerColors` map.

## Pricing and advisory
- Assessment: Data & AI Readiness Assessment, $25K–$50K, 2–4 weeks
- Outcome metrics priced against: pipeline reliability SLA, dashboard adoption rate, time-to-insight reduction
- Pricing contrast: pay for pipeline SLA + dashboard adoption + model accuracy, not data engineers on the clock

## SEO
- metaTitle: 'InsightLens — Predictive & Prescriptive Analytics on GCP | Tvameva'
- metaDescription: focuses on GCP, decision intelligence, outcome-based pricing
