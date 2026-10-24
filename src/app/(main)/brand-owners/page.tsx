import type { Metadata } from 'next';
import { getBrandOwners } from '@/app/actions/brand-owner.actions';
import { getBrands } from '@/app/actions/brand.actions';
import BrandOwnersDirectoryClient from './BrandOwnersDirectoryClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Brand Owners & Global Producers Directory | FMCG Trade Network',
    description: 'Explore verified FMCG brand owners, multinational producers, and independent distillers. Access comprehensive brand portfolios and international trade directories.',
    openGraph: {
        title: 'Brand Owners Directory | FMCG Trade Network',
        description: 'Verified FMCG brand owners and global portfolio architectures.',
    },
};

export default async function BrandOwnersDirectoryPage() {
    const [ownersRes, brandsRes] = await Promise.all([
        getBrandOwners(),
        getBrands()
    ]);

    const brandOwners = ownersRes.success ? (ownersRes.data || []) : [];
    const brands = brandsRes.success ? (brandsRes.data || []) : [];

    // Count brands per brand owner
    const brandCountsByOwner: Record<string, number> = {};
    brands.forEach((b: any) => {
        const ownerId = b.brandOwnerId;
        if (ownerId) {
            brandCountsByOwner[ownerId] = (brandCountsByOwner[ownerId] || 0) + 1;
            // Also account for normalized aliases if present
            if (ownerId === 'ab-inbev') {
                brandCountsByOwner['ab-inbev-budweiser-brewing-group-uk'] = (brandCountsByOwner['ab-inbev-budweiser-brewing-group-uk'] || 0) + 1;
            } else if (ownerId === 'ab-inbev-budweiser-brewing-group-uk') {
                brandCountsByOwner['ab-inbev'] = (brandCountsByOwner['ab-inbev'] || 0) + 1;
            }
            if (ownerId === 'heineken') {
                brandCountsByOwner['heineken-uk'] = (brandCountsByOwner['heineken-uk'] || 0) + 1;
            } else if (ownerId === 'heineken-uk') {
                brandCountsByOwner['heineken'] = (brandCountsByOwner['heineken'] || 0) + 1;
            }
        }
    });

    return (
        <BrandOwnersDirectoryClient
            brandOwners={brandOwners}
            brandCountsByOwner={brandCountsByOwner}
        />
    );
}
