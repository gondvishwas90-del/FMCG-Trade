'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CategoryTier1 } from './types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const CategoryCursorOverlay = dynamic(() => import('./CategoryCursorOverlay'), { ssr: false });


interface HeroMenuProps {
    items: CategoryTier1[];
    onSelect: (item: CategoryTier1) => void;
    onHover: (item: CategoryTier1 | null) => void;
}

const StickerMenuItem = ({
    item,
    index,
    onSelect,
    setHoveredItem,
    hoveredItem,
    isMobile
}: {
    item: CategoryTier1,
    index: number,
    onSelect: (item: CategoryTier1) => void,
    setHoveredItem: (item: CategoryTier1 | null) => void,
    hoveredItem: CategoryTier1 | null,
    isMobile: boolean
}) => {
    const isHovered = hoveredItem?.id === item.id;
    const isDimmed = !isMobile && hoveredItem && !isHovered;

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Select category: ${item.name}`}
            className={`relative cursor-pointer group z-10 py-2 select-none transition-all duration-700 ease-out flex items-baseline outline-none focus-visible:ring-4 focus-visible:ring-neutral-500 rounded-lg ${isDimmed ? 'opacity-20 blur-[2px] scale-95 origin-left' : 'opacity-100 scale-100 origin-left'
                }`}
            onMouseEnter={() => !isMobile && setHoveredItem(item)}
            onMouseLeave={() => !isMobile && setHoveredItem(null)}
            onFocus={() => !isMobile && setHoveredItem(item)}
            onBlur={() => !isMobile && setHoveredItem(null)}
            onClick={() => onSelect(item)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(item);
                }
            }}
        >
            <span className={`text-xs md:text-sm font-mono mr-4 md:mr-8 transition-colors duration-300 -translate-y-2 md:-translate-y-4 ${isHovered ? 'text-foreground' : 'text-muted-foreground'}`}>
                {`0${index + 1}`}
            </span>

            <div className="flex items-center justify-start flex-nowrap whitespace-nowrap overflow-visible">
                {item.name.split('').map((char, i) => {
                    const delay = isHovered ? (i * 0.02) : ((item.name.length - 1 - i) * 0.01);
                    return (
                        <span
                            key={`${index}-${i}`}
                            className={`inline-block relative text-[clamp(1.5rem,6vw,2.25rem)] sm:text-[clamp(2.25rem,7vw,3.5rem)] md:text-[clamp(3rem,8vw,4.5rem)] lg:text-[clamp(4rem,9vw,6rem)] font-black uppercase tracking-tighter leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isHovered ? 'translate-x-[10px] -translate-y-[10px]' : 'translate-x-0 translate-y-0'}`}
                            style={{ transitionDelay: `${Math.max(0, delay)}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export const HeroMenu = ({ items, onSelect, onHover }: HeroMenuProps) => {
    const [hoveredItem, setHoveredItem] = useState<CategoryTier1 | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleHover = (item: CategoryTier1 | null) => {
        setHoveredItem(item);
        onHover(item);
    };

    return (
        <main className="w-full min-h-[100dvh] flex items-end pb-12 md:pb-24 pt-32 md:pt-40 relative overflow-x-hidden pl-4 md:pl-16 lg:pl-32" aria-label="Categories Menu">

            {/* Context Label - Vertical Sidebar - Justified to End (Bottom) */}
            <div className="absolute left-4 md:left-12 bottom-12 hidden md:flex flex-col items-center gap-8 opacity-40">
                <div className="w-px h-32 bg-foreground/50"></div>
                <p className="text-xs font-mono text-foreground uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
                    Select Category
                </p>
            </div>

            {/* Custom Cursor Follower - Lazy loaded and handles its own mouse events */}
            <CategoryCursorOverlay hoveredItem={hoveredItem} />

            {/* List Menu */}
            <div className="flex flex-col gap-4 md:gap-8 lg:gap-10 relative z-20 w-full max-w-full">
                {items.map((item, index) => (
                    <StickerMenuItem
                        key={item.id}
                        item={item}
                        index={index}
                        onSelect={onSelect}
                        setHoveredItem={handleHover}
                        hoveredItem={hoveredItem}
                        isMobile={isMobile}
                    />
                ))}

                {/* Shop All Option */}
                <Link href="/brands" className="mt-8 md:mt-12 lg:mt-16 group block w-fit pl-1 md:pl-2 relative z-30">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex items-center gap-4 group-hover:gap-8 transition-all duration-500"
                    >
                        <div className="h-px w-8 bg-foreground/40 group-hover:bg-foreground group-hover:w-16 transition-all duration-500" />
                        <span className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground transition-colors flex items-center gap-3">
                            Shop All <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-foreground" />
                        </span>
                    </motion.div>
                </Link>
            </div>
        </main>
    );
};
