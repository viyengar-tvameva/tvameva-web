import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Bot, Users, Shield, Zap, Target, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About — AI-Native Solutions Provider',
  description: 'Tvameva inverted the delivery model. AI agents do the work. Humans govern the outcome. Three solution areas. Outcome-based pricing. Built for enterprise.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-amber/5 rounded-full blur-[120px]" />
          <div className="relative section-container">
            <div className="max-w-3xl">
              <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                <em className="not-italic text-brand-amber/80">Tvameva</em> — you alone.
                <br />
                <span className="text-brand-gray-400 text-lg lg:text-xl font-normal mt-2 block">The name. The meaning. The promise.</span>
                <span className="gradient-text mt-4 block">Tomorrow&apos;s enterprise.</span>
                <span className="text-brand-gray-400 text-lg lg:text-xl font-normal block">The what. The how.</span>
              </h1>
              <div className="mt-8 max-w-2xl">
                <p className="text-lg text-brand-gray-300 leading-relaxed mb-6">
                  In a world drowning in AI promises, we made a choice: do three things so well
                  that the results speak louder than any pitch.
                </p>
                <div className="space-y-3 mb-8 border-l-2 border-brand-amber/30 pl-5">
                  <p className="text-lg text-white font-display">Arm your leadership with intelligence that sees around corners.</p>
                  <p className="text-lg text-white font-display">Make your customer&apos;s experience the reason they never look elsewhere.</p>
                  <p className="text-lg text-white font-display">Build a revenue engine so fast, your competitors wonder what changed.</p>
                </div>
                <p className="text-lg text-brand-gray-300 leading-relaxed">
                  We bring the enthusiasm of builders, the courage of people who burned their own playbook
                  first, and the conviction that only comes from living the model before selling it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Origin Story */}
        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-section-title font-display font-bold text-white mb-6">
                  What we do
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      number: '01',
                      title: 'Equip leadership to build the enterprise of the future',
                      body: 'Your board is asking about AI. Your competitors are deploying it. Your data is everywhere and your decisions are still based on last quarter. InsightLens gives your leadership team what they actually need: AI that reasons over your enterprise data, answers questions in plain language, predicts what\'s coming, and tells you what to do about it — not another dashboard to ignore.',
                    },
                    {
                      number: '02',
                      title: 'Make your customer\'s experience your unfair advantage',
                      body: 'Your buyers compare you to the best digital experience they\'ve ever had — not your closest competitor. Fragmented platforms and disconnected search lose deals before your sales team even knows. EngageOS rebuilds the digital experience with AI-powered discovery, persona-driven journeys, and visual commerce that lets buyers configure, compare, and convert without friction.',
                    },
                    {
                      number: '03',
                      title: 'Build a revenue engine that outpaces the market',
                      body: 'Every enterprise deal is a coordination problem disguised as a sales problem. PropelEdge strips away the disguise — unifying every team, every input, every deliverable into a single orchestrated workflow. What emerges is an organization that actually moves at the speed of its ambition, winning at rates that redefine what the market thought was possible.',
                    },
                  ].map((item) => (
                    <div key={item.number} className="flex items-start gap-4">
                      <span className="text-2xl font-display font-bold text-brand-amber/30 shrink-0 w-8">{item.number}</span>
                      <div>
                        <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-brand-gray-300 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-section-title font-display font-bold text-white mb-6">
                  How we show up
                </h2>
                <div className="space-y-4 text-brand-gray-300 leading-relaxed mb-8">
                  <p>
                    We didn&apos;t ask anyone to trust a new model. We bet our own company on it.
                    Every page you&apos;re reading, every proposal we send, every engagement we deliver —
                    built by the same AI Pod we&apos;re offering you. We burned our own playbook before
                    asking you to burn yours.
                  </p>
                  <p className="text-white font-display text-lg border-l-2 border-brand-amber/40 pl-4 mt-4">
                    That&apos;s not confidence. It&apos;s proof. And we show up with the kind of conviction
                    that only comes from having reinvented yourself first.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: Users,
                      label: 'Your outcome is the only metric',
                      desc: 'What we build, how we price, what we measure — every decision starts and ends with the result you need. If you don\'t win, we don\'t win.',
                    },
                    {
                      icon: Bot,
                      label: 'AI does the work. All of it.',
                      desc: 'Engineering, testing, security, content, deployment, monitoring — AI agents run the show around the clock. Not augmenting humans. Replacing the need for an army.',
                    },
                    {
                      icon: Zap,
                      label: 'A handful of wizards hold the reins',
                      desc: 'Exceptional humans who don\'t write code — they govern quality, own your relationship, and make the calls that machines shouldn\'t. Few, deliberate, and irreplaceable.',
                    },
                    {
                      icon: Target,
                      label: 'We eat what we kill',
                      desc: 'Outcome-based pricing means our revenue is tied to your results. Conversion. Decision velocity. Pipeline capacity. Not hours billed. Not seats filled.',
                    },
                    {
                      icon: Shield,
                      label: 'Security never sleeps',
                      desc: 'Every commit scanned. Every dependency audited. Every deployment validated. Not a quarterly checkbox — a continuous, autonomous discipline.',
                    },
                  ].map((item) => (
                    <div key={item.label} className="card p-4 flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-brand-amber/10 shrink-0">
                        <item.icon className="w-4 h-4 text-brand-amber" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-sm mb-1">
                          {item.label}
                        </h3>
                        <p className="text-xs text-brand-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="section-padding">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              Curious what we burned — and what we built from the ashes?
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              Talk to the founders. 30 minutes. No pitch. Just a conversation about
              what&apos;s possible when you stop playing it safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/varada-tvameva/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 inline-flex items-center"
              >
                Book a 30-Minute Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
