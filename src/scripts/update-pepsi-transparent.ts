import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';
import BrandOwner from '../models/BrandOwner';
import { uploadFile } from '../lib/storage';

async function updatePepsiTransparent() {
    try {
        console.log("🔌 Connecting to DB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const sourceFile = path.join(process.cwd(), 'Brand Owners Logos', 'Brand Logo (3).png');
        if (!fs.existsSync(sourceFile)) {
            throw new Error(`File not found: ${sourceFile}`);
        }

        const fileBuffer = fs.readFileSync(sourceFile);
        console.log(`Loaded source file: ${sourceFile} (${fileBuffer.length} bytes)`);

        // 1. Copy to public directory targets
        const targets = [
            path.join(process.cwd(), 'public', 'logos', 'pepsi.png'),
            path.join(process.cwd(), 'public', 'logos', 'pepsico.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', 'pepsi.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'light', 'pepsi.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', 'pepsico.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'light', 'pepsico.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', '09_PepsiCo.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'light', '09_PepsiCo.png'),
        ];

        for (const t of targets) {
            fs.mkdirSync(path.dirname(t), { recursive: true });
            fs.copyFileSync(sourceFile, t);
            console.log(`📁 Copied to: ${t}`);
        }

        // 2. Upload to S3/MinIO
        let publicStorageUrl = '/logos/pepsi.png';
        try {
            console.log("📤 Uploading transparent logo to storage...");
            const fileName = `pepsi-${Date.now()}.png`;
            publicStorageUrl = await uploadFile(fileBuffer, fileName, 'brands/logos');
            console.log(`✅ Uploaded to MinIO/S3: ${publicStorageUrl}`);
        } catch (err) {
            console.warn("⚠️ MinIO upload fallback to local path:", (err as any)?.message);
        }

        // 3. Update Brand in MongoDB
        const updatedBrand = await Brand.findOneAndUpdate(
            { $or: [{ id: 'pepsi' }, { name: { $regex: /^pepsi$/i } }] },
            { $set: { image: publicStorageUrl } },
            { returnDocument: 'after' }
        );
        console.log(`✅ Updated Brand [Pepsi]:`, updatedBrand?.image);

        // 4. Update BrandOwner in MongoDB
        const updatedOwner = await BrandOwner.findOneAndUpdate(
            { $or: [{ id: 'pepsico' }, { name: { $regex: /pepsi/i } }] },
            {
                $set: {
                    logo: publicStorageUrl,
                    logoDark: publicStorageUrl,
                    logoLight: publicStorageUrl
                }
            },
            { returnDocument: 'after' }
        );
        console.log(`✅ Updated BrandOwner [PepsiCo]:`, {
            id: updatedOwner?.id,
            name: updatedOwner?.name,
            logo: updatedOwner?.logo,
            logoDark: updatedOwner?.logoDark,
            logoLight: updatedOwner?.logoLight
        });

        console.log("\n🎉 All Pepsi brand and owner logos successfully updated with transparent asset!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error updating Pepsi logo:", err);
        process.exit(1);
    }
}

updatePepsiTransparent();
