"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    TrendingUp, 
    Globe, 
    Target, 
    ShieldCheck, 
    Zap,
    ArrowUpRight,
    Eye,
    Activity,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
    {
        title: "Get Discovered Faster",
        description: "Be where your customers are searching, ensuring your brand is the first point of contact in new markets.",
        icon: Search,
        stat: "85%+",
        statLabel: "Intent Traffic",
        color: "emerald"
    },
    {
        title: "Build Trust Early",
        description: "Establish authority and credibility before the first interaction even happens across digital channels.",
        icon: ShieldCheck,
        stat: "Instant",
        statLabel: "Trust Factor",
        color: "blue"
    },
    {
        title: "Convert Efficiently",
        description: "Optimize every touchpoint in the customer journey to drive measurable growth and higher efficiency.",
        icon: TrendingUp,
        stat: "3.4x",
        statLabel: "Avg. Conversion",
        color: "purple"
    },
    {
        title: "Scale Without Friction",
        description: "Expand into the UK, EU, or Middle East with a digital framework that adapts to local demand automatically.",
        icon: Globe,
        stat: "Global",
        statLabel: "Deployment",
        color: "cyan"
    },
    {
        title: "Compete Effectively",
        description: "Compete effectively, regardless of size, by leveraging strategic digital positioning and agility.",
        icon: Target,
        stat: "Top 1%",
        statLabel: "Positioning",
        color: "emerald"
    }
];

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

function RationaleCard({ reason, index }: { reason: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        gsap.fromTo(cardRef.current, 
            { opacity: 0, y: 40, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.5, 
                ease: "power2.out",
                delay: index * 0.05,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 95%",
                }
            }
        );
    }, { scope: cardRef });

    const handleMouseEnter = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, { scale: 1.1, rotate: 5, duration: 0.4, ease: "back.out" });
        }
    };

    const handleMouseLeave = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        }
    };

    const colorMap: { [key: string]: { bg: string, border: string, text: string, hoverBg: string } } = {
        emerald: { 
            bg: "bg-emerald-500/10 dark:bg-emerald-500/10", 
            border: "border-emerald-500/20 dark:border-emerald-500/30", 
            text: "text-emerald-600 dark:text-emerald-500",
            hoverBg: "group-hover:bg-emerald-500"
        },
        blue: { 
            bg: "bg-blue-500/10 dark:bg-blue-500/10", 
            border: "border-blue-500/20 dark:border-blue-500/30", 
            text: "text-blue-600 dark:text-blue-500",
            hoverBg: "group-hover:bg-blue-500"
        },
        purple: { 
            bg: "bg-purple-500/10 dark:bg-purple-500/10", 
            border: "border-purple-500/20 dark:border-purple-500/30", 
            text: "text-purple-600 dark:text-purple-500",
            hoverBg: "group-hover:bg-purple-500"
        },
        cyan: { 
            bg: "bg-cyan-500/10 dark:bg-cyan-500/10", 
            border: "border-cyan-500/20 dark:border-cyan-500/30", 
            text: "text-cyan-600 dark:text-cyan-500",
            hoverBg: "group-hover:bg-cyan-500"
        }
    };

    const colors = colorMap[reason.color] || colorMap.emerald;

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative flex flex-col p-10 lg:p-12 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-white/10 transition-all duration-500 hover:bg-white dark:hover:bg-zinc-900/40 backdrop-blur-md"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-10">
                    <div 
                        ref={iconRef}
                        className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} ${colors.text} flex items-center justify-center shadow-2xl transition-all duration-500 ${colors.hoverBg} group-hover:text-white`}
                    >
                        <reason.icon className="w-8 h-8" />
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <span className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-500 leading-none">{reason.stat}</span>
                        <span className="text-[10px] uppercase tracking-tighter text-muted-foreground leading-none mt-1 font-bold">{reason.statLabel}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors duration-300">
                        {reason.title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
                        {reason.description}
                    </p>
                </div>

                <div className="mt-auto pt-8 flex items-center justify-between border-t border-zinc-200/50 dark:border-white/5">
                    <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 dark:text-muted-foreground/30 group-hover:text-emerald-500 transition-colors" />
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>
    );
}

export default function DigitalIntro() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section 
            id="digital-intro" 
            ref={containerRef} 
            className="relative min-h-fit flex flex-col items-center justify-center py-[clamp(6rem,12vh,12rem)] bg-background overflow-hidden border-t border-white/5 selection:bg-emerald-500/30"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/5 rounded-full blur-[150px] animate-pulse [animation-delay:2s]" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="flex flex-col items-center text-center">
                    {/* Badge Style like About Page */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8 md:mb-10"
                    >
                        <div className="h-px w-12 bg-emerald-500" />
                        <span className="text-emerald-600 font-mono text-xs sm:text-sm tracking-widest uppercase font-semibold">
                            Digital Foundation
                        </span>
                        <div className="h-px w-12 bg-emerald-500" />
                    </motion.div>

                    <h2 className="max-w-[1200px] text-[clamp(2rem,8vw,6rem)] font-bold text-foreground leading-[0.95] tracking-tighter mb-8 md:mb-12">
                        <GsapSplitText text="In Today’s Market," className="block" />
                        <span className="text-muted-foreground/30 italic block mt-2">Visibility Drives Growth.</span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-4xl mx-auto leading-relaxed px-4"
                    >
                        In today’s market, distribution alone is no longer enough. Brands that succeed are not just available — they are visible, trusted, and strategically positioned across digital channels. We work with brands to build complete digital ecosystems that drive demand, strengthen positioning, and enable scalable growth across markets.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 }}
                        className="mt-10 md:mt-12 text-muted-foreground/60 text-base md:text-lg max-w-2xl font-light italic"
                    >
                        Growth today is no longer controlled only by supply — it is driven by perception, reach, and digital presence.
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-200/50 dark:border-white/5 rounded-[clamp(1.5rem,5vw,3rem)] overflow-hidden bg-zinc-50/50 dark:bg-white/5 backdrop-blur-2xl shadow-4xl mb-20 mt-16 md:mt-24">
                    {REASONS.map((reason, idx) => (
                        <RationaleCard key={idx} reason={reason} index={idx} />
                    ))}
                    
                    {/* Final CTA Card Concept */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group relative p-10 md:p-14 flex flex-col justify-center bg-emerald-600 dark:bg-emerald-600/90 text-white min-h-[300px] md:min-h-[400px]"
                    >
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                This is where we create impact.
                            </h3>
                            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                                Even the strongest products fail without visibility. And even new brands succeed when they build presence strategically.
                            </p>
                            <div className="pt-4">
                                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold uppercase tracking-widest transition-transform group-hover:translate-x-2">
                                    Build Your Presence
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                        
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
                    </motion.div>
                </div>

                {/* Performance Mini Bar (Optional secondary UI) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: "Search Visibility", value: "85%", icon: Search },
                        { label: "Brand Authority", value: "Instant", icon: ShieldCheck },
                        { label: "Avg. Conversion", value: "3.4x", icon: TrendingUp },
                        { label: "Market Reach", value: "Global", icon: Globe }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10"
                        >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">{item.label}</p>
                                <p className="text-xl font-bold text-foreground leading-none">{item.value}</p>
                            </div>
                        </motion.div>
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

