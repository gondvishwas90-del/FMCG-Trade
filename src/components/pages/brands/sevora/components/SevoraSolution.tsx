"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SEVORA_DATA } from "../data/sevora.data";
import { Check, Leaf, Heart, Wind, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Local Utilities ---

function GsapSplitText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".split-char");
    gsap.fromTo(letters,
      { y: 40, opacity: 0, scale: 1.1 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0 overflow-hidden py-1">
          {word.split("").map((char, j) => (
            <span key={j} className="split-char inline-block will-change-transform opacity-0">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export function SevoraSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { solution } = SEVORA_DATA;
  const icons = [Wind, Heart, ShieldCheck, Leaf];

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Image parallax animation removed as requested to keep it simple.

    // 2. Sticky Reveal Logic (Horizontal Scroll Feel on Vertical Scroll)
    const cards = gsap.utils.toArray(".benefit-card");
    
    gsap.fromTo(cards, 
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1
        }
      }
    );

    // 3. Floating Leaf Decor (Desktop Only Pin)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top 15%",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
      });
    });

    gsap.to(".floating-leaf", {
        y: -50,
        rotate: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 md:py-24 lg:py-24 bg-linear-to-b from-[#f7fcf9] to-white dark:from-[#040807] dark:to-[#020403] overflow-hidden"
    >
      {/* Botanical Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-100/20 dark:bg-teal-900/5 rounded-full blur-[80px] md:blur-[130px] pointer-events-none" />

      {/* Floating Decorative Leaf */}
      <div className="floating-leaf absolute top-40 right-20 text-emerald-600/5 dark:text-emerald-400/5 transition-opacity hidden lg:block">
        <Leaf className="w-96 h-96 transform -rotate-12" />
      </div>

      <div className="container mx-auto px-6">
        <div ref={triggerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* CONTENT COLUMN - STICKY FEEL */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-10 lg:space-y-12">

            <div>
              <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 md:px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/20 uppercase tracking-[0.4em] md:tracking-[0.5em] text-[9px] md:text-[10px] font-black text-emerald-600">
                <Wind className="w-3 h-3" />
                <span>The Purity Standard</span>
              </div>

              <h3 className="text-[clamp(2.25rem,8vw,3.5rem)] lg:text-[clamp(3rem,8vw,4.5rem)] font-serif font-medium leading-[1] lg:leading-[0.9] text-foreground tracking-tighter mb-6 lg:mb-8 [text-shadow:0_2px_10px_rgba(0,0,0,0.02)]">
                <GsapSplitText text={solution.title} />
              </h3>

              <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 dark:text-white/70 font-light leading-relaxed border-l-2 border-emerald-500/20 pl-6 md:pl-8">
                {solution.description}
              </p>
            </div>

            {/* Cinematic Featured Callout */}
            <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-emerald-100/50 dark:border-emerald-900/30 shadow-2xl md:shadow-3xl shadow-emerald-500/5 group">
              <div className="flex items-center gap-5 md:gap-6 mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform shrink-0">
                  <Leaf className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div>
                   <h4 className="text-lg md:text-xl font-serif font-bold text-foreground leading-tight">100% Reb-A Extract</h4>
                   <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1">High-Altitude Sourced</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                "We exclusively use high-purity extraction to ensure zero bitter aftertaste, delivering exactly what nature intended."
              </p>
            </div>
          </div>

          {/* GALLERY & BENEFITS COLUMN */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 content-start">
            {/* Cinematic Image Reveal */}
            <div 
              ref={imageRef}
              className="relative col-span-1 sm:col-span-2 h-[40vh] min-h-[250px] rounded-[2rem] overflow-hidden group shadow-2xl shadow-emerald-500/5 transition-transform duration-1000"
            >
              <Image
                src={solution.image}
                alt="Natural Stevia Environment"
                fill
                className="object-cover transition-transform duration-1000 scale-[1.1] group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-950/80 via-emerald-950/20 to-transparent opacity-80" />
              
            
            </div>

            {/* Benefits Interactive Grid */}
            {solution.benefits.map((benefit, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div 
                  key={i} 
                  className="benefit-card group p-6 rounded-[2rem] bg-white border border-zinc-100 dark:bg-zinc-900/50 dark:border-zinc-800 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-700 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 border border-emerald-100/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h5 className="text-lg font-serif font-bold text-foreground group-hover:text-emerald-500 transition-colors leading-tight">{benefit}</h5>
                  </div>
                  <div className="h-1 w-8 bg-emerald-100 dark:bg-emerald-900 group-hover:w-full group-hover:bg-emerald-500 transition-all duration-700 mt-auto" />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx global>{`
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}
