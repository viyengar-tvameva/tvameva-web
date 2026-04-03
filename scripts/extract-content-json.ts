/**
 * Extract global content (differentiators, proof points, case studies, pod roles)
 * from content.ts and output as JSON for Drupal seeding.
 *
 * Usage:
 *   npx tsx scripts/extract-content-json.ts > /tmp/content.json
 */

import { differentiators, proofPoints, caseStudies, podRoles } from '../src/data/content';

const output = {
  differentiators,
  proofPoints,
  caseStudies,
  podRoles,
};

console.log(JSON.stringify(output, null, 2));
