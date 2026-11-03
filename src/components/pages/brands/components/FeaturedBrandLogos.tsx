"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, RotateCcw, ArrowDown, Building2 } from "lucide-react";
import { FEATURED_BRAND_LOGOS, DIRECTORY_CATEGORIES, FeaturedBrandItem } from "../data/brand-directory.data";

interface FeaturedBrandLogosProps {
    selectedBrand: string | null;
    onSelectBrand: (brand: FeaturedBrandItem | null) => void;
}

export default function FeaturedBrandLogos({
    selectedBrand,
    onSelectBrand
}: FeaturedBrandLogosProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All Brands");

    const filteredLogos = activeCategory === "All Brands"
        ? FEATURED_BRAND_LOGOS
        : FEATURED_BRAND_LOGOS.filter((b) => b.category === activeCategory);

    const handleTileClick = (brand: FeaturedBrandItem) => {
        if (selectedBrand === brand.searchQuery) {
            // Deselect
            onSelectBrand(null);
        } else {
            onSelectBrand(brand);
            // Smoothly scroll down to the products section
            const target = document.getElementById("brand-products-section");
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const activeItem = FEATURED_BRAND_LOGOS.find((b) => b.searchQuery === selectedBrand);

    return (
        <section className="relative w-full max-w-[1800px] mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-12">
            {/* Header Content matching reference */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                            Featured Brands
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05]">
                        A glimpse of the most in-demand brands
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl font-light">
                        Direct B2B supply channels with leading multi-brand FMCG houses. Choose any brand to inspect available trade lots and case specifications.
                    </p>
                </div>

                {/* Active Filter Indicator */}
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-2xl shrink-0"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                Active Filter
                            </span>
                            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                                {activeItem.name}
                            </span>
                        </div>
                        <button
                            onClick={() => onSelectBrand(null)}
                            className="p-1.5 rounded-full hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition-colors"
                            title="Reset to All Brands"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                {DIRECTORY_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                px-4 md:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200
                                ${isActive
                                    ? "bg-foreground text-background shadow-md shadow-foreground/10"
                                    : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40"}
                            `}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* The Logo Matrix Container (matches drhmarket style) */}
            <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-sm shadow-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
                    {filteredLogos.map((brand) => {
                        const isSelected = selectedBrand === brand.searchQuery;

                        return (
                            <motion.button
                                key={brand.id}
                                onClick={() => handleTileClick(brand)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    relative aspect-[2.4/1] sm:aspect-[2.2/1] rounded-2xl flex items-center justify-center p-3 md:p-4 
                                    transition-all duration-200 select-none cursor-pointer group
                                    ${isSelected
                                        ? "bg-white dark:bg-zinc-900 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/30"
                                        : "bg-white dark:bg-zinc-900/90 hover:bg-white border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md"}
                                `}
                            >
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 12vw"
                                        className="object-contain p-1 filter drop-shadow-xs transition-opacity duration-200 group-hover:opacity-100 opacity-90"
                                    />
                                </div>

                                {isSelected && (
                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

