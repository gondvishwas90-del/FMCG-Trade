import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';
import { uploadFile } from '../lib/storage';

async function uploadPepsiLogo() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const sourceFile = path.join(process.cwd(), 'Brand Owners Logos', 'Brand Logo (3).png');
        if (!fs.existsSync(sourceFile)) {
            throw new Error(`Source file not found at ${sourceFile}`);
        }

        const fileBuffer = fs.readFileSync(sourceFile);

        // Also copy to public directories for local static availability
        const publicLogosDir = path.join(process.cwd(), 'public', 'logos');
        fs.mkdirSync(publicLogosDir, { recursive: true });
        fs.copyFileSync(sourceFile, path.join(publicLogosDir, 'pepsi.png'));
        console.log(`📁 Copied to public/logos/pepsi.png`);

        let logoUrl = '/logos/pepsi.png';

        try {
            console.log("📤 Attempting to upload to MinIO/S3 storage...");
            const fileName = `pepsi-${Date.now()}.png`;
            logoUrl = await uploadFile(fileBuffer, fileName, 'brands/logos');
            console.log(`✅ Uploaded to MinIO/S3: ${logoUrl}`);
        } catch (storageErr) {
            console.warn(`⚠️ MinIO upload skipped or failed (${(storageErr as any)?.message}). Using local path: ${logoUrl}`);
        }

        // Update Pepsi brand in MongoDB
        const result = await Brand.findOneAndUpdate(
            { id: 'pepsi' },
            { $set: { image: logoUrl } },
            { new: true }
        );

        if (result) {
            console.log(`🎉 Successfully updated Pepsi Brand in MongoDB!`);
            console.log(`   Brand Name: ${result.name}`);
            console.log(`   Brand ID: ${result.id}`);
            console.log(`   New Image URL: ${result.image}`);
        } else {
            console.warn(`⚠️ Could not find Brand with id='pepsi'. Searching by name...`);
            const nameResult = await Brand.findOneAndUpdate(
                { name: { $regex: /^pepsi$/i } },
                { $set: { image: logoUrl } },
                { new: true }
            );
            if (nameResult) {
                console.log(`🎉 Successfully updated Pepsi Brand (by name) in MongoDB!`);
                console.log(`   Brand Name: ${nameResult.name}`);
                console.log(`   New Image URL: ${nameResult.image}`);
            } else {
                console.error(`❌ No Pepsi brand found to update.`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error uploading Pepsi logo:", error);
        process.exit(1);
    }
}

uploadPepsiLogo();
