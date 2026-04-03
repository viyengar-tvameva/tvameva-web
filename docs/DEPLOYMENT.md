# Deployment Playbook — tvameva.ai

Last updated: 2026-04-03

## Architecture Overview

```
┌─────────────────────────┐     ┌─────────────────────────┐
│   Cloud Run (Frontend)  │────▶│   GKE (Drupal CMS)      │
│   Next.js 14 SSG/ISR    │     │   Drupal 10 + JSON:API   │
│   tvameva.ai            │     │   34.56.251.119           │
└─────────────────────────┘     └───────────┬─────────────┘
                                            │
                                 ┌──────────▼──────────┐
                                 │   Cloud SQL (MySQL)  │
                                 │   34.134.209.31      │
                                 └─────────────────────┘
```

| Component | Service | Image Registry |
|-----------|---------|---------------|
| Frontend | Cloud Run (`us-central1`) | `us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web` |
| CMS | GKE Autopilot, namespace `drupal` | `us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v2` |
| Database | Cloud SQL MySQL | `34.134.209.31:3306`, db `drupal`, user `drupal` |

## Current State (2026-04-03)

### Content in Drupal CMS
| Content Type | Count | Nodes |
|---|---|---|
| solution_area | 3 | EngageOS, InsightLens, PropelEdge |
| differentiator | 4 | AI-enabled pods, Outcome-based pricing, Partner-anchored depth, Reusable accelerator IP |
| proof_point | 4 | 6-8 weeks saved, 5 hours proposal, 60-70% lower cost, 3x pipeline |
| case_study | 1 | Enterprise DXP Modernization |
| pod_role | 6 | 7 AI agents + 2 human governance roles |
| **Total** | **18** | |

### Pages (19 routes)
| Route | Type | Content Source |
|---|---|---|
| `/` | Static | CMS (proof points, differentiators) + static fallback |
| `/solutions` | Static | solutions.ts (filtered to 3 visible) |
| `/solutions/engageos` | SSG | CMS → static fallback |
| `/solutions/insightlens` | SSG | CMS → static fallback |
| `/solutions/propeledge` | SSG | CMS → static fallback |
| `/about` | Static | Hardcoded |
| `/how-we-deliver` | Static | CMS (pod roles) + static fallback |
| `/results` (Customer Success) | Static | CMS (proof points, case studies) + static fallback |
| `/advisory` | Static | solutions.ts + hardcoded |
| `/advisory/ai-maturity` | Static | assessment.ts (client-side) |
| `/contact` | Static | Hardcoded + Drupal webform |
| `/careers` | Static | Hardcoded |
| `/partners` | Static | Hardcoded |
| `/privacy` | Static | Hardcoded |
| `/terms` | Static | Hardcoded |

---

## Pre-Deployment Checklist

```
[ ] All tests pass: npx playwright test (59/59)
[ ] Build succeeds: npm run build (19 routes, 0 errors)
[ ] Performance: LCP < 3s, CLS < 0.1 on all pages
[ ] Content guardrails: No mentions of Omnissa, SiTime in public content
    (LTTS is OK per user approval)
[ ] Testimonial photos in public/testimonials/ (not confidential PDFs)
[ ] Confidential PDFs NOT in public/ directory
[ ] .env.local has correct production values
[ ] Docker Desktop running (for image build)
[ ] gcloud auth current (gcloud auth login if expired)
[ ] kubectl access to GKE cluster (namespace: drupal)
```

---

## Step-by-Step Deployment

### Phase 1: Final Build + Test

```bash
# 1. Clean build
rm -rf .next
npm run build

# 2. Run full test suite
npx playwright test

# 3. Verify all 59 tests pass
# If failures: check docs/TEST-RESULTS.md for known issues
```

### Phase 2: Deploy Frontend to Cloud Run

```bash
# Option A: Use deploy script
bash infrastructure/cloudrun/deploy.sh

# Option B: Manual
docker build -t us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest .
docker push us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest

gcloud run deploy tvameva-web \
  --image us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-web:latest \
  --region us-central1 \
  --project tvameva-website \
  --set-env-vars "NEXT_PUBLIC_USE_CMS=true,NEXT_PUBLIC_DRUPAL_BASE_URL=http://34.56.251.119,NEXT_PUBLIC_GA_ID=G-ZMVJ0SQ1JQ,SITE_URL=https://tvameva.ai"
```

### Phase 3: Verify Drupal CMS is Running

```bash
# Check pod is running
kubectl -n drupal get pods -l app=drupal

# Verify JSON:API returns content
kubectl -n drupal exec $(kubectl -n drupal get pods -l app=drupal -o jsonpath='{.items[0].metadata.name}') -- bash -c '
curl -s -H "Accept: application/vnd.api+json" http://localhost/jsonapi/node/solution_area | php -r "
\$d = json_decode(file_get_contents(\"php://stdin\"), true);
foreach (\$d[\"data\"] as \$n) echo \$n[\"attributes\"][\"title\"] . \"\n\";
echo \"Total: \" . count(\$d[\"data\"]) . \" solutions\n\";
"'
```

Expected output:
```
EngageOS
InsightLens
PropelEdge
Total: 3 solutions
```

### Phase 4: Seed Content (if needed)

Only needed after a fresh Drupal install or content model changes.

