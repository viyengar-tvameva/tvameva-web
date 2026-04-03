'use client';

import { motion } from 'framer-motion';
import { Bot, User, ArrowDown, ArrowRight, Clock } from 'lucide-react';
import type { WorkflowData } from './types';

interface Props {
  data: WorkflowData;
  className?: string;
}

export function AgentPipelineFlow({ data, className = '' }: Props) {
  if (!data?.steps?.length) return null;

  return (
    <div className={className}>
      {data.title && (
        <motion.h3
          className="text-lg font-display font-semibold text-white mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {data.title}
        </motion.h3>
      )}

      {/* Desktop: horizontal flow */}
      <div className="hidden lg:flex items-start gap-0">
        {data.steps.map((step, i) => (
          <div key={step.id} className="flex items-start">
            <motion.div
              className="relative flex flex-col items-center w-56"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Agent badge */}
              {step.agentName && (
                <div className="text-[10px] font-mono text-brand-amber uppercase tracking-wider mb-2">
                  {step.agentName}
                </div>
              )}

              {/* Node */}
              <div className="relative p-4 rounded-xl bg-brand-navy-card border border-brand-amber/20 hover:border-brand-amber/50 transition-colors w-full group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-brand-amber/10">
                    <Bot className="w-3.5 h-3.5 text-brand-amber" />
                  </div>
                  <h4 className="text-xs font-display font-semibold text-white leading-tight">
                    {step.label}
                  </h4>
                </div>

                <p className="text-[11px] text-brand-gray-400 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* Time compression */}
                {step.duration && (
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-brand-teal" />
                    <span className="text-xs font-mono text-brand-teal font-semibold">{step.duration}</span>
                    {step.previousDuration && (
                      <span className="text-[10px] text-brand-gray-600 line-through">{step.previousDuration}</span>
                    )}
                  </div>
                )}

                {/* Human review gate */}
                {step.humanRole && (
                  <div className="mt-2 pt-2 border-t border-dashed border-brand-border/50 flex items-start gap-1.5">
                    <User className="w-3 h-3 text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-[10px] text-brand-gray-500 italic">{step.humanRole}</span>
                  </div>
                )}
              </div>

              {/* Outputs */}
              {step.outputs && step.outputs.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {step.outputs.map((output) => (
                    <span key={output} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-navy-surface border border-brand-border/30 text-brand-gray-500">
                      {output}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Arrow between steps */}
            {i < data.steps.length - 1 && (
              <motion.div
                className="flex items-center px-1 pt-12"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3 }}
              >
                <div className="w-8 h-px bg-gradient-to-r from-brand-amber/60 to-brand-teal/60" />
                <ArrowRight className="w-3.5 h-3.5 text-brand-amber/60 -ml-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="lg:hidden space-y-0">
        {data.steps.map((step, i) => (
          <div key={step.id}>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {step.agentName && (
                <div className="text-[10px] font-mono text-brand-amber uppercase tracking-wider mb-1.5">
                  {step.agentName}
                </div>
              )}

              <div className="p-4 rounded-xl bg-brand-navy-card border border-brand-amber/20">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-brand-amber" />
                  <h4 className="text-sm font-display font-semibold text-white">{step.label}</h4>
                </div>
                <p className="text-xs text-brand-gray-400 leading-relaxed mb-2">{step.description}</p>

                {step.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-brand-teal" />
                    <span className="text-xs font-mono text-brand-teal font-semibold">{step.duration}</span>
                    {step.previousDuration && (
                      <span className="text-[10px] text-brand-gray-600 line-through">{step.previousDuration}</span>
                    )}
                  </div>
                )}

                {step.humanRole && (
                  <div className="mt-2 pt-2 border-t border-dashed border-brand-border/50 flex items-start gap-1.5">
                    <User className="w-3 h-3 text-brand-teal shrink-0 mt-0.5" />
                    <span className="text-[10px] text-brand-gray-500 italic">{step.humanRole}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {i < data.steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="w-4 h-4 text-brand-amber/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
