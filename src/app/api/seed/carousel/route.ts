import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Carousel from "@/models/Carousel";
import { carouselData } from "@/components/pages/home/data/carousel.data";

export async function GET() {
    try {
        await dbConnect();

        // Optional: Clear existing data
        await Carousel.deleteMany({});

        // Transform data to match Mongoose schema
        // carouselData has numeric IDs, we'll let MongoDB generate _id
        const seedData = carouselData.map((item, index) => ({
            title: item.title,
            subtitle: item.subtitle,
            cta: item.cta,
            layout: item.layout,
            image: item.image,
            order: index, // Use index for initial order
            status: 'active',
        }));

        await Carousel.insertMany(seedData);

        return NextResponse.json({
            message: "Carousel database seeded successfully",
            count: seedData.length,
            data: seedData
        });
    } catch (error) {
        console.error("Error seeding carousel database:", error);
        return NextResponse.json(
            { error: "Failed to seed carousel database", details: String(error) },
            { status: 500 }
        );
    }
}
