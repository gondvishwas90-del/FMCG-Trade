"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { m, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ICarousel as Card } from '@/models/Carousel';
import { CarouselCard } from './CarouselCard';

const cinematicTransition = {
    type: "spring" as const,
    stiffness: 90,
    damping: 28,
    mass: 1.1,
    velocity: 2
};

// Calculate circular distance
const getCircularDistance = (from: number, to: number, total: number): number => {
    const direct = to - from;
    const forward = direct >= 0 ? direct : direct + total;
    const backward = direct <= 0 ? direct : direct - total;
    return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
};

// Get card properties based on distance from active
const getCardProperties = (distance: number) => {
    const absDistance = Math.abs(distance);

    if (absDistance === 0) {
        // Center card - dominant
        return {
            scale: 1.05,
            opacity: 1,
            zIndex: 30,
            blur: 0
        };
    } else if (absDistance === 1) {
        // Adjacent cards - clearly visible
        return {
            scale: 1.0, // Set to 1.0 for consistent gap calculation
            opacity: 0.9, // Higher opacity
            zIndex: 20,
            blur: 0
        };
    } else if (absDistance === 2) {
        // Second tier - visible but receding
        return {
            scale: 0.85,
            opacity: 0.5,
            zIndex: 10,
            blur: 1
        };
    } else {
        // Background cards - faint
        return {
            scale: 0.75,
            opacity: 0.25,
            zIndex: 5,
            blur: 2
        };
    }
};

interface InteractiveCarouselProps {
    cards: Card[];
}

