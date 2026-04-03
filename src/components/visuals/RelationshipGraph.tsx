'use client';

import { motion } from 'framer-motion';
import type { RelationshipGraphData } from './types';

interface Props {
  data: RelationshipGraphData;
  className?: string;
}

export function RelationshipGraph({ data, className = '' }: Props) {
  if (!data?.nodes?.length) return null;

  const centerNode = data.nodes.find((n) => n.id === data.centerNode) || data.nodes[0];
  const spokeNodes = data.nodes.filter((n) => n.id !== centerNode.id);
  const radius = 130;
  const centerX = 200;
  const centerY = 170;

  const defaultColors: Record<string, string> = {
    engageos: '#2ed8a3',
    insightlens: '#4a90d9',
    propeledge: '#e8593c',
    resolveiq: '#f5a623',
    searchcore: '#e8593c',
    visualforge: '#a78bfa',
  };

  const getColor = (node: typeof centerNode) => node.color || defaultColors[node.id] || '#f5a623';

  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      <svg viewBox="0 0 400 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="rg-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {spokeNodes.map((node, i) => {
          const angle = (2 * Math.PI * i) / spokeNodes.length - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const color = getColor(node);
          const edge = data.edges.find(
            (e) => (e.source === centerNode.id && e.target === node.id) ||
                   (e.target === centerNode.id && e.source === node.id)
          );

          return (
            <motion.g key={node.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {/* Edge line */}
              <motion.line
                x1={centerX} y1={centerY} x2={x} y2={y}
                stroke={color} strokeWidth="1.5" strokeOpacity="0.2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              />

              {/* Animated flow dot */}
              <circle r="3" fill={color} filter="url(#rg-glow)">
                <animateMotion
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M${centerX},${centerY} L${x},${y}`}
                />
                <animate attributeName="opacity" values="0;0.8;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>

              {/* Spoke node */}
              <circle cx={x} cy={y} r="28" fill={`${color}10`} stroke={color} strokeWidth="1" strokeOpacity="0.5" />
              <text
                x={x} y={y - 2} textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize="10" fontWeight="600"
                fontFamily="'Instrument Sans', sans-serif"
              >
                {node.label}
              </text>

              {/* Edge label */}
              {edge?.label && (
                <text
                  x={x} y={y + 42} textAnchor="middle"
                  fill="rgba(176,184,201,0.5)" fontSize="7"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {edge.label.length > 40 ? edge.label.substring(0, 38) + '...' : edge.label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Center node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Glow */}
          <circle cx={centerX} cy={centerY} r="40" fill={`${getColor(centerNode)}08`} />
          <circle cx={centerX} cy={centerY} r="36" fill={`${getColor(centerNode)}10`} stroke={getColor(centerNode)} strokeWidth="2" strokeOpacity="0.6" />

          {/* Pulse */}
          <circle cx={centerX} cy={centerY} r="36" fill="none" stroke={getColor(centerNode)} strokeWidth="1">
            <animate attributeName="r" values="36;44;36" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>

          <text
            x={centerX} y={centerY + 1} textAnchor="middle" dominantBaseline="middle"
            fill={getColor(centerNode)} fontSize="13" fontWeight="700"
            fontFamily="'Instrument Sans', sans-serif"
          >
            {centerNode.label}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
