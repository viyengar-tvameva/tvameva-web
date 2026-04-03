import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Tvameva terms of service — governing your use of tvameva.ai.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-10">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md font-display font-bold text-white">Terms of Service</h1>
            <p className="mt-4 text-brand-gray-400">Last updated: April 2026</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container max-w-3xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Acceptance of Terms</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  By accessing tvameva.ai, you agree to these terms of service. If you do not agree,
                  please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Services</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  Tvameva provides AI-native solution delivery services across enterprise platforms including
                  Acquia/Drupal, Google Cloud Platform, Salesforce, Algolia, and Threekit. Engagement terms,
                  scope, pricing, and service level agreements are governed by individual client contracts,
                  not these website terms.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Intellectual Property</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  All content on tvameva.ai — including text, graphics, logos, solution area descriptions,
                  case studies, and documentation — is the property of Tvameva and protected by intellectual
                  property laws. You may not reproduce, distribute, or create derivative works without written permission.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">AI Maturity Assessment</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  The AI Maturity Assessment provided on this website is for informational purposes only. Results
                  are based on self-reported inputs and should not be considered a formal audit or binding recommendation.
                  For detailed assessments, contact us to schedule an advisory engagement.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Limitation of Liability</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  Tvameva provides this website and its content on an &ldquo;as is&rdquo; basis. We make no warranties
                  regarding accuracy, completeness, or fitness for a particular purpose. In no event shall
                  Tvameva be liable for any indirect, incidental, or consequential damages arising from your
                  use of this website.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Governing Law</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  These terms are governed by the laws of the State of Delaware, United States, without
                  regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-4">Contact</h2>
                <p className="text-brand-gray-300 leading-relaxed">
                  For questions about these terms, contact us at{' '}
                  <a href="mailto:legal@tvameva.ai" className="text-brand-amber hover:underline">legal@tvameva.ai</a>.
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
