"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, Wallet, Laptop, Hotel, Users } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
    {
        title: "Wholesalers & Regional Distributors",
        description: "Enabling your supply chain with high-volume premium allocations.",
        icon: Building2,
        color: "text-blue-500",
        glow: "shadow-blue-500/20"
    },
    {
        title: "Retail Chains & Independent Retailers",
        description: "Exclusive stock access to differentiate your shelf offerings.",
        icon: Store,
        color: "text-amber-500",
        glow: "shadow-amber-500/20"
    },
    {
        title: "Cash & Carry Buyers",
        description: "Reliable bulk supply chains for traditional distribution channels.",
        icon: Wallet,
        color: "text-emerald-500",
        glow: "shadow-emerald-500/20"
    },
    {
        title: "E-commerce Spirits Sellers",
        description: "Real-time stock feeds for digital-first alcohol retailers.",
        icon: Laptop,
        color: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "High-End Hospitality Groups",
        description: "Curated portfolios for bars, hotels, and luxury restaurant groups.",
        icon: Hotel,
        color: "text-rose-500",
        glow: "shadow-rose-500/20"
    },
    {
        title: "Direct B2B Partners",
        description: "Tailored procurement solutions for established trade players.",
        icon: Users,
        color: "text-indigo-500",
        glow: "shadow-indigo-500/20"
    }
];

export default function UKPartners() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

        gsap.fromTo(cards, 
            { 
                y: 50, 
                opacity: 0,
                scale: 0.98
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            id="uk-partners" 
            className="py-24 md:py-40 bg-background text-foreground relative overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 mb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-center justify-center -translate-y-1/2" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        NETWORK
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
                                Our Network
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
                        >
                            A Trusted Partner <br /> 
                            <span className="text-primary italic font-light">for the</span> <br />
                            UK Drinks Trade
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
                                Connecting established entities with 
                                verified supply chains and exclusive market allocations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((item, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            className="group relative p-12 rounded-[3rem] bg-card border border-border/50 hover:bg-accent/5 transition-all duration-500 overflow-hidden flex flex-col items-center text-center shadow-sm hover:shadow-xl"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                                <item.icon className="w-40 h-40" />
                            </div>

                            <div className={`w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center mb-10 border border-primary/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-xl ${item.glow}`}>
                                <item.icon className={`w-10 h-10 ${item.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-light">
                                {item.description}
                            </p>

                            {/* Corner Accent */}
                            <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle background decorative elements */}
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}

