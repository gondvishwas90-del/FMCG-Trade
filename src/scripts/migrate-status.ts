import "dotenv/config";
import dbConnect from "../lib/db";
import Brand from "../models/Brand";
import Category from "../models/Category";
import BrandOwner from "../models/BrandOwner";

async function migrate() {
    console.log("Starting status migration...");
    await dbConnect();

    try {
        const brandResult = await Brand.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'active' } }
        );
        console.log(`Updated ${brandResult.modifiedCount} Brands.`);

        const categoryResult = await Category.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'active' } }
        );
        console.log(`Updated ${categoryResult.modifiedCount} Categories.`);

        const ownerResult = await BrandOwner.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'active' } }
        );
        console.log(`Updated ${ownerResult.modifiedCount} BrandOwners.`);

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        process.exit(0);
    }
}

migrate();
