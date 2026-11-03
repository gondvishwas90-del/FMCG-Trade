"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Maximize2, ShoppingCart, Heart, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface SingleProductDetailProps {
    product: {
        id?: string;
        slug?: string;
        name: string;
        image: string;
        abv?: string;
        size: string;
        description?: string;
        barcode?: string;
        hsCode?: string;
        brandName?: string;
        category?: string;
        country?: string;
    };
    brand: {
        id: string;
        name: string;
        country?: string;
        category?: string;
        logo?: string;
    };
}

export default function SingleProductDetailView({ product, brand }: SingleProductDetailProps) {
    const [selectedPackMode, setSelectedPackMode] = useState<'carton' | 'pallet'>('carton');
    const [quantity, setQuantity] = useState(1);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    // Parse package format string (e.g. "6 x 70cl • 100 cs / Pallet")
    const parseSizeDetails = (sizeStr?: string) => {
        if (!sizeStr) return { units: 6, format: "6 x 70cl", palletCases: 100 };
        const parts = sizeStr.split("•");
        const format = parts[0]?.trim() || "Standard Case";
        const unitsMatch = format.match(/^(\d+)\s*x/i);
        const units = unitsMatch ? parseInt(unitsMatch[1], 10) : 6;
        
        let palletCases = 100;
        if (parts[1]) {
            const csMatch = parts[1].match(/(\d+)\s*cs/i);
            if (csMatch) palletCases = parseInt(csMatch[1], 10);
        }
        return { units, format, palletCases };
    };

    const details = parseSizeDetails(product.size);
    const barcode = product.barcode || `544${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const hsCode = product.hsCode || (product.abv && product.abv !== '0%' ? '220830' : '22021000');
    const effectiveCategory = product.category || brand.category || "Beverages";

    const handleAddToCart = () => {
        setOrderConfirmed(true);
        setTimeout(() => setOrderConfirmed(false), 2500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 md:pt-32 pb-24">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Back to Brand Hub Link */}
                <div className="mb-6">
                    <Link
                        href={`/brands/${brand.id}`}
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to {brand.name} Portfolio</span>
                    </Link>
                </div>

                {/* Main 2-Column Product Detail Layout (DRH Market Format) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

                    {/* Left Column: Product Studio Frame */}
                    <div className="lg:col-span-5 relative">
                        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-8 relative flex items-center justify-center min-h-[460px] md:min-h-[540px] shadow-sm">
                            
                            {/* Expand / Zoom Button */}
                            <button
                                onClick={() => setIsZoomOpen(true)}
                                className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-muted-foreground hover:text-foreground border border-border/40 shadow-xs transition-colors z-10"
                                title="Expand image"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>

                            {/* Genuine Product Image */}
                            <div className="relative w-full h-[360px] md:h-[440px]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Specifications & Commercial Controls */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                            {/* Breadcrumb Navigation */}
                            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-medium flex-wrap">
                                <Link href="/categories" className="hover:text-foreground transition-colors">
                                    All products
                                </Link>
                                <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
                                <Link href={`/brands/${brand.id}`} className="hover:text-foreground transition-colors">
                                    {effectiveCategory}
                                </Link>
                                <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
                                <span className="text-foreground/90 font-semibold truncate max-w-md">
                                    {product.name}
                                </span>
                            </nav>

                            {/* Product Title */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.08] mb-4">
                                {product.name}
                            </h1>

                            {/* Description */}
                            <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-2xl">
                                {product.description || `${product.name} is an internationally recognized commercial FMCG asset with proven market pull across export and wholesale channels. Sourced directly through verified bonded supply networks.`}
                            </p>

                            {/* PACKAGING Selector Section */}
                            <div className="mb-8">
                                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                    Packaging
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {/* Carton Pill */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPackMode('carton')}
                                        className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                                            selectedPackMode === 'carton'
                                                ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground border-foreground/40 shadow-xs'
                                                : 'bg-white dark:bg-zinc-900 text-muted-foreground border-border hover:border-foreground/30'
                                        }`}
                                    >
                                        Carton of {details.units} units
                                    </button>

                                    {/* Pallet Pill */}
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPackMode('pallet')}
                                        className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold border transition-all ${
                                            selectedPackMode === 'pallet'
                                                ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground border-foreground/40 shadow-xs'
                                                : 'bg-white dark:bg-zinc-900 text-muted-foreground border-border hover:border-foreground/30'
                                        }`}
                                    >
                                        Pallet of {details.palletCases} cartons of {details.units} units
                                    </button>
                                </div>
                            </div>

                            {/* Stepper & Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {/* Quantity Stepper */}
                                <div className="flex items-center border border-border rounded-xl bg-white dark:bg-zinc-900 h-12 px-2 shadow-2xs">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground text-lg font-medium transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center font-bold font-mono text-sm">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground text-lg font-medium transition-colors"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart / Order Allocation Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 sm:flex-initial min-w-[200px] h-12 px-8 rounded-xl bg-[#0f52ba] hover:bg-[#0d47a1] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                                >
                                    {orderConfirmed ? (
                                        <>
                                            <Check className="w-4 h-4 text-emerald-300" />
                                            <span>Added to Order</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>Add to cart</span>
                                        </>
                                    )}
                                </button>

                                {/* Wishlist Button */}
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`h-12 px-5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
                                        isWishlisted
                                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-600'
                                            : 'border-border bg-white dark:bg-zinc-900 text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                                    <span>Add to wishlist</span>
                                </button>
                            </div>

                            {/* General Conditions Note */}
                            <div className="mb-6 space-y-2">
                                <div className="text-xs font-bold text-foreground/80">
                                    General conditions
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Subject to availability, lead times and market conditions. Under-Bond (T1) and duty-paid settlement permitted.
                                </p>
                            </div>

                            {/* Request a Quote Button */}
                            <div className="mb-8">
                                <Link
                                    href={`/contact?subject=${encodeURIComponent(`Official Trade Quote Request: ${product.name}`)}`}
                                    className="w-full inline-flex items-center justify-center h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
                                >
                                    Request a quote for this product
                                </Link>
                            </div>

                            {/* Official Specification Sheet Card (DRH Market Format) */}
                            <div className="bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">Brand :</span>
                                    <span className="px-3 py-1 rounded-md bg-[#0f52ba]/10 text-[#0f52ba] dark:text-blue-400 font-bold text-xs tracking-wider uppercase">
                                        {brand.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">Barcode :</span>
                                    <span className="text-xs font-mono font-medium text-foreground">{barcode}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">HS code :</span>
                                    <span className="text-xs font-mono font-medium text-foreground">{hsCode}</span>
                                </div>
                                {product.abv && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">Strength :</span>
                                        <span className="text-xs font-medium text-foreground">{product.abv}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">Packaging :</span>
                                    <span className="text-xs font-medium text-foreground">{details.format}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-muted-foreground min-w-[90px]">Pallet Load :</span>
                                    <span className="text-xs font-medium text-foreground">{details.palletCases} cs / Pallet</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* Image Zoom Modal */}
            <AnimatePresence>
                {isZoomOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    sizes="90vw"
                                />
                            </div>
                            <button
                                onClick={() => setIsZoomOpen(false)}
                                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

