"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, Globe, Layers, Building2, Target, ArrowRight, X } from "lucide-react";
import type { FilterType } from "../types/filter.types";
import {
    CATEGORY_META,
    COUNTRY_META,
    MARKET_FOCUS_META,
    OWNERSHIP_META,
    FILTER_OPTION_IMAGES,
    DEFAULT_TAB_HEROES
} from "../constants/filter-metadata";

interface LittlebirdMegaMenuProps {
    activeTab: FilterType;
    activeFilters: Record<FilterType, string[]>;
    onFilterChange: (type: FilterType, value: string[]) => void;
    onClose: () => void;
    options: string[];
    allLabel: string;
}

export default function LittlebirdMegaMenu({
    activeTab,
    activeFilters,
    onFilterChange,
    onClose,
    options,
    allLabel
}: LittlebirdMegaMenuProps) {

    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Native mouse-wheel scroll handler that bypasses Lenis smooth-scroll interference
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                el.scrollTop += e.deltaY;
                e.stopPropagation();
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => el.removeEventListener("wheel", handleWheel);
    }, [activeTab]);

    interface TabConfigItem {
        title: string;
        desc: string;
        icon: any;
        metaMap: Record<string, string>;
        gridCols: string;
    }

    const tabConfigMap: Record<FilterType, TabConfigItem> = {
        category: {
            title: "Built for global FMCG",
            desc: "Explore verified wholesale portfolios across international spirits, beers, wines, mixers, and groceries.",
            icon: Layers,
            metaMap: CATEGORY_META,
            gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        },
        country: {
            title: "Worldwide trade origin",
            desc: "Filter verified commercial allocations by bonded warehouse hub and official country of manufacture.",
            icon: Globe,
            metaMap: COUNTRY_META,
            gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        },
        use: {
            title: "Tailored distribution",
            desc: "Select procurement streams optimized for on-trade hospitality, off-trade retail, or high-volume cocktail mixing.",
            icon: Target,
            metaMap: MARKET_FOCUS_META,
            gridCols: "grid-cols-1 sm:grid-cols-3"
        },
        owner: {
            title: "Direct producer houses",
            desc: "Inspect certified brand houses and multinational conglomerate supply lines with guaranteed provenance.",
            icon: Building2,
            metaMap: OWNERSHIP_META,
            gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        },
        access: {
            title: "Trade Access",
            desc: "Refine by compliance and duty status.",
            icon: Sparkles,
            metaMap: {} as Record<string, string>,
            gridCols: "grid-cols-1 sm:grid-cols-2"
        }
    };

    const tabConfig = tabConfigMap[activeTab];
    const defaultHero = DEFAULT_TAB_HEROES[activeTab] || DEFAULT_TAB_HEROES.owner;

    const currentSelected = activeFilters[activeTab] || [];
    const isAllSelected = currentSelected.length === 0;

    // The item to display on the left side: hovered item takes priority, then first active filter, else default hero
    const activeItemName = hoveredOption || (currentSelected.length > 0 ? currentSelected[0] : null);

    const displayTitle = activeItemName ? activeItemName : defaultHero.title;
    const displaySubtitle = activeItemName 
        ? (tabConfig.metaMap[activeItemName.toUpperCase()] || "Verified Trade SKU Portfolio")
        : defaultHero.desc;
    
    const displayImage = activeItemName
        ? (FILTER_OPTION_IMAGES[activeItemName.toUpperCase()] || defaultHero.image)
        : defaultHero.image;

    const isHoverPreview = !!hoveredOption;
    const isSelectedPreview = !hoveredOption && currentSelected.length > 0;

    const handleToggle = (opt: string) => {
        if (currentSelected.includes(opt)) {
            onFilterChange(activeTab, currentSelected.filter(o => o !== opt));
        } else {
            onFilterChange(activeTab, [...currentSelected, opt]);
        }
    };

    const handleClear = () => {
        onFilterChange(activeTab, []);
        setHoveredOption(null);
    };

    return (
        <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.6 }}
            className="w-full max-w-[1240px] mx-auto overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] flex flex-col md:flex-row relative z-50 text-foreground"
        >
            {/* Left Column: Pure White with Dynamic Hover Product Image */}
            <div className="w-full md:w-[320px] lg:w-[350px] shrink-0 bg-white dark:bg-zinc-950 p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 relative">
                <div>
                    {/* Top Tag & Indicator */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <tabConfig.icon className="w-4 h-4" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">
                                {isHoverPreview ? "Interactive Preview" : isSelectedPreview ? "Selected SKU" : "Official Directory"}
                            </span>
                        </div>
                        {isHoverPreview && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                Hovering
                            </span>
                        )}
                    </div>

                    {/* Dedicated Product Showcase Card */}
                    <div className="relative w-full h-48 sm:h-52 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center p-4 overflow-hidden group shadow-inner">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={displayImage}
                                src={displayImage}
                                alt={displayTitle}
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.2 }}
                                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                            />
                        </AnimatePresence>

                        {/* Floating Origin / Verification Pill */}
                        <div className="absolute top-2.5 left-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700 shadow-xs">
                                Verified Trade
                            </span>
                        </div>
                    </div>

                    {/* Item Title & Subtitle */}
                    <div className="mt-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={displayTitle}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                            >
                                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-1">
                                    {displayTitle}
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed line-clamp-2 mt-1">
                                    {displaySubtitle}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Left Bottom Action: Reset / All Button */}
                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`w-full py-2.5 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between shadow-xs cursor-pointer ${
                            isAllSelected
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                                : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 border border-zinc-200/80 dark:border-zinc-700'
                        }`}
                    >
                        <span>{allLabel}</span>
                        {isAllSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                    {currentSelected.length > 0 && (
                        <div className="text-[10px] text-muted-foreground mt-2 text-center font-medium">
                            {currentSelected.length} filter{currentSelected.length > 1 ? 's' : ''} active
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Multi-Column Grid of Items (Pure White) */}
            <div className="flex-1 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-white dark:bg-zinc-950 relative">
                {/* Quick Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer z-10"
                    title="Close filter menu"
                >
                    <X className="w-4 h-4" />
                </button>

                <div 
                    ref={scrollContainerRef}
                    data-lenis-prevent="true"
                    style={{ overscrollBehavior: 'contain', scrollbarWidth: 'thin' }}
                    className="overflow-y-auto max-h-[440px] pr-2.5 custom-scrollbar mt-1 overscroll-contain touch-pan-y"
                    onMouseLeave={() => setHoveredOption(null)}
                >
                    <div className={`grid ${tabConfig.gridCols} gap-2.5`}>
                        {options.map((opt) => {
                            const optUpper = opt.toUpperCase();
                            const isSelected = currentSelected.includes(opt);
                            const isHovered = hoveredOption === opt;
                            const subtitle = tabConfig.metaMap[optUpper] || "Verified Trade SKU Portfolio";

                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onMouseEnter={() => setHoveredOption(opt)}
                                    onClick={() => handleToggle(opt)}
                                    className={`group rounded-xl p-3 text-left transition-all duration-200 border flex flex-col justify-between relative cursor-pointer ${
                                        isSelected
                                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                                            : isHovered
                                                ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                                                : 'bg-white dark:bg-zinc-950 border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-200 dark:hover:border-zinc-800'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-1">
                                        <span className={`text-xs sm:text-[13px] font-bold tracking-tight uppercase leading-snug transition-colors ${
                                            isSelected ? 'text-emerald-700 dark:text-emerald-300' : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                                        }`}>
                                            {opt}
                                        </span>
                                        {isSelected && (
                                            <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-tight mt-1 line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                                        {subtitle}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Action Strip */}
                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="text-[11px]">
                        Hover any item to preview product on the left • Click to filter
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <span>Apply & Close</span>
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}