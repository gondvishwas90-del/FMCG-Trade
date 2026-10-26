import { Suspense } from 'react';
import BrandsTemplate from '@/components/pages/brands/components/BrandsTemplate';
import { getBrands } from '@/app/actions/brand.actions';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: "Global Brands & Commercial Opportunities | FMCG Exchange",
    description: "Explore our FMCG brand portfolio for B2B trade & commercial supply.",
};

export default async function BrandsPage() {
    const res = await getBrands();
    const brands = res.success ? (res.data || []) : [];

    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <BrandsTemplate brands={brands} />
        </Suspense>
    );
}
