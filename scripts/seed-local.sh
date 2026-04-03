#!/bin/bash
set -e

# =============================================================================
# seed-local.sh — One-command local Drupal content seeding
#
# Prerequisites: docker compose up (Drupal + MySQL running on port 8080)
#
# Usage:
#   bash scripts/seed-local.sh
# =============================================================================

DRUPAL_CONTAINER="tvameva-drupal"
DRUPAL_URL="http://localhost:8080"

echo "=== Tvameva Local Content Seed ==="

# Wait for Drupal to be ready
echo "Waiting for Drupal to be ready..."
for i in $(seq 1 60); do
  if curl -s -o /dev/null -w "%{http_code}" -H "Accept: application/vnd.api+json" "$DRUPAL_URL/jsonapi" 2>/dev/null | grep -q "200"; then
    echo "Drupal is ready."
    break
  fi
  if [ $i -eq 60 ]; then
    echo "ERROR: Drupal not ready after 60 attempts. Is docker compose up running?"
    exit 1
  fi
  echo "  Attempt $i/60 — waiting 3s..."
  sleep 3
done

# Copy scripts into container
echo ""
echo "--- Copying scripts to container ---"
docker cp src/utils/setup-content-model.php $DRUPAL_CONTAINER:/tmp/setup-content-model.php
docker cp scripts/drupal-seed-solution.php $DRUPAL_CONTAINER:/tmp/seed.php
docker cp scripts/seed-content.php $DRUPAL_CONTAINER:/tmp/seed-content.php

# Run content model setup
echo ""
echo "--- Setting up content model ---"
docker exec $DRUPAL_CONTAINER bash -c 'cd /opt/drupal/web && php /tmp/setup-content-model.php'

# Extract and seed solution areas
echo ""
echo "--- Seeding solution areas ---"
for slug in engageos insightlens propeledge; do
  echo "  Extracting $slug..."
  npx tsx scripts/extract-solution-json.ts $slug | docker exec -i $DRUPAL_CONTAINER bash -c "cat > /tmp/$slug.json"
  echo "  Seeding $slug..."
  docker exec $DRUPAL_CONTAINER bash -c "cd /opt/drupal/web && php /tmp/seed.php $slug"
done

# Extract and seed global content
echo ""
echo "--- Seeding global content (differentiators, proof points, case studies, pod roles) ---"
npx tsx scripts/extract-content-json.ts | docker exec -i $DRUPAL_CONTAINER bash -c "cat > /tmp/content.json"
docker exec $DRUPAL_CONTAINER bash -c 'cd /opt/drupal/web && php /tmp/seed-content.php /tmp/content.json'

# Verify
echo ""
echo "--- Verification ---"
SOLUTION_COUNT=$(curl -s -H "Accept: application/vnd.api+json" "$DRUPAL_URL/jsonapi/node/solution_area" | node -e "
  let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>{
    try { console.log(JSON.parse(d).data.length); } catch(e) { console.log(0); }
  });
")
echo "Solution areas in CMS: $SOLUTION_COUNT"

echo ""
echo "=== LOCAL SEED COMPLETE ==="
echo ""
echo "Next steps:"
echo "  1. Set NEXT_PUBLIC_USE_CMS=true in .env.local"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000/solutions/propeledge"
