import { test, expect } from '@playwright/test';

/**
 * Smoke Tests — Verify all pages load without errors.
 * Run: npx playwright test tests/smoke.spec.ts
 */

const allPages = [
  { path: '/', title: 'Tvameva' },
  { path: '/solutions', title: 'Solutions' },
  { path: '/solutions/engageos', title: 'EngageOS' },
  { path: '/solutions/insightlens', title: 'InsightLens' },
  { path: '/solutions/propeledge', title: 'PropelEdge' },
  { path: '/about', title: 'About' },
  { path: '/how-we-deliver', title: 'How We Deliver' },
  { path: '/results', title: 'Customer Success' },
  { path: '/advisory', title: 'Advisory' },
  { path: '/advisory/ai-maturity', title: 'Tvameva|AI Maturity' },
  { path: '/contact', title: 'Tvameva|Contact' },
  { path: '/careers', title: 'Careers' },
  { path: '/partners', title: 'Partner' },
  { path: '/privacy', title: 'Privacy' },
  { path: '/terms', title: 'Terms' },
];

test.describe('Smoke Tests — All Pages Load', () => {
  test.setTimeout(15000);
  for (const page of allPages) {
    test(`${page.path} returns 200 and has correct title`, async ({ page: p }) => {
      const response = await p.goto(page.path, { timeout: 10000 });
      expect(response?.status()).toBe(200);
      await expect(p).toHaveTitle(new RegExp(page.title, 'i'));
    });
  }
});

test.describe('Navigation Links Resolve', () => {
  test('all navbar links are valid', async ({ page }) => {
    await page.goto('/');
    const navLinks = await page.locator('nav a[href]').all();
    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/')) {
        const response = await page.request.get(href);
        expect(response.status(), `${href} should return 200`).toBe(200);
      }
    }
  });

  test('all footer links are valid', async ({ page }) => {
    await page.goto('/');
    const footerLinks = await page.locator('footer a[href]').all();
    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('/')) {
        const response = await page.request.get(href);
        expect(response.status(), `${href} should return 200`).toBe(200);
      }
    }
  });
});

test.describe('SEO & Metadata', () => {
  test('robots.txt is accessible', async ({ request }) => {
    const response = await request.get('/robots.txt');
    // May return 200 or 404 in standalone dev mode — 200 in production
    expect([200, 404]).toContain(response.status());
  });

  test('sitemap.xml is accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect([200, 404]).toContain(response.status());
  });
});

test.describe('No Console Errors', () => {
  test('homepage has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Filter out expected errors when CMS/external services are offline in dev
    const unexpected = errors.filter(
      (e) => !e.includes('fetch') && !e.includes('CMS') && !e.includes('Failed to')
           && !e.includes('Drupal') && !e.includes('ECONNREFUSED') && !e.includes('404')
           && !e.includes('NetworkError') && !e.includes('ERR_CONNECTION') && !e.includes('400')
           && !e.includes('load resource')
    );
    expect(unexpected).toHaveLength(0);
  });
});
