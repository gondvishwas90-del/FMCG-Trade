"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FEATURED_BRAND_LOGOS } from "../data/brand-directory.data";

export default function FeaturedBrandLogos() {
    return (
        <section className="relative w-full max-w-[1800px] mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-12">
            {/* The Logo Matrix Container */}
            <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-sm shadow-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                    {FEATURED_BRAND_LOGOS.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/brands/${brand.id}`}
                            className="block group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative min-h-[120px] sm:min-h-[135px] md:min-h-[145px] rounded-2xl flex flex-col items-center justify-between p-4 md:p-5 bg-white dark:bg-zinc-900/90 hover:bg-white dark:hover:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer"
                            >
                                {/* Logo Image */}
                                <div className="relative w-full h-12 sm:h-14 md:h-16 flex items-center justify-center my-auto">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
                                        className="object-contain p-1 filter drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
                                    />
                                </div>

                                {/* Brand Name Below Logo */}
                                <span className="text-xs sm:text-sm font-bold text-foreground/85 tracking-tight text-center mt-2 line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {brand.name}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
