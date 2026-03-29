# EngageOS — Solution Area Page Content

**Content Version:** 1.0 | March 2026
**Status:** Draft for review
**Drupal Content Type:** `solution_area`
**JSON:API Endpoint:** `/jsonapi/node/solution_area?filter[field_slug]=engageos`

---

## Content Model Reference

Each section below maps to a Drupal field or paragraph type. Annotations use this format:

- `[FIELD: field_name]` — Direct node field
- `[PARAGRAPH: type_name]` — Paragraph reference (supports reordering in Drupal UI)
- `[MEDIA: type]` — Media entity reference (image, video, animation)
- `[TAXONOMY: vocabulary]` — Taxonomy term reference
- `[VIEW: view_name]` — Drupal View (dynamic content block)
- `[COMPONENT: react_component]` — Maps to a specific React frontend component

---

## Section 1: Hero
`[PARAGRAPH: solution_hero]`
`[COMPONENT: SolutionHero]`

### Headline `[FIELD: field_hero_headline]`

**Your customers expect seamless, intelligent digital experiences. Your platform should deliver them — and prove it.**

### Subheadline `[FIELD: field_hero_subheadline]`

EngageOS modernizes enterprise digital experience platforms on Acquia and Drupal — with AI-powered search and discovery, hyper-personalization, visual commerce, and omnichannel delivery. You pay for engagement uplift, conversion improvement, and time-to-market acceleration — not developer hours.

### Hero CTA `[FIELD: field_hero_cta]`

**Primary:** Schedule a DXP Readiness Assessment → `/advisory/dxp-readiness`
**Secondary:** See how our pod model works → `/how-we-deliver/pods`

### Visual Asset `[MEDIA: hero_video or hero_animation]`

> **Art Direction:** Short looping animation or video (15–20s) showing a composable DXP architecture coming together — content blocks, search interfaces, personalization layers, and analytics dashboards assembling into a unified experience. Abstract and brand-aligned, not a product demo. Think: modular tiles connecting into a cohesive platform diagram.
>
> **Fallback:** Static hero image of the composable architecture diagram (4-layer stack: Experience Layer → DXP & Content → Integration Hub → Business Systems). This can be adapted from the architecture visual used in the semiconductor client engagement — anonymized and branded to Tvameva.
>
> **Aspect Ratio:** 16:9 desktop, 4:3 tablet, 1:1 mobile crop
> **Format:** WebM with MP4 fallback, or Lottie animation

---

## Section 2: The Business Challenge
`[PARAGRAPH: challenge_statement]`
`[COMPONENT: ChallengeBlock]`

### Section Headline `[FIELD: field_challenge_headline]`

**Your digital platform is holding back your customer experience — and your revenue.**

### Challenge Narrative `[FIELD: field_challenge_body]` (Rich text)

Enterprise marketing and customer experience leaders face a common problem: fragmented digital platforms that can't keep up with what customers expect. Your content lives in one system, your product data in another, your search in a third, and your analytics somewhere else entirely. Every campaign, product launch, or market expansion requires custom integration work, months of agency time, and budgets that are difficult to justify.

Meanwhile, your customers are finding, evaluating, and deciding faster than ever. They expect to search your product catalog the way they search the consumer web — with intelligent, context-aware results. They expect personalized experiences that reflect their industry, role, and buying stage. And they expect to configure, visualize, and compare complex products without waiting for a sales call.

The gap between what your customers expect and what your platform delivers is where revenue leaks. EngageOS closes that gap.

### Visual Asset `[MEDIA: challenge_visual]`

> **Art Direction:** Animated or static data visualization showing the "fragmentation tax" — multiple disconnected systems (CMS, search, analytics, CRM, ERP) each with their own data silo, contrasted with a unified composable architecture. Could be a before/after split or a progressive animation.
>
> **Format:** SVG animation or illustrated diagram

---

## Section 3: Value Drivers
`[PARAGRAPH: value_driver_grid]`
`[COMPONENT: ValueDriverGrid]`

### Section Headline `[FIELD: field_value_drivers_headline]`

