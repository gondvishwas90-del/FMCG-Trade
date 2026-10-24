"use client";

import { impactStats } from '../data/impact-stats.data';
import { StatCard } from './StatCard';

export function ImpactStatsSection() {
    return (
        <section className="relative min-h-screen bg-background py-16 md:py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Global Impact
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
                        Measuring our success through the growth of our partners and the communities we serve.
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-6">
                    {impactStats.map((stat, index) => (
                        <StatCard
                            key={index}
                            area={stat.area}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            description={stat.description}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