```bash
POD=$(kubectl -n drupal get pods -l app=drupal -o jsonpath='{.items[0].metadata.name}')

# Copy scripts via stdin (Windows-safe — avoids /tmp path translation)
cat src/utils/setup-content-model.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/setup-content-model.php'
cat scripts/drupal-seed-solution.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/seed.php'
cat scripts/seed-content.php | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/seed-content.php'

# Setup content model (creates content types + fields)
kubectl -n drupal exec $POD -- bash -c 'cd /opt/drupal/web && php /tmp/setup-content-model.php'

# Seed 3 solution areas
for slug in engageos insightlens propeledge; do
  npx tsx scripts/extract-solution-json.ts $slug | kubectl -n drupal exec -i $POD -- bash -c "cat > /tmp/$slug.json"
  kubectl -n drupal exec $POD -- bash -c "cd /opt/drupal/web && php /tmp/seed.php $slug"
done

# Seed global content (differentiators, proof points, case studies, pod roles)
npx tsx scripts/extract-content-json.ts | kubectl -n drupal exec -i $POD -- bash -c 'cat > /tmp/content.json'
kubectl -n drupal exec $POD -- bash -c 'cd /opt/drupal/web && php /tmp/seed-content.php /tmp/content.json'
```

### Phase 5: Post-Deploy Verification

```bash
# Run smoke tests against production
BASE_URL=https://tvameva.ai npx playwright test tests/smoke.spec.ts

# Manual checks:
# - Visit https://tvameva.ai — homepage loads
# - Visit https://tvameva.ai/solutions/propeledge — PropelEdge renders with visuals
# - Click all nav items — no 404s
# - Check testimonials render with photos
# - Verify GA4 fires in browser devtools (Network tab → gtag)
```

### Phase 6: DNS Switch

Configure at your domain registrar:

| Record | Type | Value |
|--------|------|-------|
| `tvameva.ai` | A / CNAME | Cloud Run service URL |
| `www.tvameva.ai` | CNAME | `tvameva.ai` |
| `cms.tvameva.ai` | A | `34.56.251.119` |

After DNS propagation (~5-30 min), verify:
```bash
curl -I https://tvameva.ai
# Should return 200 from Cloud Run
```

---

## Drupal Image Management

### When to rebuild the Drupal image:
- Changes to `infrastructure/drupal/Dockerfile`
- Changes to `infrastructure/drupal/docker-entrypoint.sh`
- Changes to `infrastructure/drupal/settings.php`

### How to rebuild:
```bash
# Build
docker build -t us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3 infrastructure/drupal/

# Push
docker push us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3

# Deploy (use explicit tag, not :latest — avoids kubelet cache)
kubectl -n drupal set image deployment/drupal drupal=us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v3

# Wait for rollout
kubectl -n drupal rollout status deployment/drupal
```

### Drupal entrypoint auto-recovery:
The custom entrypoint (`docker-entrypoint.sh`) runs on every pod start:
1. Waits for MySQL (PDO-based check)
2. If Drupal not installed → runs `drush site:install standard`
3. Enables core modules: field, node, jsonapi, serialization, rest, basic_auth
4. Rebuilds caches
5. Starts Apache

This means the Drupal pod is **self-healing** — it recovers from fresh database or pod restarts automatically.

---

## Rollback Procedures

### Frontend rollback:
```bash
# List revisions
gcloud run revisions list --service tvameva-web --region us-central1 --project tvameva-website

# Route traffic to previous revision
gcloud run services update-traffic tvameva-web \
  --to-revisions=REVISION_NAME=100 \
  --region us-central1 \
  --project tvameva-website
```

### Drupal rollback:
```bash
# Deploy previous image tag
kubectl -n drupal set image deployment/drupal drupal=us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:v2
kubectl -n drupal rollout status deployment/drupal
```

### Content rollback:
Content is in Cloud SQL (persistent). To restore:
1. Re-run seed scripts with the previous version of `solutions.ts` / `content.ts`
2. Or restore from Cloud SQL backup

---

## Known Issues & Workarounds

| Issue | Workaround |
|---|---|
| `next start` standalone mode doesn't serve robots.txt/sitemap.xml | Works correctly in Cloud Run. Test with `npm run dev` for local verification. |
| Windows Git Bash translates `/tmp/` to Windows temp path | Always wrap in `bash -c '...'` when using kubectl exec |
| GKE image pull 403 on new image tags | Run: `gcloud artifacts repositories add-iam-policy-binding tvameva-images --project=tvameva-website --location=us-central1 --member="serviceAccount:120065922337-compute@developer.gserviceaccount.com" --role="roles/artifactregistry.reader"` |
| `.next` directory locked during build | Stop `npm run dev` before running `npm run build` |
| Drupal JSON:API requires Accept header | Always use `-H "Accept: application/vnd.api+json"` with curl |

---

## Infrastructure References

| Resource | Location |
|---|---|
| GCP Project | `tvameva-website` |
| Region | `us-central1` |
| Artifact Registry | `us-central1-docker.pkg.dev/tvameva-website/tvameva-images/` |
| Cloud Run service | `tvameva-web` |
| GKE cluster | `tvameva-gke` (Autopilot) |
| Drupal namespace | `drupal` |
| Cloud SQL instance | `tvameva-drupal-db` |
| Drupal external IP | `34.56.251.119` |
| Cloud SQL IP | `34.134.209.31` |
