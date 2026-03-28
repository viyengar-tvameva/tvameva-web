import { Users, Target, Layers, Zap } from 'lucide-react';
import { differentiators } from '@/data/content';

const iconMap: Record<string, React.ElementType> = {
  Users, Target, Layers, Zap,
};

export function DifferentiatorsSection() {
  return (
    <section className="section-padding bg-brand-navy-light/30">
      <div className="section-container">
        <div className="max-w-2xl mb-16">
          <h2 className="text-section-title font-display font-bold text-white">
            How we're different
          </h2>
          <p className="mt-4 text-brand-gray-300">
            Not a body shop. Not a generalist. A delivery model built around AI-first 
            teams, outcome accountability, platform depth, and reusable IP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {differentiators.map((diff) => {
            const Icon = iconMap[diff.icon] || Users;
            return (
              <div key={diff.id} className="card group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-brand-amber/10 text-brand-amber shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-card-title font-display font-semibold text-white mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-brand-gray-300 leading-relaxed mb-4">
                      {diff.whatWeSay}
                    </p>
                    <div className="px-4 py-3 bg-brand-navy-surface rounded-lg border border-brand-border/50">
                      <p className="text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1">
                        What the buyer hears
                      </p>
                      <p className="text-sm text-brand-amber/90 italic">
                        "{diff.whatBuyerHears}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
