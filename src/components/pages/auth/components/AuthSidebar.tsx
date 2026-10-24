import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

interface AuthSidebarProps {
    title?: string;
    description?: string;
    features?: string[];
    backgroundImage?: string;
}

const quotes = [
    {
        text: "Commerce is not just a transaction. It's the art of global connection.",
        author: "FMCG Exchange Vision"
    },
    {
        text: "Redefining the boundaries of trade with precision and elegance.",
        author: "Global Markets"
    },
    {
        text: "Access the pulse of the world's most exclusive networks.",
        author: "Trade Ecosystem"
    }
];

export function AuthSidebar() {
    const [currentQuote, setCurrentQuote] = useState(0);

    // Rotate quotes every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hidden lg:flex lg:col-span-2 relative overflow-hidden bg-slate-50 dark:bg-black h-full min-h-[600px] flex-col justify-between transition-colors duration-500">
            
            {/* --- IMMERSIVE GRADIENT BACKGROUND --- */}
            <div className="absolute inset-0 z-0 bg-linear-to-br from-emerald-50 via-slate-50 to-teal-50 dark:from-emerald-950 dark:via-black dark:to-teal-950 transition-colors duration-500">
                {/* Animated / Ambient Orbs */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]" />
                <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-teal-300/20 dark:bg-teal-800/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
                
                {/* Film Grain Texture for texture retention */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />
            </div>

            {/* --- TOP BRANDING --- */}
            <div className="relative z-10 p-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-3"
                >
                    <div className="h-8 w-1 bg-emerald-600/80 dark:bg-white/80 rounded-full transition-colors" />
                    <span className="text-emerald-950 dark:text-white font-mono text-sm tracking-[0.3em] uppercase opacity-90 transition-colors">
                        FMCG Exchange Trade Portal
                    </span>
                </motion.div>
            </div>

            {/* --- EDITORIAL CARD --- */}
            <div className="relative z-10 p-12">
                <div className="relative backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 p-8 md:p-10 rounded-[2rem] overflow-hidden shadow-2xl transition-colors duration-500">
                    
                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/40 to-transparent dark:from-white/5 pointer-events-none" />

                    <Quote className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-6 opacity-80" />

                    <div className="h-32 mb-4 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuote}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0"
                            >
                                <p className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white leading-relaxed tracking-wide italic antialiased transition-colors">
                                    "{quotes[currentQuote].text}"
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between mt-6 border-t border-slate-200 dark:border-white/10 pt-6 transition-colors">
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={currentQuote}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-emerald-700 dark:text-emerald-400 font-mono text-xs uppercase tracking-widest transition-colors"
                            >
                                — {quotes[currentQuote].author}
                            </motion.span>
                        </AnimatePresence>
                        
                        {/* Progress Indicators */}
                        <div className="flex gap-2">
                             {quotes.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-500 ${idx === currentQuote ? "w-8 bg-slate-900 dark:bg-white" : "w-2 bg-slate-400/50 dark:bg-white/20"}`}
                                />
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
