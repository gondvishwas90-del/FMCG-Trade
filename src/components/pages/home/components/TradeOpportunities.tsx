"use client";

import { useState, useRef, useEffect } from 'react';
import { m, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { TradeOpportunityCard } from '../types/trade-opportunity.types';
import { tradeOpportunities } from '../data/trade-opportunities.data';

export function TradeOpportunities() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="bg-background px-4 py-24 md:px-12 md:py-32" aria-label="Trade Opportunities">
            <div className="w-full max-w-[1800px] mx-auto">

                {/* Section Header */}
                <div className="mb-12">
                    <m.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4"
                    >
                        Live <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Trade Opportunities.</span>
                    </m.h2>
                    <div className="h-1 w-24 bg-emerald-500 mb-6" />
                    <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                        Explore verified commercial allocations, bonded pallet lots, and FMCG trade opportunities available exclusively for registered business buyers.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {tradeOpportunities.map((card) => (
                        <TradeOpportunityCardComponent
                            key={card.id}
                            card={card}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

function TradeOpportunityCardComponent({
    card,
    hoveredId,
    setHoveredId,
    isMobile
}: {
    card: TradeOpportunityCard;
    hoveredId: number | null;
    setHoveredId: (id: number | null) => void;
    isMobile: boolean;
}) {
    const isHovered = isMobile ? true : hoveredId === card.id;
    const isDimmed = !isMobile && hoveredId !== null && !isHovered;

    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for button tracking
    const buttonX = useMotionValue(0);
    const buttonY = useMotionValue(0);

    // Spring physics for smooth "magnetic" feel
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(buttonX, springConfig);
    const springY = useSpring(buttonY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return; // Disable magnetic effect on mobile
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate original button position (Top-Right anchor)
        const originalX = rect.width - 32 - 24;
        const originalY = 32 + 24;

        // Set displacement
        buttonX.set(mouseX - originalX);
        buttonY.set(mouseY - originalY);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        setHoveredId(null);
        buttonX.set(0);
        buttonY.set(0);
    };

    return (
        <Link href="/trade-opportunities" className="block">
            <m.div
                ref={containerRef}
                tabIndex={-1}
                aria-label={`View trade opportunity: ${card.title}`}
                onMouseEnter={() => !isMobile && setHoveredId(card.id)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
          relative h-[450px] md:h-[550px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer
          transition-all duration-500 ease-out group
          border border-border bg-card shadow-sm hover:shadow-2xl
      `}
                animate={{
                    opacity: isHovered ? 1 : 0.95,
                    filter: isHovered ? "grayscale(0%)" : "grayscale(30%) brightness(0.8)"
                }}
                layout
            >
                {/* Background Image Panel */}
                <m.div
                    className="absolute inset-0 z-0 bg-black/90"
                    initial={false}
                    animate={{
                        opacity: 1
                    }}
                    transition={{ duration: 0.8 }}
                >
                    <m.div
                        className="w-full h-full relative"
                        animate={{ scale: isHovered ? 1.05 : 1.15 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </m.div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </m.div>

                {/* Content Layer */}
                <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-between h-full pointer-events-none">

                    {/* Top: Status & Region */}
                    <div className="flex justify-between items-start pointer-events-auto">
                        <div className="flex flex-col gap-2">
                            <span className={`
                            px-3 py-1 w-fit rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase border
                            bg-white/10 border-white/20 text-white backdrop-blur-md
                        `}>
                                {card.status}
                            </span>
                            <span className="text-xs font-medium text-white/80 ml-1">{card.region}</span>
                        </div>
                    </div>

                    {/* Magnetic Arrow Button */}
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 pointer-events-auto">
                        <m.button
                            style={{ x: springX, y: springY }}
                            className={`
                group flex items-center justify-center gap-2 rounded-full p-2.5 md:p-3
                transition-colors duration-300
                ${isHovered ? "bg-white text-black pl-4 pr-3 md:pl-5 md:pr-4" : "bg-white text-black"}
              `}

                            animate={{
                                scale: 1,
                                opacity: 1
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence>
                                <m.span
                                    className="hidden lg:block overflow-hidden whitespace-nowrap text-sm font-bold"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: isHovered ? "auto" : 0,
                                        opacity: isHovered ? 1 : 0
                                    }}
                                >
                                    View Trade Allocation
                                </m.span>
                            </AnimatePresence>
                            <ArrowUpRight className="w-5 h-5" />
                        </m.button>
                    </div>

                    {/* Bottom: Text Content */}
                    <div className="pointer-events-auto flex flex-col gap-4">
                        <div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {card.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] uppercase tracking-wide font-semibold text-white/70 bg-white/10 px-2 py-0.5 rounded-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className={`
                        text-2xl md:text-3xl font-bold tracking-tight leading-tight transition-colors duration-300
                        text-white/90 group-hover:text-white
                        ${isHovered ? "text-white" : ""}
                    `}>
                                {card.title}
                            </h3>
                        </div>
                    </div>
                </div>
            </m.div >
        </Link>
    );
}