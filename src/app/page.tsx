import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProofPointsBar } from '@/components/sections/ProofPointsBar';
import { SolutionAreasGrid } from '@/components/sections/SolutionAreasGrid';
import { DifferentiatorsSection } from '@/components/sections/DifferentiatorsSection';
import { AdvisoryCTA } from '@/components/sections/AdvisoryCTA';
import { ICPSection } from '@/components/sections/ICPSection';
import { PartnerLogos } from '@/components/sections/PartnerLogos';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProofPointsBar />
        <PartnerLogos />
        <SolutionAreasGrid />
        <DifferentiatorsSection />
        <ICPSection />
        <AdvisoryCTA />
      </main>
      <Footer />
    </>
  );
}
