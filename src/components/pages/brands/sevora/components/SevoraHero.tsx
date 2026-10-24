"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SEVORA_DATA } from "../data/sevora.data";
import { ArrowRight, Zap, Star, Droplets, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EnquiryModal } from "../../../home/components/EnquiryModal";

gsap.registerPlugin(ScrollTrigger);

// --- Local Utilities ---

function CinematicOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top Gradient for Navbar readability */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-black/80 via-black/20 to-transparent" />
      {/* Bottom Gradient for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-linear-to-t from-[#fafdfb] via-transparent to-transparent dark:from-[#050a08]" />
      {/* Overall cinematic tint */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

function GsapSplitText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".split-char");
    
    // Set initial state via GSAP to ensure sync with animation
    gsap.set(letters, { 
      y: 120, 
      opacity: 0, 
      rotateX: -100,
      transformOrigin: "50% 100%" 
    });

    gsap.to(letters, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.8,
      stagger: {
        amount: 0.6,
        from: "start"
      },
      ease: "expo.out",
      delay: 1.2,
      force3D: true
    });
  }, { scope: containerRef, dependencies: [text] });

  return (
    <span ref={containerRef} className={`inline-block perspective-2000 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em] last:mr-0 py-2 overflow-hidden">
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

export function SevoraHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { hero } = SEVORA_DATA;

  const enquiryPkg = {
    id: "sevora",
    title: "Sevora Enquiry",
    templateId: "sevora-enquiry",
    image: hero.image,
    tagline: "Natural Sweetness",
    bodyText: "Get in touch with us to discuss wholesale pricing, distribution, and volume terms for Sevora.",
    showCTA: true,
    color: ""
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".hero-badge", ".hero-paragraph", ".hero-cta-group", ".hero-highlights", scrollHintRef.current].filter(Boolean), {
        opacity: 1,
        y: 0,
      });
      gsap.set(bgRef.current, { scale: 1, yPercent: 0 });
      gsap.set(contentRef.current, { y: 0, opacity: 1, scale: 1 });
      return undefined;
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Initial State Setup (Avoid FOUC)
      gsap.set([".hero-badge", ".hero-paragraph", ".hero-cta-group", ".hero-highlights"], {
        opacity: 0,
        y: 30,
      });
    
      // 2. Main Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(bgRef.current, {
        scale: 1,
        duration: 3,
        ease: "power2.out"
      })
      .to(".hero-badge", {
        opacity: 1,
        y: 0,
        duration: 1.2,
      }, "-=2.2")
      .to(".hero-paragraph", {
        opacity: 1,
        y: 0,
        duration: 1.5,
      }, "-=1.4")
      .to(".hero-cta-group", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1
      }, "-=1.2")
      .to(".hero-highlights", {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=1")
      .from(scrollHintRef.current, {
        opacity: 0,
        y: -20,
        duration: 1
      }, "-=0.5");

      // 3. Scroll Triggered Parallax (Optimized)
      gsap.to(bgRef.current, {
        yPercent: 20,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0.25,
        scale: 0.96,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[100vh] py-24 w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Cinematic Background */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-full z-0 origin-center will-change-transform scale-[1.15]"
      >
        <Image
          src={hero.image}
          alt="Sevora Botanical Concept"
          fill
          className="object-cover brightness-[0.7] contrast-[1.1]"
          priority
          sizes="100vw"
        />
        <CinematicOverlay />
      </div>

      <div className="container mx-auto px-6 relative z-20 min-h-[inherit] flex items-center justify-center">
        <div ref={contentRef} className="flex flex-col items-center text-center space-y-10 w-full">
          
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 dark:bg-emerald-900/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.4em] backdrop-blur-3xl border border-white/10 shadow-2xl">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span>Botanical Integrity</span>
          </div>

          {/* Headline */}
          <div className="max-w-[1400px]">
            <h1 className="text-[clamp(2.5rem,7vw,3.5rem)] md:text-[clamp(3.5rem,9vw,5rem)] lg:text-[clamp(5rem,11vw,6.5rem)] font-serif font-medium leading-[0.9] text-white tracking-tighter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <GsapSplitText text={hero.headline} />
            </h1>
            
            <p className="hero-paragraph text-xl md:text-3xl text-emerald-50/80 font-light max-w-2xl mx-auto leading-relaxed mt-12 drop-shadow-lg invisible md:visible">
              {hero.subheadline}
            </p>
          </div>

          {/* CTA Group */}
          <div className="hero-cta-group flex flex-col sm:flex-row gap-8 items-center pt-6 z-30">
            <PremiumButton onClick={() => setIsModalOpen(true)}>
              {hero.primaryCTA}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
            </PremiumButton>
            <Button 
              size="xl" 
              variant="ghost" 
              onClick={() => document.getElementById('sevora-benefits')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-20 px-14 rounded-full text-white text-xl font-medium hover:bg-white/5 transition-all duration-500 active:scale-95 backdrop-blur-md border border-white/10"
            >
              {hero.secondaryCTA}
            </Button>
          </div>

          {/* Features Mini Bar */}
          <div className="hero-highlights hidden lg:flex items-center gap-16 pt-16 border-t border-white/10 w-full max-w-3xl justify-center">
            {hero.highlights.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-emerald-500 border border-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-700">
                  {i === 0 ? <Zap className="w-4 h-4" /> : i === 1 ? <Droplets className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 xl:flex">
        <ChevronDown className="h-5 w-5 animate-bounce" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Scroll</span>
      </div>

      {/* Floating Award - Bottom Right */}
      <div className="absolute bottom-16 right-16 z-30 hidden xl:block">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] items-center gap-6 shadow-4xl flex hover:bg-white/10 transition-colors group cursor-none">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-700 shadow-xl">
                <Star className="w-8 h-8" />
            </div>
            <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">Purity Standard</p>
                <p className="text-2xl font-serif font-bold text-white tracking-tight">100% Organic</p>
            </div>
        </div>
      </div>

      <EnquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkg={enquiryPkg as any}
        brandName="Sevora"
      />

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}

function PremiumButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    const bgRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const onMouseEnter = () => {
        gsap.to(bgRef.current, { y: "0%", duration: 0.4, ease: "power4.out" });
        gsap.fromTo(shineRef.current, { x: "-100%", opacity: 0 }, { x: "100%", opacity: 0.3, duration: 0.8, ease: "slow" });
        gsap.to(textRef.current, { scale: 1.05, duration: 0.3 });
    };

    const onMouseLeave = () => {
        gsap.to(bgRef.current, { y: "100%", duration: 0.4, ease: "power4.in" });
        gsap.to(textRef.current, { scale: 1, duration: 0.3 });
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="relative group overflow-hidden h-20 px-14 rounded-full font-bold text-xl uppercase tracking-widest flex items-center justify-center transition-all duration-500 bg-emerald-600 text-white dark:bg-emerald-600 dark:text-white outline-hidden cursor-pointer shadow-[0_20px_50px_-15px_rgba(16,185,129,0.6)] active:scale-95 z-30"
        >
            {/* Background Fill Animation */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 bg-emerald-400 dark:bg-emerald-500 translate-y-full"
            />

            {/* Shine Effect */}
            <div
                ref={shineRef}
                className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-white to-transparent skew-x-12 opacity-0 -translate-x-full"
            />

            <span ref={textRef} className="relative z-10 flex items-center justify-center transition-transform duration-300">
                {children}
            </span>
        </button>
    );
}
