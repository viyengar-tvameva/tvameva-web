'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Send, Calendar, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md font-display font-bold text-white max-w-2xl">
              Let's talk about what AI can do for your platforms.
            </h1>
            <p className="mt-4 text-lg text-brand-gray-300 max-w-xl">
              Before we propose a solution, we need to understand where you are today.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* General Inquiry */}
              <div>
                <h2 className="text-xl font-display font-semibold text-white mb-6">
                  General inquiry
                </h2>

                {submitted ? (
                  <div className="card border-brand-teal/30 text-center py-12">
                    <CheckCircle className="w-10 h-10 text-brand-teal mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-white mb-2">
                      Thank you
                    </h3>
                    <p className="text-sm text-brand-gray-300">
                      We'll be in touch within one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Work email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Company</label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">How can we help?</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none resize-none"
                        placeholder="Tell us about your current platforms and where you're looking for help..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Schedule Assessment */}
              <div>
                <h2 className="text-xl font-display font-semibold text-white mb-6">
                  Schedule an assessment
                </h2>
                <div className="card border-brand-amber/20 bg-gradient-to-br from-brand-amber/5 to-transparent">
                  <Calendar className="w-8 h-8 text-brand-amber mb-4" />
                  <h3 className="text-lg font-display font-semibold text-white mb-2">
                    Advisory assessment call
                  </h3>
                  <p className="text-sm text-brand-gray-300 leading-relaxed mb-6">
                    30-minute conversation to identify the right assessment for your organization.
                    Our team will walk you through the process, scope, and expected outcomes.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'AI Maturity Assessment',
                      'Pod Readiness Evaluation',
                      'DXP Readiness Assessment',
                      'Data & AI Readiness Assessment',
                      'Enterprise App Support Audit',
                      'Search & Discovery Audit',
                      'Visual Commerce Assessment',
                    ].map((name) => (
                      <div key={name} className="flex items-center gap-2 text-sm text-brand-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-amber shrink-0" />
                        {name}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-brand-gray-500 mb-4">$25,000–$50,000 per assessment</p>
                  {/* Calendly embed placeholder — replace with actual Calendly URL */}
                  <a
                    href="https://calendly.com/tvameva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center"
                  >
                    Book a Time
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
