"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SEVORA_DATA } from "../data/sevora.data";
import { Sparkles, MoveRight } from "lucide-react";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export function UseCases() {
  const { useCases } = SEVORA_DATA;

  // New Image for the first card as requested
  const displayImages = useMemo(
    () => ["/sevora/use1.png", ...useCases.images.slice(1)],
    [useCases.images]
  );

  const displayItems = displayImages.map((img, index) => ({
    image: img,
    title: useCases.items[index] || "Versatile",
  }));

  return (
    <section id="use-cases" className="py-24 md:py-36 bg-white dark:bg-[#020504] overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Compact & Aesthetic Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={sectionVariants}
        >
          <div className="max-w-xl space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/6 border border-emerald-500/10 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600">Daily Pure Uses</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl font-serif font-medium leading-[0.95] text-foreground tracking-tighter max-w-[10ch]"
            >
              {useCases.title}
            </motion.h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="max-w-md md:text-right"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-light italic leading-snug mb-7 opacity-80">
              {useCases.description}
            </p>
          
          </motion.div>
        </motion.div>

        {/* Compact Aesthetic Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {displayItems.map((item) => (
            <motion.div
              key={item.image}
              variants={itemVariants}
              className="relative group transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style jsx global>{`
        ::selection {
            background: rgba(16, 185, 129, 0.3);
            color: white;
        }
      `}</style>
    </section>
  );
}
