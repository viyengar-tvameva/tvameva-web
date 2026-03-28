import { SolutionArea } from '@/data/solutions';
import { Zap } from 'lucide-react';

export function SolutionIP({ solution }: { solution: SolutionArea }) {
  return (
    <section className="section-padding-sm">
      <div className="section-container">
        <div className="card border-brand-amber/20 bg-gradient-to-r from-brand-amber/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-brand-amber/10 text-brand-amber shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-2">
                Accelerator IP
              </p>
              <h3 className="text-card-title font-display font-semibold text-white mb-2">
                {solution.keyIP.name}
              </h3>
              <p className="text-sm text-brand-gray-300 leading-relaxed">
                {solution.keyIP.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
