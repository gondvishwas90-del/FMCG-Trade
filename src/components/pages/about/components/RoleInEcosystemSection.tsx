"use client";

import { motion } from 'motion/react';
import { Box, Settings, Sparkles, Lock } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ecosystemRoles } from '../data/ecosystem-roles.data';

// Icon map for dynamic rendering
const iconMap = {
    Box,
    Settings,
    Sparkles,
    Lock
};

export function RoleInEcosystemSection() {
    return (
        <section className="relative bg-background pb-16 md:pb-32 px-4 md:px-12">
            <div className="max-w-[1600px] mx-auto w-full">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-12 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
                        Our Role in the <span className="text-emerald-500">Ecosystem</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                        We bridge the gap between ambition and execution, providing the infrastructure for global trade success.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[350px] md:auto-rows-[400px]">
                    {ecosystemRoles.map((role, index) => {
                        const IconComponent = iconMap[role.icon];
                        const isDouble = role.span === 'double';

                        return (
                            <motion.div
                                key={role.id}
                                className={`group relative ${isDouble ? 'lg:row-span-2' : ''} rounded-[2.5rem] bg-card border border-border p-2 flex flex-col justify-between overflow-hidden hover:border-emerald-500/50 transition-colors duration-500`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                />
                                <div className="relative h-full rounded-[2rem] bg-card p-8 flex flex-col justify-between overflow-hidden">
                                    <div className={isDouble ? "relative z-10" : ""}>
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                            <IconComponent className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-foreground mb-4">{role.title}</h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {role.description}
                                        </p>
                                    </div>
                                    {isDouble && (
                                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
