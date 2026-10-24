'use client';

import { useRouter } from 'next/navigation';
import { HeroMenu } from './HeroMenu';
import { useCategoryHover } from './CategoryHoverContext';
import { CategoryTier1 } from './types';

export default function CategoriesClient({ categories }: { categories: CategoryTier1[] }) {
    const router = useRouter();
    const { setHoveredImage, setHoveredMobileBackgroundImage } = useCategoryHover();

    const handleSelect = (item: CategoryTier1) => {
        router.push(`/categories/${item.id}`, { scroll: false });
        setHoveredImage(null); // Reset hover state on navigate
        setHoveredMobileBackgroundImage(null);
    };

    const handleHover = (item: CategoryTier1 | null) => {
        setHoveredImage(item ? item.image : null);
        setHoveredMobileBackgroundImage(item ? (item.mobileBackgroundImage || null) : null);
    };

    return (
        <HeroMenu
            items={categories}
            onSelect={handleSelect}
            onHover={handleHover}
        />
    );
}
