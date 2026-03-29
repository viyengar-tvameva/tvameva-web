'use client';

import { SolutionArea } from '@/data/solutions';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, GlowDivider } from '@/components/common/Animations';

export function SolutionAdvisoryExtended({ solution }: { solution: SolutionArea }) {
  if (!solution.advisoryExtended) return null;

  return (
    <>
      <GlowDivider color="amber" />
      <section className="relative py-24 bg-brand-navy">
        <div className="section-container">
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-amber via-brand-teal to-brand-amber bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]" />
                <div className="absolute inset-[1px] rounded-2xl bg-brand-navy-card" />

                <div className="relative p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left — CTA content */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-brand-amber" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">
                          Advisory
                        </span>
                      </div>
                      <h2 className="text-section-title lg:text-hero-md font-display font-bold text-white">
                        {solution.advisoryExtended.headline}
                      </h2>
                      <p className="mt-4 text-brand-gray-300 leading-relaxed">
                        {solution.advisoryExtended.body}
                      </p>
                      <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/advisory" className="btn-primary inline-flex">
                          {solution.advisory.cta}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </motion.div>
                      {solution.advisoryExtended.pricingNote && (
                        <p className="mt-4 text-sm text-brand-gray-500 font-mono">
                          {solution.advisoryExtended.pricingNote}
                        </p>
                      )}
                    </div>

                    {/* Right — Scope items */}
                    <div className="bg-brand-navy/60 rounded-xl p-6 border border-brand-border/50">
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">
                        What the assessment covers
                      </span>
                      <StaggerContainer staggerDelay={0.08} className="mt-4 space-y-3">
                        {solution.advisoryExtended.scopeItems.map((item, i) => (
                          <StaggerItem key={i}>
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-brand-gray-300">{item}</span>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Add shimmer keyframe */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </section>
    </>
  );
}
