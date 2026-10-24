"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, BarChart3, Box, Globe, Cpu } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

function GsapSplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
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
                start: "top 110%",
            }
        });
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-block perspective-1000 ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0 py-1 overflow-hidden">
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

function FloatingCard({ item, index }: { item: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current || !iconRef.current) return;

        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power4.out",
                delay: 0.1 + (index * 0.05),
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 110%",
                }
            }
        );
    }, { scope: cardRef });

    return (
        <div 
            ref={cardRef}
            className="group relative flex flex-col p-6 md:p-8 rounded-[clamp(1.5rem,4vw,2rem)] bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-3xl hover:bg-white dark:hover:bg-white/10 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-500/5 overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-xl relative z-10">
                <item.icon className="w-7 h-7" />
            </div>
            
            <div className="space-y-3 relative z-10">
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/60 dark:text-emerald-500/50">Core Advantage</span>
                <h4 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">{item.title}</h4>
                <div className="w-8 h-1 bg-emerald-500/20 group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-500" />
            </div>
        </div>
    );
}

export default function TradeConnection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!orbRef.current || !containerRef.current || !pinRef.current) return;

        // --- Pinning Logic (Desktop Only) ---
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: pinRef.current,
                pinSpacing: false,
                scrub: 1,
            });
        });

        // Synergy Orb Pulse/Rotation
        gsap.to(orbRef.current.querySelector(".orb-glow"), {
            scale: 1.2,
            opacity: 0.6,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(orbRef.current.querySelector(".orb-ring"), {
            rotate: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }, { scope: containerRef });

    return (
        <section 
            id="synergy"
            ref={containerRef} 
            className="relative min-h-fit flex flex-col items-center justify-center py-[clamp(6rem,15vh,15rem)] bg-background overflow-hidden border-t border-white/5 selection:bg-emerald-500/30"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-200 dark:bg-emerald-900/5 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
                
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]" />
            </div>

            <div className="container mx-auto relative z-10 px-6 max-w-[1800px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
                    
                    {/* Left Column: Vision & Connectivity */}
                    <div className="lg:col-span-5 space-y-16">
                        <div className="space-y-12">
                            {/* Badge Style like About Page */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="h-px w-12 bg-emerald-500" />
                                <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                                    Integrated Ecosystem
                                </span>
                            </motion.div>
                            
                            <div className="space-y-10">
                                <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold text-foreground leading-[0.95] tracking-tighter">
                                    <span className="block mb-4">From Strategy to Scale — One Integrated System</span>
                                </h2>

                                {/* Impact Badges beside/below title */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-xl"
                                    >
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[11px] font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-500 uppercase">Demand Creation</span>
                                    </motion.div>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.25 }}
                                        className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 backdrop-blur-xl"
                                    >
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                                        <span className="text-[11px] font-mono font-black tracking-widest text-emerald-600 dark:text-emerald-500 uppercase">Brand Velocity</span>
                                    </motion.div>
                                </div>
                            </div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="space-y-8 text-xl md:text-2xl text-muted-foreground/80 font-light leading-relaxed max-w-2xl"
                            >
                                <p>
                                    We don’t just support distribution. We build demand, strengthen brand presence, and enable consistent performance across markets.
                                </p>
                                <p>
                                    This integrated approach ensures faster market penetration and sustainable demand for brands looking to scale globally.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Faster Market Penetration", icon: Zap },
                                { title: "Stronger Brand Positioning", icon: ShieldCheck },
                                { title: "Improved Sales Velocity", icon: BarChart3 },
                                { title: "Higher Repeat Demand", icon: Box },
                            ].map((item, idx) => (
                                <FloatingCard key={idx} item={item} index={idx} />
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/5">
                            <Link 
                                href="/how-we-work"
                                className="inline-flex items-center gap-4 text-xl font-bold text-foreground hover:text-emerald-500 transition-all group"
                            >
                                Explore our execution model
                                <div className="p-3 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: The Synergy Orb Visual (Pinned) */}
                    <div ref={pinRef} className="lg:col-span-7 relative flex items-center justify-center min-h-fit lg:min-h-[100dvh]">
                        <div ref={orbRef} className="relative w-full max-w-[min(650px,90vw)] max-h-[80vh] aspect-square flex items-center justify-center">
                            
                            {/* Central Glow Orb */}
                            <div className="orb-glow absolute w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[clamp(50px,10vw,100px)] pointer-events-none" />
                            
                            {/* Rotating Rings */}
                            <div className="orb-ring absolute w-[90%] h-[90%] border-2 border-dashed border-emerald-500/20 rounded-full" />
                            <div className="orb-ring absolute w-[75%] h-[75%] border border-emerald-500/10 rounded-full direction-[reverse]" />
                            
                            {/* Data Nodes */}
                            {[0, 90, 180, 270].map((angle, i) => (
                                <div 
                                    key={i}
                                    className="absolute w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20"
                                    style={{ 
                                        transform: `rotate(${angle}deg) translateY(-45%)`,
                                        transformOrigin: "center center"
                                    }}
                                />
                            ))}

                            {/* Core Brand / Content */}
                            <div className="relative z-30 flex flex-col items-center justify-center p-12 text-center space-y-8 backdrop-blur-3xl bg-zinc-50/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full w-[55%] h-[55%] shadow-4xl group hover:border-emerald-500/50 transition-colors duration-1000">
                                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-700 shadow-xl">
                                    <Cpu className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-bold tracking-tighter text-emerald-500 group-hover:text-white transition-colors">SYNERGY</h4>
                                    <p className="text-xs font-mono font-black uppercase tracking-[0.5em] text-muted-foreground/60">Execution Engine</p>
                                </div>
                                <div className="flex items-center gap-4 py-4 border-y border-white/5">
                                    <span className="text-sm font-bold uppercase tracking-widest">Trade</span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Digital</span>
                                </div>
                            </div>
                        </div>
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
