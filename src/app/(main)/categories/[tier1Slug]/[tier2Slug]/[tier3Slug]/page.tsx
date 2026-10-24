import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/app/actions/category.actions';
import { getBrandsByTier3 } from '@/app/actions/brand.actions';
import Tier3Client from '../../../_components/Tier3Client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandsPage({ params }: { params: Promise<{ tier1Slug: string, tier2Slug: string, tier3Slug: string }> | { tier1Slug: string, tier2Slug: string, tier3Slug: string } }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    
    // Fetch tier 1
    const res = await getCategoryBySlug(resolvedParams.tier1Slug);
    const tier1 = res.success ? res.data : null;
    if (!tier1) return notFound();

    // Find tier 2
    const tier2 = tier1.tier2?.find((t2: any) => t2.id === resolvedParams.tier2Slug);
    if (!tier2) return notFound();

    // Find tier 3
    const tier3 = tier2.tier3?.find((t3: any) => t3.id === resolvedParams.tier3Slug);
    if (!tier3) return notFound();

    // Fetch brands
    const brandRes = await getBrandsByTier3(tier3.id);
    const brands = brandRes.success ? (brandRes.data || []) : [];

    return (
        <Tier3Client 
            tier1Slug={resolvedParams.tier1Slug}
            tier2Slug={resolvedParams.tier2Slug}
            tier3={tier3}
            brands={brands}
        />
    );
}
