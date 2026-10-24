"use client";
import React, { useRef } from 'react';

import { ArrowRight, Activity } from 'lucide-react';
import { IUKDomesticTradeOffer } from '@/models/UKDomesticTradeOffer';
import { UKTradeCarousel } from './UKTradeCarousel';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UKOpportunitiesProps {
    offers: IUKDomesticTradeOffer[];
}

export default function UKOpportunities({ offers }: UKOpportunitiesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleRequestLiveList = () => {
        const element = document.getElementById('enquiry');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        if (!containerRef.current) return;

        const q = gsap.utils.selector(containerRef.current);
        const mm = gsap.matchMedia();

        // --- DESKTOP: Cinematic Staggered Reveal ---
        mm.add("(min-width: 1024px)", () => {
            gsap.fromTo([q(".header-line"), q(".header-tag"), q(".header-title"), q(".header-desc"), q(".carousel-container")], 
                { 
                    y: 40, 
                    opacity: 0 
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        });

        // --- MOBILE: Direct Final State ---
        mm.add("(max-width: 1023px)", () => {
            gsap.set([q(".header-line"), q(".header-tag"), q(".header-title"), q(".header-desc"), q(".carousel-container")], {
                y: 0,
                opacity: 1
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            id="uk-opportunities" 
            className="py-24 md:py-40 bg-background text-foreground relative overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 mb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none flex items-center justify-center -translate-y-1/2" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        SNAPSHOTS
                    </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-px bg-primary header-line" />
                            <div className="flex items-center gap-3 header-tag">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </div>
                                <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase font-bold">
                                    Market Pulse
                                </span>
                            </div>
                        </div>
                        
                        <h2
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] header-title"
                        >
                            Live Parcel <br /> 
                            <span className="text-primary italic font-light">Snapshots</span>
                        </h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-4">
                        <div className="border-l-2 border-primary/30 pl-8 header-desc">
                            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed italic mb-8">
                                Real-time duty-paid opportunities currently available in our UK domestic pipeline for immediate dispatch.
                            </p>
                            <button 
                                onClick={handleRequestLiveList}
                                className="flex items-center gap-4 text-primary font-bold uppercase tracking-[0.2em] text-xs group w-fit hover:tracking-[0.3em] transition-all duration-300"
                            >
                                Request Live List <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 relative z-10 carousel-container">
                {/* Dynamic Carousel Component */}
                <div className="relative">
                    {offers.length > 0 ? (
                        <UKTradeCarousel offers={offers} />
                    ) : (
                        <div className="py-32 text-center border-2 border-dashed border-border rounded-[3rem] bg-card/50 backdrop-blur-sm">
                            <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" />
                            <p className="text-muted-foreground font-medium text-xl">No live opportunities available at this moment.</p>
                            <p className="text-muted-foreground/60 mt-2">Please check back soon for our next batch of verified inventory.</p>
                        </div>
                    )}
                </div>
                
                <div className="mt-24 text-center">
                    <p className="text-muted-foreground/40 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold max-w-2xl mx-auto leading-relaxed">
                        * All inventory shown is subject to availability and prior sale. Prices and volumes may fluctuate based on market demand. Verified duty-paid status confirmed upon enquiry.
                    </p>
                </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2 translate-y-1/2" />
        </section>
    );
}

