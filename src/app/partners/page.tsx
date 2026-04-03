import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Partner Ecosystem',
  description: 'Tvameva partners with Acquia, Google Cloud, Salesforce, Algolia, and Threekit to deliver AI-native solutions on the platforms you already use.',
};

const partners = [
  {
    name: 'Acquia',
    platform: 'Digital Experience Platform',
    description: 'Enterprise-grade Drupal hosting, Customer Data Platform, Personalization, and Site Studio. The foundation for EngageOS digital experience modernization.',
    solutionArea: 'EngageOS',
    href: '/solutions/engageos',
  },
  {
    name: 'Google Cloud Platform',
    platform: 'Cloud & AI Infrastructure',
    description: 'BigQuery, Vertex AI, Looker, Dataflow, and Cloud Composer. The analytics and ML stack powering InsightLens predictive intelligence.',
    solutionArea: 'InsightLens',
    href: '/solutions/insightlens',
  },
  {
    name: 'Salesforce',
    platform: 'CRM & Agentforce',
    description: 'Salesforce CRM, Agentforce AI agents, and the broader Salesforce ecosystem. Core platform for ResolveIQ enterprise app support.',
    solutionArea: 'ResolveIQ',
    href: null,
  },
  {
    name: 'Algolia',
    platform: 'Search & Discovery',
    description: 'AI-powered NeuralSearch, personalized ranking, and search analytics. Integrated across EngageOS and SearchCore for intelligent product and content discovery.',
    solutionArea: 'SearchCore',
    href: null,
  },
  {
    name: 'Threekit',
    platform: 'Visual Commerce',
    description: '3D product configuration, AR visualization, and CPQ integration. The visual commerce engine behind VisualForge and EngageOS configurator experiences.',
    solutionArea: 'VisualForge',
    href: null,
  },
];

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-10">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white max-w-3xl">
              Built on platforms you <span className="gradient-text">already trust.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-gray-300 max-w-2xl">
              Each Tvameva solution area is anchored to a specific platform ecosystem. We go deep
              on the stack you already run — so you get results, not a learning curve.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div key={partner.name} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-card-title font-display font-semibold text-white">{partner.name}</h3>
                    <span className="platform-badge">{partner.platform}</span>
                  </div>
                  <p className="text-sm text-brand-gray-300 leading-relaxed mb-4">{partner.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-brand-gray-400">Powers: {partner.solutionArea}</span>
                    {partner.href && (
                      <Link href={partner.href} className="text-sm text-brand-amber hover:underline">
                        Explore →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
