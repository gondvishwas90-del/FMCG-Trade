'use client';

import { motion } from 'framer-motion';
import BrandGallery from '@/components/pages/brands/components/BrandGallery';
import TradeApplicationSection from '@/components/pages/brands/components/TradeApplicationSection';
import { BrandOwnerTicker } from '@/components/shared/BrandOwnerTicker';
import { CategoryTier1 } from './types';
import { Brand } from '@/components/pages/brands/types/brand.types';

export default function Tier1Client({ tier1, brands = [], brandOwners = [] }: { tier1: CategoryTier1; brands?: Brand[]; brandOwners?: any[] }) {
    return (
        <main className="w-full min-h-screen relative flex flex-col z-10 bg-background">
            {/* Redesigned Hero Section */}
            <section className="relative w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950/20 pt-28 pb-4 md:pt-36 md:pb-6 border-b border-zinc-200/60 dark:border-zinc-800/40 flex flex-col justify-between">

                {/* Giant watermark background text */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden flex items-end z-0">
                    <span className="text-[12vw] font-black text-zinc-950/[0.03] dark:text-white/[0.015] tracking-[0.1em] uppercase leading-none select-none whitespace-nowrap translate-y-[20%] translate-x-[-1%]">
                        {tier1.name}
                    </span>
                </div>

                {/* Faded background image on the right */}
                {tier1.image && (
                    <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] pointer-events-none z-10 select-none">
                        <img
                            src={tier1.image}
                            alt={tier1.name}
                            className="w-full h-full object-cover object-center opacity-[0.15] md:opacity-[0.85] mix-blend-multiply dark:mix-blend-luminosity dark:opacity-20"
                            loading="eager"
                        />
                        {/* Gradient overlay to fade to the left, top, bottom */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-zinc-950" />
                    </div>
                )}

                {/* Main Hero Container */}
                <div className="relative max-w-[1800px] mx-auto px-4 md:px-12 z-20 w-full flex flex-col justify-between gap-8 md:gap-14">
                    {/* Title and Subtitle */}
                    <div className="flex flex-col gap-2 max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase leading-none"
                        >
                            {tier1.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-xl leading-relaxed mt-2"
                        >
                            {tier1.descriptor || `Access a verified network of ${tier1.name.toLowerCase()} brands optimized for export, private label, and market entry.`}
                        </motion.p>
                    </div>

                    {/* Integrated Brand Owners Logo Marquee Ticker - Sticking to Bottom */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full mt-auto pt-4 md:pt-6"
                    >
                        <BrandOwnerTicker brandOwners={brandOwners} brands={brands} category={tier1.name} />
                    </motion.div>
                </div>
            </section>

            {/* Brand Filter & Gallery Section */}
            <BrandGallery brands={brands} />

            {/* Application Section */}
            <TradeApplicationSection brandName={tier1.name} />
        </main>
    );
}
