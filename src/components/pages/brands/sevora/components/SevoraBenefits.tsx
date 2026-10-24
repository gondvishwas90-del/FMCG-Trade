"use client";

import React, { useRef } from "react";
import { SEVORA_DATA } from "../data/sevora.data";
import * as LucideIcons from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Local Utilities ---

function GsapSplitText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current.querySelectorAll(".split-word"),
      { y: 20, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.4, 
        stagger: 0.03, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block mr-[0.3em] font-serif">
          {word}
        </span>
      ))}
    </span>
  );
}

export function SevoraBenefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { benefits } = SEVORA_DATA;

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Entrance animation for Bento Cards
    const cards = sectionRef.current.querySelectorAll(".bento-card");
    gsap.fromTo(cards, 
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 95%",
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="sevora-benefits"
      className="relative py-16 md:py-24 lg:py-32 lg:min-h-screen flex flex-col justify-center bg-white dark:bg-[#020504] overflow-hidden scroll-mt-24"
    >
      {/* Premium Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-50 dark:bg-emerald-950/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col h-full justify-center">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 shrink-0">
            <div className="inline-flex items-center gap-2 mb-4 bg-emerald-100/50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/30 backdrop-blur-md">
                <LucideIcons.Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-700 dark:text-emerald-400">Pure Quality</span>
            </div>
            <h2 className="text-[clamp(2rem,5vw,2.5rem)] md:text-[clamp(2.5rem,6vw,3.5rem)] lg:text-[clamp(3rem,6vw,4rem)] font-serif font-medium leading-[0.9] text-foreground tracking-tighter mb-4">
              <GsapSplitText text={benefits.title} />
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-light max-w-xl mx-auto leading-relaxed italic opacity-80">
              Transforming the standard of sweetness through botanical integrity.
            </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-2 gap-4 lg:gap-6">
          {benefits.items.map((benefit, i) => {
            const Icon = (LucideIcons as any)[benefit.icon.charAt(0).toUpperCase() + benefit.icon.slice(1).replace(/-([a-z])/g, (_: any, c: string) => c.toUpperCase())] || LucideIcons.Zap;
            
            // Define Bento Grid Spans based on index
            const spans = [
               "md:col-span-6 lg:col-span-7 lg:row-span-2", // Card 1: Large Feature
               "md:col-span-3 lg:col-span-5 lg:row-span-1", // Card 2: Medium
               "md:col-span-3 lg:col-span-5 lg:row-span-1", // Card 3: Medium
               "md:col-span-3 lg:col-span-4 lg:row-span-1", // Card 4
               "md:col-span-3 lg:col-span-4 lg:row-span-1", // Card 5
               "md:col-span-6 lg:col-span-4 lg:row-span-1", // Card 6
            ];

            return (
              <BentoCard 
                key={i} 
                className={spans[i % spans.length]}
                title={benefit.title}
                description={benefit.description}
                Icon={Icon}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ className, title, description, Icon, index }: { className: string, title: string, description: string, Icon: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconWrapperRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Effect
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(cardRef.current, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out"
        });

        // Magnetic Icon
        if (iconWrapperRef.current) {
            const ix = (x - centerX) / 10;
            const iy = (y - centerY) / 10;
            gsap.to(iconWrapperRef.current, {
                x: ix,
                y: iy,
                duration: 0.4
            });
        }
    };

    const onMouseLeave = () => {
        gsap.to([cardRef.current, iconWrapperRef.current], {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={`bento-card group relative p-6 lg:p-8 rounded-[2rem] bg-white border border-zinc-100 dark:bg-zinc-900/40 dark:border-white/5 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-500/10 perspective-1000 will-change-transform ${className}`}
        >
            {/* Subtle Inner Mesh Gradient */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-linear-to-br ${index % 2 === 0 ? "from-emerald-500/5 via-transparent to-teal-500/5" : "from-teal-500/5 via-transparent to-emerald-500/5"}`} />

            <div className="relative z-10 flex flex-col h-full">
                <div 
                    ref={iconWrapperRef}
                    className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-4 lg:mb-6 border border-emerald-100/20 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500"
                >
                    <Icon className="w-6 h-6" />
                </div>

                <div className="mt-auto">
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2 lg:mb-3 tracking-tight group-hover:text-emerald-500 transition-colors">
                        {title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-snug font-light opacity-80 group-hover:opacity-100 transition-opacity max-w-md">
                        {description}
                    </p>
                </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-bl-[3rem] transition-all group-hover:w-28 group-hover:h-28 group-hover:bg-emerald-500/10" />
        </div>
    );
}

