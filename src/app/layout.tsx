import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Tvameva — AI-Native Solutions for Enterprise Platforms',
    template: '%s | Tvameva',
  },
  description:
    'Five AI-native solution areas. Dedicated pods of 5–7 specialists. Outcome-based pricing. We go deep on the platforms you already use—Drupal, Google Cloud, Salesforce, Algolia, Threekit.',
  keywords: [
    'AI solutions',
    'enterprise AI',
    'AI-enabled pods',
    'outcome-based pricing',
    'Drupal modernization',
    'Salesforce Agentforce',
    'Google Cloud analytics',
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
      'Five AI-native solution areas. Dedicated pods. Outcome-based pricing. Results, not timesheets.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tvameva' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tvameva — AI-Native Solutions for Enterprise Platforms',
    description: 'Five AI-native solution areas. Dedicated pods. Outcome-based pricing.',
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
      </body>
    </html>
  );
}
