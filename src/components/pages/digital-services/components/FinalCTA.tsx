"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

function GsapSplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const words = text.split(" ");

    useGSAP(() => {
        if (!containerRef.current) return;

        const letters = containerRef.current.querySelectorAll(".split-char");
        
        gsap.set(letters, { 
            y: 80, 
            opacity: 0, 
            rotateX: -90 
        });

        gsap.to(letters, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.01,
            ease: "power4.out",
            delay: delay,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 95%",
            }
        });
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-block perspective-1000 ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0 py-1 overflow-hidden">
                    {word.split("").map((char, j) => (
                        <span key={j} className="split-char inline-block will-change-transform">
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}

function MagneticButton({ children, onClick, className, variant = "primary" }: { children: any, onClick?: any, className?: string, variant?: "primary" | "secondary" }) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!btnRef.current || !textRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btnRef.current!.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            gsap.to(btnRef.current, {
                x: deltaX * 0.15,
                y: deltaY * 0.15,
                duration: 0.5,
                ease: "power2.out"
            });

            gsap.to(textRef.current, {
                x: deltaX * 0.08,
                y: deltaY * 0.08,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to([btnRef.current, textRef.current], {
                 x: 0,
                 y: 0,
                 duration: 0.6,
                 ease: "elastic.out(1, 0.3)"
            });
        };

        btnRef.current.addEventListener("mousemove", handleMouseMove);
        btnRef.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btnRef.current?.removeEventListener("mousemove", handleMouseMove);
            btnRef.current?.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: btnRef });

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            className={`
                group relative px-12 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden
                ${variant === "primary"
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                    : `bg-white/80 text-emerald-700 border border-emerald-100 backdrop-blur-3xl hover:bg-emerald-50 hover:text-emerald-900 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white`
                }
                ${className}
            `}
        >
            <div className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out`} />
            <span ref={textRef} className="relative z-10 flex items-center justify-center gap-3">
                {children}
            </span>
        </button>
    );
}

export default function FinalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        // Subtle entrance or background logic if needed
    }, { scope: containerRef });

    return (
        <section 
            id="enquiry"
            ref={containerRef} 
            className="relative py-[clamp(8rem,18vh,18rem)] bg-background overflow-hidden border-t border-white/5 selection:bg-emerald-500/30"
        >
            {/* Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[200px] animate-pulse" />
                
                {/* Refined Grid Pattern */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)]" />
            </div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="max-w-[1200px] mx-auto">
                    
                    {/* Main CTA Card */}
                    <div className="relative p-8 md:p-16 lg:p-24 rounded-[clamp(1.5rem,5vw,3rem)] bg-card/10 border border-white/5 backdrop-blur-3xl overflow-hidden text-center group">
                        
                        {/* Decorative Corner Glows */}
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] group-hover:bg-emerald-500/10 transition-all duration-1000" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px]" />

                        <div className="relative z-10 space-y-16">
                            
                            {/* Badge Style like About Page */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 justify-center mb-8"
                            >
                                <div className="h-px w-12 bg-emerald-500" />
                                <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                                    The Expansion Engine
                                </span>
                                <div className="h-px w-12 bg-emerald-500" />
                            </motion.div>
                            
                            <div className="space-y-10">
                                <h2 className="text-[clamp(2rem,7vw,5.5rem)] font-bold text-foreground leading-[0.95] tracking-tighter">
                                    <span className="block mb-6">Ready to Scale</span>
                                    <span className=" block">
                                        <GsapSplitText text="Your Brand Across Markets?" />
                                    </span>
                                </h2>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5, ease: "circOut" }}
                                    className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
                                >
                                    Let’s build your digital ecosystem and drive consistent growth across regions.
                                </motion.p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10">
                                <Link href="/contact" className="contents">
                                    <MagneticButton variant="secondary">
                                        <Calendar className="w-5 h-5 text-emerald-500" strokeWidth={3} />
                                        Book a Strategy Call
                                    </MagneticButton>
                                </Link>

                                <MagneticButton 
                                    onClick={() => {
                                        const contactSection = document.getElementById('enquiry');
                                        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Submit Brand Details
                                    <ArrowRight className="w-5 h-5" />
                                </MagneticButton>
                            </div>

                            {/* Trust Indicator */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="pt-16 border-t border-white/5 text-[10px] font-mono font-black uppercase tracking-[0.5em] text-muted-foreground/40"
                            >
                                Multi-Region Management • Data-Driven Scales • Performance First
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
