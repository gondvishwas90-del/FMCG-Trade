"use client";

import { motion } from 'motion/react';
import { customEasing } from '../constants/animations';
import { whoWeAreParagraphs } from '../data/who-we-are.data';

export function WhoWeAreSection() {
    return (
        <section id="who-we-are" className="relative bg-background py-16 md:py-32 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Sticky Title */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tighter mb-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: customEasing }}
                    >
                        Who We Are
                    </motion.h2>
                    <motion.div
                        className="h-1 w-24 bg-emerald-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: customEasing }}
                    />
                </div>

                {/* Reveal Content */}
                <div className="lg:col-span-8 space-y-24">
                    {whoWeAreParagraphs.map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: customEasing }}
                        >
                            <p className="text-xl md:text-2xl lg:text-4xl font-medium text-muted-foreground leading-normal md:leading-snug">
                                {text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
