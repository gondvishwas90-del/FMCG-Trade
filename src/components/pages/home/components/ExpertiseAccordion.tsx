"use client";

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from "motion/react";
import { Plus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import type { ExpertiseItem } from '../types/expertise.types';
import { expertiseItems } from '../data/expertise-items.data';

export function ExpertiseAccordion() {
    const [active, setActive] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setState(prev => window.innerWidth < 768);
        const setState = (fn: (prev: boolean) => boolean) => setIsMobile(fn(false));

        checkMobile(); // Initial check
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="relative py-20 md:py-32 bg-background overflow-hidden">

            {/* Decorative Blur Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground"
                    >
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Process.</span>
                    </m.h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                        A structured approach to ensure smooth and reliable trade operations globally.
                    </p>
                </div>

                {/* Accordion Container */}
                <div className={cn(
                    "flex gap-4 w-full",
                    isMobile ? "flex-col h-auto" : "flex-row h-[600px]"
                )}>
                    {expertiseItems.map((item, index) => (
                        <AccordionPanel
                            key={item.id}
                            item={item}
                            isActive={index === active}
                            onActivate={() => setActive(index)}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

function AccordionPanel({
    item,
    isActive,
    onActivate,
    isMobile
}: {
    item: ExpertiseItem,
    isActive: boolean,
    onActivate: () => void,
    isMobile: boolean
}) {
    return (
        <m.div
            layout

            onClick={isMobile ? onActivate : undefined}
            onMouseEnter={!isMobile ? onActivate : undefined}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`${item.title} - ${item.subtitle}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onActivate();
                }
            }}
            className={cn(
                "group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer border border-border/50 shadow-lg dark:shadow-none transition-all duration-500",
                isActive ? 'shadow-2xl shadow-emerald-500/20 ring-1 ring-emerald-500/20' : 'hover:shadow-md',
                isMobile ? (isActive ? "h-[500px]" : "h-24") : "h-full"
            )}
            style={!isMobile ? {
                // Desktop: Fluid width
                flex: isActive ? 3.5 : 0.5,
            } : {
                // Mobile: Flex is disabled, using Height
                width: "100%"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
            {/* Background Image with Zoom Effect */}
            <m.div
                className="absolute inset-0 w-full h-full"
                animate={{ scale: isActive ? 1.05 : 1.2 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient Overlay - Darker for text readability */}
                <div className={cn(
                    "absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500",
                    isActive ? 'opacity-90' : 'opacity-70'
                )} />

                {/* Color Tint on Inactive */}
                {!isActive && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-all" />
                )}
            </m.div>

            {/* Content Layout */}
            <div className={cn(
                "absolute inset-0 p-6 md:p-8 flex",
                isActive ? 'flex-col justify-end items-start' : (isMobile ? 'flex-row items-center justify-between' : 'flex-col justify-center items-center')
            )}>

                <AnimatePresence mode="wait">
                    {isActive ? (
                        <m.div
                            key="active-content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="w-full"
                        >
                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] md:text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                                    {item.subtitle}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-[1] drop-shadow-lg">
                                {item.title}
                            </h3>

                            <div className="flex flex-col md:flex-row md:items-end justify-between w-full border-t border-white/20 pt-4 md:pt-6 gap-4">
                                <ul className="text-gray-200 text-sm md:text-base leading-relaxed max-w-lg font-light list-disc pl-5 space-y-1">
                                    {item.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                                <Link href="/how-we-work" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform self-end md:self-auto">
                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                            </div>
                        </m.div>
                    ) : (
                        <m.div
                            key="inactive-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "w-full h-full flex transition-all",
                                isMobile ? "flex-row items-center justify-between px-6" : "flex-col items-center py-8"
                            )}
                        >
                            {isMobile ? (
                                /* Mobile Layout: Title Left, ID & Icon Right */
                                <>
                                    <div className="font-bold text-white tracking-widest uppercase opacity-90 text-lg text-left">
                                        {item.title}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-white/80 text-sm font-mono">0{item.id}</span>
                                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                                            <Plus className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Desktop Layout: Number Top, Text Center, Icon Bottom */
                                <>
                                    {/* Top: ID */}
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
                                        <span className="text-white/80 text-sm font-mono">0{item.id}</span>
                                    </div>

                                    {/* Center: Vertical Title */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="flex flex-col items-center gap-1 text-2xl font-bold text-white tracking-widest uppercase opacity-90">
                                            {item.subtitle.split('').map((char, i) => (
                                                <span key={i} className="block">{char}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom: Icon */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                                            <Plus className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </m.div>
                    )}
                </AnimatePresence>

            </div>

        </m.div>
    );
}
