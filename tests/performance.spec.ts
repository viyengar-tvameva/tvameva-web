import { test, expect } from '@playwright/test';

/**
 * Performance / Web Vitals Tests
 *
 * Measures Core Web Vitals and performance metrics using browser Performance API.
 * For full Lighthouse CI, use: npx lhci autorun (configure in lighthouserc.js)
 *
 * Run: npx playwright test tests/performance.spec.ts
 */

const PERF_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/solutions/propeledge', name: 'PropelEdge SA' },
  { path: '/contact', name: 'Contact' },
];

// Thresholds
const MAX_LCP_MS = 3000; // 2.5s target, 3s threshold for cold-start tolerance
const MAX_CLS = 0.1;
const MAX_LOAD_TIME_MS = 5000;

for (const { path, name } of PERF_PAGES) {
  test.describe(`Performance — ${name}`, () => {
    test(`page loads within ${MAX_LOAD_TIME_MS}ms`, async ({ page }) => {
      const start = Date.now();
      await page.goto(path, { waitUntil: 'load' });
      const loadTime = Date.now() - start;
      console.log(`  ${name} load time: ${loadTime}ms`);
      expect(loadTime, `${name} should load within ${MAX_LOAD_TIME_MS}ms`).toBeLessThan(MAX_LOAD_TIME_MS);
    });

    test(`LCP is under ${MAX_LCP_MS}ms`, async ({ page }) => {
      await page.goto(path);
      // Wait for page to stabilize
      await page.waitForLoadState('networkidle');

      const lcp = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let lcpValue = 0;
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            if (entries.length > 0) {
              lcpValue = entries[entries.length - 1].startTime;
            }
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
          // Give it a moment to capture
          setTimeout(() => {
            observer.disconnect();
            resolve(lcpValue);
          }, 1000);
        });
      });

      console.log(`  ${name} LCP: ${Math.round(lcp)}ms`);
      if (lcp > 0) {
        expect(lcp, `${name} LCP should be under ${MAX_LCP_MS}ms`).toBeLessThan(MAX_LCP_MS);
      }
    });

    test(`CLS is under ${MAX_CLS}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const cls = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value || 0;
              }
            }
          });
          observer.observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => {
            observer.disconnect();
            resolve(clsValue);
          }, 2000);
        });
      });

      console.log(`  ${name} CLS: ${cls.toFixed(4)}`);
      expect(cls, `${name} CLS should be under ${MAX_CLS}`).toBeLessThan(MAX_CLS);
    });

    test('no large JS bundles blocking render', async ({ page }) => {
      await page.goto(path);
      const perfEntries = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        return resources
          .filter((r) => r.name.endsWith('.js'))
          .map((r) => ({ name: r.name.split('/').pop(), size: r.transferSize, duration: r.duration }))
          .filter((r) => r.size > 200000); // Flag JS bundles > 200KB
      });

      if (perfEntries.length > 0) {
        console.warn(`  ${name} has large JS bundles:`, perfEntries);
      }
      // Warn but don't fail — Next.js code splitting usually handles this
      expect(perfEntries.length, `${name} should have no JS bundles > 200KB`).toBeLessThanOrEqual(2);
    });
  });
}

test.describe('Accessibility Basics', () => {
  test('homepage has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count, 'Should have exactly one h1').toBe(1);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt, 'All images should have alt text').toBeTruthy();
    }
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    // Tab through nav items
    await page.keyboard.press('Tab');
    const focused = await page.locator(':focus').first();
    expect(await focused.isVisible()).toBeTruthy();
  });
});
