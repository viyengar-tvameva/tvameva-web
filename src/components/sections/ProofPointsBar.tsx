// ProofPointsBar — horizontal stat callouts
import { proofPoints } from '@/data/content';

export function ProofPointsBar() {
  return (
    <section className="relative border-y border-brand-border bg-brand-navy-light/50">
      <div className="section-container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {proofPoints.map((point) => (
            <div key={point.id} className="text-center">
              <div className="stat-number">{point.stat}</div>
              <div className="stat-label">{point.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
