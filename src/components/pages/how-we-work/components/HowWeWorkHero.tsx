"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HowWeWorkHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [isHovered, setIsHovered] = useState(false);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-background overflow-hidden flex flex-col justify-center px-4 md:px-12 pt-20">

            {/* Background Ambience - Light Mode */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-teal-600/10 rounded-full blur-[100px]" />
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
                    className="flex items-center gap-4 mb-8 md:mb-12"
                >
                    <div className="h-px w-12 bg-emerald-500" />
                    <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                        Process & Methodology
                    </span>
                </motion.div>

                {/* Main Kinetic Typography */}
                <div className="flex flex-col">
                    {["How We", "Facilitate Trade"].map((text, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.4 + (i * 0.15)
                                }}
                                className="text-[13vw] md:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter"
                            >
                                <span className={i === 1 ? "text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 pr-2" : ""}>
                                    {text}
                                </span>
                            </motion.h1>
                        </div>
                    ))}
                </div>

                {/* Bottom Lockup */}
                <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0 border-t border-border pt-8">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed"
                    >
                        We don’t just connect buyers and sellers. We engineer the entire trade lifecycle, from brand inception to market dominance, ensuring every stage is optimized for growth.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-border bg-background transition-all duration-500 hover:border-emerald-500 hover:shadow-lg"
                    >
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                                rotate: isHovered ? -45 : 0
                            }}
                            className="text-foreground group-hover:text-emerald-600 transition-colors duration-300"
                        >
                            <ArrowDownLeft className="w-8 h-8 md:w-10 md:h-10" />
                        </motion.div>

                        {/* Circular Text */}
                        <div className={cn(
                            "absolute inset-0 rounded-full border border-emerald-500/0 transition-all duration-500",
                            isHovered && "scale-110 border-emerald-500/20"
                        )} />
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
