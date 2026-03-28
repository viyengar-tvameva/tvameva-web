import { SolutionArea, getSolutionById } from '@/data/solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function SolutionExpansion({ solution }: { solution: SolutionArea }) {
  const expansionSA = getSolutionById(solution.expansionSA.id);
  if (!expansionSA) return null;

  return (
    <section className="section-padding-sm">
      <div className="section-container">
        <div className="card border-brand-border-light/50">
          <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider mb-3">
            Where this leads next
          </p>
          <h3 className="text-card-title font-display font-semibold text-white mb-2">
            {expansionSA.name} — {expansionSA.tagline}
          </h3>
          <p className="text-sm text-brand-gray-300 leading-relaxed mb-4">
            {solution.expansionSA.description}
          </p>
          <Link href={`/solutions/${expansionSA.slug}`} className="btn-ghost">
            Explore {expansionSA.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
