"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Factory, RefreshCw, Star, TrendingUp, ArrowUpRight } from "lucide-react";
import { TARGET_AUDIENCE } from "../constants/digital-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, any> = {
    Globe,
    Factory,
    RefreshCw,
    Star,
    TrendingUp
};

// --- Sub-components ---

function GsapSplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const words = text.split(" ");

    useGSAP(() => {
        if (!containerRef.current) return;

        const letters = containerRef.current.querySelectorAll(".split-char");
        
        gsap.set(letters, { 
            y: 100, 
            opacity: 0, 
            rotateX: -90 
        });

        gsap.to(letters, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.015,
            ease: "expo.out",
            delay: delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
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

function AudienceCard({ item, index, Icon }: { item: any; index: number; Icon: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        // Entrance animation
        gsap.fromTo(cardRef.current, 
            { opacity: 0, y: 50, scale: 0.9 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.5, 
                ease: "power3.out",
                delay: index * 0.05,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                }
            }
        );
    }, { scope: cardRef });

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(glowRef.current, {
            x: x - 75,
            y: y - 75,
            opacity: 1,
            duration: 0.6,
        });

        // Magnetic icon effect
        if (iconRef.current) {
            const iconRect = iconRef.current.getBoundingClientRect();
            const iconCenterX = iconRect.left + iconRect.width / 2;
            const iconCenterY = iconRect.top + iconRect.height / 2;
            const dist = Math.hypot(e.clientX - iconCenterX, e.clientY - iconCenterY);
            
            if (dist < 100) {
                gsap.to(iconRef.current, {
                    x: (e.clientX - iconCenterX) * 0.3,
                    y: (e.clientY - iconCenterY) * 0.3,
                    duration: 0.3,
                });
            } else {
                gsap.to(iconRef.current, { x: 0, y: 0, duration: 0.5 });
            }
        }
    };

    const onMouseLeave = () => {
        if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.6 });
        if (iconRef.current) gsap.to(iconRef.current, { x: 0, y: 0, duration: 0.5 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group relative overflow-hidden rounded-[clamp(1.5rem,4vw,2.5rem)] bg-white/5 dark:bg-zinc-900/40 border border-white/10 p-8 md:p-10 backdrop-blur-3xl transition-all duration-500 hover:border-emerald-500/20 hover:bg-white/10 dark:hover:bg-zinc-900/60"
        >
            {/* Hover Glow */}
            <div 
                ref={glowRef}
                className="pointer-events-none absolute -inset-px opacity-0 blur-3xl transition-opacity duration-500 bg-emerald-500/10 w-[150px] h-[150px] rounded-full"
            />

            <div className="relative z-10 flex flex-col h-full">
                <div 
                    ref={iconRef}
                    className="mb-8 w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white"
                >
                    <Icon className="w-8 h-8" />
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors flex items-center gap-2">
                        {item.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light">
                        {item.description}
                    </p>
                </div>

                <div className="mt-auto pt-8 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/10 group-hover:bg-emerald-500/20 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-emerald-500/40 transition-colors">
                        0{index + 1}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function TargetAudience() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative min-h-fit flex flex-col items-center justify-center py-[clamp(6rem,12vh,12rem)] overflow-hidden selection:bg-emerald-500/30">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/5 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="flex flex-col items-center text-center mb-24">
                    {/* Badge Style like About Page */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8 md:mb-12"
                    >
                        <div className="h-px w-12 bg-emerald-500" />
                        <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                            Target Audience
                        </span>
                    </motion.div>

                    <h2 className="max-w-[1200px] text-[clamp(2rem,8vw,6rem)] font-bold text-foreground leading-[0.95] tracking-tighter mb-8 px-4">
                        <GsapSplitText text="Who This Is For" />
                    </h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl lg:text-2xl text-muted-foreground/80 font-light max-w-2xl mx-auto leading-relaxed px-4"
                    >
                        Our digital ecosystem is built for brands, manufacturers, and businesses ready to establish authority and scale across global markets.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TARGET_AUDIENCE.map((item, idx) => (
                        <AudienceCard 
                            key={idx} 
                            item={item} 
                            index={idx} 
                            Icon={ICONS[item.icon] || Globe} 
                        />
                    ))}
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
