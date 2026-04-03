'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const words = [
  // The buzzwords everyone chases — different colors for visual energy
  { text: 'Digital Transformation', size: 22, color: '#4a90d9' },
  { text: 'Cloud Migration', size: 18, color: '#2ed8a3' },
  { text: 'AI Strategy', size: 24, color: '#e8593c' },
  { text: 'Data-Driven', size: 20, color: '#a78bfa' },
  { text: 'Machine Learning', size: 17, color: '#4a90d9' },
  { text: 'Platform Modernization', size: 19, color: '#2ed8a3' },
  { text: 'Agile at Scale', size: 16, color: '#e8593c' },
  { text: 'DevOps', size: 15, color: '#a78bfa' },
  { text: 'Microservices', size: 14, color: '#4a90d9' },
  { text: 'Customer 360', size: 18, color: '#2ed8a3' },
  { text: 'Composable', size: 16, color: '#e8593c' },
  { text: 'Headless', size: 14, color: '#a78bfa' },
  { text: 'Low-Code', size: 15, color: '#4a90d9' },
  { text: 'Hyperautomation', size: 17, color: '#2ed8a3' },
  { text: 'GenAI', size: 20, color: '#e8593c' },
  { text: 'Copilot', size: 16, color: '#a78bfa' },
  { text: 'RAG', size: 13, color: '#4a90d9' },
  { text: 'LLM', size: 14, color: '#2ed8a3' },
  { text: 'Vector DB', size: 13, color: '#e8593c' },
  { text: 'Prompt Engineering', size: 15, color: '#a78bfa' },
  { text: 'MLOps', size: 14, color: '#4a90d9' },
  { text: 'Multi-Cloud', size: 16, color: '#2ed8a3' },
  { text: 'Zero Trust', size: 15, color: '#e8593c' },
  { text: 'SaaS', size: 13, color: '#a78bfa' },
  { text: 'iPaaS', size: 12, color: '#4a90d9' },
  { text: 'CDP', size: 13, color: '#2ed8a3' },
  { text: 'RevOps', size: 15, color: '#e8593c' },
  { text: 'ABM', size: 14, color: '#a78bfa' },
  { text: 'Product-Led', size: 16, color: '#4a90d9' },
  { text: 'Digital Twin', size: 15, color: '#2ed8a3' },
];

// Random starting positions from all edges
function getEntryPosition(i: number) {
  const edge = i % 4;
  switch (edge) {
    case 0: return { x: -20 + Math.random() * 10, y: Math.random() * 100 }; // left
    case 1: return { x: 110 + Math.random() * 10, y: Math.random() * 100 }; // right
    case 2: return { x: Math.random() * 100, y: -15 + Math.random() * 10 }; // top
    case 3: return { x: Math.random() * 100, y: 110 + Math.random() * 10 }; // bottom
    default: return { x: 0, y: 0 };
  }
}

// Cloud positions — readable, scattered
function getCloudPosition(i: number, total: number) {
  const cols = 6;
  const row = Math.floor(i / cols);
  const col = i % cols;
  const jitterX = (Math.random() - 0.5) * 10;
  const jitterY = (Math.random() - 0.5) * 8;
  return {
    x: 5 + (col / (cols - 1)) * 85 + jitterX,
    y: 5 + (row / (Math.ceil(total / cols) - 1)) * 85 + jitterY,
  };
}

const CENTER = { x: 50, y: 50 };

type Phase = 'enter' | 'cloud' | 'gather' | 'storm' | 'explode' | 'reveal' | 'headline';

