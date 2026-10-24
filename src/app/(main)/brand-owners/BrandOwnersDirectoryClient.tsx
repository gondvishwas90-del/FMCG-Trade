'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Search, Building2, MapPin, ArrowRight, Layers, Globe, Filter } from 'lucide-react';
import { IBrandOwner } from '@/models/BrandOwner';

interface BrandOwnersDirectoryClientProps {
    brandOwners: IBrandOwner[];
    brandCountsByOwner: Record<string, number>;
}

export default function BrandOwnersDirectoryClient({
    brandOwners = [],
    brandCountsByOwner = {}
}: BrandOwnersDirectoryClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Extract unique categories from brand owners
    const categories = useMemo(() => {
        const set = new Set<string>();
        brandOwners.forEach(o => {
            if (o.category) set.add(o.category);
        });
        return Array.from(set).sort();
    }, [brandOwners]);

    // Filter brand owners by search term and category
    const filteredOwners = useMemo(() => {
        return brandOwners.filter(owner => {
            const matchesSearch =
                searchTerm === '' ||
                owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (owner.country && owner.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (owner.category && owner.category.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory =
                selectedCategory === 'all' ||
                (owner.category && owner.category.toLowerCase() === selectedCategory.toLowerCase());

            return matchesSearch && matchesCategory;
        });
    }, [brandOwners, searchTerm, selectedCategory]);

    return (
        <main className="w-full min-h-screen bg-background text-foreground pb-24">
            {/* Hero Header — z-[20] so it renders above the fixed backdrop strip */}
            <section className="relative z-[20] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950/20 pt-28 pb-12 md:pt-36 md:pb-16 border-b border-border">
                {/* Giant watermark background text */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden flex items-end z-0">
                    <span className="text-[12vw] font-black text-zinc-950/[0.03] dark:text-white/[0.015] tracking-[0.1em] uppercase leading-none select-none whitespace-nowrap translate-y-[20%] translate-x-[-1%]">
                        Brand Houses
                    </span>
                </div>

                <div className="relative max-w-[1800px] mx-auto px-4 md:px-12 z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                            Verified FMCG Producers & Owners
                        </span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground uppercase leading-[0.95] mb-4"
                    >
                        Brand Owners <br />
                        <span className="text-muted-foreground font-light">& Houses.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl font-normal leading-relaxed"
                    >
                        Browse verified global brand houses, independent distillers, and multinational producers. Explore their complete portfolio architectures and trade availability.
                    </motion.p>
                </div>
            </section>

            {/* Filter & Search Controls Bar */}
            <section 
                className="sticky top-0 z-20 bg-background backdrop-blur-md border-b border-border py-4"
            >
                <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                                selectedCategory === 'all'
                                    ? 'bg-foreground text-background shadow-sm'
                                    : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border'
                            }`}
                        >
                            All Categories ({brandOwners.length})
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-foreground text-background shadow-sm'
                                        : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by owner name, country..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/40 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all placeholder:text-muted-foreground/60"
                        />
                    </div>

                </div>
            </section>

            {/* Directory Cards Grid */}
            <section className="max-w-[1800px] mx-auto px-4 md:px-12 pt-8 md:pt-12">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                        Showing {filteredOwners.length} {filteredOwners.length === 1 ? 'Brand Owner' : 'Brand Owners'}
                    </span>
                </div>

                {filteredOwners.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredOwners.map((owner, idx) => {
                            const brandCount = brandCountsByOwner[owner.id] || 0;
                            return (
                                <OwnerCard key={owner.id || idx} owner={owner} brandCount={brandCount} />
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-24 text-center px-4 max-w-md mx-auto">
                        <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">No Brand Owners Found</h3>
                        <p className="text-sm text-muted-foreground">
                            We couldn't find any brand owners matching your filter criteria. Try clearing your search or selecting a different category.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}

function OwnerCard({ owner, brandCount }: { owner: IBrandOwner; brandCount: number }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [imgFailed, setImgFailed] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isLightMode = mounted && resolvedTheme === 'light';
    const currentLogo = isLightMode
        ? (owner.logoLight?.trim() || owner.logo?.trim() || '')
        : (owner.logoDark?.trim() || owner.logo?.trim() || '');

    return (
        <Link
            href={`/brand-owners/${owner.id}`}
            className="group relative flex flex-col justify-between bg-card border border-border/80 hover:border-foreground rounded-2xl md:rounded-3xl p-6 transition-all duration-300 hover:shadow-md h-full overflow-hidden"
        >
            {/* Card Header: Category badge and country */}
            <div className="flex items-center justify-between gap-2 mb-6">
                {owner.category ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-muted text-foreground border border-border/60">
                        {owner.category}
                    </span>
                ) : (
                    <span />
                )}

                {owner.country && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                        <MapPin className="w-3 h-3 text-muted-foreground/80" />
                        {owner.country}
                    </span>
                )}
            </div>

            {/* Logo Area */}
            <div className="h-44 sm:h-48 w-full flex items-center justify-center p-3 sm:p-4 bg-muted/20 dark:bg-muted/10 rounded-xl mb-6 group-hover:bg-muted/40 transition-colors overflow-hidden relative">
                {currentLogo && !imgFailed ? (
                    <img
                        key={currentLogo}
                        src={currentLogo}
                        alt={owner.name}
                        className="w-full h-full object-contain scale-[1.15] sm:scale-[1.2] transition-transform duration-300 group-hover:scale-[1.26]"
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <Building2 className="w-12 h-12 text-muted-foreground/30" />
                )}
            </div>

            {/* Bottom Details */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {owner.name}
                </h3>

                {owner.description ? (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {owner.description}
                    </p>
                ) : null}

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/60 text-xs font-semibold">
                    <span className="text-muted-foreground">
                        {brandCount} {brandCount === 1 ? 'Portfolio Brand' : 'Portfolio Brands'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-foreground group-hover:translate-x-0.5 transition-transform">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
