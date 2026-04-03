'use client';

import { SolutionArea, hasEnrichedContent } from '@/data/solutions';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientMesh, GridPattern, PulseBadge } from '@/components/common/Animations';
import { ArchitectureStack } from '@/components/visuals';
import { trackCalendlyClick, trackCTAClick } from '@/utils/analytics';

const diagramData: Record<string, { label: string; sub: string; color: string; bg: string }[]> = {
  engageos: [
    { label: 'EXPERIENCE LAYER', sub: 'Brand Websites · 3D Configurator · Mobile · Dealer Portal', color: '#f5a623', bg: 'rgba(245,166,35,0.08)' },
    { label: 'DXP & CONTENT', sub: 'Acquia Cloud · Site Studio · DAM · CDP · Personalization', color: '#2ed8a3', bg: 'rgba(46,216,163,0.08)' },
    { label: 'INTEGRATION HUB', sub: 'Boomi iPaaS · Connectors · Real-time Sync · API Gateway', color: '#4a90d9', bg: 'rgba(74,144,217,0.08)' },
    { label: 'BUSINESS SYSTEMS', sub: 'CRM · ERP · Marketing Automation · Analytics', color: '#a78bfa', bg: 'rgba(167,139,250,0.06)' },
  ],
  insightlens: [
    { label: 'DECISION LAYER', sub: 'Executive Dashboards · Looker · Conversational Analytics', color: '#4a90d9', bg: 'rgba(74,144,217,0.08)' },
    { label: 'ML & AI', sub: 'Vertex AI · Gemini · Model Registry · Drift Monitoring', color: '#f5a623', bg: 'rgba(245,166,35,0.08)' },
    { label: 'DATA PLATFORM', sub: 'BigQuery Lakehouse · dbt · Cloud Composer · Dataflow', color: '#2ed8a3', bg: 'rgba(46,216,163,0.08)' },
    { label: 'DATA SOURCES', sub: 'CRM · ERP · Product Telemetry · External APIs', color: '#a78bfa', bg: 'rgba(167,139,250,0.06)' },
  ],
  propeledge: [
    { label: 'PROPOSAL OUTPUT', sub: 'DOC · PDF · PPT · White-labeled Deliverables', color: '#e8593c', bg: 'rgba(232,89,60,0.08)' },
    { label: 'AGENT PIPELINE', sub: 'Intake → POV → Demo → Proposal · Human Review Gates', color: '#f5a623', bg: 'rgba(245,166,35,0.08)' },
    { label: 'KNOWLEDGE BASE', sub: 'Institutional Memory · Past Proposals · Competitive Intel', color: '#2ed8a3', bg: 'rgba(46,216,163,0.08)' },
    { label: 'DATA SOURCES', sub: 'CRM · Web Research · Industry Analysis · Client Roadmaps', color: '#4a90d9', bg: 'rgba(74,144,217,0.08)' },
  ],
};

const defaultDiagram = diagramData.engageos;

function ArchitectureDiagram({ slug }: { slug?: string }) {
  const layers = (slug && diagramData[slug]) || defaultDiagram;

  return (
    <div className="relative w-full max-w-md">
      <svg viewBox="0 0 400 380" className="w-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="flowLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2ed8a3" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {layers.map((layer, i) => (
          <g key={i}>
            {/* Layer card */}
            <motion.rect
              x="20" y={10 + i * 90} width="360" height="65" rx="12"
              fill={layer.bg} stroke={layer.color} strokeWidth="1" strokeOpacity="0.4"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.text
              x="200" y={37 + i * 90} textAnchor="middle" fill={layer.color}
              fontSize="10" fontWeight="700" letterSpacing="2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15 }}
            >
              {layer.label}
            </motion.text>
            <motion.text
              x="200" y={57 + i * 90} textAnchor="middle" fill="rgba(176,184,201,0.8)"
              fontSize="9"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.15 }}
            >
              {layer.sub}
            </motion.text>

            {/* Animated connector line between layers */}
            {i < 3 && (
              <motion.line
                x1="200" y1={75 + i * 90} x2="200" y2={100 + i * 90}
                stroke="url(#flowLine)" strokeWidth="2" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
              />
            )}

            {/* Pulsing connector nodes */}
            {i < 3 && (
              <>
                <circle cx="130" cy={75 + i * 90} r="0" fill={layer.color} filter="url(#glow)">
                  <animate attributeName="r" values="0;3;5;3;0" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.8;0.8;0.8;0" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy={75 + i * 90} r="0" fill={layers[i + 1].color} filter="url(#glow)">
                  <animate attributeName="r" values="0;3;5;3;0" dur="3s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.8;0.8;0.8;0" dur="3s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
                </circle>
              </>
            )}
          </g>
        ))}

        {/* Accelerator IP badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <rect x="100" y="345" width="200" height="28" rx="14" fill="rgba(245,166,35,0.15)" stroke="#f5a623" strokeWidth="1" strokeOpacity="0.5" />
          <text x="200" y="364" textAnchor="middle" fill="#f5a623" fontSize="9" fontWeight="600" letterSpacing="1">
            {slug === 'propeledge' ? 'AGENTIC PIPELINE' : slug === 'insightlens' ? 'GCP ANALYTICS STACK' : 'ACCELERATOR IP'}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

export function SolutionHero({ solution }: { solution: SolutionArea }) {
  const isEnriched = hasEnrichedContent(solution);

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
      <GradientMesh variant="default" />
      <GridPattern opacity={0.02} />

      <div className="relative section-container">
        <div className={`grid grid-cols-1 ${isEnriched ? 'lg:grid-cols-2' : ''} gap-12 lg:gap-16 items-center`}>
          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <PulseBadge>{solution.platformAnchor}</PulseBadge>
            </motion.div>

            <motion.h1
              className="text-hero-md lg:text-hero-lg font-display font-bold text-white text-balance mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {solution.headline}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-brand-gray-300 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {isEnriched ? solution.heroSubheadline || solution.valueProp : solution.valueProp}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {isEnriched && solution.heroCTAs ? (
                solution.heroCTAs.map((cta, i) => {
                  const isExternal = cta.href.startsWith('http');
                  const className = cta.variant === 'primary' ? 'btn-primary' : 'btn-secondary';
                  return isExternal ? (
                    <a
                      key={i}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      onClick={() => cta.href.includes('calendly') ? trackCalendlyClick(solution.slug) : trackCTAClick(cta.label, solution.slug, cta.href)}
                    >
                      {cta.label}
                      {cta.variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4" />}
                    </a>
                  ) : (
                    <Link key={i} href={cta.href} className={className} onClick={() => trackCTAClick(cta.label, solution.slug, cta.href)}>
                      {cta.label}
                      {cta.variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link href="/advisory" className="btn-primary">
                    {solution.advisory.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link href="/how-we-deliver" className="btn-secondary">
                    See How We Deliver
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          {/* Right — Architecture diagram (only for enriched pages) */}
          {isEnriched && (
            <motion.div
              className="hidden lg:flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {solution.architectureDiagram ? (
                <ArchitectureStack data={solution.architectureDiagram} />
              ) : (
                <ArchitectureDiagram slug={solution.slug} />
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
