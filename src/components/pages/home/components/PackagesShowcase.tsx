"use client"
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "motion/react";
import { Check, ArrowRight, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { PackageCard } from '../types/package.types';
import { packages } from '../data/packages.data';

export function PackagesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Progress Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Map scroll position to active index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) return;
        const index = Math.min(Math.floor(latest * packages.length), packages.length - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    // Helper for clicking to scroll
    const scrollToIndex = (index: number) => {
        if (isMobile) return;
        if (!containerRef.current) return;
        const totalHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollableDistance = totalHeight - viewportHeight;
        const segmentSize = scrollableDistance / packages.length;
        // Target the center of the segment
        const targetScroll = containerRef.current.offsetTop + (segmentSize * index) + (segmentSize * 0.1);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div ref={containerRef} className="relative bg-background h-auto py-12 lg:h-[300vh] lg:py-0">
                <div className="w-full lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
                    <div className="container mx-auto px-4 max-w-[1800px] h-full flex flex-col justify-center">
                        {/* Header */}
                        <div className="mb-4 lg:mb-12 px-2 shrink-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
                            >
                                What <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">We Do.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium tracking-wide max-w-xl"
                            >
                                Your global partner in premium spirits distribution and logistics.
                            </motion.p>
                        </div>

                        {/* Accordion Container */}
                        <div className="flex gap-4 w-full shrink-0 flex-col h-auto lg:flex-row lg:h-[750px]">
                            {packages.map((pkg, index) => (
                                <PackageCardComponent
                                    key={pkg.id}
                                    data={pkg}
                                    isActive={isMobile ? true : index === activeIndex}
                                    isMobile={isMobile}
                                    onClick={() => scrollToIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );



}

function MagneticWrapper({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
}

function PackageCardComponent({ data, isActive, isMobile, onClick }: { data: PackageCard, isActive: boolean, isMobile: boolean, onClick: () => void }) {
    const [hasScrolled, setHasScrolled] = useState(false);

    return (


        <motion.div
            layoutId={`card-${data.id}`}
            layout
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Select package ${data.title}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            initial={false}
            animate={{
                flex: isMobile ? "0 0 auto" : (isActive ? 3 : 1),
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`
                relative h-auto w-full lg:h-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden cursor-pointer
                border transition-all duration-500 ease-out group
                ${isActive ? "bg-card border-border shadow-2xl ring-1 ring-emerald-500/20" : "bg-muted/50 border-transparent hover:bg-muted"}
            `}
        >
            <div className="relative w-full flex flex-col lg:absolute lg:inset-0 lg:flex-row lg:h-full lg:w-full">

                {/* Image Section */}
                <motion.div
                    layoutId={`image-${data.id}`}
                    layout
                    className="relative overflow-hidden shrink-0"
                    animate={{
                        width: isMobile ? "100%" : (isActive ? "45%" : "100%"),
                        height: isMobile ? "250px" : "100%"
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        animate={{ scale: isActive ? 1.05 : 1.1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Collapsed Title (Only visible when NOT active) */}
                    {!isActive && (
                        <div className="absolute inset-0 hidden lg:flex items-end p-6 lg:p-8">
                            <div className="w-full">
                                <span className={`inline-block w-2 h-2 mb-3 lg:mb-4 rounded-full ${data.color}`} />
                                <h3 className="text-white font-bold text-2xl lg:text-3xl tracking-tight [text-orientation:mixed] [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb] rotate-180 lg:rotate-0 origin-center">
                                    {data.title}
                                </h3>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Content Section (Only visible when Active) */}
                <div className="flex-1 relative flex flex-col h-full bg-card min-h-0">
                    <motion.div
                        className="h-full flex flex-col p-6 lg:p-10 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div
                            className="flex-1 overflow-visible lg:overflow-y-auto lg:overflow-visible lg:no-scrollbar"
                            onScroll={(e) => setHasScrolled(e.currentTarget.scrollTop > 10)}
                        >
                            {/* Badge */}
                            <motion.div
                                layoutId={`badge-${data.id}`}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex items-center gap-2 mb-4 lg:mb-6 pr-8"
                            >
                                <span className={`w-2 h-2 rounded-full ${data.color}`} />
                                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Section 0{data.id}</span>
                            </motion.div>

                            <motion.h3
                                layoutId={`title-${data.id}`}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-2 pr-4"
                            >
                                {data.title}
                            </motion.h3>

                            <motion.p
                                layoutId={`tagline-${data.id}`}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-lg md:text-xl text-muted-foreground/90 font-medium mb-6 lg:mb-8"
                            >
                                {data.tagline}
                            </motion.p>

                            {data.price && (
                                <motion.div
                                    layoutId={`price-${data.id}`}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-baseline gap-2 lg:gap-3 mb-6 lg:mb-8"
                                >
                                    <span className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground">{data.price}</span>
                                    <span className="text-[10px] md:text-xs lg:text-sm text-muted-foreground/90 font-bold uppercase tracking-wide opacity-100">{data.priceSubtitle}</span>
                                </motion.div>
                            )}

                            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mb-6 lg:mb-8 line-clamp-6">
                                {data.bodyText}
                            </p>

                            <div className="space-y-2 lg:space-y-3">
                                {data.features?.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="text-xs md:text-sm font-medium text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 lg:mt-8 pt-4 lg:pt-8 border-t border-border flex items-center justify-between gap-4">
                            {data.storage ? (
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">
                                        <Battery className="w-3 h-3" />
                                        Storage
                                    </div>
                                    <span className="text-base md:text-lg lg:text-xl font-bold text-foreground">{data.storage}</span>
                                </div>
                            ) : <div />}

                            <MagneticWrapper>
                                <Button variant="solar" size="default" className="shrink-0 px-8! lg:h-14 lg:px-10 lg:text-lg">
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </MagneticWrapper>
                        </div>


                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
