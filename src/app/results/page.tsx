import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { proofPoints, caseStudies } from '@/data/content';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Results — Proof Points & Client Outcomes',
  description: '67% cost reduction. 85–90% AI self-resolution. 6–8 weeks eliminated with pre-built IP. See what outcome-based delivery looks like.',
};

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white max-w-3xl">
              Results speak. <span className="gradient-text">We let them.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-gray-300 max-w-2xl">
              Anonymized proof points from real enterprise engagements. Outcome-based delivery
              means every metric ties directly to business impact.
            </p>
          </div>
        </section>

        {/* Proof Points */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {proofPoints.map((point) => (
                <div key={point.id} className="card text-center">
                  <div className="stat-number">{point.stat}</div>
                  <div className="text-sm font-display font-medium text-white mt-2">{point.label}</div>
                  <div className="text-xs text-brand-gray-400 mt-2 leading-relaxed">{point.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <h2 className="text-section-title font-display font-bold text-white mb-12">
              Client outcomes
            </h2>
            <div className="space-y-8">
              {caseStudies.map((cs) => (
                <div key={cs.id} className="card p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="platform-badge">{cs.vertical}</span>
                    <span className="platform-badge">{cs.companySize}</span>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{cs.title}</h3>
                  <p className="text-sm text-brand-gray-400 mb-4">{cs.challenge}</p>
                  <p className="text-sm text-brand-gray-200 mb-6">{cs.result}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cs.metrics.map((metric) => (
                      <div key={metric.label} className="px-4 py-3 bg-brand-navy-surface rounded-lg border border-brand-border/50 text-center">
                        <div className="text-lg font-display font-bold text-brand-amber">{metric.value}</div>
                        <div className="text-xs text-brand-gray-400 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              See what these results could look like for your organization
            </h2>
            <Link href="/advisory" className="btn-primary text-base px-8 py-4 mt-4">
              Start Your Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
