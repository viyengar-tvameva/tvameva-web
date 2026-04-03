import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Analytics } from '@/components/common/Analytics';
import { HubSpotTracking } from '@/components/common/HubSpot';

export const metadata: Metadata = {
  title: {
    default: 'Tvameva — AI-Native Solutions for Enterprise Platforms',
    template: '%s | Tvameva',
  },
  description:
    'AI-native solutions provider. EngageOS, InsightLens, and PropelEdge — delivered by dedicated AI pods, priced on measurable outcomes.',
  keywords: [
    'AI solutions',
    'enterprise AI',
    'AI pods',
    'outcome-based pricing',
    'digital experience',
    'decision intelligence',
    'revenue orchestration',
    'Algolia search',
    'Threekit configurator',
    'digital transformation',
  ],
  authors: [{ name: 'Tvameva' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tvameva.ai',
    siteName: 'Tvameva',
    title: 'Tvameva — AI-Native Solutions for Enterprise Platforms',
    description:
      'AI-native solutions provider. EngageOS, InsightLens, and PropelEdge — delivered by dedicated AI pods, priced on measurable outcomes.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tvameva' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tvameva — AI-Native Solutions for Enterprise Platforms',
    description: 'AI-native. Outcome-anchored. Three solutions for tomorrow\'s enterprise.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-navy text-white font-body antialiased min-h-screen">
        {children}
        <Analytics />
        <HubSpotTracking />
      </body>
    </html>
  );
}
