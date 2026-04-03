'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Send } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', linkedin: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webform_id: 'contact_inquiry',
          name: form.name,
          email: form.email,
          company: `[CAREERS] Role: ${form.role} | Phone: ${form.phone}`,
          message: form.message + (form.linkedin ? `\n\nLinkedIn: ${form.linkedin}` : ''),
          type: 'careers',
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        trackFormSubmission("careers", "careers");
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
                    { title: 'Client-Focused Forward Deployed Pods', desc: 'Dedicated cohort teams that work as forward deployed customer success teams — owning product strategy, roadmap, engineering, release, and SRE.' },
                    { title: 'AI-Led Delivery', desc: 'AI handles the volume work. You focus on architecture, strategy, and client relationships.' },
                    { title: 'Depth over breadth', desc: 'Each pod goes deep on a specific solution area — digital experience, decision intelligence, or revenue orchestration.' },
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
                <h2 className="text-section-title font-display font-semibold text-white mb-6">Join the team</h2>
                <p className="text-brand-gray-300 leading-relaxed mb-6">
                  We&apos;re looking for solution architects, platform engineers, data engineers,
                  ML engineers, and customer success leads who want to do their best work with a team
                  that values depth over breadth.
                </p>

                {submitted ? (
                  <div className="card border-brand-teal/30 text-center py-12">
                    <CheckCircle className="w-10 h-10 text-brand-teal mx-auto mb-4" />
                    <h3 className="text-lg font-display font-semibold text-white mb-2">
                      Thank you
                    </h3>
                    <p className="text-sm text-brand-gray-300">
                      We&apos;ll review your information and be in touch soon.
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
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Role of interest</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white focus:border-brand-amber focus:outline-none"
                      >
                        <option value="">Select a role...</option>
                        <option value="solution-architect">Solution Architect</option>
                        <option value="platform-engineer">Platform Engineer</option>
                        <option value="data-engineer">Data Engineer</option>
                        <option value="ml-engineer">ML Engineer</option>
                        <option value="customer-success">Customer Success Lead</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={form.linkedin}
                        onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-gray-400 uppercase tracking-wider mb-1.5">Tell us about yourself</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-brand-navy-surface border border-brand-border rounded-button text-sm text-white placeholder:text-brand-gray-600 focus:border-brand-amber focus:outline-none resize-none"
                        placeholder="What excites you about working with AI pods? Which solution area interests you?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
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
