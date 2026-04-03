'use client';

import { useState } from 'react';
import { SolutionArea, ProofPointCase } from '@/data/solutions';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Factory, ChevronDown, CheckCircle2, ArrowUpRight, Quote } from 'lucide-react';
import { Reveal, GlowDivider } from '@/components/common/Animations';
import Image from 'next/image';
import type { Testimonial } from '@/data/content';

const industryConfig: Record<string, { icon: React.ElementType; accent: string; border: string; bg: string }> = {
  'Hi-Tech / Semiconductor': { icon: Building2, accent: 'text-brand-teal', border: 'border-brand-teal/20 hover:border-brand-teal/50', bg: 'from-brand-teal/5 to-transparent' },
  'Manufacturing / Consumer': { icon: Factory, accent: 'text-brand-amber', border: 'border-brand-amber/20 hover:border-brand-amber/50', bg: 'from-brand-amber/5 to-transparent' },
};

function ProofCard({ proof }: { proof: ProofPointCase }) {
  const [expanded, setExpanded] = useState(false);
  const config = industryConfig[proof.industryTag] || industryConfig['Hi-Tech / Semiconductor'];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${config.bg} bg-brand-navy-card/90 backdrop-blur-sm transition-all duration-500 w-full flex flex-col ${config.border}`}>
      <div className="p-6 lg:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`w-4 h-4 ${config.accent}`} />
          <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${config.accent}`}>
            {proof.industryTag}
          </span>
        </div>

        <h3 className="text-xl font-display font-bold text-white">{proof.headline}</h3>

        <div className="mt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">Challenge</span>
          <p className="mt-1 text-brand-gray-300 leading-relaxed text-[15px]">{proof.challenge}</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${config.accent} hover:opacity-80 transition-opacity`}
        >
          {expanded ? 'Hide details' : 'See solution & outcomes'}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-brand-border/30 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">Solution</span>
                  <p className="mt-1 text-brand-gray-300 leading-relaxed text-[15px]">{proof.solution}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">Key Outcomes</span>
                  <div className="mt-2 space-y-2">
                    {proof.outcomes.map((outcome, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <CheckCircle2 className={`w-4 h-4 ${config.accent} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-brand-gray-300">{outcome}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 lg:px-8 py-3 bg-brand-navy/40 border-t border-brand-border/20 rounded-b-xl">
        <p className="text-[11px] text-brand-gray-500 font-mono">{proof.scopeIndicator}</p>
      </div>
    </div>
  );
}

interface Props {
  solution: SolutionArea;
  testimonials?: Testimonial[];
}

export function SolutionProofPoints({ solution, testimonials = [] }: Props) {
  if (!solution.proofPoints || solution.proofPoints.length === 0) return null;

  return (
    <>
      <GlowDivider color="teal" />
      <section className="relative py-24 bg-brand-navy-light">
        <div className="section-container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-teal">
                <ArrowUpRight className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                Customer Success
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                Outcomes from the field — not from a slide deck.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            {solution.proofPoints.map((proof, i) => (
              <Reveal key={proof.id} delay={i * 0.15} className="flex">
                <ProofCard proof={proof} />
              </Reveal>
            ))}

            {/* Testimonial fills the grid alongside proof points */}
            {testimonials.map((t) => (
              <Reveal key={t.id} delay={solution.proofPoints!.length * 0.15} className="flex">
                <div className="rounded-xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 to-transparent bg-brand-navy-card/90 backdrop-blur-sm w-full flex flex-col p-6 lg:p-8 relative overflow-hidden">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-amber/10" />

                  <div className="flex items-start gap-4 mb-4">
                    {t.photo && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-amber/30 shrink-0">
                        <Image src={t.photo} alt={t.name} width={48} height={48} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-semibold text-white">{t.name}</h4>
                      <p className="text-xs text-brand-amber/80">{t.title}</p>
                    </div>
                  </div>

                  <blockquote className="text-sm text-brand-gray-300 leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
