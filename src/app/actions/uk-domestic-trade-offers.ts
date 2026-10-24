'use server';

import dbConnect from '@/lib/db';
import UKDomesticTradeOffer, { IUKDomesticTradeOffer } from '@/models/UKDomesticTradeOffer';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ukDomesticTradeOfferSchema } from '../admin/_components/uk-domestic-trade-offers/schema';
import { requireAdmin } from '@/lib/auth';
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

// --- Create ---
export async function createUKDomesticTradeOffer(data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = ukDomesticTradeOfferSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;
        const newOffer = await UKDomesticTradeOffer.create(validData);
        revalidatePath('/admin/uk-domestic-trade-offers');
        return { success: true, data: serializeDocument(newOffer) };
    } catch (error) {
        console.error('Error creating UK domestic trade offer:', error);
        return { success: false, error: 'Failed to create UK domestic trade offer' };
    }
}

// --- Read ---
export async function getUKDomesticTradeOffers(activeOnly: boolean = false) {
    try {
        await dbConnect();
        const query = activeOnly ? { status: 'active' } : {};
        const offers = await UKDomesticTradeOffer.find(query).sort({ createdAt: -1 });
        return { success: true, data: serializeList(offers) as IUKDomesticTradeOffer[] };
    } catch (error) {
        console.error('Error fetching UK domestic trade offers:', error);
        return { success: false, error: 'Failed to fetch UK domestic trade offers' };
    }
}

export async function getUKDomesticTradeOfferById(id: string) {
    try {
        await dbConnect();
        const offer = await UKDomesticTradeOffer.findOne({ _id: id, status: 'active' });
        if (!offer) return { success: false, error: 'Offer not found' };
        return { success: true, data: serializeDocument(offer) };
    } catch (error) {
        console.error('Error fetching UK domestic trade offer:', error);
        return { success: false, error: 'Failed to fetch UK domestic trade offer' };
    }
}

export async function getAdminUKDomesticTradeOfferById(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const offer = await UKDomesticTradeOffer.findOne({ _id: id });
        if (!offer) return { success: false, error: 'Offer not found' };
        return { success: true, data: serializeDocument(offer) };
    } catch (error) {
        console.error('Error fetching UK domestic trade offer:', error);
        return { success: false, error: 'Failed to fetch UK domestic trade offer' };
    }
}
 
// --- Update ---
export async function updateUKDomesticTradeOffer(id: string, data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = ukDomesticTradeOfferSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;
        const updatedOffer = await UKDomesticTradeOffer.findByIdAndUpdate(id, validData, {
            returnDocument: 'after',
            runValidators: true,
        });
        if (!updatedOffer) return { success: false, error: 'Offer not found' };
        revalidatePath('/admin/uk-domestic-trade-offers');
        return { success: true, data: serializeDocument(updatedOffer) };
    } catch (error) {
        console.error('Error updating UK domestic trade offer:', error);
        return { success: false, error: 'Failed to update UK domestic trade offer' };
    }
}

// --- Delete ---
export async function deleteUKDomesticTradeOffer(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const deletedOffer = await UKDomesticTradeOffer.findByIdAndDelete(id);
        if (!deletedOffer) return { success: false, error: 'Offer not found' };
        revalidatePath('/admin/uk-domestic-trade-offers');
        return { success: true, message: 'Offer deleted successfully' };
    } catch (error) {
        console.error('Error deleting UK domestic trade offer:', error);
        return { success: false, error: 'Failed to delete UK domestic trade offer' };
    }
}

// --- Seed ---
export async function seedUKDomesticTradeOffers() {
    await requireAdmin();
    await dbConnect();
    try {
        const count = await UKDomesticTradeOffer.countDocuments();
        if (count > 0) {
            return { success: true, message: 'Database already has data. Skipping seed.' };
        }

        // No initial seed data file for UK Domestic Trade Offers yet.
        // Add insertMany logic here when seed data is available.
        return { success: true, message: 'No seed data available for UK Domestic Trade Offers.' };
    } catch (error) {
        console.error('Error seeding UK domestic trade offers:', error);
        return { success: false, error: 'Failed to seed database' };
    }
}
