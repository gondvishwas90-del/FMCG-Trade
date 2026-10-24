import Image from 'next/image';
import Link from 'next/link';
import { Plus, ChevronRight } from 'lucide-react';
// Motion imports removed in favor of Tailwind CSS animations
import { type ICarousel as Card } from '@/models/Carousel';

// Card Content Component with Layout Types
export function CarouselCard({ card, isActive, isPriority, isPortable }: { card: Card; isActive: boolean; isPriority: boolean; isPortable: boolean }) {
    return (
        <div
            className="relative w-full h-full rounded-[24px] md:rounded-[48px] overflow-hidden bg-neutral-900 border border-white/10"
            style={{
                boxShadow: isActive
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                {card.mobileImage ? (
                    <>
                        <Image
                            src={card.image}
                            alt={`${card.title} desktop view`}
                            fill
                            className={`hidden md:block object-cover transition-all duration-700 ease-out ${isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
                                }`}
                            sizes="(max-width: 1200px) 600px, 700px"
                            priority={isPriority}
                        />
                        <Image
                            src={card.mobileImage}
                            alt={`${card.title} mobile view`}
                            fill
                            className={`block md:hidden object-cover transition-all duration-700 ease-out ${isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
                                }`}
                            sizes="(max-width: 768px) 300px"
                            priority={isPriority}
                        />
                    </>
                ) : (
                    <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className={`object-cover transition-all duration-700 ease-out ${isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-40'
                            }`}
                        sizes="(max-width: 768px) 300px, (max-width: 1200px) 600px, 700px"
                        priority={isPriority}
                    />
                )}
            </div>

            {/* Cinematic Gradient Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)'
                }}
            />

            {/* Content based on layout type */}
            <div className="relative z-10 w-full h-full p-6 md:p-12 flex flex-col justify-end pb-12 md:pb-20">
                {card.layout === 'norman' && (
                    <NormanLayout card={card} isPortable={isPortable} />
                )}
                {card.layout === 'found' && (
                    <FoundLayout card={card} isActive={isActive} isPortable={isPortable} />
                )}
                {card.layout === 'measured' && (
                    <MeasuredLayout card={card} isActive={isActive} isPortable={isPortable} />
                )}
                {card.layout === 'centered' && (
                    <CenteredLayout card={card} isActive={isActive} isPortable={isPortable} />
                )}
            </div>
        </div>
    );
}

// Norman Layout Component
function NormanLayout({ card, isPortable }: { card: Card; isPortable: boolean }) {
    return (
        <div className="flex items-start gap-3 md:gap-5">
            <div className={`rounded-full bg-white flex items-center justify-center shrink-0 ${isPortable ? 'w-10 h-10' : 'w-16 h-16'
                }`}>
                <Plus className={`text-black ${isPortable ? 'w-5 h-5' : 'w-8 h-8'}`} aria-hidden="true" />
            </div>
            <div>
                <h2 className={`font-medium text-white leading-none ${isPortable ? 'text-[24px]' : 'text-[42px]'}`}>{card.title}</h2>
                {card.subtitle && (
                    <p className={`${isPortable ? 'text-sm' : 'text-lg'} text-white mt-2`} style={{ opacity: 0.8 }}>
                        {card.subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

// Found Layout Component
function FoundLayout({ card, isActive, isPortable }: { card: Card; isActive: boolean; isPortable: boolean }) {
    // Reduced sizes significantly for "Found" layout
    const titleSize = isPortable
        ? (isActive ? '48px' : '36px')
        : (isActive ? '120px' : '90px');

    return (
        <>
            <div className="flex-1 flex items-center justify-center">
                <h2
                    className="font-medium text-white leading-none transition-all duration-500"
                    style={{
                        fontSize: titleSize
                    }}
                >
                    {card.title}
                </h2>
            </div>
            <div className="flex items-end justify-between">
                {card.subtitle && (
                    <p className={`${isPortable ? 'text-base' : 'text-xl'} text-white`}>
                        {card.subtitle}
                    </p>
                )}
                {card.cta && isActive && (
                    <Link 
                        href="/trade-opportunities" 
                        className={`${isPortable ? 'text-base' : 'text-xl'} text-white hover:opacity-80 transition-opacity flex items-center gap-2`}
                        aria-label={`${card.cta.replace('→', '').trim()} ${card.title}`}
                    >
                        {card.cta.replace('→', '')} <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </Link>
                )}
            </div>
        </>
    );
}

// Measured Layout Component
function MeasuredLayout({ card, isActive, isPortable }: { card: Card; isActive: boolean; isPortable: boolean }) {
    // Reduced sizes for "Measured" layout
    const titleSize = isPortable
        ? (isActive ? '42px' : '32px')
        : (isActive ? '100px' : '80px');

    return (
        <div className="flex-1 flex items-center justify-end">
            <h2
                className="font-medium text-white leading-none text-right transition-all duration-500"
                style={{
                    fontSize: titleSize
                }}
            >
                {card.title}
            </h2>
        </div>
    );
}

// Centered Layout Component
function CenteredLayout({ card, isActive, isPortable }: { card: Card; isActive: boolean; isPortable: boolean }) {
    return (
        <div className="flex flex-col items-center justify-end h-full text-center pb-4 md:pb-8">
            <h2
                className={`font-bold text-white tracking-tighter text-balance transition-all duration-500 ease-out ${isActive
                    ? isPortable ? 'text-3xl leading-none' : 'text-4xl md:text-6xl leading-[0.95] opacity-100'
                    : isPortable ? 'text-xl leading-tight' : 'text-3xl md:text-4xl leading-tight opacity-60'
                    }`}
                style={{
                    textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                }}
            >
                {card.title}
            </h2>

            <div
                className={`grid transition-all duration-500 ease-out ${isActive ? 'grid-rows-[1fr] mt-3 md:mt-5 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}
            >
                <div className="overflow-hidden max-w-3xl">
                    <p className={`text-neutral-200 font-medium leading-relaxed drop-shadow-lg text-balance ${isPortable ? 'text-xs' : 'text-base md:text-lg'
                        }`}>
                        {card.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}
