import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SolutionJsonLd } from '@/app/json-ld';

// Existing components (used for non-enriched SAs)
import { SolutionHero } from '@/components/sections/solution/SolutionHero';
import { SolutionCapabilities } from '@/components/sections/solution/SolutionCapabilities';
import { SolutionIP } from '@/components/sections/solution/SolutionIP';
import { SolutionMetrics } from '@/components/sections/solution/SolutionMetrics';
import { SolutionMarket } from '@/components/sections/solution/SolutionMarket';
import { SolutionExpansion } from '@/components/sections/solution/SolutionExpansion';
import { SolutionAdvisoryCTA } from '@/components/sections/solution/SolutionAdvisoryCTA';

// New enriched components
import { SolutionChallenge } from '@/components/sections/solution/SolutionChallenge';
import { SolutionValueDrivers } from '@/components/sections/solution/SolutionValueDrivers';
import { SolutionPodModel } from '@/components/sections/solution/SolutionPodModel';
import { SolutionTechStack } from '@/components/sections/solution/SolutionTechStack';
import { SolutionProofPoints } from '@/components/sections/solution/SolutionProofPoints';
import { SolutionMarketContext } from '@/components/sections/solution/SolutionMarketContext';
import { SolutionExpansionPath } from '@/components/sections/solution/SolutionExpansionPath';
import { SolutionAdvisoryExtended } from '@/components/sections/solution/SolutionAdvisoryExtended';

import { solutionAreas, getSolutionBySlug, hasEnrichedContent } from '@/data/solutions';
import drupalClient from '@/utils/drupal-client';
import { AgentPipelineFlow, MetricsComparison } from '@/components/visuals';
import { TestimonialCard } from '@/components/visuals/TestimonialCard';
import { testimonials } from '@/data/content';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Fetch solution data: CMS first, static fallback only when CMS is off.
 * When CMS is enabled, ALL content comes from Drupal — no static merge.
 */
async function getSolutionData(slug: string) {
  // Try CMS first
  const cmsData = await drupalClient.getSolutionBySlug(slug);
  if (cmsData) return cmsData;

  // Fallback to static when CMS is disabled or unreachable
  return getSolutionBySlug(slug) || null;
}

export async function generateStaticParams() {
  return solutionAreas.map((sa) => ({ slug: sa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sa = await getSolutionData(slug);
  if (!sa) return {};
  return {
    title: sa.seo?.metaTitle || `${sa.name} — ${sa.tagline}`,
    description: sa.seo?.metaDescription || sa.headline,
    openGraph: {
      title: sa.seo?.metaTitle || `${sa.name} — ${sa.tagline} | Tvameva`,
      description: sa.seo?.metaDescription || sa.headline,
    },
  };
}

export default async function SolutionAreaPage({ params }: Props) {
  const { slug } = await params;
  const sa = await getSolutionData(slug);
  if (!sa) notFound();
  const isEnriched = hasEnrichedContent(sa);
  return (
    <>
      <SolutionJsonLd
        name={sa.seo?.metaTitle || sa.name}
        description={sa.seo?.metaDescription || sa.headline}
        url={`https://tvameva.ai/solutions/${sa.slug}`}
      />
      <Navbar />
      <main>
        <SolutionHero solution={sa} />
        {isEnriched ? (
          <>
            <SolutionMarketContext solution={sa} />
            <SolutionChallenge solution={sa} />
            {sa.workflowSteps && (
              <section className="section-padding bg-brand-navy-light/30">
                <div className="section-container">
                  <AgentPipelineFlow data={sa.workflowSteps} />
                </div>
              </section>
            )}
            {sa.metricsComparison && (
              <section className="section-padding">
                <div className="section-container">
                  <MetricsComparison data={sa.metricsComparison} />
                </div>
              </section>
            )}
            <SolutionValueDrivers solution={sa} />
            <SolutionTechStack solution={sa} />
            <SolutionProofPoints solution={sa} testimonials={testimonials.filter((t) => t.solutionArea === sa.slug)} />
            <SolutionAdvisoryExtended solution={sa} />
          </>
        ) : (
          <>
            <SolutionCapabilities solution={sa} />
            <SolutionIP solution={sa} />
            <SolutionMetrics solution={sa} />
            <SolutionMarket solution={sa} />
            <SolutionExpansion solution={sa} />
            <SolutionAdvisoryCTA solution={sa} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
