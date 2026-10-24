"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useInView, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DIGITAL_PACKAGES } from "../constants/digital-data";

// --- Utility Components ---

function GrainOverlay() {
    return (
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}

function VisualSlide({ pkg, index, activeCard }: { pkg: any, index: number, activeCard: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const isActive = index === activeCard;
    const isCovered = index < activeCard;
    const isWaiting = index > activeCard;

    const prevState = useRef<string>("initial");

    useGSAP(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        const overlay = overlayRef.current;

        if (!container || !image || !overlay) return;

        gsap.killTweensOf([container, image, overlay]);
        const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

        if (isActive) {
            if (prevState.current === "waiting" || prevState.current === "initial") {
                tl.fromTo(container, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7 });
                tl.fromTo(image, { scale: 1.3, y: "15%" }, { scale: 1, y: "0%", duration: 0.7 }, "<");
            } else if (prevState.current === "covered") {
                tl.to(image, { scale: 1, y: "0%", filter: "blur(0px) brightness(1)", duration: 0.6 });
                tl.to(overlay, { opacity: 0, duration: 0.5 }, "<");
                tl.set(container, { clipPath: "inset(0% 0% 0% 0%)" }, "<");
            }
        } else if (isCovered) {
            if (prevState.current !== "covered") {
                tl.set(container, { clipPath: "inset(0% 0% 0% 0%)" });
                tl.to(image, { scale: 0.95, filter: "blur(8px) brightness(0.4)", duration: 0.6 });
                tl.to(overlay, { opacity: 1, duration: 0.6 }, "<");
            }
        } else if (isWaiting) {
            tl.to(container, { clipPath: "inset(100% 0% 0% 0%)", duration: 0.55 });
            tl.to(image, { scale: 1.3, y: "15%", duration: 0.55 }, "<");
        }

        prevState.current = isActive ? "active" : isCovered ? "covered" : "waiting";
    }, { dependencies: [isActive, isCovered, isWaiting], scope: containerRef });

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: index }}>
            <Image
                ref={imageRef}
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover"
                priority={index === 0}
            />
            <div ref={overlayRef} className="absolute inset-0 bg-black/60 opacity-0 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none mix-blend-overlay opacity-20">
                <span className="text-[clamp(5rem,20vw,15rem)] font-bold tracking-tighter text-foreground blur-sm select-none">0{index + 1}</span>
            </div>
        </div>
    );
}

function ContentBlock({ pkg, index, setActiveCard }: { pkg: any, index: number, setActiveCard: (i: number) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) setActiveCard(index);
    }, [isInView, index, setActiveCard]);

    return (
        <div ref={containerRef} className="min-h-fit flex flex-col justify-center p-6 md:p-12 lg:p-24 border-l border-border/10 bg-background/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
            <div className="max-w-xl space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono">0{index + 1}</span>
                    <div className="h-px w-12 bg-emerald-900" />
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{pkg.title}</span>
                </div>

                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-foreground">{pkg.tagline}</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{pkg.description}</p>
                
                <div className="grid grid-cols-1 gap-4 py-8 border-y border-border/10">
                    {pkg.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-6 pt-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-bold">Best For:</span>
                        <span className="text-sm font-bold text-foreground">{pkg.bestFor}</span>
                    </div>
                    <Link href={pkg.href} className="flex items-center gap-2 text-emerald-500 font-bold hover:translate-x-2 transition-transform group">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function DigitalPackages() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section ref={containerRef} className="relative bg-background w-full">
            <GrainOverlay />
            <div className="relative flex flex-col lg:flex-row">
                {/* Visual Side */}
                <div className="lg:w-1/2 w-full h-[50vh] lg:min-h-[100dvh] sticky top-0 z-0 overflow-hidden bg-muted/30 border-r border-border/10">
                    {DIGITAL_PACKAGES.map((pkg, index) => (
                        <VisualSlide key={pkg.id} pkg={pkg} index={index} activeCard={activeCard} />
                    ))}
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 relative z-10">
                    {DIGITAL_PACKAGES.map((pkg, index) => (
                        <ContentBlock key={pkg.id} pkg={pkg} index={index} setActiveCard={setActiveCard} />
                    ))}
                </div>
            </div>
        </section>
    );
}
