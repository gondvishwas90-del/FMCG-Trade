"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ShoppingBasket, Wine, Beer, CupSoda, Candy, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { GridItemProps } from '../types/strategic-impact.types';
import { strategicImpactItems, gridAreas } from '../data/strategic-impact.data';

const iconMap = {
    ShoppingBasket,
    Wine,
    Beer,
    CupSoda,
    Candy
};

// Split text into characters for animation
const AnimatedTitle = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
    const characters = text.split("");

    return (
        <span className="inline-flex overflow-hidden">
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 0 }}
                    animate={isHovered ? { y: [0, -2, 0] } : { y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: i * 0.02,
                        ease: [0.25, 0.1, 0.25, 1]
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

export function StrategicImpact() {
    return (
        <section className="relative bg-background py-24 md:py-32" aria-label="Strategic Impact">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] text-balance mb-4 md:mb-6"
                    >
                        Product <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">Categories.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty px-4"
                    >
                        Comprehensive portfolio coverage across key FMCG verticals.
                    </motion.p>
                </div>

                <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-5 xl:min-h-[42rem] xl:grid-rows-2 list-none p-0 m-0">
                    {strategicImpactItems.map((item, index) => (
                        <GridItem
                            key={index}
                            area={gridAreas[index]}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            bgClass={item.bgClass}
                            index={index}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

interface GridItemExtendedProps extends GridItemProps {
    index: number;
}

const GridItem = ({ area, icon, title, description, bgClass, index }: GridItemExtendedProps) => {
    const cardRef = useRef<HTMLLIElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const y = useMotionValue(0);
    const springY = useSpring(y, { stiffness: 300, damping: 25 });

    const handleMouseEnter = () => {
        setIsHovered(true);
        y.set(-4);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        y.set(0);
    };

    const IconComponent = iconMap[icon];

    return (
        <motion.li
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={`min-h-[16rem] list-none ${area}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative h-full rounded-2xl border border-border/40 p-2 md:rounded-[1.25rem] md:p-2.5 bg-card/40 backdrop-blur-sm cursor-pointer group"
                style={{ y: springY }}
                whileTap={{ scale: 0.995 }}
            >
                <GlowingEffect
                    spread={32}
                    glow={true}
                    disabled={false}
                    proximity={48}
                    inactiveZone={0.01}
                    borderWidth={2}
                />

                <div className="relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-xl border border-border/40 bg-background/80 dark:bg-background/60 p-5 md:p-6 transition-colors duration-300 group-hover:bg-background/95 dark:group-hover:bg-background/80">

                    <div className="flex justify-between items-start">
                        <motion.div
                            className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border ${bgClass} transition-transform duration-300 group-hover:scale-105`}
                        >
                            <IconComponent className="h-5 w-5 md:h-5 md:w-5 text-foreground/80" />
                        </motion.div>

                        <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            initial={false}
                            animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -45 }}
                        >
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                            <AnimatedTitle text={title} isHovered={isHovered} />
                        </h3>

                        <ul className="text-muted-foreground text-sm leading-relaxed space-y-1.5">
                            {description.map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-2 overflow-hidden"
                                    initial={false}
                                >
                                    <motion.span
                                        className="w-1 h-1 rounded-full bg-emerald-500/60 mt-2 flex-shrink-0"
                                        animate={isHovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                                        transition={{ delay: i * 0.05, duration: 0.3 }}
                                    />
                                    <motion.span
                                        className="text-pretty inline-block"
                                        animate={isHovered ? {
                                            y: 0,
                                            opacity: 1,
                                            filter: "blur(0px)"
                                        } : {
                                            y: 0,
                                            opacity: 0.8,
                                            filter: "blur(0px)"
                                        }}
                                        transition={{ delay: i * 0.04, duration: 0.25 }}
                                    >
                                        <span className="relative inline-block">
                                            {item.split(" ").map((word, wordIndex) => (
                                                <motion.span
                                                    key={wordIndex}
                                                    className="inline-block mr-1"
                                                    initial={{ y: 0 }}
                                                    animate={isHovered ? { y: [0, -1, 0] } : { y: 0 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: (i * 0.04) + (wordIndex * 0.015),
                                                        ease: "easeOut"
                                                    }}
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                        </span>
                                    </motion.span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500/0 via-emerald-500/60 to-emerald-500/0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={isHovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
            </motion.div>
        </motion.li>
    );
};