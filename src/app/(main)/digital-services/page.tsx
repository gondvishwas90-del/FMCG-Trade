"use client";
import dynamic from 'next/dynamic';
import DigitalHero from '@/components/pages/digital-services/components/DigitalHero';
import DigitalIntro from '@/components/pages/digital-services/components/DigitalIntro';

const TargetAudience = dynamic(() => import('@/components/pages/digital-services/components/TargetAudience'));
const CoreServices = dynamic(() => import('@/components/pages/digital-services/components/CoreServices'));
const DigitalPackages = dynamic(() => import('@/components/pages/digital-services/components/DigitalPackages'));
const GrowthProcessTimeline = dynamic(() => import('@/components/pages/digital-services/components/GrowthProcessTimeline'));
const TradeConnection = dynamic(() => import('@/components/pages/digital-services/components/TradeConnection'));
const WhyWorkWithUs = dynamic(() => import('@/components/pages/digital-services/components/WhyWorkWithUs'));
const FinalCTA = dynamic(() => import('@/components/pages/digital-services/components/FinalCTA'));
const DigitalEnquiryForm = dynamic(() => import('@/components/pages/digital-services/components/DigitalEnquiryForm'));

export default function DigitalServicesPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-emerald-500 selection:text-white">
            {/* 1. Hero Section */}
            <DigitalHero />

            {/* 2 & 3. Introduction & Why Digital Presence Matters (Combined in DigitalIntro) */}
            <DigitalIntro />

            {/* 4. Who This Is For (Target Audience) */}
            <TargetAudience />

            {/* 5. Core Services Grid */}
            <CoreServices />

            {/* 6. How it Connects with Trade */}
            <TradeConnection />

            {/* 7. How We Work (Growth Framework Timeline) */}
            <GrowthProcessTimeline />

            {/* 8. Why Brands Work With Us */}
            <WhyWorkWithUs />

            {/* 9. Service Packages (Cinematic Showcase) */}
            <DigitalPackages />

            {/* 10. Final CTA */}
            <FinalCTA />

            {/* 11. Enquiry Form */}
            <DigitalEnquiryForm />

            {/* Optional Floating Background Mesh */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse [animation-delay:3s]" />
            </div>
        </main>
    );
}
