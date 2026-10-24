"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { SEVORA_DATA } from "../data/sevora.data";
import { Check, X, ShieldAlert, Sparkles, ChevronRight, ChevronLeft, MoveRight } from "lucide-react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { GuidedQuiz } from "./GuidedQuiz";

// --- Local Utilities ---

function GsapSplitText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current.querySelectorAll(".split-char"),
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.02, 
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="split-char inline-block will-change-transform translate-z-0">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function ComparisonTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sugarContentRef = useRef<HTMLDivElement>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  const { comparison } = SEVORA_DATA;

  useGSAP(() => {
    // Register plugin inside the effect for Next.js consistency
    gsap.registerPlugin(Draggable);
    
    if (!sliderRef.current || !containerRef.current) return;

    const wrap = containerRef.current;
    const slider = sliderRef.current;
    
    let currentPercentage = 50;

    const updateSlider = (p: number) => {
        if (!wrap || !slider) return;
        const width = wrap.offsetWidth;
        gsap.set(slider, { x: (p / 100) * width });
        gsap.set(".sugar-visual-layer", { clipPath: `inset(0 ${100 - p}% 0 0)` });
    };

    // Initial Setup: Place at 50%
    updateSlider(50);

    // Draggable Logic
    const dragger = Draggable.create(slider, {
        type: "x",
        bounds: wrap,
        edgeResistance: 1,
        zIndexBoost: false,
        onDrag: function() {
            const width = wrap.offsetWidth;
            currentPercentage = (this.x / width) * 100;
            gsap.set(".sugar-visual-layer", {
                clipPath: `inset(0 ${100 - currentPercentage}% 0 0)`
            });
        },
        onThrowUpdate: function() {
             const width = wrap.offsetWidth;
             currentPercentage = (this.x / width) * 100;
             gsap.set(".sugar-visual-layer", {
                clipPath: `inset(0 ${100 - currentPercentage}% 0 0)`
             });
        }
    });

    const onResize = () => {
        updateSlider(currentPercentage);
        if (dragger[0]) {
            dragger[0].update();
        }
    };

    window.addEventListener("resize", onResize);

    // Ambient Animations
    gsap.fromTo(".comparison-hero", 
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }
    );

    // Floating Particles
    gsap.to(".flying-orb", {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
    });

    return () => {
        window.removeEventListener("resize", onResize);
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-white dark:bg-[#020504] overflow-hidden flex flex-col items-center justify-center m-0 p-0"
    >
      {/* Header Overlay */}
      <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 z-50 text-center w-full px-6 pointer-events-none">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400">The Paradox</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-serif font-medium text-white mix-blend-difference tracking-tighter drop-shadow-2xl">
            <GsapSplitText text={comparison.title} />
          </h2>
      </div>

      {/* Main Interactive Container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-full flex items-center justify-center bg-black"
      >
          {/* SEVORA BACKGROUND (REVEALED) */}
          <div className="absolute inset-0 bg-emerald-600 flex overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-12">
                    <div className="flex flex-col items-center text-center text-white max-w-4xl">
                        <div className="flex items-center gap-4 mb-8 opacity-40">
                             <div className="w-12 h-px bg-white" />
                             <span className="text-xs font-black uppercase tracking-widest">The Transformation</span>
                             <div className="w-12 h-px bg-white" />
                        </div>
                        <p className="text-[12vw] font-serif font-black leading-[0.7] mb-12 tracking-tighter">Stevia.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 w-full mt-10">
                            {comparison.features.slice(0, 3).map((f, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <span className="text-[10px] uppercase font-black text-emerald-100/60 tracking-widest">{f.name}</span>
                                    <span className="text-4xl md:text-6xl font-serif font-bold italic text-white drop-shadow-lg">{f.Stevia}</span>
                                    <div className="flex items-center gap-1 text-emerald-200">
                                         <Check className="w-4 h-4" /> 
                                         <span className="text-[10px] font-bold uppercase tracking-tighter">Verified Pure</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Visual Flair: Floating Orbs */}
                <div className="flying-orb absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                <div className="flying-orb absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
          </div>

          {/* SUGAR FOREGROUND (CLIPPED) */}
          <div className="sugar-visual-layer absolute inset-0 bg-[#080808] flex z-20 pointer-events-none will-change-transform">
                <div className="w-full h-full flex items-center justify-center p-12 flex-shrink-0">
                    <div className="flex flex-col items-center text-center text-zinc-600 max-w-4xl">
                        <div className="flex items-center gap-4 mb-8 opacity-20">
                             <div className="w-12 h-px bg-zinc-500" />
                             <span className="text-xs font-black uppercase tracking-widest">The Risk Profile</span>
                             <div className="w-12 h-px bg-zinc-500" />
                        </div>
                        <p className="text-[12vw] font-serif font-black leading-[0.7] mb-12 tracking-tighter text-zinc-800">Sugar.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 w-full mt-10">
                            {comparison.features.slice(0, 3).map((f, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <span className="text-[10px] uppercase font-black text-zinc-700 tracking-widest">{f.name}</span>
                                    <span className="text-4xl md:text-6xl font-serif font-bold italic text-zinc-700">{f.sugar}</span>
                                    <div className="flex items-center gap-1 text-red-900/40">
                                         <X className="w-4 h-4" /> 
                                         <span className="text-[10px] font-bold uppercase tracking-tighter">Excessive</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
          </div>

          {/* DRAG HANDLE FILAMENT */}
          <div 
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white/20 z-40 flex items-center justify-center cursor-ew-resize will-change-transform"
            style={{ left: 0 }} // Start at 0, transform handled by GSAP
          >
              <div className="absolute h-full w-[1px] bg-linear-to-b from-transparent via-white/60 to-transparent" />
              
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-4xl group hover:scale-110 transition-transform duration-500">
                 <div className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white/40 group-hover:text-white transition-colors" />
                    <div className="w-px h-6 bg-white/20" />
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white/40 group-hover:text-white transition-colors" />
                 </div>
                 
                 {/* Visual Pulse */}
                 <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
              </div>
              
              {/* Floating Interaction Labels */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-32 pointer-events-none hidden md:block opacity-40 group-hover:opacity-100 transition-opacity">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 text-right">The Paradox</p>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-32 pointer-events-none hidden md:block opacity-40 group-hover:opacity-100 transition-opacity">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">The Pure</p>
              </div>
          </div>

      </div>

      {/* Footer Callout */}
      <div className="absolute bottom-10 md:bottom-20 left-0 w-full px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-2 z-50 pointer-events-none">
           <div className="max-w-xl">
                <p className="text-xl md:text-3xl font-serif italic text-white/80 leading-tight drop-shadow-xl">
                    "{comparison.highlight}"
                </p>
           </div>
           
           <div className="pointer-events-auto">
                <button 
                    onClick={() => setIsQuizOpen(true)}
                    className="px-10 py-5 rounded-full bg-emerald-500 text-white font-black uppercase text-[10px] tracking-[0.4em] flex items-center gap-4 hover:bg-emerald-400 hover:scale-105 transition-all shadow-2xl active:scale-95 group"
                >
                    Begin Your Purification <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
           </div>
      </div>

      <GuidedQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <style jsx global>{`
        .shadow-4xl {
            box-shadow: 0 0 100px rgba(0,0,0,0.8);
        }
        @keyframes shine {
            to { transform: translateX(300%) skewX(-25deg); }
        }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}
