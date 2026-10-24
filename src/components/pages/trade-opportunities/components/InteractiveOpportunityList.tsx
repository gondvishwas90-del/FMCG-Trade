import { useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import NextImage from 'next/image';
import { ITradeOffer } from '@/models/TradeOffer';
import { Button } from '@/components/ui/button';
import { EnquiryModal } from '../../home/components/EnquiryModal';

interface OpportunityListProps {
    offers: ITradeOffer[];
}

export function InteractiveOpportunityList({ offers }: OpportunityListProps) {
    const [hoveredOffer, setHoveredOffer] = useState<ITradeOffer | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<ITradeOffer | null>(null);

    // Cursor follower state
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 120, mass: 0.2 }; // Snappy but smooth
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Track mouse over the whole list area
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };

    return (
        <div
            className="relative w-full md:cursor-none" // Hide default cursor only on desktop
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredOffer(null)}
        >
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <div className="col-span-3 pl-4">Px</div>
                <div className="col-span-3">Opportunity</div>
                <div className="col-span-3">Options Available</div>
                <div className="col-span-1">Market</div>
                <div className="col-span-2 text-right pr-4">Details</div>
            </div>

            {/* List Rows */}
            <div className="flex flex-col gap-4 md:gap-0">
                {offers.map((offer, index) => (
                    <OpportunityRow
                        key={offer._id?.toString() || index}
                        offer={offer}
                        index={index}
                        isHovered={hoveredOffer?._id === offer._id}
                        onHover={() => setHoveredOffer(offer)}
                        onSelect={(o) => setSelectedOffer(o)}
                    />
                ))}
            </div>

            {/* Floating CTA Follower - Desktop Only */}
            <div className="hidden md:block">
                <CursorFollower
                    isVisible={!!hoveredOffer && !selectedOffer}
                    x={springX}
                    y={springY}
                />
            </div>

            {selectedOffer && (
                <EnquiryModal 
                    isOpen={!!selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                    pkg={{
                        id: 777,
                        title: selectedOffer.title,
                        templateId: "trade-opportunity",
                        image: selectedOffer.image,
                        tagline: "Trade Opportunity",
                        bodyText: selectedOffer.availability,
                        showCTA: true,
                        color: ""
                    }}
                    opportunityName={selectedOffer.title}
                    opportunityRef={selectedOffer._id?.toString().slice(-6).toUpperCase()}
                />
            )}
        </div>
    );
}

function OpportunityRow({
    offer,
    index,
    isHovered,
    onHover,
    onSelect
}: {
    offer: ITradeOffer;
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onSelect: (offer: ITradeOffer) => void;
}) {
    const formattedId = `OPP-${String(index + 1).padStart(3, '0')}`;

    const handleContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(offer);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={onHover}
            onClick={handleContact}
            className={`
        relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 p-4 md:py-8 border rounded-xl md:rounded-none md:border-x-0 md:border-t-0 md:border-b border-border cursor-pointer group items-start md:items-center bg-card md:bg-transparent
        transition-colors duration-500
      `}
        >
            {/* Background Highlight (Desktop) */}
            <div className={`
            hidden md:block absolute inset-0 mx-0 rounded-xl bg-muted/50 -z-10
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />

            {/* 1. Image (Expanded) */}
            <div className="col-span-12 md:col-span-3 md:pl-4">
                <div className="aspect-video md:aspect-4/3 w-full rounded-lg md:rounded-xl overflow-hidden border border-border shadow-sm relative group-hover:shadow-md transition-all">
                    <NextImage
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover transform md:group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-mono tracking-wider">
                        {offer._id?.toString().slice(-6).toUpperCase()}
                    </div>
                </div>
            </div>

            {/* 2. Title & Details */}
            <div className="col-span-12 md:col-span-3">
                <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight group-hover:text-emerald-700 transition-colors mb-1">
                    {offer.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                    {offer.category?.map((cat, i) => (
                        <span key={i} className="inline-flex items-center text-[10px] md:text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {cat}
                        </span>
                    ))}
                </div>
            </div>

            {/* 3. Options Available */}
            <div className="col-span-12 md:col-span-3">
                <div className="flex flex-col gap-1.5">
                    {offer.sizes?.map((size, index) => (
                        <span key={index} className="text-sm font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded w-fit border border-border/50">
                            {size}
                        </span>
                    ))}
                </div>
            </div>

            {/* 4. Market */}
            <div className="col-span-6 md:col-span-1">
                <div className="flex flex-row md:flex-col gap-2 flex-wrap">
                    {offer.market?.map((m, i) => (
                        <span key={i} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-foreground font-medium">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" /> {m}
                        </span>
                    ))}
                </div>
            </div>

            {/* 5. Details / Status & Action Button */}
            <div className="col-span-6 md:col-span-2 flex flex-col md:flex-row md:items-center justify-end gap-4">
                <div className="hidden md:flex flex-col items-end">
                    <span className={`
                    inline-flex flex-col text-xs font-bold uppercase tracking-wider text-right
                    ${offer.availability === 'Time-Sensitive' ? 'text-red-500' :
                            offer.availability === 'Limited Window' ? 'text-amber-500' :
                                'text-emerald-500'}
                 `}>
                        {offer.availability?.replace(' ', '\n')}
                    </span>
                </div>

                {/* Mobile Status - Visible only on mobile */}
                <div className="md:hidden flex flex-col items-end">
                    <span className={`
                        inline-flex flex-col text-xs font-bold uppercase tracking-wider text-right
                        ${offer.availability === 'Time-Sensitive' ? 'text-red-500' :
                            offer.availability === 'Limited Window' ? 'text-amber-500' :
                                'text-emerald-500'}
                     `}>
                        {offer.availability?.replace(' ', '\n')}
                    </span>
                </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="col-span-12 md:hidden mt-2 pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">Tap to view details</span>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    View Opportunity <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
}

function CursorFollower({ isVisible, x, y }: { isVisible: boolean, x: any, y: any }) {
    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                pointerEvents: 'none',
                zIndex: 60,
                translateX: '-50%',
                translateY: '-50%'
            }}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Button variant="default" className="pointer-events-none shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
