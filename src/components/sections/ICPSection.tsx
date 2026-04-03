import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Cpu } from 'lucide-react';

export function ICPSection() {
  return (
    <section className="py-16 border-t border-brand-border/30 bg-brand-navy-card/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-section-title font-display font-bold text-white">
              Built for enterprises growing faster than their tech teams
            </h2>
            <p className="mt-4 text-brand-gray-300 leading-relaxed">
              Revenue is climbing, but your internal technology teams can&apos;t keep pace
              with the AI disruption reshaping your industry. You need a partner who brings
              the intelligence layer, the platform depth, and the accelerator IP — so you
              can move at the speed your business demands.
            </p>
            <p className="mt-4 text-brand-gray-300 leading-relaxed">
              Traditional SI models give you headcount. We give you outcomes. Our AI Pod model
              delivers 60–70% lower cost than the traditional approach — with faster time-to-value
              and quality that improves with every engagement.
            </p>
            <Link href="/how-we-deliver" className="btn-ghost mt-6">
              See how we deliver
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: TrendingUp,
                title: 'Revenue growth outpacing tech capability',
                description: 'Your business is scaling but your platforms, integrations, and decision-making infrastructure are falling behind.',
              },
              {
                icon: Users,
                title: 'Can\'t build AI teams fast enough',
                description: 'Hiring AI specialists takes 6–12 months. Our AI Pods are staffed, operational, and delivering in weeks.',
              },
              {
                icon: Cpu,
                title: 'Your platforms, made intelligent',
                description: 'We don\'t ask you to change platforms. We add our intelligence and agentic layer on top of the enterprise systems you already run.',
              },
            ].map((item) => (
              <div key={item.title} className="card">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-brand-teal/10 text-brand-teal shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
