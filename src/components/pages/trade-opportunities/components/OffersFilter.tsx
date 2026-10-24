"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter } from 'lucide-react';
import { offerTypes } from '../data/offer-types.data';
import type { OfferType } from '../types/trade-offer.types';

interface OffersFilterProps {
    selectedType: OfferType;
    onTypeChange: (type: OfferType) => void;
    onPageReset: () => void;
}

export function OffersFilter({ selectedType, onTypeChange, onPageReset }: OffersFilterProps) {
    const [isFilterHovered, setIsFilterHovered] = useState(false);

    const handleTypeChange = (type: OfferType) => {
        onTypeChange(type);
        onPageReset(); // Reset to page 1 when filter changes
    };

    return (
        <div id="offer-filters" className="sticky top-0 md:top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 py-4">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                <div className="relative">
                    {/* Scroll Fade Indicators - Mobile Only */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

                    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0 scroll-smooth snap-x py-2">
                        <div
                            className="relative items-center justify-center mr-2 hidden md:flex"
                            onMouseEnter={() => setIsFilterHovered(true)}
                            onMouseLeave={() => setIsFilterHovered(false)}
                        >
                            <AnimatePresence>
                                {isFilterHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 10, scale: 0.8 }}
                                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-md border border-border/50 z-50"
                                    >
                                        Filter Opportunities
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
                        </div>
                        {offerTypes.map((type) => {
                            const isActive = selectedType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    onClick={() => handleTypeChange(type.id)}
                                    className={`
                                        relative snap-start px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 shrink-0 whitespace-nowrap z-0
                                        ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-foreground rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{type.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
