'use client';

import { motion } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  title: string;
  photo?: string;
  quote: string;
  highlights?: string[];
}

interface Props {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-brand-navy-card to-brand-navy-surface border border-brand-amber/20 overflow-hidden">
        {/* Decorative quote mark */}
        <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-amber/10" />

        <div className="flex items-start gap-6 mb-6">
          {/* Photo */}
          {testimonial.photo && (
            <div className="shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-amber/30">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Attribution */}
          <div>
            <h4 className="font-display font-semibold text-white text-lg">{testimonial.name}</h4>
            <p className="text-sm text-brand-amber/80">{testimonial.title}</p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-brand-gray-300 leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Highlights */}
        {testimonial.highlights && testimonial.highlights.length > 0 && (
          <div className="pt-6 border-t border-brand-border/30">
            <p className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-wider mb-3">Key Outcomes</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {testimonial.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                  <span className="text-xs text-brand-gray-300">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
