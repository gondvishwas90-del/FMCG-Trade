"use client";

import { motion } from "motion/react";
import { Container, Boxes, Layers, PackageCheck, ShieldCheck, ArrowRight, Building2, Truck } from "lucide-react";
import Link from "next/link";

interface SupplyTier {
    id: string;
    number: string;
    title: string;
    badge: string;
    badgeColor: string;
    scale: string;
    description: string;
    specs: string;
    idealFor: string;
    icon: any;
}

const supplyTiers: SupplyTier[] = [
    {
        id: "fcl",
        number: "01",
        title: "Full Container Loads (FCL)",
        badge: "Direct Commercial Export",
        badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        scale: "20ft & 40ft High-Cube Containers",
        description: "Direct manufacturer, distillery, and bonded facility dispatches. Managed transit across key international shipping corridors with complete export documentation.",
        specs: "Approx. 900 – 2,200 cases per container depending on SKU format",
        idealFor: "International importers, port concessionaires & duty-free operators",
        icon: Container,
    },
    {
        id: "pallets",
        number: "02",
        title: "Full Pallet Supply",
        badge: "Wholesale Standard",
        badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        scale: "Single-SKU Pallet Allocations",
        description: "Standardized pallet-quantity fulfillment for high-rotation FMCG brands, spirits, confectionery, and grocery staples directly to regional distribution centers.",
        specs: "Standard UK (1200×1000) & Euro (1200×800) formats (40 – 160 cases/pallet)",
        idealFor: "Regional wholesalers, cash & carry groups, and retail distributors",
        icon: Boxes,
    },
    {
        id: "mixed-pallets",
        number: "03",
        title: "Consolidated Mixed Pallets",
        badge: "Under-Bond Consolidation",
        badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        scale: "Multi-Brand Mixed Lots",
        description: "Consolidated across premier European & UK bonded hubs (Loendersloot, Newcorp, PLG, Reftrans), allowing trade buyers to combine multiple brands into single pallet shipments.",
        specs: "Custom case selections with unified commercial invoice & export manifest",
        idealFor: "Hospitality groups, independent retailers & boutique distributors",
        icon: Layers,
    },
    {
        id: "sample-parcels",
        number: "04",
        title: "Trade Sampling & Parcels",
        badge: "Auxiliary / Sampling Only",
        badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        scale: "Case & Parcel Dispatch",
        description: "Courier and parcel dispatch is strictly reserved for verified trade sampling, compliance testing, and emergency split-case orders. It is not our primary trading volume.",
        specs: "Available exclusively for registered commercial account holders",
        idealFor: "Buyer pre-qualification, compliance checks & emergency top-ups",
        icon: PackageCheck,
    },
];

export default function CommercialSupplyCapabilities() {
    return (
        <section className="bg-card/40 border-b border-border py-16 md:py-24 relative overflow-hidden" aria-label="Commercial Supply Capabilities">
            <div className="max-w-[1800px] mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                                Commercial Supply Architecture
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 leading-[0.95]">
                            Commercial Supply & <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                                Fulfilment Capabilities.
                            </span>
                        </h2>
                        <div className="h-1 w-24 bg-emerald-500 mb-6" />
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl font-light leading-relaxed">
                            FMCG Exchange operates strictly as a commercial B2B supplier and international distributor. We supply verified business buyers across standardized trade formats—pallet allocations and container shipments form the foundation of our trade desk.
                        </p>
                    </div>

                    <div className="bg-card border border-border/80 rounded-2xl p-6 lg:max-w-md shadow-xs">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-bold text-foreground uppercase tracking-wider block mb-1">Commercial B2B Trade Notice:</span>
                                All pricing, stock allocations, and shipments are structured for registered business buyers. We do not operate as a retail store or direct-to-consumer parcel courier.
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4 Supply Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supplyTiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-card border border-border hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md group relative"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-foreground group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                                            Tier {tier.number}
                                        </span>
                                    </div>

                                    <div>
                                        <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-2 ${tier.badgeColor}`}>
                                            {tier.badge}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {tier.title}
                                        </h3>
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1">
                                            {tier.scale}
                                        </p>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tier.description}
                                    </p>

                                    <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-0.5">Capacity Format</span>
                                            <span className="text-foreground font-medium">{tier.specs}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-0.5">Target Counterparties</span>
                                            <span className="text-foreground font-medium">{tier.idealFor}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-border/40">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                                    >
                                        <span>Inquire Supply Terms</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bonded Warehousing & Logistics Trust Bar */}
                <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold uppercase tracking-wider text-foreground">Active Bonded Accounts:</span>
                        <span className="font-medium text-foreground/80">Loendersloot • Newcorp • PLG • Reftrans</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                        <span className="px-3 py-1 rounded-full bg-muted/60 border border-border text-foreground/80">Under-Bond Transfers (T1)</span>
                        <span className="px-3 py-1 rounded-full bg-muted/60 border border-border text-foreground/80">UK Duty-Paid Available</span>
                        <span className="px-3 py-1 rounded-full bg-muted/60 border border-border text-foreground/80">Export Documentation (EUR1 / COO)</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