**Six capabilities that turn your digital platform into a revenue engine.**

### Section Intro `[FIELD: field_value_drivers_intro]`

EngageOS isn't a migration project with a modernization label. It's a platform strategy built around the business outcomes youactually measure. Each capability below is delivered by our dedicated EngageOS pod — a team of AI Agents that handle content migration, code generation, QA automation, and deployment augmented by our Customer Success Engineers. 

---

### Value Driver 1: Search-Driven Product Discovery
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Search & Discovery"]`

#### Headline `[FIELD: field_vd_headline]`

**Make every search a conversion opportunity.**

#### Body `[FIELD: field_vd_body]`

Your customers search before they buy — but most enterprise search is still keyword-matching against flat catalogs. EngageOS implements AI-powered search and discovery through Algolia, connecting your content management system, product information, and customer data into a unified search index. The result: search that understands intent, surfaces the right product for the right buyer, and learns from every interaction.

For technical buyers — engineers searching by specifications, frequency ranges, or compliance standards — this means parametric search with faceted navigation that speaks their language. For marketing and procurement buyers, it means discovery experiences that guide them from awareness to evaluation to configuration without friction.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Search conversion rate uplift
- Time-to-product reduction
- Search-to-configuration completion rate

#### Proof Point `[FIELD: field_vd_proof]`

> A global hi-tech semiconductor company rebuilt its entire product discovery experience around AI-powered search — connecting thousands of technical products, datasheets, application notes, and cross-reference tools into a unified search index. Engineers can now filter by precise technical parameters and arrive at the right product in seconds, not minutes.

#### Visual Asset `[MEDIA: vd_search_visual]`

> **Art Direction:** Interactive or animated mockup showing a parametric search interface — a search bar with autocomplete suggestions, faceted filters (industry, specification, product family), and instant results updating in real time. Should feel modern and fast. Consider a short screen recording or Lottie animation showing the search-to-result flow.

#### Connector IP Callout `[FIELD: field_vd_ip]`

**Acquia-Algolia Data Connector** — Pre-built integration that synchronizes your Drupal content and product data with Algolia's search index in real time. Eliminates weeks of custom integration build.

---

### Value Driver 2: Visual Commerce & Product Configuration
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Visual Commerce"]`

#### Headline `[FIELD: field_vd_headline]`

**Let customers see, configure, and buy — without a sales call.**

#### Body `[FIELD: field_vd_body]`

Complex products need more than a spec sheet. EngageOS integrates 3D product configuration and visual commerce directly into your digital experience — connecting Threekit's visual configurator to your CPQ platform, your product data, and your CMS. Customers build, visualize, and price their own configurations. Your sales team gets qualified, configured leads instead of cold inquiries.

This capability is where EngageOS intersects with VisualForge — our dedicated visual commerce solution area. For clients whose primary digital experience runs on Acquia and Drupal, the EngageOS pod handles the full integration: CMS content, product data, search, and the configurator experience in a single, composable architecture.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Configuration completion rate
- Sales cycle compression
- Self-service quote generation rate

#### Proof Point `[FIELD: field_vd_proof]`

> A leading B2C manufacturer with 8 product brands and 85+ product models built a 3D configurator experience that connects directly to their ERP for real-time BOM validation and pricing. Customers can build, visualize, and compare configurations across brands — then connect with a local dealer to purchase. The entire flow lives within the composable DXP, not as a disconnected tool.

#### Visual Asset `[MEDIA: vd_configurator_visual]`

> **Art Direction:** Video or animated walkthrough of a 3D product configurator embedded in a DXP — showing a user selecting options, seeing the product update in real time, and generating a configuration summary. Should emphasize the seamlessness of the experience within the broader site, not a standalone tool.
>
> **Note:** Can reference the Threekit platform capability without showing client-specific configurations.

---

### Value Driver 3: Omnichannel Customer Experience
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Omnichannel"]`

#### Headline `[FIELD: field_vd_headline]`

**One content architecture. Every channel your customer uses.**

#### Body `[FIELD: field_vd_body]`

