"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Check, ArrowRight, ArrowDownRight, Info, ChevronDown } from "lucide-react";
import type { StageData } from "../types/stage.types";
import { stages } from "../data/stages.data";
import { EnquiryModal } from "../../home/components/EnquiryModal";


interface RoadmapAccordionProps {
    recommendedStages: number[];
    header?: React.ReactNode;
    children?: React.ReactNode;
}

// Hook to detect mobile viewport
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

export default function RoadmapAccordion({ recommendedStages, header, children }: RoadmapAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [selectedStage, setSelectedStage] = useState<StageData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const handleEnquire = (stage: StageData) => {
        setSelectedStage(stage);
        setIsModalOpen(true);
    };

    // Scroll Progress Logic for Pinning Animation (Desktop only)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth the index transition based on scroll (Desktop only)
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) return; // Skip scroll-based logic on mobile
        const index = Math.min(Math.floor(latest * stages.length), stages.length - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    // Precise scrolling to the target stage based on the sticky container's progress logic
    useEffect(() => {
        if (recommendedStages.length > 0 && containerRef.current && !isMobile) {
            const container = containerRef.current;
            const targetStageIndex = stages.findIndex(s => s.id === recommendedStages[0]);

            if (targetStageIndex !== -1) {
                const rect = container.getBoundingClientRect();
                const absoluteTop = window.scrollY + rect.top;
                const containerHeight = container.offsetHeight;
                const viewportHeight = window.innerHeight;
                const scrollableDistance = containerHeight - viewportHeight;
                const targetProgress = (targetStageIndex + 0.5) / stages.length;
                const scrollOffset = absoluteTop + (targetProgress * scrollableDistance);

                window.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        }
        // For mobile, just set the active index
        if (recommendedStages.length > 0 && isMobile) {
            const targetStageIndex = stages.findIndex(s => s.id === recommendedStages[0]);
            if (targetStageIndex !== -1) {
                setActiveIndex(targetStageIndex);
            }
        }
    }, [recommendedStages, isMobile]);

    // Mobile Layout - Vertical Accordion
    if (isMobile) {
        return (
            <div className="w-full px-4">
                {/* Header Content */}
                <div className="w-full mb-6">
                    {header}
                    {children}
                </div>

                {/* Mobile Vertical Cards */}
                <div className="flex flex-col gap-3">
                    {stages.map((stage, index) => (
                        <MobileAccordionCard
                            key={stage.id}
                            stage={stage}
                            isActive={index === activeIndex}
                            isRecommended={recommendedStages.includes(stage.id)}
                            onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                            onEnquire={() => handleEnquire(stage)}
                        />
                    ))}
                </div>

                <EnquiryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    pkg={selectedStage ? {
                        id: selectedStage.id,
                        title: selectedStage.title,
                        templateId: selectedStage.templateId,
                        image: "",
                        tagline: "",
                        bodyText: "",
                        showCTA: true,
                        color: ""
                    } : null}
                />
            </div>
        );
    }

    // Desktop Layout - Horizontal Scroll-Driven
    return (
        <div ref={containerRef} className="relative h-[300vh] w-full">
            <div className="sticky top-0 h-[100vh] w-full flex flex-col justify-start pt-4 md:pt-24 pb-4  px-4 md:px-8 z-40 bg-background">

                {/* Header Content (Pinned) */}
                <div className="w-full max-w-[1800px] mx-auto shrink-0 z-20 relative backdrop-blur-sm rounded-b-2xl transition-all duration-300">
                    {header}
                    {children}
                </div>

                {/* Cards Container */}
                <div className="w-full max-w-[1800px] mx-auto flex-1 flex flex-col justify-start min-h-0 mt-8 md:mt-10 lg:mt-12">
                    <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] flex flex-row gap-2 md:gap-3 lg:gap-4">
                        {stages.map((stage, index) => (
                            <DesktopAccordionCard
                                key={stage.id}
                                stage={stage}
                                isActive={index === activeIndex}
                                isRecommended={recommendedStages.includes(stage.id)}
                                onClick={() => setActiveIndex(index)}
                                onEnquire={() => handleEnquire(stage)}
                            />
                        ))}
                    </div>
                </div>

                <EnquiryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    pkg={selectedStage ? {
                        id: selectedStage.id,
                        title: selectedStage.title,
                        templateId: selectedStage.templateId,
                        image: "",
                        tagline: "",
                        bodyText: "",
                        showCTA: true,
                        color: ""
                    } : null}
                />
            </div>
        </div>
    );
}

