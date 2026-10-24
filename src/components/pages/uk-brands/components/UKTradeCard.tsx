"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { IUKDomesticTradeOffer } from '@/models/UKDomesticTradeOffer';

interface UKTradeCardProps {
    offer: IUKDomesticTradeOffer;
    index: number;
}

export function UKTradeCard({ offer, index }: UKTradeCardProps) {
    const handleEnquire = () => {
        const element = document.getElementById('enquiry');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isLimited = offer.availability === 'Limited';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
                delay: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : index * 0.1,
                duration: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 0.8
            }}
            className="group relative h-full flex flex-col rounded-[3rem] bg-card border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
        >
            {/* Top Image Section */}
            <div className="relative h-[320px] overflow-hidden">
                <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Premium Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <div className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl border border-white/20">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Stock
                    </div>
                    <div className={`
                        ${isLimited ? 'bg-amber-500/90 shadow-amber-500/20' : 'bg-primary/90 shadow-primary/20'} 
                        backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl border border-white/20
                    `}>
                        <Zap className="w-3 h-3 animate-pulse" />
                        {offer.availability}
                    </div>
                </div>

                {/* Localized Card Glow */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-[60px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${isLimited ? 'bg-amber-500' : 'bg-primary'}`} />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-10 flex flex-col relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {offer.category?.map((cat, i) => (
                        <span key={i} className="text-primary font-mono text-[10px] font-bold uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                            {cat}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-[1.1] tracking-tighter group-hover:text-primary transition-colors text-foreground line-clamp-2">
                    {offer.title}
                </h3>

                <div className="space-y-5 mb-10 flex-1">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                        <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                            <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest opacity-50">Allocation</span>
                            <span className="text-foreground font-bold text-base">{offer.sizes?.[0] || 'Bulk Allocation'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                        <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-colors">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest opacity-50">Warehouse</span>
                            <span className="text-foreground font-bold text-base">UK Central Distribution</span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex items-center justify-between">
                    <button
                        onClick={handleEnquire}
                        className="flex items-center gap-4 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:gap-6 transition-all group/btn"
                    >
                        Request Details 
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Hover Accent Line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700" />
        </motion.div>
    );
}

