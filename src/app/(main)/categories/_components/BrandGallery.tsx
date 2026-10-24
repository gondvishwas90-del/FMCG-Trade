import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PackageSearch, ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid, Columns } from 'lucide-react';
import { ContextHero } from './ContextHero';

interface BrandItem extends Record<string, any> {
    id: string;
    name: string;
    image: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string;
    description?: string;
    owner?: {
        name: string;
        logo: string;
    };
}

interface BrandGalleryProps<T extends BrandItem> {
    items?: T[];
    parentTitle: string;
    parentSubtitle?: string;
    onBack?: () => void;
    onHover?: (item: T | null) => void;
}

export const BrandGallery = <T extends BrandItem>({ items = [], parentTitle, parentSubtitle, onBack, onHover }: BrandGalleryProps<T>) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current && viewMode === 'carousel') {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    // Enable horizontal scrolling with mouse wheel, but allow vertical scroll at edges
    useEffect(() => {
        if (viewMode !== 'carousel') return;
        
        checkScroll();
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            const isScrollingRight = e.deltaY > 0;
            const scrollLeft = container.scrollLeft;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            // Allow vertical scroll if we're at the edges
            // slightly loose check (< 5) to account for fractional pixels
            if (
                (!isScrollingRight && scrollLeft <= 0) ||
                (isScrollingRight && Math.abs(scrollLeft - maxScrollLeft) < 5)
            ) {
                return;
            }

            // Otherwise, prevent vertical scroll and scroll horizontally
            e.preventDefault();
            container.scrollLeft += e.deltaY;
            checkScroll();
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        // Clean up
        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [items, viewMode]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -container.clientWidth * 0.75 : container.clientWidth * 0.75;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">

            {/* Context Hero - Condensed for Gallery with Controls */}
            <div className="p-4 md:p-8 lg:px-16 pt-24 md:pt-32 pb-8 md:pb-12 z-10 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex-1">
                    <ContextHero title={parentTitle} subtitle={parentSubtitle} />
                </div>
                
                {/* Controls Area */}
                {items.length > 0 && (
                    <div className="flex gap-4 items-center mb-6">
                        
                        {/* Layout Toggle */}
                        <div className="flex bg-white/5 border border-border/20 rounded-full p-1 mr-2 md:mr-4">
                            <button
                                onClick={() => setViewMode('carousel')}
                                className={`p-3 rounded-full transition-colors ${viewMode === 'carousel' ? 'bg-white/10 text-foreground' : 'text-foreground/50 hover:text-foreground'}`}
                                aria-label="Carousel View"
                            >
                                <Columns className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-foreground' : 'text-foreground/50 hover:text-foreground'}`}
                                aria-label="Grid View"
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Carousel Arrows */}
                        {viewMode === 'carousel' && (
                            <div className="hidden md:flex gap-2">
                                <button 
                                    onClick={() => scroll('left')}
                                    disabled={!canScrollLeft}
                                    aria-label="Scroll Left"
                                    className="p-3 lg:p-4 rounded-full border border-border/20 text-foreground hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-1" />
                                </button>
                                <button 
                                    onClick={() => scroll('right')}
                                    disabled={!canScrollRight}
                                    aria-label="Scroll Right"
                                    className="p-3 lg:p-4 rounded-full border border-border/20 text-foreground hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Gallery View Area */}
            {items.length > 0 ? (
                <div
                    ref={viewMode === 'carousel' ? scrollContainerRef : undefined}
                    className={
                        viewMode === 'carousel' 
                            ? "grow overflow-x-auto no-scrollbar flex items-center px-4 md:px-8 lg:px-16 gap-4 md:gap-6 pb-12 md:pb-16 snap-x snap-mandatory"
                            : "grow overflow-y-auto px-4 md:px-8 lg:px-16 pb-12 md:pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    }
                >
                    <AnimatePresence mode="popLayout">
                        {items.map((item, index) => (
                                <motion.div
                                key={`${item.id}-${viewMode}`}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                                onMouseEnter={() => onHover && onHover(item)}
                                onMouseLeave={() => onHover && onHover(null)}
                                className={`relative group overflow-hidden bg-white/5 rounded-sm ${
                                    viewMode === 'carousel' 
                                        ? "shrink-0 w-[85vw] md:w-[450px] aspect-4/5 border-r border-border/10 snap-center first:pl-0"
                                        : "w-full aspect-[4/5] border border-border/10"
                                }`}
                            >
                                <Link href={`/brands/${item.id}`} className="block w-full h-full relative">
                                    {/* Image Container */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover scale-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        />
                                        <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-700" />
                                        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80" />
                                    </div>

                                    {/* Content Overlay - Visible by default on mobile, hover on desktop */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-3xl md:text-4xl md:text-5xl font-black text-foreground mb-2 md:mb-4 uppercase tracking-tighter leading-none">
                                            {item.name}
                                        </h3>
                                        
                                        {item.owner && (
                                            <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-sm border border-white/10">
                                                {item.owner.logo && (
                                                    <div className="relative w-4 h-4 overflow-hidden rounded-xs bg-white/90 p-0.5">
                                                        <Image src={item.owner.logo} alt={item.owner.name} fill className="object-contain" />
                                                    </div>
                                                )}
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                                                    {item.owner.name}
                                                </span>
                                            </div>
                                        )}

                                        <div className="overflow-hidden max-h-[200px] md:max-h-0 md:group-hover:max-h-[200px] transition-all duration-700 ease-[0.16,1,0.3,1] opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                            {item.description && (
                                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                                                    {item.description}
                                                </p>
                                            )}
                                            <span className="inline-block px-8 py-3 border border-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300">
                                                View Casestudy
                                            </span>
                                        </div>
                                    </div>
                                </Link>

                                {/* Minimal border/separator line */}
                                {viewMode === 'carousel' && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-border hidden md:block pointer-events-none" />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Spacer for end of list */}
                    {viewMode === 'carousel' && <div className="shrink-0 w-8 lg:w-16" />}
                </div>
            ) : (
                <div className="grow flex items-center justify-center px-4 md:px-12 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md w-full text-center flex flex-col items-center"
                    >
                        <div className="w-24 h-24 mb-8 relative">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-foreground/5 rounded-full"
                            />
                            <PackageSearch className="relative z-10 w-full h-full text-foreground/20 stroke-1" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 text-foreground">
                            Coming Soon
                        </h3>
                        <p className="text-muted-foreground font-light leading-relaxed mb-12">
                            We are currently curating brand partnerships for this category. Stay tuned for exceptional additions to our portfolio.
                        </p>

                        <button
                            onClick={onBack}
                            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Return to Explore
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
