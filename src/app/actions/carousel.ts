'use server';

import dbConnect from '@/lib/db';
import Carousel, { ICarousel } from '@/models/Carousel';
import { revalidatePath } from 'next/cache';
import { heroBannerSchema } from '../admin/_components/hero-banners/schema';
import { requireAdmin } from '@/lib/auth';
import { serializeList, serializeDocument } from '@/lib/utils/serialize';

import { carouselData } from '@/components/pages/home/data/carousel.data';

export async function getCarouselItems(includeDrafts: boolean = false) {
    try {
        await dbConnect();
        const query = includeDrafts ? {} : { status: 'active' as const };
        const items = await Carousel.find(query).sort({ order: 1 }).lean();
        const serialized = serializeList(items) as ICarousel[];
        if (serialized.length === 0 && !includeDrafts) {
            return carouselData as unknown as ICarousel[];
        }
        return serialized;
    } catch (error) {
        console.error('Error fetching carousel items:', error);
        return !includeDrafts ? (carouselData as unknown as ICarousel[]) : [];
    }
}

export async function normalizeCarouselOrders() {
    await dbConnect();
    try {
        const items = await Carousel.find({}).sort({ order: 1, updatedAt: -1 });
        const bulkOps = items.map((item, index) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { order: index } },
            },
        }));
        if (bulkOps.length > 0) {
            await Carousel.bulkWrite(bulkOps);
        }
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error normalizing carousel orders:', error);
        return { success: false, error: 'Failed to normalize orders' };
    }
}

export async function createCarouselItem(data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = heroBannerSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;

        // Shift existing items if order is provided
        if (typeof validData.order === 'number') {
            await Carousel.updateMany(
                { order: { $gte: validData.order } },
                { $inc: { order: 1 } }
            );
        }

        const newItem = await Carousel.create(validData);

        // Final cleanup to ensure no gaps
        await normalizeCarouselOrders();

        revalidatePath('/');
        return { success: true, data: serializeDocument(newItem) };
    } catch (error) {
        console.error('Error creating carousel item:', error);
        return { success: false, error: 'Failed to create carousel item' };
    }
}

export async function updateCarouselItem(id: string, data: any) {
    await requireAdmin();
    await dbConnect();
    try {
        const validated = heroBannerSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const validData = validated.data;

        const currentItem = await Carousel.findById(id);
        if (!currentItem) return { success: false, error: 'Item not found' };

        // If order is changed, shift others
        if (typeof validData.order === 'number' && validData.order !== currentItem.order) {
            await Carousel.updateMany(
                { _id: { $ne: id }, order: { $gte: validData.order } },
                { $inc: { order: 1 } }
            );
        }

        const updatedItem = await Carousel.findByIdAndUpdate(id, validData, { new: true });

        // Final sequential cleanup
        await normalizeCarouselOrders();

        revalidatePath('/');
        return { success: true, data: serializeDocument(updatedItem) };
    } catch (error) {
        console.error('Error updating carousel item:', error);
        return { success: false, error: 'Failed to update carousel item' };
    }
}

export async function deleteCarouselItem(id: string) {
    await requireAdmin();
    await dbConnect();
    try {
        const deletedItem = await Carousel.findByIdAndDelete(id);
        if (!deletedItem) return { success: false, error: 'Item not found' };

        // Cleanup sequential order after deletion
        await normalizeCarouselOrders();

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error deleting carousel item:', error);
        return { success: false, error: 'Failed to delete carousel item' };
    }
}

export async function reorderCarouselItems(updates: { id: string; order: number }[]) {
    await requireAdmin();
    await dbConnect();
    try {
        const bulkOps = updates.map((update) => ({
            updateOne: {
                filter: { _id: update.id },
                update: { $set: { order: update.order } },
            },
        }));
        await Carousel.bulkWrite(bulkOps);
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error reordering carousel items:', error);
        return { success: false, error: 'Failed to reorder carousel items' };
    }
}
export async function getCarouselItemById(id: string) {
    await dbConnect();
    try {
        const item = await Carousel.findById(id).lean();
        if (!item) return { success: false, error: 'Item not found' };
        return { success: true, data: serializeDocument(item) as ICarousel };
    } catch (error) {
        console.error('Error fetching carousel item:', error);
        return { success: false, error: 'Failed to fetch carousel item' };
    }
}
