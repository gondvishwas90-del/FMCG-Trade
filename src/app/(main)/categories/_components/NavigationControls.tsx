import { Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

const MotionLink = motion.create(Link);

export interface BreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
}

interface NavigationControlsProps {
    breadcrumbs: BreadcrumbItem[];
    className?: string;
    showHome?: boolean;
    homeHref?: string;
}

export const NavigationControls = ({ 
    breadcrumbs, 
    className = "absolute top-[104px] left-6 md:left-8",
    showHome = true,
    homeHref = "/categories"
}: NavigationControlsProps) => {
    // Using semantic tokens for theme adaptability
    const textColor = 'text-foreground';
    const borderColor = 'border-border';
    const hoverBg = 'hover:bg-accent';
    const separatorColor = 'text-muted-foreground';

    return (
        <div className={`${className} z-50 flex items-center gap-2 pointer-events-none`}>
            {/* Home Button - Enable pointer events */}
            {showHome && (
                <MotionLink
                    href={homeHref}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 rounded-full border ${borderColor} ${textColor} ${hoverBg} backdrop-blur-md transition-colors pointer-events-auto shadow-sm flex items-center justify-center`}
                >
                    <Home size={18} />
                </MotionLink>
            )}

            {/* Breadcrumbs */}
            <AnimatePresence mode="popLayout">
                {breadcrumbs.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 pointer-events-auto"
                    >
                        <ChevronRight size={14} className={separatorColor} />

                        {item.href && !item.isActive ? (
                            <MotionLink
                                href={item.href}
                                whileHover={{ scale: 1.02 }}
                                className={`px-3 py-1.5 rounded-full backdrop-blur-md bg-background/50 border border-border/10 text-sm tracking-wide shadow-sm hover:shadow-md transition-all font-medium opacity-80 hover:opacity-100 hover:bg-background/80 ${textColor}`}
                            >
                                {item.label}
                            </MotionLink>
                        ) : (
                            <div
                                className={`px-3 py-1.5 rounded-full backdrop-blur-md bg-background/50 border border-border/10 text-sm tracking-wide shadow-sm transition-all ${item.isActive ? 'font-bold bg-background/80' : 'font-medium opacity-80'} ${textColor}`}
                            >
                                {item.label}
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
