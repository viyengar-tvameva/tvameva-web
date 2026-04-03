'use client';

import { motion } from 'framer-motion';
import type { ArchitectureDiagramData } from './types';

interface Props {
  data: ArchitectureDiagramData;
  className?: string;
}

export function ArchitectureStack({ data, className = '' }: Props) {
  if (!data?.layers?.length) return null;

  const { layers, badge, flowDirection = 'top-down' } = data;
  const ordered = flowDirection === 'bottom-up' ? [...layers].reverse() : layers;
  const layerHeight = 65;
  const gap = 25;
  const totalHeight = ordered.length * (layerHeight + gap) + 40;

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <svg
        viewBox={`0 0 400 ${totalHeight}`}
        className="w-full drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="arch-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="arch-flow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5a623" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2ed8a3" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {ordered.map((layer, i) => {
          const y = 10 + i * (layerHeight + gap);
          const bgColor = `${layer.color}12`;
          return (
            <g key={layer.id || i}>
              {/* Layer card */}
              <motion.rect
                x="20" y={y} width="360" height={layerHeight} rx="12"
                fill={bgColor}
                stroke={layer.color} strokeWidth="1" strokeOpacity="0.4"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Label */}
              <motion.text
                x="200" y={y + 27} textAnchor="middle" fill={layer.color}
                fontSize="10" fontWeight="700" letterSpacing="2"
                fontFamily="'JetBrains Mono', monospace"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                {layer.label.toUpperCase()}
              </motion.text>
              {/* Description */}
              <motion.text
                x="200" y={y + 47} textAnchor="middle"
                fill="rgba(176,184,201,0.8)" fontSize="9"
                fontFamily="'DM Sans', sans-serif"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                {layer.description}
              </motion.text>

              {/* Connector line between layers */}
              {i < ordered.length - 1 && (
                <motion.line
                  x1="200" y1={y + layerHeight}
                  x2="200" y2={y + layerHeight + gap}
                  stroke="url(#arch-flow)" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
                />
              )}

              {/* Pulsing connector nodes */}
              {i < ordered.length - 1 && (
                <>
                  <circle cx="130" cy={y + layerHeight} r="0" fill={layer.color} filter="url(#arch-glow)">
                    <animate attributeName="r" values="0;3;5;3;0" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.8;0.8;0.8;0" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx="270" cy={y + layerHeight} r="0" fill={ordered[i + 1].color} filter="url(#arch-glow)">
                    <animate attributeName="r" values="0;3;5;3;0" dur="3s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.8;0.8;0.8;0" dur="3s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Badge */}
        {badge && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <rect
              x="100" y={totalHeight - 35} width="200" height="28" rx="14"
              fill="rgba(245,166,35,0.15)" stroke="#f5a623" strokeWidth="1" strokeOpacity="0.5"
            />
            <text
              x="200" y={totalHeight - 16} textAnchor="middle"
              fill="#f5a623" fontSize="9" fontWeight="600" letterSpacing="1"
              fontFamily="'JetBrains Mono', monospace"
            >
              {badge.toUpperCase()}
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
