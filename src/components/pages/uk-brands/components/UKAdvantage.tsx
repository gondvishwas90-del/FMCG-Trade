"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, ShieldCheck, Zap, LineChart } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
    {
        title: "Pre-Market Allocations",
        description: "Secure high-demand stock through our exclusive pipeline before it reaches any open-market platforms.",
        icon: Zap,
        color: "text-amber-500",
        glow: "shadow-amber-500/20"
    },
    {
        title: "No Ghost Stock",
        description: "100% of our inventory is physically held in verified UK partner warehouses. If it’s on the list, it’s ready to move.",
        icon: Package,
        color: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "AWRS & Duty Compliant",
        description: "Fully transparent paper trails. We operate strictly within the Alcohol Wholesaler Registration Scheme, ensuring zero risk.",
        icon: ShieldCheck,
        color: "text-emerald-500",
        glow: "shadow-emerald-500/20"
    },
    {
        title: "Market Intelligence",
        description: "We advise on UK trending spirits to help you protect and grow your margins. Data-driven trade insights.",
        icon: LineChart,
        color: "text-blue-500",
        glow: "shadow-blue-500/20"
    }
];

export default function UKAdvantage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

        gsap.fromTo(cards, 
            { 
                y: 60, 
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            id="uk-advantage" 
            className="py-24 md:py-40 bg-background text-foreground relative overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 mb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-center justify-center -translate-y-1/2" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        ADVANTAGE
                    </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-px bg-primary" />
                            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase font-bold">
                                The Edge
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground"
                        >
                            The <span className="text-primary italic font-light">"First Look"</span> <br /> 
                            Advantage
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="border-l-2 border-primary/30 pl-8"
                        >
                            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed italic">
                                Why top-tier UK trade partners skip standard wholesalers 
                                and plug directly into our private pipeline.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {advantages.map((item, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            className="group relative p-10 rounded-[2.5rem] bg-card border border-border/50 hover:bg-accent/5 transition-all duration-500 overflow-hidden"
                        >
                            {/* Background Number */}
                            <div className="absolute top-4 right-8 pointer-events-none select-none opacity-[0.03] dark:opacity-5 transition-opacity group-hover:opacity-10 duration-500">
                                <span className="text-9xl font-bold tracking-tighter text-foreground">0{idx + 1}</span>
                            </div>

                            <div className={`w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-10 border border-primary/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-xl ${item.glow}`}>
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold mb-6 tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-light">
                                {item.description}
                            </p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </div>
                    ))}
                </div>

                {/* Master Proof Ribbon */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-10 md:p-16 rounded-[3rem] bg-linear-to-br from-indigo-600 to-violet-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group shadow-2xl shadow-indigo-500/20"
                >
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#fff_0%,transparent_100%)] group-hover:scale-150 transition-transform duration-1000" />
                    
                    <div className="relative z-10 flex items-center gap-8">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-2xl">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h4 className="text-white text-3xl md:text-5xl font-bold tracking-tighter leading-tight">100% Physical Inventory</h4>
                            <p className="text-white/80 text-lg md:text-xl font-light italic">Verified stock only. No ghost listings, ever.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 relative z-10 justify-center">
                        {['Verified Warehousing', 'AWRS Approved', 'Next-Day Dispatch'].map((tag, i) => (
                            <div key={i} className="px-8 py-3 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md hover:bg-white hover:text-indigo-600 transition-all duration-300 cursor-default">
                                {tag}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

