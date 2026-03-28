import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { podRoles } from '@/data/content';
import { solutionAreas } from '@/data/solutions';
import { Users, DollarSign, Zap, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Deliver — AI-Enabled Pods, Outcome-Based Pricing',
  description: 'Dedicated teams of 5–7 specialists augmented by AI. Outcome-based pricing tied to your KPIs. Pre-built connector IP that eliminates weeks of custom integration.',
};

export default function HowWeDeliverPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <div className="max-w-3xl">
              <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                A delivery model built for <span className="gradient-text">outcomes, not hours</span>
              </h1>
              <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
                Three interlocking layers—AI-enabled pods, outcome-based pricing, and reusable
                connector IP—that replace the traditional SI pyramid with something faster,
                leaner, and tied to your results.
              </p>
            </div>
          </div>
        </section>

        {/* Pods Section */}
        <section id="pods" className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                AI-enabled pods
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Each solution area is served by a dedicated pod of 5–7 specialists. AI handles
                the volume—code generation, QA automation, ticket resolution. Humans govern
                quality, architecture, and client outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {podRoles.map((role) => (
                <div key={role.title} className="card">
                  <h3 className="font-display font-semibold text-white text-sm mb-2">
                    {role.title}
                  </h3>
                  <p className="text-xs text-brand-gray-400 mb-3">{role.responsibility}</p>
                  <div className="px-3 py-2 bg-brand-navy-surface rounded-md border border-brand-border/50">
                    <p className="text-xs font-mono text-brand-teal/80">
                      AI: {role.aiAugmentation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Economic comparison */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="card border-brand-gray-600/30">
                <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider mb-3">Traditional model</p>
                <div className="text-2xl font-display font-bold text-brand-gray-400">8–12 FTEs</div>
                <div className="text-sm text-brand-gray-500 mt-1">$1.2M–$2.2M fully-loaded cost base</div>
              </div>
              <div className="card border-brand-amber/30">
                <p className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-3">Pod + AI model</p>
                <div className="text-2xl font-display font-bold text-brand-amber">5–7 specialists + AI</div>
                <div className="text-sm text-brand-gray-300 mt-1">$600K–$900K cost base, same or greater throughput</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                Outcome-based pricing
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Your budget is tied to results. If we don't deliver, we don't get paid.
              </p>
            </div>

            <div className="space-y-3">
              {solutionAreas.map((sa) => (
                <div key={sa.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-brand-navy-card border border-brand-border/50 gap-3">
                  <div>
                    <span className="font-display font-semibold text-white text-sm">{sa.name}</span>
                    <span className="text-brand-gray-500 mx-2">—</span>
                    <span className="text-sm text-brand-gray-400">{sa.tagline}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-brand-teal font-mono">Pays for: {sa.pricingContrast.paysFor}</span>
                    <span className="text-brand-gray-600">|</span>
                    <span className="text-brand-gray-500 font-mono">Not: {sa.pricingContrast.notFor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accelerator IP Section */}
        <section id="accelerators" className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                Connector IP library
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Build once, deploy repeatedly. Our pre-built connectors eliminate weeks of
                custom integration—each reuse is pure margin improvement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Acquia-Algolia Data Connector', sa: 'EngageOS', saves: '6–8 weeks', status: 'Production' },
                { name: 'GCP-Salesforce Data Bridge', sa: 'InsightLens', saves: '4–6 weeks', status: 'Production' },
                { name: 'Agentforce-Oracle Resolution Agent', sa: 'ResolveIQ', saves: '8–10 weeks', status: 'Production' },
                { name: 'Agentforce-Workday Resolution Agent', sa: 'ResolveIQ', saves: '8–10 weeks', status: 'Production' },
                { name: 'Algolia-Drupal Connector', sa: 'SearchCore', saves: '4–6 weeks', status: 'Production' },
                { name: 'Algolia-Salesforce Connector', sa: 'SearchCore', saves: '3–5 weeks', status: 'Production' },
                { name: 'Threekit-Salesforce CPQ Template', sa: 'VisualForge', saves: '6–8 weeks', status: 'Production' },
                { name: 'Threekit-Oracle CPQ Template', sa: 'VisualForge', saves: '6–8 weeks', status: 'Production' },
              ].map((connector) => (
                <div key={connector.name} className="flex items-start gap-3 p-4 rounded-lg bg-brand-navy-card border border-brand-border/50">
                  <Zap className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-display font-medium text-white">{connector.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono text-brand-gray-500">{connector.sa}</span>
                      <span className="text-xs text-brand-teal">Saves {connector.saves}</span>
                      <span className="text-[10px] font-mono text-brand-gray-600 uppercase">{connector.status}</span>
                    </div>
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
              Ready to see the pod model in action?
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              Our Pod Readiness Evaluation assesses whether your organization is ready to shift
              from traditional delivery to AI-enabled pods.
            </p>
            <Link href="/advisory" className="btn-primary text-base px-8 py-4">
              Schedule a Pod Readiness Evaluation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
