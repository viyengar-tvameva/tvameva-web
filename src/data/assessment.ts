export interface AssessmentQuestion {
  id: string;
  dimension: AssessmentDimension;
  question: string;
  options: { label: string; value: number; description: string }[];
}

export type AssessmentDimension =
  | 'strategy'
  | 'data'
  | 'technology'
  | 'people'
  | 'process';

export interface DimensionMeta {
  id: AssessmentDimension;
  label: string;
  description: string;
  icon: string;
}

export const dimensions: DimensionMeta[] = [
  {
    id: 'strategy',
    label: 'Strategy & Leadership',
    description: 'AI vision, executive sponsorship, and budget allocation',
    icon: 'Compass',
  },
  {
    id: 'data',
    label: 'Data Readiness',
    description: 'Data quality, integration, and governance',
    icon: 'Database',
  },
  {
    id: 'technology',
    label: 'Technology Stack',
    description: 'Platform modernity, AI tooling, and cloud adoption',
    icon: 'Server',
  },
  {
    id: 'people',
    label: 'People & Skills',
    description: 'AI literacy, specialist talent, and training investment',
    icon: 'Users',
  },
  {
    id: 'process',
    label: 'Process & Operations',
    description: 'Automation maturity, delivery model, and measurement',
    icon: 'Settings',
  },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  // Strategy & Leadership
  {
    id: 's1',
    dimension: 'strategy',
    question: 'How would you describe your organization\'s AI strategy?',
    options: [
      { label: 'No formal strategy', value: 1, description: 'AI is not part of our strategic planning' },
      { label: 'Exploring', value: 2, description: 'We\'re investigating AI use cases but haven\'t committed resources' },
      { label: 'Defined', value: 3, description: 'We have a documented AI strategy with identified use cases and budget' },
      { label: 'Integrated', value: 4, description: 'AI is embedded in our business strategy with executive sponsorship and KPIs' },
    ],
  },
  {
    id: 's2',
    dimension: 'strategy',
    question: 'What level of executive sponsorship exists for AI initiatives?',
    options: [
      { label: 'None', value: 1, description: 'No executive champion for AI' },
      { label: 'Interest only', value: 2, description: 'Leadership is curious but hasn\'t allocated dedicated resources' },
      { label: 'Active sponsor', value: 3, description: 'A C-level executive owns AI outcomes with dedicated budget' },
      { label: 'Board-level priority', value: 4, description: 'AI transformation is a board-level initiative with cross-functional governance' },
    ],
  },
  {
    id: 's3',
    dimension: 'strategy',
    question: 'How is your AI budget structured?',
    options: [
      { label: 'No dedicated budget', value: 1, description: 'AI spending comes from ad-hoc project budgets' },
      { label: 'Pilot funding', value: 2, description: 'Small budget allocated for proof-of-concept projects' },
      { label: 'Operational budget', value: 3, description: 'Recurring budget for AI initiatives tied to specific business outcomes' },
      { label: 'Strategic investment', value: 4, description: 'Multi-year AI investment plan with outcome-based ROI tracking' },
    ],
  },
  // Data Readiness
  {
    id: 'd1',
    dimension: 'data',
    question: 'How would you rate your organization\'s data quality?',
    options: [
      { label: 'Poor', value: 1, description: 'Data is fragmented, inconsistent, and mostly in silos' },
      { label: 'Basic', value: 2, description: 'Some data standardization exists but gaps are significant' },
      { label: 'Good', value: 3, description: 'Data is mostly clean, documented, and accessible across teams' },
      { label: 'Excellent', value: 4, description: 'Enterprise data governance with automated quality monitoring and cross-system integration' },
    ],
  },
  {
    id: 'd2',
    dimension: 'data',
    question: 'How integrated are your data systems across the enterprise?',
    options: [
      { label: 'Isolated', value: 1, description: 'Systems don\'t talk to each other; manual data transfers are common' },
      { label: 'Partially connected', value: 2, description: 'Some integrations exist but data flows are fragile or manual' },
      { label: 'Well integrated', value: 3, description: 'Key systems are connected with reliable data pipelines' },
      { label: 'Unified platform', value: 4, description: 'Enterprise data platform with real-time integration across all major systems' },
    ],
  },
  {
    id: 'd3',
    dimension: 'data',
    question: 'Do you have a data governance framework in place?',
    options: [
      { label: 'No governance', value: 1, description: 'No formal data governance policies or processes' },
      { label: 'Informal', value: 2, description: 'Some teams follow data practices, but nothing is standardized' },
      { label: 'Formal framework', value: 3, description: 'Documented governance policies with data stewards and access controls' },
      { label: 'Mature governance', value: 4, description: 'Automated compliance monitoring, lineage tracking, and continuous data quality validation' },
    ],
  },
  // Technology Stack
  {
    id: 't1',
    dimension: 'technology',
    question: 'What is the state of your cloud infrastructure?',
    options: [
      { label: 'On-premises', value: 1, description: 'Primarily on-premises infrastructure with limited cloud adoption' },
      { label: 'Hybrid', value: 2, description: 'Some workloads in cloud but core systems remain on-premises' },
      { label: 'Cloud-first', value: 3, description: 'Most workloads run in cloud with modern infrastructure practices' },
      { label: 'Cloud-native', value: 4, description: 'Fully cloud-native with containerized workloads, IaC, and auto-scaling' },
    ],
  },
  {
    id: 't2',
    dimension: 'technology',
    question: 'How current are your core enterprise platforms?',
    options: [
      { label: 'Legacy', value: 1, description: 'Running end-of-life or unsupported platform versions' },
      { label: 'Stable but aging', value: 2, description: 'Supported versions but 2+ generations behind current releases' },
      { label: 'Current', value: 3, description: 'Running recent versions with planned upgrade cycles' },
      { label: 'Leading edge', value: 4, description: 'On latest platform versions with early access to AI-native features' },
    ],
  },
  {
    id: 't3',
    dimension: 'technology',
    question: 'What AI tooling exists in your technology stack?',
    options: [
      { label: 'None', value: 1, description: 'No AI tools or platforms in our stack' },
      { label: 'Experimenting', value: 2, description: 'Using basic AI features built into existing tools (e.g., Copilot, Einstein)' },
      { label: 'Deployed', value: 3, description: 'AI platforms deployed for specific use cases with monitoring in place' },
      { label: 'AI-native', value: 4, description: 'AI agents and models integrated across workflows with continuous learning and optimization' },
    ],
  },
  // People & Skills
  {
    id: 'p1',
    dimension: 'people',
    question: 'What is the AI literacy level across your organization?',
    options: [
      { label: 'Minimal', value: 1, description: 'Most employees have limited understanding of AI capabilities' },
      { label: 'Awareness', value: 2, description: 'Leadership understands AI potential; teams have basic awareness' },
      { label: 'Competent', value: 3, description: 'Key teams are trained in AI tools and workflows; champions exist across functions' },
      { label: 'Fluent', value: 4, description: 'Organization-wide AI literacy with continuous training and upskilling programs' },
    ],
  },
  {
    id: 'p2',
    dimension: 'people',
    question: 'Do you have dedicated AI/ML specialists on staff?',
    options: [
      { label: 'None', value: 1, description: 'No dedicated AI talent; relying on external vendors' },
      { label: 'Small team', value: 2, description: '1–3 specialists, often pulled into other projects' },
      { label: 'Dedicated team', value: 3, description: 'Established AI team with clear roles and roadmap' },
      { label: 'Center of Excellence', value: 4, description: 'AI CoE with embedded specialists across business units' },
    ],
  },
  {
    id: 'p3',
    dimension: 'people',
    question: 'How does your organization approach AI talent development?',
    options: [
      { label: 'No investment', value: 1, description: 'No formal AI training or upskilling programs' },
      { label: 'Ad hoc', value: 2, description: 'Occasional workshops or conferences; no structured program' },
      { label: 'Structured program', value: 3, description: 'Formal training paths with certifications and hands-on labs' },
      { label: 'Continuous learning', value: 4, description: 'Embedded learning culture with AI apprenticeships, hackathons, and knowledge sharing' },
    ],
  },
  // Process & Operations
  {
    id: 'o1',
    dimension: 'process',
    question: 'What is your current level of workflow automation?',
    options: [
      { label: 'Manual', value: 1, description: 'Most processes are manual with minimal automation' },
      { label: 'Basic automation', value: 2, description: 'Some RPA and scripted automations for repetitive tasks' },
      { label: 'Intelligent automation', value: 3, description: 'AI-assisted automation across key workflows with exception handling' },
      { label: 'Autonomous operations', value: 4, description: 'AI agents handle end-to-end processes with human oversight on exceptions only' },
    ],
  },
  {
    id: 'o2',
    dimension: 'process',
    question: 'How do you measure the success of technology investments?',
    options: [
      { label: 'Not measured', value: 1, description: 'No formal measurement of technology ROI' },
      { label: 'Activity metrics', value: 2, description: 'Track usage and uptime but not business outcomes' },
      { label: 'Outcome metrics', value: 3, description: 'Track business KPIs tied to technology investments' },
      { label: 'Continuous optimization', value: 4, description: 'Real-time outcome dashboards with AI-driven optimization recommendations' },
    ],
  },
  {
    id: 'o3',
    dimension: 'process',
    question: 'How does your organization approach technology delivery?',
    options: [
      { label: 'Waterfall', value: 1, description: 'Traditional project-based delivery with long cycles' },
      { label: 'Agile basics', value: 2, description: 'Sprints and standups but still largely output-focused' },
      { label: 'Outcome-driven', value: 3, description: 'Cross-functional pods focused on measurable business outcomes' },
      { label: 'AI-augmented delivery', value: 4, description: 'AI-enabled delivery teams using code generation, automated QA, and intelligent agents' },
    ],
  },
];

