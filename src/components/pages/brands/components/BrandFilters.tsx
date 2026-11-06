"use client";

import { useState, useRef, useEffect } from "react";
import { X, SlidersHorizontal, RotateCcw, ChevronDown, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { FilterType } from "../types/filter.types";
import {
    DISCOVERY_COUNTRIES,
    DISCOVERY_CATEGORIES,
    DISCOVERY_MARKET_FOCUS,
    DISCOVERY_OWNERSHIPS
} from "../constants/discovery-hub.constants";
import LittlebirdMegaMenu from "./LittlebirdMegaMenu";

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
    categoryOptions,
    countryOptions,
    ownerOptions,
    localSearchValue,
    setLocalSearchValue,
    onClearAll
}: BrandFiltersProps) {

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<FilterType | null>(null);
    const [lockedTab, setLockedTab] = useState<FilterType | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

    const hasActiveFilters = Object.values(activeFilters).some(v => v?.length > 0) || !!localSearchValue;

    // Close when clicking outside the entire filter bar and mega-menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setActiveTab(null);
                setLockedTab(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleOption = (type: FilterType, option: string) => {
        const current = activeFilters[type] || [];
        if (current.includes(option)) {
            onFilterChange(type, current.filter(o => o !== option));
        } else {
            onFilterChange(type, [...current, option]);
        }
    };

    const filterTabs = [
        { 
            label: 'Country', 
            type: 'country' as FilterType, 
            options: countryOptions && countryOptions.length > 0 ? countryOptions : DISCOVERY_COUNTRIES,
            allLabel: 'ALL COUNTRIES' 
        },
        { 
            label: 'Category', 
            type: 'category' as FilterType, 
            options: categoryOptions && categoryOptions.length > 0 ? categoryOptions : DISCOVERY_CATEGORIES,
            allLabel: 'ALL CATEGORIES' 
        },
        { 
            label: 'Market Focus', 
            type: 'use' as FilterType, 
            options: DISCOVERY_MARKET_FOCUS,
            allLabel: 'ALL MARKET FOCUS' 
        },
        { 
            label: 'Ownership', 
            type: 'owner' as FilterType, 
            options: ownerOptions && ownerOptions.length > 0 ? ownerOptions : DISCOVERY_OWNERSHIPS,
            allLabel: 'ALL OWNERSHIPS' 
        },
    ];

    const handleTabClick = (type: FilterType) => {
        if (lockedTab === type) {
            // Toggle off if clicking the already locked tab
            setLockedTab(null);
            setActiveTab(null);
        } else {
            // Lock to this tab
            setLockedTab(type);
            setActiveTab(type);
        }
    };

    const handleTabMouseEnter = (type: FilterType) => {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        // Switch view to hovered tab
        setActiveTab(type);
    };

    const handleMouseLeave = () => {
        // If a tab is pinned/locked by click, do NOT dismiss on mouse leave!
        if (lockedTab) return;

        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = setTimeout(() => {
            setActiveTab(null);
        }, 260);
    };

    const handleDropdownMouseEnter = () => {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };

    const handleCloseMenu = () => {
        setActiveTab(null);
        setLockedTab(null);
    };

    return (
        <div 
            ref={containerRef}
            className="sticky top-0 z-[100] w-full"
            onMouseLeave={handleMouseLeave}
        >
            <div className="max-w-[1800px] mx-auto relative px-4 md:px-8">
                <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl border border-zinc-200/80 dark:border-white/10 rounded-2xl md:rounded-3xl relative shadow-md">
                    
                    {/* Main Header & Tab Navigation */}
                    <div className="px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
                        <div className="flex items-center gap-4 md:gap-8 flex-1">
                            {/* Branding */}
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg">
                                    <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                                <div className="hidden lg:flex flex-col">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-foreground leading-none">Discovery Hub</span>
                                    <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground mt-1.5">Elite Portfolio</span>
                                </div>
                            </div>

                            {/* Desktop Category Tabs (Littlebird Nav Style) */}
                            <nav className="hidden md:flex items-center gap-1 md:gap-2 shrink-0">
                                {filterTabs.map((tab) => {
                                    const isTabActive = activeTab === tab.type;
                                    const isTabLocked = lockedTab === tab.type;
                                    const hasValue = activeFilters[tab.type]?.length > 0;

                                    return (
                                        <button
                                            key={tab.type}
                                            type="button"
                                            onMouseEnter={() => handleTabMouseEnter(tab.type)}
                                            onClick={() => handleTabClick(tab.type)}
                                            className={`
                                            relative px-4 md:px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 group cursor-pointer
                                            ${isTabActive
                                                    ? 'text-foreground bg-zinc-100 dark:bg-white/15 shadow-xs'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-white/5'}
                                        `}
                                        >
                                            <span>{tab.label}</span>
                                            {hasValue && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                            )}
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isTabActive ? 'rotate-180 text-emerald-500 opacity-100' : 'opacity-40 group-hover:opacity-80'}`} />
                                            {isTabLocked && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-500 rounded-full" />
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
                                    className="w-full bg-muted/30 hover:bg-muted/50 focus:bg-muted/50 border border-border/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 rounded-full py-2 pl-9 pr-9 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-foreground placeholder:text-muted-foreground/50 placeholder:uppercase placeholder:tracking-widest transition-all duration-300 outline-none"
                                />
                                {localSearchValue && (
                                    <button
                                        onClick={() => setLocalSearchValue('')}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
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
                                        handleCloseMenu();
                                    }}
                                    className="p-2.5 md:p-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-full transition-colors cursor-pointer"
                                    title="Reset All Filters"
                                >
                                    <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Floating Littlebird Mega-Menu Dropdown Panel with Zero-Gap Bridge */}
                <AnimatePresence>
                    {activeTab && (
                        <div 
                            data-lenis-prevent="true"
                            className="hidden md:block absolute top-full pt-3 left-4 right-4 z-[110] pointer-events-auto before:absolute before:-top-4 before:left-0 before:right-0 before:h-5 before:bg-transparent"
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <LittlebirdMegaMenu
                                activeTab={activeTab}
                                activeFilters={activeFilters}
                                onFilterChange={onFilterChange}
                                onClose={handleCloseMenu}
                                options={filterTabs.find(t => t.type === activeTab)?.options || []}
                                allLabel={filterTabs.find(t => t.type === activeTab)?.allLabel || 'ALL'}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Mobile Filter Trigger */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[55] md:hidden">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-full shadow-2xl font-bold text-xs uppercase tracking-widest border border-border"
                >
                    <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                    <span>Filter Portfolio</span>
                    {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                </motion.button>
            </div>

            {/* Mobile Sheet Backdrop & Drawer */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
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
