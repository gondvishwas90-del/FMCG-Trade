"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion, m, useScroll, useTransform, useSpring, useInView, MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { packages } from "../data/packages.data";
import type { PackageCard } from "../types/package.types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EnquiryModal } from "./EnquiryModal";

// --- Utility Components ---

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

function GsapSplitText({ text, className, trigger }: { text: string; className?: string; trigger?: boolean }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const words = text.split(" ");

    useGSAP(() => {
        if (!trigger || !containerRef.current) return;

        const letters = containerRef.current.querySelectorAll(".split-char");
        gsap.fromTo(letters,
            { y: "100%", rotate: 10, opacity: 0 },
            {
                y: "0%",
                rotate: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.02,
                ease: "back.out(1.7)",
                overwrite: "auto"
            }
        );
    }, { dependencies: [trigger], scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
                    {word.split("").map((char, j) => (
                        <span key={j} className="split-char inline-block origin-bottom-left">
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}

// ... (VisualSlide component remains unchanged) ...

function ContentBlock({ pkg, index, setActiveCard, onEnquire }: { pkg: PackageCard, index: number, setActiveCard: (i: number) => void, onEnquire: (pkg: PackageCard) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "-50% 0px -50% 0px", once: false });

    useEffect(() => {
        if (isInView) setActiveCard(index);
    }, [isInView, index, setActiveCard]);

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex flex-col justify-center p-8 lg:p-24 relative border-l border-border/10 bg-background/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
        >
            <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-8">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono">
                        0{index + 1}
                    </span>
                    <div className="h-px w-12 bg-emerald-900" />
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest">
                        {pkg.title}
                    </span>
                </div>

                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-8 leading-[0.95] tracking-tight">
                    {pkg.tagline}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-10 whitespace-pre-line">
                    {pkg.bodyText}
                </p>

                <div className="grid grid-cols-1 gap-4 mb-10">
                    {pkg.features?.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover/item:bg-emerald-400 group-hover/item:scale-150 transition-all duration-300" />
                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {pkg.showCTA && (
                    <CTAButton onClick={() => onEnquire(pkg)} aria-label={`Request Trade Quote for ${pkg.title}`}>
                        Request Trade Quote
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </CTAButton>
                )}
            </div>
        </div>
    );
}

// --- Main Component ---

export function CinematicPackageShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState<PackageCard | null>(null);

    const handleEnquire = (pkg: PackageCard) => {
        setSelectedPkg(pkg);
        setIsEnquiryModalOpen(true);
    };

    // Track scroll progress for the parallax effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative bg-background w-full text-foreground transition-colors duration-500">
            <GrainOverlay />

            <div className="relative flex flex-col lg:flex-row">
                {/* Visual Side (Sticky & Full Height) */}
                <div className="lg:w-1/2 w-full h-[50vh] lg:h-screen relative lg:sticky top-0 z-0 overflow-hidden bg-muted/30 border-r border-border/10">
                    {/* Background Images with Transitions */}
                    {packages.map((pkg, index) => (
                        <VisualSlide
                            key={pkg.id}
                            pkg={pkg}
                            index={index}
                            activeCard={activeCard}
                            total={packages.length}
                        />
                    ))}

                    {/* Global Progress Indicator */}
                    <div className="absolute bottom-8 left-8 right-8 z-30 flex items-end justify-between mix-blend-difference invert dark:invert-0">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-widest text-white/60 font-medium">Topic</span>
                            <span className="text-xl font-bold tracking-tight text-white">{packages[activeCard].title}</span>
                        </div>
                        <ProgressRing progress={smoothProgress} />
                    </div>
                </div>

                {/* Content Side (Scrollable) */}
                <div className="w-full lg:w-1/2 relative z-10 bg-background/0">
                    {/* Scrollable Spacer for the Sticky Mechanism */}
                    {packages.map((pkg, index) => (
                        <ContentBlock
                            key={pkg.id}
                            pkg={pkg}
                            index={index}
                            setActiveCard={setActiveCard}
                            onEnquire={handleEnquire}
                        />
                    ))}
                </div>
            </div>

            <EnquiryModal
                isOpen={isEnquiryModalOpen}
                onClose={() => setIsEnquiryModalOpen(false)}
                pkg={selectedPkg}
            />
        </section>
    );
}

// --- Sub-Components ---


function VisualSlide({ pkg, index, activeCard, total }: { pkg: PackageCard, index: number, activeCard: number, total: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    // Determine current state
    const isActive = index === activeCard;
    const isCovered = index < activeCard;
    const isWaiting = index > activeCard;

    // Track previous state to determine animation direction
    const prevState = useRef<"waiting" | "active" | "covered" | "initial">("initial");

    useGSAP(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        const overlay = overlayRef.current;
        const text = textRef.current;

        if (!container || !image || !overlay) return;

        // Kill previous to avoid conflicts
        gsap.killTweensOf([container, image, overlay, text]);

        const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

        // --- ACTIVE STATE ---
        if (isActive) {
            // Case A: Reveal (from Waiting/Initial -> Active)
            if (prevState.current === "waiting" || prevState.current === "initial") {
                // 1. Clip Reveal (Bottom to Top)
                tl.fromTo(container,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, clearProps: "clipPath" }
                );
                // 2. Image Parallax (Down + Scale Out)
                tl.fromTo(image,
                    { scale: 1.3, y: "15%", filter: "blur(0px) brightness(1)" }, // Start clean or slightly tweaked
                    { scale: 1, y: "0%", filter: "blur(0px) brightness(1)", duration: 1.4 },
                    "<"
                );
                // 3. Text Reveal
                if (text) {
                    tl.fromTo(text,
                        { y: 100, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)" },
                        "-=1.0"
                    );
                }
                // 4. Ensure Overlay is gone
                tl.set(overlay, { opacity: 0 }, "<");
            }

            // Case B: Restore (from Covered -> Active) - SCROLLING UP
            else if (prevState.current === "covered") {
                // container is already visible (clipPath: inset(0% ...))
                // We just need to "pop" it back to focus

                tl.to(image, {
                    scale: 1,
                    y: "0%",
                    filter: "blur(0px) brightness(1)",
                    duration: 1.2
                });

                if (text) {
                    tl.to(text, { y: 0, opacity: 1, duration: 1 }, "<");
                }

                tl.to(overlay, { opacity: 0, duration: 1 }, "<");

                // Ensure clip is fully open just in case
                tl.set(container, { clipPath: "inset(0% 0% 0% 0%)" }, "<");
            }
        }

        // --- COVERED STATE (Scroll Down past this card) ---
        else if (isCovered) {
            // Card recedes into background
            // Make sure it is fully visible clip-wise so it acts as BG
            if (prevState.current !== "covered") {
                tl.set(container, { clipPath: "inset(0% 0% 0% 0%)" });

                tl.to(image, {
                    scale: 0.95,
                    filter: "blur(8px) brightness(0.4)",
                    duration: 1.2
                });

                tl.to(overlay, { opacity: 1, duration: 1.2 }, "<");

                if (text) {
                    tl.to(text, { y: -50, opacity: 0, duration: 1 }, "<");
                }
            }
        }

        // --- WAITING STATE (Scroll Up past this card) ---
        else if (isWaiting) {
            // Card slides DOWN (Un-reveal)
            // It was Active, now it goes back to Waiting

            tl.to(container, {
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 1.1,
                ease: "power3.inOut"
            });

            // Image opposite move creates a "wiping" feel
            tl.to(image, {
                scale: 1.3,
                y: "15%",
                duration: 1.1
            }, "<");
        }

        // Update Ref
        prevState.current = isActive ? "active" : isCovered ? "covered" : "waiting";

    }, { dependencies: [isActive, isCovered, isWaiting], scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
            style={{
                zIndex: index,
                // Initial state logic for SSR/First Paint prevents flash
                clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
            }}
        >
            <div className="relative w-full h-full">
                <Image
                    ref={imageRef}
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover will-change-transform"
                    priority={index === 0}
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Darkening Overlay for "Covered" State */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black/60 pointer-events-none opacity-0"
                />

                {/* Cinematic Gradient Overlay (Always Present) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                {/* Overlay Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

               
            </div>
        </div>
    );
}

function CTAButton({ children, href, onClick, 'aria-label': ariaLabel }: { children: React.ReactNode; href?: string; onClick?: () => void; 'aria-label'?: string }) {
    const className = `
        relative group overflow-hidden px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest
        flex items-center justify-center gap-2 transition-all duration-500 min-w-[200px]
        bg-foreground text-background dark:bg-emerald-600 dark:text-white hover:scale-[1.02] active:scale-[0.98]
    `;

    const content = (
        <>
            {/* Background Fill Animation */}
            <span className="absolute inset-0 z-0 bg-emerald-400 dark:bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" aria-hidden="true" />

            <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:scale-[1.02]">
                {children}
            </span>
        </>
    );

    if (onClick) {
        return (
            <button onClick={onClick} className={className} aria-label={ariaLabel}>
                {content}
            </button>
        );
    }

    return (
        <Link href={href || "#"} className={className} aria-label={ariaLabel}>
            {content}
        </Link>
    );
}

function ProgressRing({ progress }: { progress: any }) {
    const circumference = 2 * Math.PI * 18; // r=18
    const strokeDashoffset = useTransform(progress, [0, 1], [circumference, 0]);

    return (
        <div className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
            <svg className="w-full h-full -rotate-90">
                <circle
                    cx="24"
                    cy="24"
                    r="18"
                    className="stroke-foreground/10 fill-none"
                    strokeWidth="2"
                />
                <m.circle
                    cx="24"
                    cy="24"
                    r="18"
                    className="stroke-emerald-500 fill-none"
                    strokeWidth="2"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
            </div>
        </div>
    );
}
