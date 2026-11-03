"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Package } from "lucide-react";
import { springConfig } from "../constants/config";

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export interface ProductTradeCardProps {
    product: {
        name: string;
        image: string;
        abv?: string;
        size: string;
        description?: string;
        category?: string;
        categoryFit?: string[];
    };
    brandId: string;
    brandName: string;
    country?: string;
    ownerName?: string;
}

export default function ProductTradeCard({
    product,
    brandId,
    brandName,
    country = "United Kingdom",
    ownerName
}: ProductTradeCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const productSlug = slugify(product.name);
    const productHref = `/brands/${brandId}/${productSlug}`;
    const displayCategory = product.category || (product.categoryFit && product.categoryFit[0]) || "PREMIUM SPIRITS";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - 20);
        y.set(e.clientY - rect.top - 20);
    };

    return (
        <Link href={productHref} className="block h-full group">
            <motion.div
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="relative bg-card border border-border group-hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xs hover:shadow-lg"
            >
                {/* Top Image Section - Clean studio framing */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/30 border-b border-border flex items-center justify-center p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-md"
                        />
                    </div>

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

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
                                ${isHovered
                                    ? "bg-foreground text-background scale-105 opacity-100"
                                    : "bg-card text-foreground opacity-0 scale-50"}
                            `}
                        >
                            <span className="text-[11px] font-bold tracking-wider uppercase">Trade Specs</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Content Section: Professional B2B Spec Layout (Matches Screenshot 1) */}
                <div className="p-4 md:p-6 flex flex-col flex-1 relative bg-card">
                    <div className="flex-1 flex flex-col">
                        
                        {/* Meta Header */}
                        <div className="flex items-center justify-between mb-3 gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground truncate">
                                    {country}
                                </span>
                                {(ownerName || brandName) && (
                                    <>
                                        <span className="text-muted-foreground/40 font-mono">•</span>
                                        <div className="flex items-center gap-1 bg-muted/60 px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground truncate">
                                            {ownerName || brandName}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Subcategory Pill Badge */}
                            <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                {displayCategory}
                            </span>
                        </div>

                        {/* Product Title */}
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {product.name}
                        </h3>

                        {/* Commercial Positioning / Description */}
                        <p className="text-muted-foreground text-xs font-light leading-relaxed line-clamp-2 mb-4">
                            {product.description || "Official standardized wholesale case and pallet specifications for commercial B2B procurement."}
                        </p>

                        {/* PACK FORMAT Box */}
                        <div className="mt-auto pt-3 border-t border-border/60">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                                    <Package className="w-3.5 h-3.5 text-emerald-500" />
                                    Pack Format
                                </span>
                            </div>

                            <div className="bg-muted/40 hover:bg-muted/60 p-2.5 rounded-xl text-xs flex items-center justify-between gap-3 border border-border/40 transition-colors">
                                <span className="font-medium text-foreground truncate text-xs">
                                    {product.name}
                                </span>
                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                                    {product.size || "Standard Wholesale Format"}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Footer Row */}
                    <div className="mt-3 pt-2.5 flex items-center justify-between text-xs font-bold border-t border-border/40">
                        <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Export Ready
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                            <span>View Trade Specs & Order Terms</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </Link>
    );
}

