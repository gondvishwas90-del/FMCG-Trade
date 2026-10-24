import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/app/actions/category.actions';
import { getBrandsByTier1 } from '@/app/actions/brand.actions';
import { getBrandOwners } from '@/app/actions/brand-owner.actions';
import Tier1Client from '../_components/Tier1Client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Tier1Page({ params }: { params: Promise<{ tier1Slug: string }> | { tier1Slug: string } }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    
    // Fetch directly from backend
    const res = await getCategoryBySlug(resolvedParams.tier1Slug);
    const tier1 = res.success ? res.data : null;

    if (!tier1) {
        return notFound();
    }

    const [brandRes, ownerRes] = await Promise.all([
        getBrandsByTier1(tier1.id),
        getBrandOwners()
    ]);

    const brands = brandRes.success ? (brandRes.data || []) : [];
    const brandOwners = ownerRes.success ? (ownerRes.data || []) : [];

    return <Tier1Client tier1={tier1} brands={brands} brandOwners={brandOwners} />;
}
