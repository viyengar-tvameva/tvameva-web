import { SolutionArea } from '@/data/solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SolutionAdvisoryCTA({ solution }: { solution: SolutionArea }) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 via-brand-navy-card to-brand-navy-card p-10 lg:p-14">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-amber/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative max-w-xl">
            <p className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-3">
              {solution.advisory.name}
            </p>
            <p className="text-lg text-brand-gray-200 leading-relaxed mb-6">
              {solution.advisory.description}
            </p>
            <Link href="/advisory" className="btn-primary">
              {solution.advisory.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
