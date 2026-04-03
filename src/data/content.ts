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
    id: 'intelligence',
    priority: 1,
    title: 'Intelligence layer — our moat',
    whatWeSay: 'We add our agentic intelligence on top of the enterprise platforms you already run — the differentiated capability that creates outcomes your current stack can\'t.',
    whatBuyerHears: 'They don\'t replace my platforms. They make them dramatically more valuable.',
    icon: 'Layers',
  },
  {
    id: 'focus',
    priority: 2,
    title: 'Depth over breadth — by design',
    whatWeSay: 'Three solutions. Decision intelligence. Digital experience. Revenue orchestration. We chose where to go impossibly deep — and had the discipline to say no to everything else.',
    whatBuyerHears: 'They don\'t chase every trend. They picked their battles and mastered them.',
    icon: 'Target',
  },
  {
    id: 'execution',
    priority: 3,
    title: 'Dedicated pods — more AI, fewer humans',
    whatWeSay: '7–8 AI agents handle engineering, testing, security, content, and deployment. 2–3 human wizards lead, govern quality, and own client outcomes. The humans are in charge. The AI is the workforce.',
    whatBuyerHears: 'A small team of exceptional humans leading a workforce of AI agents. Better outcomes at a fraction of the cost.',
    icon: 'Users',
  },
  {
    id: 'ip',
    priority: 4,
    title: 'Reusable assets and accelerators',
    whatWeSay: 'Pre-built connectors, agentic pipeline templates, test suites, and institutional memory that eliminates weeks of build — and gets smarter with every engagement.',
    whatBuyerHears: 'They\'ve done this before. The system learns. Every deployment is faster than the last.',
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
    id: 'time-saved',
    stat: '6–8 weeks',
    label: 'Eliminated per deployment',
    context: 'With pre-built connector IP replacing custom integration builds on enterprise DXP programs.',
  },
  {
    id: 'proposal-speed',
    stat: '5 hours',
    label: 'Full proposal delivery',
    context: 'What previously took 1 week and 5–6 senior resources — with PropelEdge AI agents.',
  },
  {
    id: 'cost-reduction',
    stat: '60–70%',
    label: 'Lower delivery cost',
    context: 'AI Pod model vs. traditional SI delivery on equivalent-scope enterprise programs.',
  },
  {
    id: 'pipeline-multiplier',
    stat: '3x',
    label: 'More opportunities pursued',
    context: 'With the same team size — AI agents handle the volume, humans govern quality.',
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
    solutionAreas: ['engageos'],
  },
];

export interface PodRole {
  title: string;
  responsibility: string;
  aiAugmentation: string;
  icon: string;
  type: 'agent' | 'human';
}

export const podRoles: PodRole[] = [
  // AI Agents — the primary workforce
  {
    title: 'Product Strategy Agent',
    responsibility: 'Backlog prioritization, sprint planning, release forecasting, risk detection, dependency mapping',
    aiAugmentation: 'Continuously analyzes client outcomes, market signals, and delivery velocity to optimize the roadmap',
    icon: 'Compass',
    type: 'agent',
  },
  {
    title: 'Solution Architecture Agent',
    responsibility: 'Platform design, integration architecture, design validation, technical documentation',
    aiAugmentation: 'Evaluates architecture decisions against patterns, generates integration specs, validates designs before human review',
    icon: 'Network',
    type: 'agent',
  },
  {
    title: 'Engineering Agent',
    responsibility: 'Code generation, implementation, automated testing, CI/CD pipeline management, deployment',
    aiAugmentation: 'Writes production code, generates test suites, handles migrations, manages build pipelines — the primary development layer',
    icon: 'Code2',
    type: 'agent',
  },
  {
    title: 'QA & Validation Agent',
    responsibility: 'Automated regression testing, performance testing, accessibility audits, security scanning',
    aiAugmentation: 'Runs continuous validation against every change — smoke tests, Web Vitals, Lighthouse scores, cross-browser compatibility',
    icon: 'Shield',
    type: 'agent',
  },
  {
    title: 'Program Management Agent',
    responsibility: 'Delivery tracking, status synthesis, milestone monitoring, escalation detection, automated reporting',
    aiAugmentation: 'Generates real-time delivery dashboards, flags risks before they become blockers, produces stakeholder updates',
    icon: 'ClipboardList',
    type: 'agent',
  },
  {
    title: 'Content & Publishing Agent',
    responsibility: 'Content creation, CMS publishing, brand consistency enforcement, guardrail compliance',
    aiAugmentation: 'Drafts solution content, publishes to Drupal CMS, validates against brand voice and content guardrails',
    icon: 'FileText',
    type: 'agent',
  },
  {
    title: 'Security & Compliance Agent',
    responsibility: 'Continuous vulnerability scanning, dependency auditing, OWASP compliance, secrets detection, supply chain security, penetration testing automation',
    aiAugmentation: 'Monitors every code change for security vulnerabilities, audits dependencies against CVE databases, enforces security policies, scans for exposed secrets, and validates compliance posture — continuously, not quarterly',
    icon: 'ShieldCheck',
    type: 'agent',
  },
  // Human governance layer
  {
    title: 'Customer Success Lead',
    responsibility: 'Client relationship, outcome alignment, strategic guidance, escalation resolution, expansion planning',
    aiAugmentation: 'Governs agent outputs, approves critical decisions, owns client communication and trust',
    icon: 'HeartHandshake',
    type: 'human',
  },
  {
    title: 'Customer Success Engineer',
    responsibility: 'Architecture sign-off, complex integration decisions, production deployment approval, quality governance',
    aiAugmentation: 'Reviews agent-generated code and architecture for edge cases, security, and strategic alignment',
    icon: 'Eye',
    type: 'human',
  },
];

// --- Testimonials ---

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  photo?: string;
  quote: string;
  highlights: string[];
  solutionArea: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'avinash-thakur-advisory',
    name: 'Avinash Thakur',
    title: 'Enterprise AI Data & Cloud Sales Leader, AWS & GCP Certified AI/ML Expert',
    quote: 'I\'ve had the pleasure of working closely with Varada at LTTS, where he has been instrumental in driving high-impact digital transformation solutions for our strategic customers. He possesses a rare combination of deep technical knowledge, nuanced expertise in enterprise transformations, and sharp business acumen. He doesn\'t just know the how — he knows the why behind every move. Whether advising on strategic do\'s and don\'ts or architecting a complex solution, he consistently adds value that wins both trust and business.',
    highlights: [],
    solutionArea: 'advisory',
  },
  {
    id: 'venugopal-arcot-propeledge',
    name: 'Venugopal Arcot',
    title: 'Board Member, Strategic Advisor, Keynote Speaker',
    photo: '/testimonials/ve-headshot.jpg',
    quote: 'We used to throw 10–12 people at every major proposal — senior consultants pulled off billable work for weeks. With Tvameva\'s agentic AI approach, a small team with the AI pipeline produces a better proposal in a fraction of the time. We went from scrambling on every RFP to never missing a deadline — not once. 35–40% less prep effort, higher win rates, and our senior people are back on client work where they belong. We\'re scaling it across all our practice areas now.',
    highlights: [],
    solutionArea: 'propeledge',
  },
];
