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
    platformAnchor: 'Acquia / Drupal',
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
      { stat: 'US enterprises on Drupal', value: '67%' },
      { stat: 'Global Drupal services market by 2030', value: '$5.12B' },
      { stat: 'Market CAGR', value: '9.38%' },
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

    heroSubheadline: 'EngageOS modernizes enterprise digital experience platforms on Acquia and Drupal — with AI-powered search and discovery, hyper-personalization, visual commerce, and omnichannel delivery. You pay for engagement uplift, conversion improvement, and time-to-market acceleration — not developer hours.',

    heroCTAs: [
      { label: 'Schedule a DXP Readiness Assessment', href: '/advisory', variant: 'primary' },
      { label: 'See how our pod model works', href: '/how-we-deliver', variant: 'secondary' },
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
        body: 'Your customers search before they buy — but most enterprise search is still keyword-matching against flat catalogs. EngageOS implements AI-powered search and discovery through Algolia, connecting your content management system, product information, and customer data into a unified search index. The result: search that understands intent, surfaces the right product for the right buyer, and learns from every interaction.\n\nFor technical buyers — engineers searching by specifications, frequency ranges, or compliance standards — this means parametric search with faceted navigation that speaks their language. For marketing and procurement buyers, it means discovery experiences that guide them from awareness to evaluation to configuration without friction.',
        outcomeMetrics: [
          'Search conversion rate uplift',
          'Time-to-product reduction',
          'Search-to-configuration completion rate',
        ],
        proofPoint: 'A global hi-tech semiconductor company rebuilt its entire product discovery experience around AI-powered search — connecting thousands of technical products, datasheets, application notes, and cross-reference tools into a unified search index. Engineers can now filter by precise technical parameters and arrive at the right product in seconds, not minutes.',
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
        body: 'Generic web experiences convert at generic rates. EngageOS activates the personalization capabilities built into the Acquia DXP ecosystem — Customer Data Platform for cross-channel identity resolution, Acquia Personalization for real-time content targeting, and AI-driven recommendation engines that learn from behavioral and firmographic signals.\n\nFor B2B enterprises, this means role-based content experiences: an engineer sees technical specifications, datasheets, and application notes; a procurement buyer sees pricing, compliance documentation, and distributor availability; a marketing visitor sees brand stories, case studies, and demo CTAs.\n\nFor B2C brands, this means journey-stage personalization: first-time visitors see brand introduction and product exploration; returning visitors see their previously viewed configurations and relevant promotions; dealer-referred visitors see localized inventory and financing options.',
        outcomeMetrics: [
          'Personalized content engagement rate vs. generic',
          'Lead scoring accuracy improvement',
          'Return visitor conversion uplift',
        ],
        proofPoint: 'A semiconductor company serving a global engineering audience is building role-based customer journeys — with engineers, procurement teams, and distributor partners each receiving tailored content paths, AI-driven search results, and contextual navigation. The approach connects CMS content, CRM data, and intent signals into a unified personalization layer.',
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
        proofPoint: 'Both reference engagements — the semiconductor platform and the multi-brand manufacturer — architect lead capture, progressive profiling, and CRM integration as foundational infrastructure. The semiconductor engagement integrates Marketo, Salesforce, and 6sense into a unified lead management system with automated routing and lifecycle tracking.',
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
      headline: 'A dedicated team — augmented by AI — that delivers outcomes, not timesheets.',
      body: 'Every EngageOS engagement is delivered by a dedicated pod of 5–7 specialists. Not a rotating bench of contractors. Not a pyramid of junior developers supervised by one senior architect. A stable, cross-functional team that owns your outcomes from assessment through go-live and into continuous optimization.\n\nThe pod combines platform expertise (Acquia, Drupal, Algolia, Threekit integration), frontend engineering (React/Next.js, design systems, headless architecture), and customer success management — all augmented by AI agents that handle the volume work.',
      roles: [
        'Pod Lead / Customer Success',
        'Solution Architect (Acquia/Drupal)',
        'Frontend Engineer (React/Next.js)',
        'Search & Integration Engineer (Algolia)',
        'QA & DevOps Engineer',
      ],
      aiAgentTypes: [
        {
          name: 'Implementation Agents',
          description: 'Accelerate configuration, code generation, automated testing, and deployment. A pod of 7 delivers what traditionally required a team 40–60% larger.',
        },
        {
          name: 'Operational Agents',
          description: 'Run continuously after go-live: content migration bots, automated QA and regression testing, search relevance optimization, and performance monitoring.',
        },
        {
          name: 'Value Realization Dashboards',
          description: 'Activated from day one — collecting baseline data and reporting against the KPIs your outcome-based pricing is tied to. You see the impact in real time.',
        },
      ],
    },

    techStack: {
      headline: 'Built on the platforms you already run — connected by IP we\'ve already proven.',
      body: 'EngageOS isn\'t a proprietary platform. It\'s a composable architecture built on best-of-breed platforms — each selected because they lead their category and are already present in enterprise environments we serve.',
      layers: [
        { layer: 'Content & CMS', platform: 'Acquia Cloud (Drupal 11)', role: 'Headless content management, multisite, DAM, CDP, content personalization' },
        { layer: 'Frontend', platform: 'React / Next.js', role: 'Decoupled frontend, SSR for SEO, design system, component library' },
        { layer: 'Search & Discovery', platform: 'Algolia NeuralSearch', role: 'AI-powered search, parametric filtering, personalized ranking, analytics' },
        { layer: 'Visual Commerce', platform: 'Threekit', role: '3D product configuration, AR visualization, CPQ integration' },
        { layer: 'Integration', platform: 'Boomi iPaaS / Custom API', role: 'Connecting CMS, CRM, ERP, and commerce systems' },
        { layer: 'Intelligence', platform: 'GA4/GTM, Acquia CDP, New Relic', role: 'Analytics, customer data, performance monitoring' },
        { layer: 'Marketing Automation', platform: 'HubSpot / Marketo', role: 'Lead capture, nurture, scoring, CRM sync' },
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
          'Role-based experiences for engineers, procurement, and distributors',
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
      headline: 'The market is moving toward composable. The question is how fast you move with it.',
      stats: [
        { stat: 'US enterprises on Drupal', value: '67%', context: 'The installed base is massive — and much of it needs modernization' },
        { stat: 'Drupal services market by 2030', value: '$5.12B', context: '9.38% CAGR, North America is 39% of global market' },
        { stat: 'Annual searches via Algolia', value: '1.75T', context: 'Search and discovery is mission-critical infrastructure' },
        { stat: 'Search market YoY growth', value: '28.9%', context: 'AI-powered search is accelerating, not plateauing' },
        { stat: 'B2B leaders fully AI-operational in search', value: '41%', context: 'Massive greenfield opportunity for enterprises ready to move' },
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
      headline: 'Not sure where to start?',
      body: 'Our DXP Readiness Assessment maps your current digital experience platform — CMS architecture, content model, search capability, integration landscape, and personalization maturity — and builds a phased modernization roadmap your leadership team can act on. In 2–3 weeks, not 2–3 months.',
      scopeItems: [
        'Current CMS and content architecture audit',
        'Search and discovery capability gap analysis',
        'Integration landscape mapping (CRM, ERP, marketing automation, analytics)',
        'Personalization maturity evaluation',
        'Composable architecture readiness score',
        'Phased roadmap with prioritized workstreams and investment estimates',
      ],
      pricingNote: 'Assessment engagements are typically scoped at $25,000–$50,000 and delivered in 2–4 weeks.',
    },

    seo: {
      metaTitle: 'EngageOS — AI-Powered Digital Experience Modernization | Tvameva',
      metaDescription: 'Modernize your enterprise digital experience platform on Acquia and Drupal — with AI-powered search, hyper-personalization, visual commerce, and outcome-based pricing.',
    },
  },

  // =========================================================================
  // Other 4 SAs — unchanged from current data
  // =========================================================================

  {
    id: 'insightlens',
    name: 'InsightLens',
    slug: 'insightlens',
    tagline: 'Predictive & Prescriptive Analytics',
    headline: 'Turn your data infrastructure into a decision engine — with predictive models that earn their keep.',
    platformAnchor: 'Google Cloud Platform',
    platformPartners: ['BigQuery', 'Vertex AI', 'Looker'],
    valueProp: 'InsightLens builds and operates predictive and prescriptive analytics on Google Cloud — from pipeline architecture through ML model deployment to executive dashboards. Our dedicated pod handles BigQuery optimization, Vertex AI notebook development, and Looker visualization — with AI-assisted pipeline scripting and continuous data quality validation. You pay for pipeline reliability SLA, dashboard adoption rate, and time-to-insight reduction.',
    keyIP: {
      name: 'GCP-Salesforce Data Bridge',
      description: 'Pre-built lakehouse templates and Vertex AI pipeline scaffolding.',
    },
    outcomeMetrics: [
      'Pipeline reliability SLA',
      'Dashboard adoption rate',
      'Time-to-insight reduction',
    ],
    pricingContrast: {
      paysFor: 'Pipeline SLA + dashboard adoption',
      notFor: 'Data engineers on the clock',
    },
    marketStats: [
      { stat: 'GCP customers in North America', value: '497K' },
      { stat: 'Enterprises using Gemini AI tools', value: '85,000+' },
      { stat: 'GCP revenue growth (YoY)', value: '34%' },
    ],
    expansionSA: {
      id: 'resolveiq',
      description: 'Analytics data layer powers ResolveIQ agent decisions — intelligent enterprise app support built on real-time data.',
    },
    advisory: {
      name: 'Data & AI Readiness Assessment',
      description: 'Evaluates your current analytics maturity, identifies quick wins on GCP, and builds a 90-day activation roadmap.',
      cta: 'Start your data assessment',
    },
    capabilities: [
      'GCP pipeline scripts & dbt models',
      'Vertex AI ML notebook development',
      'Data quality validation & ML model drift detection',
      'Pipeline SLA testing & monitoring',
      'GCP-Salesforce data bridge & ingestion plugins',
    ],
    color: 'blue',
    icon: 'BarChart3',
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
