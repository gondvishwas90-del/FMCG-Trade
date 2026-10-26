"use client";

import { useState } from "react";
import { X, SlidersHorizontal, RotateCcw, ChevronRight, Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { FilterType } from "../types/filter.types";

interface BrandFiltersProps {
    onFilterChange: (type: FilterType, value: string[]) => void;
    activeFilters: Record<FilterType, string[]>;
    totalCount: number;
    categoryOptions?: string[];
    countryOptions?: string[];
    ownerOptions?: string[];
    localSearchValue: string;
    setLocalSearchValue: (value: string) => void;
    onClearAll: () => void;
}

export default function BrandFilters({
    onFilterChange,
    activeFilters,
    totalCount,
    categoryOptions = [],
    countryOptions = [],
    ownerOptions = [],
    localSearchValue,
    setLocalSearchValue,
    onClearAll
}: BrandFiltersProps) {

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<FilterType | null>(null);

    const hasActiveFilters = Object.values(activeFilters).some(v => v?.length > 0) || !!localSearchValue;

    const handleToggleOption = (type: FilterType, option: string) => {
        const current = activeFilters[type] || [];
        if (current.includes(option)) {
            onFilterChange(type, current.filter(o => o !== option));
        } else {
            onFilterChange(type, [...current, option]);
        }
    };

    const filterTabs = [
        { label: 'Country', type: 'country' as FilterType, options: countryOptions },
        { label: 'Category', type: 'category' as FilterType, options: categoryOptions },
        { label: 'Market Focus', type: 'use' as FilterType, options: ['On-Trade', 'Off-Trade', 'Cocktail'] },
        { label: 'Ownership', type: 'owner' as FilterType, options: ownerOptions },
    ];

    return (
        <div className="sticky top-0 z-50 w-full">
                <div className="max-w-[1800px] mx-auto">
                    <div className="bg-background/80 backdrop-blur-3xl border-b border-x border-border/30 dark:border-white/10 rounded-b-2xl overflow-hidden relative shadow-xs">
                        {/* Main Header & Tab Navigation */}
                        <div className="px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-10">
                            <div className="flex items-center gap-4 md:gap-10 flex-1">
                                {/* Branding */}
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl">
                                        <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <div className="hidden lg:flex flex-col">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-foreground leading-none">Discovery Hub</span>
                                        <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground mt-1.5">Elite Portfolio</span>
                                    </div>
                                </div>

                                {/* Desktop Category Tabs */}
                                <nav className="hidden md:flex items-center gap-1 md:gap-2 shrink-0">
                                    {filterTabs.map((tab) => {
                                        const isTabActive = activeTab === tab.type;
                                        const hasValue = activeFilters[tab.type]?.length > 0;

                                        return (
                                            <button
                                                key={tab.type}
                                                onMouseEnter={() => setActiveTab(tab.type)}
                                                onClick={() => setActiveTab(activeTab === tab.type ? null : tab.type)}
                                                className={`
                                                relative px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2
                                                ${isTabActive
                                                        ? 'text-foreground'
                                                        : 'text-muted-foreground hover:text-foreground'}
                                            `}
                                            >
                                                {tab.label}
                                                {hasValue && (
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                                )}
                                                {isTabActive && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>

                                {/* Desktop Search Input */}
                                <div className="hidden md:block flex-1 max-w-[280px] xl:max-w-sm relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Search className="h-3.5 w-3.5 text-muted-foreground/50 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={localSearchValue}
                                        onChange={(e) => setLocalSearchValue(e.target.value)}
                                        placeholder="Search brands, products..."
                                        className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 rounded-full py-2 pl-9 pr-9 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-foreground placeholder:text-muted-foreground/45 placeholder:uppercase placeholder:tracking-widest transition-all duration-300 outline-none"
                                    />
                                    {localSearchValue && (
                                        <button
                                            onClick={() => setLocalSearchValue('')}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground/60 hover:text-foreground transition-colors"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6 shrink-0">
                                <div className="flex flex-col items-end">
                                    <span className="text-[14px] md:text-[18px] font-bold font-mono text-foreground tracking-tight leading-none">{totalCount}</span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Verified</span>
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={() => {
                                            onClearAll();
                                            setActiveTab(null);
                                        }}
                                        className="p-2.5 md:p-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full transition-colors"
                                        title="Reset Workspace"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Desktop Expandable Chip Row */}
                        <AnimatePresence>
                            {activeTab && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
                                    className="hidden md:block overflow-hidden bg-black/20 dark:bg-black/40 border-t border-border/30 dark:border-white/10 rounded-b-2xl"
                                    onMouseLeave={() => setActiveTab(null)}
                                >
                                    <div className="py-6 relative group">
                                        <div className="flex flex-wrap items-center gap-3 px-6 md:px-10">
                                            <button
                                                onClick={() => { onFilterChange(activeTab, []); setActiveTab(null); }}
                                                className={`
                                                shrink-0 px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300
                                                ${activeFilters[activeTab]?.length === 0
                                                        ? 'bg-foreground text-background shadow-2xl'
                                                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'}
                                            `}
                                            >
                                                All {filterTabs.find(t => t.type === activeTab)?.label}s
                                            </button>

                                            {filterTabs.find(t => t.type === activeTab)?.options.map(opt => {
                                                const isActive = activeFilters[activeTab]?.includes(opt);
                                                return (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleToggleOption(activeTab, opt)}
                                                        className={`
                                                        shrink-0 px-8 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border
                                                        ${isActive
                                                                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-500/20'
                                                                : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/20 hover:text-foreground'}
                                                    `}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating Mobile Filter Trigger */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        onClick={() => setIsMobileFiltersOpen(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Discovery Controls</span>
                        {hasActiveFilters && (
                            <div className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-emerald-500 rounded-full text-[9px] font-bold text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] ml-1">
                                {Object.values(activeFilters).reduce((acc, curr) => acc + (curr?.length || 0), 0)}
                            </div>
                        )}
                    </motion.button>
                </div>

                {/* Native-Like Mobile Filter Drawer */}
                <AnimatePresence>
                    {isMobileFiltersOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
                                onClick={() => setIsMobileFiltersOpen(false)}
                            />
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                                className="fixed bottom-0 left-0 right-0 h-[90vh] bg-card/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[40px] z-[70] md:hidden flex flex-col shadow-2xl overflow-hidden"
                            >
                                {/* Drag Handle */}
                                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 mb-2" />

                                <div className="px-8 py-6 flex items-center justify-between border-b border-white/5">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground tracking-tight">Refine Results</h3>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">
                                            Viewing {totalCount} verified assets
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-10 pb-48 no-scrollbar">
                                    {filterTabs.map((section, idx) => (
                                        <motion.div
                                            key={section.type}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center justify-between px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-3 bg-emerald-500 rounded-full" />
                                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground/80">{section.label}</h4>
                                                </div>
                                                {activeFilters[section.type]?.length > 0 && (
                                                    <button
                                                        onClick={() => onFilterChange(section.type, [])}
                                                        className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 uppercase tracking-widest transition-colors bg-emerald-500/10 px-3 py-1 rounded-full"
                                                    >
                                                        Clear
                                                    </button>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => onFilterChange(section.type, [])}
                                                    className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border
                                                    ${activeFilters[section.type]?.length === 0
                                                            ? 'bg-foreground text-background border-foreground shadow-xl'
                                                            : 'bg-white/5 border-white/5 text-muted-foreground'}`}
                                                >
                                                    All
                                                </button>
                                                {section.options.map(opt => {
                                                    const isActive = activeFilters[section.type]?.includes(opt);
                                                    return (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleToggleOption(section.type, opt)}
                                                            className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border
                                                            ${isActive
                                                                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                                                    : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10'}`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sticky Mobile Action Button */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card/95 to-transparent pt-20">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                        className="w-full h-14 bg-foreground text-background rounded-xl font-bold text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3"
                                    >
                                        Apply & View Results
                                        <div className="w-px h-4 bg-background/20" />
                                        <span className="opacity-60">{totalCount} Brands</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
    );
}
