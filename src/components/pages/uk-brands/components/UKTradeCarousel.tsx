"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UKTradeCard } from './UKTradeCard';
import { IUKDomesticTradeOffer } from '@/models/UKDomesticTradeOffer';

interface UKTradeCarouselProps {
    offers: IUKDomesticTradeOffer[];
}

export function UKTradeCarousel({ offers }: UKTradeCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    const onInit = useCallback(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onInit();
        onSelect();
        emblaApi.on('init', onInit);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onInit);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <div className="relative">
            <div className="relative flex flex-col lg:flex-row rounded-[4rem] border border-border/50 bg-card/20 backdrop-blur-md overflow-hidden">
                {/* Carousel Viewport Area */}
                <div className="flex-1 overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8 py-16 px-8 md:px-16">
                        {offers.map((offer, idx) => (
                            <div
                                key={offer._id?.toString() || idx}
                                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_45%] xl:flex-[0_0_35%] min-w-0"
                            >
                                <UKTradeCard offer={offer} index={idx} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Vertical Sidebar Navigation */}
                <div className="w-full lg:w-32 border-t lg:border-t-0 lg:border-l border-border/50 bg-background/40 backdrop-blur-xl flex lg:flex-col items-center justify-between p-8 lg:py-16">
                    {/* Top Section: Editorial Label */}
                    <div className="hidden lg:block">
                        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground/30 select-none">
                            Market Snapshots
                        </span>
                    </div>

                    {/* Middle Section: Stacked Controls */}
                    <div className="flex lg:flex-col items-center gap-6">
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className="w-14 h-14 rounded-2xl border border-primary/20 flex items-center justify-center bg-primary/5 text-primary disabled:opacity-10 transition-all hover:bg-primary hover:text-white hover:scale-110 shadow-lg shadow-primary/5 group/btn"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="h-px w-8 lg:w-px lg:h-12 bg-border/50" />

                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className="w-14 h-14 rounded-2xl border border-primary/20 flex items-center justify-center bg-primary/5 text-primary disabled:opacity-10 transition-all hover:bg-primary hover:text-white hover:scale-110 shadow-lg shadow-primary/5 group/btn"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Bottom Section: Progress Info */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="hidden lg:flex flex-col gap-2">
                            {scrollSnaps.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => emblaApi?.scrollTo(idx)}
                                    className={`
                                        w-1 rounded-full transition-all duration-500
                                        ${selectedIndex === idx 
                                            ? 'bg-primary h-8' 
                                            : 'bg-muted h-2 hover:bg-muted-foreground/40'}
                                    `}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

