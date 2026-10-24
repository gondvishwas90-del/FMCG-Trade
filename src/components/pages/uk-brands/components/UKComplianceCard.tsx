"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, CheckCircle2, History, ClipboardCheck, Lock } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const compliancePoints = [
    { title: "Duty Paid Stock", icon: CheckCircle2, color: "text-emerald-500" },
    { title: "Fully Compliant Supply", icon: ShieldCheck, color: "text-blue-500" },
    { title: "Authentic & Verified Products", icon: ClipboardCheck, color: "text-indigo-500" },
    { title: "Proper Documentation & Invoicing", icon: FileCheck, color: "text-amber-500" },
    { title: "Batch Traceability", icon: History, color: "text-rose-500" }
];

export default function UKComplianceCard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const points = pointsRef.current.filter((p): p is HTMLDivElement => p !== null);

        gsap.fromTo(points, 
            { 
                x: 40, 
                opacity: 0 
            },
            {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
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
            id="uk-compliance" 
            className="py-24 md:py-40 bg-background relative overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 mb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-center justify-center -translate-y-1/2" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        VERIFIED
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
                            <div className="w-12 h-px bg-blue-500" />
                            <span className="text-blue-500 font-mono text-sm tracking-[0.4em] uppercase font-bold">
                                Regulatory Standards
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
                        >
                            Uncompromising <br /> 
                            <span className="text-blue-500 italic font-light">Compliance</span> <br />
                            Infrastructure
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="border-l-2 border-blue-500/30 pl-8"
                        >
                            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed italic mb-8">
                                In the UK drinks trade, compliance isn’t just a checklist—it’s the foundation of business stability. We guarantee 100% adherence to all regulatory standards.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> AWRS Certified
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> HMRC Compliant
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="relative p-12 md:p-24 rounded-[4rem] bg-card/40 border border-border/50 backdrop-blur-3xl overflow-hidden shadow-2xl shadow-blue-500/5">
                        {/* Internal Decorative element */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30 select-none">
                            <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[120px]" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                <div className="space-y-6">
                                    <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-xl shadow-blue-500/10 mb-8">
                                        <Lock className="w-10 h-10 text-blue-500" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                                        The Foundation <br /> of <span className="text-blue-500">Security</span>
                                    </h3>
                                    <p className="text-muted-foreground text-xl font-light leading-relaxed">
                                        A secure pipeline for trade entities requiring deep compliance and batch-level traceability for every case moved.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {compliancePoints.map((point, idx) => (
                                    <div
                                        key={idx}
                                        ref={(el) => { pointsRef.current[idx] = el; }}
                                        className="group flex items-center gap-6 p-6 rounded-3xl bg-background/50 border border-border/50 hover:border-blue-500/50 hover:bg-background transition-all duration-500 shadow-sm hover:shadow-xl"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center shrink-0 border border-border group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500 ${point.color}`}>
                                            <point.icon className="w-7 h-7" />
                                        </div>
                                        <span className="text-foreground font-bold tracking-tight uppercase group-hover:text-blue-500 transition-colors text-sm md:text-base">
                                            {point.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Fine print area */}
            <div className="mt-24 border-t border-border/30 pt-12 px-4 md:px-12 text-center relative z-10">
                <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.4em] font-medium max-w-3xl mx-auto opacity-60">
                    Proprietary compliance framework engineered for the UK Domestic FMCG sector. Guaranteed chain of custody for all inventory movements.
                </p>
            </div>
        </section>
    );
}

