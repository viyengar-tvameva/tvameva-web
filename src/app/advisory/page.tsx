import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { solutionAreas } from '@/data/solutions';
import { testimonials } from '@/data/content';
import { ArrowRight, Compass, Database, Server, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { TestimonialCard } from '@/components/visuals/TestimonialCard';
import { AdvisoryBuildingBlocks } from '@/components/visuals/AdvisoryBuildingBlocks';

const visibleSlugs = ['engageos', 'insightlens', 'propeledge'];

export const metadata: Metadata = {
  title: 'Advisory — AI Maturity Assessment & Readiness Evaluations | Tvameva',
  description: 'AI maturity assessment, DXP readiness evaluation, and data & AI readiness assessment. Clear-eyed assessment, prioritized roadmap, and actionable business case in 2-4 weeks.',
};

const assessments = [
  {
    name: 'AI Maturity Assessment',
    scope: 'Cross-functional evaluation of AI readiness across people, process, and technology. Benchmarked against industry peers.',
    appearsOn: 'Homepage, About',
    href: '/advisory/ai-maturity',
    featured: true,
  },
  {
    name: 'Pod Readiness Evaluation',
    scope: 'Evaluates whether your organization is ready to shift from traditional delivery to AI-enabled pod model. Includes talent gap analysis.',
    appearsOn: 'How We Deliver',
    href: '/advisory',
    featured: false,
  },
  ...solutionAreas.filter((sa) => visibleSlugs.includes(sa.slug)).map((sa) => ({
    name: sa.advisory.name,
    scope: sa.advisory.description,
    appearsOn: `${sa.name} solution page`,
    href: `/advisory`,
    featured: false,
    sa: sa.name,
    platform: sa.platformAnchor,
  })),
];

export default function AdvisoryPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-amber/5 rounded-full blur-[120px]" />
          <div className="relative section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="font-mono text-xs text-brand-amber uppercase tracking-widest mb-4">
                  Advisory Services
                </p>
                <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                  Every AI transformation starts with{' '}
                  <span className="gradient-text">knowing where you stand.</span>
                </h1>
                <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
                  Our advisory engagements give you a clear-eyed assessment of your current state,
                  a prioritized roadmap, and a business case your leadership team can act on — in
                  2–4 weeks, not 2–4 months.
                </p>
              </div>
              <div className="hidden lg:block">
                <AdvisoryBuildingBlocks />
              </div>
            </div>
          </div>
        </section>

        {/* Featured: AI Maturity Assessment */}
        <section className="section-padding">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-2xl border border-brand-amber/30 bg-gradient-to-br from-brand-amber/8 via-brand-navy-card to-brand-navy-card p-10 lg:p-14">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-amber/15 border border-brand-amber/25 rounded-full text-xs font-mono text-brand-amber tracking-wider uppercase mb-4">
                    Interactive assessment
                  </span>
                  <h2 className="text-section-title font-display font-bold text-white">
                    AI Maturity Assessment
                  </h2>
                  <p className="mt-4 text-brand-gray-300 leading-relaxed">
                    15 questions across 5 dimensions—Strategy, Data, Technology, People, and Process.
                    Get a scored maturity level, benchmarked against industry peers, with personalized
                    recommendations and suggested solution areas. Takes about 5 minutes.
                  </p>
                  <Link href="/advisory/ai-maturity" className="btn-primary mt-6">
                    Start the Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Compass, label: 'Strategy & Leadership', color: 'text-brand-amber' },
                    { icon: Database, label: 'Data Readiness', color: 'text-brand-teal' },
                    { icon: Server, label: 'Technology Stack', color: 'text-sa-insightlens' },
                    { icon: Users, label: 'People & Skills', color: 'text-sa-visualforge' },
                    { icon: Settings, label: 'Process & Operations', color: 'text-sa-searchcore' },
                  ].map((dim) => (
                    <div key={dim.label} className="flex items-center gap-2.5 p-3 rounded-lg bg-brand-navy-surface/80 border border-brand-border/50">
                      <dim.icon className={`w-4 h-4 ${dim.color} shrink-0`} />
                      <span className="text-xs text-brand-gray-300">{dim.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Assessments */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              Solution-specific assessments
            </h2>
            <p className="text-brand-gray-300 mb-10 max-w-2xl">
              Each assessment is a standalone advisory engagement: $25,000–$50,000.
              High margin, low delivery cost. Creates trust and pipeline for downstream
              pod engagements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {assessments.filter(a => !a.featured).map((assessment) => (
                <div key={assessment.name} className="card">
                  <h3 className="font-display font-semibold text-white text-sm mb-2">
                    {assessment.name}
                  </h3>
                  <p className="text-xs text-brand-gray-400 leading-relaxed mb-3">
                    {assessment.scope}
                  </p>
                  {'platform' in assessment && assessment.platform && (
                    <span className="platform-badge text-[10px]">{assessment.platform}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}

        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              Schedule a conversation with our team to identify the right assessment
              for your organization.
            </p>
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Schedule a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
