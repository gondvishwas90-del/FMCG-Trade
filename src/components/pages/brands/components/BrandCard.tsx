"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "../types/brand.types";
import { springConfig } from "../constants/config";


interface BrandCardProps {
    brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isImageHovered, setIsImageHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - 20);
        y.set(e.clientY - rect.top - 20);
    };

    return (
        <Link
            href={`/brands/${brand.id}`}
            className="block h-full group"
        >
            <motion.div
                ref={containerRef}
                layoutId={`brand-card-${brand.id}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    relative bg-card border border-border group-hover:border-foreground 
                    transition-colors duration-300 flex flex-col h-full 
                    rounded-2xl md:rounded-[2rem] overflow-hidden
                `}
            >
                {/* Top Image Section - 4:3 Aspect Ratio */}
                <div
                    ref={imageRef}
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                    onMouseMove={handleMouseMove}
                    className="relative aspect-[4/3] overflow-hidden bg-muted border-b border-border"
                >
                    {brand.image ? (
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-2xl">
                            {brand.name[0]}
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                    {/* Mobile: Always Visible Discover Button */}
                    <div className="absolute top-2 right-2 md:hidden z-20">
                        <div className="w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-foreground flex items-center justify-center shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Desktop: Hover Cursor Button */}
                    <motion.div
                        style={{ x: springX, y: springY }}
                        className="hidden md:block absolute top-0 left-0 z-20 pointer-events-none"
                    >
                        <motion.button
                            className={`
                    flex items-center justify-center gap-2 rounded-full px-4 py-2
                    transition-all duration-300 shadow-sm
                    ${isImageHovered
                                    ? "bg-foreground text-background scale-110 opacity-100"
                                    : "bg-card text-foreground opacity-0 scale-50"}
                `}
                        >
                            <span className="text-xs font-bold tracking-wider uppercase">Discover</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex flex-col flex-1 relative bg-card">
                    <motion.div layoutId={`brand-content-${brand.id}`} className="flex-1">
                        {/* Meta Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 md:mb-4 gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">
                                    {brand.country}
                                </span>
                                {brand.owner && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-border md:block hidden" />
                                        <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-md">
                                            {brand.owner.logo && (
                                                <div className="relative w-3 h-3 rounded-sm overflow-hidden border bg-white">
                                                    <Image src={brand.owner.logo} alt={brand.owner.name} fill sizes="12px" className="object-contain p-0.5" />
                                                </div>
                                            )}
                                            <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-tight text-muted-foreground line-clamp-1">
                                                {brand.owner.name}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <span className="self-start text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-100 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {brand.category || 'General'}
                            </span>
                        </div>

                        <h3 className="text-sm md:text-2xl font-bold text-foreground mb-1.5 md:mb-3 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
                            {brand.name}
                        </h3>

                        <p className="text-muted-foreground text-[10px] md:text-sm leading-relaxed line-clamp-2 font-medium">
                            {brand.positioning}
                        </p>
                    </motion.div>

                    {/* Footer Capabilities */}
                    <div className="mt-3 md:mt-6 pt-3 md:pt-4 border-t border-border grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
                        {brand.tradeCapabilities.exportAvailable && (
                            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                <span className="truncate">Export Ready</span>
                            </div>
                        )}
                        {brand.tradeCapabilities.privateLabel && (
                            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0"></div>
                                <span className="truncate">Private Label</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
