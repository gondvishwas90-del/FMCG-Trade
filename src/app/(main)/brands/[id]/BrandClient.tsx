"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortfolioRange } from "@/components/pages/brands/types/brand.types";
import TradeApplicationSection from "@/components/pages/brands/components/TradeApplicationSection";
import { ArrowLeft, Check, AlertCircle, ArrowDown, ChevronRight, ChevronLeft, TrendingUp, Quote, Filter, Package, Box, History, Globe, Shield, Target, Building2 } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export default function BrandClient({ brand, categories = [] }: { brand: any, categories?: any[] }) {
    const router = useRouter();
    const { scrollY } = useScroll();

    // Parallax effect for hero
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    const getBestTradeUse = () => {
        const uses = [];
        if (brand.tradeCapabilities?.onTradeFocused) uses.push('premium on-trade programs');
        if (brand.tradeCapabilities?.exportAvailable) uses.push('export portfolio building');
        if (brand.tradeCapabilities?.ukDistribution) uses.push('uk distribution');
        if (brand.tradeCapabilities?.offTradeFocused) uses.push('retail distribution');
        if (brand.tradeCapabilities?.privateLabel) uses.push('private label opportunities');

        if (uses.length === 0) return 'General trade discussions and market-specific enquiries.';

        return `Most commonly discussed for ${uses.slice(0, 2).join(', ')}${uses.length > 2 ? ', and complementary portfolio building' : ''}.`;
    };

    // Category Resolution
    const resolvedCategories = useMemo(() => {
        const names: string[] = [];
        
        // Resolve T1
        categories.forEach((t1: any) => {
            if (brand.tier1Ids?.includes(t1.id)) names.push(t1.name);
            
            // Resolve T2
            t1.tier2?.forEach((t2: any) => {
                if (brand.tier2Ids?.includes(t2.id)) names.push(t2.name);
                
                // Resolve T3
                t2.tier3?.forEach((t3: any) => {
                    if (brand.tier3Ids?.includes(t3.id)) names.push(t3.name);
                });
            });
        });
        
        return Array.from(new Set(names));
    }, [brand, categories]);

    return (
        <div className="min-h-screen bg-background selection:bg-emerald-100 dark:selection:bg-emerald-900/30 selection:text-emerald-900 dark:selection:text-emerald-100 pb-32">

            {/* Immersive Hero (70vh mobile, 85vh desktop) */}
            <header className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-muted">
                <motion.div style={{ y, opacity }} className="relative w-full h-full">
                    {/* Desktop Background */}
                    {(brand.backgroundImage || brand.image) && (
                        <Image
                            src={brand.backgroundImage || brand.image}
                            alt={brand.name}
                            fill
                            className="object-cover hidden md:block"
                            priority
                            sizes="100vw"
                        />
                    )}
                    {/* Mobile Background */}
                    {(brand.mobileBackgroundImage || brand.image) && (
                        <Image
                            src={brand.mobileBackgroundImage || brand.image}
                            alt={brand.name}
                            fill
                            className="object-cover block md:hidden"
                            priority
                            sizes="100vw"
                        />
                    )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background  via-background/60 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-24 left-6 md:left-12 z-20">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-foreground/80 hover:text-foreground bg-background/20 hover:bg-background/40 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all text-xs md:text-sm font-medium border border-border/20 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Browsing
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 pb-16 md:pb-32">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {resolvedCategories.map((cat: string, idx: number) => (
                                    <span key={idx} className={`px-4 py-1.5 ${idx === 0 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-background/40 backdrop-blur-md border border-border/20 text-foreground/90'} text-xs font-bold uppercase tracking-widest rounded-full`}>
                                        {cat}
                                    </span>
                                ))}
                                {brand.country && (
                                    <span className="px-4 py-1.5 bg-background/40 backdrop-blur-md border border-border/20 text-foreground/90 text-xs font-bold uppercase tracking-widest rounded-full">
                                        {brand.country}
                                    </span>
                                )}
                                {brand.owner && (
                                    <Link
                                        href={`/brand-owners/${brand.owner.id || brand.brandOwnerId}`}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-background/60 hover:bg-background/90 backdrop-blur-md border border-border/30 text-foreground/90 hover:text-foreground text-xs font-bold uppercase tracking-widest rounded-full transition-all group"
                                    >
                                        <Building2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                                        <span>Owner: {brand.owner.name}</span>
                                    </Link>
                                )}
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-foreground mb-4 md:mb-6 tracking-tight leading-[0.95] md:leading-[0.9]">
                                {brand.name}
                            </h1>

                            {brand.tagline && (
                                <p className="text-xl md:text-3xl text-emerald-400 font-serif italic mb-6 animate-pulse-slow">
                                    "{brand.tagline}"
                                </p>
                            )}

                            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed font-serif italic opacity-90">
                                "{brand.positioning}"
                            </p>

                            {brand.tradeIntents && brand.tradeIntents.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-8">
                                    {brand.tradeIntents.map((intent: string, i: number) => (
                                        <span key={intent} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider rounded-md">
                                            {intent.replace('-', ' ')}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-20 md:space-y-32">

                {/* 1. Overview Section */}
                <section id="overview" className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 scroll-mt-32">
                    <div className="md:col-span-4 relative">
                        <div className="md:sticky md:top-32">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-border"></span>
                                The Story
                            </h2>
                            <h3 className="text-2xl md:text-4xl font-serif text-foreground leading-tight mb-4 md:mb-6">
                                {brand.storyHeadline || "A legacy of Craftsmanship and Distinction."}
                            </h3>
                            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                        </div>
                    </div>
                    <div className="md:col-span-8 space-y-12">
                        <div className="relative">
                            <Quote className="absolute -top-4 -left-6 w-12 h-12 text-muted -z-10 transform -scale-x-100" />
                            <p className="text-xl md:text-2xl text-foreground/80 font-serif leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-600 dark:first-letter:text-emerald-400 first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
                                {brand.storyDescription || brand.description}
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                    <TrendingUp className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Trade Analyst Verdict</h3>
                                </div>
                                <p className="text-lg md:text-2xl text-card-foreground leading-relaxed font-serif italic text-balance">
                                    "{brand.tradeAnalystVerdict || getBestTradeUse()}"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Product Showcase */}
                {brand.products && brand.products.length > 0 && (
                    <section id="products" className="scroll-mt-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div>
                                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-3">
                                    <Package className="w-4 h-4 text-emerald-500" />
                                    The Portfolio
                                </h2>
                                <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Product Showcase</h3>
                            </div>
                            <p className="text-muted-foreground max-w-sm text-lg italic">
                                Exploring the range of expressions and formats available for trade.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {brand.products.map((product: any, idx: number) => (
                                <ProductCard key={product.name} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Portfolio Ranges */}
                {brand.portfolioRanges && brand.portfolioRanges.length > 0 && (
                    <section id="ranges" className="scroll-mt-32">
                        <div className="mb-16">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-3">
                                <Box className="w-4 h-4 text-emerald-500" />
                                Strategic Tiers
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Portfolio Architectures</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {brand.portfolioRanges.map((range: PortfolioRange) => (
                                <RangeCard key={range.id} range={range} />
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Unified Trade Application Section (Isolated Component) */}
                <TradeApplicationSection brandName={brand.name} />
            </div>

            {/* 4. Trade Specs Section (Light Mode) */}
            <section id="specs" className="bg-muted/30 border-t border-border py-16 md:py-24 scroll-mt-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">Trade Specifications</h2>
                            <p className="text-muted-foreground mb-6 md:mb-8 max-w-sm">
                                Comprehensive breakdown of distribution, compliance, and access requirements for this brand.
                            </p>

                            {/* Market Access List from Reference */}
                            <div className="mb-6 md:mb-8">
                                <h4 className="text-sm font-bold text-foreground mb-4">Market & Access</h4>
                                <ul className="space-y-3">
                                    {brand.marketConsiderations?.map((item: string, i: number) => (
                                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                            <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* <button className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-xl">
                                Download Sell Sheet
                            </button> */}
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Reference-style Capabilities Grid */}
                            <CapabilityCard label="Available for Export" sub="International markets" active={brand.tradeCapabilities.exportAvailable} />
                            <CapabilityCard label="Private Label" sub="White label programs" active={brand.tradeCapabilities.privateLabel} />
                            <CapabilityCard label="UK Distribution" sub="Domestic market access" active={brand.tradeCapabilities.ukDistribution} />
                            <CapabilityCard label="EU Distribution" sub="European market access" active={brand.tradeCapabilities.euDistribution} />
                            <CapabilityCard label="On-Trade Focused" sub="Bars, restaurants, hotels" active={brand.tradeCapabilities.onTradeFocused} />
                            <CapabilityCard label="Off-Trade Focused" sub="Retail, supermarkets" active={brand.tradeCapabilities.offTradeFocused} />
                        </div>
                    </div>
                </div>
            </section>



        </div >
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full"
        >
            <div className="relative h-72 w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        Premium Spec
                    </span>
                </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h4 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{product.name}</h4>
                    <span className="bg-muted px-2 py-1 rounded text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        {product.abv} ABV
                    </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow italic font-serif leading-relaxed">
                    "{product.description}"
                </p>
                <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground/70">
                        <Box className="w-3.5 h-3.5 text-emerald-500" />
                        {product.size}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function RangeCard({ range }: { range: PortfolioRange }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start group hover:bg-card transition-colors"
        >
            <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${range.tradePositioning === 'Super-Premium' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        range.tradePositioning === 'Premium' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                        {range.tradePositioning}
                    </span>
                    <h4 className="text-2xl font-bold">{range.rangeName}</h4>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground italic font-serif">
                    <span className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" />
                        {range.categoryPath}
                    </span>
                    {range.regionalNote && (
                        <span className="flex items-center gap-2 text-amber-500/70">
                            <Shield className="w-3.5 h-3.5" />
                            {range.regionalNote}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {range.commonTradeUse.map((use) => (
                        <span key={use} className="px-3 py-1 bg-muted/50 text-muted-foreground text-[10px] rounded-full uppercase tracking-tighter">
                            {use}
                        </span>
                    ))}
                </div>
            </div>

            <div className="lg:w-64 w-full flex flex-col gap-4 shrink-0 lg:border-l lg:pl-8 border-border">
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Formats</p>
                    <div className="flex flex-wrap gap-2">
                        {range.typicalFormats.map((f) => (
                            <span key={f} className="text-sm font-medium text-foreground/80">{f}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Strategic Intent</p>
                    <div className="flex flex-wrap gap-1">
                        {range.relevantFor.map((intent) => (
                            <span key={intent} className="w-2 h-2 rounded-full bg-emerald-500/50" title={intent} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CapabilityCard({ label, sub, active }: { label: string, sub: string, active: boolean }) {
    return (
        <div className={`border p-5 flex items-start gap-4 rounded-xl transition-all ${active ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20' : 'border-border bg-card opacity-60'
            }`}>
            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                {active ? <Check className="w-3 h-3" /> : <div className="w-2 h-0.5 bg-current" />}
            </div>
            <div>
                <p className="text-foreground font-bold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
        </div>
    );
}
