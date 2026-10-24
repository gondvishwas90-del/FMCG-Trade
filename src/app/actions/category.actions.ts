'use server';

import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

export async function getCategories() {
    try {
        await dbConnect();
        const categories = await Category.find({ status: 'active' }).lean();
        return { success: true, data: serializeList(categories) };
    } catch (error: any) {
        console.error("Error in getCategories:", error);
        return { success: false, error: error.message };
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
            const category = await Category.findOne({ id: slug, status: 'active' }).lean();
            if (!category) return { success: false, error: 'Category not found' };
            return { success: true, data: serializeDocument(category) };
        } catch (error: any) {
            console.error(`Error in getCategoryBySlug (${slug}):`, error);
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
