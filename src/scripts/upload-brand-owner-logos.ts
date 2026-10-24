import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';
import { uploadFile } from '../lib/storage';

// Helper function to turn strings into clean slugs for comparison
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/['’]/g, '')                // Remove apostrophes
        .replace(/[^a-z0-9]+/g, '-')          // Replace non-alphanumeric chars with hyphen
        .replace(/^-+|-+$/g, '');             // Trim leading/trailing hyphens
}

// Manual alias dictionary for file names that might not directly match owner IDs
const ALIAS_MAP: Record<string, string[]> = {
    'asahi-uk': ['asahi', 'asahi-uk'],
    'bacardi-ltd': ['bacardi', 'bacardi-ltd'],
    'brown-forman': ['brown-forman', 'brown-forman-corporation'],
    'campari-group': ['campari', 'campari-group'],
    'carlsberg-marstons-brewing-company': ['carlsberg', 'carlsberg-marstons', 'carlsberg-marstons-brewing-company'],
    'coca-cola': ['coca-cola', 'the-coca-cola-company'],
    'heineken-uk': ['heineken', 'heineken-uk'],
    'kraft-heinz': ['kraft-heinz', 'the-kraft-heinz-company'],
    'lvmh-moet-hennessy': ['lvmh', 'moet-hennessy', 'lvmh-moet-hennessy'],
    'mars-wrigley': ['mars', 'mars-wrigley'],
    'molson-coors-uk': ['molson-coors', 'molson-coors-uk'],
    'mondelez': ['mondelez', 'mondelez-international'],
    'pladis-mcvities': ['pladis', 'pladis-mcvities'],
    'red-bull-gmbh': ['red-bull', 'red-bull-gmbh'],
    'suntory': ['suntory', 'beam-suntory'],
    'william-grant-sons': ['william-grant-sons', 'william-grant-and-sons'],
    'kelloggs': ['kelloggs', 'kellogg', 'kellanova'],
    'kweichow-moutai': ['kweichow-moutai', 'moutai']
};

async function uploadBrandOwnerLogos() {
    try {
        console.log("🔌 Connecting to MongoDB & Storage...");
        await dbConnect();
        console.log("✅ Connected to MongoDB");

        const logosDir = path.join(process.cwd(), 'Brand Owners Logos');
        if (!fs.existsSync(logosDir)) {
            console.error(`❌ Directory not found at: ${logosDir}`);
            process.exit(1);
        }

        const files = fs.readdirSync(logosDir).filter(f => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
        console.log(`\nFound ${files.length} logo files in "${logosDir}" ready for processing.`);

        const brandOwners = await BrandOwner.find({}).lean();
        console.log(`Found ${brandOwners.length} Brand Owners in MongoDB.\n`);

        let uploadedCount = 0;
        let matchedCount = 0;
        const unmatchedFiles: string[] = [];

        for (const file of files) {
            const ext = path.extname(file);
            const rawBaseName = path.basename(file, ext).trim();
            const fileSlug = slugify(rawBaseName);
            const filePath = path.join(logosDir, file);

            // Find matching brand owner in DB
            const targetOwner = brandOwners.find(owner => {
                const ownerSlug = slugify(owner.id || '');
                const ownerNameSlug = slugify(owner.name || '');

                // 1. Direct slug match
                if (fileSlug === ownerSlug || fileSlug === ownerNameSlug) return true;

                // 2. Direct name match (case insensitive)
                if (rawBaseName.toLowerCase() === owner.name.toLowerCase()) return true;

                // 3. Alias dictionary match
                const aliases = ALIAS_MAP[ownerSlug] || [];
                if (aliases.includes(fileSlug)) return true;

                // 4. Substring / inclusion match (e.g. "Heineken UK" vs "Heineken")
                if (fileSlug.includes(ownerSlug) || ownerSlug.includes(fileSlug)) return true;
                if (fileSlug.includes(ownerNameSlug) || ownerNameSlug.includes(fileSlug)) return true;

                return false;
            });

            if (!targetOwner) {
                console.warn(`⚠️ No matching BrandOwner found in DB for file: "${file}" (slug: ${fileSlug})`);
                unmatchedFiles.push(file);
                continue;
            }

            console.log(`📤 Uploading "${file}" for BrandOwner: "${targetOwner.name}" (ID: ${targetOwner.id})...`);
            
            const fileBuffer = fs.readFileSync(filePath);
            // Upload to MinIO / S3 storage under folder 'brand-owners/logos'
            const publicUrl = await uploadFile(fileBuffer, file, 'brand-owners/logos');
            uploadedCount++;

            // Update MongoDB record with uploaded logo URL
            await BrandOwner.updateOne(
                { _id: targetOwner._id },
                { $set: { logo: publicUrl } }
            );

            console.log(`✅ Updated "${targetOwner.name}" => logo: ${publicUrl}\n`);
            matchedCount++;
        }

        console.log("==========================================");
        console.log(`🎉 Processing complete!`);
        console.log(`   - Files processed: ${files.length}`);
        console.log(`   - Uploaded & Matched: ${matchedCount}`);
        if (unmatchedFiles.length > 0) {
            console.log(`   - Unmatched files (${unmatchedFiles.length}): ${unmatchedFiles.join(', ')}`);
        }
        console.log("==========================================\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error uploading brand owner logos:", error);
        process.exit(1);
    }
}

uploadBrandOwnerLogos();
