import { motion, useSpring, useMotionValue } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowUpRight, MapPin, ArrowRight } from 'lucide-react';
import type { TradeOffer, OfferType } from '../types/trade-offer.types';
import { SPRING_CONFIG } from '../constants/config';

const MotionImage = motion(Image);


interface ExpandingCardProps {
    offer: TradeOffer;
    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;
}

export function ExpandingOfferCard({ offer, hoveredId, setHoveredId }: ExpandingCardProps) {
    const isHovered = hoveredId === offer.id;
    const isDimmed = hoveredId !== null && !isHovered;

    const containerRef = useRef<HTMLDivElement>(null);

    const buttonX = useMotionValue(0);
    const buttonY = useMotionValue(0);
    const springX = useSpring(buttonX, SPRING_CONFIG);
    const springY = useSpring(buttonY, SPRING_CONFIG);


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const anchorX = rect.width - 48;
        const anchorY = 48;

        buttonX.set((mouseX - anchorX) * 0.15);
        buttonY.set((mouseY - anchorY) * 0.15);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
        buttonX.set(0);
        buttonY.set(0);
    };

    const handleContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        const subject = encodeURIComponent(`Trade Inquiry - ${offer.title}`);
        window.location.href = `mailto:sales@globaltradepartners.com?subject=${subject}`;
    };

    return (
        <motion.div
            layout
            ref={containerRef}
            onMouseEnter={() => setHoveredId(offer.id)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: isDimmed ? 0.5 : 1,
                scale: isHovered ? 1.02 : 1,
                filter: isDimmed ? 'grayscale(100%) blur(1px)' : 'grayscale(0%) blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`
        relative group h-[520px] rounded-[2rem] overflow-hidden cursor-pointer
        bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500/30
        transition-all duration-500
      `}
        >
            <div className="absolute inset-0 h-3/5 overflow-hidden bg-slate-100 relative">
                <MotionImage
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <span className={`
              px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border backdrop-blur-md
              ${offer.availability === 'Time-Sensitive' ? 'bg-red-500/20 text-red-100 border-red-500/30' :
                            offer.availability === 'Limited Window' ? 'bg-amber-500/20 text-amber-100 border-amber-500/30' :
                                'bg-emerald-500/20 text-emerald-100 border-emerald-500/30'}
            `}>
                        {offer.availability}
                    </span>
                </div>

                <div className="absolute top-6 right-6 z-20">
                    <motion.button
                        style={{ x: springX, y: springY }}
                        onClick={handleContact}
                        className={`
                  flex items-center justify-center w-12 h-12 rounded-full 
                  bg-white/10 backdrop-blur-md border border-white/20 text-white
                  group-hover:bg-white group-hover:text-black transition-colors duration-300
                `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-2/5 bg-white p-8 flex flex-col justify-between">
                <div>
                    <div className="flex gap-2 mb-4 overflow-hidden mask-linear-fade">
                        {offer.category?.slice(0, 2).map((cat, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100/50">
                                {cat}
                            </span>
                        ))}
                        {offer.market?.map((m, i) => (
                            <span key={`m-${i}`} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {m}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-emerald-700 transition-colors">
                        {offer.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                        {(offer.notes || []).join('. ')}
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Verified Opportunity</span>
                    <span className="text-slate-900 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Details <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