export interface MaturityLevel {
  id: string;
  label: string;
  range: [number, number];
  description: string;
  color: string;
}

export const maturityLevels: MaturityLevel[] = [
  {
    id: 'foundational',
    label: 'Foundational',
    range: [15, 25],
    description: 'Your organization is at the beginning of its AI journey. The opportunity is significant—the right foundation and partnership can accelerate your path dramatically.',
    color: '#e8593c',
  },
  {
    id: 'developing',
    label: 'Developing',
    range: [26, 35],
    description: 'You\'ve started building AI capabilities but significant gaps remain. Focused investment in the right areas can unlock rapid progress.',
    color: '#f5a623',
  },
  {
    id: 'advancing',
    label: 'Advancing',
    range: [36, 45],
    description: 'Strong AI foundations are in place. The next step is scaling proven capabilities and connecting them across the enterprise.',
    color: '#2ed8a3',
  },
  {
    id: 'leading',
    label: 'Leading',
    range: [46, 60],
    description: 'Your organization is at the forefront of AI adoption. Optimization and expansion across solution areas will compound your advantage.',
    color: '#4a90d9',
  },
];

export const getMaturityLevel = (score: number): MaturityLevel =>
  maturityLevels.find((l) => score >= l.range[0] && score <= l.range[1]) || maturityLevels[0];
