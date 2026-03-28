import { SolutionArea } from '@/data/solutions';
import { TrendingUp } from 'lucide-react';

export function SolutionMarket({ solution }: { solution: SolutionArea }) {
  return (
    <section className="section-padding-sm">
      <div className="section-container">
        <h2 className="text-section-title font-display font-bold text-white mb-8">
          Market context
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {solution.marketStats.map((ms, i) => (
            <div key={i} className="card text-center">
              <TrendingUp className="w-5 h-5 text-brand-amber mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-white mb-1">{ms.value}</div>
              <div className="text-sm text-brand-gray-400">{ms.stat}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
