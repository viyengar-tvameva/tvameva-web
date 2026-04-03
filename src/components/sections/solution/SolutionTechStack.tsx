'use client';

import { SolutionArea } from '@/data/solutions';
import { motion } from 'framer-motion';
import { Layers, Puzzle, ArrowUp, Bot, Shield, Zap } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, GlowDivider, GradientMesh } from '@/components/common/Animations';

export function SolutionTechStack({ solution }: { solution: SolutionArea }) {
  if (!solution.techStack) return null;

  // Split layers into 3 tiers based on naming convention:
  // Layers containing "(Your)" = customer's existing investment
  // Layers containing "(Tvameva)" = our moat/differentiation
  // Layers containing "(Outcome)" = business outcomes unlocked
  // Fallback: render all layers in a single flat list if not tagged
  const hasTaggedLayers = solution.techStack.layers.some(
    (l) => l.layer.includes('(') || l.platform.includes('(')
  );

  const customerLayers = solution.techStack.layers.filter(
    (l) => l.layer.toLowerCase().includes('your') || l.role.toLowerCase().includes('existing')
  );
  const tvamevaLayers = solution.techStack.layers.filter(
    (l) => l.layer.toLowerCase().includes('tvameva') || l.layer.toLowerCase().includes('intelligence') || l.layer.toLowerCase().includes('agentic') || l.layer.toLowerCase().includes('accelerator')
  );
  const outcomeLayers = solution.techStack.layers.filter(
    (l) => l.layer.toLowerCase().includes('outcome') || l.layer.toLowerCase().includes('value')
  );

  // If layers aren't tagged, use them all in a visual stack
  const useTieredLayout = tvamevaLayers.length > 0;

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
                Platform + Intelligence
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                {solution.techStack.headline}
              </h2>
              <p className="mt-4 text-lg text-brand-gray-400">{solution.techStack.body}</p>
            </div>
          </Reveal>

          {useTieredLayout ? (
            /* 3-tier moat visualization */
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tier 3: Business Outcomes (top) */}
              {outcomeLayers.length > 0 && (
                <Reveal>
                  <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ArrowUp className="w-4 h-4 text-brand-teal" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-teal">Business Outcomes Unlocked</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {outcomeLayers.map((layer, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-brand-teal/5 border border-brand-teal/15">
                          <div className="w-2 h-2 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                          <div>
                            <span className="text-sm font-display font-semibold text-white">{layer.platform}</span>
                            <p className="text-xs text-brand-gray-400 mt-0.5">{layer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Tier 2: Tvameva Intelligence Layer (THE MOAT) */}
              <Reveal delay={0.1}>
                <div className="rounded-2xl border-2 border-brand-amber/40 bg-gradient-to-br from-brand-amber/8 to-brand-amber/3 p-6 relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-amber/5 via-transparent to-brand-amber/5 animate-pulse-glow" />

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-brand-amber" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-amber">Tvameva Intelligence &amp; Agentic Layer</span>
                      <span className="ml-auto text-[9px] font-mono text-brand-amber/60 uppercase tracking-wider px-2 py-0.5 rounded-full border border-brand-amber/20">Our Moat</span>
                    </div>
                    <p className="text-xs text-brand-gray-400 mb-4">
                      What we add on top of your existing platform investments — the IP, agents, and accelerators that create differentiated outcomes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {tvamevaLayers.map((layer, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-brand-amber/5 border border-brand-amber/20"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Zap className="w-3.5 h-3.5 text-brand-amber mt-0.5 shrink-0" />
                          <div>
                            <span className="text-sm font-display font-semibold text-white">{layer.platform}</span>
                            <p className="text-xs text-brand-gray-400 mt-0.5">{layer.role}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Tier 1: Customer's Existing Platform (bottom) */}
              {customerLayers.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="rounded-2xl border border-brand-border/50 bg-brand-navy-card/50 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-brand-gray-400" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gray-500">Your Existing Platform Investment</span>
                      <span className="ml-auto text-[9px] font-mono text-brand-gray-600 uppercase tracking-wider">Protected &amp; Extended</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {customerLayers.map((layer, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-brand-navy-surface/50 border border-brand-border/30">
                          <div className="w-2 h-2 rounded-full bg-brand-gray-500 mt-1.5 shrink-0" />
                          <div>
                            <span className="text-sm font-display font-semibold text-brand-gray-300">{layer.platform}</span>
                            <p className="text-xs text-brand-gray-500 mt-0.5">{layer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          ) : (
            /* Flat layer stack (fallback for untagged data) */
            <div className="max-w-3xl mx-auto">
              <StaggerContainer staggerDelay={0.08} className="space-y-2">
                {solution.techStack.layers.map((layer, i) => (
                  <StaggerItem key={i}>
                    <div className="relative rounded-xl border border-brand-border bg-brand-navy-card/50 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 hover:scale-[1.01]">
                      <div className="sm:w-52 flex-shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-amber">
                          {layer.layer}
                        </span>
                        <p className="mt-1 text-sm font-semibold text-white font-display">
                          {layer.platform}
                        </p>
                      </div>
                      <p className="text-sm text-brand-gray-400 flex-1">{layer.role}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
