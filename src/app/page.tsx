import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { SolutionAreasGrid } from '@/components/sections/SolutionAreasGrid';
import { DifferentiatorsSection } from '@/components/sections/DifferentiatorsSection';
import { AdvisoryCTA } from '@/components/sections/AdvisoryCTA';
import { ICPSection } from '@/components/sections/ICPSection';
import drupalClient from '@/utils/drupal-client';

export default async function HomePage() {
  const cmsDifferentiators = await drupalClient.getDifferentiators();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SolutionAreasGrid />
        <DifferentiatorsSection data={cmsDifferentiators ?? undefined} />
        <ICPSection />
        <AdvisoryCTA />
      </main>
      <Footer />
    </>
  );
}
