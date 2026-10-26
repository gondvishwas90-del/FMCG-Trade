"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { customEasing } from "../constants/config";
import { useState } from "react";
import { EnquiryModal } from "../../home/components/EnquiryModal";

const steps = [
    {
        number: "01",
        title: "Account Application",
        description: "Submit your trade credentials."
    },
    {
        number: "02",
        title: "Verification",
        description: "24-48 hour approval process."
    },
    {
        number: "03",
        title: "Full Access",
        description: "Unlock wholesale pricing & downloads."
    }
];

export default function TradeApplicationSection({ brandName }: { brandName?: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tradePkg = {
        id: 999,
        title: brandName || "Trade Access",
        templateId: "brand-enquiry",
        image: "",
        tagline: "Trade Partner Program",
        bodyText: "Get exclusive access to pricing, specs, and volume terms.",
        showCTA: true,
        color: ""
    };

    return (
        <section className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-4 md:mb-6"
                        >
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                                Trade Partner Program
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6, ease: customEasing }}
                            className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-foreground leading-[0.95]"
                        >
                            Apply for <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                                Trade Access.
                            </span>
                        </motion.h2>

                        <div className="h-1 w-24 bg-emerald-500 mb-6" />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg font-light leading-relaxed"
                        >
                            Essential for retailers, distributors, and hospitality groups. Get exclusive access to pricing, specs, and volume terms.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all group"
                            >
                                Start Application
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-4 text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-500" /> No fees. Instant acknowledgement.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                className="flex items-start gap-6 p-6 border-b border-border"
                            >
                                <span className="text-4xl md:text-5xl font-mono font-bold text-muted-foreground/30">{step.number}</span>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-1">{step.title}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Background Grain/Noise can be added here */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }}></div>

            <EnquiryModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                pkg={tradePkg}
                brandName={brandName}
            />
        </section>
    );
}
