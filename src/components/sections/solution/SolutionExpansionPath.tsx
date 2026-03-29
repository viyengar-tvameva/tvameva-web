'use client';

import { SolutionArea } from '@/data/solutions';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Reveal, GlowDivider } from '@/components/common/Animations';

const saColors: Record<string, string> = {
  searchcore: 'border-brand-orange/30 hover:border-brand-orange/60',
  visualforge: 'border-sa-visualforge/30 hover:border-sa-visualforge/60',
  insightlens: 'border-sa-insightlens/30 hover:border-sa-insightlens/60',
  resolveiq: 'border-brand-amber/30 hover:border-brand-amber/60',
};

const saTextColors: Record<string, string> = {
  searchcore: 'text-brand-orange',
  visualforge: 'text-sa-visualforge',
  insightlens: 'text-sa-insightlens',
  resolveiq: 'text-brand-amber',
};

export function SolutionExpansionPath({ solution }: { solution: SolutionArea }) {
  if (!solution.expansionPath) return null;

  return (
    <>
      <GlowDivider color="mixed" />
      <section className="relative py-24 bg-brand-navy-card">
        <div className="section-container">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-teal">
                <Zap className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                Growth Path
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                {solution.expansionPath.headline}
              </h2>
              <p className="mt-4 text-lg text-brand-gray-400">
                {solution.expansionPath.body}
              </p>
            </div>
          </Reveal>

          {/* Hub */}
          <Reveal delay={0.2}>
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-teal/10 to-brand-amber/10 border-2 border-brand-teal"
                animate={{ boxShadow: ['0 0 20px rgba(46,216,163,0.1)', '0 0 40px rgba(46,216,163,0.2)', '0 0 20px rgba(46,216,163,0.1)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-lg font-display font-bold text-brand-teal">{solution.name}</span>
              </motion.div>
            </div>
          </Reveal>

          {/* Spokes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {solution.expansionPath.connections.map((conn, i) => {
              const borderColor = saColors[conn.targetSAId] || 'border-brand-border';
              const textColor = saTextColors[conn.targetSAId] || 'text-brand-amber';
              return (
                <Reveal key={i} delay={0.3 + i * 0.1}>
                  <Link
                    href={`/solutions/${conn.targetSAId}`}
                    className={`group block rounded-xl border bg-brand-navy/60 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 ${borderColor}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">
                          Expand to
                        </span>
                        <h3 className={`mt-1 text-lg font-display font-bold text-white group-hover:${textColor} transition-colors`}>
                          {conn.targetSAName}
                        </h3>
                      </div>
                      <motion.div
                        className="mt-1"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className={`w-5 h-5 text-brand-gray-600 group-hover:${textColor} transition-colors`} />
                      </motion.div>
                    </div>
                    <p className="mt-3 text-sm text-brand-gray-400">{conn.trigger}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
