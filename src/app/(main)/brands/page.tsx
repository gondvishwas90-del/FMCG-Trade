import { Suspense } from 'react';
import BrandsTemplate from '@/components/pages/brands/components/BrandsTemplate';
import { getBrands } from '@/app/actions/brand.actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandsPage() {
    const res = await getBrands();
    const brands = res.success ? (res.data || []) : [];

    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <BrandsTemplate brands={brands} />
        </Suspense>
    );
}
