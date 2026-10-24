'use client';

import { useRouter } from 'next/navigation';
import { SubCategoryFocus } from './SubCategoryFocus';
import { BrandGallery } from './BrandGallery';
import { CategoryTier2, CategoryTier3, Brand } from './types';
import { useCategoryHover } from './CategoryHoverContext';

export default function Tier2Client({ tier1Slug, tier2, brands }: { tier1Slug: string, tier2: CategoryTier2, brands: Brand[] }) {
    const router = useRouter();
    const { setHoveredImage, setHoveredMobileBackgroundImage } = useCategoryHover();

    if (!tier2.tier3 || tier2.tier3.length === 0) {
        const handleBack = () => {
            router.push(`/categories/${tier1Slug}`, { scroll: false });
            setHoveredImage(null);
            setHoveredMobileBackgroundImage(null);
        };
        
        return (
            <BrandGallery
                items={brands}
                parentTitle={tier2.name}
                parentSubtitle={tier2.description}
                onBack={handleBack}
            />
        );
    }

    const handleSelect = (item: CategoryTier3) => {
        router.push(`/categories/${tier1Slug}/${tier2.id}/${item.id}`, { scroll: false });
        setHoveredImage(null);
        setHoveredMobileBackgroundImage(null);
    };

    const handleHover = (item: CategoryTier3 | null) => {
        setHoveredImage(item ? item.image : null);
        setHoveredMobileBackgroundImage(item ? (item.mobileBackgroundImage || null) : null);
    };

    return (
        <SubCategoryFocus
            items={tier2.tier3}
            onSelect={handleSelect}
            onHover={handleHover}
            parentTitle={tier2.name}
            parentSubtitle={tier2.description}
        />
    );
}
