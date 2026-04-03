/**
 * Extract a solution area from solutions.ts and output as JSON.
 *
 * Usage:
 *   npx tsx scripts/extract-solution-json.ts <slug>
 *   npx tsx scripts/extract-solution-json.ts insightlens > /tmp/insightlens.json
 *   npx tsx scripts/extract-solution-json.ts --all  # exports all solutions
 *
 * The JSON output matches the shape expected by drupal-seed-solution.php.
 */

import { solutionAreas } from '../src/data/solutions';

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: npx tsx scripts/extract-solution-json.ts <slug|--all>');
  process.exit(1);
}

// Priority map
const priorityMap: Record<string, number> = {
  engageos: 1,
  insightlens: 2,
  propeledge: 3,
  resolveiq: 4,
  searchcore: 5,
  visualforge: 6,
};

function enrichWithPriority(sa: typeof solutionAreas[number]) {
  return {
    ...sa,
    priority: priorityMap[sa.slug] ?? 99,
  };
}

if (slug === '--all') {
  const output: Record<string, any> = {};
  for (const sa of solutionAreas) {
    output[sa.slug] = enrichWithPriority(sa);
  }
  console.log(JSON.stringify(output, null, 2));
} else {
  const sa = solutionAreas.find((s) => s.slug === slug || s.id === slug);
  if (!sa) {
    console.error(`Solution area not found: ${slug}`);
    console.error('Available slugs:', solutionAreas.map((s) => s.slug).join(', '));
    process.exit(1);
  }
  console.log(JSON.stringify(enrichWithPriority(sa), null, 2));
}
