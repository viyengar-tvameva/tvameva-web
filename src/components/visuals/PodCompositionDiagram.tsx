'use client';

import { motion } from 'framer-motion';
import { Bot, Shield, Users } from 'lucide-react';

interface PodRole {
  title: string;
  type?: 'agent' | 'human';
}

interface Props {
  agentRoles: PodRole[];
  humanRoles: PodRole[];
  className?: string;
}

export function PodCompositionDiagram({ agentRoles, humanRoles, className = '' }: Props) {
  if (!agentRoles.length && !humanRoles.length) return null;

  const totalAgents = agentRoles.length;
  const radius = 140;
  const centerX = 200;
  const centerY = 180;

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <svg viewBox="0 0 400 360" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="pod-glow-amber">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="pod-glow-teal">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="pod-center-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(46,216,163,0.15)" />
            <stop offset="100%" stopColor="rgba(46,216,163,0)" />
          </radialGradient>
          <radialGradient id="pod-outer-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(245,166,35,0.05)" />
            <stop offset="100%" stopColor="rgba(245,166,35,0)" />
          </radialGradient>
        </defs>

        {/* Outer orbit ring */}
        <motion.circle
          cx={centerX} cy={centerY} r={radius}
          fill="none" stroke="rgba(245,166,35,0.12)" strokeWidth="1" strokeDasharray="4 6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Outer glow */}
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="url(#pod-outer-grad)" />

        {/* Agent nodes on the orbit */}
        {agentRoles.map((role, i) => {
          const angle = (2 * Math.PI * i) / totalAgents - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <motion.g
              key={role.title}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Connection line to center */}
              <line
                x1={centerX} y1={centerY} x2={x} y2={y}
                stroke="rgba(245,166,35,0.1)" strokeWidth="1"
              />

              {/* Pulse ring */}
              <circle cx={x} cy={y} r="0" fill="none" stroke="#f5a623" strokeWidth="1">
                <animate
                  attributeName="r" values="18;24;18"
                  dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity" values="0.3;0;0.3"
                  dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite"
                />
              </circle>

              {/* Node circle */}
              <circle cx={x} cy={y} r="18" fill="rgba(245,166,35,0.08)" stroke="#f5a623" strokeWidth="1" strokeOpacity="0.5" />

              {/* Bot icon (simplified) */}
              <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill="#f5a623" fontSize="12">
                &#x2699;
              </text>

              {/* Label */}
              <text
                x={x} y={y + 32} textAnchor="middle"
                fill="rgba(176,184,201,0.8)" fontSize="8"
                fontFamily="'DM Sans', sans-serif"
              >
                {role.title.length > 20 ? role.title.substring(0, 18) + '...' : role.title}
              </text>
            </motion.g>
          );
        })}

        {/* Center: Human governance */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <circle cx={centerX} cy={centerY} r="45" fill="url(#pod-center-grad)" stroke="#2ed8a3" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* Pulsing glow */}
          <circle cx={centerX} cy={centerY} r="45" fill="none" stroke="#2ed8a3" strokeWidth="1">
            <animate attributeName="r" values="45;52;45" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Shield icon (simplified) */}
          <text x={centerX} y={centerY - 5} textAnchor="middle" dominantBaseline="middle" fill="#2ed8a3" fontSize="16">
            &#x26E8;
          </text>

          <text
            x={centerX} y={centerY + 14} textAnchor="middle"
            fill="#2ed8a3" fontSize="8" fontWeight="600" letterSpacing="1"
            fontFamily="'JetBrains Mono', monospace"
          >
            HUMAN
          </text>
          <text
            x={centerX} y={centerY + 24} textAnchor="middle"
            fill="rgba(46,216,163,0.7)" fontSize="7" letterSpacing="1"
            fontFamily="'JetBrains Mono', monospace"
          >
            GOVERNANCE
          </text>
        </motion.g>

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <circle cx="30" cy="340" r="5" fill="rgba(245,166,35,0.3)" stroke="#f5a623" strokeWidth="1" />
          <text x="42" y="343" fill="rgba(176,184,201,0.6)" fontSize="9" fontFamily="'DM Sans', sans-serif">
            AI Agent ({totalAgents})
          </text>

          <circle cx="150" cy="340" r="5" fill="rgba(46,216,163,0.3)" stroke="#2ed8a3" strokeWidth="1" />
          <text x="162" y="343" fill="rgba(176,184,201,0.6)" fontSize="9" fontFamily="'DM Sans', sans-serif">
            Human ({humanRoles.length})
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
