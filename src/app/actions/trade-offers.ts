'use server';

import dbConnect from '@/lib/db';
import TradeOffer, { ITradeOffer } from '@/models/TradeOffer';
import { tradeOffers as initialTradeOffers } from '@/components/pages/trade-opportunities/data/trade-offers.data';
import { revalidatePath, revalidateTag } from 'next/cache';
import { tradeOfferSchema } from '../admin/_components/trade-offers/schema';
import { requireAdmin } from '@/lib/auth';
import { serializeList, serializeDocument } from "@/lib/utils/serialize";

// --- Create ---
export async function createTradeOffer(data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = tradeOfferSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;
        const newOffer = await TradeOffer.create(validData);
        revalidatePath('/admin/trade-offers'); // Adjust path as needed
        return { success: true, data: serializeDocument(newOffer) };
    } catch (error) {
        console.error('Error creating trade offer:', error);
        return { success: false, error: 'Failed to create trade offer' };
    }
}

// --- Read ---
export async function getTradeOffers(activeOnly: boolean = false) {
    try {
        await dbConnect();
        const query = activeOnly ? { status: 'active' } : {};
        const offers = await TradeOffer.find(query).sort({ createdAt: -1 });
        return { success: true, data: serializeList(offers) as ITradeOffer[] };
    } catch (error) {
        console.error('Error fetching trade offers:', error);
        return { success: false, error: 'Failed to fetch trade offers' };
    }
}

export async function getTradeOfferById(id: string) {
    try {
        await dbConnect();
        const offer = await TradeOffer.findOne({ _id: id, status: 'active' });
        if (!offer) return { success: false, error: 'Offer not found' };
        return { success: true, data: serializeDocument(offer) };
    } catch (error) {
        console.error('Error fetching trade offer:', error);
        return { success: false, error: 'Failed to fetch trade offer' };
    }
}

export async function getAdminTradeOfferById(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const offer = await TradeOffer.findOne({ _id: id });
        if (!offer) return { success: false, error: 'Offer not found' };
        return { success: true, data: serializeDocument(offer) };
    } catch (error) {
        console.error('Error fetching trade offer:', error);
        return { success: false, error: 'Failed to fetch trade offer' };
    }
}
 
// --- Update ---
export async function updateTradeOffer(id: string, data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = tradeOfferSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;
        const updatedOffer = await TradeOffer.findByIdAndUpdate(id, validData, {
            returnDocument: 'after',
            runValidators: true,
        });
        if (!updatedOffer) return { success: false, error: 'Offer not found' };
        revalidatePath('/admin/trade-offers');
        return { success: true, data: serializeDocument(updatedOffer) };
    } catch (error) {
        console.error('Error updating trade offer:', error);
        return { success: false, error: 'Failed to update trade offer' };
    }
}

// --- Delete ---
export async function deleteTradeOffer(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const deletedOffer = await TradeOffer.findByIdAndDelete(id);
        if (!deletedOffer) return { success: false, error: 'Offer not found' };
        revalidatePath('/admin/trade-offers');
        return { success: true, message: 'Offer deleted successfully' };
    } catch (error) {
        console.error('Error deleting trade offer:', error);
        return { success: false, error: 'Failed to delete trade offer' };
    }
}

// --- Seed ---
export async function seedTradeOffers() {
    await requireAdmin();
    await dbConnect();
    try {
        // Optional: Clear existing data before seeding
        // await TradeOffer.deleteMany({}); 

        // Check if data already exists to avoid duplicates if running multiple times without clear
        const count = await TradeOffer.countDocuments();
        if (count > 0) {
            return { success: true, message: 'Database already has data. Skipping seed.' };
        }

        const offersToInsert = initialTradeOffers.map(offer => {
            // remove the string 'id' from the data as mongo uses _id (ObjectId)
            // or keep it if we want to preserve the original ID as a field
            const { id, ...rest } = offer;
            return rest;
        });

        await TradeOffer.insertMany(offersToInsert);
        revalidatePath('/admin/trade-offers');
        return { success: true, message: 'Database seeded successfully' };
    } catch (error) {
        console.error('Error seeding trade offers:', error);
        return { success: false, error: 'Failed to seed database' };
    }
}
