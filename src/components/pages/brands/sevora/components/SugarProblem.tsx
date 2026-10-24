"use client";

import React from "react";
import { motion, useReducedMotion, Variants, Transition } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { AlertCircle, ShieldAlert, Heart, Zap, Droplets } from "lucide-react";

const ICONS = [ShieldAlert, Heart, Zap, Droplets];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const SugarProblem = React.memo(function SugarProblem() {
  const { problem } = SEVORA_DATA;
  const reduceMotion = useReducedMotion();
  const animationVariants = reduceMotion ? undefined : sectionVariants;
  const itemTransition: Transition | undefined = reduceMotion ? undefined : { duration: 0.35, ease: "easeOut" };

  return (
    <section id="problem" className="py-16 md:py-24 lg:py-32 bg-[#020504] text-white overflow-hidden relative">
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-rose-500/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-zinc-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Simple & Impactful Header */}
        <motion.div
          className="max-w-3xl mb-12 md:mb-20"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          variants={animationVariants}
        >
            <motion.div
              variants={headerItemVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-2xl"
            >
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-500">The Problem</span>
            </motion.div>
            
            <motion.h2 
              variants={headerItemVariants}
              className="text-[clamp(2rem,5vw,2.5rem)] md:text-[clamp(2.5rem,7vw,3.75rem)] lg:text-[clamp(3.75rem,8vw,5rem)] font-serif font-medium leading-[0.9] tracking-tighter mb-8"
            >
              {problem.title}
            </motion.h2>
            
            <motion.p 
              variants={headerItemVariants}
              className="text-base md:text-xl lg:text-2xl text-zinc-500 font-light italic leading-tight max-w-xl opacity-80"
            >
              Modern excess carries a hidden price. Processed sugar transforms your biology in ways you can&apos;t always see.
            </motion.p>
        </motion.div>

        {/* Clean 2-Column Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
          variants={animationVariants}
        >
            {problem.points.map((point, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                    <motion.div
                      key={point.title}
                      variants={cardVariants}
                      transition={itemTransition}
                      className="group relative p-8 lg:p-10 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-rose-500/30 transition-[border-color,transform,box-shadow] duration-500 overflow-hidden backdrop-blur-xl transform-gpu will-change-transform"
                    >
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-black transition-colors duration-500">
                            <Icon className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 tracking-tight group-hover:text-rose-400 transition-colors duration-300">
                            {point.title}
                        </h3>
                        <p className="text-zinc-500 text-sm md:text-base lg:text-lg font-light italic opacity-80 leading-relaxed">
                            {point.description}
                        </p>

                        {/* Subtle Card Accent */}
                        <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity duration-300">
                             <Icon className="w-16 h-16 text-rose-500" />
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>

        {/* Minimalist Stats Bar */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/5 rounded-[2rem] p-8 md:p-12 border border-white/5"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.1 }}
          variants={animationVariants}
        >
             {problem.stats.map((stat, i) => (
                 <motion.div 
                   key={stat}
                   variants={statVariants}
                   transition={itemTransition}
                   className="text-center group"
                 >
                      <p className="text-rose-500/40 text-[8px] font-black uppercase tracking-[0.4em] mb-2 group-hover:text-rose-500 transition-colors">Safety Metric 0{i + 1}</p>
                      <p className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-zinc-300 leading-tight">
                        {stat}
                      </p>
                 </motion.div>
             ))}
        </motion.div>

      </div>

      <style jsx global>{`
        ::selection {
            background: rgba(225, 29, 72, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
});
