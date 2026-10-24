import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

async function clearAllBrandOwnerLogos() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        // Count total brand owners and those with logos
        const totalOwners = await BrandOwner.countDocuments({});
        const withLogos = await BrandOwner.countDocuments({ logo: { $exists: true, $ne: '' } });

        console.log(`\nFound ${totalOwners} total brand owners in DB (${withLogos} currently have logos).`);

        if (withLogos === 0) {
            console.log("ℹ️ No brand owner logos to clear.");
            process.exit(0);
        }

        // Remove logos from all BrandOwner documents (set logo to empty string '')
        const result = await BrandOwner.updateMany(
            {},
            { $set: { logo: '' } }
        );

        console.log(`\n✨ Successfully cleared logos for brand owners:`);
        console.log(`   - Matched documents: ${result.matchedCount}`);
        console.log(`   - Modified documents: ${result.modifiedCount}`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Error clearing brand owner logos:", error);
        process.exit(1);
    }
}

clearAllBrandOwnerLogos();
