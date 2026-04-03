# Test Execution Results

Last updated: 2026-04-03 (final pre-deployment run)

## Latest Run — CMS-Connected, All Content Seeded

### Environment
- **Next.js**: 14.2.35
- **Playwright**: latest, Chromium
- **CMS**: Drupal 10 on GKE (34.56.251.119) — NEXT_PUBLIC_USE_CMS=true
- **Content**: 21 Drupal nodes (3 SAs, 4 differentiators, 4 proof points, 1 case study, 9 pod roles)

### Summary
| Suite | Tests | Passed | Failed | Duration |
|-------|-------|--------|--------|----------|
| Smoke | 20 | 20 | 0 | ~4s |
| Page Content | 15 | 15 | 0 | ~5s |
| Integration | 7 | 7 | 0 | ~2s |
| Performance | 15 | 15 | 0 | ~4s |
| Accessibility | 2 | 2 | 0 | ~1s |
| **Total** | **59** | **59** | **0** | **11.8s** |

### Build Output
- 19 routes compiled, zero TypeScript errors
- All 3 SA pages render from CMS data with static fallback

### Contact Form
- Webform submission: WORKING (returns submission ID)
- Email delivery: WORKING (Gmail SMTP via app password)
- Submissions stored in Cloud SQL (persists across pod restarts)

## Issues Found and Fixed — Full Session Log

See the complete list of 14+ issues discovered during manual review in the previous version of this file. Key categories:

1. **Content duplication** — hardcoded diagrams showing EngageOS content on all SA pages
2. **Stale terminology** — "Results" vs "Customer Success", "5-7 specialists" vs "Human-Governed AI Pods"
3. **Industry-specific language** — "engineers", "semiconductor" in generic value driver copy
4. **Wrong CTA flows** — assessment links where demo links should be, /advisory where /contact should be
5. **Fabricated testimonials** — case study data rewritten as fake first-person quotes
6. **Vendor stats in market context** — GCP customer count instead of business value metrics
7. **Hero subheadlines** describing our product instead of customer pain
8. **Card asymmetry** — unequal heights in grids
9. **Missing visual separation** between homepage sections
10. **Contact form** — webform not created, SMTP not configured, hardcoded IP

All issues resolved. Factual integrity rule added to CLAUDE.md and all agent instructions.
