'use server';

import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { serializeList, serializeDocument } from "@/lib/utils/serialize";
import { fallbackCategories } from "@/components/pages/categories/data/categories.data";

export async function getCategories() {
    try {
        await dbConnect();
        const categories = await Category.find({ status: 'active' }).lean();
        if (!categories || categories.length === 0) {
            return { success: true, data: serializeList(fallbackCategories) };
        }
        return { success: true, data: serializeList(categories) };
    } catch (error: any) {
        console.error("Error in getCategories, using fallback:", error);
        return { success: true, data: serializeList(fallbackCategories) };
    }
}

export async function getAllCategories() {
    try {
        await requireAdmin();
        await dbConnect();
        const categories = await Category.find({}).lean();

        return { success: true, data: serializeList(categories) };
    } catch (error: any) {
        console.error("Error in getAllCategories:", error);
        return { success: false, error: error.message };
    }
}
 
export async function getAdminCategoryBySlug(slug: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const category = await Category.findOne({ id: slug }).lean();
        if (!category) return { success: false, error: 'Category not found' };
        return { success: true, data: serializeDocument(category) };
    } catch (error: any) {
        console.error(`Error in getAdminCategoryBySlug (${slug}):`, error);
        return { success: false, error: error.message };
    }
}

export const getCategoryBySlug = unstable_cache(
    async (slug: string) => {
        try {
            await dbConnect();
            const searchSlugs = [slug];
            if (slug === 'wine') searchSlugs.push('wine-champagne', 'wines');
            if (slug === 'wine-champagne') searchSlugs.push('wine');
            if (slug === 'cocktails') searchSlugs.push('cocktails-mixers');
            if (slug === 'cocktails-mixers') searchSlugs.push('cocktails');
            if (slug === 'food-grocery') searchSlugs.push('food', 'grocery');
            if (slug === 'food') searchSlugs.push('food-grocery');

            const category = await Category.findOne({ id: { $in: searchSlugs }, status: 'active' }).lean();
            if (!category) {
                const fallback = fallbackCategories.find(c => searchSlugs.includes(c.id));
                if (fallback) {
                    return { success: true, data: serializeDocument(fallback) };
                }
                return { success: false, error: 'Category not found' };
            }
            return { success: true, data: serializeDocument(category) };
        } catch (error: any) {
            console.error(`Error in getCategoryBySlug (${slug}), using fallback:`, error);
            const searchSlugs = [slug];
            if (slug === 'wine') searchSlugs.push('wine-champagne');
            if (slug === 'wine-champagne') searchSlugs.push('wine');
            if (slug === 'cocktails') searchSlugs.push('cocktails-mixers');
            if (slug === 'cocktails-mixers') searchSlugs.push('cocktails');
            if (slug === 'food-grocery') searchSlugs.push('food');

            const fallback = fallbackCategories.find(c => searchSlugs.includes(c.id));
            if (fallback) {
                return { success: true, data: serializeDocument(fallback) };
            }
            return { success: false, error: error.message };
        }
    },
    ['category-by-slug'],
    { revalidate: 3600, tags: ['categories'] }
);

export async function createCategory(data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        const newCategory = new Category(data);

        await newCategory.save();
        revalidateTag('categories', 'max');
        revalidatePath('/categories');
        revalidatePath('/admin/categories');
        return { success: true, data: serializeDocument(newCategory) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateCategory(id: string, data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        console.log("updateCategory received data for:", id, "mobileImage:", data.mobileImage);
        const updated = await Category.findOneAndUpdate({ id }, data, { new: true }).lean();

        console.log("Mongoose returned updated doc with mobileImage:", (updated as any)?.mobileImage);
        if (!updated) return { success: false, error: 'Category not found' };
        revalidateTag('categories', 'max');
        revalidatePath('/categories');
        revalidatePath('/admin/categories');
        return { success: true, data: serializeDocument(updated) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(id: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const deleted = await Category.findOneAndDelete({ id }).lean();

        if (!deleted) return { success: false, error: 'Category not found' };
        revalidateTag('categories', 'max');
        revalidatePath('/categories');
        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
