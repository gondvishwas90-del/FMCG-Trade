import React from 'react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'UK Domestic Trade | FMCG Exchange',
  description: 'Access exclusive UK domestic FMCG trade opportunities. Discover premium brands, direct distribution deals, and wholesale growth avenues across the UK market.',
  keywords: ['UK FMCG Trade', 'Domestic Wholesale UK', 'FMCG Distribution UK', 'UK B2B Trade', 'British FMCG Brands'],
  alternates: {
    canonical: '/uk-domestic-trade',
  },
  openGraph: {
    title: 'UK Domestic Trade | FMCG Exchange',
    description: 'Access exclusive UK domestic FMCG trade opportunities. Discover premium brands, direct distribution deals, and wholesale growth avenues across the UK market.',
    url: 'https://www.fmcg-exchange.com/uk-domestic-trade',
    type: 'website',
  }
};
import UKTopBanner from '@/components/pages/uk-brands/components/UKTopBanner';
import UKHero from '@/components/pages/uk-brands/components/UKHero';
import UKAdvantage from '@/components/pages/uk-brands/components/UKAdvantage';
import UKServices from '@/components/pages/uk-brands/components/UKServices';
import UKPartners from '@/components/pages/uk-brands/components/UKPartners';
import UKOpportunities from '@/components/pages/uk-brands/components/UKOpportunities';
import UKProcess from '@/components/pages/uk-brands/components/UKProcess';
import UKLogisticsSection from '@/components/pages/uk-brands/components/UKLogisticsSection';
import UKComplianceCard from '@/components/pages/uk-brands/components/UKComplianceCard';
import UKFinalCTA from '@/components/pages/uk-brands/components/UKFinalCTA';
import UKEnquiryForm from '@/components/pages/uk-brands/components/UKEnquiryForm';
import { getUKDomesticTradeOffers } from '@/app/actions/uk-domestic-trade-offers';
import { IUKDomesticTradeOffer } from '@/models/UKDomesticTradeOffer';

export default async function UKDomesticTradePage() {
    // Fetch real data from MongoDB
    const result = await getUKDomesticTradeOffers(true); 
    const offers: IUKDomesticTradeOffer[] = result.success ? (result.data as IUKDomesticTradeOffer[]) : [];

    return (
        <main className="min-h-screen bg-background selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            {/* Top Clean Full-Size Banner */}
            <UKTopBanner />

            {/* 1. Hero Section - UK Domestic Trade */}
            <UKHero />

            {/* 2. The "First Look" Advantage */}
            <UKAdvantage />

            {/* 3. What We Offer in the UK Domestic Market */}
            <UKServices />

            {/* 4. Who We Work With */}
            <UKPartners />

            {/* 5. Sample Trade Opportunities - Now Dynamic */}
            <UKOpportunities offers={offers} />

            {/* 6. How UK Domestic Trade Works (Process) */}
            <UKProcess />

            {/* 7. Logistics & Delivery */}
            <UKLogisticsSection />

            {/* 8. Compliance & Assurance */}
            <UKComplianceCard />

            {/* 9. Final CTA */}
            <UKFinalCTA />

            {/* 10. Enquiry Form */}
            <UKEnquiryForm id="enquiry" />
        </main>
    );
}
