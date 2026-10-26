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

interface BrandGalleryProps {
    brands: Brand[];
    isCategoryPage?: boolean;
}

export default function BrandGallery({ brands, isCategoryPage = false }: BrandGalleryProps) {
    // Current requirement: Keep only three cards
    const displayedBrands = useMemo(() => brands.slice(0, 3), [brands]);

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

    // Extract all unique categories, countries, and owners for the filter
    const { categoryOptions, countryOptions, ownerOptions } = useMemo(() => {
        const categories = new Set<string>();
        const countries = new Set<string>();
        const owners = new Set<string>();
        displayedBrands.forEach(b => {
            if (b.category) categories.add(b.category);
            if (b.country) countries.add(b.country);
            if (b.owner?.name) owners.add(b.owner.name);
            b.categoryFit?.forEach(fit => categories.add(fit));
            b.portfolioRanges?.forEach(r => {
                r.categoryPath?.split('→').forEach(p => categories.add(p.trim()));
            });
        });
        return {
            categoryOptions: Array.from(categories).sort(),
            countryOptions: Array.from(countries).sort(),
            ownerOptions: Array.from(owners).sort()
        };
    }, [displayedBrands]);

    const filteredBrands = useMemo(() => {
        return displayedBrands.filter(brand => {
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
            if (filters.country.length > 0 && !filters.country.includes(brand.country || '')) return false;

            // Use
            if (filters.use.length > 0) {
                const matchesUse = filters.use.some(u => {
                    if (u === 'On-Trade' && brand.tradeCapabilities.onTradeFocused) return true;
                    if (u === 'Off-Trade' && brand.tradeCapabilities.offTradeFocused) return true;
                    if (u === 'Cocktail' && brand.categoryFit?.includes('Ready Made Cocktails')) return true;
                    return false;
                });
                if (!matchesUse) return false;
            }

            // Owner
            if (filters.owner.length > 0 && !filters.owner.includes(brand.owner?.name || '')) return false;

            // Category Filter
            if (filters.category.length > 0) {
                const matchesCategory = filters.category.some(cat => {
                    const searchCat = cat.toLowerCase();
                    const matchCat = brand.category?.toLowerCase() === searchCat;
                    const matchFit = brand.categoryFit?.some(f => f.toLowerCase() === searchCat);
                    const matchRange = brand.portfolioRanges?.some(r => r.categoryPath.toLowerCase().includes(searchCat)) || false;
                    const matchProduct = brand.products?.some(p => p.name.toLowerCase().includes(searchCat)) || false;
                    return matchCat || matchFit || matchRange || matchProduct;
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

            <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8 md:py-16">
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
                            onClick={handleClearAll}
                            className="px-6 py-2 bg-foreground text-background font-bold rounded hover:bg-emerald-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}

