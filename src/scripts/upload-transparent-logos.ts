import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';
import { uploadFile } from '../lib/storage';

async function uploadLogos() {
    try {
        await dbConnect();
        console.log("Connected to MongoDB & MinIO Storage.");

        const dir = path.join(process.cwd(), 'Brand Owners Logos', 'transparent');
        if (!fs.existsSync(dir)) {
            console.error("Transparent directory not found!");
            process.exit(1);
        }

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
        console.log(`Found ${files.length} transparent logo files ready for upload.`);

        const owners = await BrandOwner.find({}).lean();
        console.log(`Found ${owners.length} brand owners in database.`);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const fileBuffer = fs.readFileSync(filePath);

            // Upload file to MinIO storage
            const publicUrl = await uploadFile(fileBuffer, file, 'brand-owners/logos');
            console.log(`Uploaded "${file}" => ${publicUrl}`);
        }

        console.log("\nAll 28 transparent logo images have been uploaded to MinIO storage!");
        process.exit(0);
    } catch (err: any) {
        console.error("Upload error:", err.message || err);
        process.exit(1);
    }
}

uploadLogos();
