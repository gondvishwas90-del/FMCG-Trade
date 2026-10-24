"use client";

import { motion } from 'motion/react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import type { StatCardProps } from '../types/stat-card.types';

// Icon map for dynamic rendering
const iconMap = {
    TrendingUp,
    Users,
    Globe,
    Award
};

export function StatCard({ area, icon, title, description, value, label }: StatCardProps) {
    const IconComponent = iconMap[icon as keyof typeof iconMap];

    return (
        <li className={cn("min-h-[12rem] md:min-h-[14rem] list-none", area)}>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 bg-card">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-transparent bg-card/50 backdrop-blur-xl p-6 shadow-sm md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                            <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="space-y-3">
                            {value && (
                                <div className="text-4xl md:text-5xl font-bold text-foreground">
                                    {value}
                                </div>
                            )}
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                                {title || label}
                            </h3>
                            <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
