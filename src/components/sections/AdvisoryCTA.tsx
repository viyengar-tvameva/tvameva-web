import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AdvisoryCTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 via-brand-navy-card to-brand-navy-card p-10 lg:p-16">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative max-w-2xl">
            <h2 className="text-section-title font-display font-bold text-white">
              Every AI transformation starts with knowing where you stand.
            </h2>
            <p className="mt-4 text-brand-gray-300 leading-relaxed">
              Our advisory engagements give you a clear-eyed assessment of your current state,
              a prioritized roadmap, and a business case your leadership team can act on—in
              2–4 weeks, not 2–4 months.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/advisory/ai-maturity" className="btn-primary text-base px-8 py-4">
                Take the AI Maturity Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/advisory" className="btn-secondary text-base px-8 py-4">
                View All Assessments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