Your customers engage across web, mobile, dealer portals, partner channels, and increasingly through embedded commerce experiences. Most enterprise CMS platforms were built for a single website — not for headless, multi-channel content delivery. EngageOS architects your Acquia and Drupal platform as a composable content hub: headless CMS with JSON:API content endpoints, a React/Next.js frontend for performance and flexibility, and an integration layer that connects your content to every downstream channel.

This isn't about rebuilding your website. It's about building the content infrastructure that feeds every digital touchpoint — and doing it once, with reusable components that scale across brands, regions, and channels.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Cross-channel content consistency score
- Time-to-publish across channels
- Multi-brand deployment velocity

#### Proof Point `[FIELD: field_vd_proof]`

> A multi-brand manufacturer with operations across 8 manufacturing locations and 325+ dealer locations consolidated 5 separate CMS platforms into a single headless Drupal architecture with a shared React component library. Each brand maintains its own visual identity through a design token system, while sharing core components — reducing per-brand launch time by more than half.

#### Visual Asset `[MEDIA: vd_omnichannel_visual]`

> **Art Direction:** Architecture diagram showing content flowing from a central Drupal hub outward to multiple channels — brand websites, mobile apps, dealer portals, partner networks, IoT displays. Animated version could show content being authored once and then deploying across channels simultaneously.
>
> **Component Opportunity:** Interactive diagram where users can click on different channels to see how content is delivered — a React component worth investing in.

---

### Value Driver 4: Hyper-Personalization
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Personalization"]`

#### Headline `[FIELD: field_vd_headline]`

**Serve the right content to the right buyer — at every stage of their journey.**

#### Body `[FIELD: field_vd_body]`

Generic web experiences convert at generic rates. EngageOS activates the personalization capabilities built into the Acquia DXP ecosystem — Customer Data Platform for cross-channel identity resolution, Acquia Personalization for real-time content targeting, and AI-driven recommendation engines that learn from behavioral and firmographic signals.

For B2B enterprises, this means role-based content experiences: an engineer sees technical specifications, datasheets, and application notes; a procurement buyer sees pricing, compliance documentation, and distributor availability; a marketing visitor sees brand stories, case studies, and demo CTAs. The personalization logic is governed by rules your marketing team controls — without code deployments.

For B2C brands, this means journey-stage personalization: first-time visitors see brand introduction and product exploration; returning visitors see their previously viewed configurations and relevant promotions; dealer-referred visitors see localized inventory and financing options.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Personalized content engagement rate vs. generic
- Lead scoring accuracy improvement
- Return visitor conversion uplift

#### Proof Point `[FIELD: field_vd_proof]`

> A semiconductor company serving a global engineering audience is building role-based customer journeys — with engineers, procurement teams, and distributor partners each receiving tailored content paths, AI-driven search results, and contextual navigation. The approach connects CMS content, CRM data (Salesforce/Marketo), and intent signals (6sense) into a unified personalization layer.

#### Visual Asset `[MEDIA: vd_personalization_visual]`

> **Art Direction:** Split-screen or tabbed comparison showing the same page rendered differently for different personas (engineer vs. procurement buyer vs. marketing visitor). Can be interactive — let the site visitor toggle between persona views to see how personalization works.

---

### Value Driver 5: Lead Generation & Conversion
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Lead Generation"]`

#### Headline `[FIELD: field_vd_headline]`

**Turn every digital touchpoint into a qualified pipeline opportunity.**

#### Body `[FIELD: field_vd_body]`

Digital experience modernization is only valuable if it drives pipeline. EngageOS connects your DXP to your marketing automation and CRM stack — HubSpot, Marketo, Salesforce — with structured lead capture, progressive profiling, and attribution tracking built into the architecture from day one. Forms, CTAs, gated content, and demo requests aren't afterthoughts bolted onto a CMS; they're first-class citizens in the content model.

AI agents within the platform handle lead scoring enrichment, routing optimization, and follow-up sequencing — so your marketing operations team focuses on strategy, not manual workflows. Every content interaction contributes to a behavioral lead score that feeds your sales team qualified, contextualized opportunities.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Marketing qualified lead (MQL) volume
- Lead-to-opportunity conversion rate
- Cost per acquisition reduction

