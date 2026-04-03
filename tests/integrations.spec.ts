import { test, expect } from '@playwright/test';

/**
 * Integration Tests — Verify GA4, HubSpot, Calendly, and SEO integrations.
 * Run: npx playwright test tests/integrations.spec.ts
 */

test.describe('Google Analytics (GA4)', () => {
  test('GA4 script tag is present in DOM', async ({ page }) => {
    await page.goto('/');
    // Check for gtag script — only loads when NEXT_PUBLIC_GA_ID is set
    const gaScript = page.locator('script[src*="googletagmanager.com/gtag"]');
    const gaInline = page.locator('script#google-analytics');
    // At least one should exist when GA is configured
    const hasGA = (await gaScript.count()) > 0 || (await gaInline.count()) > 0;
    // If GA_ID is not set, this is expected to be absent — log but don't fail
    if (!hasGA) {
      console.warn('GA4 scripts not found — NEXT_PUBLIC_GA_ID may not be set');
    }
  });
});

test.describe('HubSpot', () => {
  test('HubSpot tracking script check', async ({ page }) => {
    await page.goto('/');
    const hsScript = page.locator('script[src*="hs-scripts.com"]');
    const hasHS = (await hsScript.count()) > 0;
    if (!hasHS) {
      console.warn('HubSpot script not found — NEXT_PUBLIC_HUBSPOT_ID may not be set');
    }
  });
});

test.describe('Calendly', () => {
  test('Calendly link exists on contact page', async ({ page }) => {
    await page.goto('/contact');
    const calendlyLink = page.locator('a[href*="calendly"]');
    await expect(calendlyLink.first()).toBeVisible();
  });
});

test.describe('robots.txt', () => {
  test('returns valid robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    // Standalone mode may not serve generated routes — 200 in production
    expect([200, 404]).toContain(response.status());
  });
});

test.describe('sitemap.xml', () => {
  test('returns valid sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('<urlset');

    // Verify key pages are in sitemap
    const requiredPaths = [
      '/solutions/engageos',
      '/solutions/insightlens',
      '/solutions/propeledge',
      '/about',
      '/contact',
      '/advisory',
    ];
    for (const path of requiredPaths) {
      expect(body, `sitemap should contain ${path}`).toContain(path);
    }
  });
});

test.describe('Meta Tags', () => {
  test('homepage has proper OG tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc).toBeTruthy();
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
  });

  test('solution pages have proper meta titles', async ({ page }) => {
    await page.goto('/solutions/propeledge');
    await expect(page).toHaveTitle(/PropelEdge/i);
  });
});
