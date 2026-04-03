import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { testimonials } from '@/data/content';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TestimonialCard } from '@/components/visuals/TestimonialCard';
import { SuccessMetricsVisual } from '@/components/visuals/SuccessMetricsVisual';
import { AnimatedCounter } from '@/components/common/Animations';

export const metadata: Metadata = {
  title: 'Customer Success — Enterprise AI Case Studies & Results | Tvameva',
  description: 'Real enterprise outcomes: 70% self-service adoption, 5-hour proposal delivery, 60-70% lower delivery cost. Case studies across digital experience, analytics, and revenue orchestration.',
};

const solutionSuccessStories = [
  {
    id: 'engageos',
    name: 'EngageOS',
    tagline: 'Digital Experience Modernization',
    color: 'teal',
    client: 'Global High-Tech Manufacturing Company',
    challenge: 'A publicly traded semiconductor company with a global engineering customer base needed to completely modernize its digital experience — fragmented content systems, disconnected search, limited personalization, and no self-service capabilities for marketing teams.',
    solution: 'Composable DXP on Acquia Cloud with headless Drupal 11, AI-powered parametric search via Algolia, role-based experiences for engineers, procurement, and distributors, and a content architecture designed for marketing self-service.',
    metrics: [
      { value: '70%', label: 'Self-Service Adoption', context: 'Engineers independently discover, configure, and quote products without sales intervention' },
      { value: '25%', label: 'Design-In Conversion', context: 'Increase from parametric search to sample request through frictionless experience' },
      { value: '18%', label: 'Sales Cycle Reduction', context: 'Accelerate time from initial contact to purchase order through automation' },
      { value: '40%', label: 'Lead Quality Improvement', context: 'Better MQL-to-SQL conversion through intelligent scoring and routing' },
    ],
    outcomes: [
      'Unified search across thousands of technical products, datasheets, and application notes',
      'Role-based experiences for engineers, procurement, and distributors',
      'Marketing self-service for landing pages and campaign content via Site Studio',
      'Automated content governance — draft → legal review → publish',
    ],
  },
  {
    id: 'tvameva',
    name: 'EngageOS',
    tagline: 'AI-Powered Lead Generation Engine',
    color: 'teal',
    client: 'tvameva.ai',
    challenge: 'Build and launch a complete AI-powered lead generation website in 2 days — 19 pages, CMS integration, automated testing, security scanning, visual components, and production deployment — without an agency and without a traditional dev team.',
    solution: 'The founders directed the vision. AI agents wrote the code, created the content, built the tests, published to the CMS, and deployed to production. The same AI Pod model we deliver to clients — applied to ourselves first.',
    metrics: [
      { value: '19', label: 'Routes Live', context: 'Solution pages, customer success, advisory, legal — all CMS-driven' },
      { value: '35+', label: 'Automated Tests', context: 'Desktop, mobile, performance, accessibility, security — growing with every release' },
      { value: '4', label: 'Custom AI Agents', context: '3 content creators (per solution area) + 1 CMS publisher' },
      { value: '2', label: 'Sessions to Production', context: 'Two working sessions with the AI Pod — concept to live site. The wizard in the loop was fueled by 3 single malts, 7 coffees, and 2 grilled cheese.' },
    ],
    outcomes: [
      'AI agents deployed — content creation, coding, testing, security, CMS publishing, solution architecture',
      'Full CMS-driven content via headless Drupal CMS with React front-end',
      'Automated test suite covering every page, integration, and deployment',
      'CMS-driven visual components — architecture diagrams, metrics comparisons, interactive infographics',
    ],
  },
  {
    id: 'insightlens',
    name: 'InsightLens',
    tagline: 'Predictive & Prescriptive Analytics',
    color: 'blue',
    client: 'Global Specialty Manufacturing Company',
    challenge: '44 manufacturing plants worldwide with approximately 2,000 cameras — all passive. Safety monitoring depended on human observers who cannot maintain consistent vigilance across thousands of camera feeds, around the clock, at every plant. Safety incidents that AI could detect in seconds were discovered in minutes or not at all.',
    solution: 'A safety intelligence platform built on the InsightLens practice — predictive and prescriptive analytics capability extended to industrial computer vision. Edge inference via NVIDIA Metropolis, cloud training on GCP Vertex AI, analytics through BigQuery and Gemini.',
    metrics: [
      { value: '2,000', label: 'Cameras Activated', context: 'Passive surveillance infrastructure converted to intelligent safety monitoring' },
      { value: '44', label: 'Plants Covered', context: 'Global deployment across all manufacturing facilities' },
      { value: 'Real-time', label: 'Incident Detection', context: 'PPE violations, hazardous events detected in seconds — not periodic audits' },
      { value: 'NLP', label: 'Conversational Safety', context: 'Leadership queries safety data in natural language with prescriptive recommendations' },
    ],
    outcomes: [
      'Conversational safety intelligence — "Show me PPE violations at Plant 12 this week"',
      'Agentic delivery model with automated model retraining and intelligent alert tuning',
      'Composable architecture — edge inference + cloud training + analytics, independently upgradeable',
      'System improves continuously after deployment through AI-driven feedback loops',
    ],
  },
  {
    id: 'propeledge',
    name: 'PropelEdge',
    tagline: 'AI-Native Proposal & Revenue Automation',
    color: 'orange',
    client: 'Professional Services Firm',
    challenge: 'Senior consultants spending 40% of their time on pre-sales activities — 10–12 people per major proposal, weeks of elapsed time, and a structural bottleneck limiting the number of opportunities the firm could pursue.',
    solution: 'Four purpose-built AI agents covering the full pre-sales pipeline — Opportunity Intake, POV Development, Demo Iteration, and Proposal Development — with human review and approval at every stage.',
    metrics: [
      { value: '90%', label: 'Fewer People Per Proposal', context: 'From 10–12 senior resources to a small team with AI agents' },
      { value: '5 hrs', label: 'Proposal Delivery', context: 'Full enterprise proposal — scope, phasing, pricing, risks — previously took 1 week' },
      { value: '3x', label: 'Pipeline Capacity', context: 'More opportunities pursued with the same team size' },
      { value: '100%', label: 'Requirement Coverage', context: 'Zero gaps, zero missed items — AI maps every client requirement to proposal scope' },
    ],
    outcomes: [
      '100% on-time RFP submission rate — zero missed deadlines',
      '35–40% reduction in overall preparation effort',
      'White-label delivery in the firm\'s brand profile — DOC, PDF, PPT',
      'Institutional memory — every deal compounds learning across the firm',
    ],
  },
];

