"use client";

import { motion } from 'motion/react';
import { WorldMap } from '@/components/ui/world-map';
import { globalRegions, mapConnections } from '../data/global-regions.data';

export function GlobalReachSection() {
    return (
        <section className="relative min-h-screen bg-background py-16 md:py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Global <span className="text-emerald-500">Reach</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
                        Connecting markets through established trade corridors and strategic hubs.
                    </p>
                </motion.div>

                {/* World Map Component */}
                <div className="w-full bg-card/50 rounded-[3rem] p-4 md:p-12 border border-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-0" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Regions List */}
                        <div className="lg:col-span-4 space-y-6">
                            {globalRegions.map((region, i) => (
                                <motion.div
                                    key={i}
                                    className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-default group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                                        <h3 className="text-lg font-bold text-foreground">{region.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground pl-6 border-l-2 border-border group-hover:border-emerald-500/30 transition-colors">
                                        {region.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Map Visualization */}
                        <div className="lg:col-span-8 relative min-h-[400px]">
                            <WorldMap
                                dots={mapConnections}
                                lineColor="#10b981"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
