"use client";

import React, { useRef } from "react";
import { SEVORA_DATA } from "../data/sevora.data";
import { CheckCircle2, Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
      { y: 30, opacity: 0, filter: "blur(10px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 1, 
        stagger: 0.05, 
        ease: "power3.out",
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

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isCarouselMode, setIsCarouselMode] = React.useState(false);
  const { testimonials } = SEVORA_DATA;

  // We only show 3 cards in the stack to keep the entrance tidy, 
  // but the final card becomes a carousel for ALL.
  const stackItems = testimonials.items.slice(0, 3);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // 1. PINNED STACK TIMELINE
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                // When we reach 85% of the fly-away animation, enable carousel controls
                const shouldBeCarousel = self.progress > 0.85;
                setIsCarouselMode((prev) => {
                    if (prev !== shouldBeCarousel) return shouldBeCarousel;
                    return prev;
                });
            }
        }
    });

    const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
    
    // Initial Stacking Positions
    cards.forEach((card, i) => {
        gsap.set(card, {
            zIndex: cards.length - i,
            scale: 1 - (i * 0.05),
            y: i * 20,
            opacity: 1 - (i * 0.2)
        });
    });

    // Animate each card flying away
    cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card stays

        const directionX = i % 2 === 0 ? -1500 : 1500;
        const directionY = -200 + (Math.random() * 400);
        const rotation = i % 2 === 0 ? -45 : 45;

        tl.to(card, {
          x: directionX,
          y: directionY,
          rotation: rotation,
          opacity: 0,
          scale: 1.2,
          filter: "blur(20px)",
          ease: "power2.inOut"
        }, i * 0.5);

        // Scale up the next card
        if (cards[i+1]) {
            tl.to(cards[i+1], {
                scale: 1,
                y: 0,
                opacity: 1,
                ease: "power2.inOut"
            }, i * 0.5);
        }
    });

    // 2. Background Blur Tracking
    tl.to(".bg-glow-testimonial", {
        scale: 1.5,
        opacity: 0.1,
        duration: 1,
        ease: "none"
    }, 0);

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full bg-[#fafdfb] dark:bg-[#020504] overflow-hidden flex flex-col items-center justify-center m-0 p-0"
    >
      {/* Cinematic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="bg-glow-testimonial absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.02)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col items-center justify-center">
          
          {/* Section Header */}
          <div className="absolute top-12 md:top-20 text-center z-50 pointer-events-none">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-xl">
                  <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600">The Validation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-medium leading-none text-foreground tracking-tighter">
                <GsapSplitText text={testimonials.title} />
              </h2>
          </div>

          {/* TESTIMONIAL STACK ENGINE */}
          <div 
            ref={containerRef} 
            className="relative w-full max-w-4xl h-[600px] flex items-center justify-center mt-20"
          >
              {stackItems.map((_, i) => (
                  <div 
                    key={i} 
                    className={`testimonial-card absolute w-full md:w-[800px] p-12 md:p-20 rounded-[4rem] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-4xl group transition-colors duration-700 hover:border-emerald-500/30 overflow-hidden ${i === stackItems.length - 1 ? "min-h-[500px]" : "h-[500px]"}`}
                  >
                        {/* Background Quote Mark */}
                        <Quote className="absolute -top-10 -right-10 w-64 h-64 text-emerald-500/5 rotate-12 group-hover:text-emerald-500/10 transition-colors duration-1000" />
                        
                        {/* If it's the last card, render the Carousel content */}
                        {i === stackItems.length - 1 ? (
                            <div className="relative z-10 flex flex-col items-start h-full w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                        className="w-full flex flex-col items-start"
                                    >
                                        <div className="flex gap-1 mb-10">
                                            {[1,2,3,4,5].map(star => (
                                                <Star key={star} className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                                            ))}
                                        </div>
                                        
                                        <blockquote className="text-2xl md:text-4xl font-serif italic text-foreground leading-[1.1] tracking-tight mb-16 selection:bg-emerald-500/30">
                                            &ldquo;{testimonials.items[activeIndex].quote}&rdquo;
                                        </blockquote>

                                        <div className="flex items-center gap-6 mt-auto">
                                            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-serif font-black shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                                                {testimonials.items[activeIndex].author.charAt(0)}
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                                                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-1">{testimonials.items[activeIndex].author}</h4>
                                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-600/60">{testimonials.items[activeIndex].role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-start h-full">
                                <div className="flex gap-1 mb-10">
                                    {[1,2,3,4,5].map(star => (
                                        <Star key={star} className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                                    ))}
                                </div>
                                
                                <blockquote className="text-2xl md:text-4xl font-serif italic text-foreground leading-[1.1] tracking-tight mb-16 selection:bg-emerald-500/30">
                                    &ldquo;{testimonials.items[i].quote}&rdquo;
                                </blockquote>

                                <div className="flex items-center gap-6 mt-auto">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-serif font-black shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                                        {testimonials.items[i].author.charAt(0)}
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                                             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-1">{testimonials.items[i].author}</h4>
                                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-600/60">{testimonials.items[i].role}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Interactive Shine */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
              ))}

              {/* Fixed Carousel Controls */}
              <AnimatePresence>
                  {isCarouselMode && (
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -bottom-6 right-4 md:-bottom-12 md:right-10 flex items-center gap-4 z-50 pointer-events-auto"
                      >
                          <button 
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex((prev) => (prev > 0 ? prev - 1 : testimonials.items.length - 1));
                              }}
                              className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/30 cursor-pointer"
                          >
                              <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button 
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex((prev) => (prev < testimonials.items.length - 1 ? prev + 1 : 0));
                              }}
                              className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/30 cursor-pointer"
                          >
                              <ArrowRight className="w-5 h-5" />
                          </button>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>

      </div>

      {/* Progress Counter */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-12 text-[8px] font-black uppercase tracking-[0.6em] text-muted-foreground/40 pointer-events-none">
           <span className="hidden md:block">Trust Metric</span>
           <div className="flex gap-3">
               {testimonials.items.map((_, i) => (
                   <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === (isCarouselMode ? activeIndex : 0) ? "bg-emerald-500 w-6" : "bg-emerald-500/20"}`} 
                    />
               ))}
           </div>
           <span className="hidden md:block">Real Verification</span>
      </div>

      <style jsx global>{`
        .shadow-4xl { box-shadow: 0 60px 150px -30px rgba(16, 185, 129, 0.1); }
        ::selection {
            background: rgba(16, 185, 129, 0.4);
            color: white;
        }
      `}</style>
    </section>
  );
}
