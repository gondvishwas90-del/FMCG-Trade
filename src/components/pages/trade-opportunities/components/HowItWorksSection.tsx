"use client";

import { motion } from 'motion/react';
import { Search, ShieldCheck, Handshake } from 'lucide-react';
import { processSteps } from '../data/process-steps.data';

// Icon map for dynamic rendering
const iconMap = {
    Search,
    ShieldCheck,
    Handshake
};

export function HowItWorksSection() {
    return (
        <section className="py-24 px-4 md:px-6 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0 50 Q 50 100 100 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
                            How Trade Opportunities <span className="text-emerald-600">Work</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            A streamlined, secure process designed for high-volume international trade efficiency.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Visual Connectors (Desktop) */}
                    <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-linear-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 z-0 pointer-events-none" />

                    {processSteps.map((step, index) => {
                        const IconComponent = iconMap[step.icon];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="group relative p-8 bg-background/50 border border-border/50 rounded-3xl hover:border-emerald-500/30 hover:bg-background/80 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 backdrop-blur-sm"
                            >
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-background border border-border/50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500 shadow-sm relative">
                                        <IconComponent className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-500" />
                                        {/* Connector Dot */}
                                        {index !== 2 && (
                                            <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 mb-6 opacity-60">
                                        <span className="font-mono text-sm font-semibold text-emerald-600">0{index + 1}</span>
                                        <div className="h-px flex-1 bg-border group-hover:bg-emerald-500/20 transition-colors duration-500" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-base text-balance">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
