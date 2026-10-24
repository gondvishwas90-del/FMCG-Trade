"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
    Layout, 
    TrendingUp, 
    Palette, 
    ShoppingCart, 
    Settings, 
    Globe2, 
    ArrowUpRight,
    Search,
    Video,
    Share2,
    BarChart,
    ChevronRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        title: "Digital Strategy & Foundation",
        subtitle: "We define and build the base for scalable digital growth.",
        icon: Layout,
        features: [
            "Website Development (B2B / B2C / E-commerce)",
            "Marketplace Setup (Amazon, etc.)",
            "Conversion-focused landing pages",
            "Platform architecture & planning"
        ],
        color: "emerald"
    },
    {
        title: "Growth & Performance",
        subtitle: "We drive demand, acquisition, and measurable growth.",
        icon: TrendingUp,
        features: [
            "Performance Marketing (Meta, Google Ads)",
            "Social Media Management",
            "Influencer Collaborations",
            "Campaign Strategy & Execution"
        ],
        color: "blue"
    },
    {
        title: "Branding, Content & Creative",
        subtitle: "We build how your brand looks, communicates, and performs.",
        icon: Palette,
        features: [
            "Graphic Design (Ads, Socials, Packaging support)",
            "Video Production (Ads, Reels, Brand Films)",
            "Content Creation (Photos, Creatives, Copy)",
            "Brand Identity & Visual Systems"
        ],
        color: "purple"
    },
    {
        title: "E-commerce Management",
        subtitle: "We manage your entire e-commerce ecosystem end-to-end.",
        icon: ShoppingCart,
        features: [
            "Store Setup & Optimization",
            "Product & Catalog Management",
            "Conversion Rate Optimization",
            "Order flow & performance tracking",
            "Platform operations aligned with growth"
        ],
        color: "amber"
    },
    {
        title: "Digital Operations",
        subtitle: "You focus on business. We run your digital engine.",
        icon: Settings,
        features: [
            "Daily platform management",
            "Campaign execution & scaling",
            "Content pipelines & publishing",
            "Customer journey optimization",
            "Performance monitoring & reporting"
        ],
        extraNote: "While you focus on supply, expansion, and strategy — we ensure your brand consistently grows and performs.",
        color: "pink"
    },
    {
        title: "Market Expansion",
        subtitle: "Localized digital positioning & multi-region scaling.",
        icon: Globe2,
        features: [
            "Market entry strategy",
            "Localized digital positioning",
            "Multi-region scaling frameworks",
            "Demand creation aligned with expansion"
        ],
        color: "cyan"
    }
];

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
                start: "top 90%",
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