#### Proof Point `[FIELD: field_vd_proof]`

> Both reference engagements — the semiconductor platform and the multi-brand manufacturer — architect lead capture, progressive profiling, and CRM integration as foundational infrastructure, not add-on features. The semiconductor engagement integrates Marketo, Salesforce, and 6sense into a unified lead management system with automated routing and lifecycle tracking.

#### Visual Asset `[MEDIA: vd_leadgen_visual]`

> **Art Direction:** Funnel or flow visualization showing the journey from anonymous visitor → known lead → qualified opportunity, with markers showing where DXP touchpoints contribute to scoring and conversion. Could be an animated flow diagram.

---

### Value Driver 6: Content Operations & Governance
`[PARAGRAPH: value_driver]`
`[TAXONOMY: value_driver_category → "Content Operations"]`

#### Headline `[FIELD: field_vd_headline]`

**Give your marketing team the speed of a startup with the governance of an enterprise.**

#### Body `[FIELD: field_vd_body]`

Enterprise content operations break down in two predictable ways: either marketing teams wait on IT for every page change, or they have so much freedom that brand consistency, compliance, and quality suffer. EngageOS resolves this tension with Acquia Site Studio — a low-code experience builder that lets marketing teams create pages, landing pages, and campaign experiences using pre-approved design components. IT builds the design system once; marketing builds pages infinitely.

Content governance workflows enforce quality without slowing velocity: draft → review → legal → publish, with role-based permissions that ensure the right people approve the right content. AI agents assist with content migration, metadata tagging, and taxonomy management — reducing the manual overhead that makes CMS re-platforms so painful.

#### Outcome Metrics `[FIELD: field_vd_metrics]`

- Time-to-publish reduction
- Marketing team self-service rate (pages published without developer involvement)
- Content governance compliance rate

#### Proof Point `[FIELD: field_vd_proof]`

> Acquia customers report approximately 49% improvement in time-to-market for new content with Site Studio. In both reference engagements, content governance workflows (draft → review → publish with role-based permissions) are foundational requirements — not nice-to-haves.

#### Visual Asset `[MEDIA: vd_content_ops_visual]`

> **Art Direction:** Side-by-side comparison: traditional CMS workflow (developer-dependent, slow) vs. EngageOS workflow (marketing self-service with governance guardrails). Could show a content calendar with velocity metrics overlaid.

---

## Section 4: How We Deliver — The EngageOS Pod
`[PARAGRAPH: pod_model_section]`
`[COMPONENT: PodModelBlock]`

### Section Headline `[FIELD: field_pod_headline]`

**A dedicated team — augmented by AI — that delivers outcomes, not timesheets.**

### Pod Description `[FIELD: field_pod_body]` (Rich text)

Every EngageOS engagement is delivered by a dedicated pod of EngageOS AI Agents augmented with our Customer Success Team . Not a rotating bench of contractors. Not a pyramid of junior developers supervised by one senior architect. AI Agents that you drive and owns your outcomes from assessment through go-live and into continuous optimization.

The Agentic pod combines platform expertise (Acquia, Drupal, Algolia, Threekit integration), frontend engineering (React/Next.js, design systems, headless architecture) - all augmented by our Customer Success Team that provide the governance, oversight and deep platform expertise that will help you make informed choices.

**Implementation AI agents** accelerate configuration, code generation, automated testing, and deployment. They don't replace your pod members — they multiply their output. Our Agentic Pods deliver what traditionally requires a team 40–60% larger.

**Operational AI agents** run continuously after go-live: content migration bots, automated QA and regression testing, search relevance optimization, and performance monitoring. These agents are built into the platforms (Acquia, Algolia, Threekit) and augmented by Tvameva's own tooling.

**Value realization dashboards** are activated from day one. As soon as implementation begins, we're collecting baseline data and reporting against the KPIs your outcome-based pricing is tied to. You see the impact in real time — not in a post-project retrospective.

