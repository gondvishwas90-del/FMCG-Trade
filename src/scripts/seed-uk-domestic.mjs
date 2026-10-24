// Standalone seed script for UK Domestic Trade Offers
// Run with: node src/scripts/seed-uk-domestic.mjs

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
dotenv.config({ path: resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
}

const UKDomesticTradeOfferSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        sizes: { type: [String], default: [] },
        category: { type: [String], default: [] },
        market: { type: [String], default: [] },
        notes: { type: [String], default: [] },
        availability: { type: String, required: true },
        image: { type: String, required: true },
        types: { type: [String], default: [] },
        status: { type: String, enum: ['active', 'draft'], default: 'draft' },
    },
    { timestamps: true }
);

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

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const UKDomesticTradeOffer = mongoose.model('UKDomesticTradeOffer', UKDomesticTradeOfferSchema);

        // Clear existing data
        const deleted = await UKDomesticTradeOffer.deleteMany({});
        console.log(`🗑️  Cleared ${deleted.deletedCount} existing UK Domestic Trade Offers`);

        // Insert new data
        const inserted = await UKDomesticTradeOffer.insertMany(ukDomesticTradeOffersData);
        console.log(`✅ Seeded ${inserted.length} UK Domestic Trade Offers:`);
        inserted.forEach((offer, i) => {
            console.log(`   ${i + 1}. ${offer.title} (${offer.status})`);
        });

        console.log('\n🎉 Seed completed successfully!');
    } catch (error) {
        console.error('❌ Seed failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

seed();
