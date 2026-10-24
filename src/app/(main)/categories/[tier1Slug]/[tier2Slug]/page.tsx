import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/app/actions/category.actions';
import { getBrandsByTier2 } from '@/app/actions/brand.actions';
import Tier2Client from '../../_components/Tier2Client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Tier2Page({ params }: { params: Promise<{ tier1Slug: string, tier2Slug: string }> | { tier1Slug: string, tier2Slug: string } }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    
    // Fetch parent Tier 1
    const res = await getCategoryBySlug(resolvedParams.tier1Slug);
    const tier1 = res.success ? res.data : null;

    if (!tier1) {
        return notFound();
    }

    // Find the Tier 2 subcategory inside the fetched Tier 1
    const tier2 = tier1.tier2?.find((t2: any) => t2.id === resolvedParams.tier2Slug);

    if (!tier2) {
        return notFound();
    }

    // Fetch brands if there are no tier 3 subcategories
    let brands = [];
    if (!tier2.tier3 || tier2.tier3.length === 0) {
        const brandRes = await getBrandsByTier2(tier2.id);
        if (brandRes.success) {
            brands = brandRes.data || [];
        }
    }

    return (
        <Tier2Client 
            tier1Slug={resolvedParams.tier1Slug}
            tier2={tier2}
            brands={brands}
        />
    );
}
