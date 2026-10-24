import { getCategories } from '@/app/actions/category.actions';
import CategoriesClient from './_components/CategoriesClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CategoriesRootPage() {
    const res = await getCategories();
    // Default to empty array if fails or no data
    const categories = res.success ? (res.data || []) : [];
    return <CategoriesClient categories={categories} />;
}