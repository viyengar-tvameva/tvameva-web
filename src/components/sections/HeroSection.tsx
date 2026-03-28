'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-brand" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,166,35,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative section-container pt-24 lg:pt-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-amber/10 border border-brand-amber/20 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
            <span className="text-xs font-mono text-brand-amber tracking-wider uppercase">
              AI-native solutions provider
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-hero-lg lg:text-hero-xl font-display font-bold text-white text-balance">
            Your enterprise runs on platforms.{' '}
            <span className="gradient-text">We make them intelligent.</span>
          </h1>

          {/* Subhead */}
          <p className="mt-6 text-lg lg:text-xl text-brand-gray-300 leading-relaxed max-w-2xl">
            Five AI-native solution areas. Dedicated pods that combine human expertise
            with AI-first delivery. Outcome-based pricing that aligns our success with yours.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link href="/advisory/ai-maturity" className="btn-primary text-base px-8 py-4">
              Take the AI Maturity Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="#solutions" className="btn-secondary text-base px-8 py-4">
              Explore Solutions
            </Link>
          </div>

          {/* Platform partners */}
          <div className="mt-16 flex items-center gap-8 text-brand-gray-400">
            <span className="text-xs font-mono uppercase tracking-wider">Deep on</span>
            <div className="flex items-center gap-6 text-sm font-display text-brand-gray-300">
              {['Acquia', 'Google Cloud', 'Salesforce', 'Algolia', 'Threekit'].map((partner) => (
                <span key={partner} className="hidden sm:inline opacity-60 hover:opacity-100 transition-opacity">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
