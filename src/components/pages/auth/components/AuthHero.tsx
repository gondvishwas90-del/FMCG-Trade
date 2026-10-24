"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthHeroProps {
    title?: string;
    subtitle?: string;
    showScrollIndicator?: boolean;
}

export function AuthHero({
    title = "Client Access",
    subtitle = "Secure Portal",
    showScrollIndicator = false
}: AuthHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[30vh] md:h-[45vh] w-full bg-background overflow-hidden flex flex-col justify-center px-4 md:px-12 pt-10 md:pt-20">

            {/* Background Ambience - Light Mode */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-teal-600/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-[1800px] mx-auto w-full"
            >
                {/* Overhead Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-4 mb-4 md:mb-6"
                >
                    <div className="h-px w-8 md:w-12 bg-emerald-500" />
                    <span className="text-emerald-600 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold">
                        {subtitle}
                    </span>
                </motion.div>

                {/* Main Typography - Reduced Size */}
                <div className="flex flex-col">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.4
                            }}
                            className="text-4xl md:text-6xl font-bold text-foreground leading-[0.9] tracking-tighter"
                        >
                            {title}
                        </motion.h1>
                    </div>
                </div>

                {/* Scroll Indicator (Optional) */}
                {showScrollIndicator && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 md:mt-16"
                    >
                        <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
