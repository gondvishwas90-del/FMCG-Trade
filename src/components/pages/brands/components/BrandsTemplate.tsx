"use client";

import dynamic from 'next/dynamic';
import { motion } from "motion/react";
import BrandGallery from "./BrandGallery";
import type { Brand } from "../types/brand.types";

const TradeApplicationSection = dynamic(() => import('./TradeApplicationSection'));

export default function BrandsTemplate({ brands }: { brands: Brand[] }) {
    return (
        <main className="bg-background min-h-screen">

            {/* New Professional Split Hero */}
            <section className="relative bg-background pt-24 md:pt-32 pb-16 md:pb-24 border-b border-border">
                <div className="max-w-[1800px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">

                    {/* Left Text Block */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-4 md:mb-6"
                        >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                                Official Trade Directory
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[clamp(3rem,8vw,6rem)] md:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-8 leading-[0.9]"
                        >
                            Global Brands. <br />
                            <span className="text-muted-foreground">Commercial Opportunities.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed"
                        >
                            Explore our FMCG brand portfolio for B2B trade & commercial supply.
                        </motion.p>
                    </div>

                    {/* Right Stats Block */}
                    <div className="lg:col-span-4 flex flex-col justify-end">
                        <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-border pt-6 md:pt-8">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">12</div>
                                <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Key Categories</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">08</div>
                                <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-muted-foreground">Origin Markets</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Gallery Section */}
            <BrandGallery brands={brands} />

            {/* Application Section */}
            <TradeApplicationSection />

        </main>
    );
}
