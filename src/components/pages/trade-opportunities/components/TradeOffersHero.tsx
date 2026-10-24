import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function TradeOffersHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToOffers = () => {
        const filters = document.getElementById('offer-filters');
        if (filters) {
            filters.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] w-full bg-background overflow-hidden flex flex-col justify-center px-4 md:px-12 pt-20">

            {/* Background Ambience - Light Mode */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] bg-teal-600/10 rounded-full blur-[60px] md:blur-[100px]" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-[1800px] mx-auto w-full flex flex-col h-full justify-center"
            >
                {/* Overhead Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-3 md:gap-4 mb-6 md:mb-12"
                >
                    <div className="h-px w-8 md:w-12 bg-emerald-500" />
                    <span className="text-emerald-600 font-mono text-xs md:text-sm tracking-widest uppercase font-semibold">
                        Global Trading Desk
                    </span>
                </motion.div>

                {/* Main Kinetic Typography */}
                <div className="flex flex-col">
                    {["Live Trade", "Opportunities"].map((text, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.4 + (i * 0.15)
                                }}
                                className="text-[13vw] md:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter"
                            >
                                <span className={i === 1 ? "text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500" : ""}>
                                    {text}
                                </span>
                            </motion.h1>
                        </div>
                    ))}
                </div>

                {/* Bottom Lockup */}
                <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0 border-t border-border pt-8">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-muted-foreground text-base md:text-xl max-w-md leading-relaxed"
                    >
                        Curated opportunities reflecting current market activity, supplier availability, and trade mandates.
                        Verified and ready for discussion.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToOffers}
                        className="group relative hidden md:flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-border bg-card transition-all duration-500 hover:border-emerald-500 hover:shadow-lg"
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
                            className="text-foreground group-hover:text-emerald-600 transition-colors duration-300"
                        >
                            <ArrowDown className="w-8 h-8 md:w-10 md:h-10" />
                        </motion.div>
                    </motion.button>
                    {/* Mobile Scroll Button (Simplified) */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        onClick={scrollToOffers}
                        className="md:hidden flex items-center gap-2 text-emerald-600 font-mono text-sm uppercase tracking-wider font-bold"
                    >
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                        Scroll to Offers
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}

