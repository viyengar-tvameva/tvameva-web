import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — AI-Native Solutions Provider',
  description: 'Tvameva is an AI-native solutions provider helping enterprises modernize, operate, and grow through five focused solution areas.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <div className="max-w-3xl">
              <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                AI-native. <span className="gradient-text">Outcome-anchored.</span>
              </h1>
              <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
                Tvameva is an AI-native solutions provider that helps enterprises modernize,
                operate, and grow through five focused solution areas—each anchored to a specific
                platform ecosystem, delivered by AI-enabled pods, and priced on measurable
                business outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-section-title font-display font-bold text-white mb-6">
                  Why we exist
                </h2>
                <div className="space-y-4 text-brand-gray-300 leading-relaxed">
                  <p>
                    The market is no longer buying technology delivery—it's buying outcomes
                    delivered through AI-native teams. Traditional SI models scale by adding
                    headcount. We scale by adding intelligence.
                  </p>
                  <p>
                    Our model is built on two interlocking pillars: five focused solution areas,
                    each with a specific, demonstrable AI capability anchored to platforms clients
                    already use. And AI-enabled customer success pods—a delivery unit that combines
                    product ownership, outcome-based financial accountability, technical delivery,
                    and customer success in a single team.
                  </p>
                  <p>
                    The name Tvameva comes from a Sanskrit verse meaning "you alone"—reflecting
                    our commitment to being the singular, trusted partner our clients need. Not a
                    generalist. Not a body shop. A focused team that goes deep on your platforms
                    and ties its success to yours.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-section-title font-display font-bold text-white mb-6">
                  How we work
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      label: 'Consultative first',
                      desc: 'We lead with understanding, not selling. Every engagement starts with listening.',
                    },
                    {
                      label: 'Measured confidence',
                      desc: 'We back claims with proof points and specific numbers. No hand-waving.',
                    },
                    {
                      label: 'Technically grounded',
                      desc: 'We name the stack, the integration, the connector. We are specific.',
                    },
                    {
                      label: 'Outcome-anchored',
                      desc: 'Every claim ties back to a business result the buyer cares about.',
                    },
                  ].map((principle) => (
                    <div key={principle.label} className="card p-4">
                      <h3 className="font-display font-semibold text-brand-amber text-sm mb-1">
                        {principle.label}
                      </h3>
                      <p className="text-sm text-brand-gray-400">{principle.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Ecosystem */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              Platform ecosystem
            </h2>
            <p className="text-brand-gray-300 mb-10 max-w-2xl">
              Each solution area is anchored to a specific platform partnership.
              Co-sell, co-marketing, and co-delivery relationships where each partner's
              field sales team becomes an inbound channel.
            </p>
            <div className="grid sm:grid-cols-5 gap-4">
              {[
                { name: 'Acquia', sa: 'EngageOS', type: 'Strategic Implementation Partner' },
                { name: 'Google Cloud', sa: 'InsightLens', type: 'GCP Partner' },
                { name: 'Salesforce', sa: 'ResolveIQ', type: 'Agentforce Practice' },
                { name: 'Algolia', sa: 'SearchCore', type: 'Certified Implementation Partner' },
                { name: 'Threekit', sa: 'VisualForge', type: 'Implementation Partner' },
              ].map((partner) => (
                <div key={partner.name} className="card text-center p-5">
                  <div className="text-lg font-display font-semibold text-white">{partner.name}</div>
                  <div className="text-xs text-brand-amber mt-1">{partner.sa}</div>
                  <div className="text-[10px] text-brand-gray-500 mt-2 font-mono">{partner.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              See where AI can take your organization
            </h2>
            <Link href="/advisory/ai-maturity" className="btn-primary text-base px-8 py-4 mt-4">
              Take the AI Maturity Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
