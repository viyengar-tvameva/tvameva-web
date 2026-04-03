'use client';

import { motion } from 'framer-motion';

interface Metric {
  value: string;
  label: string;
  color: string;
}

const metrics: Metric[] = [
  { value: '6–8 wks', label: 'Eliminated per deployment', color: '#2ed8a3' },
  { value: '5 hrs', label: 'Full proposal delivery', color: '#f5a623' },
  { value: '60–70%', label: 'Lower delivery cost', color: '#4a90d9' },
  { value: '3x', label: 'Pipeline multiplier', color: '#e8593c' },
];

export function SuccessMetricsVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <svg viewBox="0 0 400 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sm-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Central success ring */}
        <motion.circle
          cx="200" cy="200" r="60"
          fill="rgba(46,216,163,0.05)"
          stroke="#2ed8a3" strokeWidth="2" strokeOpacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#2ed8a3" strokeWidth="1">
          <animate attributeName="r" values="60;68;60" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
        </circle>

        <motion.text
          x="200" y="192" textAnchor="middle" fill="#2ed8a3"
          fontSize="11" fontWeight="700" letterSpacing="2"
          fontFamily="'JetBrains Mono', monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          CLIENT
        </motion.text>
        <motion.text
          x="200" y="210" textAnchor="middle" fill="rgba(46,216,163,0.7)"
          fontSize="10" letterSpacing="2"
          fontFamily="'JetBrains Mono', monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          SUCCESS
        </motion.text>

        {/* Metric nodes orbiting */}
        {metrics.map((metric, i) => {
          const angle = (2 * Math.PI * i) / metrics.length - Math.PI / 2;
          const radius = 145;
          const x = 200 + radius * Math.cos(angle);
          const y = 200 + radius * Math.sin(angle);

          return (
            <motion.g
              key={metric.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Connection line */}
              <line
                x1="200" y1="200" x2={x} y2={y}
                stroke={metric.color} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 6"
              />

              {/* Flow dot */}
              <circle r="2.5" fill={metric.color} filter="url(#sm-glow)">
                <animateMotion
                  dur={`${3 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M200,200 L${x},${y}`}
                />
                <animate attributeName="opacity" values="0;0.9;0" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>

              {/* Metric node */}
              <circle cx={x} cy={y} r="38" fill={`${metric.color}08`} stroke={metric.color} strokeWidth="1.5" strokeOpacity="0.4" />

              {/* Pulse */}
              <circle cx={x} cy={y} r="38" fill="none" stroke={metric.color} strokeWidth="1">
                <animate attributeName="r" values="38;46;38" dur={`${3.5 + i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur={`${3.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>

              {/* Value */}
              <text
                x={x} y={y - 4} textAnchor="middle" dominantBaseline="middle"
                fill={metric.color} fontSize="14" fontWeight="700"
                fontFamily="'Instrument Sans', sans-serif"
              >
                {metric.value}
              </text>

              {/* Label */}
              <text
                x={x} y={y + 14} textAnchor="middle"
                fill="rgba(176,184,201,0.7)" fontSize="7.5"
                fontFamily="'DM Sans', sans-serif"
              >
                {metric.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
