import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UKDomesticTradeOffer from "@/models/UKDomesticTradeOffer";
import { revalidatePath } from "next/cache";

const ukDomesticTradeOffersData = [
    {
        title: "Johnnie Walker Red Label Scotch Whisky",
        sizes: ["6 x 70cl", "12 x 70cl", "12 x 1L"],
        category: ["Whiskey", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Available for immediate dispatch"],
        availability: "Ongoing",
        image: "/trade-opportunities/Johnnie Walker Red Label Scotch Whisky.webp",
        types: ["all", "uk-domestic"],
        status: "active",
    },
    {
        title: "Jägermeister Liqueur",
        sizes: ["6 x 70cl", "6 x 1L"],
        category: ["Liqueur", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Nationwide delivery available"],
        availability: "Ongoing",
        image: "/trade-opportunities/Jägermeister Liqueur.jpg",
        types: ["all", "uk-domestic"],
        status: "active",
    },
    {
        title: "Jack Daniels American Whiskey",
        sizes: ["6 x 70cl", "6 x 1L"],
        category: ["Whiskey", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Fast turnaround"],
        availability: "Ongoing",
        image: "/trade-opportunities/Jack Daniels Tennessee  American Whiskey.webp",
        types: ["all", "uk-domestic"],
        status: "active",
    },
    {
        title: "Hendricks London Dry Gin",
        sizes: ["6 x 70cl"],
        category: ["Gin", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Premium product"],
        availability: "Available",
        image: "/trade-opportunities/Hendricks London Dry Gin.webp",
        types: ["all", "uk-domestic"],
        status: "active",
    },
    {
        title: "Captain Morgan Spiced Rum",
        sizes: ["6 x 70cl", "6 x 1L"],
        category: ["Rum", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Competitive pricing"],
        availability: "Ongoing",
        image: "/trade-opportunities/Captain Morgan Spiced Rum.jpg",
        types: ["all", "uk-domestic"],
        status: "active",
    },
    {
        title: "Baileys Irish Cream Liqueur",
        sizes: ["6 x 70cl", "6 x 1L"],
        category: ["Liqueur", "Spirits"],
        market: ["UK Domestic"],
        notes: ["UK duty paid", "Seasonal demand — stock up"],
        availability: "Available",
        image: "/trade-opportunities/Baileys Irish Cream Liqueur.jpg",
        types: ["all", "uk-domestic"],
        status: "active",
    },
];

export async function GET() {
    try {
        await dbConnect();

        // Clear existing UK Domestic Trade Offers and re-seed
        await UKDomesticTradeOffer.deleteMany({});
        await UKDomesticTradeOffer.insertMany(ukDomesticTradeOffersData);

        // Revalidate relevant pages
        revalidatePath("/admin/uk-domestic-trade-offers");
        revalidatePath("/uk-domestic-trade");

        return NextResponse.json({
            success: true,
            message: "UK Domestic Trade Offers seeded successfully",
            count: ukDomesticTradeOffersData.length,
        });
    } catch (error) {
        console.error("Error seeding UK Domestic Trade Offers:", error);
        return NextResponse.json(
            { success: false, error: "Failed to seed UK Domestic Trade Offers", details: String(error) },
            { status: 500 }
        );
    }
}
