"use client";

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StickyHeaderProps {
    /**
     * The content to be rendered inside the header
     */
    children: ReactNode;

    /**
     * Optional additional className
     */
    className?: string;

    /**
     * Optional ID for the header element
     */
    id?: string;

    /**
     * Offset from top in pixels (default 0)
     * Can be used if there are other sticky elements
     */
    topOffset?: number;
}

/**
 * StickyHeader
 * 
 * A layout primitive that handles the "stickiness" and visual styling 
 * (glass-morphism, border, shadow) for page headers.
 * 
 * @example
 * <StickyHeader>
 *   <div className="flex justify-between">...</div>
 * </StickyHeader>
 */
export function StickyHeader({
    children,
    className,
    id,
    topOffset = 0
}: StickyHeaderProps) {
    return (
        <div
            id={id}
            style={{ top: topOffset }}
            className={cn(
                // Layout
                "sticky z-20 mb-6 py-4",
                "transition-all duration-200",

                // Negative margins to stretch full width within padding container
                "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",

                // Visuals (Glassmorphism)
                "bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80",
                "border-b border-border shadow-sm",

                className
            )}
        >
            {children}
        </div>
    );
}
