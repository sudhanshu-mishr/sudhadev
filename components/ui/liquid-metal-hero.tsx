
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from './badge.tsx';
import { GlowingButton } from './glowing-button.tsx';
import { GlowCard } from './spotlight-card.tsx';
import { cn } from '../../lib/utils.ts';

interface LiquidMetalHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  features?: string[];
  className?: string;
}

export default function LiquidMetalHero({
  badge = "Next Gen Architecture",
  title = "Building the Digital Future",
  subtitle = "High-performance systems meet elegant software design.",
  primaryCtaLabel = "Get Started",
  secondaryCtaLabel = "Learn More",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = ["Hardware Acceleration", "Low-Latency Architectures", "High-Fidelity Technical Writing"],
  className
}: LiquidMetalHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center py-24 overflow-hidden",
        className
      )}
    >
      {/* Liquid Metal Background Effect - Refined for Transparency */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.08)_0%,_transparent_60%)] animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-50 contrast-150 mix-blend-overlay" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-blue-600/5 rounded-full blur-[160px]" 
        />
        <motion.div 
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-[50rem] h-[50rem] bg-indigo-600/5 rounded-full blur-[200px]" 
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="outline" className="mb-12 py-3 px-8 text-xs tracking-[0.4em] bg-white/5 border-white/10 backdrop-blur-md">
            {badge}
          </Badge>
          
          <h2 className="text-6xl md:text-9xl font-black mb-10 text-white uppercase italic tracking-tighter leading-[0.85]">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block overflow-hidden h-full">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed tracking-tight">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24">
            <GlowingButton 
              onClick={onPrimaryCtaClick}
              glowColor="#2563eb"
              className="h-16 px-12 text-sm font-black italic tracking-[0.2em] rounded-full scale-110 shadow-[0_0_30px_rgba(37,99,235,0.2)] bg-blue-600 text-white border-transparent"
            >
              <span className="flex items-center gap-3">
                {primaryCtaLabel} <ArrowRight size={22} />
              </span>
            </GlowingButton>

            <GlowingButton 
              onClick={onSecondaryCtaClick}
              glowColor="#475569"
              className="h-16 px-12 text-sm font-black italic tracking-[0.2em] rounded-full bg-white/5 backdrop-blur-md border-white/10"
            >
              {secondaryCtaLabel}
            </GlowingButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto border-t border-white/5 pt-20">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <GlowCard 
                  customSize 
                  className="h-full flex flex-col items-center gap-4 p-10 group"
                  glowColor={i === 0 ? 'blue' : i === 1 ? 'purple' : 'green'}
                >
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={32} />
                  </div>
                  <span className="text-slate-100 font-black uppercase tracking-[0.3em] text-xs text-center leading-relaxed italic">
                    {feature}
                  </span>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Side Decorative Text - Subtle Glass Feel */}
      <div className="absolute left-12 top-1/2 -rotate-90 origin-left text-[11px] font-black uppercase tracking-[1.5em] text-white/5 hidden lg:block italic">
        Systems Architecture // VLSI Engineering
      </div>
      <div className="absolute right-12 top-1/2 rotate-90 origin-right text-[11px] font-black uppercase tracking-[1.5em] text-white/5 hidden lg:block italic">
        Software Development // Performance
      </div>
    </section>
  );
}
