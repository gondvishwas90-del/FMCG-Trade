"use client";

import { m } from "motion/react";
import { Handshake } from "lucide-react";

export function RelationshipsSection() {
    return (
        <section className="relative py-40 overflow-hidden bg-background">

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[6rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-12">

                    {/* Animated Icon */}
                    <m.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <m.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-emerald-100 rounded-full blur-xl"
                            />
                            <div className="relative w-24 h-24 bg-card border border-border rounded-3xl shadow-xl shadow-emerald-100/50 dark:shadow-none flex items-center justify-center">
                                <Handshake className="w-10 h-10 text-emerald-600" />
                            </div>
                        </div>
                    </m.div>

                    {/* Headline */}
                    <m.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter leading-[1.1]">
                            Built on Relationships,<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                                Not Transactions.
                            </span>
                        </h2>
                    </m.div>

                    {/* Body Text */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mx-auto max-w-4xl space-y-6"
                    >
                        <p>
                            Our approach to FMCG and spirits commercial trade is grounded in <strong className="text-foreground font-bold">transparency</strong>, <strong className="text-foreground font-bold">verified provenance</strong>, and <strong className="text-foreground font-bold">long-term supply partnerships</strong>.
                        </p>
                        <p>
                            We serve qualified commercial buyers—importers, regional distributors, and trade retailers buying for resale—through dedicated trading desks and structured logistics.
                        </p>
                        <p>
                            Commercial procurement decisions require <strong className="text-foreground font-bold">trust</strong>, <strong className="text-foreground font-bold">regulatory compliance</strong>, and <strong className="text-foreground font-bold">sustained collaboration</strong>—we support trade partners across every international lane.
                        </p>
                    </m.div>

                    {/* Signature Line */}
                    <m.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 300 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="h-1 bg-linear-to-r from-transparent via-emerald-200 to-transparent mx-auto mt-12"
                    />

                </div>
            </div>
        </section>
    );
}
