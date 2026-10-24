"use client";

import React, { useRef, useState, useEffect } from "react";
import { m, useScroll, useTransform, useSpring, MotionValue, useMotionValue } from "motion/react";
import { ArrowUpRight, MoveRight, Minus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { impactShowcaseItems } from "../data/strategic-impact-showcase.data";
import type { ImpactShowcaseItem } from "../types/strategic-impact-showcase.types";

export function StrategicImpactShowcase() {
    return (
        <section className="relative bg-background pt-0 pb-32" aria-label="Strategic Impact Showcase">
            {/* Header Section Removed - Integrated into ProcessWorkflow for seamless flow */}
            <div className="pt-0 md:pt-0" />

            {/* Items Section */}
            <div className="flex flex-col">
                {impactShowcaseItems.map((item, index) => (
                    <PremiumCategorySection key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

const PremiumCategorySection = ({ item, index }: { item: ImpactShowcaseItem; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax logic
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;

    // Parallax & Scroll Transforms - High Intensity
    const yInfo = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const yImg = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1.35, 1, 1.35]); // Much stronger zoom
    const opacityOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0, 0.4]); // Deeper contrast

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.8 }; // Looser, floatier cursor
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    return (
        <m.div
            ref={sectionRef}
            className="group relative min-h-[90vh] md:min-h-screen w-full flex flex-col md:flex-row items-center border-t border-border/40 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Number Watermark */}
            <div className={cn(
                "absolute top-0 p-4 md:p-12 z-0 pointer-events-none select-none",
                isEven ? "left-0" : "right-0"
            )}>
                <span className="text-[15vw] md:text-[12vw] font-bold leading-none text-foreground/5 font-mono tracking-tighter">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
            </div>

            {/* Split Layout */}
            <div className={cn(
                "relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row gap-12 md:gap-24 items-center flex-1",
                isEven ? "" : "md:flex-row-reverse"
            )}>

                {/* Text Content */}
                <div className="w-full md:w-5/12 py-12 md:py-0 space-y-12">
                    <m.div style={{ y: yInfo }} className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-emerald-500" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400">
                                    {item.subtitle}
                                </span>
                            </div>
                            <h3 className="text-5xl md:text-7xl font-semibold tracking-tighter text-foreground leading-[0.9]">
                                {item.title}
                            </h3>
                        </div>

                        <ul className="space-y-6">
                            {item.description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-4 text-lg md:text-xl text-muted-foreground font-light group/item">
                                    <span className="mt-3 w-1.5 h-1.5 rounded-full bg-border group-hover/item:bg-emerald-500 transition-colors duration-300" />
                                    <span className="group-hover/item:text-foreground transition-colors duration-300">
                                        {desc}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {item.stats && (
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/60">
                                {item.stats.map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-3xl font-light font-mono text-foreground">{stat.value}</p>
                                        <p className="text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-8">
                            <InteractiveButton title="Explore Sourcing Portfolio" href={item.link || "/categories"} />
                        </div>
                    </m.div>
                </div>

                {/* Image Section */}
                <Link
                    href={item.link || "/categories"}
                    className="w-full md:w-7/12 h-[50vh] md:h-[80vh] relative group/image cursor-pointer block mb-8 md:mb-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        mouseX.set(e.clientX - rect.left);
                        mouseY.set(e.clientY - rect.top);
                    }}
                >
                    <m.div
                        style={{ y: yImg }}
                        className="w-full h-full relative overflow-hidden rounded-sm bg-muted"
                        initial={{ clipPath: "inset(25% 0 25% 0)", filter: "blur(10px)", scale: 0.95 }}
                        whileInView={{ clipPath: "inset(0% 0 0% 0)", filter: "blur(0px)", scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <m.div
                            style={{ scale: scaleImg }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover/image:scale-110"
                                sizes="(max-width: 768px) 100vw, 60vw"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 mix-blend-multiply" />
                            <m.div
                                style={{ opacity: opacityOverlay }}
                                className="absolute inset-0 bg-black"
                            />
                        </m.div>

                        {/* Custom Cursor Follower */}
                        <m.div
                            style={{
                                x: springX,
                                y: springY,
                            }}
                            className="absolute top-0 left-0 pointer-events-none z-30 hidden md:block"
                        >
                            <m.div
                                className="flex items-center gap-2 bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl origin-center -translate-x-1/2 -translate-y-1/2 ring-1 ring-white/20"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isHovered ? 1 : 0,
                                    opacity: isHovered ? 1 : 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <span className="text-sm font-medium tracking-wide border-r border-white/20 pr-3 mr-1">COMMERCIAL TRADE</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </m.div>
                        </m.div>
                    </m.div>

                    {/* Tags floating */}
                    <div className="absolute -bottom-5 md:-bottom-6 left-4 md:left-8 flex flex-wrap gap-2 md:gap-3 z-20 pointer-events-none pr-4 md:pr-0">
                        {item.tags?.map((tag, i) => (
                            <div key={i} className="bg-background border border-border px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs uppercase tracking-wider font-medium shadow-xl whitespace-nowrap">
                                {tag}
                            </div>
                        ))}
                    </div>
                </Link>
            </div>
        </m.div>
    );
};

const InteractiveButton = ({ title, href }: { title: string; href: string }) => {
    return (
        <Link href={href} className="group relative inline-flex items-center gap-4 py-3 pr-6 pl-0 outline-none cursor-pointer">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/30 overflow-hidden bg-background group-hover:border-emerald-500 transition-colors duration-300">
                <MoveRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 absolute transition-all duration-300 group-hover:translate-x-12" />
                <MoveRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 absolute transition-all duration-300 -translate-x-12 group-hover:translate-x-0" />
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {title}
            </span>
        </Link>
    );
}

