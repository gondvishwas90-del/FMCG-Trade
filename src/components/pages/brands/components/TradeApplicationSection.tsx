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
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-6 text-emerald-400 font-bold tracking-widest uppercase text-sm"
                        >
                            Trade Partner Program
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6, ease: customEasing }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[0.9]"
                        >
                            Apply for <br />
                            Trade Access.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed"
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
                                className="inline-flex items-center gap-3 bg-emerald-500 text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all group"
                            >
                                Start Application
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-500" /> No fees. Instant acknowledgement.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                className="flex items-start gap-6 p-6 border-b border-border"
                            >
                                <span className="text-4xl font-bold text-muted-foreground/20">{step.number}</span>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
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
