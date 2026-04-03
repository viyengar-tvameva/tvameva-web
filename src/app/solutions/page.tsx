import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SolutionAreasGrid } from '@/components/sections/SolutionAreasGrid';

export const metadata: Metadata = {
  title: 'Solutions — AI-Native Solution Areas',
  description: 'EngageOS, InsightLens, PropelEdge. Each partner-anchored, each AI-native, each in a growing market.',
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white max-w-3xl">
              Three Solutions, One Mission — <span className="gradient-text">Tomorrow&apos;s enterprise.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-gray-300 max-w-2xl">
              AI-powered intelligence layered on top of the platforms you already run —
              delivered by AI pods, priced on your outcomes.
            </p>
          </div>
        </section>
        <SolutionAreasGrid />
      </main>
      <Footer />
    </>
  );
}
