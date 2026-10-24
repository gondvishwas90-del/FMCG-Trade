"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { InteractiveOpportunityList } from './InteractiveOpportunityList';
import { PaginationControls } from './PaginationControls';
import { ITradeOffer } from '@/models/TradeOffer';
import type { OfferType } from '../types/trade-offer.types';

interface OffersListProps {
    offers: ITradeOffer[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    selectedType: OfferType;
    onResetFilter: () => void;
}

export function OffersList({ offers, currentPage, totalPages, onPageChange, selectedType, onResetFilter }: OffersListProps) {
    const listRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);

    return (
        <section ref={listRef} className="py-12 px-6 min-h-[60vh]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="w-full"
                >
                    <InteractiveOpportunityList offers={offers} />
                </motion.div>

                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />

                {offers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 mt-12 border border-dashed border-border rounded-lg"
                    >
                        <p className="text-muted-foreground text-lg">No visible opportunities matching criteria.</p>
                        <button
                            onClick={onResetFilter}
                            className="mt-4 text-emerald-600 font-mono text-sm uppercase tracking-wide hover:underline"
                        >
                            [ RESET FILTERS ]
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