### Pod Composition Visual `[MEDIA: pod_diagram]`

> **Art Direction:** Clean organizational diagram showing the pod structure — with named roles (not people), skill areas, and AI agent touchpoints. Should communicate: small team, deep expertise, AI amplification, outcome accountability.
>
> **Suggested roles to show:**
> - Pod Lead / Customer Success
> - Solution Architect (Acquia/Drupal)
> - Frontend Engineer (React/Next.js)
> - Search & Integration Engineer (Algolia)
> - QA & DevOps Engineer
> - AI Agent Layer (implementation + operations)
>
> **Component Opportunity:** Interactive pod diagram — click on each role to see what they own and how AI augments their work.

---

## Section 5: The Technology Stack
`[PARAGRAPH: tech_stack_section]`
`[COMPONENT: TechStackDiagram]`

### Section Headline `[FIELD: field_stack_headline]`

**Built on the platforms you already run — connected by IP we've already proven.**

### Stack Description `[FIELD: field_stack_body]`

EngageOS isn't a proprietary platform. It's a composable architecture built on best-of-breed platforms — each selected because they lead their category and are already present in enterprise environments we serve.

### Platform Stack `[FIELD: field_stack_platforms]` (Structured data — repeatable)

| Layer | Platform | Role |
|-------|----------|------|
| Content & CMS | Acquia Cloud (Drupal 11) | Headless content management, multisite, DAM, CDP, content personalization |
| Frontend | React / Next.js | Decoupled frontend, SSR for SEO, design system, component library |
| Search & Discovery | Algolia NeuralSearch | AI-powered search, parametric filtering, personalized ranking, analytics |
| Visual Commerce | Threekit | 3D product configuration, AR visualization, CPQ integration |
| Integration | Boomi iPaaS or custom API layer | Connecting CMS, CRM, ERP, and commerce systems |
| Intelligence | GA4/GTM, Acquia CDP, New Relic | Analytics, customer data, performance monitoring |
| Marketing Automation | HubSpot / Marketo | Lead capture, nurture, scoring, CRM sync |

### Key Connector IP `[FIELD: field_stack_connectors]`

**Acquia-Algolia Data Connector** — Synchronizes Drupal content nodes and product data with Algolia search indexes in real time. Eliminates 6–8 weeks of custom integration. Proven in production across B2B and B2C deployments.

**Algolia-Threekit Connector** — Bridges search discovery with 3D product configuration. A customer searches, finds a product, and transitions seamlessly into the visual configurator — with product data, pricing, and configuration rules flowing from a single source of truth.

**Algolia-Salesforce Connector** — Connects search behavior to CRM data, enabling search personalization based on account context and feeding search analytics into lead scoring models.

### Visual Asset `[MEDIA: architecture_diagram]`

> **Art Direction:** Four-layer composable architecture diagram:
>
> **Layer 1 — Experience Layer (top):** Brand websites, 3D configurator, mobile, dealer portal
> **Layer 2 — DXP & Content:** Acquia Cloud, Site Studio, DAM, CDP, personalization
> **Layer 3 — Integration Hub:** Boomi/API gateway, pre-built connectors, real-time sync
> **Layer 4 — Business Systems:** CRM, ERP, marketing automation, analytics
>
> Connectors shown as labeled arrows between layers. Tvameva Accelerator IP highlighted in a distinct color.
>
> **Component Opportunity:** Interactive architecture diagram — click on each layer to expand details. This is a high-value React component that can be reused across all solution area pages with different platform stacks.

---

## Section 6: Proof Points & Results
`[PARAGRAPH: proof_points_section]`
`[COMPONENT: ProofPointGrid]`
`[VIEW: proof_points_by_solution_area]`

### Section Headline `[FIELD: field_proof_headline]`

**Outcomes from the field — not from a slide deck.**

### Proof Point 1: Hi-Tech Semiconductor — B2B Digital Experience Transformation
`[PARAGRAPH: proof_point]`

#### Industry Tag `[TAXONOMY: industry → "Hi-Tech / Semiconductor"]`

