import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { podRoles as staticPodRoles } from '@/data/content';
import { ArrowRight, Bot, Users, Zap, TrendingUp, Clock, DollarSign, Shield, Target, ShieldCheck, Lock, Eye, Scan, AlertTriangle } from 'lucide-react';
import { MetricsComparison, PodCompositionDiagram } from '@/components/visuals';
import Link from 'next/link';
import drupalClient from '@/utils/drupal-client';

export const metadata: Metadata = {
  title: 'How We Deliver — Human-Governed AI Pods',
  description: 'AI agents do the work. Humans govern quality. A delivery model where specialized agents handle engineering, architecture, testing, and program management — with a small human team guiding outcomes.',
};

export default async function HowWeDeliverPage() {
  const cmsPodRoles = await drupalClient.getPodRoles();
  const podRoles = cmsPodRoles ?? staticPodRoles;

  const agentRoles = podRoles.filter((r: any) => r.type === 'agent' || !r.type);
  const humanRoles = podRoles.filter((r: any) => r.type === 'human');

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="absolute top-20 right-0 w-96 h-96 rounded-full border border-brand-amber/10 opacity-40" />
          <div className="absolute bottom-0 left-20 w-64 h-64 rounded-full border border-brand-teal/10 opacity-30" />
          <div className="relative section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="font-mono text-xs text-brand-amber uppercase tracking-widest mb-4">
                  The Delivery Model
                </p>
                <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white">
                  AI agents do the work.{' '}
                  <span className="gradient-text">Humans govern the outcome.</span>
                </h1>
                <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
                  Most service providers bolt AI onto human teams and call it transformation.
                  We inverted the model. Specialized AI agents handle engineering, architecture,
                  testing, security, and program management. A small human team of 2–3 experts governs
                  quality, owns client relationships, and makes the decisions that matter.
                </p>
                <p className="mt-4 text-base text-brand-amber/80 font-display">
                  The result: 60–70% lower cost, 3–5x faster delivery, and quality that improves
                  with every engagement.
                </p>
              </div>

              {/* Pod composition visual */}
              <div className="hidden lg:block">
                <PodCompositionDiagram
                  agentRoles={agentRoles.map((r) => ({ title: r.title, type: 'agent' as const }))}
                  humanRoles={humanRoles.map((r) => ({ title: r.title, type: 'human' as const }))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Shift — Visual Comparison */}
        <section className="section-padding border-b border-brand-border">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                The model everyone else is running — and why it doesn&apos;t scale
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Traditional delivery puts humans at the center and AI at the margins. We put AI agents
                at the center and humans at the governance layer. The difference isn&apos;t incremental — it&apos;s structural.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Traditional */}
              <div className="card border-brand-gray-600/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gray-600/50" />
                <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider mb-4">Traditional: AI-Assisted Human Teams</p>
                <p className="text-[11px] text-brand-gray-600 mb-4 italic">Typical 12–18 month enterprise platform program, blended onshore/offshore</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-brand-gray-400">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>8–12 FTEs (3–4 onshore, 5–8 offshore)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-brand-gray-400">
                    <Bot className="w-4 h-4 shrink-0" />
                    <span>AI assists at the margins — Copilot, code suggestions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-brand-gray-400">
                    <DollarSign className="w-4 h-4 shrink-0" />
                    <span>$1.2M–$2.2M/year fully-loaded (blended rate $120–$180/hr)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-brand-gray-400">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>6–9 months to first production release</span>
                  </div>
                </div>
                <p className="text-xs text-brand-gray-500 italic">
                  Same pyramid. Same cost structure. AI makes it 10–30% faster at best.
                </p>
              </div>

              {/* Ours */}
              <div className="card border-brand-amber/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-amber to-brand-teal" />
                <p className="text-xs font-mono text-brand-amber uppercase tracking-wider mb-4">Tvameva: Human-Governed AI Pod</p>
                <p className="text-[11px] text-brand-amber/60 mb-4 italic">Same scope, same platform complexity — fundamentally different economics</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-white">
                    <Bot className="w-4 h-4 shrink-0 text-brand-amber" />
                    <span>7 AI agents as the primary workforce</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white">
                    <Users className="w-4 h-4 shrink-0 text-brand-teal" />
                    <span>2–3 human experts governing quality and outcomes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white">
                    <DollarSign className="w-4 h-4 shrink-0 text-brand-teal" />
                    <span>$400K–$700K/year (outcome-based, not hourly)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white">
                    <Clock className="w-4 h-4 shrink-0 text-brand-teal" />
                    <span>2–4 months to first production release</span>
                  </div>
                </div>
                <p className="text-xs text-brand-amber/80 italic">
                  Different architecture. Different economics. Measurably better outcomes.
                </p>
              </div>
            </div>

            {/* Detailed metrics comparison */}
            <MetricsComparison data={{
              title: 'Side-by-side: same scope, different model',
              oldLabel: 'Traditional SI',
              newLabel: 'AI Pod',
              metrics: [
                { label: 'Team size (12-month program)', oldValue: '8–12 FTEs', newValue: '2–3 humans + 7 agents', improvement: '70% fewer humans' },
                { label: 'Annual delivery cost', oldValue: '$1.2M–$2.2M', newValue: '$400K–$700K', improvement: '60–70% lower' },
                { label: 'Time to first release', oldValue: '6–9 months', newValue: '2–4 months', improvement: '3x faster' },
                { label: 'Code + test generation', oldValue: 'Manual (AI-assisted)', newValue: '80%+ agent-generated', improvement: 'Fundamentally different' },
                { label: 'Security scanning', oldValue: 'Quarterly pen test', newValue: 'Every commit', improvement: 'Continuous' },
                { label: 'Pricing model', oldValue: 'T&M / hourly rates', newValue: 'Outcome-based', improvement: 'Aligned incentives' },
              ],
            }} />
          </div>
        </section>

        {/* AI Pod Composition */}
        <section id="pod" className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                Inside the AI Pod
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Each pod is a team of specialized AI agents — purpose-built for their role,
                operating continuously, and improving with every engagement. A small human
                governance team reviews critical decisions and owns client outcomes.
              </p>
            </div>

            {/* Agent Layer */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-brand-amber/10">
                  <Bot className="w-5 h-5 text-brand-amber" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">AI Agent Layer</h3>
                  <p className="text-xs text-brand-gray-400">The primary workforce — 7 specialized agents</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentRoles.map((role) => (
                  <div key={role.title} className="card border-brand-amber/20 hover:border-brand-amber/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-4 h-4 text-brand-amber" />
                      <h4 className="text-sm font-display font-semibold text-white">{role.title}</h4>
                    </div>
                    <p className="text-xs text-brand-gray-300 mb-3 leading-relaxed">{role.responsibility}</p>
                    <div className="px-3 py-2 bg-brand-navy-surface rounded-md border border-brand-border/50">
                      <p className="text-[11px] font-mono text-brand-teal/80 leading-relaxed">
                        {role.aiAugmentation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Layer */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-brand-teal/10">
                  <Shield className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">Human Governance Layer</h3>
                  <p className="text-xs text-brand-gray-400">2–3 experts who govern quality and own outcomes</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {humanRoles.map((role) => (
                  <div key={role.title} className="card border-brand-teal/20 hover:border-brand-teal/40 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-brand-teal" />
                      <h4 className="text-sm font-display font-semibold text-white">{role.title}</h4>
                    </div>
                    <p className="text-xs text-brand-gray-300 mb-3 leading-relaxed">{role.responsibility}</p>
                    <div className="px-3 py-2 bg-brand-navy-surface rounded-md border border-brand-border/50">
                      <p className="text-[11px] font-mono text-brand-amber/80 leading-relaxed">
                        {role.aiAugmentation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Evidence */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                The numbers behind the model
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Not projections. Not benchmarks from analyst reports. These are the economics
                we see in production — across our own operations and our client engagements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { stat: '60–70%', label: 'Lower delivery cost', context: 'vs. traditional SI model with equivalent throughput', icon: DollarSign },
                { stat: '3–5x', label: 'Faster time-to-delivery', context: 'From requirements to production deployment', icon: Clock },
                { stat: '80%+', label: 'AI-generated output', context: 'Code, tests, content, and documentation produced by agents', icon: Bot },
                { stat: '2–3', label: 'Humans per pod', context: 'Governing quality, not doing the volume work', icon: Users },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className="w-6 h-6 text-brand-amber mx-auto mb-3" />
                  <div className="text-3xl font-display font-bold text-white mb-1">{item.stat}</div>
                  <div className="text-sm font-display font-medium text-brand-amber mb-1">{item.label}</div>
                  <div className="text-xs text-brand-gray-400">{item.context}</div>
                </div>
              ))}
            </div>

            {/* Market context */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { stat: '$2.9T', context: 'Economic value unlockable by AI agents by 2030', source: 'McKinsey' },
                { stat: '57%', context: 'Of companies already running AI agents in production', source: 'G2 Enterprise AI Report' },
                { stat: '40%', context: 'Median cost-per-unit reduction with mature agent workflows', source: 'G2 Data' },
              ].map((item) => (
                <div key={item.stat} className="p-4 rounded-lg bg-brand-navy-card border border-brand-border/50">
                  <div className="text-2xl font-display font-bold text-brand-teal mb-1">{item.stat}</div>
                  <p className="text-xs text-brand-gray-300 mb-2">{item.context}</p>
                  <p className="text-[10px] font-mono text-brand-gray-500 uppercase">{item.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accelerator Arsenal */}
        <section id="accelerators" className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                The accelerator arsenal
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                Our AI pods don&apos;t start from scratch. They operate with field-tested frameworks,
                pre-built patterns, and production-proven tooling that compound across engagements.
                Every deployment makes the next one faster.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Platform Connectors',
                  description: 'Pre-built integrations between enterprise platforms — Acquia-Algolia, GCP-Salesforce, Threekit-CPQ. Eliminates 4–8 weeks of custom build per connector.',
                  tag: 'Integration IP',
                },
                {
                  title: 'Agentic Pipeline Templates',
                  description: 'Reusable multi-agent workflow patterns for common delivery scenarios — content publishing, data pipeline orchestration, proposal generation.',
                  tag: 'Agent Frameworks',
                },
                {
                  title: 'Automated Test Suites',
                  description: 'Pre-configured Playwright test batteries covering smoke, content validation, integration, performance (Web Vitals), and accessibility — deployed on every engagement.',
                  tag: 'Quality Assurance',
                },
                {
                  title: 'Content Model Scaffolding',
                  description: 'Drupal content type definitions, field mappings, JSON:API configuration, and seed scripts that stand up a headless CMS in hours, not weeks.',
                  tag: 'CMS Patterns',
                },
                {
                  title: 'GCP Analytics Starter Kit',
                  description: 'BigQuery schema templates, Composer DAG patterns, dbt model scaffolding, and Looker block library — 8–12 weeks of foundational build eliminated.',
                  tag: 'Data & AI',
                },
                {
                  title: 'Institutional Memory System',
                  description: 'Every engagement feeds the knowledge base — architecture decisions, content patterns, client feedback, competitive intelligence. The pod gets smarter with each deployment.',
                  tag: 'Compounding IP',
                },
              ].map((item) => (
                <div key={item.title} className="card group">
                  <div className="flex items-center justify-between mb-3">
                    <Zap className="w-4 h-4 text-brand-amber" />
                    <span className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider">{item.tag}</span>
                  </div>
                  <h3 className="text-sm font-display font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-brand-gray-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security-First Delivery */}
        <section id="security" className="section-padding border-t border-brand-border">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-brand-amber/10">
                  <ShieldCheck className="w-6 h-6 text-brand-amber" />
                </div>
                <p className="font-mono text-xs text-brand-amber uppercase tracking-widest">
                  Security-First Delivery
                </p>
              </div>
              <h2 className="text-section-title font-display font-bold text-white">
                Security isn&apos;t a phase. It&apos;s every phase.
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                When AI agents write code, review architecture, and deploy to production, security
                can&apos;t be an afterthought or a quarterly audit. Our Security &amp; Compliance Agent
                operates continuously — scanning every commit, auditing every dependency, and
                enforcing security policies in real time. Humans review critical findings and
                govern the security posture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Scan,
                  title: 'Continuous Vulnerability Scanning',
                  description: 'Every code change is scanned for OWASP Top 10 vulnerabilities, injection risks, XSS vectors, and insecure patterns — before it reaches a branch, not after it reaches production.',
                },
                {
                  icon: AlertTriangle,
                  title: 'Supply Chain Security',
                  description: 'Every dependency is audited against CVE databases in real time. No vulnerable package enters the build. License compliance is enforced automatically.',
                },
                {
                  icon: Lock,
                  title: 'Secrets & Credential Protection',
                  description: 'Automated detection of exposed API keys, tokens, passwords, and credentials across code, configs, and environment files. Hard-blocked from commits.',
                },
                {
                  icon: Shield,
                  title: 'Security Policy Enforcement',
                  description: 'Content guardrails prevent exposure of client names and sensitive data. CORS, CSP, and trusted host policies are validated on every deployment.',
                },
                {
                  icon: Eye,
                  title: 'Penetration Testing Automation',
                  description: 'Automated security testing against deployed endpoints — authentication bypass, privilege escalation, injection, and API abuse scenarios run on every release.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Compliance & Audit Readiness',
                  description: 'Continuous compliance posture monitoring against SOC 2, GDPR, and CCPA requirements. Audit trail of every agent action, human approval, and production change.',
                },
              ].map((item) => (
                <div key={item.title} className="card border-brand-border/50 hover:border-brand-amber/30 transition-colors">
                  <item.icon className="w-5 h-5 text-brand-amber mb-3" />
                  <h3 className="text-sm font-display font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-brand-gray-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-lg bg-brand-navy-card border border-brand-amber/20">
              <p className="text-sm text-brand-gray-300 leading-relaxed">
                <span className="text-brand-amber font-display font-semibold">The AI security advantage:</span>{' '}
                Traditional security is periodic — quarterly pen tests, annual audits, reactive patching.
                Our Security Agent operates on every commit, every dependency update, every deployment.
                The attack surface is monitored continuously, not intermittently. When new CVEs are published,
                our agent evaluates exposure within minutes — not when a consultant gets to it next quarter.
              </p>
            </div>
          </div>
        </section>

        {/* Case Study: Building tvameva.ai */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container">
            <div className="max-w-3xl">
              <p className="font-mono text-xs text-brand-teal uppercase tracking-widest mb-4">
                Case Study: Practicing What We Preach
              </p>
              <h2 className="text-section-title font-display font-bold text-white mb-6">
                How we built tvameva.ai — with our own AI Pod
              </h2>
              <div className="space-y-4 text-brand-gray-300 leading-relaxed">
                <p>
                  This website is not a marketing artifact built by an agency. It is a production
                  application built and deployed by the same AI pod model we deliver to clients —
                  and it serves as a live proof point of the approach.
                </p>
                <p>
                  The founders directed the work. AI agents handled everything else:
                  solution content creation across 3 solution areas, front-end design and engineering,
                  headless CMS integration, test automation, and cloud deployment.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {[
                  { metric: '19 pages', detail: 'Built, tested, and deployed — including 3 enriched solution area pages with 15+ sections each' },
                  { metric: '19 CMS nodes', detail: 'Solution areas, differentiators, proof points, case studies, and pod roles — all CMS-driven via Drupal JSON:API' },
                  { metric: '4 test suites', detail: 'Smoke tests, page content validation, integration checks, and Web Vitals performance testing via Playwright' },
                  { metric: '1 human', detail: 'Directing strategy, reviewing outputs, and governing quality — while agents built, tested, and deployed' },
                ].map((item) => (
                  <div key={item.metric} className="p-4 rounded-lg bg-brand-navy-card border border-brand-border/50">
                    <div className="text-lg font-display font-bold text-brand-amber mb-1">{item.metric}</div>
                    <p className="text-xs text-brand-gray-300">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-brand-amber/5 border border-brand-amber/20">
                <p className="text-sm text-brand-amber/90 italic">
                  &ldquo;The AI pod model isn&apos;t a pitch deck concept. It&apos;s how we operate.
                  Every page you&apos;re reading was created by AI agents, reviewed by a human,
                  and published through the same agentic pipeline we deploy for clients.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Outcome-Based Pricing */}
        <section id="pricing" className="section-padding">
          <div className="section-container">
            <div className="max-w-2xl mb-12">
              <h2 className="text-section-title font-display font-bold text-white">
                Outcome-based pricing
              </h2>
              <p className="mt-4 text-brand-gray-300 leading-relaxed">
                When AI agents do the volume work, the cost structure changes fundamentally.
                We pass that efficiency to you — and tie our revenue to your results, not our inputs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-lg bg-brand-teal/5 border border-brand-teal/20">
                <h3 className="font-mono text-xs text-brand-teal font-bold uppercase tracking-wider mb-4">You pay for</h3>
                <ul className="space-y-3">
                  {[
                    'Pipeline velocity and proposal cycle time reduction',
                    'Engagement uplift and conversion improvement',
                    'Platform migration milestones met on schedule',
                    'Dashboard adoption rate and time-to-insight reduction',
                    'AI resolution rate and cost-per-ticket reduction',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-gray-300">
                      <Target className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-brand-navy-surface border border-brand-border/30">
                <h3 className="font-mono text-xs text-brand-gray-500 font-bold uppercase tracking-wider mb-4">Not for</h3>
                <ul className="space-y-3">
                  {[
                    'Agent or platform seat licenses',
                    'Hours logged by humans or AI',
                    'Headcount on a project roster',
                    'Document volume or export counts',
                    'Software subscription tiers',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-brand-gray-500">
                      <span className="text-brand-gray-600 shrink-0 mt-0.5">&#x2715;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-navy-light/30">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              See the AI Pod model in action
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              We&apos;ll walk you through a live engagement — how agents handle the work, how humans
              govern quality, and what the economics look like for your use case.
            </p>
            <a href="https://calendly.com/varada-tvameva/30min" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4 inline-flex items-center">
              Book a 30-Minute Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
