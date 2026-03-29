'use client';

import { useState } from 'react';
import { SolutionArea, ValueDriver } from '@/data/solutions';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Eye, Globe, UserCheck, Megaphone, FileText, Sparkles } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, GlowDivider, GradientMesh } from '@/components/common/Animations';

const categoryConfig: Record<string, { icon: React.ElementType; gradient: string; border: string; badge: string }> = {
  'Search & Discovery': {
    icon: Search,
    gradient: 'from-brand-amber/20 to-brand-amber/5',
    border: 'border-brand-amber/30 hover:border-brand-amber/60',
    badge: 'bg-brand-amber/10 text-brand-amber',
  },
  'Visual Commerce': {
    icon: Eye,
    gradient: 'from-sa-visualforge/20 to-sa-visualforge/5',
    border: 'border-sa-visualforge/30 hover:border-sa-visualforge/60',
    badge: 'bg-sa-visualforge/10 text-sa-visualforge',
  },
  'Omnichannel': {
    icon: Globe,
    gradient: 'from-brand-teal/20 to-brand-teal/5',
    border: 'border-brand-teal/30 hover:border-brand-teal/60',
    badge: 'bg-brand-teal/10 text-brand-teal',
  },
  'Personalization': {
    icon: UserCheck,
    gradient: 'from-sa-insightlens/20 to-sa-insightlens/5',
    border: 'border-sa-insightlens/30 hover:border-sa-insightlens/60',
    badge: 'bg-sa-insightlens/10 text-sa-insightlens',
  },
  'Lead Generation': {
    icon: Megaphone,
    gradient: 'from-brand-orange/20 to-brand-orange/5',
    border: 'border-brand-orange/30 hover:border-brand-orange/60',
    badge: 'bg-brand-orange/10 text-brand-orange',
  },
  'Content Operations': {
    icon: FileText,
    gradient: 'from-brand-gray-400/20 to-brand-gray-400/5',
    border: 'border-brand-gray-400/30 hover:border-brand-gray-400/60',
    badge: 'bg-brand-gray-400/10 text-brand-gray-400',
  },
};

function ValueDriverCard({ driver, index }: { driver: ValueDriver; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const config = categoryConfig[driver.category] || categoryConfig['Content Operations'];
  const Icon = config.icon;

  return (
    <div
className={`group relative rounded-xl border bg-brand-navy-card/80 backdrop-blur-sm transition-all duration-500 ${config.border} h-full flex flex-col`}
>
      {/* Colored top accent bar */}
      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${config.gradient}`} />

      <div className="p-6 lg:p-8 flex-1">
        {/* Category badge + icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.badge}`}>
            <Icon className="w-4.5 h-4.5" />
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${config.badge} px-2.5 py-1 rounded-full`}>
            {driver.category}
          </span>
        </div>

        <h3 className="text-xl lg:text-2xl font-display font-bold text-white group-hover:text-brand-amber transition-colors duration-300">
          {driver.headline}
        </h3>

        <div className="mt-4 space-y-3">
          {driver.body.split('\n\n').map((p, i) => (
            <p key={i} className="text-brand-gray-300 leading-relaxed text-[15px]">{p}</p>
          ))}
        </div>

        {/* Outcome metrics as pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {driver.outcomeMetrics.map((metric, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-navy-surface text-brand-gray-200 border border-brand-border"
            >
              <Sparkles className="w-3 h-3 mr-1.5 text-brand-amber/60" />
              {metric}
            </span>
          ))}
        </div>

        {/* Connector IP callout */}
        {driver.connectorIP && (
          <div className="mt-5 p-4 rounded-lg bg-gradient-to-r from-brand-amber/5 to-transparent border border-brand-amber/15">
            <p className="text-sm font-semibold text-brand-amber font-display">{driver.connectorIP.name}</p>
            <p className="mt-1 text-sm text-brand-gray-400">{driver.connectorIP.description}</p>
          </div>
        )}
      </div>

      {/* Expandable proof point */}
      <div className="border-t border-brand-border/50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-6 lg:px-8 py-3.5 flex items-center justify-between text-left hover:bg-brand-navy-surface/50 transition-colors"
        >
          <span className="text-[11px] font-bold text-brand-gray-500 uppercase tracking-[0.15em]">
            From the field
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-4 h-4 text-brand-gray-500" />
          </motion.div>
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 lg:px-8 pb-6">
                <blockquote className="text-brand-gray-300 leading-relaxed text-sm border-l-2 border-brand-amber/30 pl-4 italic">
                  {driver.proofPoint}
                </blockquote>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SolutionValueDrivers({ solution }: { solution: SolutionArea }) {
  if (!solution.valueDrivers || solution.valueDrivers.length === 0) return null;

  return (
    <>
      <GlowDivider color="amber" />
      <section className="relative py-24 overflow-hidden bg-brand-navy">
        <GradientMesh variant="teal" />

        <div className="relative section-container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-teal">
                Capabilities
              </span>
              <h2 className="mt-3 text-section-title lg:text-hero-md font-display font-bold text-white">
                Six capabilities that turn your digital platform into a{' '}
                <span className="bg-gradient-to-r from-brand-amber to-brand-teal bg-clip-text text-transparent">
                  revenue engine
                </span>
                .
              </h2>
              <p className="mt-4 text-lg text-brand-gray-400 max-w-2xl mx-auto">
                Each capability is delivered by our dedicated {solution.name} pod — a team of 5–7 specialists augmented by AI agents.
              </p>
            </div>
          </Reveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {solution.valueDrivers.map((driver, index) => (
              <StaggerItem key={driver.id}>
                <ValueDriverCard driver={driver} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
