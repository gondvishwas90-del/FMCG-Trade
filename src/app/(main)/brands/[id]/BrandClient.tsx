"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TradeApplicationSection from "@/components/pages/brands/components/TradeApplicationSection";
import { ArrowLeft, ArrowRight, Check, AlertCircle, ArrowDown, ChevronRight, ChevronLeft, TrendingUp, Quote, Filter, Package, Box, History, Globe, Shield, Target, Building2 } from "lucide-react";
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
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-foreground mb-4 md:mb-6 tracking-tighter leading-[0.95] md:leading-[0.9]">
                                {brand.name}
                            </h1>

                            {brand.tagline && (
                                <p className="text-xl md:text-3xl text-emerald-600 dark:text-emerald-400 font-medium tracking-tight mb-6">
                                    "{brand.tagline}"
                                </p>
                            )}

                            <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed opacity-95">
                                "{brand.positioning}"
                            </p>

                            {brand.tradeIntents && brand.tradeIntents.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-8">
                                    {brand.tradeIntents.map((intent: string, i: number) => (
                                        <span key={intent} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-widest rounded-md">
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
                            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-border"></span>
                                The Story
                            </h2>
                            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4 md:mb-6">
                                {brand.storyHeadline || "A legacy of Craftsmanship and Distinction."}
                            </h3>
                            <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                        </div>
                    </div>
                    <div className="md:col-span-8 space-y-12">
                        <div className="relative">
                            <Quote className="absolute -top-4 -left-6 w-12 h-12 text-muted -z-10 transform -scale-x-100 opacity-40" />
                            <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed whitespace-pre-line">
                                {brand.storyDescription || brand.description}
                            </p>
                        </div>

                        <div className="bg-card border border-border p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                                    <TrendingUp className="w-5 h-5" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest">Trade Analyst Verdict</h3>
                                </div>
                                <p className="text-lg md:text-xl text-card-foreground leading-relaxed font-light text-balance">
                                    "{brand.tradeAnalystVerdict || getBestTradeUse()}"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Product Showcase */}
                {brand.products && brand.products.length > 0 && (
                    <ProductShowcaseSection products={brand.products} brandName={brand.name} />
                )}

                {/* 4. Unified Trade Application Section (Isolated Component) */}
                <TradeApplicationSection brandName={brand.name} />
            </div>

            {/* 4. Trade Specs Section (Light Mode) */}
            <section id="specs" className="bg-muted/30 border-t border-border py-16 md:py-24 scroll-mt-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">Trade Specifications</h2>
                            <p className="text-muted-foreground mb-6 md:mb-8 max-w-sm font-light leading-relaxed">
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

function ProductShowcaseSection({ products, brandName }: { products: any[]; brandName: string }) {
    const parseSize = (sizeStr?: string) => {
        if (!sizeStr) return { pack: "Standard Commercial Case Format", pallet: "Pallet Lots Available" };
        const parts = sizeStr.split("•");
        if (parts.length >= 2) {
            return {
                pack: parts[0].trim(),
                pallet: parts[1].trim()
            };
        }
        return {
            pack: sizeStr,
            pallet: "Standard Wholesale Pallet"
        };
    };

    return (
        <section id="products" className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-[0.95]">
                        Product Portfolio & Specs
                    </h3>
                </div>
                <p className="text-muted-foreground max-w-md text-base md:text-lg font-light leading-relaxed">
                    Standardized wholesale case and pallet specifications for commercial procurement.
                </p>
            </div>

            {/* List of Products: Each with Image on Left & Premium Table on Right */}
            <div className="space-y-12">
                {products.map((product) => {
                    const parsed = parseSize(product.size);
                    return (
                        <div
                            key={product.name}
                            className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12"
                        >
                            {/* Left: Product Image (Clean studio framing, no top overlay bar) */}
                            <div className="lg:col-span-5 relative bg-muted/30 min-h-[380px] lg:min-h-[460px] flex items-center justify-center p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border">
                                <div className="relative w-full h-72 md:h-96">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                </div>
                            </div>

                            {/* Right: Premium Specification Table */}
                            <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between bg-card">
                                <div>
                                    <div className="mb-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                                            Official Specification Sheet
                                        </span>
                                        <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1 mb-3">
                                            {product.name}
                                        </h4>
                                        <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Premium Table */}
                                    <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border bg-muted/10 mb-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <Package className="w-4 h-4 text-emerald-500" />
                                                Pack Format
                                            </span>
                                            <span className="sm:col-span-2 text-sm font-semibold text-foreground font-mono">
                                                {parsed.pack}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <Box className="w-4 h-4 text-blue-500" />
                                                Pallet Capacity
                                            </span>
                                            <span className="sm:col-span-2 text-sm font-semibold text-foreground font-mono">
                                                {parsed.pallet}
                                            </span>
                                        </div>

                                        {product.abv && (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors">
                                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-purple-500" />
                                                    Alcohol By Volume
                                                </span>
                                                <span className="sm:col-span-2 text-sm font-semibold text-foreground font-mono">
                                                    {product.abv}
                                                </span>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-amber-500" />
                                                Bond & Logistics
                                            </span>
                                            <span className="sm:col-span-2 text-sm font-medium text-foreground">
                                                Under-Bond (T1) / UK Duty-Paid Available
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <Target className="w-4 h-4 text-emerald-500" />
                                                Order Terms
                                            </span>
                                            <span className="sm:col-span-2 text-sm font-medium text-foreground">
                                                Full Pallets (Mixed lots permitted) & FCL Containers
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom CTA Button */}
                                <div className="pt-4 flex items-center justify-end border-t border-border/60">
                                    <Link
                                        href={`/contact?subject=${encodeURIComponent('Commercial Allocation Request: ' + product.name)}`}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all group"
                                    >
                                        <span>Request Allocation</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
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
