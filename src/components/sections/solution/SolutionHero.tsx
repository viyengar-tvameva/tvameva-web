import { SolutionArea } from '@/data/solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SolutionHero({ solution }: { solution: SolutionArea }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-brand" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-amber/5 rounded-full blur-[120px]" />

      <div className="relative section-container">
        <div className="max-w-3xl">
          <span className="platform-badge mb-6">{solution.platformAnchor}</span>
          <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white text-balance mt-4">
            {solution.headline}
          </h1>
          <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
            {solution.valueProp}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`/advisory`} className="btn-primary">
              {solution.advisory.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/how-we-deliver" className="btn-secondary">
              See How We Deliver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
