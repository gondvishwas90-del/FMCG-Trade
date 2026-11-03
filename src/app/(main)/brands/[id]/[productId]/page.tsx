import { getBrandById } from "@/app/actions/brand.actions";
import NotFound from "@/app/not-found";
import SingleProductDetailView from "@/components/pages/brands/components/SingleProductDetailView";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export default async function SingleProductPage({
    params
}: {
    params: Promise<{ id: string; productId: string }> | { id: string; productId: string };
}) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const { id, productId } = resolvedParams;

    const brandRes = await getBrandById(id);
    const brand = brandRes.success ? brandRes.data : null;

    if (!brand || !brand.products || brand.products.length === 0) {
        return NotFound();
    }

    // Find product matching productId by slug or normalized name
    const targetSlug = productId.toLowerCase();
    const product = brand.products.find((p: any) => {
        const pSlug = (p.slug || slugify(p.name)).toLowerCase();
        return pSlug === targetSlug || pSlug.includes(targetSlug) || targetSlug.includes(pSlug);
    }) || brand.products[0];

    return (
        <SingleProductDetailView
            product={product}
            brand={{
                id: brand.id,
                name: brand.name,
                country: brand.country,
                category: brand.category,
                logo: brand.owner?.logo || brand.image
            }}
        />
    );
}

