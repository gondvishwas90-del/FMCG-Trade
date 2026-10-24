"use client";

import { useState } from 'react';
import { TradeOffersHero } from './TradeOffersHero';
import { OffersFilter } from './OffersFilter';
import { OffersList } from './OffersList';
import { TradeRequirementSection } from './TradeRequirementSection';
import { HowItWorksSection } from './HowItWorksSection';
import { StayInformedSection } from './StayInformedSection';
import { PAGE_SIZE } from '../constants/config';
import type { OfferType } from '../types/trade-offer.types';
import { ITradeOffer } from '@/models/TradeOffer';

interface TradeOffersPageProps {
    initialOffers: ITradeOffer[];
}

export function TradeOffersPage({ initialOffers }: TradeOffersPageProps) {
    const [selectedType, setSelectedType] = useState<OfferType>('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Filter offers based on selected type
    const filteredOffers: ITradeOffer[] = initialOffers.filter(o =>
        selectedType === 'all' || o.types?.includes(selectedType)
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredOffers.length / PAGE_SIZE);
    const currentOffers = filteredOffers.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    // Reset page when it exceeds total pages
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }

    return (
        <div className="bg-background min-h-screen text-foreground font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100">
            {/* Hero Section */}
            <TradeOffersHero />

            {/* Filter Bar */}
            <OffersFilter
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                onPageReset={() => setCurrentPage(1)}
            />

            {/* Offers List */}
            <OffersList
                offers={currentOffers}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                selectedType={selectedType}
                onResetFilter={() => setSelectedType('all')}
            />

            {/* Additional Sections */}
            <TradeRequirementSection />
            <HowItWorksSection />
            {/* <StayInformedSection /> */}
        </div>
    );
}
