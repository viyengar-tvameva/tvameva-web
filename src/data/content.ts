export interface Differentiator {
  id: string;
  priority: number;
  title: string;
  whatWeSay: string;
  whatBuyerHears: string;
  icon: string;
}

export const differentiators: Differentiator[] = [
  {
    id: 'pods',
    priority: 1,
    title: 'AI-enabled pods',
    whatWeSay: 'Dedicated teams of 5–7 specialists augmented by AI code generation, automated QA, and intelligent agents.',
    whatBuyerHears: 'I get a focused team, not a body shop. AI does the volume work; humans govern quality.',
    icon: 'Users',
  },
  {
    id: 'pricing',
    priority: 2,
    title: 'Outcome-based pricing',
    whatWeSay: 'You pay for resolution rates, conversion uplift, pipeline SLA—not for hours or headcount.',
    whatBuyerHears: 'My budget is tied to results. If they don\'t deliver, they don\'t get paid.',
    icon: 'Target',
  },
  {
    id: 'depth',
    priority: 3,
    title: 'Partner-anchored depth',
    whatWeSay: 'Each solution area is built on a specific platform ecosystem—Acquia, GCP, Salesforce, Algolia, Threekit.',
    whatBuyerHears: 'They aren\'t generalists. They go deep on the stack I already run.',
    icon: 'Layers',
  },
  {
    id: 'ip',
    priority: 4,
    title: 'Reusable accelerator IP',
    whatWeSay: 'Pre-built connectors and plug-ins eliminate weeks of custom integration. Build once, deploy repeatedly.',
    whatBuyerHears: 'They have ready-made integrations. This isn\'t a greenfield build—it\'s faster and cheaper.',
    icon: 'Zap',
  },
];

export interface ProofPoint {
  id: string;
  stat: string;
  label: string;
  context: string;
}

export const proofPoints: ProofPoint[] = [
  {
    id: 'cost-reduction',
    stat: '67%',
    label: 'Cost reduction',
    context: 'On a 47-FTE enterprise engagement, reduced to a 16-specialist pod at the same SLA.',
  },
  {
    id: 'ai-resolution',
    stat: '85–90%',
    label: 'AI self-resolution rate',
    context: 'Target resolution rate on enterprise app support engagements.',
  },
  {
    id: 'time-saved',
    stat: '6–8 weeks',
    label: 'Eliminated per deployment',
    context: 'With pre-built connector IP replacing custom integration builds.',
  },
  {
    id: 'qa-reduction',
    stat: '40–60%',
    label: 'QA cost reduction',
    context: 'Through AI-generated test suites replacing manual QA scripting.',
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  vertical: string;
  companySize: string;
  challenge: string;
  result: string;
  metrics: { label: string; value: string }[];
  solutionAreas: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fortune-500-isv',
    title: 'Fortune 500 ISV — Enterprise App Support Transformation',
    vertical: 'ISV / Hi-Tech',
    companySize: 'Fortune 500',
    challenge: 'A 47-person support operation running Salesforce, Oracle, and Workday with rising costs and stagnant resolution rates.',
    result: 'Deployed AI agents with a 16-specialist pod, achieving the same SLA at 67% lower cost.',
    metrics: [
      { label: 'FTE reduction', value: '47 → 16' },
      { label: 'Cost reduction', value: '67%' },
      { label: 'Annual savings', value: '$4M' },
      { label: 'SLA maintained', value: '100%' },
    ],
    solutionAreas: ['resolveiq'],
  },
  {
    id: 'enterprise-dxp',
    title: 'Enterprise Digital Platform — DXP Modernization',
    vertical: 'Hi-Tech',
    companySize: 'Enterprise',
    challenge: 'Complex Drupal estate requiring Acquia migration with integrated search capabilities.',
    result: 'Acquia-Algolia connector IP eliminated approximately 8 weeks of custom build time.',
    metrics: [
      { label: 'Build time eliminated', value: '~8 weeks' },
      { label: 'Connector deployment', value: 'Production-ready' },
      { label: 'Margin improvement', value: 'Without scope change' },
    ],
    solutionAreas: ['engageos', 'searchcore'],
  },
];

export interface PodRole {
  title: string;
  responsibility: string;
  aiAugmentation: string;
  icon: string;
}

export const podRoles: PodRole[] = [
  {
    title: 'Product Manager / Owner',
    responsibility: 'Solution roadmap, client outcomes, backlog prioritization',
    aiAugmentation: 'AI-assisted sprint planning, release forecasting, risk flagging',
    icon: 'Compass',
  },
  {
    title: 'Finance Analyst',
    responsibility: 'Outcome-based pricing, value realization tracking, margin management',
    aiAugmentation: 'AI-generated cost models, ROI dashboards, benchmark comparisons',
    icon: 'DollarSign',
  },
  {
    title: 'Technical Program Manager',
    responsibility: 'Delivery governance, milestones, escalation management',
    aiAugmentation: 'AI project status synthesis, automated reporting, dependency mapping',
    icon: 'ClipboardList',
  },
  {
    title: 'Solution Architect',
    responsibility: 'Platform architecture, integration design, technical oversight',
    aiAugmentation: 'Claude Code for design validation, AI-assisted architecture review',
    icon: 'Network',
  },
  {
    title: 'Engineers (1–2)',
    responsibility: 'Review and validate AI-generated outputs; own complex integrations',
    aiAugmentation: 'Claude Code + Automated QA as the primary development layer',
    icon: 'Code2',
  },
  {
    title: 'Customer Success Lead',
    responsibility: 'Adoption, expansion, relationship health, renewal readiness',
    aiAugmentation: 'AI-powered usage analytics, churn signal detection, expansion triggers',
    icon: 'HeartHandshake',
  },
];
