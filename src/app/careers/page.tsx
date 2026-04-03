import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Tvameva — build AI-native solutions for enterprise platforms with dedicated pods and outcome-based delivery.',
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-10">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white max-w-3xl">
              Build what matters. <span className="gradient-text">With people who care.</span>
            </h1>
            <p className="mt-6 text-lg text-brand-gray-300 max-w-2xl">
              We&apos;re assembling teams of specialists who go deep on enterprise platforms and deliver
              outcomes — not timesheets. If that sounds like your kind of work, we want to hear from you.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-6">How we work</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Dedicated pods', desc: 'Small, stable teams of 5–7 specialists. You own outcomes from day one.' },
                    { title: 'AI-augmented delivery', desc: 'AI handles the volume work. You focus on architecture, strategy, and client relationships.' },
                    { title: 'Platform depth', desc: 'Each pod goes deep on a specific ecosystem — Acquia, GCP, Salesforce, Algolia, or Threekit.' },
                    { title: 'Outcome-based culture', desc: 'We measure success by client results, not by hours logged.' },
                  ].map((item) => (
                    <div key={item.title} className="card p-5">
                      <h3 className="font-display font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-brand-gray-300">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-section-title font-display font-semibold text-white mb-6">Get in touch</h2>
                <p className="text-brand-gray-300 leading-relaxed mb-6">
                  We&apos;re always looking for solution architects, platform engineers, data engineers,
                  ML engineers, and customer success leads who want to do their best work with a team
                  that values depth over breadth.
                </p>
                <p className="text-brand-gray-300 leading-relaxed mb-8">
                  If you&apos;re interested in joining a pod, send us a note. Tell us which platform
                  ecosystem excites you and what kind of outcomes you want to deliver.
                </p>
                <Link href="/contact" className="btn-primary">
                  Contact Us About Opportunities
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
