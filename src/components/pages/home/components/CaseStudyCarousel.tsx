
import { InteractiveCarousel } from './InteractiveCarousel';
import { type ICarousel } from '@/models/Carousel';

interface CaseStudyCarouselProps {
    items: ICarousel[];
}

export function CaseStudyCarousel({ items }: CaseStudyCarouselProps) {
    return (
        <section
            className="relative w-full min-h-[50vh] md:min-h-screen bg-background flex items-center justify-center overflow-hidden py-20 md:py-0 mt-4"
        >
            {/* Carousel Container */}
            <InteractiveCarousel cards={items} />
        </section>
    );
}

// Previous sub-components have been moved to CarouselCard.tsx and InteractiveCarousel.tsx
