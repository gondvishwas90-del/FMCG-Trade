"use client";

import { m } from "motion/react";
import { ArrowRight, Store, Warehouse, Globe, Package } from "lucide-react";
import Link from "next/link";
import { workWithCards } from '../data/work-with-cards.data';
import { containerVariants, itemVariants } from '../constants/animations';

// Icon map for dynamic rendering
const iconMap = {
    Store,
    Warehouse,
    Globe,
    Package
};

export function WhoWeWorkWith() {
    return (
        <section className="relative py-32 bg-background overflow-hidden">
            {/* Subtle Background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Sticky Header */}
                    <m.div
                        className="lg:w-1/3 lg:sticky lg:top-32"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-6 text-balance">
                            We build the bridges <br />
                            <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">between production and consumption.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
                            Our platform is engineered for the architects of global trade.
                        </p>
                        <div className="hidden lg:block">
                            <div className="h-1 w-24 bg-linear-to-r from-emerald-600 to-teal-600 rounded-full opacity-80" />
                        </div>
                    </m.div>

                    {/* Right Column: Grid */}
                    <m.div
                        className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {workWithCards.map((card) => (
                            <Link key={card.id} href="/contact">
                                <m.div
                                    variants={itemVariants}
                                    className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-emerald-500/30 hover:bg-card/80 dark:hover:bg-card/60 shadow-sm hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-500"
                                    tabIndex={-1}
                                    role="article"
                                    aria-labelledby={`card-title-${card.id}`}
                                >
                                    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                                            <div className="text-emerald-600 dark:text-emerald-500">
                                                {(() => {
                                                    const IconComponent = iconMap[card.icon];
                                                    return <IconComponent className="w-6 h-6" />;
                                                })()}
                                            </div>
                                        </div>

                                        <h3 id={`card-title-${card.id}`} className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                            {card.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                                            {card.description}
                                        </p>

                                        <div className="flex items-center text-sm font-bold text-foreground/80 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            <span>Partner with us</span>
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </m.div>
                            </Link>
                        ))}
                    </m.div>
                </div>
            </div>
        </section>
    );
}
