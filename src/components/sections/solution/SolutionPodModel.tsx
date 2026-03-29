'use client';

import { SolutionArea } from '@/data/solutions';
import { motion } from 'framer-motion';
import { Bot, Cpu, BarChart3, Users } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, GlowDivider } from '@/components/common/Animations';

const agentIcons: Record<string, React.ElementType> = {
  'Implementation Agents': Cpu,
  'Operational Agents': Bot,
  'Value Realization Dashboards': BarChart3,
};

const agentGradients: Record<string, string> = {
  'Implementation Agents': 'from-brand-amber/20 via-brand-amber/5 to-transparent',
  'Operational Agents': 'from-brand-teal/20 via-brand-teal/5 to-transparent',
  'Value Realization Dashboards': 'from-sa-insightlens/20 via-sa-insightlens/5 to-transparent',
};

function PodDiagram({ roles }: { roles: string[] }) {
  return (
    <div className="relative bg-brand-navy/60 backdrop-blur-sm rounded-xl border border-brand-border p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-brand-teal" />
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-teal">
          Pod Composition
        </span>
      </div>

      {/* Role nodes */}
      <div className="space-y-2.5">
        {roles.map((role, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-brand-navy-surface/60 border border-brand-border/50"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-amber to-brand-teal flex-shrink-0" />
            <span className="text-sm text-brand-gray-200 font-medium">{role}</span>
          </motion.div>
        ))}
      </div>

      {/* AI augmentation indicator */}
      <div className="mt-4 pt-4 border-t border-brand-border/30">
        <div className="flex items-center gap-2 text-xs text-brand-gray-500">
          <div className="w-full h-1.5 rounded-full bg-brand-navy-surface overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-amber to-brand-teal"
              initial={{ width: '0%' }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <span className="whitespace-nowrap font-medium">40–60% AI amplification</span>
        </div>
      </div>
    </div>
  );
}

export function SolutionPodModel({ solution }: { solution: SolutionArea }) {
  if (!solution.podModel) return null;

  return (
    <>
      <GlowDivider color="teal" />
      <section className="relative py-24 overflow-hidden bg-brand-navy-card">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — Narrative */}
            <div>
              <Reveal direction="left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">
                  How We Deliver
                </span>
                <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white text-balance">
                  {solution.podModel.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 space-y-4">
                  {solution.podModel.body.split('\n\n').map((p, i) => (
                    <p key={i} className="text-brand-gray-300 leading-relaxed">{p}</p>
                  ))}
                </div>
              </Reveal>

              {/* AI Agent types */}
              <StaggerContainer staggerDelay={0.1} className="mt-8 space-y-3">
                {solution.podModel.aiAgentTypes.map((agent, i) => {
                  const Icon = agentIcons[agent.name] || Bot;
                  const gradient = agentGradients[agent.name] || agentGradients['Implementation Agents'];
                  return (
                    <StaggerItem key={i}>
                      <div className={`relative rounded-xl border border-brand-border/50 bg-gradient-to-r ${gradient} p-5 overflow-hidden`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-brand-amber" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm font-display">{agent.name}</h4>
                            <p className="mt-1 text-sm text-brand-gray-400">{agent.description}</p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            {/* Right — Pod diagram */}
            <Reveal direction="right" delay={0.3}>
              <div className="lg:sticky lg:top-32">
                <PodDiagram roles={solution.podModel.roles} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
