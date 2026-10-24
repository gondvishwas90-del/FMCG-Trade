import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Prefer .env.production if it exists, otherwise fallback to ex.env
const prodEnvPath = path.resolve(process.cwd(), ".env.production");
const exEnvPath = path.resolve(process.cwd(), "ex.env");

if (fs.existsSync(prodEnvPath)) {
    dotenv.config({ path: prodEnvPath });
    console.log("Loaded .env.production");
} else if (fs.existsSync(exEnvPath)) {
    dotenv.config({ path: exEnvPath });
    console.log("Loaded ex.env");
} else {
    dotenv.config();
    console.log("Loaded default .env");
}

import Brand from "../src/models/Brand";
import Category from "../src/models/Category";

async function migrate() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("Error: MONGODB_URI is not defined in the environment.");
        process.exit(1);
    }

    console.log(`Connecting to MongoDB...`);
    
    try {
        await mongoose.connect(uri);
        console.log("Connected successfully to production database.");

        console.log("Migrating Brands...");
        const brands = await Brand.find({});
        let brandUpdated = 0;
        
        for (const brand of brands) {
            let changed = false;
            // The Mongoose schema should automatically apply defaults to undefined fields
            // when the document is instantiated. We'll explicitly check and assign to be safe.
            if (brand.backgroundImage === undefined) {
                brand.backgroundImage = "";
                changed = true;
            }
            if (brand.mobileBackgroundImage === undefined) {
                brand.mobileBackgroundImage = "";
                changed = true;
            }
            
            // If we just save, Mongoose will also persist the new schema structure
            await brand.save();
            brandUpdated++;
        }
        console.log(`Brands processed: ${brandUpdated}/${brands.length}`);

        console.log("Migrating Categories (with Date repair)...");
        const categories = await Category.find({}).lean();
        let catUpdated = 0;

        for (let cat of categories) {
            let changed = false;

            // Fix corrupted dates if imported from JSON incorrectly
            if (cat.createdAt && (cat.createdAt as any).$date) {
                cat.createdAt = new Date((cat.createdAt as any).$date);
                changed = true;
            }
            if (cat.updatedAt && (cat.updatedAt as any).$date) {
                cat.updatedAt = new Date((cat.updatedAt as any).$date);
                changed = true;
            }

            // Set default image fields
            if (cat.mobileImage === undefined) { cat.mobileImage = ""; changed = true; }
            if (cat.mobileBackgroundImage === undefined) { cat.mobileBackgroundImage = ""; changed = true; }

            if (cat.tier2) {
                for (let t2 of cat.tier2) {
                    if ((t2 as any).mobileImage === undefined) { (t2 as any).mobileImage = ""; changed = true; }
                    if ((t2 as any).mobileBackgroundImage === undefined) { (t2 as any).mobileBackgroundImage = ""; changed = true; }
                    
                    if (t2.tier3) {
                        for (let t3 of t2.tier3) {
                            if ((t3 as any).mobileImage === undefined) { (t3 as any).mobileImage = ""; changed = true; }
                            if ((t3 as any).mobileBackgroundImage === undefined) { (t3 as any).mobileBackgroundImage = ""; changed = true; }
                        }
                    }
                }
            }

            // Write back to DB bypassing Mongoose validation to allow date repair
            if (changed) {
                await Category.collection.replaceOne({ _id: cat._id as any }, cat);
                catUpdated++;
            }
        }
        console.log(`Categories processed: ${catUpdated}/${categories.length}`);

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

migrate();
