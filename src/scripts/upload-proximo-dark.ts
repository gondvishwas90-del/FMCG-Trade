import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';
import BrandOwner from '../models/BrandOwner';
import { uploadFile } from '../lib/storage';

async function updateProximoDark() {
    try {
        console.log("🔌 Connecting to DB...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const sourceFile = path.join(
            process.cwd(),
            'Brand Owners Logos',
            'Brand_Logos_1_Dark_Mode_2_Light_Mode',
            '1_Dark_Mode',
            'Brand_Logo__7_-removebg-preview (1).png'
        );

        if (!fs.existsSync(sourceFile)) {
            throw new Error(`Source file not found at: ${sourceFile}`);
        }

        const fileBuffer = fs.readFileSync(sourceFile);
        console.log(`Loaded source file: ${sourceFile} (${fileBuffer.length} bytes)`);

        // 1. Copy to public directory targets
        const targets = [
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', 'proximo-spirits.png'),
            path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark', '01_Proximo_Spirits.png'),
            path.join(process.cwd(), 'public', 'logos', 'proximo-spirits-dark.png')
        ];

        for (const t of targets) {
            fs.mkdirSync(path.dirname(t), { recursive: true });
            fs.copyFileSync(sourceFile, t);
            console.log(`📁 Copied to: ${t}`);
        }

        // 2. Upload to MinIO/S3 storage
        let uploadedUrl = '/brand-owners-themed/dark/proximo-spirits.png';
        try {
            console.log("📤 Uploading to MinIO/S3 storage...");
            const fileName = `proximo-spirits-dark-${Date.now()}.png`;
            uploadedUrl = await uploadFile(fileBuffer, fileName, 'brand-owners/logos');
            console.log(`✅ Uploaded to MinIO/S3: ${uploadedUrl}`);
        } catch (err) {
            console.warn("⚠️ MinIO upload failed or fallback:", (err as any)?.message);
        }

        // 3. Find and update BrandOwner in MongoDB (logoDark)
        const filter = {
            $or: [
                { id: 'proximo-spirits' },
                { id: 'proximo' },
                { name: { $regex: /proximo/i } },
                { name: { $regex: /promximo/i } }
            ]
        };

        const existingOwners = await BrandOwner.find(filter);
        console.log(`Found ${existingOwners.length} matching BrandOwner(s):`, existingOwners.map(o => ({ id: o.id, name: o.name, logoDark: o.logoDark })));

        const updatedOwner = await BrandOwner.updateMany(
            filter,
            { $set: { logoDark: uploadedUrl } }
        );

        console.log(`✅ Updated ${updatedOwner.modifiedCount} BrandOwner record(s) with logoDark: ${uploadedUrl}`);

        // Fetch updated to show result
        const currentOwners = await BrandOwner.find(filter);
        currentOwners.forEach(owner => {
            console.log("Updated BrandOwner Record:", {
                id: owner.id,
                name: owner.name,
                logo: owner.logo,
                logoDark: owner.logoDark,
                logoLight: owner.logoLight
            });
        });

        // 4. Update Brand in MongoDB if it exists
        const updatedBrands = await Brand.updateMany(
            filter,
            { $set: { logoDark: uploadedUrl } }
        );
        console.log(`✅ Updated ${updatedBrands.modifiedCount} Brand record(s) with logoDark.`);

        console.log("\n🎉 Proximo Spirits dark theme logo updated successfully in database!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error updating Proximo Spirits logo:", err);
        process.exit(1);
    }
}

updateProximoDark();
