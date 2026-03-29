'use client';

import { SolutionArea } from '@/data/solutions';
import { Reveal, GlowDivider } from '@/components/common/Animations';

export function SolutionChallenge({ solution }: { solution: SolutionArea }) {
  if (!solution.challenge) return null;

  return (
    <>
      <GlowDivider color="mixed" />
      <section className="relative py-24 overflow-hidden bg-brand-navy-light">
        {/* Subtle gradient accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-amber via-brand-teal to-transparent" />

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-2">
              <Reveal direction="left">
                <h2 className="text-section-title lg:text-hero-md font-display font-bold text-white text-balance sticky top-32">
                  {solution.challenge.headline}
                </h2>
              </Reveal>
            </div>

            {/* Right — body paragraphs with staggered reveal */}
            <div className="lg:col-span-3 space-y-6">
              {solution.challenge.body.split('\n\n').map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.15} direction="up">
                  <p className="text-lg text-brand-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
