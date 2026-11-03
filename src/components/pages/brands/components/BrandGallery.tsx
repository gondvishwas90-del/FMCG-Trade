"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryStates, parseAsInteger, parseAsString, parseAsArrayOf } from "nuqs";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import BrandCard from "./BrandCard";
import BrandFilters from "./BrandFilters";
import { PaginationControls } from "@/components/pages/trade-opportunities/components/PaginationControls";
import type { FilterType } from "../types/filter.types";
import type { Brand } from "../types/brand.types";
import {
    DISCOVERY_COUNTRIES,
    DISCOVERY_CATEGORIES,
    DISCOVERY_OWNERSHIPS
} from "../constants/discovery-hub.constants";

interface BrandGalleryProps {
    brands: Brand[];
    isCategoryPage?: boolean;
    selectedBrand?: string | null;
    onClearSelectedBrand?: () => void;
}

export default function BrandGallery({
    brands,
    isCategoryPage = false,
    selectedBrand = null,
    onClearSelectedBrand
}: BrandGalleryProps) {
    // Full catalog display for categories and trade directory
    const displayedBrands = useMemo(() => brands, [brands]);

    const [queryParams, setQueryParams] = useQueryStates({
        page: parseAsInteger.withDefault(1),
        category: parseAsArrayOf(parseAsString).withDefault([]),
        country: parseAsArrayOf(parseAsString).withDefault([]),
        use: parseAsArrayOf(parseAsString).withDefault([]),
        owner: parseAsArrayOf(parseAsString).withDefault([]),
        search: parseAsString.withDefault('')
    }, {
        shallow: true,
        scroll: false
    });

    const { page: currentPage, category, country, use, owner, search } = queryParams;
    const PAGE_SIZE = 16;

    const filters = useMemo(() => ({
        category,
        country,
        use,
        owner,
        access: [] as string[] // access is not currently used in the logic but part of the type
    }), [category, country, use, owner]);

    const [localSearchValue, setLocalSearchValue] = useState(search);

    // Sync local state with URL search param
    useEffect(() => {
        setLocalSearchValue(search);
    }, [search]);

    // Debounce updating the query param
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearchValue !== search) {
                setQueryParams({ search: localSearchValue || null, page: 1 });
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearchValue, search, setQueryParams]);

    const handleFilterChange = (type: FilterType, value: string[]) => {
        setQueryParams({ [type]: value.length > 0 ? value : null, page: 1 });
    };

    const setCurrentPage = (p: number) => {
        setQueryParams({ page: p });
    };

    const handleClearAll = () => {
        setQueryParams({
            category: null,
            country: null,
            use: null,
            owner: null,
            search: null,
            page: 1
        });
        setLocalSearchValue('');
    };

    // Fixed Discovery Hub options strictly matching official catalog
    const { categoryOptions, countryOptions, ownerOptions } = useMemo(() => {
        return {
            categoryOptions: DISCOVERY_CATEGORIES,
            countryOptions: DISCOVERY_COUNTRIES,
            ownerOptions: DISCOVERY_OWNERSHIPS
        };
    }, []);

    const filteredBrands = useMemo(() => {
        return displayedBrands.filter(brand => {
            // Selected Brand Logo Filter (from Top Logo Directory)
            if (selectedBrand) {
                const query = selectedBrand.toLowerCase().trim();
                const matchesOwner = brand.owner?.name?.toLowerCase().includes(query) || (brand.owner as any)?.id?.toLowerCase().includes(query);
                const matchesName = brand.name?.toLowerCase().includes(query);
                if (!matchesOwner && !matchesName) return false;
            }

            // Search Query Filter
            if (search) {
                const query = search.toLowerCase().trim();
                const matchesName = brand.name?.toLowerCase().includes(query);
                const matchesCategory = brand.category?.toLowerCase().includes(query);
                const matchesFit = brand.categoryFit?.some(fit => fit.toLowerCase().includes(query));
                const matchesCountry = brand.country?.toLowerCase().includes(query);
                const matchesTagline = brand.tagline?.toLowerCase().includes(query);
                const matchesDescription = brand.description?.toLowerCase().includes(query);
                const matchesOwner = brand.owner?.name?.toLowerCase().includes(query);
                const matchesProducts = brand.products?.some(p => 
                    p.name?.toLowerCase().includes(query) || 
                    p.description?.toLowerCase().includes(query)
                );

                if (!matchesName && !matchesCategory && !matchesFit && !matchesCountry && !matchesTagline && !matchesDescription && !matchesOwner && !matchesProducts) {
                    return false;
                }
            }

            // Country
            if (filters.country.length > 0) {
                const matchesCountry = filters.country.some(c => 
                    brand.country?.toLowerCase().includes(c.toLowerCase()) || 
                    c.toLowerCase().includes(brand.country?.toLowerCase() || '')
                );
                if (!matchesCountry) return false;
            }

            // Use
            if (filters.use.length > 0) {
                const matchesUse = filters.use.some(u => {
                    const uLower = u.toLowerCase();
                    if (uLower === 'on-trade' && brand.tradeCapabilities?.onTradeFocused) return true;
                    if (uLower === 'off-trade' && brand.tradeCapabilities?.offTradeFocused) return true;
                    if (uLower === 'cocktail' && (
                        brand.categoryFit?.some(fit => fit.toLowerCase().includes('cocktail')) || 
                        brand.tier1Ids?.includes('cocktails')
                    )) return true;
                    return false;
                });
                if (!matchesUse) return false;
            }

            // Owner
            if (filters.owner.length > 0) {
                const matchesOwner = filters.owner.some(o => {
                    const oClean = o.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const brandOwnerClean = (brand.owner?.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                    return brandOwnerClean.includes(oClean) || oClean.includes(brandOwnerClean);
                });
                if (!matchesOwner) return false;
            }

            // Category Filter
            if (filters.category.length > 0) {
                const matchesCategory = filters.category.some(cat => {
                    const searchCat = cat.toLowerCase();
                    const matchCat = brand.category?.toLowerCase().includes(searchCat) || searchCat.includes(brand.category?.toLowerCase() || '');
                    const matchFit = brand.categoryFit?.some(f => f.toLowerCase().includes(searchCat) || searchCat.includes(f.toLowerCase()));
                    const matchRange = brand.portfolioRanges?.some(r => r.categoryPath.toLowerCase().includes(searchCat)) || false;
                    const matchProduct = brand.products?.some(p => p.name.toLowerCase().includes(searchCat) || p.description?.toLowerCase().includes(searchCat)) || false;
                    const matchTiers = brand.tier1Ids?.some(t => searchCat.includes(t)) || brand.tier2Ids?.some(t => searchCat.includes(t)) || false;
                    return matchCat || matchFit || matchRange || matchProduct || matchTiers;
                });
                if (!matchesCategory) return false;
            }

            return true;
        });
    }, [filters, search, displayedBrands]);

    const totalPages = Math.ceil(filteredBrands.length / PAGE_SIZE);
    const currentBrands = filteredBrands.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className={`${isCategoryPage ? 'bg-transparent' : 'bg-background min-h-screen'} relative flex flex-col-reverse md:block`}>

            {/* Sticky Filters: Bottom on Mobile, Top on Desktop */}
            {!isCategoryPage && (
                <BrandFilters
                    activeFilters={filters}
                    onFilterChange={handleFilterChange}
                    totalCount={filteredBrands.length}
                    categoryOptions={categoryOptions}
                    countryOptions={countryOptions}
                    ownerOptions={ownerOptions}
                    localSearchValue={localSearchValue}
                    setLocalSearchValue={setLocalSearchValue}
                    onClearAll={handleClearAll}
                />
            )}

            <div id="brand-products-section" className="max-w-[1800px] mx-auto px-4 md:px-6 py-8 md:py-16">
                {/* Active Brand Filter Banner */}
                {selectedBrand && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 md:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <div>
                                <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground block">
                                    Direct Brand Portfolio
                                </span>
                                <span className="text-base font-bold text-foreground">
                                    Showing verified trade items from <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{selectedBrand}</strong>
                                </span>
                            </div>
                        </div>
                        {onClearSelectedBrand && (
                            <button
                                onClick={onClearSelectedBrand}
                                className="px-4 py-2 rounded-full bg-background/80 hover:bg-background border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all shrink-0 self-start sm:self-auto"
                            >
                                View All Brands
                            </button>
                        )}
                    </motion.div>
                )}
                {/* Mobile & Tablet Search Bar */}
                {!isCategoryPage && (
                    <div className="block md:hidden mb-8 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground/50 group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={localSearchValue}
                            onChange={(e) => setLocalSearchValue(e.target.value)}
                            placeholder="Search brands, products..."
                            className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 rounded-2xl py-3.5 pl-10 pr-10 text-[11px] font-bold uppercase tracking-wider text-foreground placeholder:text-muted-foreground/45 placeholder:uppercase placeholder:tracking-widest transition-all duration-300 outline-none"
                        />
                        {localSearchValue && (
                            <button
                                onClick={() => {
                                    setLocalSearchValue('');
                                    setQueryParams({ search: null, page: 1 });
                                }}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground/60 hover:text-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence>
                        {currentBrands.map(brand => (
                            <BrandCard
                                key={brand.id}
                                brand={brand}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {totalPages > 1 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {filteredBrands.length === 0 && (
                    <div className="text-center py-24 border-t border-border mt-12">
                        <p className="text-muted-foreground text-lg mb-4">No brands match your selection.</p>
                        <button
                            onClick={() => {
                                handleClearAll();
                                onClearSelectedBrand?.();
                            }}
                            className="px-6 py-2 bg-foreground text-background font-bold rounded-full hover:bg-emerald-600 transition-colors uppercase tracking-wider text-xs"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}

