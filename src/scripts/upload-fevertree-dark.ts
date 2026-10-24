import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';
import BrandOwner from '../models/BrandOwner';
import { uploadFile } from '../lib/storage';

async function updateFeverTreeDark() {
    try {
        console.log("🔌 Connecting to DB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const sourceFile = path.join(
            process.cwd(),
            'Brand Owners Logos',
            'Brand_Logos_1_Dark_Mode_2_Light_Mode',
            '1_Dark_Mode',
            'Brand Logo (4) 1.png'
        );

        if (!fs.existsSync(sourceFile)) {
            throw new Error(`Source file not found at: ${sourceFile}`);
        }

        const fileBuffer = fs.readFileSync(sourceFile);
        console.log(`Loaded source file: ${sourceFile} (${fileBuffer.length} bytes)`);

        // 1. Copy to public directory
        const targets = [
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', 'fever-tree.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', '10_Fever_Tree.png'),
            path.join(process.cwd(), 'public', 'logos', 'fever-tree-dark.png')
        ];

        for (const t of targets) {
            fs.mkdirSync(path.dirname(t), { recursive: true });
            fs.copyFileSync(sourceFile, t);
            console.log(`📁 Copied to: ${t}`);
        }

        // 2. Upload to storage
        let uploadedUrl = '/brand-owners-themed/dark/fever-tree.png';
        try {
            console.log("📤 Uploading to MinIO/S3 storage...");
            const fileName = `fever-tree-dark-${Date.now()}.png`;
            uploadedUrl = await uploadFile(fileBuffer, fileName, 'brand-owners/logos');
            console.log(`✅ Uploaded to MinIO/S3: ${uploadedUrl}`);
        } catch (err) {
            console.warn("⚠️ MinIO upload failed or fallback:", (err as any)?.message);
        }

        // 3. Update BrandOwner in MongoDB (logoDark)
        const updatedOwner = await BrandOwner.findOneAndUpdate(
            { $or: [{ id: 'fever-tree' }, { name: { $regex: /fever-?tree/i } }] },
            { $set: { logoDark: uploadedUrl } },
            { returnDocument: 'after' }
        );

        console.log("✅ Updated BrandOwner [Fever-Tree]:", {
            id: updatedOwner?.id,
            name: updatedOwner?.name,
            logo: updatedOwner?.logo,
            logoDark: updatedOwner?.logoDark,
            logoLight: updatedOwner?.logoLight
        });

        // 4. Update Brand in MongoDB if it exists
        const updatedBrand = await Brand.findOneAndUpdate(
            { $or: [{ id: 'fever-tree' }, { name: { $regex: /fever-?tree/i } }] },
            { $set: { logoDark: uploadedUrl } },
            { returnDocument: 'after' }
        );

        if (updatedBrand) {
            console.log("✅ Updated Brand [Fever-Tree]:", {
                id: updatedBrand.id,
                name: updatedBrand.name,
                image: updatedBrand.image
            });
        }

        console.log("\n🎉 Fever-Tree dark theme logo updated successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error updating Fever-Tree logo:", err);
        process.exit(1);
    }
}

updateFeverTreeDark();
