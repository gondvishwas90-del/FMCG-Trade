"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, Sparkles, Globe, Layers, Building2, Target, ArrowRight, X } from "lucide-react";
import type { FilterType } from "../types/filter.types";
import {
    CATEGORY_META,
    COUNTRY_META,
    MARKET_FOCUS_META,
    OWNERSHIP_META
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

    const currentSelected = activeFilters[activeTab] || [];
    const isAllSelected = currentSelected.length === 0;

    const handleToggle = (opt: string) => {
        if (currentSelected.includes(opt)) {
            onFilterChange(activeTab, currentSelected.filter(o => o !== opt));
        } else {
            onFilterChange(activeTab, [...currentSelected, opt]);
        }
    };

    const handleClear = () => {
        onFilterChange(activeTab, []);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.6 }}
            className="w-full max-w-[1240px] mx-auto overflow-hidden rounded-3xl bg-[#fffdf5] dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_24px_60px_-12px_rgba(27,28,20,0.22)] flex flex-col md:flex-row relative z-50 text-foreground"
        >
            {/* Left Column: Littlebird Tinted Editorial Intro Box */}
            <div className="w-full md:w-[300px] lg:w-[330px] shrink-0 bg-[#f9f4e7] dark:bg-zinc-950/60 p-7 lg:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200/80 dark:border-zinc-800">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-4">
                        <tabConfig.icon className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">
                            Official Directory
                        </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-normal text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-3">
                        {tabConfig.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                        {tabConfig.desc}
                    </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80">
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`w-full py-3 px-5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between shadow-xs ${
                            isAllSelected
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                                : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 border border-zinc-200/80 dark:border-zinc-700'
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

            {/* Right Column: Multi-Column Grid of Items (Matching Screenshot) */}
            <div className="flex-1 p-5 sm:p-7 lg:p-8 flex flex-col justify-between bg-[#fffdf5] dark:bg-zinc-900 relative">
                {/* Quick Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer z-10"
                    title="Close filter menu"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="overflow-y-auto max-h-[440px] pr-2 custom-scrollbar mt-1">
                    <div className={`grid ${tabConfig.gridCols} gap-2.5`}>
                        {options.map((opt) => {
                            const optUpper = opt.toUpperCase();
                            const isSelected = currentSelected.includes(opt);
                            const subtitle = tabConfig.metaMap[optUpper] || "Verified Trade SKU Portfolio";

                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleToggle(opt)}
                                    className={`group rounded-xl p-3 text-left transition-all duration-200 border flex flex-col justify-between relative ${
                                        isSelected
                                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                                            : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-200/70 dark:hover:border-zinc-700'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-1">
                                        <span className="text-xs sm:text-[13px] font-bold tracking-tight uppercase leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
                <div className="pt-4 mt-4 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="text-[11px]">
                        Click any item to toggle filter • Instant catalog refresh
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                        <span>Apply & Close</span>
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
