import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

// Mapping from exact database owner ID or normalized name to Category
const BRAND_OWNER_CATEGORY_MAPPING: Record<string, string> = {
    // Spirits
    "bacardi-ltd.": "Spirits",
    "brown-forman": "Spirits",
    "campari-group": "Spirits",
    "diageo": "Spirits",
    "edrington": "Spirits",
    "kweichow-moutai": "Spirits",
    "pernod-ricard": "Spirits",
    "proximo-spirits": "Spirits",
    "remy-cointreau": "Spirits",
    "suntory": "Spirits",
    "beam-suntory": "Spirits",
    "william-grant-and-sons": "Spirits",
    "sazerac-company": "Spirits",
    "independent-world-liquors": "Spirits",

    // Beers & Cider
    "asahi-uk": "Beers & Cider",
    "carlsberg-marstons-brewing-company": "Beers & Cider",
    "heineken-uk": "Beers & Cider",
    "molson-coors-uk": "Beers & Cider",
    "ab-inbev-budweiser-brewing-group-uk": "Beers & Cider",
    "diageo-(beer-division)": "Beers & Cider",
    "world-beers": "Beers & Cider",
    "polish-beers": "Beers & Cider",

    // Food & Grocery
    "danone": "Food & Grocery",
    "kellogg’s": "Food & Grocery",
    "kelloggs": "Food & Grocery",
    "kraft-heinz": "Food & Grocery",
    "mars-wrigley": "Food & Grocery",
    "mondelez": "Food & Grocery",
    "nestle": "Food & Grocery",
    "pladis-(mcvitie-s)": "Food & Grocery",
    "premier-foods": "Food & Grocery",
    "unilever": "Food & Grocery",
    "hipp/kendamil/organix/ella’s": "Food & Grocery",

    // Wine & Champagne
    "constellation-brands": "Wine & Champagne",
    "lvmh-(moet-hennessy)": "Wine & Champagne",

    // Cocktails & Mixers
    "fever-tree": "Cocktails & Mixers",
    "coca-cola": "Cocktails & Mixers",
    "pepsico": "Cocktails & Mixers",
    "red-bull-gmbh": "Cocktails & Mixers",
};

async function updateBrandOwnerCategories() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const brandOwners = await BrandOwner.find({}).lean();
        console.log(`\nFound ${brandOwners.length} total Brand Owners in database.\n`);

        let updatedCount = 0;

        for (const owner of brandOwners) {
            const category = BRAND_OWNER_CATEGORY_MAPPING[owner.id] || BRAND_OWNER_CATEGORY_MAPPING[owner.id.trim()];

            if (category) {
                await BrandOwner.updateOne(
                    { _id: owner._id },
                    { $set: { category } }
                );
                console.log(`✅ Updated owner [${owner.id}] "${owner.name}" => Category: "${category}"`);
                updatedCount++;
            } else {
                console.log(`ℹ️ Owner [${owner.id}] "${owner.name}" left unchanged (Category: "${owner.category || 'General'}")`);
            }
        }

        console.log("\n==========================================");
        console.log(`🎉 Successfully updated categories for ${updatedCount} Brand Owners!`);
        console.log("==========================================\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error updating brand owner categories:", error);
        process.exit(1);
    }
}

updateBrandOwnerCategories();
