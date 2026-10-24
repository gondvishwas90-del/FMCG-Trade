'use client';

import { motion } from 'framer-motion';
import { ContextHero } from './ContextHero';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface SubItem extends Record<string, any> {
    id: string;
    name: string;
    image: string;
    mobileImage?: string;
    mobileBackgroundImage?: string;
    description?: string;
    descriptor?: string;
}

interface SubCategoryFocusProps<T extends SubItem> {
    items: T[];
    onSelect: (item: T) => void;
    onHover?: (item: T | null) => void;
    parentTitle: string;
    parentSubtitle?: string;
}

const PremiumCard = <T extends SubItem>({ item, onSelect, onHover, index }: { item: T, onSelect: (item: T) => void, onHover?: (item: T | null) => void, index: number }) => {
    // Format index with leading zero
    const indexStr = (index + 1).toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={() => onSelect(item)}
            onMouseEnter={() => onHover && onHover(item)}
            onMouseLeave={() => onHover && onHover(null)}
            className="group relative flex flex-col w-full cursor-pointer h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-3/4 w-full overflow-hidden mb-6 bg-secondary/5 rounded-sm">
                <div className="absolute inset-0 transition-transform duration-700 ease-out scale-105 md:scale-100 md:group-hover:scale-105">
                    <Image
                        src={item.mobileImage || item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out opacity-100"
                    />
                </div>

                {/* Overlay - Removed for colorful default */}
                <div className="absolute inset-0 bg-transparent transition-colors duration-500" />

                {/* Corner Accent - Appears on hover */}
                <div className="absolute top-4 right-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 z-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-2 text-white border border-white/20 shadow-lg">
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            {/* Typography Content */}
            <div className="flex flex-col space-y-3 px-1 mt-auto">
                <div className="flex justify-between items-end border-b border-foreground md:border-border/40 pb-3 md:group-hover:border-foreground transition-colors duration-500">
                    <h3 className="text-xl lg:text-2xl font-light uppercase tracking-wide text-foreground md:text-foreground/90 md:group-hover:text-foreground transition-colors overflow-hidden text-ellipsis whitespace-nowrap pr-2">
                        {item.name}
                    </h3>
                    <span className="text-xs font-mono text-foreground/80 md:text-muted-foreground/60 md:group-hover:text-foreground/80 transition-colors shrink-0">
                        {indexStr}
                    </span>
                </div>

                {/* Description - Fade in without layout shift */}
                <div className="relative h-12 overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed font-light absolute top-0 left-0 w-full transition-all duration-500 ease-out transform translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 line-clamp-2">
                        {item.description || item.descriptor}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export const SubCategoryFocus = <T extends SubItem>({ items, onSelect, onHover, parentTitle, parentSubtitle }: SubCategoryFocusProps<T>) => {
    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* Header / Context - Sticky for consistent navigation */}
            <div className="w-full px-4 pt-12 md:pt-24 pb-6 md:px-12 md:py-16 border-b border-border/10 backdrop-blur-md sticky top-0 z-20 bg-background/80 transition-all duration-300 whitespace-nowrap overflow-hidden">
                <div className="max-w-[1920px] mx-auto w-full">
                    <ContextHero title={parentTitle} subtitle={parentSubtitle} />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="w-full flex-1 px-4 md:px-12 py-8 md:py-20">
                <div className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-8 md:gap-y-16">
                    {items.map((item, index) => (
                        <PremiumCard
                            key={item.id}
                            item={item}
                            index={index}
                            onSelect={onSelect}
                            onHover={onHover}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
