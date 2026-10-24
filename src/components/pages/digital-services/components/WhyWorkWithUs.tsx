"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap, BarChart, HeartHandshake, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { WHY_WORK_WITH_US } from "../constants/digital-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Zap, ShieldCheck, Award, BarChart, HeartHandshake];

function GrainOverlay() {
    return (
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}

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
                start: "top 90%",
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

function AdvantageItem({ item, index, icon: Icon }: { item: any; index: number; icon: any }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!itemRef.current || !lineRef.current) return;

        gsap.fromTo(itemRef.current,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "expo.out",
                delay: index * 0.08,
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: "top 95%",
                }
            }
        );

        gsap.fromTo(lineRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 0.75,
                ease: "power3.inOut",
                delay: 0.4 + (index * 0.05),
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: "top 95%",
                }
            }
        );
    }, { scope: itemRef });

    return (
        <div 
            ref={itemRef} 
            className="group relative py-10 md:py-12 px-6 md:px-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start rounded-[clamp(1.5rem,4vw,2.5rem)] transition-all duration-700 hover:bg-white/5 border border-transparent hover:border-white/10"
        >
            <div 
                className="shrink-0 w-20 h-20 rounded-[1.8rem] bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-700 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="w-10 h-10 relative z-10" />
            </div>
            
            <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tighter text-foreground group-hover:text-emerald-500 transition-colors duration-500">
                        {item.title}
                    </h3>
                    <div className="p-2 rounded-full border border-white/5 group-hover:border-emerald-500/30 transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all" />
                    </div>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-500 leading-relaxed max-w-2xl font-light">
                    {item.description}
                </p>
            </div>

            {/* Bottom Accent Line */}
            <div 
                ref={lineRef}
                className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-emerald-500/30 via-emerald-500/10 to-transparent origin-left opacity-20 group-hover:opacity-100 transition-opacity duration-700" 
            />
        </div>
    );
}

export default function WhyWorkWithUs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!hubRef.current || !containerRef.current || !pinRef.current) return;

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

        // Hub rotation logic
        gsap.to(hubRef.current.querySelector(".hub-ring"), {
            rotate: 360,
            duration: 60,
            repeat: -1,
            ease: "none"
        });

        gsap.to(hubRef.current.querySelector(".hub-ring-inner"), {
            rotate: -360,
            duration: 35,
            repeat: -1,
            ease: "none"
        });

        gsap.to(hubRef.current.querySelector(".particle-ring"), {
            rotate: 360,
            duration: 25,
            repeat: -1,
            ease: "none"
        });
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-fit flex flex-col items-center justify-center py-[clamp(8rem,18vh,18rem)] bg-background overflow-hidden selection:bg-emerald-500/30"
        >
            <GrainOverlay />
            
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-500/3 rounded-full blur-[180px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-emerald-900/3 rounded-full blur-[180px] animate-pulse [animation-delay:2s]" />
                
                {/* Refined Grid Pattern */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)]" />
                
                {/* Light Beams */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-emerald-500/20 to-transparent opacity-50" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-emerald-500/20 to-transparent opacity-50" />
            </div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* Visual Hub Side (Pinned) */}
                    <div ref={pinRef} className="lg:col-span-12 xl:col-span-5 relative order-2 lg:order-1 flex justify-center items-center min-h-[50vh] lg:min-h-[100dvh] py-10 lg:py-0">
                        <div ref={hubRef} className="relative w-full max-w-[min(550px,90vw)] aspect-square flex items-center justify-center scale-90 md:scale-100">
                            
                            {/* Core Pulsing Auras */}
                            <div className="absolute w-[120%] h-[120%] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[60px] animate-pulse animation-delay-1000" />

                            {/* Rotating Rings */}
                            <div className="hub-ring absolute inset-0 border border-emerald-500/20 rounded-full" />
                            <div className="hub-ring-inner absolute inset-12 border border-white/10 rounded-full border-dashed" />
                            
                            {/* Particle Ring */}
                            <div className="particle-ring absolute inset-0">
                                {[...Array(12)].map((_, i) => (
                                    <div 
                                        key={i}
                                        className="absolute w-1 h-1 bg-emerald-500/40 rounded-full"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `rotate(${i * 30}deg) translate(220px)`
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Core Hub Content */}
                            <div className="relative z-10 w-56 h-56 rounded-full bg-background border border-border flex flex-col items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.15)] group transition-all duration-1000 hover:border-emerald-500/50">
                                <div className="absolute inset-[-8px] border border-emerald-500/10 rounded-full animate-pulse" />
                                <div className="absolute inset-[-2px] border border-emerald-500/20 rounded-full" />
                                
                                <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-emerald-600 mb-2">NETWORK</span>
                                <div className="text-5xl font-bold text-foreground group-hover:text-emerald-500 transition-all duration-700 tracking-tighter">FMCG</div>
                                <div className="mt-4 flex gap-1">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                                    ))}
                                </div>
                                
                                {/* Floating Active Connection Points */}
                                {[0, 72, 144, 216, 288].map((angle, i) => (
                                    <motion.div 
                                        key={i}
                                        animate={{ 
                                            y: [0, -15, 0],
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{ 
                                            duration: 4, 
                                            delay: i * 0.8, 
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute w-4 h-4 rounded-full"
                                        style={{ 
                                            backgroundColor: '#10b981',
                                            boxShadow: '0 0 20px rgba(16,185,129,0.8)',
                                            transform: `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Floating Impact Stats Card */}
                            <motion.div 
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -right-12 p-10 rounded-[2.5rem] bg-card/40 border border-white/10 shadow-3xl backdrop-blur-3xl hidden md:block group hover:bg-card/60 transition-colors duration-500"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 to-transparent opacity-50" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-emerald-600 block mb-3">Strategy Framework</span>
                                <div className="text-4xl font-bold text-white tracking-tighter">Execution <span className="text-emerald-500">First</span></div>
                                <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Active Processing
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-7 space-y-20 order-1 lg:order-2">
                        <div className="space-y-10">
                            {/* Badge Style like About Page */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="h-px w-12 bg-emerald-500" />
                                <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                                    The Advantage
                                </span>
                            </motion.div>
                            
                             <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-bold text-foreground leading-[0.95] tracking-tighter">
                                <GsapSplitText text="Why Brands Work With Us" />
                            </h2>
                        </div>

                        <div className="flex flex-col">
                            {WHY_WORK_WITH_US.map((item, idx) => (
                                <AdvantageItem 
                                    key={idx} 
                                    item={item} 
                                    index={idx} 
                                    icon={ICONS[idx % ICONS.length]} 
                                />
                            ))}
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
