'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ---------------------------------------------------------------------------
// Scroll-triggered reveal (framer-motion)
// ---------------------------------------------------------------------------

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  once?: boolean;
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export function Reveal({ children, delay = 0, direction = 'up', className = '', once = true }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const variants = directionVariants[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Staggered children reveal
// ---------------------------------------------------------------------------

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = '' }: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------

interface CounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2000, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([\$]?)([\d,.]+)(.*)$/);
    if (!match) { setDisplayValue(value); return; }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const target = parseFloat(numStr);
    const isDecimal = numStr.includes('.');
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      let formatted: string;
      if (isDecimal) formatted = current.toFixed(2);
      else if (target >= 1000) formatted = Math.round(current).toLocaleString();
      else formatted = Math.round(current).toString();

      setDisplayValue(prefix + formatted + suffix);

      if (progress < 1) requestAnimationFrame(tick);
      else setDisplayValue(value);
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return <span ref={ref} className={className}>{displayValue}</span>;
}

// ---------------------------------------------------------------------------
// Parallax wrapper
// ---------------------------------------------------------------------------

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Gradient mesh animated background (Tvameva brand colors)
// ---------------------------------------------------------------------------

export function GradientMesh({ variant = 'default' }: { variant?: 'default' | 'teal' | 'amber' }) {
  const colors = {
    default: [
      { color: 'rgba(245, 166, 35, 0.15)', size: 800, pos: '-top-1/2 -left-1/4' },
      { color: 'rgba(46, 216, 163, 0.1)', size: 600, pos: '-bottom-1/3 -right-1/4' },
      { color: 'rgba(74, 144, 217, 0.08)', size: 400, pos: 'top-1/4 right-1/3' },
    ],
    teal: [
      { color: 'rgba(46, 216, 163, 0.15)', size: 700, pos: '-top-1/4 -right-1/4' },
      { color: 'rgba(74, 144, 217, 0.1)', size: 500, pos: 'bottom-0 -left-1/4' },
    ],
    amber: [
      { color: 'rgba(245, 166, 35, 0.12)', size: 700, pos: '-top-1/4 left-1/4' },
      { color: 'rgba(232, 89, 60, 0.08)', size: 500, pos: '-bottom-1/4 right-0' },
    ],
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {colors[variant].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.pos} rounded-full`}
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 12 + i * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Glowing section divider
// ---------------------------------------------------------------------------

export function GlowDivider({ color = 'amber' }: { color?: 'amber' | 'teal' | 'mixed' }) {
  const gradients = {
    amber: 'from-transparent via-brand-amber/40 to-transparent',
    teal: 'from-transparent via-brand-teal/40 to-transparent',
    mixed: 'from-brand-teal/20 via-brand-amber/40 to-brand-teal/20',
  };

  return (
    <div className="relative h-px w-full">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[color]}`} />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[color]} blur-md`} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid pattern background
// ---------------------------------------------------------------------------

export function GridPattern({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Floating badge with pulse
// ---------------------------------------------------------------------------

export function PulseBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <span className="absolute inset-0 rounded-full bg-brand-amber/20 animate-ping" style={{ animationDuration: '3s' }} />
      <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-brand-navy-surface border border-brand-amber/30 text-brand-amber">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
        {children}
      </span>
    </span>
  );
}
