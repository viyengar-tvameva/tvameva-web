# TVAMEVA.AI — Pre-Launch Task List for Claude Code

## How to Use This File
1. Copy brand assets into `public/` first (see Task 1.0)
2. Save this file as `TASKS.md` in your tvameva-web repo root
3. Open the repo in Claude Code
4. Tell Claude Code: "Work through TASKS.md starting from Task 1.1"
5. Run `npm run dev` to test locally at http://localhost:3000 after each change

---

## PRIORITY 1: BRANDING & LOGO

### Task 1.0: Place Brand Assets in /public (DO THIS MANUALLY FIRST)
Copy these files from the `brand-assets/` folder into `tvameva-web/public/`:
- `logo.svg` — SVG logo for dark backgrounds (navbar/footer)
- `logo-light.svg` — SVG logo for light backgrounds
- `logo-dark-bg.png` — PNG on dark bg (rename to `og-image.png`)
- `favicon.ico` — Favicon
- `favicon.png` — Favicon PNG

### Task 1.1: Replace Text Logo with SVG Logo in Navbar
**File:** `src/components/layout/Navbar.tsx`
Replace the text logo span with: `<img src="/logo.svg" alt="tvameva.ai" className="h-8 w-auto" />`

### Task 1.2: Replace Text Logo in Footer
**File:** `src/components/layout/Footer.tsx`
Same: `<img src="/logo.svg" alt="tvameva.ai" className="h-7 w-auto" />`

### Task 1.3: Add Favicon
**File:** `src/app/layout.tsx` — add to head:
`<link rel="icon" href="/favicon.ico" />` and `<link rel="apple-touch-icon" href="/favicon.png" />`

### Task 1.4: Brand Color Verification
Logo exact colors: T-box `#2a3352`, T-letter `#8b95a8`, tvameva text (dark bg) `#c8cdd8`, .ai `#f5a623`
Verify tailwind.config.js matches.

---

## PRIORITY 2: ANALYTICS & TRACKING

### Task 2.1: GA4 — Create `src/components/common/Analytics.tsx`, add to layout. Env: `NEXT_PUBLIC_GA_ID`
### Task 2.2: HubSpot — Create `src/components/common/HubSpot.tsx`, add to layout. Env: `NEXT_PUBLIC_HUBSPOT_ID`
### Task 2.3: HubSpot Forms — Create `src/utils/hubspot.ts`, wire contact + assessment forms. Create forms in HubSpot admin first.
### Task 2.4: GA4 Events — Create `src/utils/analytics.ts`, track CTAs, assessment milestones, form submissions.

---

## PRIORITY 3: EMAIL — SendGrid integration for assessment results email via `src/app/api/send-results/route.ts`

---

## PRIORITY 4: FRONTEND POLISH

### Task 4.1: Mobile responsiveness audit (375px, 390px, 768px, 1024px+)
### Task 4.2: Navbar active state using `usePathname()`
### Task 4.3: Page transitions with Framer Motion
### Task 4.4: Radar chart on assessment results (recharts)
### Task 4.5: Custom 404 page
### Task 4.6: Fix Next.js 14 params type warnings
### Task 4.7: Improve partner logos section
### Task 4.8: Cookie consent banner (GDPR)

---

## PRIORITY 5: SEO — JSON-LD structured data, sitemap.ts, robots.txt

---

## PRIORITY 6: DEPLOY

### Task 6.1: Set env vars for production
### Task 6.2: `npm run build` — fix all errors
### Task 6.3: Docker build v2, push, deploy to Cloud Run with env vars
### Task 6.4: DNS cutover from Replit to Cloud Run

---

## LAUNCH CHECKLIST
- [ ] Logo correct in navbar/footer
- [ ] Favicon in browser tab
- [ ] GA4 active
- [ ] HubSpot active
- [ ] Forms → HubSpot
- [ ] Assessment email working
- [ ] Mobile responsive
- [ ] No build errors
- [ ] DNS on Cloud Run
- [ ] SSL active
- [ ] https://tvameva.ai live
