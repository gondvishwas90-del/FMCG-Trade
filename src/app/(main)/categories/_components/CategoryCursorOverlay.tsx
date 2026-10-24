'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CategoryTier1 } from './types';

interface CategoryCursorOverlayProps {
    hoveredItem: CategoryTier1 | null;
}

export default function CategoryCursorOverlay({ hoveredItem }: CategoryCursorOverlayProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cursorX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.5 });
    const cursorY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY, isMobile]);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%'
            }}
            className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex flex-col items-center justify-center gap-6 translate-z-0"
            initial={{ opacity: 0 }}
            animate={{
                opacity: hoveredItem ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
        >
            {hoveredItem && (
                <>
                    <motion.div
                        layoutId="active-image"
                        className="relative w-[240px] h-[320px] lg:w-[300px] lg:h-[400px] overflow-hidden rounded-[2rem] border-[8px] border-white shadow-2xl bg-black"
                        initial={{ scale: 0, rotate: 15 }}
                        animate={{
                            scale: 1,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }
                        }}
                        exit={{
                            scale: 0,
                            rotate: -15,
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Image
                            src={hoveredItem.mobileImage || hoveredItem.image}
                            alt={hoveredItem.name}
                            fill
                            className="object-cover scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.1, duration: 0.3 }
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-foreground text-background px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg"
                    >
                        Explore <ArrowRight className="w-3 h-3" />
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}
