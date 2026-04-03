import Link from 'next/link';
import { ArrowRight, Layout, BarChart3, Bot, Search, Box, Rocket } from 'lucide-react';
import { solutionAreas } from '@/data/solutions';

const iconMap: Record<string, React.ElementType> = {
  Layout, BarChart3, Bot, Search, Box, Rocket,
};

const colorMap: Record<string, string> = {
  teal: 'border-sa-engageos/30 hover:border-sa-engageos/60',
  blue: 'border-sa-insightlens/30 hover:border-sa-insightlens/60',
  amber: 'border-sa-resolveiq/30 hover:border-sa-resolveiq/60',
  orange: 'border-sa-propeledge/30 hover:border-sa-propeledge/60',
  purple: 'border-sa-visualforge/30 hover:border-sa-visualforge/60',
};

const accentMap: Record<string, string> = {
  teal: 'text-sa-engageos',
  blue: 'text-sa-insightlens',
  amber: 'text-sa-resolveiq',
  orange: 'text-sa-propeledge',
  purple: 'text-sa-visualforge',
};

const visibleSlugs = ['engageos', 'insightlens', 'propeledge'];

export function SolutionAreasGrid() {
  return (
    <section id="solutions" className="py-16 border-t border-brand-border/30">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-section-title font-display font-bold text-white">
            Three Solutions, One Mission — Tomorrow&apos;s Enterprise.
          </h2>
          <p className="mt-4 text-brand-gray-300">
            AI-powered intelligence layered on top of the platforms you already run — delivered by AI pods, priced on your outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionAreas.filter((sa) => visibleSlugs.includes(sa.slug)).map((sa) => {
            const Icon = iconMap[sa.icon] || Layout;
            return (
              <Link
                key={sa.id}
                href={`/solutions/${sa.slug}`}
                className={`card-interactive group ${colorMap[sa.color] || ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg bg-brand-navy-surface ${accentMap[sa.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="platform-badge">{sa.platformAnchor}</span>
                </div>

                <h3 className="text-card-title font-display font-semibold text-white mb-1">
                  {sa.name}
                </h3>
                <p className="text-sm text-brand-gray-400 mb-4">{sa.tagline}</p>

                <p className="text-sm text-brand-gray-300 leading-relaxed line-clamp-3">
                  {sa.headline}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-display text-brand-amber opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore {sa.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}
