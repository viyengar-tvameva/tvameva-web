'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Send, Calendar, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const drupalUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${drupalUrl}/webform_rest/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webform_id: 'contact_inquiry',
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand" />
          <div className="relative section-container">
            <h1 className="text-hero-md font-display font-bold text-white max-w-2xl">
              Let&apos;s start a conversation.
            </h1>
            <p className="mt-4 text-lg text-brand-gray-300 max-w-xl">
              Whether you&apos;re exploring solutions, requesting an assessment,
              or interested in joining our team — we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-xl mx-auto">
              <div>

                {submitted ? (
                  <div className="card border-brand-teal/30 text-center py-12">
                    <CheckCircle className="w-10 h-10 text-brand-teal mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-white mb-2">
                      Thank you
                    </h3>
                    <p className="text-sm text-brand-gray-300">
                      We&apos;ll be in touch within one business day.
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

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
