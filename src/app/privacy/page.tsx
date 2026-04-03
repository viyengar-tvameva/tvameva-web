import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Tvameva privacy policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-10">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md font-display font-bold text-white">Privacy Policy</h1>
            <p className="mt-4 text-brand-gray-400">Last updated: April 2026</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container max-w-3xl">
            <div className="prose prose-invert prose-lg space-y-8">
              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Information We Collect</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  We collect information you provide directly, such as your name, email address, company name,
                  and message when you fill out a contact form or complete our AI Maturity Assessment. We also
                  collect standard web analytics data including pages visited, time on site, and referral sources
                  through Google Analytics (GA4).
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">How We Use Your Information</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  We use your information to respond to inquiries, schedule advisory assessments, improve our
                  website and services, and send relevant communications about our solution areas. We do not
                  sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Cookies and Tracking</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  We use cookies and similar technologies for analytics (Google Analytics), marketing attribution
                  (HubSpot), and essential website functionality. You can control cookie preferences through
                  your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Data Security</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data,
                  including encryption in transit (TLS), secure cloud infrastructure on Google Cloud Platform,
                  and access controls limiting data access to authorized personnel.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Your Rights</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  You have the right to access, correct, or delete your personal data. You may also opt out of
                  marketing communications at any time. For GDPR and CCPA requests, contact us at{' '}
                  <a href="mailto:privacy@tvameva.ai" className="text-brand-amber hover:underline">privacy@tvameva.ai</a>.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Third-Party Services</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  We use the following third-party services that may process your data: Google Analytics (analytics),
                  HubSpot (CRM and marketing), Calendly (scheduling), and Google Cloud Platform (infrastructure).
                  Each operates under their own privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Contact</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  For privacy-related inquiries, contact us at{' '}
                  <a href="mailto:privacy@tvameva.ai" className="text-brand-amber hover:underline">privacy@tvameva.ai</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
