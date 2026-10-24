"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SEVORA_DATA } from "../data/sevora.data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ChevronRight, Sparkles } from "lucide-react";
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
      { y: 30, opacity: 0, rotateX: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 1, 
        stagger: 0.1, 
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
      {text.split(" ").map((word, i) => (
        <span key={i} className="split-word inline-block mr-[0.3em] font-serif italic">
          {word}
        </span>
      ))}
    </span>
  );
}

export function SevoraFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { faq } = SEVORA_DATA;

  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. STAGGERED REVEAL
    gsap.from(".faq-accordion-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
        }
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 md:py-48 bg-[#fafdfb] dark:bg-[#020504] overflow-hidden border-t border-emerald-500/5 m-0 p-0"
    >
      {/* Background Micro Details */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
           <div className="absolute top-1/2 left-[-10%] w-[60vw] h-[60vw] bg-emerald-500/20 blur-[150px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-24 h-full">
          
          {/* Left: Interactive Sticky Title */}
          <div className="lg:col-span-4 self-start lg:sticky lg:top-24 h-fit">
              <div className="inline-flex items-center gap-3 mb-10 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-2xl">
                  <HelpCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">Pure Curiosity</span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.8] text-foreground tracking-tighter mb-10">
                <GsapSplitText text={faq.title} />
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light italic leading-snug mb-16 opacity-70">
                Everything you need to know about the transition to a purer lifestyle.
              </p>

              <div className="hidden lg:flex flex-col gap-6 p-8 rounded-[3rem] bg-white dark:bg-zinc-900 border border-emerald-500/10 shadow-4xl shadow-emerald-500/5 group hover:border-emerald-500/40 transition-all duration-700">
                   <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white scale-110 shadow-2xl shadow-emerald-500/20 mb-4 group-hover:rotate-12 transition-transform">
                        <Sparkles className="w-8 h-8" />
                   </div>
                   <h4 className="text-2xl font-serif italic text-foreground tracking-tight">Need help?</h4>
                   <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-emerald-600 cursor-pointer flex items-center gap-2 group/btn">
                       Contact Support <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                   </Link>
              </div>
          </div>

          {/* Right: The Modern Accordion */}
          <div className="lg:col-span-8 flex flex-col justify-center">
              <Accordion type="single" collapsible className="w-full space-y-8">
                {faq.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="faq-accordion-item group border-none"
                  >
                    <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-white dark:bg-zinc-900/50 border border-emerald-500/5 hover:border-emerald-500/30 transition-all duration-700 group-data-[state=open]:bg-white group-data-[state=open]:dark:bg-zinc-900 group-data-[state=open]:border-emerald-500/40 shadow-2xl shadow-emerald-500/0 hover:shadow-emerald-500/5 group-data-[state=open]:shadow-emerald-500/10 overflow-hidden">
                        
                        {/* Background Interaction Effect */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-500 opacity-0 group-data-[state=open]:opacity-100 group-data-[state=open]:scale-x-100 scale-x-0 transition-all duration-700 origin-left" />

                        <AccordionTrigger className="flex-row-reverse gap-8 text-2xl md:text-4xl font-serif italic text-foreground hover:no-underline p-0 m-0 text-left items-center group-data-[state=open]:mb-10 transition-all">
                          <span className="shrink-0 w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 group-data-[state=open]:rotate-90 group-data-[state=open]:bg-emerald-500 group-data-[state=open]:text-white">
                             <ChevronRight className="w-8 h-8" />
                          </span>
                          <span className="flex-1 tracking-tighter">
                            {item.q}
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed p-0 m-0 border-l-4 border-emerald-500/10 pl-8 ml-8 group-data-[state=open]:opacity-100 opacity-0 transition-opacity duration-1000">
                          {item.a}
                        </AccordionContent>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
          </div>
      </div>

      <style jsx global>{`
        .shadow-4xl { box-shadow: 0 40px 100px -20px rgba(16, 185, 129, 0.1); }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
        [data-state=open] .accordion-trigger-icon {
            transform: rotate(90deg);
        }
      `}</style>
    </section>
  );
}
