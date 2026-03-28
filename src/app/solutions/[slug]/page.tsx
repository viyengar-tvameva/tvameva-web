import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SolutionHero } from '@/components/sections/solution/SolutionHero';
import { SolutionCapabilities } from '@/components/sections/solution/SolutionCapabilities';
import { SolutionIP } from '@/components/sections/solution/SolutionIP';
import { SolutionMetrics } from '@/components/sections/solution/SolutionMetrics';
import { SolutionMarket } from '@/components/sections/solution/SolutionMarket';
import { SolutionExpansion } from '@/components/sections/solution/SolutionExpansion';
import { SolutionAdvisoryCTA } from '@/components/sections/solution/SolutionAdvisoryCTA';
import { solutionAreas, getSolutionBySlug } from '@/data/solutions';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return solutionAreas.map((sa) => ({ slug: sa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sa = getSolutionBySlug(params.slug);
  if (!sa) return {};
  return {
    title: `${sa.name} — ${sa.tagline}`,
    description: sa.headline,
    openGraph: {
      title: `${sa.name} — ${sa.tagline} | Tvameva`,
      description: sa.headline,
    },
  };
}

export default function SolutionAreaPage({ params }: Props) {
  const sa = getSolutionBySlug(params.slug);
  if (!sa) notFound();

  return (
    <>
      <Navbar />
      <main>
        <SolutionHero solution={sa} />
        <SolutionCapabilities solution={sa} />
        <SolutionIP solution={sa} />
        <SolutionMetrics solution={sa} />
        <SolutionMarket solution={sa} />
        <SolutionExpansion solution={sa} />
        <SolutionAdvisoryCTA solution={sa} />
      </main>
      <Footer />
    </>
  );
}
