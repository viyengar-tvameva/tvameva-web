import { SolutionArea } from '@/data/solutions';
import { Target, XCircle } from 'lucide-react';

export function SolutionMetrics({ solution }: { solution: SolutionArea }) {
  return (
    <section className="section-padding-sm bg-brand-navy-light/30">
      <div className="section-container">
        <h2 className="text-section-title font-display font-bold text-white mb-8">
          How we measure success
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outcome metrics */}
          <div>
            <p className="text-xs font-mono text-brand-teal uppercase tracking-wider mb-4">
              You pay for
            </p>
            <div className="space-y-3">
              {solution.outcomeMetrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-brand-teal/5 border border-brand-teal/20">
                  <Target className="w-4 h-4 text-brand-teal shrink-0" />
                  <span className="text-sm text-brand-gray-200">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What we don't charge for */}
          <div>
            <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider mb-4">
              Not for
            </p>
            <div className="p-4 rounded-lg bg-brand-navy-surface border border-brand-border/50">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-brand-gray-500 shrink-0" />
                <span className="text-sm text-brand-gray-400">{solution.pricingContrast.notFor}</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-brand-gray-400 leading-relaxed">
              Our outcome-based pricing ties our revenue to your results. 
              You pay for <span className="text-white font-medium">{solution.pricingContrast.paysFor}</span>—not 
              inputs, not hours, not headcount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