function ServiceCard({ service, index }: { service: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        // Reveal card
        gsap.fromTo(cardRef.current, 
            { opacity: 0, y: 40, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.5, 
                ease: "power2.out",
                delay: index * 0.05,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 95%",
                }
            }
        );
    }, { scope: cardRef });

    const handleMouseEnter = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, { scale: 1.1, rotate: 5, duration: 0.4, ease: "back.out" });
        }
        if (featuresRef.current) {
            const items = featuresRef.current.querySelectorAll("li");
            gsap.to(items, { x: 4, stagger: 0.05, duration: 0.3, color: "var(--foreground)" });
        }
    };

    const handleMouseLeave = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        }
        if (featuresRef.current) {
            const items = featuresRef.current.querySelectorAll("li");
            gsap.to(items, { x: 0, stagger: 0.05, duration: 0.3, color: "var(--muted-foreground)" });
        }
    };

    const colorMap: { [key: string]: { bg: string, border: string, text: string, hoverBg: string } } = {
        emerald: { 
            bg: "bg-emerald-500/10 dark:bg-emerald-500/10", 
            border: "border-emerald-500/20 dark:border-emerald-500/30", 
            text: "text-emerald-600 dark:text-emerald-500",
            hoverBg: "group-hover:bg-emerald-500"
        },
        blue: { 
            bg: "bg-blue-500/10 dark:bg-blue-500/10", 
            border: "border-blue-500/20 dark:border-blue-500/30", 
            text: "text-blue-600 dark:text-blue-500",
            hoverBg: "group-hover:bg-blue-500"
        },
        purple: { 
            bg: "bg-purple-500/10 dark:bg-purple-500/10", 
            border: "border-purple-500/20 dark:border-purple-500/30", 
            text: "text-purple-600 dark:text-purple-500",
            hoverBg: "group-hover:bg-purple-500"
        },
        amber: { 
            bg: "bg-amber-500/10 dark:bg-amber-500/10", 
            border: "border-amber-500/20 dark:border-amber-500/30", 
            text: "text-amber-600 dark:text-amber-500",
            hoverBg: "group-hover:bg-amber-500"
        },
        pink: { 
            bg: "bg-pink-500/10 dark:bg-pink-500/10", 
            border: "border-pink-500/20 dark:border-pink-500/30", 
            text: "text-pink-600 dark:text-pink-500",
            hoverBg: "group-hover:bg-pink-500"
        },
        cyan: { 
            bg: "bg-cyan-500/10 dark:bg-cyan-500/10", 
            border: "border-cyan-500/20 dark:border-cyan-500/30", 
            text: "text-cyan-600 dark:text-cyan-500",
            hoverBg: "group-hover:bg-cyan-500"
        }
    };

    const colors = colorMap[service.color] || colorMap.emerald;

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative flex flex-col p-8 md:p-10 lg:p-12 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-white/10 transition-all duration-500 hover:bg-white dark:hover:bg-zinc-900/40 backdrop-blur-md"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-10">
                    <div 
                        ref={iconRef}
                        className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} ${colors.text} flex items-center justify-center shadow-2xl transition-all duration-500 ${colors.hoverBg} group-hover:text-white`}
                    >
                        <service.icon className="w-8 h-8" />
                    </div>
                    <div className="p-3 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 group-hover:border-emerald-500/30 group-hover:text-emerald-500 transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors duration-300">
                        {service.title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 font-light leading-snug">
                        {service.subtitle}
                    </p>
                    {service.extraNote && (
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sm italic text-emerald-500/60 font-medium pt-2 leading-relaxed"
                        >
                            {service.extraNote}
                        </motion.p>
                    )}
                </div>

                <ul ref={featuresRef} className="space-y-4 pt-10 mt-auto border-t border-zinc-200/50 dark:border-white/5">
                    {service.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-300">
                            <ChevronRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            <span className="group-hover:translate-x-1 transition-transform">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>
    );
}

export default function CoreServices() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section 
            id="services" 
            ref={containerRef}
            className="relative min-h-fit flex flex-col items-center justify-center py-[clamp(6rem,12vh,12rem)] overflow-hidden selection:bg-emerald-500/30"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-900/5 rounded-full blur-[150px] animate-pulse [animation-delay:3s]" />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-size-[64px_64px] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            <div className="container mx-auto relative z-10 px-6">
                <div className="flex flex-col items-center text-center mb-24">
                    {/* Badge Style like About Page */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8 md:mb-12"
                    >
                        <div className="h-px w-12 bg-emerald-500" />
                        <span className="text-emerald-600 font-mono text-sm tracking-widest uppercase font-semibold">
                            Our Expertise
                        </span>
                    </motion.div>
                    
                    <h2 className="max-w-[1200px] text-[clamp(2rem,8vw,6.5rem)] font-bold text-foreground leading-[0.95] tracking-tighter mb-8 px-4">
                        <GsapSplitText text="Precision-Built Service Ecosystem" />
                    </h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl lg:text-2xl text-muted-foreground/80 font-medium max-w-3xl mx-auto leading-relaxed"
                    >
                        A specialized suite of digital tools designed to drive your brand’s expansion across the international landscape.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-200/50 dark:border-white/5 rounded-[clamp(1.5rem,5vw,3rem)] overflow-hidden bg-zinc-50/50 dark:bg-white/5 backdrop-blur-2xl shadow-4xl text-left mt-12 md:mt-20">
                    {SERVICES.map((service, idx) => (
                        <ServiceCard key={idx} service={service} index={idx} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <p className="text-xl text-muted-foreground font-light">
                        Looking for a custom solution?{" "}
                        <Link href="#enquiry" className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors group inline-flex items-center gap-2">
                            Contact our strategy team
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </p>
                </motion.div>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}

function Link({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
}
