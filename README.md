# tvameva-web

Tvameva.ai website — React (Next.js) frontend + Drupal headless CMS.

## Architecture

```
tvameva.ai (Cloud Run)          cms.tvameva.ai (GKE)
┌──────────────────┐            ┌──────────────────┐
│  Next.js (React) │ ──JSON:API──▶│  Drupal 10/11   │
│  Cloud Run       │            │  GKE Autopilot   │
│  Auto-scaling    │            │  Cloud SQL MySQL  │
└──────────────────┘            └──────────────────┘
```

- **React Frontend**: Next.js 14 on Cloud Run (auto-scaling, cost-efficient)
- **Drupal CMS**: Headless Drupal 10 on GKE Autopilot (persistent storage, Cloud SQL)
- **Content Delivery**: Drupal JSON:API → React ISR (5-min revalidation)
- **Fallback**: Static TypeScript data in `src/data/` when CMS is not connected

## Quick Start (Local Dev)

```bash
npm install
npm run dev
# Opens http://localhost:3000
```

The site runs with static data by default. Set `NEXT_PUBLIC_USE_CMS=true` to connect to Drupal.

## Project Structure

```
tvameva-web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── solutions/
│   │   │   └── [slug]/page.tsx # Dynamic solution area pages
│   │   ├── how-we-deliver/     # Delivery model page
│   │   ├── results/            # Proof points & case studies
│   │   ├── advisory/           # Assessment landing + AI maturity tool
│   │   ├── about/
│   │   └── contact/
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Page section components
│   │   │   └── solution/       # Solution page-specific sections
│   │   ├── assessment/         # Interactive assessment components
│   │   └── common/             # Shared UI components
│   ├── data/                   # Static content (messaging framework)
│   │   ├── solutions.ts        # 5 solution areas
│   │   ├── content.ts          # Differentiators, proof points, pod roles
│   │   └── assessment.ts       # AI maturity assessment questions
│   ├── styles/
│   │   └── globals.css         # Tailwind + brand design system
│   ├── utils/
│   │   └── drupal-client.ts    # Drupal JSON:API client
│   └── hooks/
├── infrastructure/
│   ├── gcp-setup.sh            # One-time GCP project setup
│   ├── cloudrun/
│   │   └── deploy.sh           # Cloud Run deployment script
│   ├── gke/
│   │   └── drupal.yaml         # K8s manifests for Drupal on GKE
│   └── drupal/
│       └── content-model.md    # Drupal content types & fields spec
├── Dockerfile                  # Multi-stage build for Cloud Run
├── tailwind.config.js          # Brand design system tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

## Deployment

### 1. GCP Project Setup (one-time)
```bash
export GCP_PROJECT_ID=tvameva-prod
export GCP_BILLING_ACCOUNT=your-billing-account-id
bash infrastructure/gcp-setup.sh
```

### 2. Deploy Drupal to GKE
```bash
# Update PROJECT_ID:REGION in drupal.yaml Cloud SQL proxy args
kubectl apply -f infrastructure/gke/drupal.yaml
```

### 3. Deploy React to Cloud Run
```bash
bash infrastructure/cloudrun/deploy.sh
```

### 4. DNS Configuration
Point these records to the GCP resources:
- `tvameva.ai` → Cloud Run service URL
- `cms.tvameva.ai` → GKE Ingress IP

## Content Guardrails

**NEVER mention publicly:**
- LTTS (SI partner)
- Omnissa (client — anonymize as "Fortune 500 ISV")
- SiTime (client — anonymize as "enterprise digital platform client")

**Platform partners ARE public:** Acquia, Google Cloud, Salesforce, Algolia, Threekit

## Brand Voice
- Consultative first
- Measured confidence (specific numbers, not hand-waving)
- Technically grounded (name the stack, the connector, the integration)
- Outcome-anchored (every claim ties to a business result)
