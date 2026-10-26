"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Package } from "lucide-react";
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
                    relative bg-card border border-border group-hover:border-emerald-500/50 
                    transition-all duration-300 flex flex-col h-full 
                    rounded-2xl md:rounded-3xl overflow-hidden shadow-xs hover:shadow-lg
                `}
            >
                {/* Top Image Section - 16:10 Aspect Ratio with B2B tags */}
                <div
                    ref={imageRef}
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                    onMouseMove={handleMouseMove}
                    className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border"
                >
                    {brand.image ? (
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-2xl">
                            {brand.name[0]}
                        </div>
                    )}

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Mobile: View Specs Button */}
                    <div className="absolute top-3 right-3 md:hidden z-20">
                        <div className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 text-foreground flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider shadow-xs">
                            <span>Specs</span>
                            <ArrowUpRight className="w-3 h-3" />
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
                                transition-all duration-300 shadow-md
                                ${isImageHovered
                                    ? "bg-foreground text-background scale-105 opacity-100"
                                    : "bg-card text-foreground opacity-0 scale-50"}
                            `}
                        >
                            <span className="text-[11px] font-bold tracking-wider uppercase">Trade Specs</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Content Section: Professional B2B Spec Layout */}
                <div className="p-4 md:p-6 flex flex-col flex-1 relative bg-card">
                    <motion.div layoutId={`brand-content-${brand.id}`} className="flex-1 flex flex-col">
                        
                        {/* Meta Header */}
                        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground truncate">
                                    {brand.country}
                                </span>
                                {brand.owner && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <div className="flex items-center gap-1 bg-muted/60 px-2 py-0.5 rounded text-[9px] font-semibold text-muted-foreground">
                                            {brand.owner.name}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Brand Name */}
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {brand.name}
                        </h3>

                        {/* Commercial Positioning */}
                        <p className="text-muted-foreground text-xs font-light leading-relaxed line-clamp-2 mb-4">
                            {brand.positioning}
                        </p>

                        {/* Pack Format */}
                        <div className="mt-auto pt-3 border-t border-border/60">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                    <Package className="w-3.5 h-3.5 text-emerald-500" />
                                    Pack Format
                                </span>
                            </div>

                            {brand.products && brand.products.length > 0 ? (
                                <div className="bg-muted/40 hover:bg-muted/60 p-2.5 rounded-xl text-xs flex items-center justify-between gap-3 border border-border/40 transition-colors">
                                    <span className="font-medium text-foreground truncate text-xs">
                                        {brand.products[0].name}
                                    </span>
                                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                                        {brand.products[0].size}
                                    </span>
                                </div>
                            ) : brand.portfolioRanges?.[0]?.typicalFormats ? (
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="text-[11px] bg-muted/50 text-foreground px-2.5 py-1 rounded-md border border-border/40 font-medium">
                                        {brand.portfolioRanges[0].typicalFormats[0]}
                                    </span>
                                </div>
                            ) : (
                                <div className="bg-muted/30 p-2.5 rounded-xl text-xs text-muted-foreground flex items-center justify-between">
                                    <span>Format: Case / Pallet Lots</span>
                                    <span className="text-emerald-500 font-bold">Inquire MOQ</span>
                                </div>
                            )}
                        </div>

                    </motion.div>

                    <div className="mt-3 pt-2 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                        <span>View Trade Specs & Order Terms</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                </div>
            </motion.div>
        </Link>
    );
}
