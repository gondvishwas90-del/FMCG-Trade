"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { philosophyCards } from '../data/philosophy-cards.data';
import { springConfig, cardAnimationConfig } from '../constants/animations';

export function PhilosophyCards() {
    const [cards, setCards] = useState(philosophyCards);
    const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const dragY = useMotionValue(0);
    const rotateX = useTransform(dragY, [-200, 0, 200], [15, 0, -15]);

    const { offset, scaleStep, dimStep, borderRadius, swipeThreshold } = cardAnimationConfig;

    const moveToEnd = () => {
        setCards(prev => [...prev.slice(1), prev[0]]);
        setCurrentIndex((prev) => (prev + 1) % philosophyCards.length);
    };

    const moveToStart = () => {
        setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        setCurrentIndex((prev) => (prev - 1 + philosophyCards.length) % philosophyCards.length);
    };

    const handleDragEnd = (_: any, info: any) => {
        const velocity = info.velocity.y;
        const offsetY = info.offset.y;

        if (Math.abs(offsetY) > swipeThreshold || Math.abs(velocity) > 500) {
            if (offsetY < 0 || velocity < 0) {
                setDragDirection('up');
                setTimeout(() => {
                    moveToEnd();
                    setDragDirection(null);
                }, 150);
            } else {
                setDragDirection('down');
                setTimeout(() => {
                    moveToStart();
                    setDragDirection(null);
                }, 150);
            }
        }
        dragY.set(0);
    };

    return (
        <div className="w-full py-16 flex items-center justify-center relative">
            {/* Navigation Buttons */}
            <motion.button
                onClick={moveToStart}
                className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-card/80 hover:bg-card border border-border backdrop-blur-sm transition-colors duration-200 z-20 shadow-lg"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.button>

            <motion.button
                onClick={moveToEnd}
                className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-card/80 hover:bg-card border border-border backdrop-blur-sm transition-colors duration-200 z-20 shadow-lg"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.button>

            {/* Card Stack Container */}
            <div className="relative w-full max-w-5xl h-80 md:h-96 overflow-visible z-10 px-4">
                <ul className="relative w-full h-full m-0 p-0">
                    <AnimatePresence>
                        {cards.map(({ id, title, description }, i) => {
                            const isFront = i === 0;
                            const brightness = Math.max(0.5, 1 - i * dimStep);
                            const baseZ = cards.length - i;

                            return (
                                <motion.li
                                    key={id}
                                    className="absolute w-full h-full list-none overflow-hidden border-2 border-border shadow-2xl bg-card"
                                    style={{
                                        borderRadius: `${borderRadius}px`,
                                        cursor: isFront ? 'grab' : 'auto',
                                        touchAction: 'none',
                                        transformPerspective: 1000,
                                        rotateX: isFront ? rotateX : 0
                                    }}
                                    animate={{
                                        top: `${i * -offset}%`,
                                        scale: 1 - i * scaleStep,
                                        filter: `brightness(${brightness})`,
                                        zIndex: baseZ,
                                        opacity: dragDirection && isFront ? 0 : 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={springConfig}
                                    drag={isFront ? 'y' : false}
                                    dragConstraints={{ top: 0, bottom: 0 }}
                                    dragElastic={0.7}
                                    onDrag={(_, info) => {
                                        if (isFront) {
                                            dragY.set(info.offset.y);
                                        }
                                    }}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={
                                        isFront
                                            ? {
                                                zIndex: cards.length + 1,
                                                cursor: 'grabbing',
                                                scale: 1.05,
                                            }
                                            : {}
                                    }
                                >
                                    <div className="w-full h-full flex flex-col justify-center p-6 md:p-12 bg-linear-to-br from-muted/30 to-card">
                                        <h3 className="text-xl md:text-3xl font-bold text-foreground mb-4">
                                            {title}
                                        </h3>
                                        <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                                            {description}
                                        </p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {philosophyCards.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex % philosophyCards.length
                            ? 'bg-foreground w-8'
                            : 'bg-muted w-2'
                            }`}
                        whileHover={{ scale: 1.2 }}
                    />
                ))}
            </div>
        </div>
    );
}
