'use client';

import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HomeHeroVisual } from '@/components/visuals/HomeHeroVisual';
import { trackCalendlyClick, trackCTAClick } from '@/utils/analytics';

export function HeroSection() {
  const [showContent, setShowContent] = useState(false);

  const handleReveal = useCallback(() => {
    setShowContent(true);
    // Hide content before next cycle starts (cycle is 22s, headline phase starts at 12.5s)
    setTimeout(() => setShowContent(false), 8500);
  }, []);

  return (
    <section className="relative h-[100vh] flex flex-col items-center justify-start pt-16 overflow-hidden">
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

      {/* The storm animation — full screen */}
      <div className="relative w-full max-w-6xl mx-auto px-6">
        <HomeHeroVisual onReveal={handleReveal} />
      </div>

      {/* Headline + subheadline + CTA — staggered reveal */}
      <div className="relative text-center px-8 z-10 -mt-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-hero-md lg:text-hero-lg font-display font-bold text-white text-balance"
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
        >
          Your enterprise runs on platforms.{' '}
          <span className="gradient-text">We make them intelligent.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg lg:text-xl text-brand-gray-300 leading-relaxed max-w-2xl mx-auto"
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 20,
          }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Three AI-native solutions that equip your leadership with decision intelligence,
          transform your customer experience, and build a revenue engine that outpaces the market.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 15,
          }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="https://calendly.com/varada-tvameva/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
            onClick={() => trackCalendlyClick('homepage')}
          >
            Book a 30-Minute Demo
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          <a href="#solutions" className="btn-secondary text-base px-8 py-4" onClick={() => trackCTAClick('explore_solutions', 'homepage', '#solutions')}>
            Explore Solutions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
