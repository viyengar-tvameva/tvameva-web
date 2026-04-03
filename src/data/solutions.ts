// =============================================================================
// Solution Area Data — Extended for rich page content
// =============================================================================
// Backward-compatible: all existing fields preserved, new fields optional.
// When NEXT_PUBLIC_USE_CMS=true, Drupal JSON:API content takes precedence.
// This file serves as the static fallback.
// =============================================================================

// --- Sub-interfaces for rich content sections ---

export interface ValueDriver {
  id: string;
  category: string;
  headline: string;
  body: string;
  outcomeMetrics: string[];
  proofPoint: string;
  connectorIP?: { name: string; description: string };
}

export interface ProofPointCase {
  id: string;
  industryTag: string;
  headline: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  scopeIndicator: string;
}

export interface TechStackLayer {
  layer: string;
  platform: string;
  role: string;
}

export interface ExpansionConnection {
  targetSAId: string;
  targetSAName: string;
  trigger: string;
}

// --- Main interface ---

export interface SolutionArea {
  // === Existing fields (unchanged) ===
  id: string;
  name: string;
  slug: string;
  tagline: string;
  headline: string;
  platformAnchor: string;
  platformPartners: string[];
  valueProp: string;
  keyIP: { name: string; description: string };
  outcomeMetrics: string[];
  pricingContrast: { paysFor: string; notFor: string };
  marketStats: { stat: string; value: string }[];
  expansionSA: { id: string; description: string };
  advisory: { name: string; description: string; cta: string };
  capabilities: string[];
  color: string;
  icon: string;

  // === New enriched fields (optional — only populated for rich pages) ===
  heroSubheadline?: string;
  heroCTAs?: { label: string; href: string; variant: 'primary' | 'secondary' }[];

  challenge?: {
    headline: string;
    body: string;
  };

  valueDrivers?: ValueDriver[];

  podModel?: {
    headline: string;
    body: string;
    roles: string[];
    aiAgentTypes: { name: string; description: string }[];
  };

  techStack?: {
    headline: string;
    body: string;
    layers: TechStackLayer[];
    connectors: { name: string; description: string }[];
  };

  proofPoints?: ProofPointCase[];

  marketContext?: {
    headline: string;
    stats: { stat: string; value: string; context: string }[];
  };

  expansionPath?: {
    headline: string;
    body: string;
    connections: ExpansionConnection[];
  };

  advisoryExtended?: {
    headline: string;
    body: string;
    scopeItems: string[];
    pricingNote?: string;
  };

  seo?: {
    metaTitle: string;
    metaDescription: string;
  };

  // === Visual component data (CMS-driven diagrams) ===
  architectureDiagram?: import('@/components/visuals/types').ArchitectureDiagramData;
  workflowSteps?: import('@/components/visuals/types').WorkflowData;
  metricsComparison?: import('@/components/visuals/types').MetricsComparisonData;
  relationshipGraph?: import('@/components/visuals/types').RelationshipGraphData;
}

// =============================================================================
// Solution area data
// =============================================================================

