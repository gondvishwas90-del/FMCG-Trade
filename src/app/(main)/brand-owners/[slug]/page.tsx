import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBrandOwnerById } from '@/app/actions/brand-owner.actions';
import { getBrandsByBrandOwner } from '@/app/actions/brand.actions';
import BrandOwnerClient from './BrandOwnerClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const res = await getBrandOwnerById(resolvedParams.slug);
    const owner = res.success ? res.data : null;

    if (!owner) {
        return {
            title: 'Brand Owner Not Found | FMCG Trade Network',
        };
    }

    return {
        title: `${owner.name} - Brand Portfolio & Trade Profile | FMCG Trade Network`,
        description: owner.description || `Explore brands and products owned by ${owner.name}. Access verified FMCG trade directory, export availability, and distribution partnerships.`,
        openGraph: {
            title: `${owner.name} | FMCG Trade Network`,
            description: owner.description || `Official brand owner profile and product portfolio for ${owner.name}.`,
            images: owner.logo ? [{ url: owner.logo }] : [],
        },
    };
}

export default async function BrandOwnerDetailPage({ params }: PageProps) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    
    const [ownerRes, brandsRes] = await Promise.all([
        getBrandOwnerById(resolvedParams.slug),
        getBrandsByBrandOwner(resolvedParams.slug)
    ]);

    const brandOwner = ownerRes.success ? ownerRes.data : null;

    if (!brandOwner) {
        return notFound();
    }

    const brands = brandsRes.success ? (brandsRes.data || []) : [];

    return <BrandOwnerClient brandOwner={brandOwner} brands={brands} />;
}
