'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import type { MetricsComparisonData } from './types';

interface Props {
  data: MetricsComparisonData;
  className?: string;
}

export function MetricsComparison({ data, className = '' }: Props) {
  if (!data?.metrics?.length) return null;

  return (
    <div className={className}>
      {data.title && (
        <motion.h3
          className="text-lg font-display font-semibold text-white mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {data.title}
        </motion.h3>
      )}

      <div className="space-y-4">
        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-[1fr_180px_40px_180px_140px] items-center gap-4 px-4 pb-2 border-b border-brand-border/30">
          <span className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider">Metric</span>
          <span className="text-xs font-mono text-brand-gray-600 uppercase tracking-wider text-center">{data.oldLabel}</span>
          <span />
          <span className="text-xs font-mono text-brand-amber uppercase tracking-wider text-center">{data.newLabel}</span>
          <span className="text-xs font-mono text-brand-teal uppercase tracking-wider text-right">Impact</span>
        </div>

        {data.metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-[1fr_180px_40px_180px_140px] items-center gap-4 p-4 rounded-xl bg-brand-navy-card border border-brand-border/30 hover:border-brand-amber/20 transition-colors">
              <span className="text-sm font-display font-medium text-white">{metric.label}</span>

              <div className="text-center">
                <span className="text-sm font-mono text-brand-gray-500">{metric.oldValue}</span>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-brand-amber/60" />
              </div>

              <div className="text-center">
                <span className="text-sm font-mono text-white font-semibold">{metric.newValue}</span>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20">
                  <TrendingUp className="w-3 h-3 text-brand-teal" />
                  <span className="text-xs font-mono text-brand-teal font-semibold">{metric.improvement}</span>
                </span>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden p-4 rounded-xl bg-brand-navy-card border border-brand-border/30">
              <div className="text-sm font-display font-medium text-white mb-3">{metric.label}</div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-center flex-1">
                  <div className="text-[10px] font-mono text-brand-gray-600 uppercase mb-1">{data.oldLabel}</div>
                  <div className="text-sm font-mono text-brand-gray-500">{metric.oldValue}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-amber/60 shrink-0" />
                <div className="text-center flex-1">
                  <div className="text-[10px] font-mono text-brand-amber uppercase mb-1">{data.newLabel}</div>
                  <div className="text-sm font-mono text-white font-semibold">{metric.newValue}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20">
                  <TrendingUp className="w-3 h-3 text-brand-teal" />
                  <span className="text-xs font-mono text-brand-teal font-semibold">{metric.improvement}</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
