"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, FileSearch, CheckCircle2, Truck, ArrowRight, Clock } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Share Your Requirement",
        description: "Submit your specific stock needs—brand, volume, and target pricing.",
        icon: Send,
    },
    {
        title: "We Match Opportunities",
        description: "Our team identifies suitable parcels from our under-the-radar pipeline.",
        icon: FileSearch,
    },
    {
        title: "Confirm Pricing & Terms",
        description: "Finalize logistics, duty status, and transparent payment structures.",
        icon: CheckCircle2,
    },
    {
        title: "Dispatch from UK Warehouse",
        description: "Fast nationwide fulfillment from our verified partner network.",
        icon: Truck,
    }
];

export default function UKProcess() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = stepsRef.current.filter((card): card is HTMLDivElement => card !== null);

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
                ease: "power4.out",
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
            id="uk-process" 
            className="py-24 md:py-40 bg-background text-foreground relative overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 mb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-center justify-center -translate-y-1/2" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        WORKFLOW
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
                                How it works
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
                        >
                            The Strategic <br /> 
                            <span className="text-primary italic font-light">Acquisition</span> <br />
                            Journey
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
                                A streamlined procurement process designed for speed, 
                                transparency, and verified logistics.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { stepsRef.current[idx] = el; }}
                            className="group relative p-10 rounded-[3rem] bg-card border border-border/50 hover:bg-primary/5 transition-all duration-500 flex flex-col items-center text-center shadow-sm hover:shadow-xl overflow-hidden"
                        >
                            {/* Background Step Number */}
                            <div className="absolute top-8 right-8 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                                <span className="text-8xl font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter group-hover:scale-110 group-hover:text-primary/10 transition-all duration-700 inline-block">
                                    0{idx + 1}
                                </span>
                            </div>

                            <div className="w-24 h-24 rounded-3xl bg-primary/5 flex items-center justify-center mb-10 border border-primary/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500 shadow-xl shadow-primary/5 relative z-10">
                                <step.icon className="w-10 h-10 text-primary" />
                            </div>

                            <h3 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-primary transition-colors relative z-10 leading-tight">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg font-light relative z-10">
                                {step.description}
                            </p>

                            {/* Connection Indicator (Visual only) */}
                            {idx < steps.length - 1 && (
                                <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 text-primary/10 z-20">
                                    <ArrowRight className="w-8 h-8 animate-pulse" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 flex justify-center"
                >
                    <div className="group px-10 py-5 rounded-[2rem] border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-6 hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-lg shadow-emerald-500/10">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="opacity-60 text-[10px] mb-1">Estimated Speed</span>
                            <span className="text-base tracking-normal">Dispatch within 48 Hours</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
