export interface SolutionArea {
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
}

export const solutionAreas: SolutionArea[] = [
  {
    id: 'engageos',
    name: 'EngageOS',
    slug: 'engageos',
    tagline: 'Digital Experience Modernization',
    headline: 'Modernize your digital experience platform—faster, leaner, measured by engagement.',
    platformAnchor: 'Acquia / Drupal',
    platformPartners: ['Acquia', 'Drupal'],
    valueProp: 'EngageOS migrates and modernizes enterprise Drupal estates through a dedicated AI-enabled pod. Our team handles headless CMS architecture, content API layers, and Acquia platform optimization—with AI code generation accelerating module development and automated QA ensuring continuous regression coverage. You pay for migration milestones, traffic uplift, and time-to-publish reduction—not developer hours.',
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
      description: 'Every Acquia client is a natural SearchCore upsell—connected search and discovery built on top of modernized content.',
    },
    advisory: {
      name: 'DXP Readiness Assessment',
      description: 'Maps your current Drupal estate, identifies migration priorities, and builds a phased modernization roadmap—in 2–3 weeks.',
      cta: 'Start your DXP assessment',
    },
    capabilities: [
      'Drupal module development & Acquia hook customization',
      'Headless CMS API layer architecture',
      'CMS workflow regression & content API validation',
      'Acquia migration testing & go-live',
      'Acquia-Algolia Data Connector deployment',
    ],
    color: 'teal',
    icon: 'Layout',
  },
  {
    id: 'insightlens',
    name: 'InsightLens',
    slug: 'insightlens',
    tagline: 'Predictive & Prescriptive Analytics',
    headline: 'Turn your data infrastructure into a decision engine—with predictive models that earn their keep.',
    platformAnchor: 'Google Cloud Platform',
    platformPartners: ['BigQuery', 'Vertex AI', 'Looker'],
    valueProp: 'InsightLens builds and operates predictive and prescriptive analytics on Google Cloud—from pipeline architecture through ML model deployment to executive dashboards. Our dedicated pod handles BigQuery optimization, Vertex AI notebook development, and Looker visualization—with AI-assisted pipeline scripting and continuous data quality validation. You pay for pipeline reliability SLA, dashboard adoption rate, and time-to-insight reduction.',
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
      description: 'Analytics data layer powers ResolveIQ agent decisions—intelligent enterprise app support built on real-time data.',
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
    headline: 'Replace your L1/L2 support cost center with an AI-first resolution engine—priced on tickets resolved, not seats filled.',
    platformAnchor: 'Salesforce Agentforce / Oracle / Workday',
    platformPartners: ['Salesforce Agentforce', 'Oracle', 'Workday'],
    valueProp: 'ResolveIQ deploys AI agents across your Salesforce, Oracle, and Workday environments to handle ticket resolution, workflow automation, and cross-system escalation. Our pod combines Agentforce flow builds, Oracle API integrations, and Workday connector code—with AI handling the volume and humans governing quality. A Fortune 500 ISV reduced a 47-person support operation to a 16-specialist pod at 67% lower cost with the same SLA.',
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
      description: 'Every ResolveIQ client needs analytics infrastructure to power agent intelligence—a natural path to InsightLens.',
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
    headline: 'Make every search a conversion opportunity—with AI-powered discovery that learns what your users want.',
    platformAnchor: 'Algolia',
    platformPartners: ['Algolia'],
    valueProp: 'SearchCore implements and optimizes Algolia-powered search and discovery across your product catalog, content library, or knowledge base. Our pod handles custom ranking configuration, indexing logic, A/B test automation, and cross-platform connector builds—connecting Algolia to Drupal, Salesforce, and Threekit. You pay for search conversion uplift, relevance score improvement, and integration go-live.',
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
      description: 'Every search client benefits from EngageOS DXP modernization—better content architecture means better search results.',
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
    headline: 'Let your customers configure, visualize, and buy complex products—without a sales call.',
    platformAnchor: 'Threekit',
    platformPartners: ['Threekit'],
    valueProp: 'VisualForge builds and deploys 3D product configurators on Threekit that connect directly to your CPQ and commerce platforms. Our pod handles scene scripting, CPQ rule coding, 3D asset automation, and Salesforce/Oracle CPQ integration—with AI accelerating asset creation and configuration logic validation. You pay for configuration completion rate, sales cycle compression, and CPQ uptime.',
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
      description: 'Visual Commerce clients need analytics for configurator usage intelligence—a natural path to InsightLens.',
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
