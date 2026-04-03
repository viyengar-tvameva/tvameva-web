import { test, expect } from '@playwright/test';

/**
 * Page Content Tests — Verify key content renders on each page.
 * Run: npx playwright test tests/pages.spec.ts
 */

test.describe('Homepage Content', () => {
  test('renders all major sections', async ({ page }) => {
    await page.goto('/');
    // Hero section
    await expect(page.locator('h1').first()).toBeVisible();
    // Solutions grid — 3 visible SAs
    await expect(page.locator('text=EngageOS').first()).toBeVisible();
    await expect(page.locator('text=InsightLens').first()).toBeVisible();
    await expect(page.locator('text=PropelEdge').first()).toBeVisible();
    // Differentiators
    await expect(page.locator('text=How we\'re different')).toBeVisible();
    // Advisory CTA
    await expect(page.locator('text=Schedule Assessment').first()).toBeVisible();
  });

  test('solutions grid shows exactly 3 SAs', async ({ page }) => {
    await page.goto('/');
    const solutionCards = page.locator('#solutions a[href^="/solutions/"]');
    await expect(solutionCards).toHaveCount(3);
  });
});

test.describe('Solution Pages — Enriched Layout', () => {
  const enrichedSlugs = ['engageos', 'insightlens', 'propeledge'];

  for (const slug of enrichedSlugs) {
    test(`/solutions/${slug} renders enriched sections`, async ({ page }) => {
      await page.goto(`/solutions/${slug}`);
      // Hero
      await expect(page.locator('main h1').first()).toBeVisible();
      // Market context (now first section after hero)
      await expect(page.locator('text=Market Signal').first()).toBeVisible();
      // Challenge section exists in DOM (may be below fold)
      await expect(page.locator('text=holding back').or(page.locator('text=killing your')).or(page.locator('text=everywhere'))).toBeAttached();
    });
  }

  test('each SA page has unique hero content — no cross-SA duplication', async ({ page }) => {
    const heroTexts: Record<string, { h1: string; sub: string; diagram: string }> = {};

    for (const slug of enrichedSlugs) {
      await page.goto(`/solutions/${slug}`);
      const h1 = await page.locator('main h1').first().textContent() || '';
      const sub = await page.locator('main h1 + p, main h1 ~ p').first().textContent() || '';
      // Capture SVG text elements to detect hardcoded diagrams
      const svgTexts = await page.locator('svg text').allTextContents();
      const diagram = svgTexts.join('|');
      heroTexts[slug] = { h1, sub, diagram };
    }

    // Verify no two SAs share the same headline
    const h1Values = Object.values(heroTexts).map(v => v.h1);
    expect(new Set(h1Values).size, 'Each SA must have a unique h1').toBe(enrichedSlugs.length);

    // Verify no two SAs share the same hero subheadline
    const subValues = Object.values(heroTexts).map(v => v.sub);
    expect(new Set(subValues).size, 'Each SA must have a unique subheadline').toBe(enrichedSlugs.length);

    // Verify no two SAs share the same diagram content
    const diagramValues = Object.values(heroTexts).map(v => v.diagram);
    expect(new Set(diagramValues).size, 'Each SA must have a unique hero diagram').toBe(enrichedSlugs.length);
  });
});

test.describe('Solutions Grid Page', () => {
  test('/solutions shows 3 solution areas', async ({ page }) => {
    await page.goto('/solutions');
    await expect(page.locator('text=Three solution areas').first()).toBeVisible();
    await expect(page.locator('text=EngageOS').first()).toBeVisible();
    await expect(page.locator('text=InsightLens').first()).toBeVisible();
    await expect(page.locator('text=PropelEdge').first()).toBeVisible();
  });
});

test.describe('Contact Page', () => {
  test('contact form is present', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('form').or(page.locator('input')).first()).toBeVisible();
  });
});

test.describe('Advisory Pages', () => {
  test('/advisory lists assessment options', async ({ page }) => {
    await page.goto('/advisory');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('/advisory/ai-maturity loads assessment', async ({ page }) => {
    await page.goto('/advisory/ai-maturity');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});

test.describe('Static Pages', () => {
  test('/about has content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('main h1').first()).toBeVisible();
  });

  test('/how-we-deliver has content', async ({ page }) => {
    await page.goto('/how-we-deliver');
    await expect(page.locator('text=AI agents do the work')).toBeVisible();
  });

  test('/results (customer success) has content', async ({ page }) => {
    await page.goto('/results');
    await expect(page.locator('text=Measured, not claimed')).toBeVisible();
  });

  test('/privacy has content', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('text=Privacy Policy').first()).toBeVisible();
  });

  test('/terms has content', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('text=Terms of Service').first()).toBeVisible();
  });

  test('/careers has content', async ({ page }) => {
    await page.goto('/careers');
    await expect(page.locator('text=Build what matters')).toBeVisible();
  });

  test('/partners lists partners', async ({ page }) => {
    await page.goto('/partners');
    await expect(page.locator('text=Acquia').first()).toBeVisible();
    await expect(page.locator('text=Salesforce').first()).toBeVisible();
    await expect(page.locator('text=Algolia').first()).toBeVisible();
  });
});
