'use client';

import { motion } from 'framer-motion';

const blocks = [
  { id: 'engageos', label: 'EngageOS', sub: 'Digital Experience', color: '#2ed8a3', x: 60, y: 220, w: 120, h: 55 },
  { id: 'insightlens', label: 'InsightLens', sub: 'Decision Intelligence', color: '#4a90d9', x: 200, y: 220, w: 120, h: 55 },
  { id: 'propeledge', label: 'PropelEdge', sub: 'Revenue Orchestration', color: '#e8593c', x: 130, y: 150, w: 120, h: 55 },
];

const foundation = { label: 'YOUR ENTERPRISE', sub: 'CRM · ERP · Data · MarTech · Commerce', color: '#6b7280', x: 40, y: 290, w: 300, h: 45 };
const apex = { label: 'FUTURE STATE', sub: 'AI-Native Enterprise', color: '#f5a623', x: 115, y: 75, w: 150, h: 50 };

export function AdvisoryBuildingBlocks({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <svg viewBox="0 0 380 370" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="adv-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="adv-rise" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(107,114,128,0.3)" />
            <stop offset="50%" stopColor="rgba(245,166,35,0.15)" />
            <stop offset="100%" stopColor="rgba(245,166,35,0.4)" />
          </linearGradient>
        </defs>

        {/* Rising gradient background */}
        <motion.rect
          x="60" y="70" width="260" height="270" rx="16"
          fill="url(#adv-rise)" opacity="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        />

        {/* Foundation block */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <rect
            x={foundation.x} y={foundation.y} width={foundation.w} height={foundation.h} rx="8"
            fill="rgba(107,114,128,0.08)" stroke={foundation.color} strokeWidth="1" strokeOpacity="0.4"
          />
          <text x={foundation.x + foundation.w / 2} y={foundation.y + 18} textAnchor="middle"
            fill={foundation.color} fontSize="8" fontWeight="700" letterSpacing="2"
            fontFamily="'JetBrains Mono', monospace"
          >
            {foundation.label}
          </text>
          <text x={foundation.x + foundation.w / 2} y={foundation.y + 33} textAnchor="middle"
            fill="rgba(176,184,201,0.5)" fontSize="7.5"
            fontFamily="'DM Sans', sans-serif"
          >
            {foundation.sub}
          </text>
        </motion.g>

        {/* Solution area building blocks */}
        {blocks.map((block, i) => (
          <motion.g
            key={block.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Block */}
            <rect
              x={block.x} y={block.y} width={block.w} height={block.h} rx="8"
              fill={`${block.color}10`} stroke={block.color} strokeWidth="1.5" strokeOpacity="0.5"
            />

            {/* Pulse */}
            <rect x={block.x} y={block.y} width={block.w} height={block.h} rx="8"
              fill="none" stroke={block.color} strokeWidth="1"
            >
              <animate attributeName="strokeOpacity" values="0.3;0;0.3" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="rx" values="8;12;8" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
            </rect>

            <text x={block.x + block.w / 2} y={block.y + 22} textAnchor="middle"
              fill={block.color} fontSize="10" fontWeight="700"
              fontFamily="'Instrument Sans', sans-serif"
            >
              {block.label}
            </text>
            <text x={block.x + block.w / 2} y={block.y + 38} textAnchor="middle"
              fill="rgba(176,184,201,0.6)" fontSize="7.5"
              fontFamily="'DM Sans', sans-serif"
            >
              {block.sub}
            </text>

            {/* Rising connection line to apex */}
            <motion.line
              x1={block.x + block.w / 2} y1={block.y}
              x2={apex.x + apex.w / 2} y2={apex.y + apex.h}
              stroke={block.color} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
            />

            {/* Rising flow dot */}
            <circle r="2.5" fill={block.color} filter="url(#adv-glow)">
              <animateMotion
                dur={`${3.5 + i * 0.4}s`}
                repeatCount="indefinite"
                path={`M${block.x + block.w / 2},${block.y} L${apex.x + apex.w / 2},${apex.y + apex.h}`}
              />
              <animate attributeName="opacity" values="0;0.8;0" dur={`${3.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>

            {/* Connection line down to foundation */}
            <motion.line
              x1={block.x + block.w / 2} y1={block.y + block.h}
              x2={block.x + block.w / 2} y2={foundation.y}
              stroke={foundation.color} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            />
          </motion.g>
        ))}

        {/* Apex — future state */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <rect
            x={apex.x} y={apex.y} width={apex.w} height={apex.h} rx="10"
            fill="rgba(245,166,35,0.08)" stroke="#f5a623" strokeWidth="2" strokeOpacity="0.6"
          />
          {/* Glow pulse */}
          <rect x={apex.x} y={apex.y} width={apex.w} height={apex.h} rx="10"
            fill="none" stroke="#f5a623" strokeWidth="1"
          >
            <animate attributeName="strokeOpacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </rect>

          <text x={apex.x + apex.w / 2} y={apex.y + 20} textAnchor="middle"
            fill="#f5a623" fontSize="9" fontWeight="700" letterSpacing="2"
            fontFamily="'JetBrains Mono', monospace"
          >
            {apex.label}
          </text>
          <text x={apex.x + apex.w / 2} y={apex.y + 36} textAnchor="middle"
            fill="rgba(245,166,35,0.7)" fontSize="8"
            fontFamily="'DM Sans', sans-serif"
          >
            {apex.sub}
          </text>
        </motion.g>

        {/* Arrow label */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <text x="20" y="185" fill="rgba(245,166,35,0.4)" fontSize="8" fontWeight="600" letterSpacing="1.5"
            fontFamily="'JetBrains Mono', monospace"
            transform="rotate(-90, 20, 185)"
          >
            ADVISORY →
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
