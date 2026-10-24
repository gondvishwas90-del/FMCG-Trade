import { motion } from 'framer-motion';

interface ContextHeroProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const ContextHero = ({ title, subtitle, className = '' }: ContextHeroProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 pointers-events-none ${className}`}
        >
            {/* Decorative Background Text - standard fade in, no layout transition */}
            <h1
                className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-foreground/5 select-none absolute -top-8 -left-4 pointer-events-none hidden md:block"
            >
                {title}
            </h1>

            <div className="pl-4 pt-8 relative">
                {/* Main Hero Title - Target for Shared Element Transition */}
                <motion.h2
                    layoutId={`title-${title}`}
                    className="text-3xl md:text-6xl font-bold text-foreground uppercase tracking-tight mb-2 origin-left"
                >
                    {title}
                </motion.h2>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-xl font-light"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};
