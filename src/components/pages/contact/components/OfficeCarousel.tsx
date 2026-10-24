"use client";

import { motion } from 'motion/react';
import Image from 'next/image';
import { offices } from '../data/offices.data';

export function OfficeCarousel() {
    return (
        <div className="relative z-10 mt-12 pt-12 border-t border-border/50 overflow-hidden">
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Global Offices</h4>

            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="flex gap-8"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {[...offices, ...offices].map((office, i) => (
                        <div key={i} className="shrink-0 w-48 group/office cursor-pointer">
                            <div className="aspect-4/3 rounded-xl overflow-hidden mb-3 relative">
                                <Image
                                    src={office.image}
                                    alt={office.city}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/office:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover/office:bg-black/0 transition-colors duration-500" />
                            </div>
                            <p className="font-bold text-foreground">{office.city}</p>
                            <p className="text-xs text-muted-foreground">{office.timezone}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