export function InteractiveCarousel({ cards }: InteractiveCarouselProps) {
    // Calculate rotation angle - dynamic based on cards length
    const anglePerCard = cards.length > 0 ? 360 / cards.length : 0;
    const radiusMultiplier = cards.length > 0 ? Math.tan(Math.PI / 6) / Math.tan(Math.PI / cards.length) : 1;

    const [activeIndex, setActiveIndex] = useState(1); // Start with card index 1 (second card)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [rotation, setRotation] = useState(-anglePerCard); // Start at negative angle to show second card (index 1)

    const [isPortable, setIsPortable] = useState(false); // Track if mobile/tablet for conditional rendering adjustments

    // Handle Resize for isPortable only (for layout differences inside cards)
    useEffect(() => {
        const handleResize = () => {
            setIsPortable(window.innerWidth < 1280);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Swipe Handling
    const onDragEnd = (event: any, info: any) => {
        const threshold = 50; // Drag pixel threshold
        const velocityThreshold = 100; // Velocity threshold

        if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
            handlePrevious();
        } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
            handleNext();
        }
    };


    // Auto-advance every 5 seconds (slowed down slightly)
    useEffect(() => {
        const interval = setInterval(() => {
            if (hoveredIndex === null) { // Pause on hover
                setRotation((prev) => prev - anglePerCard); // Continue rotating forward
                setActiveIndex((prev) => (prev + 1) % cards.length);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [hoveredIndex, cards.length]);

    const handlePrevious = useCallback(() => {
        setRotation((prev) => prev + anglePerCard); // Rotate backward
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, [cards.length, anglePerCard]);

    const handleNext = useCallback(() => {
        setRotation((prev) => prev - anglePerCard); // Rotate forward
        setActiveIndex((prev) => (prev + 1) % cards.length);
    }, [cards.length, anglePerCard]);

    const handleCardClick = (index: number) => {
        if (index !== activeIndex) {
            const distance = getCircularDistance(activeIndex, index, cards.length);
            setRotation((prev) => prev - distance * anglePerCard);
            setActiveIndex(index);
        }
    };

    // Keyboard Navigation (Scoped to component)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            handleNext();
        }
    };


    const rotationAngle = rotation;

    if (cards.length === 0) return null;

    if (cards.length === 1) {
        return (
            <>
                <style>{`
                    .single-card-responsive {
                        width: 1200px;
                        height: 600px;
                        max-width: 95vw;
                    }
                    @media (max-width: 1280px) {
                        .single-card-responsive {
                            width: 900px;
                            height: 500px;
                        }
                    }
                    @media (max-width: 768px) {
                        .single-card-responsive {
                            width: 90vw;
                            height: 450px;
                        }
                    }
                `}</style>
                <div className="w-full max-w-[1800px] h-[500px] md:h-[800px] relative flex items-center justify-center rounded-3xl">
                    <div className="single-card-responsive relative">
                        <m.div
                            className="absolute inset-0 outline-none focus-visible:ring-4 focus-visible:ring-white/50 rounded-[24px] md:rounded-[48px]"
                            initial={{ scale: 1.05, opacity: 1 }}
                            animate={{ scale: 1.05, opacity: 1 }}
                        >
                            <CarouselCard card={cards[0]} isActive={true} isPriority={true} isPortable={isPortable} />
                        </m.div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
        <style>{`
            .carousel-responsive {
                --radius-multiplier: 1;
                --base-radius: 935px;
                --card-width: 1000px;
                --card-height: 500px;
                --card-radius: calc(var(--base-radius) * var(--radius-multiplier));
                --ring-z: calc(var(--base-radius) - var(--card-radius));
            }
            @media (max-width: 1280px) {
                .carousel-responsive {
                    --base-radius: 762px;
                    --card-width: 800px;
                    --card-height: 420px;
                }
            }
            @media (max-width: 768px) {
                .carousel-responsive {
                    --base-radius: 340px;
                    --card-width: 300px;
                    --card-height: 380px;
                }
            }
        `}</style>
        <div className="w-full max-w-[1800px] h-[500px] md:h-[800px] relative perspective-container carousel-responsive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500 rounded-3xl"
            style={{ '--radius-multiplier': radiusMultiplier } as React.CSSProperties}
            role="region"
            aria-roledescription="carousel"
            aria-label="Case Studies Carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            
            {/* Screen Reader Live Region for Announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Showing slide {activeIndex + 1} of {cards.length}: {cards[activeIndex]?.title}
            </div>

                {/* 3D Perspective Container */}
                <m.div // Changed to m.div for drag handling on container
                    className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{
                    perspective: '3000px',
                    perspectiveOrigin: 'center center'
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.05}
                onDragEnd={onDragEnd}
                >
                    {/* Z-Offset Container to keep front card at same apparent size */}
                    <div style={{ transform: 'translateZ(var(--ring-z))', transformStyle: 'preserve-3d' }} className="w-full h-full flex items-center justify-center absolute">
                        {/* Rotating Ring Container */}
                        <m.div
                            className="relative"
                        style={{
                            width: 'var(--card-width)',
                            height: 'var(--card-height)',
                            transformStyle: 'preserve-3d',
                        }}
                        initial={{ rotateY: -anglePerCard }} // Match initial state of rotation state
                        animate={{
                            rotateY: rotationAngle
                        }}
                        transition={cinematicTransition}
                    >
                        {/* Cards positioned on the ring */}
                        {cards.map((card, index) => {
                            // Normalize the angle to create infinite loop effect
                            const baseAngle = anglePerCard * index;

                            const distance = getCircularDistance(activeIndex, index, cards.length);
                            const properties = getCardProperties(distance);
                            const isActive = index === activeIndex;
                            const isHovered = hoveredIndex === index && !isActive;

                            // Dynamic Transform calculation
                            const getTransform = (hovered: boolean) =>
                                `rotateY(${baseAngle}deg) translateZ(var(--card-radius)) scale(${hovered ? properties.scale * 1.02 : properties.scale
                                })`;

                            const cardKey = card._id ? String(card._id) : (card as any).id ? String((card as any).id) : `carousel-card-${index}`;

                            return (
                                    <m.div
                                        key={cardKey}
                                        className="absolute outline-none focus-visible:ring-4 focus-visible:ring-white/50 rounded-[24px] md:rounded-[48px]"
                                        style={{
                                            width: 'var(--card-width)',
                                            height: 'var(--card-height)',
                                            left: 0,
                                            top: 0,
                                            transformStyle: 'preserve-3d',
                                            backfaceVisibility: 'visible',
                                            zIndex: properties.zIndex
                                        }}
                                        initial={{
                                            transform: `rotateY(${baseAngle}deg) translateZ(var(--card-radius)) scale(${properties.scale})`,
                                            opacity: properties.opacity,
                                            filter: `blur(${properties.blur}px)`
                                        }}
                                        animate={{
                                            transform: getTransform(isHovered),
                                            opacity: properties.opacity,
                                            filter: `blur(${properties.blur}px)`
                                        }}
                                        transition={cinematicTransition}
                                        onClick={() => handleCardClick(index)}
                                        onHoverStart={() => setHoveredIndex(index)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleCardClick(index);
                                            }
                                        }}
                                        role="group"
                                        aria-roledescription="slide"
                                        aria-label={`${index + 1} of ${cards.length}: ${card.title}`}
                                        aria-current={isActive ? 'true' : undefined}
                                        tabIndex={isActive ? 0 : -1}
                                    >
                                        <CarouselCard card={card} isActive={isActive} isPriority={distance <= 1} isPortable={isPortable} />
                                    </m.div>
                            );
                        })}
                    </m.div>
                </div>
            </m.div>

            {/* Navigation Arrows - Adjusted for Mobile */}
            <button
                id="carousel-prev-btn"
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center z-40 lg:z-10 shadow-lg group hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 ease-out"
                onClick={handlePrevious}
                aria-label="Previous Slide"
            >
                <div
                    className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </button>

            <button
                id="carousel-next-btn"
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center z-40 lg:z-10 shadow-lg group hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 ease-out"
                onClick={handleNext}
                aria-label="Next Slide"
            >
                <div
                    className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
            </button>

            {/* Pagination Dots */}
            <div className="absolute -bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 transition-colors duration-300">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className="transition-all p-2"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                    >
                        <div
                            className="rounded-full bg-black dark:bg-white transition-colors duration-300"
                            style={{
                                width: activeIndex === index ? '10px' : '8px',
                                height: activeIndex === index ? '10px' : '8px',
                                opacity: activeIndex === index ? 1 : 0.2
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
        </>
    );
}