const colorMap: Record<string, { border: string; accent: string; bg: string; leftBar: string }> = {
  teal: { border: 'border-sa-engageos/50', accent: 'text-sa-engageos', bg: 'bg-sa-engageos/5', leftBar: 'bg-sa-engageos' },
  blue: { border: 'border-sa-insightlens/50', accent: 'text-sa-insightlens', bg: 'bg-sa-insightlens/5', leftBar: 'bg-sa-insightlens' },
  amber: { border: 'border-brand-amber/50', accent: 'text-brand-amber', bg: 'bg-brand-amber/5', leftBar: 'bg-brand-amber' },
  orange: { border: 'border-sa-propeledge/50', accent: 'text-sa-propeledge', bg: 'bg-sa-propeledge/5', leftBar: 'bg-sa-propeledge' },
};

export default async function CustomerSuccessPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="absolute top-20 right-10 w-80 h-80 rounded-full border border-brand-teal/8 opacity-40" />
          <div className="relative section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="font-mono text-xs text-brand-teal uppercase tracking-widest mb-4">
                  Customer Success
                </p>
                <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                  Measured, not claimed. <span className="gradient-text">Proven in production.</span>
                </h1>
                <p className="mt-6 text-lg text-brand-gray-300 max-w-xl leading-relaxed">
                  Real outcomes from real enterprise engagements — organized by solution area.
                  Every metric ties directly to business impact because our pricing depends on it.
                </p>
              </div>
              <div className="hidden lg:block">
                <SuccessMetricsVisual />
              </div>
            </div>
          </div>
        </section>


        {/* Solution-by-solution success stories */}
        {solutionSuccessStories.map((story, idx) => {
          const colors = colorMap[story.color] || colorMap.teal;
          // Avinash (advisory) appears under first EngageOS story; Venu under PropelEdge
          const storyTestimonials = story.id === 'engageos' && idx === 0
            ? testimonials.filter((t) => t.solutionArea === 'advisory')
            : testimonials.filter((t) => t.solutionArea === story.id);

          return (
            <section
              key={story.id}
              className="py-12 first:pt-16"
            >
              <div className="section-container">
                <div className={`relative rounded-2xl border ${colors.border} bg-brand-navy-card/50 overflow-hidden`}>
                  {/* Colored left accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.leftBar}`} />

                  <div className="p-8 lg:p-10">
                    {/* Solution header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`px-4 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}>
                        <span className={`text-sm font-display font-semibold ${colors.accent}`}>{story.name}</span>
                      </div>
                      <span className="text-sm text-brand-gray-400">{story.tagline}</span>
                    </div>

                {/* Client + Challenge */}
                <div className="mb-6">
                  <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2">Client</p>
                  <p className="text-lg font-display font-semibold text-white mb-4">{story.client}</p>
                  <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2">Challenge</p>
                  <p className="text-sm text-brand-gray-300 leading-relaxed">{story.challenge}</p>
                </div>

                {storyTestimonials.length > 0 ? (
                  /* Solution+Outcomes left | Testimonial right */
                  <div className="grid lg:grid-cols-2 gap-6 mb-8 items-stretch">
                    <div className={`p-6 rounded-xl bg-brand-navy-card border ${colors.border} flex flex-col`}>
                      <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2">Solution</p>
                      <p className="text-sm text-brand-gray-300 leading-relaxed mb-4">{story.solution}</p>
                      <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2 mt-auto">Key Outcomes</p>
                      <ul className="space-y-1.5">
                        {story.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-sm text-brand-gray-300">
                            <span className={`${colors.accent} shrink-0 mt-0.5`}>→</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex">
                      <TestimonialCard testimonial={storyTestimonials[0]} className="w-full" />
                    </div>
                  </div>
                ) : (
                  /* No testimonial — Solution left | Outcomes right */
                  <div className="grid lg:grid-cols-2 gap-6 mb-8 items-stretch">
                    <div className={`p-6 rounded-xl bg-brand-navy-card border ${colors.border} flex flex-col`}>
                      <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2">Solution</p>
                      <p className="text-sm text-brand-gray-300 leading-relaxed">{story.solution}</p>
                    </div>
                    <div className={`p-6 rounded-xl bg-brand-navy-card border ${colors.border} flex flex-col`}>
                      <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-2">Key Outcomes</p>
                      <ul className="space-y-1.5">
                        {story.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2 text-sm text-brand-gray-300">
                            <span className={`${colors.accent} shrink-0 mt-0.5`}>→</span>
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                  {story.metrics.map((metric) => (
                    <div key={metric.label} className={`p-5 rounded-xl ${colors.bg} border ${colors.border} text-center flex flex-col justify-between min-h-[160px]`}>
                      <div>
                        <div className={`text-2xl font-display font-bold ${colors.accent} mb-1`}>{metric.value}</div>
                        <div className="text-sm font-display font-medium text-white mb-1">{metric.label}</div>
                      </div>
                      <div className="text-xs text-brand-gray-400 leading-relaxed">{metric.context}</div>
                    </div>
                  ))}
                </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              See what these results could look like for your organization
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              Every engagement starts with understanding where you are and where the highest-value outcomes are.
            </p>
            <Link href="/contact" className="btn-primary text-base px-8 py-4 inline-flex items-center">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
