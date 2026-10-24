"use client";
import { useRef, memo } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowDown, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

// --- Variants defined outside to prevent re-creation ---
const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } }
};

const labelVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
};

const titleVariants: Variants = {
    initial: { y: "100%" },
    animate: (i: number) => ({
        y: "0%",
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 + (i * 0.15)
        }
    })
};

const textVariants: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 1 } }
};

const buttonGroupVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }
};

const metricsVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 1.4, duration: 1 } }
};

const scrollBtnVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 1.2 } }
};

// --- Memoized Sub-components ---
const GrainOverlay = memo(function GrainOverlay() {
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
});

const KineticTitle = memo(function KineticTitle({ text, highlight, index }: { text: string; highlight: boolean; index: number }) {
    return (
        <div className="overflow-hidden py-1">
            <motion.h1
                custom={index}
                variants={titleVariants}
                initial="initial"
                animate="animate"
                className="text-[clamp(3rem,10vw,5rem)] md:text-[clamp(5rem,12vw,7.5rem)] font-bold text-foreground leading-[0.9] tracking-tighter"
            >
                <span className={highlight ? "text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500 pr-1 " : ""}>
                    {text}
                </span>
            </motion.h1>
        </div>
    );
});

export default function UKHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yVal = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToContent = () => {
        const nextSection = document.getElementById('uk-advantage');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="uk-hero" ref={containerRef} className="relative min-h-dvh w-full bg-background overflow-hidden flex flex-col justify-center px-4 md:px-12 pt-20">
            <GrainOverlay />

            {/* Background Ambience - Not animating with React, keep as is */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse animation-duration-[10s]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <motion.div
                style={{ y: yVal, opacity: opacityVal }}
                initial="initial"
                animate="animate"
                variants={containerVariants}
                className="relative z-10 max-w-[1800px] mx-auto w-full flex flex-col h-full justify-center"
            >
                {/* Overhead Label */}
                <motion.div
                    variants={labelVariants}
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 md:mb-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-indigo-500" />
                        <span className="text-indigo-600 font-mono text-sm tracking-widest uppercase font-semibold">
                            UK Domestic Trade
                        </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/5 border border-indigo-500/20 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                            AWRS Registered | Fully Compliant UK Supplier
                        </span>
                    </div>
                </motion.div>

                {/* Main Kinetic Typography */}
                <div className="flex flex-col">
                    <KineticTitle text="Under-the-Radar" highlight={false} index={0} />
                    <KineticTitle text="Pipeline" highlight={true} index={1} />
                </div>

                {/* Bottom Lockup */}
                <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0 border-t border-border/50 pt-10">
                    <div className="space-y-6 max-w-xl">
                        <motion.p
                            variants={textVariants}
                            className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed"
                        >
                            Connecting UK retailers and wholesalers with exclusive, pre-market access to premium spirits and duty-paid inventory before it hits the open market.
                        </motion.p>

                        <motion.div
                            variants={buttonGroupVariants}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const event = new CustomEvent('open-whatsapp', {
                                        detail: { message: "Hi! I would like to get first access to your UK domestic trade pipeline." }
                                    });
                                    window.dispatchEvent(event);
                                }}
                                className="group px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-indigo-500 hover:scale-105 shadow-[0_0_30px_rgba(79,70,229,0.3)]"
                            >
                                First Look Access
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link
                                href="#enquiry"
                                className="group px-8 py-4 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-foreground font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:bg-indigo-500/10 hover:border-indigo-500"
                            >
                                Private Price List
                            </Link>
                        </motion.div>
                    </div>

                    <div className="flex gap-12 items-center">
                        {/* Summary Metrics */}
                        <motion.div
                            variants={metricsVariants}
                            className="hidden lg:flex gap-10"
                        >
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-2xl font-bold flex items-center justify-end gap-2">
                                    <ShieldCheck className="w-4 h-4 text-indigo-500" /> AWRS
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none">Compliant</span>
                            </div>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-2xl font-bold flex items-center justify-end gap-2">
                                    <Globe className="w-4 h-4 text-indigo-500" /> UK Wide
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-none">Logistics</span>
                            </div>
                        </motion.div>

                        <motion.button
                            variants={scrollBtnVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToContent}
                            className="group relative hidden md:flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-border bg-card transition-all duration-500 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)]"
                        >
                            <motion.div
                                animate={{
                                    y: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-foreground group-hover:text-indigo-500 transition-colors duration-300 flex flex-col items-center"
                            >
                                <ArrowDown className="w-8 h-8 md:w-10 md:h-10" />
                            </motion.div>
                        </motion.button>

                        {/* Mobile Scroll Button */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            onClick={scrollToContent}
                            className="md:hidden flex items-center gap-2 text-indigo-500 font-mono text-sm uppercase tracking-wider font-bold"
                        >
                            <ArrowDown className="w-4 h-4 animate-bounce" />
                            Advantage
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
