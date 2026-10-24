import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

async function updateRemainingLogos() {
    try {
        await dbConnect();
        console.log("Connected to MongoDB");

        // Map remaining logo files to BrandOwner IDs
        const mapping: Record<string, string> = {
            "asahi-uk": "https://apim.fmcg-exchange.com/fmcg-media/brand-owners/logos/Brand%20Logo%20(5).png",
            "beam-suntory": "https://apim.fmcg-exchange.com/fmcg-media/brand-owners/logos/Brand%20Logo%20(8).png",
            "carlsberg-marstons-brewing-company": "https://apim.fmcg-exchange.com/fmcg-media/brand-owners/logos/Brand%20Logo%20(26).png",
        };

        for (const [ownerId, logoUrl] of Object.entries(mapping)) {
            const res = await BrandOwner.updateOne({ id: ownerId }, { $set: { logo: logoUrl } });
            console.log(`Updated "${ownerId}" logo => ${logoUrl}`);
        }

        const owners = await BrandOwner.find({}).sort({ name: 1 }).lean();
        console.log("\n=== UPDATED BRAND OWNERS IN MONGO DB ===");
        owners.forEach((o, i) => {
            console.log(`${i + 1}. [${o.id}] "${o.name}" => logo: "${o.logo || 'EMPTY'}"`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateRemainingLogos();
