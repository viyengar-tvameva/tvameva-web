import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SolutionAreasGrid } from '@/components/sections/SolutionAreasGrid';

export const metadata: Metadata = {
  title: 'Solutions — Five AI-Native Solution Areas',
  description: 'EngageOS, InsightLens, ResolveIQ, SearchCore, VisualForge. Each partner-anchored, each AI-native, each in a growing market.',
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
              Five solution areas. Each <span className="gradient-text">partner-anchored.</span> Each AI-native.
            </h1>
            <p className="mt-6 text-lg text-brand-gray-300 max-w-2xl">
              We don't do generic digital transformation. Each solution area is built on a
              specific platform ecosystem—with dedicated pods, reusable IP, and outcome-based pricing.
            </p>
          </div>
        </section>
        <SolutionAreasGrid />
      </main>
      <Footer />
    </>
  );
}
