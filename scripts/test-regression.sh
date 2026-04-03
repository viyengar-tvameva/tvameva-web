#!/bin/bash
set -e

# =============================================================================
# test-regression.sh — Full regression test suite
#
# Run after ANY frontend or API change, before deploying.
#
# Usage:
#   bash scripts/test-regression.sh
#   BASE_URL=https://tvameva.ai bash scripts/test-regression.sh  # test prod
# =============================================================================

echo "=== Tvameva Regression Test Suite ==="
echo "Base URL: ${BASE_URL:-http://localhost:3000}"
echo ""

# Build first (catches TypeScript errors)
echo "--- Step 1: Build ---"
npm run build
echo "Build: PASSED"
echo ""

# Run all test suites
echo "--- Step 2: Smoke Tests ---"
npx playwright test tests/smoke.spec.ts --reporter=list
echo ""

echo "--- Step 3: Page Content Tests ---"
npx playwright test tests/pages.spec.ts --reporter=list
echo ""

echo "--- Step 4: Integration Tests ---"
npx playwright test tests/integrations.spec.ts --reporter=list
echo ""

echo "--- Step 5: Performance Tests ---"
npx playwright test tests/performance.spec.ts --reporter=list
echo ""

# Generate HTML report
echo "--- Generating HTML Report ---"
echo "Run 'npm run test:report' to view the detailed test report."

echo ""
echo "=== ALL REGRESSION TESTS PASSED ==="
