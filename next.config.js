/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cms.tvameva.ai'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  env: {
    NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.DRUPAL_BASE_URL || 'http://localhost:8080',
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
