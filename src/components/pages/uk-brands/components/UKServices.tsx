"use client";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const banners = [
    {
        id: 1,
        title: "UK-Based Inventory",
        description: "Duty-paid and stored in high-security verified warehouses, ready for immediate dispatch across the UK.",
        image: "/uk page/UK-Based Inventory.png",
        color: "from-blue-600/20"
    },
    {
        id: 2,
        title: "Trade Opportunities",
        description: "Targeted stock parcels perfectly sized for specific retail and wholesale requirements.",
        image: "/uk page/trade opportunities.png",
        color: "from-amber-600/20"
    },
    {
        id: 3,
        title: "Multi-Brand Portfolio",
        description: "From house pours to ultra-premium rare releases. A single source for all your spirit needs.",
        image: "/uk page/Multi-Brand Portfolio.png",
        color: "from-purple-600/20"
    },
    {
        id: 4,
        title: "Distribution Network",
        description: "Tailored solutions for bars, restaurants, independent retailers, and large-scale hospitality groups.",
        image: "/uk page/Distribution Network.png",
        color: "from-emerald-600/20"
    }
    
];

export default function UKServices() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Embla for Mobile
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        align: 'start', 
        containScroll: 'trimSnaps',
        dragFree: false 
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    useGSAP(() => {
        if (!containerRef.current || !pinRef.current) return;

        const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);
        const mm = gsap.matchMedia();

        // --- DESKTOP: Cinematic Pinned Stacking ---
        mm.add("(min-width: 1024px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    pin: true,
                    scrub: 1,
                }
            });

            cards.forEach((card, index) => {
                const q = gsap.utils.selector(card);
                const title = q(".banner-title");
                const bgNumber = q(".banner-bg-number");
                const subtitle = q(".banner-subtitle");
                const line = q(".banner-line");
                const description = q(".banner-description");
                const image = q(".banner-image");

                if (index === 0) {
                    gsap.set([bgNumber, subtitle, line, title, description], { y: 0, opacity: 1 });
                    gsap.set(bgNumber, { opacity: 0.05 });
                    gsap.set(image, { scale: 1 });
                    gsap.set(`#dot-${index}`, { backgroundColor: "#ffffff", opacity: 1, scale: 1.5 });
                    return;
                }

                gsap.set(bgNumber, { y: 200, opacity: 0 });
                gsap.set([subtitle, line], { x: -50, opacity: 0 });
                gsap.set(title, { y: 150, opacity: 0 });
                gsap.set(description, { y: 80, opacity: 0 });
                gsap.set(image, { scale: 1.3 });

                tl.fromTo(card, 
                    { yPercent: 100, rotate: 1 },
                    { yPercent: 0, rotate: 0, ease: "power4.inOut", duration: 1.5 },
                    index * 1.5
                );

                tl.to(image, { scale: 1, ease: "power2.out", duration: 1.8 }, index * 1.5);
                tl.to(bgNumber, { y: 0, opacity: 0.05, duration: 1.5, ease: "power3.out" }, index * 1.5 + 0.3);
                tl.to([line, subtitle], { x: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" }, index * 1.5 + 0.5);
                tl.to(title, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, index * 1.5 + 0.6);
                tl.to(description, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, index * 1.5 + 0.9);

                if (index > 0) {
                    const prevQ = gsap.utils.selector(cards[index - 1]);
                    tl.to(cards[index - 1], {
                        rotate: -10,
                        xPercent: -15,
                        scale: 0.8,
                        yPercent: -20,
                        transformOrigin: "top left",
                        ease: "power4.inOut",
                        duration: 1.5,
                    }, index * 1.5);

                    tl.to(prevQ(".banner-bg-number, .banner-subtitle, .banner-line, .banner-title, .banner-description"), {
                        opacity: 0,
                        y: -100,
                        stagger: 0.05,
                        duration: 0.8
                    }, index * 1.5);
                }

                tl.to(`#dot-${index}`, { backgroundColor: "#ffffff", opacity: 1, scale: 1.5, duration: 0.6 }, index * 1.5);
                tl.to(`#dot-${index - 1}`, { backgroundColor: "rgba(255, 255, 255, 0.2)", opacity: 0.5, scale: 1, duration: 0.6 }, index * 1.5);
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef} 
            id="uk-services" 
            className="bg-background text-foreground overflow-hidden"
        >
            {/* Cinematic Header Section */}
            <div className="container mx-auto px-4 md:px-12 pt-32 pb-24 relative">
                {/* Large Watermark Background */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none  flex items-center justify-center" aria-hidden="true">
                    <span className="text-[18vw] font-bold text-foreground/[0.03] dark:text-white/[0.02] tracking-tighter leading-none uppercase">
                        DOMESTIC
                    </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-px bg-primary" />
                            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase font-bold">
                                Our Offering
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground"
                        >
                            Specialized Solutions <br /> 
                            <span className="text-primary italic font-light">for the</span> <br />
                            UK Drinks Industry
                        </motion.h2>
                    </div>

                    <div className="lg:col-span-4 lg:pb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="border-l-2 border-primary/30 pl-8"
                        >
                            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed italic">
                                Elevating domestic trade through verified inventory, 
                                secure warehousing, and a seamless multi-brand distribution network.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* MOBILE VIEW: Horizontal Carousel */}
            <div className="lg:hidden px-4 pb-20">
                <div className="overflow-visible" ref={emblaRef}>
                    <div className="flex gap-4">
                        {banners.map((banner) => (
                            <div key={banner.id} className="flex-[0_0_85%] min-w-0 relative h-[65vh] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl">
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/80" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="mb-4">
                                        <div className="w-12 h-0.5 bg-primary mb-4" />
                                        <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                                            {banner.title}
                                        </h3>
                                        <p className="text-white/70 text-base font-light leading-relaxed">
                                            {banner.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute top-6 right-8 opacity-10">
                                    <span className="text-8xl font-bold text-white leading-none">0{banner.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Mobile Navigation Controls */}
                <div className="mt-8 flex items-center justify-between px-2">
                    <button 
                        onClick={() => emblaApi?.scrollPrev()}
                        className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex justify-center gap-2">
                        {banners.map((_, i) => (
                            <div 
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === i ? 'w-8 bg-primary' : 'w-2 bg-muted/30'}`}
                            />
                        ))}
                    </div>

                    <button 
                        onClick={() => emblaApi?.scrollNext()}
                        className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* DESKTOP VIEW: Pinned Stacking Section */}
            <div ref={pinRef} className="hidden lg:block h-screen w-full relative overflow-hidden bg-zinc-950">
                <div className="relative w-full h-full">
                    {banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                            style={{ zIndex: index + 1 }}
                        >
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                fill
                                className="object-cover banner-image"
                                priority={index < 2}
                            />
                            {/* Premium Gradient Overlays */}
                            <div className={`absolute inset-0 bg-linear-to-b ${banner.color} via-transparent to-transparent opacity-40`} />
                            <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/20 to-transparent" />
                            
                            {/* Large Background Number */}
                            <div className="absolute top-24 right-24 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                                <span className="text-[25rem] font-bold leading-none text-white/5 tracking-tighter banner-bg-number inline-block">
                                    0{banner.id}
                                </span>
                            </div>

                            <div className="absolute inset-0 container mx-auto px-12 flex items-center">
                                <div className="max-w-3xl">
                                    <div className="overflow-hidden mb-6">
                                        <div className="flex items-center gap-4 banner-line">
                                            <div className="w-16 h-0.5 bg-primary" />
                                            <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase font-bold banner-subtitle">
                                                Strategic Focus 0{banner.id}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-7xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.85] banner-title">
                                        {banner.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </h3>
                                    
                                    <div className="max-w-xl">
                                        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12 banner-description">
                                            {banner.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Progress Dots */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                        {banners.map((_, i) => (
                            <div 
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-white/20 transition-all duration-300"
                                id={`dot-${i}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 md:px-12 py-24 bg-background">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-card border border-border backdrop-blur-md relative overflow-hidden group shadow-sm"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="flex items-center gap-4 mb-6 md:mb-0 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-muted-foreground font-medium">Currently holding active parcels in London and Northern hubs.</span>
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            const event = new CustomEvent('open-whatsapp', {
                                detail: { message: "Hi! I'm interested in the current active parcels held in London and Northern hubs." }
                            });
                            window.dispatchEvent(event);
                        }}
                        className="relative z-10 px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-primary/20"
                    >
                        Contact us for current hold
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