#### Headline `[FIELD: field_proof_headline]`

**Rebuilding digital product discovery for a global semiconductor leader.**

#### Challenge `[FIELD: field_proof_challenge]`

A publicly traded semiconductor company with a global engineering customer base needed to completely modernize its digital experience. The existing platform suffered from fragmented content systems, disconnected search, limited personalization, and no self-service capabilities for marketing teams. Engineers — their primary buyers — couldn't efficiently find, evaluate, and compare highly technical products across thousands of SKUs.

#### Solution `[FIELD: field_proof_solution]`

EngageOS approach: composable DXP built on Acquia Cloud with headless Drupal 11, integrated with Algolia for AI-powered parametric search, Salesforce and Marketo for lead management, and a content architecture designed for role-based personalization. The platform connects product data, technical documentation (datasheets, application notes, whitepapers), and customer journey logic into a unified experience — with content governance workflows that give marketing autonomy without sacrificing compliance.

#### Key Outcomes `[FIELD: field_proof_outcomes]`

- Unified search across products, documents, and knowledge resources
- Role-based experiences for engineers, procurement, and distributors
- Automated content governance (draft → legal review → publish)
- AI-powered search with semantic understanding and cross-reference tools
- Marketing self-service for landing pages and campaign content

#### Scope Indicator `[FIELD: field_proof_scope]`

18-month transformation | Acquia + Algolia + Salesforce + Marketo | 3-phase delivery

---

### Proof Point 2: Multi-Brand Manufacturer — B2C Digital Experience Unification
`[PARAGRAPH: proof_point]`

#### Industry Tag `[TAXONOMY: industry → "Manufacturing / Consumer"]`

#### Headline `[FIELD: field_proof_headline]`

**Unifying 8 brands on a single composable DXP — with 3D product configuration.**

#### Challenge `[FIELD: field_proof_challenge]`

A leading manufacturer with 8 distinct product brands, 85+ product models, and a network of 325+ dealers was operating on 5 separate CMS platforms with no unified digital experience. Each brand had its own technology stack, content workflows, and dealer integration. Product configuration was disconnected from ERP, and there was no enterprise DAM, CDP, or unified analytics layer.

#### Solution `[FIELD: field_proof_solution]`

EngageOS approach: Acquia Cloud (Drupal 11) multisite architecture with a shared React/Next.js frontend and a design token system supporting 8 brand themes from a single component library. Algolia NeuralSearch for AI-powered product discovery. Threekit for 3D product configuration with real-time ERP (Infor SyteLine) BOM validation. Boomi iPaaS connecting CMS, CRM (HubSpot), ERP, dealer networks (Rollick), and analytics. Acquia DAM for enterprise asset management across all brands.

#### Key Outcomes `[FIELD: field_proof_outcomes]`

- 8 brands on a single headless CMS with shared component library
- 3D product configurator with real-time pricing and BOM validation
- AI-powered product discovery across 85+ models
- Unified dealer portal with real-time inventory
- 50–60 shared React components with brand-specific theming

#### Scope Indicator `[FIELD: field_proof_scope]`

18-month transformation | Acquia + Algolia + Threekit + Boomi + HubSpot | $1.9M–$2.5M total investment

---

## Section 7: Market Context
`[PARAGRAPH: market_context]`
`[COMPONENT: MarketSignalBar]`

### Section Headline `[FIELD: field_market_headline]`

**The market is moving toward composable. The question is how fast you move with it.**

### Market Data Points `[FIELD: field_market_stats]` (Structured, repeatable)

| Stat | Context |
|------|---------|
| 67% of American enterprises use Drupal | The installed base is massive — and much of it needs modernization |
| $5.12B projected Drupal services market by 2030 | 9.38% CAGR, North America is 39% of global market |
| 1.75 trillion annual searches processed by Algolia | The search and discovery layer is mission-critical infrastructure |
| 28.9% YoY growth in search and knowledge discovery market | AI-powered search is accelerating, not plateauing |
| Only 41% of B2B leaders are fully AI-operational in search | Massive greenfield opportunity for enterprises ready to move |

