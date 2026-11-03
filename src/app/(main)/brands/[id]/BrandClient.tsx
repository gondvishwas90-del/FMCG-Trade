"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, ShieldCheck, Building2, Globe2 } from "lucide-react";
import { motion } from "motion/react";
import BrandFilters from "@/components/pages/brands/components/BrandFilters";
import ProductTradeCard from "@/components/pages/brands/components/ProductTradeCard";
import TradeApplicationSection from "@/components/pages/brands/components/TradeApplicationSection";
import type { FilterType } from "@/components/pages/brands/types/filter.types";
import {
    DISCOVERY_COUNTRIES,
    DISCOVERY_CATEGORIES,
    DISCOVERY_MARKET_FOCUS,
    DISCOVERY_OWNERSHIPS
} from "@/components/pages/brands/constants/discovery-hub.constants";

interface BrandClientProps {
    brand: any;
    categories?: any[];
}

export default function BrandClient({ brand, categories = [] }: BrandClientProps) {
    const products = useMemo(() => brand.products || [], [brand.products]);

    // Filter states
    const [activeFilters, setActiveFilters] = useState<Record<FilterType, string[]>>({
        category: [],
        country: [],
        use: [],
        owner: [],
        access: []
    });
    const [searchValue, setSearchValue] = useState("");

    const handleFilterChange = (type: FilterType, value: string[]) => {
        setActiveFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleClearAll = () => {
        setActiveFilters({
            category: [],
            country: [],
            use: [],
            owner: [],
            access: []
        });
        setSearchValue("");
    };

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((p: any) => {
            // Search query
            if (searchValue) {
                const q = searchValue.toLowerCase().trim();
                const matchName = p.name?.toLowerCase().includes(q);
                const matchDesc = p.description?.toLowerCase().includes(q);
                const matchCat = p.category?.toLowerCase().includes(q);
                if (!matchName && !matchDesc && !matchCat) return false;
            }

            // Category filter
            if (activeFilters.category.length > 0) {
                const matchesCat = activeFilters.category.some(cat => {
                    const c = cat.toLowerCase();
                    return (
                        p.name?.toLowerCase().includes(c) ||
                        p.description?.toLowerCase().includes(c) ||
                        (p.category && p.category.toLowerCase().includes(c)) ||
                        (brand.category && brand.category.toLowerCase().includes(c)) ||
                        (brand.categoryFit && brand.categoryFit.some((f: string) => f.toLowerCase().includes(c)))
                    );
                });
                if (!matchesCat) return false;
            }

            // Market focus filter
            if (activeFilters.use.length > 0) {
                const matchesUse = activeFilters.use.some(u => {
                    const uLower = u.toLowerCase();
                    if (uLower === 'on-trade' && brand.tradeCapabilities?.onTradeFocused) return true;
                    if (uLower === 'off-trade' && brand.tradeCapabilities?.offTradeFocused) return true;
                    if (uLower === 'cocktail' && (p.name.toLowerCase().includes('liqueur') || p.name.toLowerCase().includes('aperitif') || p.name.toLowerCase().includes('gin'))) return true;
                    return false;
                });
                if (!matchesUse) return false;
            }

            return true;
        });
    }, [products, searchValue, activeFilters, brand]);

    return (
        <div className="min-h-screen bg-background text-foreground pb-24">

            {/* Brand Hero Header Section */}
            <header className="relative bg-zinc-50 dark:bg-zinc-950/40 border-b border-border pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden">
                <div className="max-w-[1800px] mx-auto px-4 md:px-8">
                    
                    {/* Navigation Bar */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <Link
                            href="/brands"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to All Brand Logos</span>
                        </Link>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <Link href="/brands" className="hover:text-foreground transition-colors">
                                Brands Hub
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                            <span className="text-foreground font-semibold">
                                {brand.name}
                            </span>
                        </div>
                    </div>

                    {/* Brand Banner Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                    Official Trade Portfolio
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight leading-[0.95] mb-4">
                                {brand.name}
                            </h1>

                            <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
                                {brand.positioning || brand.description || `Explore verified wholesale specifications, pack formats, and export terms for ${brand.name}.`}
                            </p>
                        </div>

                        {/* Quick Stats Badges */}
                        <div className="lg:col-span-4 flex flex-col justify-end">
                            <div className="grid grid-cols-2 gap-4 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-8">
                                <div>
                                    <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-0.5 font-mono">
                                        {products.length}
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Verified Products
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-0.5">
                                        100%
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Export Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            {/* Discovery Hub Filters Bar (Sticky) */}
            <div className="sticky top-0 z-40">
                <BrandFilters
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    totalCount={filteredProducts.length}
                    categoryOptions={DISCOVERY_CATEGORIES}
                    countryOptions={DISCOVERY_COUNTRIES}
                    ownerOptions={DISCOVERY_OWNERSHIPS}
                    localSearchValue={searchValue}
                    setLocalSearchValue={setSearchValue}
                    onClearAll={handleClearAll}
                />
            </div>

            {/* Products Grid (Step 2 - Format matching Image 1) */}
            <main className="max-w-[1800px] mx-auto px-4 md:px-8 py-10">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product: any, idx: number) => (
                            <ProductTradeCard
                                key={product.name + idx}
                                product={product}
                                brandId={brand.id}
                                brandName={brand.name}
                                country={brand.country || "United Kingdom"}
                                ownerName={brand.owner?.name || brand.name}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/20 border border-border rounded-3xl p-8">
                        <p className="text-lg font-bold text-foreground mb-2">
                            No products match your current filter selection.
                        </p>
                        <p className="text-xs text-muted-foreground mb-6">
                            Try resetting filters or contact our commercial desk for custom allocation.
                        </p>
                        <button
                            onClick={handleClearAll}
                            className="px-6 py-2.5 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </main>

            {/* Trade Application Section */}
            <TradeApplicationSection brandName={brand.name} />

        </div>
    );
}
