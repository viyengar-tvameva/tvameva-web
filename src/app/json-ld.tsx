/**
 * JSON-LD Structured Data for SEO and AEO (Answer Engine Optimization)
 * Helps Google, Bing, and AI search engines understand our content structure
 */

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tvameva',
    url: 'https://tvameva.ai',
    logo: 'https://tvameva.ai/og-image.png',
    description: 'AI-native solutions provider delivering EngageOS, InsightLens, and PropelEdge through dedicated AI pods with outcome-based pricing.',
    foundingDate: '2024',
    serviceType: ['AI Consulting', 'Enterprise Software Implementation', 'Digital Experience Modernization', 'Analytics & Decision Intelligence', 'Revenue Orchestration', 'Proposal Automation'],
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://tvameva.ai/contact',
    },
    knowsAbout: [
      'AI-native enterprise solutions',
      'Digital experience modernization',
      'Acquia Drupal implementation',
      'Headless CMS architecture',
      'Google Cloud analytics consulting',
      'BigQuery implementation',
      'Vertex AI consulting',
      'Decision intelligence',
      'Executive scorecards',
      'Conversational analytics',
      'Proposal automation',
      'Revenue orchestration',
      'AI pod delivery model',
      'Outcome-based pricing',
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'EngageOS — Digital Experience Modernization',
        description: 'AI-powered digital experience platform modernization on Acquia and Drupal with AI search, personalization, and visual commerce.',
        url: 'https://tvameva.ai/solutions/engageos',
      },
      {
        '@type': 'Offer',
        name: 'InsightLens — AI-Native Decision Intelligence',
        description: 'Predictive and prescriptive analytics on Google Cloud with conversational AI, executive scorecards, and ML model deployment.',
        url: 'https://tvameva.ai/solutions/insightlens',
      },
      {
        '@type': 'Offer',
        name: 'PropelEdge — AI-Native Revenue Orchestration',
        description: 'AI-powered revenue orchestration that coordinates solution engineering, ABM, sales, delivery, finance, and partners into a single agentic workflow.',
        url: 'https://tvameva.ai/solutions/propeledge',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SolutionJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Tvameva',
      url: 'https://tvameva.ai',
    },
    serviceType: 'AI Solutions Consulting',
    areaServed: 'Worldwide',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
