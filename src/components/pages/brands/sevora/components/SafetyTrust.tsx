"use client";

import React from "react";
import { motion } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";

const motionEase = [0.22, 1, 0.36, 1] as const;

const badgeCardClassName =
  "group relative p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900 border border-emerald-500/5 shadow-2xl shadow-emerald-500/5 hover:border-emerald-500/30 transition-[border-color,box-shadow,transform] duration-700 overflow-hidden transform-gpu";

const pillClassName =
  "px-8 py-4 rounded-full bg-zinc-50 dark:bg-white/5 border border-emerald-500/10 flex items-center gap-4 hover:border-emerald-500/40 transition-[border-color] transform-gpu";

const SafetyBadgeCard = React.memo(function SafetyBadgeCard({ badge, index }: { badge: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: motionEase, delay: index * 0.08 }}
      className={badgeCardClassName}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500/5 to-transparent flex items-center justify-center text-emerald-600 mb-10 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-transform duration-700 shadow-3xl">
        <Award className="w-10 h-10" />
      </div>

      <h3 className="text-3xl font-serif font-bold text-foreground mb-4 tracking-tight leading-none">
        {badge}
      </h3>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600/60 mb-8">Verified Origin</p>

      <div className="flex items-center gap-3 pt-6 border-t border-emerald-500/10">
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified Safety</span>
      </div>

      <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-20 transition-opacity">
        <ShieldCheck className="w-16 h-16 text-emerald-500" />
      </div>
    </motion.div>
  );
});

const SafetyPointPill = React.memo(function SafetyPointPill({ point, index }: { point: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: motionEase, delay: index * 0.08 + 0.45 }}
      className={pillClassName}
      style={{ willChange: "transform, opacity" }}
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">{point}</span>
    </motion.div>
  );
});

function SafetyTrustComponent() {
  const { safety } = SEVORA_DATA;

  return (
    <section id="safety" className="py-24 md:py-40 bg-[#fafdfb] dark:bg-[#020504] overflow-hidden border-t border-border">
      <div className="container mx-auto px-6">
        
        {/* Header Block */}
        <div className="max-w-4xl mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: motionEase }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              style={{ willChange: "transform, opacity" }}
            >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">The Fortress</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.08, ease: motionEase }}
              className="text-6xl md:text-8xl font-serif font-medium leading-[0.95] text-foreground tracking-tighter mb-12"
              style={{ willChange: "transform, opacity" }}
            >
              {safety.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: 0.16, ease: motionEase }}
              className="text-xl md:text-3xl text-muted-foreground font-light italic leading-tight max-w-2xl opacity-80"
              style={{ willChange: "transform, opacity" }}
            >
              Certified by top international bodies, Sevora is the gold standard for purity and natural sweetness.
            </motion.p>
        </div>

        {/* The Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safety.badges.map((badge, i) => (
                <SafetyBadgeCard key={badge} badge={badge} index={i} />
            ))}
        </div>

        {/* Feature Pills */}
        <div className="mt-24 flex flex-wrap gap-4 justify-center md:justify-start">
             {safety.points.map((point, i) => (
                 <SafetyPointPill key={point} point={point} index={i} />
             ))}
        </div>

      </div>

      <style jsx global>{`
        .shadow-3xl { box-shadow: 0 20px 50px -10px rgba(16, 185, 129, 0.2); }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}

export const SafetyTrust = React.memo(SafetyTrustComponent);

SafetyTrust.displayName = "SafetyTrust";
