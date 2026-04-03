import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AdvisoryCTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 via-brand-navy-card to-brand-navy-card p-10 lg:p-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative max-w-2xl">
            <h2 className="text-section-title font-display font-bold text-brand-amber">
              Not sure where to start?
            </h2>
            <p className="mt-4 text-brand-gray-300 leading-relaxed">
              Our AI Maturity Assessment maps your current state and builds a prioritized
              roadmap your leadership team can act on — in 2–4 weeks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/advisory/ai-maturity" className="btn-primary text-base px-8 py-4">
                Take the AI Maturity Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
