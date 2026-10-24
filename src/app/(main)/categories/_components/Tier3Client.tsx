'use client';

import { useRouter } from 'next/navigation';
import { BrandGallery } from './BrandGallery';
import { CategoryTier3, Brand } from './types';
import { useCategoryHover } from './CategoryHoverContext';

export default function Tier3Client({ tier1Slug, tier2Slug, tier3, brands }: { tier1Slug: string, tier2Slug: string, tier3: CategoryTier3, brands: Brand[] }) {
    const router = useRouter();
    const { setHoveredImage, setHoveredMobileBackgroundImage } = useCategoryHover();

    const handleBack = () => {
        router.push(`/categories/${tier1Slug}/${tier2Slug}`, { scroll: false });
        setHoveredImage(null);
        setHoveredMobileBackgroundImage(null);
    };

    const handleHover = (brand: Brand | null) => {
        setHoveredImage(brand ? (brand.backgroundImage || brand.image) : null);
        setHoveredMobileBackgroundImage(brand ? (brand.mobileBackgroundImage || brand.backgroundImage || brand.image) : null);
    };

    return (
        <BrandGallery
            items={brands}
            parentTitle={tier3.name}
            parentSubtitle={tier3.description}
            onBack={handleBack}
            onHover={handleHover}
        />
    );
}
