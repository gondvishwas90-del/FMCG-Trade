import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

async function cleanLogos() {
    try {
        await dbConnect();
        console.log("Connected to MongoDB");

        const owners = await BrandOwner.find({}).lean();
        console.log(`Found ${owners.length} total brand owners in DB.`);

        let updatedCount = 0;

        for (const owner of owners) {
            let shouldClear = false;
            let reason = '';

            if (!owner.logo || typeof owner.logo !== 'string' || !owner.logo.trim()) {
                continue;
            }

            const logoUrl = owner.logo.trim();

            if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
                try {
                    const res = await fetch(logoUrl, { method: 'GET' });
                    if (!res.ok) {
                        shouldClear = true;
                        reason = `HTTP status ${res.status}`;
                    } else {
                        const buffer = await res.arrayBuffer();
                        const bytes = new Uint8Array(buffer);
                        // Check if file is tiny, corrupted, or matches the exact 34797-byte dark grey placeholder image
                        if (bytes.length < 100 || bytes.length === 34797) {
                            shouldClear = true;
                            reason = bytes.length === 34797 
                                ? `Dark grey placeholder image (exact size 34,797 bytes)` 
                                : `Image file tiny/corrupted (${bytes.length} bytes)`;
                        } else {
                            console.log(`KEEPING: Owner: "${owner.name}" | Size: ${bytes.length} bytes`);
                        }
                    }
                } catch (err: any) {
                    shouldClear = true;
                    reason = `Fetch error: ${err.message}`;
                }
            }

            if (shouldClear) {
                console.log(`❌ Owner "${owner.name}" logo "${logoUrl}" => CLEARING (${reason})`);
                await BrandOwner.updateOne({ _id: owner._id }, { $set: { logo: '' } });
                updatedCount++;
            }
        }

        console.log(`\nSuccessfully cleaned ${updatedCount} BrandOwner logos in DB.`);
        process.exit(0);
    } catch (err) {
        console.error("Error cleaning logos:", err);
        process.exit(1);
    }
}

cleanLogos();