// Mobile Accordion Card - Vertical, Tap to Expand
function MobileAccordionCard({
    stage,
    isActive,
    isRecommended,
    onClick,
    onEnquire
}: {
    stage: StageData;
    isActive: boolean;
    isRecommended: boolean;
    onClick: () => void;
    onEnquire: () => void;
}) {
    const [activeTab, setActiveTab] = useState<'support' | 'next'>('support');

    return (
        <motion.div
            layout
            onClick={onClick}
            initial={false}
            animate={{
                opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
                relative rounded-2xl overflow-hidden cursor-pointer touch-manipulation
                border transition-colors duration-300
                ${isActive
                    ? "bg-card border-border shadow-lg"
                    : isRecommended
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/30 ring-2 ring-emerald-500"
                        : "bg-muted border-transparent"
                }
            `}
        >
            {/* Collapsed Header - Always Visible */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${isRecommended ? 'text-emerald-600' : 'text-muted-foreground/50'}`}>
                        {stage.number}
                    </span>
                    <div>
                        <h3 className="text-base font-bold text-foreground tracking-tight">{stage.title}</h3>
                        {isRecommended && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                                Recommended
                            </span>
                        )}
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-4 pb-4 pt-2">
                            {/* Description */}
                            <p className="text-sm text-muted-foreground mb-4">
                                {stage.description}
                            </p>

                            {/* Ideal For Badge */}
                            <div className="mb-4 flex items-start gap-2 bg-muted/50 p-3 rounded-xl border border-border">
                                <Info className="w-4 h-4 text-muted-foreground/70 shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-xs font-medium">{stage.idealFor}</span>
                            </div>

                            {/* Tabs */}
                            <div className="flex space-x-4 border-b border-border mb-4">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveTab('support'); }}
                                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'support'
                                        ? 'border-foreground text-foreground'
                                        : 'border-transparent text-muted-foreground'
                                        }`}
                                >
                                    How We Help
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveTab('next'); }}
                                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'next'
                                        ? 'border-foreground text-foreground'
                                        : 'border-transparent text-muted-foreground'
                                        }`}
                                >
                                    What's Next
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="max-h-[200px] overflow-y-auto">
                                {activeTab === 'support' ? (
                                    <div className="space-y-2">
                                        {stage.bullets.map((bullet, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                                                </div>
                                                <span className="text-foreground/90 text-sm font-medium">{bullet}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {stage.typicallyNext.map((next, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl border border-border">
                                                <div>
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-0.5">
                                                        {next.type === 'most' ? 'Most Partners Continue To' : 'Some Skip To'}
                                                    </div>
                                                    <div className="font-semibold text-foreground text-sm">Stage {next.stage + 1}: {next.label}</div>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* CTA Button */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); onEnquire(); }}
                                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl font-bold text-sm active:scale-[0.98] transition-transform touch-manipulation"
                            >
                                Inquire About This Stage
                                <ArrowDownRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Desktop Accordion Card - Horizontal, Scroll-Driven
function DesktopAccordionCard({
    stage,
    isActive,
    isRecommended,
    onClick,
    onEnquire
}: {
    stage: StageData;
    isActive: boolean;
    isRecommended: boolean;
    onClick: () => void;
    onEnquire: () => void;
}) {
    const [activeTab, setActiveTab] = useState<'support' | 'next'>('support');

    return (
        <motion.div
            layout
            onClick={onClick}
            initial={false}
            animate={{
                flex: isActive ? 4 : 1,
                opacity: isActive ? 1 : (isRecommended ? 0.9 : 0.6),
                filter: isActive || isRecommended ? "grayscale(0%)" : "grayscale(100%) brightness(0.95)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
            className={`
                relative h-[65vh] max-h-[70vh] rounded-xl md:rounded-2xl lg:rounded-[2rem] overflow-hidden cursor-pointer
                border transition-colors duration-500 flex flex-row
                ${isActive
                    ? "bg-card border-border shadow-2xl z-10"
                    : isRecommended
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/30 shadow-lg ring-2 ring-emerald-500 ring-offset-2 z-0"
                        : "bg-muted border-transparent z-0"
                }
            `}
        >
            {/* Collapsed State */}
            <div className={`
                absolute inset-0 flex flex-col justify-between p-3 md:p-4 lg:p-6 pointer-events-auto
                ${isActive ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300
            `}>
                <div className="flex justify-between items-start">
                    <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isRecommended ? 'text-emerald-600' : 'text-muted-foreground/50'}`}>
                        {stage.number}
                    </span>
                    {isRecommended && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                            Recommended
                        </span>
                    )}
                </div>

                <div className="-rotate-90 origin-bottom-left translate-x-6 md:translate-x-7 lg:translate-x-8 whitespace-nowrap">
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground tracking-tight">{stage.title}</h3>
                </div>
            </div>

            {/* Expanded State */}
            <motion.div
                className="w-full h-full p-6 md:p-8 lg:p-10 flex flex-col relative overflow-visible"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background Number Watermark */}
                <div className="absolute top-0 right-0 p-4 md:p-6 lg:p-8 opacity-5 pointer-events-none">
                    <span className="text-[8rem] md:text-[10rem] lg:text-[12rem] leading-none font-bold text-foreground">{stage.number}</span>
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                Step {stage.number}
                            </span>
                            {isRecommended && (
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Recommended for You
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground max-w-2xl mb-3 tracking-tight leading-[1.1]">
                            {stage.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                            {stage.description}
                        </p>
                    </div>

                    {/* Ideal For Badge */}
                    <div className="mb-6 flex items-start gap-2 bg-muted p-3 md:p-4 rounded-lg border border-border max-w-max">
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/70 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-xs md:text-sm font-medium">{stage.idealFor}</span>
                    </div>

                    {/* Tabbed Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex space-x-6 border-b border-border mb-6">
                            <button
                                onClick={(e) => { e.stopPropagation(); setActiveTab('support'); }}
                                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'support'
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-muted-foreground/80'
                                    }`}
                            >
                                How We Help
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setActiveTab('next'); }}
                                className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'next'
                                    ? 'border-foreground text-foreground'
                                    : 'border-transparent text-muted-foreground hover:text-muted-foreground/80'
                                    }`}
                            >
                                What's Next
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {activeTab === 'support' ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {stage.bullets.map((bullet, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-foreground/90 text-sm md:text-base font-medium">{bullet}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {stage.typicallyNext.map((next, idx) => (
                                        <div key={idx} className="group flex items-center justify-between p-4 bg-muted rounded-xl border border-border hover:border-border/80 transition-colors cursor-default">
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
                                                    {next.type === 'most' ? 'Most Partners Continue To' : 'Some Skip To'}
                                                </div>
                                                <div className="font-semibold text-foreground">Stage {next.stage + 1}: {next.label}</div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                        <span className="text-sm text-muted-foreground/70 font-medium">Stage {stage.number} of 05</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEnquire(); }}
                            className="flex items-center gap-2 text-foreground font-bold text-sm md:text-base transition-all hover:text-emerald-600"
                        >
                            Inquire About This Stage
                            <ArrowDownRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
