"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
    id: number;
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

const steps: Step[] = [
    {
        id: 1,
        number: "01",
        title: "Insight",
        subtitle: "The Discovery Phase",
        description:
            "We don't guess. We immerse ourselves in your ecosystem, decoding user behaviors and market gaps to find the pivotal leverage points.",
    },
    {
        id: 2,
        number: "02",
        title: "Strategy",
        subtitle: "The Blueprint",
        description:
            "Data transforms into direction. We craft a ruthless, tactical roadmap designed to cut through noise and deliver measurable dominance.",
    },
    {
        id: 3,
        number: "03",
        title: "Create",
        subtitle: "The Elevation",
        description:
            "Where art meets engineering. We build resilient, high-velocity digital solutions that look stunning and perform flawlessly under pressure.",
    },
    {
        id: 4,
        number: "04",
        title: "Launch",
        subtitle: "The Ignition",
        description:
            "Orchestrating a go-live event that signals a new era. We manage every variable to ensure your entry into the market is nothing short of explosive.",
    },
    {
        id: 5,
        number: "05",
        title: "Evolve",
        subtitle: "The Continuum",
        description:
            "Launch is just Day One. We deploy continuous feedback loops and rapid iteration cycles to keep you ahead of the curve, forever.",
    },
];

export function ProcessWorkflow() {
    const [isMobile, setIsMobile] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // --- SCROLL ANIMATION LOGIC ---
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.8,
        restDelta: 0.001
    });

    // Mobile: 6 items * 100vw = 600vw total. Viewport 100vw. Move 500vw. 500/600 = 83.33%.
    // Desktop: 30vw pad + 6 items * 60vw = 390vw. Viewport 100vw. Move 290vw. 290/390 = 74%.
    const x = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "-83.33%"] : ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] lg:h-[500vh] bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-start lg:flex-row lg:items-center">

                {/* Sticky Intro - Top on Mobile, Left on Desktop */}
                <motion.div
                    className="relative z-20 bg-background/95 backdrop-blur-md lg:bg-background border-b lg:border-b-0 lg:border-r border-border shrink-0 w-full h-[25vh] flex flex-row lg:flex-col items-center lg:justify-center px-6 lg:px-12 xl:px-32 lg:absolute lg:top-0 lg:left-0 lg:w-[30vw] lg:h-full lg:origin-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center h-full w-full"
                    >
                        <h2 className="text-4xl lg:text-6xl xl:text-8xl font-bold text-foreground tracking-tighter mb-2 lg:mb-8 leading-[0.9]">
                            Our <span className="hidden lg:inline"><br /></span>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                                Process.
                            </span>
                        </h2>
                        <p className="hidden lg:block text-muted-foreground text-lg max-w-xs leading-relaxed mb-12">
                            A kinetic framework for digital transformation. Scroll to explore the journey.
                        </p>
                        <div className="hidden lg:flex items-center gap-4 text-foreground text-sm uppercase tracking-widest animate-pulse">
                            <MoveRight className="w-6 h-6" />
                            Explore
                        </div>
                        {/* Mobile Hint */}
                        <p className="lg:hidden text-xs text-muted-foreground mt-1">Scroll down to explore</p>
                    </motion.div>
                </motion.div>

                {/* Scrolling Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-0 h-[75vh] lg:h-full items-center will-change-transform pl-0 lg:pl-[30vw]"
                >
                    {/* Steps */}
                    {steps.map((step) => (
                        <StepCard key={step.id} step={step} />
                    ))}

                    {/* Outro/CTA Slide */}
                    <div className="w-[100vw] lg:w-[60vw] shrink-0 h-full flex items-center justify-center relative bg-card border-l border-border px-4">
                        <div className="text-center p-8 lg:p-12">
                            <h3 className="text-4xl lg:text-7xl font-bold text-foreground mb-6 lg:mb-8 tracking-tighter">Ready to Start?</h3>
                            <Button variant="solar" size={isMobile ? "lg" : "xl"}>
                                Lets Talk
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}

function StepCard({ step }: { step: Step }) {
    return (
        <div className="w-[100vw] lg:w-[60vw] shrink-0 h-full flex flex-col justify-center relative px-6 lg:px-20 border-r border-border group overflow-hidden bg-background">
            {/* Background Number */}
            <div className="absolute top-4 right-4 lg:top-20 lg:right-20 pointer-events-none select-none overflow-hidden">
                <span className="text-[8rem] lg:text-[20rem] font-bold leading-none text-muted-foreground/5 lg:text-muted-foreground/10 tracking-tighter">
                    {step.number}
                </span>
            </div>

            <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <div className="h-px w-8 lg:w-12 bg-emerald-500" />
                    <span className="text-emerald-600 uppercase tracking-[0.2em] text-xs lg:text-sm font-semibold">{step.subtitle}</span>
                </div>

                <h3 className="text-4xl lg:text-8xl font-bold text-foreground mb-4 lg:mb-8 tracking-tighter leading-[0.95]">
                    {step.title}
                </h3>

                <p className="text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                    {step.description}
                </p>
            </div>

            {/* Hover highlight line */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-emerald-500 to-lime-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    )
}
