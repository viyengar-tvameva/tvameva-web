import Link from 'next/link';
import { ArrowRight, Layout, BarChart3, Bot, Search, Box } from 'lucide-react';
import { solutionAreas } from '@/data/solutions';

const iconMap: Record<string, React.ElementType> = {
  Layout, BarChart3, Bot, Search, Box,
};

const colorMap: Record<string, string> = {
  teal: 'border-sa-engageos/30 hover:border-sa-engageos/60',
  blue: 'border-sa-insightlens/30 hover:border-sa-insightlens/60',
  amber: 'border-sa-resolveiq/30 hover:border-sa-resolveiq/60',
  orange: 'border-sa-searchcore/30 hover:border-sa-searchcore/60',
  purple: 'border-sa-visualforge/30 hover:border-sa-visualforge/60',
};

const accentMap: Record<string, string> = {
  teal: 'text-sa-engageos',
  blue: 'text-sa-insightlens',
  amber: 'text-sa-resolveiq',
  orange: 'text-sa-searchcore',
  purple: 'text-sa-visualforge',
};

export function SolutionAreasGrid() {
  return (
    <section id="solutions" className="section-padding">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-section-title font-display font-bold text-white">
            Five solution areas. Each partner-anchored. Each AI-native.
          </h2>
          <p className="mt-4 text-brand-gray-300">
            We go deep on the platforms you already use—so you get results, not a learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionAreas.map((sa) => {
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

          {/* Advisory card */}
          <Link
            href="/advisory"
            className="card-interactive border-brand-amber/20 hover:border-brand-amber/40 bg-gradient-to-br from-brand-amber/5 to-transparent"
          >
            <h3 className="text-card-title font-display font-semibold text-brand-amber mb-2">
              Not sure where to start?
            </h3>
            <p className="text-sm text-brand-gray-300 leading-relaxed">
              Our AI Maturity Assessment maps your current state and builds a prioritized
              roadmap your leadership team can act on—in 2–4 weeks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-display text-brand-amber">
              Take the assessment
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