### Visual Asset `[MEDIA: market_data_visual]`

> **Art Direction:** Animated stat counter bar or data ticker — numbers animating up as the user scrolls to this section. Clean, understated, on-brand. Not a chart — just the key numbers with contextual labels.

---

## Section 8: Natural Expansion Path
`[PARAGRAPH: expansion_path]`
`[COMPONENT: ExpansionPathway]`

### Section Headline `[FIELD: field_expansion_headline]`

**EngageOS is your starting point — not your ceiling.**

### Expansion Narrative `[FIELD: field_expansion_body]`

Every EngageOS engagement opens natural pathways to the rest of the Tvameva solution portfolio. The composable architecture we build creates a foundation that other solution areas extend — without ripping and replacing.

### Expansion Connections `[FIELD: field_expansion_connections]` (Entity references to other solution_area nodes)

| From EngageOS | To | Why |
|---------------|----|-----|
| Search implementation on Algolia | **SearchCore** | Deeper search optimization, A/B testing, and cross-platform search unification beyond the DXP |
| 3D configuration integration | **VisualForge** | Full visual commerce strategy: advanced CPQ, AR/VR, multi-platform configurators |
| Analytics and attribution needs | **InsightLens** | Predictive analytics on GCP, customer behavior modeling, ROI dashboards |
| Enterprise app support for the DXP stack | **ResolveIQ** | AI-enabled support for Acquia, Drupal, and the integration layer |

### Visual Asset `[MEDIA: expansion_diagram]`

> **Art Direction:** Hub-and-spoke diagram with EngageOS at center, showing connection paths to the other four SAs. Each spoke should indicate the trigger (what happens in EngageOS that creates the need) and the destination SA. Animated version: lines illuminate as user hovers/scrolls.
>
> **Component Opportunity:** Reusable across all 5 SA pages — each one becomes the hub in its own version.

---

## Section 9: Advisory CTA
`[PARAGRAPH: advisory_cta_block]`
`[COMPONENT: AdvisoryCTA]`

### Section Headline `[FIELD: field_advisory_headline]`

**Not sure where to start?**

### Advisory Description `[FIELD: field_advisory_body]`

Our DXP Readiness Assessment maps your current digital experience platform — CMS architecture, content model, search capability, integration landscape, and personalization maturity — and builds a phased modernization roadmap your leadership team can act on. In 2–3 weeks, not 2–3 months.

### What the Assessment Covers `[FIELD: field_advisory_scope]`

- Current CMS and content architecture audit
- Search and discovery capability gap analysis
- Integration landscape mapping (CRM, ERP, marketing automation, analytics)
- Personalization maturity evaluation
- Composable architecture readiness score
- Phased roadmap with prioritized workstreams and investment estimates

### Assessment CTA `[FIELD: field_advisory_cta]`

**Schedule a DXP Readiness Assessment** → `/contact?assessment=dxp-readiness`

### Pricing Context `[FIELD: field_advisory_pricing_note]` (Optional — may be shown/hidden by content authors)

Assessment engagements are typically scoped at $25,000–$50,000 and delivered in 2–4 weeks.

### Visual Asset `[MEDIA: advisory_visual]`

> **Art Direction:** Clean, consultative visual — could be a sample assessment output (anonymized radar chart or maturity scorecard), or a simple illustration of the assessment process: Discover → Assess → Roadmap → Act.

---

## Section 10: Related Content
`[VIEW: related_content_by_solution_area]`
`[COMPONENT: RelatedContentGrid]`

> **Dynamic content block** — populated from Drupal Views based on taxonomy tag `solution_area:engageos`. Displays blog posts, case studies, whitepapers, and webinar recordings tagged to EngageOS.
>
> **Initial content needs:**
> - Blog post: "Why composable DXP is replacing monolithic CMS — and what that means for your team"
> - Blog post: "AI-powered search in B2B: beyond keyword matching"
> - Blog post: "The economics of AI-enabled delivery pods vs. traditional SI teams"
> - Downloadable: DXP Readiness Assessment sample output (gated)

---

