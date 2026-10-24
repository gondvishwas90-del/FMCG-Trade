'use server';

import dbConnect from "@/lib/db";
import BrandOwner from "@/models/BrandOwner";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

export async function getBrandOwners() {
    try {
        await dbConnect();
        const owners = await BrandOwner.find({ status: 'active' }).sort({ name: 1 }).lean();
        return { success: true, data: serializeList(owners) };
    } catch (error: any) {
        console.error("Error in getBrandOwners:", error);
        return { success: false, error: error.message };
    }
}

export async function getAllBrandOwners() {
    try {
        await requireAdmin();
        await dbConnect();
        const owners = await BrandOwner.find({}).sort({ name: 1 }).lean();

        return { success: true, data: serializeList(owners) };
    } catch (error: any) {
        console.error("Error in getAllBrandOwners:", error);
        return { success: false, error: error.message };
    }
}
 
export async function getAdminBrandOwnerById(id: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const owner = await BrandOwner.findOne({ id }).lean();
        if (!owner) return { success: false, error: 'Brand Owner not found' };
        return { success: true, data: serializeDocument(owner) };
    } catch (error: any) {
        console.error(`Error in getAdminBrandOwnerById (${id}):`, error);
        return { success: false, error: error.message };
    }
}

export async function getBrandOwnerById(id: string) {
    try {
        await dbConnect();
        const owner = await BrandOwner.findOne({ id, status: 'active' }).lean();
        if (!owner) return { success: false, error: 'Brand Owner not found' };
        return { success: true, data: serializeDocument(owner) };
    } catch (error: any) {
        console.error(`Error in getBrandOwnerById (${id}):`, error);
        return { success: false, error: error.message };
    }
}

export async function createBrandOwner(data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        const newOwner = new BrandOwner(data);

        await newOwner.save();
        revalidateTag('brands', 'max'); // Revalidate brands as they link to owners
        revalidatePath('/admin/brand-owners');
        return { success: true, data: serializeDocument(newOwner) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBrandOwner(id: string, data: any) {
    try {
        await requireAdmin();
        await dbConnect();
        const updated = await BrandOwner.findOneAndUpdate({ id }, data, { new: true }).lean();

        if (!updated) return { success: false, error: 'Brand Owner not found' };
        revalidateTag('brands', 'max');
        revalidatePath('/admin/brand-owners');
        revalidatePath(`/admin/brand-owners/${id}`);
        return { success: true, data: serializeDocument(updated) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBrandOwner(id: string) {
    try {
        await requireAdmin();
        await dbConnect();
        const deleted = await BrandOwner.findOneAndDelete({ id }).lean();

        if (!deleted) return { success: false, error: 'Brand Owner not found' };
        revalidateTag('brands', 'max');
        revalidatePath('/admin/brand-owners');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