export const solutionAreas: SolutionArea[] = [
  {
    id: 'engageos',
    name: 'EngageOS',
    slug: 'engageos',
    tagline: 'Digital Experience Modernization',
    headline: 'Your customers expect seamless, intelligent digital experiences. Your platform should deliver them — and prove it.',
    platformAnchor: 'EngageOS — Digital Experience Modernization',
    platformPartners: ['Acquia', 'Drupal'],
    valueProp: 'EngageOS modernizes enterprise digital experience platforms on Acquia and Drupal — with AI-powered search and discovery, hyper-personalization, visual commerce, and omnichannel delivery. You pay for engagement uplift, conversion improvement, and time-to-market acceleration — not developer hours.',
    keyIP: {
      name: 'Acquia-Algolia Data Connector',
      description: 'Eliminates 6–8 weeks of custom build, proven in production.',
    },
    outcomeMetrics: [
      'Migration milestones met on schedule',
      'Traffic and engagement uplift',
      'Time-to-publish reduction',
    ],
    pricingContrast: {
      paysFor: 'Migration milestones + engagement uplift',
      notFor: 'Hours to build',
    },
    marketStats: [
      { stat: 'Revenue lost to poor digital experience', value: 'Up to 35%' },
      { stat: 'Buyers who abandon due to poor search', value: '68%' },
      { stat: 'Time-to-market with composable DXP', value: '2–3x faster' },
    ],
    expansionSA: {
      id: 'searchcore',
      description: 'Every Acquia client is a natural SearchCore upsell — connected search and discovery built on top of modernized content.',
    },
    advisory: {
      name: 'DXP Readiness Assessment',
      description: 'Maps your current Drupal estate, identifies migration priorities, and builds a phased modernization roadmap — in 2–3 weeks.',
      cta: 'Schedule a DXP Readiness Assessment',
    },
    capabilities: [
      'Headless CMS architecture & content API layers',
      'AI-powered search & discovery integration',
      'Hyper-personalization & customer journey orchestration',
      'Visual commerce & 3D product configuration',
      'Omnichannel content delivery & multi-brand theming',
    ],
    color: 'teal',
    icon: 'Layout',

    // === Enriched EngageOS content ===

    heroSubheadline: 'Your customers expect to search, discover, and configure complex products the way they shop the consumer web. Your platform delivers a fragmented experience across disconnected systems — search in one place, content in another, product data somewhere else. Every campaign launch requires weeks of agency time. Every market expansion means another custom integration project. The gap between what your buyers expect and what your digital platform delivers is where conversion drops and revenue leaks.',

    heroCTAs: [
      { label: 'Book a 30-Minute Demo', href: 'https://calendly.com/varada-tvameva/30min', variant: 'primary' },
      { label: 'Schedule a DXP Readiness Assessment', href: '/contact', variant: 'secondary' },
    ],

    challenge: {
      headline: 'Your digital platform is holding back your customer experience — and your revenue.',
      body: 'Enterprise marketing and customer experience leaders face a common problem: fragmented digital platforms that can\'t keep up with what customers expect. Your content lives in one system, your product data in another, your search in a third, and your analytics somewhere else entirely. Every campaign, product launch, or market expansion requires custom integration work, months of agency time, and budgets that are difficult to justify.\n\nMeanwhile, your customers are finding, evaluating, and deciding faster than ever. They expect to search your product catalog the way they search the consumer web — with intelligent, context-aware results. They expect personalized experiences that reflect their industry, role, and buying stage. And they expect to configure, visualize, and compare complex products without waiting for a sales call.\n\nThe gap between what your customers expect and what your platform delivers is where revenue leaks. EngageOS closes that gap.',
    },

    valueDrivers: [
      {
        id: 'search-discovery',
        category: 'Search & Discovery',
        headline: 'Make every search a conversion opportunity.',
        body: 'Your customers search before they buy — but most enterprise search is still keyword-matching against flat catalogs. EngageOS implements AI-powered search and discovery through Algolia, connecting your content management system, product information, and customer data into a unified search index. The result: search that understands intent, surfaces the right product for the right buyer, and learns from every interaction.\n\nFor technical buyers, this means parametric search with faceted navigation that speaks their language — filtering by specifications, attributes, or compliance requirements. For business buyers, it means discovery experiences that guide them from awareness to evaluation to configuration without friction.',
        outcomeMetrics: [
          'Search conversion rate uplift',
          'Time-to-product reduction',
          'Search-to-configuration completion rate',
        ],
        proofPoint: 'A global technology company rebuilt its entire product discovery experience around AI-powered search — connecting thousands of products, documents, and reference tools into a unified search index. Buyers can now filter by precise parameters and arrive at the right product in seconds, not minutes.',
        connectorIP: {
          name: 'Acquia-Algolia Data Connector',
          description: 'Pre-built integration that synchronizes your Drupal content and product data with Algolia\'s search index in real time. Eliminates 6–8 weeks of custom integration build.',
        },
      },
      {
        id: 'visual-commerce',
        category: 'Visual Commerce',
        headline: 'Let customers see, configure, and buy — without a sales call.',
        body: 'Complex products need more than a spec sheet. EngageOS integrates 3D product configuration and visual commerce directly into your digital experience — connecting Threekit\'s visual configurator to your CPQ platform, your product data, and your CMS. Customers build, visualize, and price their own configurations. Your sales team gets qualified, configured leads instead of cold inquiries.\n\nThis capability is where EngageOS intersects with VisualForge — our dedicated visual commerce solution area. For clients whose primary digital experience runs on Acquia and Drupal, the EngageOS pod handles the full integration: CMS content, product data, search, and the configurator experience in a single, composable architecture.',
        outcomeMetrics: [
          'Configuration completion rate',
          'Sales cycle compression',
          'Self-service quote generation rate',
        ],
        proofPoint: 'A leading B2C manufacturer with 8 product brands and 85+ product models built a 3D configurator experience that connects directly to their ERP for real-time BOM validation and pricing. Customers can build, visualize, and compare configurations across brands — then connect with a local dealer to purchase. The entire flow lives within the composable DXP, not as a disconnected tool.',
      },
      {
        id: 'omnichannel',
        category: 'Omnichannel',
        headline: 'One content architecture. Every channel your customer uses.',
        body: 'Your customers engage across web, mobile, dealer portals, partner channels, and increasingly through embedded commerce experiences. Most enterprise CMS platforms were built for a single website — not for headless, multi-channel content delivery. EngageOS architects your Acquia and Drupal platform as a composable content hub: headless CMS with JSON:API content endpoints, a React/Next.js frontend for performance and flexibility, and an integration layer that connects your content to every downstream channel.\n\nThis isn\'t about rebuilding your website. It\'s about building the content infrastructure that feeds every digital touchpoint — and doing it once, with reusable components that scale across brands, regions, and channels.',
        outcomeMetrics: [
          'Cross-channel content consistency score',
          'Time-to-publish across channels',
          'Multi-brand deployment velocity',
        ],
        proofPoint: 'A multi-brand manufacturer with operations across 8 manufacturing locations and 325+ dealer locations consolidated 5 separate CMS platforms into a single headless Drupal architecture with a shared React component library. Each brand maintains its own visual identity through a design token system, while sharing core components — reducing per-brand launch time by more than half.',
      },
      {
        id: 'personalization',
        category: 'Personalization',
        headline: 'Serve the right content to the right buyer — at every stage of their journey.',
        body: 'Generic web experiences convert at generic rates. EngageOS activates the personalization capabilities built into the Acquia DXP ecosystem — Customer Data Platform for cross-channel identity resolution, Acquia Personalization for real-time content targeting, and AI-driven recommendation engines that learn from behavioral and firmographic signals.\n\nFor B2B enterprises, this means persona-driven content experiences: each buyer persona sees the content, documentation, and CTAs most relevant to their role and buying stage. Technical buyers see specifications and compliance; business buyers see pricing and ROI; partners see inventory and co-marketing resources.\n\nFor B2C brands, this means journey-stage personalization: first-time visitors see brand introduction and product exploration; returning visitors see previously viewed configurations and relevant promotions; channel-referred visitors see localized inventory and offers.',
        outcomeMetrics: [
          'Personalized content engagement rate vs. generic',
          'Lead scoring accuracy improvement',
          'Return visitor conversion uplift',
        ],
        proofPoint: 'A global technology company serving a worldwide buyer audience deployed persona-driven customer journeys — with each buyer persona receiving tailored content paths, AI-driven search results, and contextual navigation. The approach connects CMS content, CRM data, and intent signals into a unified personalization layer.',
      },
      {
        id: 'lead-generation',
        category: 'Lead Generation',
        headline: 'Turn every digital touchpoint into a qualified pipeline opportunity.',
        body: 'Digital experience modernization is only valuable if it drives pipeline. EngageOS connects your DXP to your marketing automation and CRM stack — HubSpot, Marketo, Salesforce — with structured lead capture, progressive profiling, and attribution tracking built into the architecture from day one. Forms, CTAs, gated content, and demo requests aren\'t afterthoughts bolted onto a CMS; they\'re first-class citizens in the content model.\n\nAI agents within the platform handle lead scoring enrichment, routing optimization, and follow-up sequencing — so your marketing operations team focuses on strategy, not manual workflows.',
        outcomeMetrics: [
          'Marketing qualified lead (MQL) volume',
          'Lead-to-opportunity conversion rate',
          'Cost per acquisition reduction',
        ],
        proofPoint: 'Enterprise clients architect lead capture, progressive profiling, and CRM integration as foundational infrastructure — not add-ons. One engagement integrated Marketo, Salesforce, and 6sense into a unified lead management system with automated routing and lifecycle tracking.',
      },
      {
        id: 'content-operations',
        category: 'Content Operations',
        headline: 'Give your marketing team the speed of a startup with the governance of an enterprise.',
        body: 'Enterprise content operations break down in two predictable ways: either marketing teams wait on IT for every page change, or they have so much freedom that brand consistency, compliance, and quality suffer. EngageOS resolves this tension with Acquia Site Studio — a low-code experience builder that lets marketing teams create pages, landing pages, and campaign experiences using pre-approved design components. IT builds the design system once; marketing builds pages infinitely.\n\nContent governance workflows enforce quality without slowing velocity: draft → review → legal → publish, with role-based permissions that ensure the right people approve the right content. AI agents assist with content migration, metadata tagging, and taxonomy management — reducing the manual overhead that makes CMS re-platforms so painful.',
        outcomeMetrics: [
          'Time-to-publish reduction',
          'Marketing team self-service rate',
          'Content governance compliance rate',
        ],
        proofPoint: 'Acquia customers report approximately 49% improvement in time-to-market for new content with Site Studio. In both reference engagements, content governance workflows with role-based permissions are foundational requirements — not nice-to-haves.',
      },
    ],

    podModel: {
      headline: 'A dedicated AI Pod builds your platform. Human wizards augment with quality and oversight.',
      body: 'Every EngageOS engagement is delivered by a AI Pod. Specialized AI agents handle the volume work — code generation, content migration, search configuration, automated testing, and deployment. A small human team of 2–3 experts governs architecture decisions, client relationships, and production quality.\n\nThis isn\'t AI-assisted development. The agents are the primary workforce. Your human team focuses on the decisions that matter — platform architecture, integration strategy, and client outcomes.',
      roles: [
        'Solution Architecture Agent',
        'Frontend Engineering Agent',
        'Search & Integration Agent',
        'QA & Security Agent',
        'Content & Publishing Agent',
        'Customer Success Lead (Human)',
        'Technical Reviewer (Human)',
      ],
      aiAgentTypes: [
        {
          name: 'Platform Agents',
          description: 'Handle Acquia configuration, Drupal development, Algolia search setup, Threekit integration, and React/Next.js frontend — the primary development layer.',
        },
        {
          name: 'Quality & Security Agents',
          description: 'Continuous automated testing, vulnerability scanning, performance monitoring, and regression validation on every change.',
        },
        {
          name: 'Operational Agents',
          description: 'Run continuously after go-live: content migration, search relevance optimization, and value realization dashboards tracking your outcome KPIs in real time.',
        },
      ],
    },

    techStack: {
      headline: 'Your platforms. Our intelligence layer. Differentiated outcomes.',
      body: 'We don\'t replace your platform investments — we make them dramatically more valuable. The Tvameva intelligence and agentic layer sits between your existing enterprise platforms and the business outcomes you need, adding the AI-driven capabilities that turn good infrastructure into a competitive advantage.',
      layers: [
        // Tier 3: Outcomes unlocked
        { layer: 'Outcome: Self-Service Discovery', platform: 'Buyers find and configure products without sales intervention', role: 'Intelligent search and guided discovery that converts browsing into pipeline — across every buyer persona and channel' },
        { layer: 'Outcome: Conversion Velocity', platform: 'Shorter sales cycles, higher conversion rates', role: 'Frictionless path from search to configuration to quote — reducing friction at every stage of the buying journey' },
        { layer: 'Outcome: Revenue Intelligence', platform: 'Better leads, smarter routing, higher win rates', role: 'Intelligent scoring and routing that drives MQL-to-SQL conversion and attribution across channels' },
        // Tier 2: Tvameva intelligence layer (THE MOAT)
        { layer: 'Tvameva Intelligence: AI Search', platform: 'Algolia NeuralSearch + Acquia-Algolia Connector', role: 'AI-powered search connecting content, product data, and customer context into a unified discovery experience across web, mobile, and partner channels' },
        { layer: 'Tvameva Intelligence: Personalization', platform: 'Acquia CDP + Persona-Driven Journeys', role: 'Persona-based content experiences — each buyer persona sees the content, pricing, and CTAs most relevant to their needs and buying stage' },
        { layer: 'Tvameva Intelligence: Visual Commerce', platform: 'Threekit + 3D Configurator + AR/VR + Digital Twins', role: '3D product configuration, augmented reality overlays, digital twin visualization, and CPQ-integrated visual commerce' },
        { layer: 'Tvameva Agentic: Content & Publishing', platform: 'AI Agents + Site Studio', role: 'AI-driven content migration, metadata tagging, taxonomy management, and marketing self-service at enterprise scale' },
        { layer: 'Tvameva Accelerator: Integration', platform: 'Pre-built Connectors + Boomi iPaaS', role: 'Acquia-Algolia, Algolia-Threekit, Algolia-Salesforce connectors — eliminating 4-8 weeks of custom build each' },
        // Tier 1: Customer's existing investment
        { layer: 'Your existing: CRM', platform: 'Salesforce · HubSpot · Dynamics', role: 'Your customer relationship and pipeline management — connected and enriched' },
        { layer: 'Your existing: PIM & Commerce', platform: 'Product Information · ERP · CPQ', role: 'Your product data, pricing, and order management systems — integrated into the digital experience' },
        { layer: 'Your existing: MarTech', platform: 'Marketing Automation · Integration Platform', role: 'Your marketing and integration platforms — extended with intelligence, not replaced' },
        { layer: 'Your existing: Data & Analytics', platform: 'Data Platform · Analytics · BI', role: 'Your data infrastructure and analytics tools — enriched with AI-driven insights' },
      ],
      connectors: [
        {
          name: 'Acquia-Algolia Data Connector',
          description: 'Synchronizes Drupal content nodes and product data with Algolia search indexes in real time. Eliminates 6–8 weeks of custom integration.',
        },
        {
          name: 'Algolia-Threekit Connector',
          description: 'Bridges search discovery with 3D product configuration. Customers search, find, and transition seamlessly into the visual configurator.',
        },
        {
          name: 'Algolia-Salesforce Connector',
          description: 'Connects search behavior to CRM data, enabling personalization based on account context and feeding search analytics into lead scoring.',
        },
      ],
    },

    proofPoints: [
      {
        id: 'semiconductor-dxp',
        industryTag: 'Hi-Tech / Semiconductor',
        headline: 'Rebuilding digital product discovery for a global semiconductor leader.',
        challenge: 'A publicly traded semiconductor company with a global engineering customer base needed to completely modernize its digital experience. The existing platform suffered from fragmented content systems, disconnected search, limited personalization, and no self-service capabilities for marketing teams.',
        solution: 'Composable DXP built on Acquia Cloud with headless Drupal 11, integrated with Algolia for AI-powered parametric search, Salesforce and Marketo for lead management, and a content architecture designed for role-based personalization.',
        outcomes: [
          'Unified search across products, documents, and knowledge resources',
          'Persona-based experiences for each buyer type and channel partner',
          'Automated content governance (draft → legal review → publish)',
          'AI-powered search with semantic understanding and cross-reference tools',
          'Marketing self-service for landing pages and campaign content',
        ],
        scopeIndicator: '18-month transformation | Acquia + Algolia + Salesforce + Marketo | 3-phase delivery',
      },
      {
        id: 'manufacturer-dxp',
        industryTag: 'Manufacturing / Consumer',
        headline: 'Unifying 8 brands on a single composable DXP — with 3D product configuration.',
        challenge: 'A leading manufacturer with 8 distinct product brands, 85+ product models, and a network of 325+ dealers was operating on 5 separate CMS platforms with no unified digital experience, enterprise DAM, CDP, or analytics layer.',
        solution: 'Acquia Cloud (Drupal 11) multisite with shared React/Next.js frontend and design token system for 8 brand themes. Algolia NeuralSearch for AI-powered product discovery. Threekit for 3D configuration with real-time ERP BOM validation. Boomi iPaaS connecting CMS, CRM, ERP, dealer networks, and analytics.',
        outcomes: [
          '8 brands on a single headless CMS with shared component library',
          '3D product configurator with real-time pricing and BOM validation',
          'AI-powered product discovery across 85+ models',
          'Unified dealer portal with real-time inventory',
          '50–60 shared React components with brand-specific theming',
        ],
        scopeIndicator: '18-month transformation | Acquia + Algolia + Threekit + Boomi + HubSpot',
      },
    ],

    marketContext: {
      headline: 'Your digital experience is your competitive advantage — or your biggest liability.',
      stats: [
        { stat: 'Revenue impact of poor digital experience', value: 'Up to 35%', context: 'Forrester: enterprises with disconnected digital platforms lose up to 35% of potential revenue to friction, abandonment, and slow time-to-market.' },
        { stat: 'B2B buyers who abandon due to poor search', value: '68%', context: 'Baymard Institute: buyers leave when they can\'t find what they need. AI-powered search converts — keyword matching doesn\'t.' },
        { stat: 'Time-to-market advantage with composable DXP', value: '2–3x', context: 'Gartner: organizations with composable architecture ship campaigns and product launches 2–3x faster than those on monolithic platforms.' },
        { stat: 'Enterprises prioritizing DXP modernization in 2025–2026', value: '72%', context: 'IDC: nearly three-quarters of enterprises rank digital experience platform modernization as a top-3 technology investment.' },
        { stat: 'Self-service adoption with AI-powered discovery', value: '40–70%', context: 'Enterprises deploying AI search and guided discovery see 40–70% of buyers completing product selection without sales intervention.' },
      ],
    },

    expansionPath: {
      headline: 'EngageOS is your starting point — not your ceiling.',
      body: 'Every EngageOS engagement opens natural pathways to the rest of the Tvameva solution portfolio. The composable architecture we build creates a foundation that other solution areas extend — without ripping and replacing.',
      connections: [
        { targetSAId: 'searchcore', targetSAName: 'SearchCore', trigger: 'Deeper search optimization, A/B testing, and cross-platform search unification beyond the DXP' },
        { targetSAId: 'visualforge', targetSAName: 'VisualForge', trigger: 'Full visual commerce strategy: advanced CPQ, AR/VR, multi-platform configurators' },
        { targetSAId: 'insightlens', targetSAName: 'InsightLens', trigger: 'Predictive analytics on GCP, customer behavior modeling, ROI dashboards' },
        { targetSAId: 'resolveiq', targetSAName: 'ResolveIQ', trigger: 'AI-enabled support for Acquia, Drupal, and the integration layer' },
      ],
    },

    advisoryExtended: {
      headline: 'Ready to see EngageOS in action?',
      body: 'We\'ll walk you through an EngageOS demo — how our AI Pod delivers, what the economics look like, and how it applies to your specific use case. 30 minutes. No commitment.',
      scopeItems: [
        'Current CMS and content architecture audit',
        'Search and discovery capability gap analysis',
        'Integration landscape mapping (CRM, ERP, marketing automation, analytics)',
        'Personalization maturity evaluation',
        'Composable architecture readiness score',
        'Phased roadmap with prioritized workstreams and investment estimates',
      ],
    },

    seo: {
      metaTitle: 'EngageOS — Acquia Implementation Partner | Drupal DXP Modernization | Tvameva',
      metaDescription: 'Acquia implementation partner for enterprise DXP modernization. Headless CMS consulting, AI-powered search, persona-driven personalization, and composable architecture on Drupal — delivered by AI pods.',
    },

    architectureDiagram: {
      layers: [
        { id: 'experience', label: 'Experience Layer', description: 'Brand Websites · 3D Configurator · Mobile · Dealer Portal', color: '#f5a623' },
        { id: 'intelligence', label: 'Intelligence Layer', description: 'Algolia NeuralSearch · Acquia CDP · Personalization · GA4/GTM', color: '#e8593c' },
        { id: 'integration', label: 'Integration Hub', description: 'Boomi iPaaS · Connectors · Real-time Sync · API Gateway', color: '#4a90d9' },
        { id: 'dxp', label: 'DXP & Content', description: 'Acquia Cloud · Site Studio · DAM · Headless CMS · Content API', color: '#2ed8a3' },
        { id: 'systems', label: 'Business Systems', description: 'CRM · ERP · Marketing Automation · Commerce', color: '#a78bfa' },
      ],
      badge: 'Composable DXP',
    },

    relationshipGraph: {
      nodes: [
        { id: 'engageos', label: 'EngageOS', color: '#2ed8a3', type: 'primary' },
        { id: 'searchcore', label: 'SearchCore', color: '#e8593c' },
        { id: 'visualforge', label: 'VisualForge', color: '#a78bfa' },
        { id: 'insightlens', label: 'InsightLens', color: '#4a90d9' },
        { id: 'resolveiq', label: 'ResolveIQ', color: '#f5a623' },
      ],
      edges: [
        { source: 'engageos', target: 'searchcore', label: 'Deeper search optimization' },
        { source: 'engageos', target: 'visualforge', label: 'Full visual commerce strategy' },
        { source: 'engageos', target: 'insightlens', label: 'Predictive analytics on GCP' },
        { source: 'engageos', target: 'resolveiq', label: 'AI-enabled support' },
      ],
      centerNode: 'engageos',
    },
  },

  // =========================================================================
  // Other 4 SAs — unchanged from current data
  // =========================================================================

  {
    id: 'insightlens',
    name: 'InsightLens',
    slug: 'insightlens',
    tagline: 'AI-Native Decision Intelligence',
    headline: 'Your leadership team shouldn\'t wait for reports — they should ask questions and get answers.',
    platformAnchor: 'InsightLens — AI-Native Decision Intelligence',
    platformPartners: ['BigQuery', 'Vertex AI', 'Looker'],
    valueProp: 'InsightLens builds and operates predictive and prescriptive analytics on Google Cloud — from pipeline architecture through ML model deployment to executive scorecards. Our dedicated pod handles BigQuery optimization, Vertex AI notebook development, and Looker visualization — with AI-assisted pipeline scripting and continuous data quality validation. You pay for pipeline reliability SLA, dashboard adoption rate, and time-to-insight reduction.',
    keyIP: {
      name: 'GCP Analytics Accelerator Kit',
      description: 'Pre-built BigQuery lakehouse templates, Vertex AI pipeline scaffolding, and Looker block library — eliminating 8–12 weeks of foundational build.',
    },
    outcomeMetrics: [
      'Pipeline reliability SLA',
      'Dashboard adoption rate',
      'Time-to-insight reduction',
    ],
    pricingContrast: {
      paysFor: 'Pipeline SLA + dashboard adoption + model accuracy',
      notFor: 'Data engineers on the clock',
    },
    marketStats: [
      { stat: 'Analytics leaders vs. laggards EBIT premium', value: '3–5x' },
      { stat: 'Orgs with AI/ML operationalized in production', value: '23%' },
      { stat: 'Time-to-answer reduction with AI analytics', value: '80–90%' },
    ],
    expansionSA: {
      id: 'resolveiq',
      description: 'Analytics data layer powers ResolveIQ agent decisions — intelligent enterprise app support built on real-time data.',
    },
    advisory: {
      name: 'Data & AI Readiness Assessment',
      description: 'Evaluates your current analytics maturity, identifies quick wins on GCP, and builds a 90-day activation roadmap.',
      cta: 'Start your Data & AI Readiness Assessment',
    },
    capabilities: [
      'GCP data pipeline engineering (Dataflow, Composer, dbt)',
      'BigQuery lakehouse architecture & query optimization',
      'Vertex AI model development, deployment & drift monitoring',
      'Looker dashboard development & LookML modeling',
      'NLP-driven analytics interfaces & conversational BI',
      'Data quality validation, lineage tracking & governance',
      'GCP-Salesforce data bridge & CRM analytics integration',
    ],
    color: 'blue',
    icon: 'BarChart3',

    // === Enriched InsightLens content ===

    heroSubheadline: 'Your competitors are predicting churn before it shows in their CRM. They\'re optimizing inventory before the monthly close. They\'re giving every sales rep the next best action before the rep picks up the phone. You\'re still waiting for last quarter\'s dashboard to load. The gap between what your data could tell you and what your leadership actually acts on is where revenue leaks, margins erode, and market share shifts — quietly, then all at once.',

    heroCTAs: [
      { label: 'Book a 30-Minute Demo', href: 'https://calendly.com/varada-tvameva/30min', variant: 'primary' },
      { label: 'Start a Data & AI Readiness Assessment', href: '/contact', variant: 'secondary' },
    ],

    challenge: {
      headline: 'Your data is everywhere. Your decisions are still based on last quarter.',
      body: 'Enterprise data and analytics leaders face a version of the same problem — and the bigger the organization, the hairier it gets: more data than ever, and less confidence in it. Your operational data lives in Salesforce. Your financial data is in an ERP. Your product telemetry is in cloud storage. Your customer behavior data is scattered across three marketing platforms and a data warehouse that hasn\'t been properly maintained in 18 months.\n\nYour BI team produces reports. Your data engineers keep pipelines running. But no one has connected predictive intelligence to the decisions that actually drive revenue, margin, or risk exposure. The dashboards your executives see are descriptive — they explain what happened, not what\'s about to happen or what to do about it.\n\nMeanwhile, AI-native competitors are using real-time demand signals to optimize inventory before you\'ve finished your monthly close. They\'re predicting churn before it shows in your CRM. They\'re surfacing the next best action for every sales rep before the rep picks up the phone.\n\nInsightLens closes the gap between your data infrastructure and your decision-making velocity — on Google Cloud, in weeks, not quarters.',
    },

    valueDrivers: [
      {
        id: 'executive-dashboards',
        category: 'Executive Scorecards',
        headline: 'Scorecards that drive decisions — not dashboards that get ignored.',
        body: 'Most enterprise dashboards fail for the same reason: they were designed by data teams for data teams. Executives see 40 metrics when they need 5. They see what changed, not why it changed or what the implication is. InsightLens designs and deploys Looker scorecards built around decision workflows — starting from the decision, not the data.\n\nFor each executive function (CFO revenue operations, COO supply chain performance, CMO pipeline and attribution, CRO quota attainment), we define the 3–5 metrics that drive weekly decisions, build LookML models that surface those metrics with appropriate context, and deliver scorecards with drill-through paths that let leaders move from summary to root cause in two clicks.\n\nScorecard adoption is an explicit outcome metric. We track it, report on it, and iterate against it.',
        outcomeMetrics: [
          'Weekly active scorecard users (executive and operational)',
          'Time-to-insight for standard recurring questions',
          'Data-driven decision rate (qualitative adoption survey)',
          'Scorecard NPS from business stakeholders',
        ],
        proofPoint: 'A B2B SaaS company replaced a fragmented collection of spreadsheet-based executive reporting with a Looker scorecard suite covering revenue operations, product usage, and customer health. The CFO\'s weekly revenue operations review moved from a 4-hour manual data assembly process to a 20-minute Looker session. All five C-suite stakeholders were weekly active users within 90 days of go-live.',
      },
      {
        id: 'conversational-analytics',
        category: 'Conversational Analytics',
        headline: 'Ask your data a question. Get an answer in plain language.',
        body: 'The analyst bottleneck is real: every business question that can\'t be answered by a pre-built scorecard lands in a queue. Business leaders wait days for insights their teams spend hours producing. InsightLens deploys NLP-driven analytics interfaces powered by Gemini and Vertex AI — connected to your BigQuery warehouse — so business users can ask questions in natural language and receive structured, contextualized answers with the supporting data and visualization.\n\nThis is not a chatbot bolted onto a BI tool. It is a semantic layer built over your data model, with query generation that understands your business terminology, enforces row-level security, and returns results in the format most useful to the asker: a number, a chart, a ranked list, or a narrative summary with anomaly flags.',
        outcomeMetrics: [
          'Self-service analytics query rate vs. analyst queue',
          'Time-to-answer for ad-hoc business questions',
          'Executive Scorecard engagement frequency',
          'Analyst time reclaimed for model development',
        ],
        proofPoint: 'A financial services operation integrated a natural language query interface over its BigQuery data warehouse, allowing operations managers to ask questions like "Which product lines are trending below forecast this month and what is the projected Q3 impact?" without a BI analyst intermediary. Analyst queue volume for ad-hoc reporting dropped significantly within 60 days of deployment.',
      },
      {
        id: 'predictive-analytics',
        category: 'Predictive Analytics',
        headline: 'Stop explaining what happened. Start predicting what will.',
        body: 'Descriptive analytics tells you where revenue came from last quarter. Predictive analytics tells you where it\'s going next quarter — and which signals are moving. InsightLens develops Vertex AI models trained on your historical operational, financial, and behavioral data: demand forecasting models for supply chain optimization, churn propensity models for customer success intervention, revenue run-rate models for FP&A planning, and opportunity scoring models for sales prioritization.\n\nModels are not static deliverables. Our pod deploys to Vertex AI endpoints with continuous drift monitoring, automated retraining triggers, and explainability outputs that let your business analysts understand the model\'s reasoning — not just its score. You don\'t inherit a black box.',
        outcomeMetrics: [
          'Forecast accuracy vs. baseline',
          'Model drift detection latency',
          'Prediction-to-action adoption rate',
          'FP&A planning cycle reduction',
        ],
        proofPoint: 'A B2B technology company with a direct sales force deployed a churn propensity model on Vertex AI trained against three years of product usage telemetry, support ticket history, and CRM engagement data. Customer success managers receive weekly prioritized intervention lists with confidence scores and the top contributing risk factors. Early-warning lead time improved from reactive (post-churn) to 90+ days forward-looking.',
      },
      {
        id: 'prescriptive-intelligence',
        category: 'Prescriptive Intelligence',
        headline: 'From insight to action — with the next best move surfaced automatically.',
        body: 'Predictive models tell you what\'s likely to happen. Prescriptive intelligence tells you what to do about it — and quantifies the expected outcome of each option. InsightLens builds prescriptive decision layers on top of your predictive models: inventory reorder optimization that balances carry cost against stockout risk; pricing recommendation engines that model margin impact before a rep discounts; workforce scheduling optimization that accounts for demand variability and labor constraints.\n\nThese aren\'t static rule engines. They\'re reinforcement-learning-informed recommendation systems built on Vertex AI, with feedback loops that improve recommendations as outcomes are recorded. The result: your operational teams get a specific recommendation, not a dashboard to interpret.',
        outcomeMetrics: [
          'Recommendation adoption rate by operational teams',
          'Revenue or margin impact per recommendation acted on',
          'Decision cycle time reduction',
          'Escalation rate to human override',
        ],
        proofPoint: 'A mid-market manufacturing company with seasonal demand variability deployed a prescriptive inventory optimization model that integrates demand forecasts, supplier lead times, and working capital constraints. The model generates weekly reorder recommendations by SKU with projected stockout probability and carry cost. Excess inventory as a percentage of revenue fell in the first two quarters of deployment.',
      },
      {
        id: 'data-governance',
        category: 'Data Governance',
        headline: 'Data your organization can trust — and audit.',
        body: 'AI models trained on bad data produce confident wrong answers. Scorecards built on inconsistent definitions mislead executives. InsightLens treats data governance not as a compliance checkbox but as the foundation that makes everything else work.\n\nOur pod implements Google Cloud\'s Data Catalog for automated metadata management and lineage tracking, BigQuery column-level access controls and row-level security policies for sensitive data, and dbt-enforced data contracts between pipeline layers. Model inputs are documented, versioned, and auditable. Every metric in every scorecard traces back to a defined, tested, approved data source.\n\nFor organizations in regulated industries — financial services, healthcare, manufacturing with export controls — this audit trail is not optional. For every enterprise, it is the difference between analytics that gets used and analytics that gets questioned.',
        outcomeMetrics: [
          'Data quality score across production datasets',
          'Percentage of production models with documented lineage',
          'Policy violations detected and remediated',
          'Audit readiness score for regulated data assets',
        ],
        proofPoint: 'An enterprise operating in a regulated industry implemented automated data lineage tracking across its GCP data platform, connecting every production Looker scorecard metric back to its source pipeline and transformation logic. The first external audit of the analytics environment completed in two days — a process that had previously taken three weeks of manual documentation preparation.',
      },
      {
        id: 'pipeline-engineering',
        category: 'Pipeline Engineering',
        headline: 'Reliable data in. Trustworthy decisions out.',
        body: 'Every analytics initiative fails at the same place: the data pipeline. Broken ingestion, inconsistent schemas, undocumented transformations, and silent failures that corrupt downstream models before anyone notices. InsightLens starts by engineering the foundation — Cloud Composer-orchestrated pipelines that ingest from your ERP, CRM, product telemetry, and third-party data sources into a structured BigQuery lakehouse.\n\nOur pod builds dbt transformation models with embedded data quality tests at every layer — not bolted on afterward. Lineage documentation is generated automatically. SLA monitoring catches failures before they reach a scorecard. AI agents run continuous regression validation after every pipeline change, so your data team stops firefighting and starts building.',
        outcomeMetrics: [
          'Pipeline uptime SLA (target: 99.5%+)',
          'Data quality test coverage',
          'Mean time to detect pipeline failure',
          'Schema drift incidents per quarter',
        ],
        proofPoint: 'A global enterprise software company operating across 40+ countries rebuilt its fragmented data ingestion layer on Cloud Composer and BigQuery. Eleven disconnected ETL jobs — each maintained by a different team with no shared lineage documentation — were consolidated into a single orchestrated pipeline with automated SLA alerting. Data team time spent on incident response dropped by more than half within the first quarter.',
        connectorIP: {
          name: 'GCP Analytics Accelerator Kit',
          description: 'Pre-built Composer DAG templates, BigQuery schema registry, and dbt model scaffolding. Eliminates 8–12 weeks of foundational pipeline build.',
        },
      },
    ],

    podModel: {
      headline: 'A dedicated AI Pod builds your analytics platform. Human wizards augment with accuracy and adoption.',
      body: 'Every InsightLens engagement is delivered by a AI Pod. Specialized AI agents handle pipeline engineering, model development, dashboard creation, and data quality validation. 2–3 human wizards augment the pod with architecture decisions, model accuracy, and executive adoption.\n\nThe agents own the full analytics lifecycle — from pipeline orchestration through model deployment to dashboard monitoring. Humans focus on what matters: ensuring the right business questions are being answered and the right decisions are being driven.',
      roles: [
        'Data Pipeline Agent',
        'ML Engineering Agent',
        'Dashboard & Analytics Agent',
        'Data Quality & Governance Agent',
        'MLOps & Monitoring Agent',
        'Customer Success Lead (Human)',
        'GCP Solution Architect (Human)',
      ],
      aiAgentTypes: [
        {
          name: 'Pipeline & Data Agents',
          description: 'Build and monitor BigQuery pipelines, Composer DAGs, dbt transformations, and data quality checks — the primary data engineering layer.',
        },
        {
          name: 'ML & Intelligence Agents',
          description: 'Develop Vertex AI models, manage retraining workflows, detect drift, and generate explainability reports for business stakeholders.',
        },
        {
          name: 'Analytics & Adoption Agents',
          description: 'Build Looker dashboards, monitor adoption metrics, and track value realization KPIs — so outcomes your pricing is tied to are visible in real time.',
        },
      ],
    },

    techStack: {
      headline: 'Your GCP investment. Our intelligence layer. Decisions that drive revenue.',
      body: 'We don\'t build a proprietary analytics platform on top of your cloud. We add a differentiated intelligence and agentic layer to your existing GCP investment — turning data infrastructure into decision infrastructure.',
      layers: [
        // Tier 3: Outcomes
        { layer: 'Outcome: Decision Velocity', platform: 'Same-day insights, not quarterly reports', role: 'Executives get answers in Looker sessions that replace days of manual data assembly' },
        { layer: 'Outcome: Predictive Advantage', platform: '90+ day forward-looking predictions', role: 'Churn propensity, demand forecasting, and revenue run-rate models that see around corners' },
        { layer: 'Outcome: Self-Service Analytics', platform: 'Natural language data queries', role: 'Business users ask questions in plain language and get structured, contextualized answers' },
        // Tier 2: Tvameva intelligence (MOAT)
        { layer: 'Tvameva Intelligence: ML & AI', platform: 'Vertex AI + Gemini + Custom Models', role: 'Predictive and prescriptive models deployed with drift monitoring, automated retraining, and explainability — the intelligence that turns data into foresight' },
        { layer: 'Tvameva Intelligence: Conversational', platform: 'NLP Query Interface + Semantic Layer', role: 'Natural language analytics over your data model — leadership asks questions in plain language, gets structured answers with row-level security' },
        { layer: 'Tvameva Agentic: Orchestration Layer', platform: 'AI Agents across the full GCP stack', role: 'Pipeline Agent builds and monitors Composer DAGs. ML Agent trains and deploys Vertex AI models. Quality Agent enforces data contracts and SLA. Analytics Agent builds Looker dashboards and tracks adoption. All operating continuously — not waiting for a sprint.' },
        { layer: 'Tvameva Agentic: Continuous Quality', platform: 'dbt + Data Catalog + Dataplex', role: 'Automated schema drift detection, lineage tracking, data quality enforcement, and governance policy compliance — on every pipeline run, not quarterly audits' },
        { layer: 'Tvameva Accelerator: Analytics Kit', platform: 'GCP Analytics Accelerator Kit', role: 'Pre-built Composer DAGs, BigQuery schemas, dbt models, and Looker blocks — 8–12 weeks of foundational build eliminated. Every deployment makes the next one faster.' },
        // Tier 1: Customer existing
        { layer: 'Your existing: Data Warehouse', platform: 'Data Warehouse · Data Lake · Cloud Storage', role: 'Your analytical data infrastructure — extended with AI-driven intelligence, not replaced' },
        { layer: 'Your existing: CRM & ERP', platform: 'Salesforce · ERP · Product Databases', role: 'Your operational data sources — bidirectionally connected into the analytics platform' },
        { layer: 'Your existing: BI & Reporting', platform: 'Existing Dashboards · Spreadsheets · Reports', role: 'Your current reporting tools — augmented with predictive intelligence and self-service analytics' },
        { layer: 'Your existing: Data Ops', platform: 'ETL Pipelines · Scheduling · Data Governance', role: 'Your pipeline and governance infrastructure — automated and continuously monitored' },
      ],
      connectors: [
        {
          name: 'GCP-Salesforce Data Bridge',
          description: 'Bidirectional connector syncing Salesforce objects (Accounts, Opportunities, Cases, Events) into BigQuery with configurable refresh cadence and schema normalization.',
        },
        {
          name: 'Vertex AI Pipeline Scaffolding',
          description: 'Pre-built Kubeflow pipeline templates for common ML use cases: churn prediction, demand forecasting, anomaly detection. Eliminates 4–6 weeks of MLOps setup.',
        },
        {
          name: 'Looker Block Library',
          description: 'Pre-built LookML models for revenue operations, supply chain, and customer health analytics. Accelerates first-dashboard deployment to under two weeks.',
        },
      ],
    },

    proofPoints: [
      {
        id: 'enterprise-analytics-transformation',
        industryTag: 'B2B Technology / SaaS',
        headline: 'Replacing spreadsheet-driven planning with a real-time GCP analytics platform.',
        challenge: 'A B2B technology company with $700M+ in annual revenue was running its revenue operations, FP&A, and customer success functions on a mix of Excel models, Salesforce reports, and disconnected BI tools. There was no single source of truth. Executives received different revenue numbers from different teams. The CFO\'s monthly close required 3 days of manual reconciliation. Churn was identified reactively — after it appeared in the CRM, not before.',
        solution: 'InsightLens deployed a GCP analytics platform with Cloud Composer orchestration, a BigQuery lakehouse ingesting from Salesforce, the product database, and the financial ERP, dbt transformation models with embedded quality testing, a Vertex AI churn propensity model with 90-day forward-looking scores, and a Looker dashboard suite covering revenue operations, customer health, and product usage.',
        outcomes: [
          'Single source of truth for revenue metrics across Finance, Sales, and Customer Success',
          'Monthly close reconciliation reduced from 3 days to same-day',
          'Churn prediction model with 90+ day early-warning window',
          'C-suite weekly active Looker usage within 90 days of go-live',
          'FP&A planning cycle compressed by 35%',
        ],
        scopeIndicator: '16-week deployment | BigQuery + Vertex AI + Looker + Salesforce integration | 4-phase delivery',
      },
      {
        id: 'supply-chain-predictive-analytics',
        industryTag: 'Manufacturing / Industrial',
        headline: 'Predictive demand intelligence for a global manufacturer managing supply chain volatility.',
        challenge: 'A global manufacturer operating across 12 production facilities and 60+ markets was forecasting demand using a combination of historical sales data and sales team gut feel. Stockout events were costing margin. Excess inventory was tying up working capital. The operations team had no visibility into which demand signals — external market data, distributor ordering patterns, macroeconomic indicators — were the most predictive of their actual demand cycles.',
        solution: 'InsightLens built a demand forecasting platform on GCP: Dataflow pipelines ingesting distributor order data, external market signals, and production telemetry into BigQuery; a Vertex AI ensemble forecasting model combining time-series and gradient boosting approaches; a prescriptive reorder recommendation engine with working capital constraints; and Looker operational dashboards for regional supply chain managers.',
        outcomes: [
          'Forecast accuracy improvement of 18 percentage points vs. baseline human forecast',
          'Excess inventory as a percentage of revenue reduced in first two quarters',
          'Stockout events down by more than 30% year-over-year',
          'Weekly prescriptive reorder recommendations adopted by operations teams across all 12 facilities',
          'Supply chain manager time spent on manual planning analysis reduced by half',
        ],
        scopeIndicator: '20-week deployment | BigQuery + Dataflow + Vertex AI + Looker | 3-phase delivery',
      },
    ],

    marketContext: {
      headline: 'AI-native analytics is widening the competitive gap. The window to close it is narrow.',
      stats: [
        { stat: 'EBIT margin premium — analytics leaders vs. laggards', value: '3–5x', context: 'McKinsey Global Institute: organizations with mature, operationalized analytics outperform industry peers by this margin. The gap is compounding.' },
        { stat: 'Organizations with AI/ML fully operationalized in production', value: '23%', context: 'Gartner (2024): fewer than one in four have moved beyond experimentation. The majority still run on descriptive BI.' },
        { stat: 'Reduction in time-to-answer — AI analytics vs. analyst queue', value: '80–90%', context: 'IDC: ad-hoc query response drops from 2–5 business days to under 60 minutes with conversational AI interfaces.' },
        { stat: 'Planning cycle improvement with embedded predictive intelligence', value: '15–40%', context: 'McKinsey (2023): across FP&A, supply chain, and revenue operations where predictive models replace manual forecasting.' },
        { stat: 'Analytics leaders citing fragmented data as primary AI barrier', value: '74%', context: 'Forrester (2024): fragmented pipelines and missing governance separate analytics ambition from execution. This is where InsightLens starts.' },
      ],
    },

    expansionPath: {
      headline: 'InsightLens is your intelligence foundation — the rest of the portfolio builds on it.',
      body: 'Every InsightLens engagement creates a data asset that other solution areas can activate. The analytics platform you build with InsightLens doesn\'t just answer questions — it powers the intelligence layer that makes every other tvameva solution smarter.',
      connections: [
        { targetSAId: 'resolveiq', targetSAName: 'ResolveIQ', trigger: 'Analytics data layer powers ResolveIQ agent decision-making — intelligent support routing, ticket classification, and resolution confidence scoring' },
        { targetSAId: 'engageos', targetSAName: 'EngageOS', trigger: 'Behavioral analytics and customer journey data feed personalization models in the DXP layer' },
        { targetSAId: 'searchcore', targetSAName: 'SearchCore', trigger: 'Search analytics inform relevance model training and A/B test interpretation' },
        { targetSAId: 'visualforge', targetSAName: 'VisualForge', trigger: 'Configurator usage intelligence — which options get selected, abandoned, and converted — feeds product strategy decisions' },
      ],
    },

    advisoryExtended: {
      headline: 'Ready to see InsightLens in action?',
      body: 'We\'ll walk you through an InsightLens demo — how our AI Pod delivers, what the economics look like, and how it applies to your specific use case. 30 minutes. No commitment.',
      scopeItems: [
        'Data source inventory and integration landscape mapping',
        'Current pipeline reliability and data quality audit',
        'BI tooling maturity and dashboard adoption benchmarking',
        'Predictive and prescriptive analytics use case prioritization',
        'GCP architecture review (or greenfield design)',
        'Data governance posture evaluation against regulatory requirements',
        'Prioritized 90-day roadmap with investment estimates and expected business outcomes',
      ],
    },

    seo: {
      metaTitle: 'InsightLens — GCP Analytics Consulting | BigQuery & Vertex AI Implementation | Tvameva',
      metaDescription: 'GCP analytics consulting for enterprise decision intelligence. BigQuery implementation, Vertex AI models, executive scorecards, and conversational analytics — delivered by AI pods with outcome-based pricing.',
    },

    architectureDiagram: {
      layers: [
        { id: 'decision', label: 'Decision Layer', description: 'Executive Scorecards · Looker · Conversational Analytics', color: '#4a90d9' },
        { id: 'ml', label: 'ML & AI', description: 'Vertex AI · Gemini · Model Registry · Drift Monitoring', color: '#f5a623' },
        { id: 'data', label: 'Data Platform', description: 'BigQuery Lakehouse · dbt · Cloud Composer · Dataflow', color: '#2ed8a3' },
        { id: 'sources', label: 'Data Sources', description: 'CRM · ERP · Product Telemetry · External APIs', color: '#a78bfa' },
      ],
      badge: 'GCP Analytics Stack',
    },

    relationshipGraph: {
      nodes: [
        { id: 'insightlens', label: 'InsightLens', color: '#4a90d9', type: 'primary' },
        { id: 'resolveiq', label: 'ResolveIQ', color: '#f5a623' },
        { id: 'engageos', label: 'EngageOS', color: '#2ed8a3' },
        { id: 'searchcore', label: 'SearchCore', color: '#e8593c' },
        { id: 'visualforge', label: 'VisualForge', color: '#a78bfa' },
      ],
      edges: [
        { source: 'insightlens', target: 'resolveiq', label: 'Analytics powers agent decisions' },
        { source: 'insightlens', target: 'engageos', label: 'Behavioral analytics for personalization' },
        { source: 'insightlens', target: 'searchcore', label: 'Search analytics for relevance training' },
        { source: 'insightlens', target: 'visualforge', label: 'Configurator usage intelligence' },
      ],
      centerNode: 'insightlens',
    },

    metricsComparison: {
      title: 'The impact on your decision-making velocity',
      oldLabel: 'Before InsightLens',
      newLabel: 'With InsightLens',
      metrics: [
        { label: 'Monthly close reconciliation', oldValue: '3 days manual', newValue: 'Same-day automated', improvement: '3x faster' },
        { label: 'Churn detection window', oldValue: 'Reactive (post-churn)', newValue: '90+ days forward-looking', improvement: 'Predictive' },
        { label: 'Ad-hoc reporting queue', oldValue: 'Days per analyst request', newValue: 'Self-service NLP queries', improvement: 'Instant' },
        { label: 'Executive Scorecard adoption', oldValue: 'Sporadic / manual', newValue: 'Weekly active use in 90 days', improvement: 'Habitual' },
      ],
    },
  },
  {
    id: 'resolveiq',
    name: 'ResolveIQ',
    slug: 'resolveiq',
    tagline: 'AI-Enabled Enterprise App Support',
    headline: 'Replace your L1/L2 support cost center with an AI-first resolution engine — priced on tickets resolved, not seats filled.',
    platformAnchor: 'Salesforce Agentforce / Oracle / Workday',
    platformPartners: ['Salesforce Agentforce', 'Oracle', 'Workday'],
    valueProp: 'ResolveIQ deploys AI agents across your Salesforce, Oracle, and Workday environments to handle ticket resolution, workflow automation, and cross-system escalation. Our pod combines Agentforce flow builds, Oracle API integrations, and Workday connector code — with AI handling the volume and humans governing quality. A Fortune 500 ISV reduced a 47-person support operation to a 16-specialist pod at 67% lower cost with the same SLA.',
    keyIP: {
      name: 'Agentforce-Oracle & Agentforce-Workday Resolution Agents',
      description: 'Cross-system resolution agents proven in enterprise production.',
    },
    outcomeMetrics: [
      'AI resolution rate (target 85–90%)',
      'Cost-per-ticket vs. baseline',
      'Go-live date commitment',
    ],
    pricingContrast: {
      paysFor: 'AI resolution rate + cost-per-ticket reduction',
      notFor: 'L1/L2 headcount',
    },
    marketStats: [
      { stat: 'Agentforce enterprise customers', value: '18,500' },
      { stat: 'ARR with 50% QoQ growth', value: '$540M' },
      { stat: 'AI self-resolution demonstrated', value: '84%' },
    ],
    expansionSA: {
      id: 'insightlens',
      description: 'Every ResolveIQ client needs analytics infrastructure to power agent intelligence — a natural path to InsightLens.',
    },
    advisory: {
      name: 'Enterprise App Support Audit',
      description: 'Models AI resolution potential, projects cost savings, and builds a business case for pod-based delivery.',
      cta: 'Start your support audit',
    },
    capabilities: [
      'Agentforce flow builds & configuration',
      'Oracle API integrations & Workday connector code',
      'AI ticket resolution simulation & SLA regression',
      'Cross-system integration testing',
      'Agentforce-Oracle & Agentforce-Workday agent deployment',
    ],
    color: 'amber',
    icon: 'Bot',
  },
  {
    id: 'searchcore',
    name: 'SearchCore',
    slug: 'searchcore',
    tagline: 'Unified Search & Discovery',
    headline: 'Make every search a conversion opportunity — with AI-powered discovery that learns what your users want.',
    platformAnchor: 'Algolia',
    platformPartners: ['Algolia'],
    valueProp: 'SearchCore implements and optimizes Algolia-powered search and discovery across your product catalog, content library, or knowledge base. Our pod handles custom ranking configuration, indexing logic, A/B test automation, and cross-platform connector builds — connecting Algolia to Drupal, Salesforce, and Threekit. You pay for search conversion uplift, relevance score improvement, and integration go-live.',
    keyIP: {
      name: 'Algolia-Drupal, Algolia-Salesforce & Algolia-Threekit Connectors',
      description: 'Cross-platform connector library for unified search across your ecosystem.',
    },
    outcomeMetrics: [
      'Search conversion uplift',
      'Relevance score improvement',
      'Integration go-live on schedule',
    ],
    pricingContrast: {
      paysFor: 'Conversion uplift + relevance score',
      notFor: 'Algolia configuration hours',
    },
    marketStats: [
      { stat: 'Businesses served globally by Algolia', value: '18,000' },
      { stat: 'Searches processed annually', value: '1.75T' },
      { stat: 'B2B leaders fully AI-operational in search', value: '41%' },
    ],
    expansionSA: {
      id: 'engageos',
      description: 'Every search client benefits from EngageOS DXP modernization — better content architecture means better search results.',
    },
    advisory: {
      name: 'Search & Discovery Audit',
      description: 'Benchmarks your current search performance, identifies conversion gaps, and builds an optimization roadmap.',
      cta: 'Start your search audit',
    },
    capabilities: [
      'Algolia connector builds & custom ranking configuration',
      'Indexing logic & search relevance testing',
      'A/B test automation & ranking benchmarks',
      'Algolia-Drupal, Algolia-Salesforce, Algolia-Threekit connector deployment',
      'Cross-platform search unification',
    ],
    color: 'orange',
    icon: 'Search',
  },
  {
    id: 'visualforge',
    name: 'VisualForge',
    slug: 'visualforge',
    tagline: 'Visual & 3D Product Configuration',
    headline: 'Let your customers configure, visualize, and buy complex products — without a sales call.',
    platformAnchor: 'Threekit',
    platformPartners: ['Threekit'],
    valueProp: 'VisualForge builds and deploys 3D product configurators on Threekit that connect directly to your CPQ and commerce platforms. Our pod handles scene scripting, CPQ rule coding, 3D asset automation, and Salesforce/Oracle CPQ integration — with AI accelerating asset creation and configuration logic validation. You pay for configuration completion rate, sales cycle compression, and CPQ uptime.',
    keyIP: {
      name: 'Threekit-Salesforce CPQ & Threekit-Oracle CPQ Templates',
      description: 'Integration templates connecting 3D configurators to enterprise CPQ.',
    },
    outcomeMetrics: [
      'Configuration completion rate',
      'Sales cycle compression',
      'CPQ uptime',
    ],
    pricingContrast: {
      paysFor: 'Sales cycle compression + config completion',
      notFor: '3D asset hours',
    },
    marketStats: [
      { stat: 'Configurator market by 2033', value: '$5.6B' },
      { stat: 'Demand growth for 3D configurators (2024)', value: '40%' },
      { stat: 'Conversion rate increase for clients', value: 'Up to 40%' },
    ],
    expansionSA: {
      id: 'insightlens',
      description: 'Visual Commerce clients need analytics for configurator usage intelligence — a natural path to InsightLens.',
    },
    advisory: {
      name: 'Visual Commerce Assessment',
      description: 'Maps your product catalog complexity, evaluates CPQ integration readiness, and models the conversion impact of 3D configuration.',
      cta: 'Start your visual commerce assessment',
    },
    capabilities: [
      'Threekit scene scripting & CPQ rule coding',
      '3D asset automation & configuration logic validation',
      'Visual rendering QA & CPQ output accuracy',
      'Threekit-Salesforce CPQ & Threekit-Oracle CPQ integration',
      'Threekit-Commerce platform connectors',
    ],
    color: 'purple',
    icon: 'Box',
  },

  // =========================================================================
  // PropelEdge — AI-Native Proposal & Revenue Automation
  // =========================================================================

  {
    id: 'propeledge',
    name: 'PropelEdge',
    slug: 'propeledge',
    tagline: 'AI-Native Revenue Orchestration',
    headline: 'Every deal touches 12 teams. None of them are in sync. That\'s where revenue dies.',
    platformAnchor: 'PropelEdge — AI-Native Revenue Orchestration',
    platformPartners: ['Tvameva AI Platform'],
    valueProp: 'PropelEdge is the AI-native orchestration layer for your entire revenue process — connecting solution engineering, ABM, labs, account management, sales, partners, finance, and delivery into a single agentic workflow. AI agents handle the coordination, synthesis, and production across every team that touches a deal. Your experts focus on strategy and relationships.',
    keyIP: {
      name: 'Four-Agent Revenue Orchestration Pipeline',
      description: 'Purpose-built AI agents covering Opportunity Intake, POV Development, Demo Iteration, and Proposal Development — orchestrating across solution engineering, ABM, sales, delivery, finance, and partners. Human review at every stage.',
    },
    outcomeMetrics: [
      'Proposal cycle time reduction vs. baseline',
      'Proposal quality score (coverage completeness)',
      'Pipeline opportunities pursued per quarter',
      'Demo-to-proposal conversion rate improvement',
    ],
    pricingContrast: {
      paysFor: 'Proposal cycle time reduction + pipeline velocity + coverage completeness',
      notFor: 'Agent or platform seat licenses, hours logged, or document volume',
    },
    marketStats: [
      { stat: 'Decision-makers per enterprise deal', value: '12+' },
      { stat: 'Win rate on complex deals ($100K+ ACV)', value: '15–20%' },
      { stat: 'Sales rep time actually spent selling', value: '30%' },
    ],
    expansionSA: {
      id: 'insightlens',
      description: 'Proposal and pipeline data from PropelEdge powers InsightLens — predictive win-rate modeling, revenue forecasting, and deal intelligence dashboards on Google Cloud Platform.',
    },
    advisory: {
      name: 'Revenue Velocity Assessment',
      description: 'Maps your current proposal process — cycle time, resource load, coverage completeness, and institutional memory — and builds a phased activation roadmap your leadership team can act on. In days, not months.',
      cta: 'Book your 30-minute demo',
    },
    capabilities: [
      'Lead qualification, solution mapping, and opportunity scoring',
      '7-section point-of-view deck — tailored to the prospect, their industry, and their roadmap',
      'Demo scripts, walkthrough preparation, and deal readiness assessment',
      'Full enterprise proposal — scope, phasing, pricing, risks, and platform comparison',
      'Client roadmap alignment — 100% requirement coverage, zero gaps',
      'White-label delivery in your firm\'s brand profile',
      'Institutional memory — every deal makes the next one sharper',
    ],
    color: 'orange',
    icon: 'Rocket',

    // === Enriched PropelEdge content ===

    heroSubheadline: 'A sales rep lands the meeting. Then the carousel begins. Solution engineering builds the architecture. ABM shapes the narrative. Labs builds the demo. Finance models the deal. Delivery scopes the engagement. Partners align on go-to-market. Account managers coordinate. Multiple product teams weigh in. None of them are working from the same playbook, the same data, or the same timeline. Then — after weeks of alignment — the CRO and CFO review the package and send it back for rework. Every deal is a coordination tax across 12 teams, and the friction costs you velocity, margin, and wins.',

    heroCTAs: [
      { label: 'Book a 30-Minute Demo', href: 'https://calendly.com/varada-tvameva/30min', variant: 'primary' },
      { label: 'Schedule a Revenue Velocity Assessment', href: '/contact', variant: 'secondary' },
    ],

    challenge: {
      headline: 'The revenue process is broken — and it\'s not a people problem. It\'s an orchestration problem.',
      body: 'Every significant deal touches solution engineering, account-based marketing, labs and innovation, account managers, client partners, sales leadership, external partners, finance, delivery, and multiple product or practice teams. Each team contributes a piece — a technical architecture, a market narrative, a demo, a pricing model, a scope, a partner alignment — but no one owns the full picture. The result: fragmented proposals, inconsistent messaging, slow response times, and deals that die in the coordination gaps between teams.\n\nThe problem isn\'t talent. You have exceptional people across every function. The problem is that the orchestration layer between them is manual — emails, slide decks, Slack threads, and tribal knowledge. There\'s no system of record for how your firm wins deals. No institutional memory that compounds learning. No way to move at the speed your buyers demand.\n\nPropelEdge is the orchestration layer. AI agents handle the coordination, synthesis, and production work across all the teams that touch a deal — while your experts focus on the strategy, relationships, and judgment that actually win business.',
    },

    valueDrivers: [
      {
        id: 'opportunity-intake',
        category: 'Opportunity Intake',
        headline: 'Qualify, map, and score every lead in under an hour.',
        body: 'The first agent in the PropelEdge pipeline handles the work that typically consumes 1–2 days of senior consultant time: researching the prospect, mapping their needs to your service areas, generating use case hypotheses, and scoring opportunity fit. The agent pulls from public data sources, your CRM, and your firm\'s institutional knowledge base to produce a structured qualification package — not a generic lead score, but a detailed assessment of fit, competitive positioning, and recommended engagement approach.\n\nNo manual research. No wasted cycles on deals that won\'t close. Your team reviews the qualification, approves or redirects, and moves to the next stage in hours instead of days.',
        outcomeMetrics: [
          'Lead qualification time (target: under 1 hour)',
          'Qualification accuracy vs. historical close rates',
          'False positive rate reduction',
        ],
        proofPoint: 'A professional services team reduced lead qualification from 1–2 days of manual research to under 1 hour of AI-assisted analysis with human review — allowing the team to evaluate 3x more opportunities with the same headcount.',
      },
      {
        id: 'pov-development',
        category: 'POV Development',
        headline: 'A complete point-of-view deck in days, not weeks.',
        body: 'The second agent generates a full 7-section POV deck — composable architecture, agentic use cases, delivery model, and engagement options — tailored to the prospect\'s industry, technology landscape, and strategic priorities. The output is white-labeled to your firm\'s brand profile automatically.\n\nThis isn\'t template filling. The agent synthesizes prospect research from the intake stage, your firm\'s past engagements in similar verticals, and current market context to produce a POV that demonstrates genuine understanding of the prospect\'s business. Your team reviews content, iterates framing, and approves for delivery — they don\'t write boilerplate.',
        outcomeMetrics: [
          'POV development cycle time (target: 1–2 days)',
          'Client engagement rate with POV content',
          'POV-to-demo conversion rate',
        ],
        proofPoint: 'A consulting team that previously spent 2–3 weeks assembling POV decks now delivers client-ready presentations in 1–2 days — with higher quality scores from prospects due to deeper personalization and industry-specific framing.',
      },
      {
        id: 'demo-iteration',
        category: 'Demo Iteration',
        headline: 'Prep the demo. Capture feedback. Assess readiness.',
        body: 'The third agent prepares demo scripts and walkthroughs tailored to the prospect\'s priorities, captures session feedback in structured format, and assesses deal readiness with recommended next steps. Demo preparation that previously consumed days of manual work happens same-day.\n\nAfter each demo session, the agent processes feedback, updates the opportunity profile, and adjusts the proposal strategy. This creates a continuous feedback loop that sharpens every subsequent interaction — not just for this deal, but across your entire pipeline.',
        outcomeMetrics: [
          'Demo preparation time (target: same-day)',
          'Feedback capture completeness',
          'Deal readiness assessment accuracy',
        ],
        proofPoint: 'A professional services team eliminated multi-day demo preparation cycles. Demo scripts, walkthroughs, and readiness assessments are now generated same-day, with structured feedback capture that feeds directly into proposal development.',
      },
      {
        id: 'proposal-development',
        category: 'Proposal Development',
        headline: 'Full enterprise proposal in hours — not weeks.',
        body: 'The fourth agent builds a complete client-ready proposal — scope, phased sprint plan, pricing, risks, and platform comparison appendix. It finds the client\'s existing roadmap and maps every item to proposal scope, ensuring 100% requirement coverage with zero gaps. Output is delivered as DOC, PDF, and PPT — ready for client delivery.\n\nThis is the stage where PropelEdge delivers the most dramatic efficiency gain. What previously required a full week across 5–6 senior resources is completed in 5 hours by one person with the agent handling the heavy lifting. Your team reviews with colleagues, collaborates with the client, and approves for submission.',
        outcomeMetrics: [
          'Proposal cycle time (target: 5 hours vs. 1 week)',
          'Requirement coverage completeness (target: 100%)',
          'Proposal quality score from client feedback',
        ],
        proofPoint: 'A professional services team shipped a full client proposal in 5 hours. The same deliverable previously took a week and 5–6 senior resources. The proposal included scope, phasing, pricing, risk tables, and a platform comparison appendix — delivered as DOC, PDF, and PPT.',
      },
    ],

    podModel: {
      headline: 'Four agents. Your experts as guardrails. Not the other way around.',
      body: 'PropelEdge inverts the traditional deal pursuit model. Instead of 12 teams working in silos and senior consultants doing the coordination by hand, four purpose-built agents orchestrate the full revenue workflow — and your team reviews, refines, and approves at every stage. The result: your most experienced people spend their time on the decisions that win deals, not the documents and coordination that describe them.',
      roles: [
        'Opportunity Intake Agent',
        'POV Development Agent',
        'Demo Iteration Agent',
        'Proposal Development Agent',
        'Human Review & Approval (your team)',
      ],
      aiAgentTypes: [
        {
          name: 'Pipeline Agents',
          description: 'Four autonomous agents covering the full revenue lifecycle: qualification, POV creation, demo preparation, and proposal development. Each agent operates independently but shares context across the pipeline and all contributing teams.',
        },
        {
          name: 'Institutional Memory',
          description: 'Every deal — won or lost — feeds the knowledge base. Proposal patterns, competitive intelligence, industry-specific framing, and client feedback compound across engagements, making every subsequent proposal sharper.',
        },
        {
          name: 'White-Label Engine',
          description: 'All outputs are automatically formatted in your firm\'s brand profile — fonts, colors, logos, and document templates. Client-ready deliverables without manual formatting.',
        },
      ],
    },

    techStack: {
      headline: 'Your CRM and proposal tools. Our agentic intelligence. 90% fewer people per deal.',
      body: 'PropelEdge is not a document template tool with AI bolted on. It adds a purpose-built agentic intelligence layer to your existing CRM and proposal workflow — four specialized agents that handle the volume work your senior people shouldn\'t be doing.',
      layers: [
        // Tier 3: Outcomes
        { layer: 'Outcome: Pipeline Velocity', platform: '3x more opportunities pursued', role: 'Same team size, dramatically more deals in motion — AI agents handle the capacity ceiling' },
        { layer: 'Outcome: Proposal Quality', platform: '100% requirement coverage', role: 'Zero gaps, zero missed items — AI maps every client requirement to proposal scope' },
        { layer: 'Outcome: Speed to Client', platform: '5-hour proposal delivery', role: 'Full enterprise proposal — scope, phasing, pricing, risks — in hours, not weeks' },
        // Tier 2: Tvameva intelligence (MOAT)
        { layer: 'Tvameva Agentic: Intake Agent', platform: 'Opportunity Qualification + Scoring', role: 'Researches prospects, maps to service areas, scores fit, synthesizes inputs from sales, ABM, and partner teams — in under 1 hour vs. 1–2 days manual' },
        { layer: 'Tvameva Agentic: POV Agent', platform: 'Point-of-View Deck Generation', role: 'Generates 7-section POV decks pulling from solution engineering, industry frameworks, and competitive intel — white-labeled to your brand. 1–2 days vs. 2–3 weeks' },
        { layer: 'Tvameva Agentic: Demo Agent', platform: 'Demo Prep + Feedback Capture', role: 'Prepares demo scripts from labs and solution architecture inputs, captures structured feedback, assesses deal readiness — same-day vs. days of prep' },
        { layer: 'Tvameva Agentic: Proposal Agent', platform: 'Full Enterprise Proposal', role: 'Orchestrates scope from delivery, pricing from finance, partner alignment, risk assessment — complete proposal in 5 hours vs. 1 week across 5–6 people. Output: DOC, PDF, PPT' },
        { layer: 'Tvameva Intelligence: Knowledge Base', platform: 'Vector Store + RAG + Institutional Memory', role: 'Every deal compounds learning — past proposals, competitive intelligence, industry frameworks, client feedback. The system gets smarter with every pursuit.' },
        { layer: 'Tvameva Accelerator: Brand Engine', platform: 'White-Label Output System', role: 'Automated formatting in your firm\'s brand profile. Client-ready deliverables without manual formatting across all 12 contributing teams.' },
        // Tier 1: Customer existing
        { layer: 'Your existing: CRM', platform: 'Salesforce / HubSpot', role: 'Your pipeline and opportunity data — bidirectionally synced with qualification scores and proposal metadata' },
        { layer: 'Your existing: Research Sources', platform: 'Web · Industry Data · Client Portals', role: 'Your prospect research sources, RFP documents, and client roadmaps — fed into the agent pipeline' },
      ],
      connectors: [
        {
          name: 'CRM Pipeline Connector',
          description: 'Bidirectional sync with Salesforce or HubSpot — pulls opportunity data in, pushes qualification scores and proposal metadata back.',
        },
        {
          name: 'Brand Profile Engine',
          description: 'Automated white-labeling system that applies your firm\'s visual identity to all agent outputs — proposals, POV decks, and demo materials.',
        },
      ],
    },

    proofPoints: [
      {
        id: 'proservices-proposal-acceleration',
        industryTag: 'Professional Services',
        headline: 'From a week-long proposal process to 5 hours — with one person.',
        challenge: 'A professional services team was spending a full week across 5–6 senior resources to produce each enterprise proposal. The process consumed their most experienced people, limited the number of opportunities they could pursue, and created a structural bottleneck in their pipeline.',
        solution: 'PropelEdge deployed four AI agents across the pre-sales pipeline — Opportunity Intake, POV Development, Demo Iteration, and Proposal Development. Each agent handles a full pipeline stage autonomously while the team reviews and approves at every gate.',
        outcomes: [
          'Full client proposal delivered in 5 hours (previously 1 week, 5–6 people)',
          '80%+ reduction in unbillable pre-sales hours per engagement',
          '3x more opportunities pursued with the same team size',
          '100% client requirement coverage — zero gaps, zero missed items',
          'Team now deploying across practice areas to shape deals earlier',
        ],
        scopeIndicator: 'Production deployment | 4-agent pipeline | DOC + PDF + PPT output',
      },
    ],

    marketContext: {
      headline: 'The deal coordination tax scales with every team you add. The cost is invisible — until you lose.',
      stats: [
        { stat: 'Decision-makers per enterprise deal', value: '12+', context: 'Up from 7 five years ago (Gartner). Every additional stakeholder adds coordination complexity and extends the cycle.' },
        { stat: 'Enterprise sales cycle — average', value: '6.5 months', context: 'Up from 4.9 months in 2019 and stretching longer. Enterprise program deals run 6–18 months (Highspot/Databox 2025).' },
        { stat: 'Win rate on complex enterprise deals ($100K+ ACV)', value: '15–20%', context: 'Median enterprise win rate. Four out of five pursuits generate zero return on the coordination investment (Salesmotion 2026).' },
        { stat: 'Sales rep time actually spent selling', value: '30%', context: 'The rest is admin, internal meetings, coordination, and outdated processes. The orchestration tax is invisible but massive (Everstage 2026).' },
        { stat: 'Reps who find cross-team alignment challenging', value: '82%', context: 'The coordination problem isn\'t a perception — it\'s the structural reality of how enterprise deals are pursued today (Highspot).' },
      ],
    },

    expansionPath: {
      headline: 'PropelEdge is your starting point — not your ceiling.',
      body: 'Every PropelEdge engagement opens natural pathways to the broader Tvameva solution portfolio — building the intelligence layer that powers deeper client outcomes.',
      connections: [
        { targetSAId: 'insightlens', targetSAName: 'InsightLens', trigger: 'Proposal and pipeline data from PropelEdge powers InsightLens — predictive win-rate modeling, revenue forecasting, and deal intelligence dashboards on Google Cloud Platform' },
        { targetSAId: 'engageos', targetSAName: 'EngageOS', trigger: 'PropelEdge clients with Acquia or Drupal digital platforms naturally extend into EngageOS — composable DXP architecture, AI-powered search, and personalized digital experiences' },
      ],
    },

    advisoryExtended: {
      headline: 'Ready to see PropelEdge in action?',
      body: 'We\'ll walk you through a PropelEdge demo — how our AI agents handle each pipeline stage, what the economics look like, and how it applies to your firm. 30 minutes. No commitment.',
      scopeItems: [
        'Proposal build using your industry vertical and a real prospect scenario',
        'Current deal cycle time and cross-team resource load assessment',
        'Four-agent pipeline walkthrough — Intake, POV, Demo, Proposal',
        'Institutional memory model — how PropelEdge compounds across engagements',
        'Phased activation roadmap',
      ],
    },

    seo: {
      metaTitle: 'PropelEdge — Proposal Automation Software | AI Revenue Orchestration | Tvameva',
      metaDescription: 'AI-powered proposal automation and revenue orchestration for enterprise deal teams. Coordinate solution engineering, ABM, sales, delivery, and partners with agentic AI — from first meeting to signed SOW.',
    },

    architectureDiagram: {
      layers: [
        { id: 'output', label: 'Proposal Output', description: 'DOC · PDF · PPT · White-labeled Deliverables', color: '#e8593c' },
        { id: 'pipeline', label: 'Agent Pipeline', description: 'Intake → POV → Demo → Proposal · Human Review Gates', color: '#f5a623' },
        { id: 'knowledge', label: 'Knowledge Base', description: 'Institutional Memory · Past Proposals · Competitive Intel', color: '#2ed8a3' },
        { id: 'sources', label: 'Data Sources', description: 'CRM · Web Research · Industry Analysis · Client Roadmaps', color: '#4a90d9' },
      ],
      badge: 'Agentic Pipeline',
    },

    metricsComparison: {
      title: 'The impact on your deal economics',
      oldLabel: 'Before PropelEdge',
      newLabel: 'With PropelEdge',
      metrics: [
        { label: 'Proposal cycle time', oldValue: '1–3 weeks', newValue: '5 hours', improvement: '95% faster' },
        { label: 'Senior resources per proposal', oldValue: '5–6 people', newValue: '1 person + agents', improvement: '80% fewer' },
        { label: 'Opportunities pursued per quarter', oldValue: 'Limited by capacity', newValue: '3x more', improvement: '3x capacity' },
        { label: 'Requirement coverage', oldValue: 'Often gaps', newValue: '100% coverage', improvement: 'Zero gaps' },
      ],
    },

    relationshipGraph: {
      nodes: [
        { id: 'propeledge', label: 'PropelEdge', color: '#e8593c', type: 'primary' },
        { id: 'insightlens', label: 'InsightLens', color: '#4a90d9' },
        { id: 'engageos', label: 'EngageOS', color: '#2ed8a3' },
      ],
      edges: [
        { source: 'propeledge', target: 'insightlens', label: 'Win-rate modeling and deal intelligence' },
        { source: 'propeledge', target: 'engageos', label: 'DXP for Acquia/Drupal clients' },
      ],
      centerNode: 'propeledge',
    },
  },
];

export const getSolutionBySlug = (slug: string): SolutionArea | undefined =>
  solutionAreas.find((sa) => sa.slug === slug);

export const getSolutionById = (id: string): SolutionArea | undefined =>
  solutionAreas.find((sa) => sa.id === id);

/**
 * Check if a solution area has enriched content
 * (i.e., has value drivers, proof points, pod model, etc.)
 */
export const hasEnrichedContent = (sa: SolutionArea): boolean =>
  !!(sa.valueDrivers && sa.valueDrivers.length > 0);
