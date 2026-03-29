'use client';

import { SolutionArea } from '@/data/solutions';
import { motion } from 'framer-motion';
import { Layers, Puzzle, ArrowDown } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, GlowDivider, GradientMesh } from '@/components/common/Animations';

const layerColors: Record<string, { text: string; border: string; bg: string; dot: string }> = {
  'Content & CMS': { text: 'text-brand-teal', border: 'border-brand-teal/30', bg: 'bg-brand-teal/5', dot: 'bg-brand-teal' },
  'Frontend': { text: 'text-sa-insightlens', border: 'border-sa-insightlens/30', bg: 'bg-sa-insightlens/5', dot: 'bg-sa-insightlens' },
  'Search & Discovery': { text: 'text-brand-amber', border: 'border-brand-amber/30', bg: 'bg-brand-amber/5', dot: 'bg-brand-amber' },
  'Visual Commerce': { text: 'text-sa-visualforge', border: 'border-sa-visualforge/30', bg: 'bg-sa-visualforge/5', dot: 'bg-sa-visualforge' },
  'Integration': { text: 'text-brand-orange', border: 'border-brand-orange/30', bg: 'bg-brand-orange/5', dot: 'bg-brand-orange' },
  'Intelligence': { text: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-400/5', dot: 'bg-cyan-400' },
  'Marketing Automation': { text: 'text-rose-400', border: 'border-rose-400/30', bg: 'bg-rose-400/5', dot: 'bg-rose-400' },
};

export function SolutionTechStack({ solution }: { solution: SolutionArea }) {
  if (!solution.techStack) return null;

  return (
    <>
      <GlowDivider color="amber" />
      <section className="relative py-24 overflow-hidden bg-brand-navy">
        <GradientMesh variant="amber" />

        <div className="relative section-container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">
                <Layers className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                Technology Stack
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                {solution.techStack.headline}
              </h2>
              <p className="mt-4 text-lg text-brand-gray-400">{solution.techStack.body}</p>
            </div>
          </Reveal>

          {/* Architecture layers — stacked cards */}
          <div className="max-w-3xl mx-auto">
            <StaggerContainer staggerDelay={0.08} className="space-y-2">
              {solution.techStack.layers.map((layer, i) => {
                const colors = layerColors[layer.layer] || { text: 'text-brand-gray-300', border: 'border-brand-border', bg: 'bg-brand-navy-surface/50', dot: 'bg-brand-gray-400' };
                return (
                  <StaggerItem key={i}>
                    <div className={`relative rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:scale-[1.01]`}>
                      <div className="sm:w-52 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${colors.text}`}>
                            {layer.layer}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-white font-display pl-4">
                          {layer.platform}
                        </p>
                      </div>
                      <p className="text-sm text-brand-gray-400 flex-1">{layer.role}</p>
                    </div>

                    {/* Arrow between layers */}
                    {i < solution.techStack!.layers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-3.5 h-3.5 text-brand-border" />
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Connector IP */}
          {solution.techStack.connectors.length > 0 && (
            <Reveal delay={0.4}>
              <div className="mt-16 max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Puzzle className="w-4 h-4 text-brand-amber" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">
                    Accelerator IP
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {solution.techStack.connectors.map((c, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl border border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 to-transparent p-5 hover:border-brand-amber/40 transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <h4 className="text-sm font-bold text-brand-amber font-display">{c.name}</h4>
                      <p className="mt-2 text-xs text-brand-gray-400 leading-relaxed">{c.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
