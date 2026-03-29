'use client';

import { SolutionArea } from '@/data/solutions';
import { Reveal, AnimatedCounter, GlowDivider, GradientMesh } from '@/components/common/Animations';
import { TrendingUp } from 'lucide-react';

export function SolutionMarketContext({ solution }: { solution: SolutionArea }) {
  if (!solution.marketContext) return null;

  return (
    <>
      <GlowDivider color="amber" />
      <section className="relative py-24 overflow-hidden bg-brand-navy">
        <GradientMesh variant="amber" />

        <div className="relative section-container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">
                <TrendingUp className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                Market Signal
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                {solution.marketContext.headline}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {solution.marketContext.stats.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative rounded-xl border border-brand-border bg-brand-navy-card/80 backdrop-blur-sm p-6 text-center hover:border-brand-amber/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient top accent */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />

                  <AnimatedCounter
                    value={item.value}
                    className="text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-brand-amber to-brand-amber-light bg-clip-text text-transparent"
                  />
                  <p className="mt-2 text-sm font-semibold text-white font-display">
                    {item.stat}
                  </p>
                  <p className="mt-1.5 text-xs text-brand-gray-500 leading-relaxed">
                    {item.context}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
