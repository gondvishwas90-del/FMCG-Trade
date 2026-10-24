"use client";
import { useRef, memo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
};

const textFadeVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
        }
    }
};

// --- Memoized Grain Overlay ---
const GrainOverlay = memo(function GrainOverlay() {
    return (
        <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] mix-blend-overlay">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
});

interface UKTopBannerProps {
    title?: string;
    description?: string;
    image?: string;
    mobileImage?: string;
}

const DEFAULT_BANNER = {
    title: "Source Global Products For The UK Market",
    description: "Helping UK wholesalers, distributors, retailers and hospitality businesses import with confidence.",
    image: "https://apim.fmcg-exchange.com/fmcg-media/hero-banners/blob",
    mobileImage: "",
};

export default function UKTopBanner({
    title = DEFAULT_BANNER.title,
    description = DEFAULT_BANNER.description,
    image = DEFAULT_BANNER.image,
    mobileImage = DEFAULT_BANNER.mobileImage,
}: UKTopBannerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yVal = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] bg-neutral-950 overflow-hidden flex flex-col justify-end pb-16 md:pb-24 pt-32 md:pt-40"
        >
            <GrainOverlay />

            {/* Full-Size Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                {mobileImage ? (
                    <>
                        <Image
                            src={image}
                            alt={`${title} desktop banner`}
                            fill
                            priority
                            className="hidden md:block object-cover object-center"
                            sizes="100vw"
                        />
                        <Image
                            src={mobileImage}
                            alt={`${title} mobile banner`}
                            fill
                            priority
                            className="block md:hidden object-cover object-center"
                            sizes="100vw"
                        />
                    </>
                ) : (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                )}
            </div>

            {/* Multi-layer Cinematic Gradient Overlays */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.92) 100%)'
                }}
            />

            {/* Ambient Center Glow */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle at 50% 65%, rgba(99,102,241,0.25) 0%, transparent 70%)'
                }}
            />

            {/* Centered Content */}
            <motion.div
                style={{ y: yVal, opacity: opacityVal }}
                initial="initial"
                animate="animate"
                variants={containerVariants}
                className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center"
            >
                <motion.div variants={textFadeVariants} className="flex flex-col items-center">
                    {/* Title */}
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-[1.08] text-balance drop-shadow-xl"
                        style={{
                            textShadow: '0 4px 30px rgba(0,0,0,0.85)'
                        }}
                    >
                        {title}
                    </h1>

                    {/* Description */}
                    {description && (
                        <p className="text-neutral-200 font-medium text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mt-4 md:mt-6 text-balance drop-shadow-lg leading-relaxed">
                            {description}
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
}
