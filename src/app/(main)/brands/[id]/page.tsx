import { getBrandById } from "@/app/actions/brand.actions";
import { getCategories } from "@/app/actions/category.actions";
import BrandClient from "./BrandClient";
import NotFound from "@/app/not-found";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const res = await getBrandById(resolvedParams.id);
    const brand = res.success ? res.data : null;

    if (!brand) return NotFound();
    
    const categoriesRes = await getCategories();
    const categories = categoriesRes.success ? categoriesRes.data : [];

    return <BrandClient brand={brand} categories={categories} />;
}
