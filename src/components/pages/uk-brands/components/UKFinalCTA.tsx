"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, PhoneCall, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// --- Variants defined outside ---
const badgeVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
};

const titleVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
};

const descVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
};

const btnsVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
};

const footerVariants: Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { delay: 0.5 } },
};

export default function UKFinalCTA() {
    return (
        <section id="uk-final-cta" className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="relative group p-12 md:p-24 rounded-[4rem] bg-indigo-600 overflow-hidden shadow-2xl">
                    {/* Animated background patterns - Static CSS for better perf */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] border-40 border-white rounded-full transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-white rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.div
                            variants={badgeVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-10"
                        >
                            UK Domestic Trade
                        </motion.div>
                        
                        <motion.h2
                            variants={titleVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-white mb-10"
                        >
                            Looking to Source <br /> <span className="text-white/70 italic">Stock in the UK?</span>
                        </motion.h2>

                        <motion.p
                            variants={descVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="text-white/70 text-lg md:text-2xl max-w-2xl leading-relaxed mb-16"
                        >
                            Plug into the under-the-radar spirits pipeline. Secure pre-market allocations and verified duty-paid inventory today.
                        </motion.p>

                        <motion.div
                            variants={btnsVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <Link
                                href="/contact"
                                className="group px-10 py-5 rounded-full bg-white text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all hover:bg-slate-50 hover:scale-105 shadow-xl"
                            >
                                Request Private Price List
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </Link>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const event = new CustomEvent('open-whatsapp', {
                                        detail: { message: "Hi! I would like to speak to your UK Trade Team about sourcing stock." }
                                    });
                                    window.dispatchEvent(event);
                                }}
                                className="group px-10 py-5 rounded-full bg-indigo-500/50 backdrop-blur-md border border-white/20 text-white font-black text-sm uppercase tracking-widest flex items-center gap-4 transition-all hover:bg-indigo-500/70"
                            >
                                Speak to Trade Team
                                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </motion.div>
                        
                        <motion.div
                            variants={footerVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            className="mt-16 flex flex-col md:flex-row items-center gap-10 border-t border-white/10 pt-10 w-full justify-center"
                        >
                            {/* <div className="flex items-center gap-3 text-white/50 font-bold uppercase tracking-widest text-[10px]">
                                <PhoneCall className="w-4 h-4 text-white" /> +44 (0) Trade Desk
                            </div> */}
                            <div className="flex items-center gap-3 text-white/50 font-bold uppercase tracking-widest text-[10px]">
                                <Mail className="w-4 h-4 text-white" /> Enquiry@fmcg-exchange.com
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
