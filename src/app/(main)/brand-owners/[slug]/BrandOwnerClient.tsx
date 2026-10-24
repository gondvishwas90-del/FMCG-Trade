'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BrandGallery from '@/components/pages/brands/components/BrandGallery';
import TradeApplicationSection from '@/components/pages/brands/components/TradeApplicationSection';
import { NavigationControls } from '../../categories/_components/NavigationControls';
import { Brand } from '@/components/pages/brands/types/brand.types';
import { IBrandOwner } from '@/models/BrandOwner';

interface BrandOwnerClientProps {
    brandOwner: IBrandOwner;
    brands?: Brand[];
}

export default function BrandOwnerClient({
    brandOwner,
    brands = []
}: BrandOwnerClientProps) {
    // Select the best hero image: flagship brand background/image, or brand owner logo
    const heroImage =
        brands.find((b) => b.backgroundImage)?.backgroundImage ||
        brands.find((b) => b.image)?.image ||
        brandOwner.logo;

    // Subtitle descriptor matching the concise style of Category pages
    const descriptorText =
        brands.length > 0
            ? brands.map((b) => b.name).join(', ')
            : (brandOwner.description ||
               `Access verified portfolio brands from ${brandOwner.name} optimized for export, private label, and market entry.`);

    return (
        <main className="w-full min-h-screen relative flex flex-col z-10 bg-background">
            {/* Top-Left Floating Breadcrumbs */}
            <NavigationControls
                homeHref="/brand-owners"
                breadcrumbs={[{ label: brandOwner.name, isActive: true }]}
            />

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950/20 pt-32 pb-16 md:pt-44 md:pb-28 border-b border-zinc-200/60 dark:border-zinc-800/40 flex flex-col justify-center min-h-[380px] md:min-h-[480px]">
                
                {/* Giant watermark background text */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden flex items-end z-0">
                    <span className="text-[12vw] font-black text-zinc-950/[0.03] dark:text-white/[0.015] tracking-[0.1em] uppercase leading-none select-none whitespace-nowrap translate-y-[20%] translate-x-[-1%]">
                        {brandOwner.name}
                    </span>
                </div>

                {/* Faded background image on the right */}
                {heroImage && (
                    <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] pointer-events-none z-10 select-none">
                        <img
                            src={heroImage}
                            alt={brandOwner.name}
                            className="w-full h-full object-cover object-center opacity-[0.15] md:opacity-[0.85] mix-blend-multiply dark:mix-blend-luminosity dark:opacity-20"
                            loading="eager"
                        />
                        {/* Gradient overlay to fade to the left, top, bottom */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-zinc-950" />
                    </div>
                )}

                {/* Main Hero Container */}
                <div className="relative max-w-[1800px] mx-auto px-4 md:px-12 z-20 w-full flex flex-col justify-center gap-6">
                    
                    {/* Title and Subtitle */}
                    <div className="flex flex-col gap-3 max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase leading-none"
                        >
                            {brandOwner.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-xl leading-relaxed mt-1"
                        >
                            {descriptorText}
                        </motion.p>
                    </div>

                </div>
            </section>

            {/* Brand Filter & Gallery Section */}
            <BrandGallery brands={brands} />

            {/* Application Section */}
            <TradeApplicationSection brandName={brandOwner.name} />
        </main>
    );
}
