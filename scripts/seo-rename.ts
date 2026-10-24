import 'dotenv/config';
import mongoose from 'mongoose';
import * as Minio from 'minio';
import Brand from '../src/models/Brand';
import Category from '../src/models/Category';
import Carousel from '../src/models/Carousel';

// Use production settings if available in the environment or .env.production
const MONGODB_URI = process.env.MONGODB_URI;

// Helper to get env from production file if needed
const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'localhost';
const MINIO_PORT = parseInt(process.env.MINIO_PORT || '9100');
const MINIO_USE_SSL = process.env.MINIO_USE_SSL === 'true';
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'admin';
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'password';
const BUCKET_NAME = process.env.MINIO_BUCKET || 'fmcg-media';

// Public endpoint for constructing new URLs
const PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT || (MINIO_USE_SSL ? `https://${MINIO_ENDPOINT}` : `http://${MINIO_ENDPOINT}:${MINIO_PORT}`);

const minioClient = new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
});

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

const processedMap = new Map<string, string>();
const filesToDelete = new Set<string>();

async function getNewPath(oldUrl: string, newTitle: string, folder: string): Promise<{ oldPath: string, newPath: string, newUrl: string } | null> {
    if (!oldUrl) return null;

    try {
        const urlObj = new URL(oldUrl);
        let oldPath = urlObj.pathname;
        if (oldPath.startsWith('/')) oldPath = oldPath.slice(1);
        
        // Remove bucket name from path if it's there
        if (oldPath.startsWith(BUCKET_NAME + '/')) {
            oldPath = oldPath.replace(BUCKET_NAME + '/', '');
        } else if (oldPath.includes(BUCKET_NAME)) {
             // Handle proxy URLs or different structures
             const parts = oldPath.split(BUCKET_NAME + '/');
             if (parts.length > 1) oldPath = parts[1];
        }

        const ext = oldPath.split('.').pop()?.split('?')[0].toLowerCase() || 'jpg';
        const newFileName = `${slugify(newTitle)}.${ext}`;
        const newPath = `${folder}/${newFileName}`;
        
        // Ensure the public endpoint has the bucket name correctly
        let finalBase = PUBLIC_ENDPOINT.replace(/\/$/, '');
        if (!finalBase.includes(BUCKET_NAME)) {
            finalBase += `/${BUCKET_NAME}`;
        }
        
        const newUrl = `${finalBase}/${newPath}`;

        return { oldPath, newPath, newUrl };
    } catch (e) {
        return null;
    }
}

async function processImage(oldUrl: string, newTitle: string, folder: string): Promise<string | null> {
    const paths = await getNewPath(oldUrl, newTitle, folder);
    if (!paths) return null;
    const { oldPath, newPath, newUrl } = paths;

    // Remove any query params from paths for MinIO operations
    const cleanOldPath = oldPath.split('?')[0];
    const cleanNewPath = newPath.split('?')[0];

    if (cleanOldPath === cleanNewPath) return oldUrl;

    if (processedMap.has(cleanOldPath)) {
        return processedMap.get(cleanOldPath)!;
    }

    try {
        // 1. Verify source exists
        try {
            await minioClient.statObject(BUCKET_NAME, cleanOldPath);
        } catch (e) {
            // Check if it already exists at destination
            try {
                await minioClient.statObject(BUCKET_NAME, cleanNewPath);
                return newUrl;
            } catch (e2) {
                console.log(`⚠️ Skip: ${cleanOldPath} (Not found in bucket)`);
                return null;
            }
        }

        // 2. Perform copy
        console.log(`🔄 Moving: ${cleanOldPath} -> ${cleanNewPath}`);
        await minioClient.copyObject(BUCKET_NAME, cleanNewPath, `/${BUCKET_NAME}/${cleanOldPath}`, new Minio.CopyConditions());
        
        processedMap.set(cleanOldPath, newUrl);
        filesToDelete.add(cleanOldPath);
        
        return newUrl;
    } catch (error) {
        console.error(`❌ Error moving ${cleanOldPath}:`, error);
        return null;
    }
}

async function start() {
    console.log(`🚀 SEO Image Renaming started...`);
    console.log(`📍 Connecting to MinIO at ${MINIO_ENDPOINT}:${MINIO_PORT} (SSL: ${MINIO_USE_SSL})`);
    
    await mongoose.connect(MONGODB_URI!);
    console.log('🔌 Connected to MongoDB');

    // Process collections...
    // (Brands, Categories, Carousels)
    
    // BRANDS
    const brands = await Brand.find({});
    console.log(`\n📦 Processing ${brands.length} Brands...`);
    for (const brand of brands) {
        try {
            let updated = false;
            const nUrl = await processImage(brand.image, brand.name, 'brands/logos');
            if (nUrl && nUrl !== brand.image) {
                brand.image = nUrl;
                updated = true;
            }

            if (brand.products) {
                for (let i = 0; i < brand.products.length; i++) {
                    const p = brand.products[i];
                    const pUrl = await processImage(p.image, `${brand.name}-${p.name}`, 'brands/products');
                    if (pUrl && pUrl !== p.image) {
                        brand.products[i].image = pUrl;
                        updated = true;
                    }
                }
            }

            if (updated) {
                await brand.save();
                console.log(`✅ Updated: ${brand.name}`);
            }
        } catch (err) {
            console.error(`❌ Brand ${brand.name}:`, err);
        }
    }

    // CATEGORIES
    const categories = await Category.find({});
    console.log(`\n📁 Processing ${categories.length} Categories...`);
    for (const cat of categories) {
        try {
            let updated = false;
            const cUrl = await processImage(cat.image, cat.name, 'categories/main');
            if (cUrl && cUrl !== cat.image) {
                cat.image = cUrl;
                updated = true;
            }

            for (let i = 0; i < cat.tier2.length; i++) {
                const t2 = cat.tier2[i];
                const t2Url = await processImage(t2.image, t2.name, 'categories/tier2');
                if (t2Url && t2Url !== t2.image) {
                    cat.tier2[i].image = t2Url;
                    updated = true;
                }
                for (let j = 0; j < t2.tier3.length; j++) {
                    const t3 = t2.tier3[j];
                    const t3Url = await processImage(t3.image, t3.name, 'categories/tier3');
                    if (t3Url && t3Url !== t3.image) {
                        cat.tier2[i].tier3[j].image = t3Url;
                        updated = true;
                    }
                }
            }

            if (updated) {
                await cat.save();
                console.log(`✅ Updated: ${cat.name}`);
            }
        } catch (err) {
            console.error(`❌ Category ${cat.name}:`, err);
        }
    }

    // CAROUSELS
    const carousels = await Carousel.find({});
    console.log(`\n🎠 Processing ${carousels.length} Carousels...`);
    for (const car of carousels) {
        try {
            const carUrl = await processImage(car.image, car.title, 'carousels');
            if (carUrl && carUrl !== car.image) {
                car.image = carUrl;
                await car.save();
                console.log(`✅ Updated: ${car.title}`);
            }
        } catch (err) {
            console.error(`❌ Carousel ${car.title}:`, err);
        }
    }

    // CLEANUP
    console.log(`\n🧹 Cleanup: Deleting ${filesToDelete.size} old objects...`);
    for (const path of filesToDelete) {
        try {
            await minioClient.removeObject(BUCKET_NAME, path);
        } catch (e) {}
    }

    await mongoose.disconnect();
    console.log('\n🏁 Finished!');
}

start().catch(console.error);