export function HomeHeroVisual({ className = '', onReveal }: { className?: string; onReveal?: () => void }) {
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    const runCycle = () => {
      setPhase('enter');
      setTimeout(() => setPhase('cloud'), 2500);
      setTimeout(() => setPhase('gather'), 6000);
      setTimeout(() => setPhase('storm'), 8000);
      setTimeout(() => setPhase('explode'), 10000);
      setTimeout(() => setPhase('reveal'), 10500);
      setTimeout(() => {
        setPhase('headline');
        onReveal?.();
      }, 12500);
    };

    runCycle();
    const interval = setInterval(runCycle, 22000);
    return () => clearInterval(interval);
  }, [onReveal]);

  return (
    <div className={`relative w-full h-[32vh] overflow-hidden ${className}`}>
      {words.map((word, i) => {
        const entry = getEntryPosition(i);
        const cloud = getCloudPosition(i, words.length);
        const stormAngle = (i / words.length) * Math.PI * 2;
        const stormRadius = 5 + (i % 7) * 2;

        let pos = { x: entry.x, y: entry.y };
        let opacity = 0;
        let scale = 1;
        let blur = '0px';
        let rotate = 0;
        let color = word.color;

        if (phase === 'enter') {
          // Flying in from edges — clearly visible
          const progress = 0.3 + (i / words.length) * 0.4;
          pos = {
            x: entry.x + (cloud.x - entry.x) * progress,
            y: entry.y + (cloud.y - entry.y) * progress,
          };
          opacity = 0.7;
          scale = 1;
          blur = '0px';
        } else if (phase === 'cloud') {
          // Settled as a readable word cloud
          pos = cloud;
          opacity = 0.8;
          scale = 1;
          blur = '0px';
        } else if (phase === 'gather') {
          // Drifting toward center — still readable
          pos = {
            x: cloud.x + (CENTER.x - cloud.x) * 0.5,
            y: cloud.y + (CENTER.y - cloud.y) * 0.5,
          };
          opacity = 0.6;
          scale = 0.85;
          blur = '1px';
          color = '#9ca3af';
        } else if (phase === 'storm') {
          // Tight vortex around center
          pos = {
            x: CENTER.x + Math.cos(stormAngle) * stormRadius,
            y: CENTER.y + Math.sin(stormAngle) * stormRadius,
          };
          opacity = 0.4;
          scale = 0.5;
          blur = '3px';
          rotate = (i % 2 === 0 ? 1 : -1) * 15;
          color = '#d1d5db';
        } else if (phase === 'explode') {
          // Blast outward and fade
          const angle = (i / words.length) * Math.PI * 2 + Math.random() * 0.5;
          const dist = 60 + Math.random() * 40;
          pos = {
            x: CENTER.x + Math.cos(angle) * dist,
            y: CENTER.y + Math.sin(angle) * dist,
          };
          opacity = 0;
          scale = 0.3;
          blur = '8px';
        } else {
          // Reveal + headline — words are gone
          pos = { x: CENTER.x + (Math.random() - 0.5) * 120, y: CENTER.y + (Math.random() - 0.5) * 120 };
          opacity = 0;
          scale = 0;
        }

        // Also gone during headline phase
        if (phase === 'headline') {
          opacity = 0;
          scale = 0;
        }

        return (
          <motion.span
            key={word.text}
            className="absolute font-display font-bold whitespace-nowrap select-none pointer-events-none"
            animate={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              opacity,
              scale,
              filter: `blur(${blur})`,
              rotate,
              color,
            }}
            transition={{
              duration:
                phase === 'enter' ? 2.0 :
                phase === 'cloud' ? 1.5 :
                phase === 'gather' ? 1.8 :
                phase === 'storm' ? 1.5 :
                phase === 'explode' ? 0.4 : 0.3,
              ease: phase === 'explode' ? [0.16, 1, 0.3, 1] : [0.4, 0, 0.2, 1],
              delay: phase === 'enter' ? i * 0.06 : phase === 'explode' ? i * 0.008 : 0,
            }}
            style={{ fontSize: `${word.size}px` }}
          >
            {word.text}
          </motion.span>
        );
      })}

      {/* Storm glow at center */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(245,166,35,0.4) 0%, transparent 70%)',
          width: '300px', height: '300px',
        }}
        animate={{
          scale:
            phase === 'storm' ? [1, 1.5, 1] :
            phase === 'explode' ? [1.5, 6] :
            0,
          opacity:
            phase === 'storm' ? [0.3, 0.6, 0.3] :
            phase === 'explode' ? [0.8, 0] :
            phase === 'gather' ? 0.15 :
            0,
        }}
        transition={{
          duration: phase === 'storm' ? 1 : phase === 'explode' ? 0.5 : 0.8,
          repeat: phase === 'storm' ? Infinity : 0,
        }}
      />

      {/* THE REVEAL — tvameva.ai big, then recedes to smaller brand watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          opacity: phase === 'reveal' || phase === 'headline' ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="font-display font-bold tracking-tight"
          animate={{
            scale: phase === 'reveal' ? 1 : phase === 'headline' ? 0.4 : 0.3,
            opacity: phase === 'reveal' ? 1 : phase === 'headline' ? 0.2 : 0,
            filter: phase === 'reveal' ? 'blur(0px)' : phase === 'headline' ? 'blur(0px)' : 'blur(16px)',
            y: phase === 'headline' ? 60 : 0,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
        >
          <span style={{ color: '#c8cdd8' }}>tvameva</span>
          <span style={{ color: '#f5a623' }}>.ai</span>
        </motion.span>
      </motion.div>
    </div>
  );
}
