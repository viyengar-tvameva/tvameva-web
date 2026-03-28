import { SolutionArea } from '@/data/solutions';
import { CheckCircle } from 'lucide-react';

export function SolutionCapabilities({ solution }: { solution: SolutionArea }) {
  return (
    <section className="section-padding-sm">
      <div className="section-container">
        <h2 className="text-section-title font-display font-bold text-white mb-8">
          What we deliver
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {solution.capabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-brand-navy-light/50 border border-brand-border/50">
              <CheckCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <span className="text-sm text-brand-gray-200 leading-relaxed">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
