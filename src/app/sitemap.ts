import type { MetadataRoute } from 'next';

const BASE_URL = process.env.SITE_URL || 'https://tvameva.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/how-we-deliver',
    '/results',
    '/advisory',
    '/advisory/ai-maturity',
    '/contact',
    '/solutions',
    '/partners',
    '/careers',
    '/privacy',
    '/terms',
  ];

  const solutionSlugs = ['engageos', 'insightlens', 'propeledge'];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path.startsWith('/solutions') ? 0.9 : 0.7,
  }));

  solutionSlugs.forEach((slug) => {
    entries.push({
      url: `${BASE_URL}/solutions/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  return entries;
}
