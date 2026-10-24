"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, Lightbulb, PenTool, Rocket, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { processSteps } from '../data/process-steps.data';
import { contentVariants } from '../constants/animations';
import type { ProcessStep } from '../types/process-step.types';

// Icon map for dynamic rendering
const iconMap = {
    Search,
    Lightbulb,
    PenTool,
    Rocket
};

export function HowItWorksSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-16"
                >
                    <p className="text-sm md:text-base font-mono mb-4 text-emerald-600 tracking-widest uppercase font-semibold">
                        Our Process
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                        How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Works.</span>
                    </h2>
                </motion.div>

                {/* Desktop/Tablet Horizontal Accordion */}
                <div className="hidden md:flex h-[600px] gap-4">
                    {processSteps.map((step, index) => (
                        <AccordionCard
                            key={step.id}
                            data={step}
                            isActive={index === activeIndex}
                            onMouseEnter={() => setActiveIndex(index)}
                        />
                    ))}
                </div>

                {/* Mobile Vertical Stack */}
                <div className="flex md:hidden flex-col gap-4">
                    {processSteps.map((step, index) => (
                        <MobileCard
                            key={step.id}
                            data={step}
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AccordionCard({ data, isActive, onMouseEnter }: { data: ProcessStep, isActive: boolean, onMouseEnter: () => void }) {
    const IconComponent = iconMap[data.icon];

    return (
        <motion.div
            layout
            onMouseEnter={onMouseEnter}
            animate={{ flex: isActive ? 3 : 1 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className={`
                relative h-full rounded-3xl overflow-hidden cursor-pointer
                border transition-all duration-300 group
                ${isActive ? "border-border/50 ring-1 ring-emerald-500/20 shadow-xl" : "border-transparent hover:border-emerald-500/30"}
            `}
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-100 grayscale-[0.5] group-hover:scale-110 group-hover:grayscale-0"}`}
                />
                <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? "bg-black/60" : "bg-black/40 group-hover:bg-black/50"}`} />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                    <span className="font-mono text-xl opacity-80">0{data.id}</span>
                    <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-md transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                        <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                </div>

                <div className="relative">
                    <motion.div layout className="mb-2">
                        <h3 className={`font-bold text-3xl md:text-4xl tracking-tight ${!isActive && "md:-rotate-90 md:origin-bottom-left md:absolute md:bottom-8 md:whitespace-nowrap"}`}>
                            {data.title}
                        </h3>
                    </motion.div>

                    {isActive && (
                        <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">
                                {data.subtitle}
                            </p>
                            <p className="text-gray-200 leading-relaxed mb-6 max-w-lg">
                                {data.description}
                            </p>
                            <div className="space-y-2">
                                {data.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function MobileCard({ data, isActive, onClick }: { data: ProcessStep, isActive: boolean, onClick: () => void }) {
    const IconComponent = iconMap[data.icon];

    return (
        <div
            onClick={onClick}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isActive ? "border-emerald-500/30 ring-1 ring-emerald-500/20" : "border-transparent bg-muted/30"}`}
        >
            <div className="p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-mono text-muted-foreground/30 font-bold">0{data.id}</span>
                        <h3 className="text-xl font-bold">{data.title}</h3>
                    </div>
                    {isActive ? (
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <IconComponent className="w-6 h-6 text-emerald-600" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    )}
                </div>

                <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <p className="text-sm font-medium text-emerald-600 mb-2">{data.subtitle}</p>
                    <p className="text-muted-foreground text-sm mb-4">{data.description}</p>
                    <div className="space-y-2 pb-2">
                        {data.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