## SEO Metadata
`[FIELD: field_meta_title]`
`[FIELD: field_meta_description]`
`[FIELD: field_og_image]`

### Meta Title
EngageOS — AI-Powered Digital Experience Modernization | Tvameva

### Meta Description
Modernize your enterprise digital experience platform on Acquia and Drupal — with AI-powered search, hyper-personalization, visual commerce, and outcome-based pricing. Meet EngageOS by Tvameva.

### OG Image
> Branded card image: EngageOS logo/name + "Digital Experience Modernization" + composable architecture visual element. 1200x630px.

---

## Drupal Content Model Summary

### Node Type: `solution_area`

| Field Machine Name | Type | Description |
|--------------------|------|-------------|
| `field_slug` | Text | URL slug (e.g., "engageos") |
| `field_display_name` | Text | Display name (e.g., "EngageOS") |
| `field_platform_anchor` | Text | Platform partner (e.g., "Acquia / Drupal") |
| `field_hero_headline` | Text (long) | Hero H1 |
| `field_hero_subheadline` | Text (long) | Hero supporting text |
| `field_hero_cta` | Link (multiple) | Primary and secondary CTAs |
| `field_hero_media` | Media reference | Hero video/animation/image |
| `field_meta_title` | Text | SEO title |
| `field_meta_description` | Text (long) | SEO description |
| `field_og_image` | Media reference | Open Graph image |
| `field_sections` | Paragraph reference (multiple) | All page sections below hero |

### Paragraph Types

| Paragraph Type | Fields |
|----------------|--------|
| `challenge_statement` | headline, body (rich text), media |
| `value_driver` | headline, body, metrics (text, multiple), proof_point (text, long), ip_callout (text), media, taxonomy ref |
| `pod_model_section` | headline, body (rich text), composition_media |
| `tech_stack_section` | headline, body, platforms (structured table), connectors (rich text), architecture_media |
| `proof_point` | headline, industry_tag (taxonomy), challenge, solution, outcomes (text, multiple), scope_indicator, media |
| `market_context` | headline, stats (structured, repeatable: stat + context), media |
| `expansion_path` | headline, body, connections (entity references to other solution_area nodes), media |
| `advisory_cta_block` | headline, body, scope_items (text, multiple), cta_link, pricing_note, media |

### Taxonomy Vocabularies

| Vocabulary | Terms Used |
|------------|------------|
| `solution_area` | engageos, insightlens, resolveiq, searchcore, visualforge |
| `value_driver_category` | Search & Discovery, Visual Commerce, Omnichannel, Personalization, Lead Generation, Content Operations |
| `industry` | Hi-Tech / Semiconductor, Manufacturing / Consumer, (expand as needed) |

---

## React Component Mapping

| Section | Component | Props (from JSON:API) | Notes |
|---------|-----------|----------------------|-------|
| Hero | `<SolutionHero>` | headline, subheadline, ctas[], media | Supports video, Lottie, static image |
| Challenge | `<ChallengeBlock>` | headline, body, media | Rich text with embedded media |
| Value Drivers | `<ValueDriverGrid>` | headline, intro, drivers[] | Grid/accordion on mobile |
| Value Driver Item | `<ValueDriverCard>` | headline, body, metrics[], proof, ip_callout, media | Expandable card with proof point reveal |
| Pod Model | `<PodModelBlock>` | headline, body, media | Interactive diagram optional |
| Tech Stack | `<TechStackDiagram>` | headline, body, platforms[], connectors, media | Interactive layer diagram |
| Proof Points | `<ProofPointGrid>` | headline, points[] | Card grid, filterable by industry |
| Market Context | `<MarketSignalBar>` | headline, stats[] | Animated counters on scroll |
| Expansion Path | `<ExpansionPathway>` | headline, body, connections[] | Hub-and-spoke interactive diagram |
| Advisory CTA | `<AdvisoryCTA>` | headline, body, scope[], cta, pricing_note, media | Full-width CTA section |
| Related Content | `<RelatedContentGrid>` | content[] (from Drupal View) | Dynamic, tag-filtered |
