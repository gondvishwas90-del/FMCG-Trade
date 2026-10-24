"use client";

import React, { useRef } from "react";
import { SEVORA_DATA } from "../data/sevora.data";
import { ArrowRight, Leaf, Waves, CheckCircle2, ChevronRight } from "lucide-react";
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
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.1, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block mr-[0.3em] font-serif italic">
          {word}
        </span>
      ))}
    </span>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { howItWorks } = SEVORA_DATA;
  const icons = [Waves, Leaf, CheckCircle2];

  useGSAP(() => {
    if (!horizontalRef.current || !pinRef.current) return;

    const steps = gsap.utils.toArray(".process-step");
    const totalSteps = steps.length;

    // 1. Horizontal Scroll Pin
    const scrollTween = gsap.to(horizontalRef.current, {
      x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: pinRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${horizontalRef.current!.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // 2. SVG Path Drawing
    if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(pathRef.current, {
           strokeDashoffset: 0,
           scrollTrigger: {
               trigger: pinRef.current,
               start: "top top",
               end: () => `+=${horizontalRef.current!.scrollWidth - window.innerWidth}`,
               scrub: 0.5
           }
        });
    }

    // 3. Step Watermark Reveals
    steps.forEach((step: any, i) => {
        gsap.fromTo(step.querySelector(".step-number"), 
            { opacity: 0, scale: 0.5, y: 100 },
            {
                opacity: 0.05,
                scale: 1,
                y: 0,
                scrollTrigger: {
                    trigger: step,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "left center",
                    scrub: true
                }
            }
        );
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-linear-to-b from-white to-[#f7fcf9] dark:from-[#020403] dark:to-[#040807] overflow-hidden border-y border-emerald-100/30 dark:border-emerald-900/10"
    >
      {/* Decorative Accents */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-100/20 dark:bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-100/10 dark:bg-teal-900/5 rounded-full blur-[80px] pointer-events-none" />
      <div ref={pinRef} className="min-h-screen py-24 w-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="container mx-auto px-6 mb-20 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-600">The Lifecycle</span>
            </div>
            <h2 className="text-[clamp(2.5rem,7vw,3.5rem)] md:text-[clamp(3.5rem,9vw,5rem)]  font-serif font-medium leading-[0.9] text-foreground tracking-tighter">
              <GsapSplitText text={howItWorks.title} />
            </h2>
          </div>
        </div>

        {/* Horizontal Steps Container */}
        <div className="relative w-full ">
             {/* Decorative Background Connection (SVG Path) */}
            <svg 
                className="absolute top-1/2 left-0 w-[200%] h-40 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block"
                viewBox="0 0 1200 100"
                fill="none"
            >
                <path 
                    ref={pathRef}
                    d="M 0 50 C 300 100, 600 0, 900 50 C 1200 100, 1500 0, 1800 50" 
                    stroke="url(#gradient-line)" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10 10"
                />
                <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            <div 
                ref={horizontalRef}
                className="flex flex-nowrap w-max px-[8vw] md:px-[10vw] gap-[8vw] md:gap-[10vw]"
            >
                {howItWorks.steps.map((step, i) => {
                    const Icon = icons[i % icons.length];
                    return (
                        <div 
                            key={i} 
                            className="process-step relative shrink-0 w-[84vw] md:w-[70vw] lg:w-[45vw] group"
                        >
                            {/* Massive Watermark Number */}
                            <div className="step-number absolute -top-24 md:-top-40 -left-10 md:-left-20 text-[10rem] md:text-[20rem] font-serif font-black text-emerald-600 opacity-0 pointer-events-none -z-10 tracking-tighter">
                                0{i + 1}
                            </div>

                            <div className="relative p-8 md:p-12 lg:p-20 rounded-[3rem] md:rounded-[4rem] bg-white dark:bg-zinc-900/40 border border-emerald-50/50 dark:border-white/5 shadow-3xl md:shadow-4xl shadow-emerald-500/5 overflow-hidden backdrop-blur-3xl group-hover:border-emerald-500/30 transition-all duration-700">
                                
                                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start lg:items-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shrink-0">
                                            <Icon className="w-7 h-7 md:w-10 md:h-10" />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-emerald-600 font-bold border border-emerald-100 shadow-sm text-xs md:text-base">
                                            {i + 1}
                                        </div>
                                    </div>

                                    <div className="space-y-4 md:space-y-6 flex-1">
                                        <h4 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight leading-tight">
                                            {step.step}
                                        </h4>
                                        <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Interactive Indicator */}
                                <div className="mt-8 md:mt-12 flex items-center gap-4 text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black">Scroll to next phase</span>
                                    <ChevronRight className="w-4 h-4 animate-bounce-horizontal" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Transition to Benefits */}
        <div className="container mx-auto px-6 mt-16 flex justify-center relative z-20">
            <button 
                onClick={() => document.getElementById('sevora-benefits')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold tracking-[0.2em] uppercase hover:bg-emerald-200/50 transition-all duration-300 border border-emerald-200/50 dark:border-emerald-800/30 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                Why Choose Sevora <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s ease-in-out infinite;
        }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}

