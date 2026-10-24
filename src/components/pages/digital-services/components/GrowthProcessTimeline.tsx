"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { DIGITAL_PROCESS } from "../constants/digital-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

function GsapSplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const words = text.split(" ");

    useGSAP(() => {
        if (!containerRef.current) return;

        const letters = containerRef.current.querySelectorAll(".split-char");
        
        gsap.set(letters, { 
            y: 80, 
            opacity: 0, 
            rotateX: -90 
        });

        gsap.to(letters, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.01,
            ease: "power4.out",
            delay: delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
            }
        });
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-flex flex-wrap justify-center perspective-1000 max-w-full ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0 py-1 overflow-hidden align-bottom">
                    {word.split("").map((char, j) => (
                        <span key={j} className="split-char inline-block will-change-transform">
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}

function ProcessStep({ step, index, total }: { step: any; index: number; total: number }) {
    const stepRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!stepRef.current || !cardRef.current || !numRef.current || !bgTextRef.current) return;

        // Card reveal with smooth float
        gsap.fromTo(cardRef.current,
            { opacity: 0, x: index % 2 === 0 ? 80 : -80, filter: "blur(20px)", scale: 0.9 },
            {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: stepRef.current,
                    start: "top 90%",
                }
            }
        );

        // Step Hub Activation
        gsap.to(numRef.current, {
            backgroundColor: "var(--emerald-500)",
            color: "white",
            scale: 1.2,
            boxShadow: "0 0 30px rgba(16,185,129,0.5)",
            duration: 0.5,
            scrollTrigger: {
                trigger: numRef.current,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
            }
        });

        // Parallax background text
        gsap.to(bgTextRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: stepRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    }, { scope: stepRef });

    return (
        <div 
            ref={stepRef}
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 mb-24 md:mb-40 lg:mb-64 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Desktop Center Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
                <div 
                    ref={numRef}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-50 dark:bg-background border-2 border-emerald-500/30 flex items-center justify-center transition-all duration-500 z-30"
                >
                    <span className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-500">{step.step}</span>
                </div>
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} relative z-10`}>
                <div 
                    ref={cardRef}
                    className="group relative p-6 sm:p-10 lg:p-16 rounded-[clamp(1.5rem,5vw,3rem)] bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-3xl hover:bg-white dark:hover:bg-white/10 transition-all duration-700 overflow-hidden"
                >
                    <div className="absolute -top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-500/5 rounded-full blur-2xl sm:blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
                    
                    <div className="relative z-10 space-y-6 sm:space-y-8">
                        <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                            <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs sm:text-sm font-black tracking-[0.2em] uppercase">Phase {step.step}</span>
                            <div className="h-px w-8 sm:w-12 bg-emerald-500/20" />
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors leading-[1.2] sm:leading-[1.1] lg:leading-[0.9] break-words">
                            {step.title}
                        </h3>
                        
                        <p className="text-base sm:text-lg lg:text-2xl text-muted-foreground/80 font-light leading-relaxed">
                            {step.description}
                        </p>

                        <div className={`flex items-center gap-3 pt-6 sm:pt-8 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/50 transition-colors" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer Side with Parallax Text */}
            <div className="hidden md:block md:w-[45%] overflow-hidden">
                <div className={`flex flex-col ${index % 2 === 0 ? 'items-end pr-8 lg:pr-16' : 'items-start pl-8 lg:pl-16'}`}>
                    <span 
                        ref={bgTextRef}
                        className="text-[clamp(4rem,8vw,8rem)] lg:text-[clamp(6rem,12vw,14rem)] font-black text-zinc-900/5 dark:text-white/3 leading-none select-none pointer-events-none tracking-tighter"
                    >
                        STEP {step.step}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function GrowthProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!lineRef.current) return;

        // Progress line animation
        gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section 
            id="process"
            ref={containerRef} 
            className="relative min-h-fit py-[clamp(6rem,12vh,12rem)] bg-background overflow-hidden selection:bg-emerald-500/30"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[100vw] h-[100vw] sm:w-[80vw] sm:h-[80vw] md:w-[60vw] md:h-[60vw] bg-emerald-900/5 rounded-full blur-[100px] sm:blur-[150px]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] md:w-[50vw] md:h-[50vw] bg-emerald-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
                
                {/* Tech Grid */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)]" />
            </div>

            <div className="container mx-auto relative z-10 px-4 sm:px-6">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
                    {/* Badge Style like About Page */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-12"
                    >
                        <div className="h-px w-8 sm:w-12 bg-emerald-500" />
                        <span className="text-emerald-600 font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold">
                            Our Methodology
                        </span>
                        <div className="h-px w-8 sm:w-12 bg-emerald-500" />
                    </motion.div>
                    
                    <h2 className="max-w-[1200px] text-[clamp(2rem,8vw,7rem)] font-bold text-foreground leading-[0.95] tracking-tighter mb-8 px-4">
                        <GsapSplitText text="Our Growth Framework" />
                    </h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg sm:text-xl md:text-2xl text-muted-foreground/60 font-light max-w-2xl px-4"
                    >
                        A structured, data-driven approach designed to take brands from initial assessment to global market dominance.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-12 sm:mt-16 flex flex-col items-center text-emerald-500/30"
                    >
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-4 text-center">SCROLL TO DISCOVER</span>
                        <div className="p-3 rounded-full border border-emerald-500/20 animate-bounce">
                            <ArrowDown className="w-4 h-4" />
                        </div>
                    </motion.div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Central High-Tech Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
                        <div className="absolute inset-0 bg-zinc-200 dark:bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
                        <div 
                            ref={lineRef}
                            className="absolute top-0 w-full bg-gradient-to-bottom from-emerald-500 via-emerald-400 to-emerald-600 origin-top shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                            style={{ height: '100%' }}
                        >
                            {/* Line Head (Glow dot that follows the progress) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]" />
                        </div>
                    </div>

                    <div className="relative z-10">
                        {DIGITAL_PROCESS.map((step, idx) => (
                            <ProcessStep 
                                key={idx} 
                                step={step} 
                                index={idx} 
                                total={DIGITAL_PROCESS.length} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
