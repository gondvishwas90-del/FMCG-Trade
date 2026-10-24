import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TradeOffer from "@/models/TradeOffer";
import Carousel from "@/models/Carousel";
import { tradeOffers } from "@/components/pages/trade-opportunities/data/trade-offers.data";
import { carouselData } from "@/components/pages/home/data/carousel.data";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        await dbConnect();

        // 1. Seed Trade Offers
        await TradeOffer.deleteMany({});
        const tradeSeedData = tradeOffers.map((offer) => ({
            title: offer.title,
            sizes: offer.sizes,
            category: offer.category,
            market: offer.market,
            notes: offer.notes,
            availability: offer.availability,
            image: offer.image,
            types: offer.types,
            status: 'active',
        }));
        await TradeOffer.insertMany(tradeSeedData);

        // 2. Seed Carousel (Hero Banners)
        await Carousel.deleteMany({});
        const carouselSeedData = carouselData.map((item, index) => ({
            title: item.title,
            subtitle: item.subtitle,
            cta: item.cta,
            layout: item.layout,
            image: item.image,
            order: index,
            status: 'active',
        }));
        await Carousel.insertMany(carouselSeedData);

        // Revalidate key pages
        revalidatePath('/');
        revalidatePath('/trade-opportunities');
        revalidatePath('/admin/hero-banners');
        revalidatePath('/admin/trade-offers');

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully",
            counts: {
                tradeOffers: tradeSeedData.length,
                carousel: carouselSeedData.length
            }
        });
    } catch (error) {
        console.error("Error seeding database:", error);
        return NextResponse.json(
            { success: false, error: "Failed to seed database", details: String(error) },
            { status: 500 }
        );
    }
}
