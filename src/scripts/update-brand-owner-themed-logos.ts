import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

const DB_UPDATES = [
    {
        nameKeywords: ['proximo', 'promximo'],
        logoDark: '/brand-owners-themed/dark/proximo-spirits.png',
        logoLight: '/brand-owners-themed/light/proximo-spirits.png',
    },
    {
        nameKeywords: ['edrington'],
        logoDark: '/brand-owners-themed/dark/edrington.png',
        logoLight: '/brand-owners-themed/light/edrington.png',
    },
    {
        nameKeywords: ['william grant'],
        logoDark: '/brand-owners-themed/dark/william-grant-sons.png',
        logoLight: '/brand-owners-themed/light/william-grant-sons.png',
    },
    {
        nameKeywords: ['constellation'],
        logoDark: '/brand-owners-themed/dark/constellation-brands.png',
        logoLight: '/brand-owners-themed/light/constellation-brands.png',
    },
    {
        nameKeywords: ['lvmh', 'moet hennessy'],
        logoDark: '/brand-owners-themed/dark/lvmh-moet-hennessy.png',
        logoLight: '/brand-owners-themed/light/lvmh-moet-hennessy.png',
    },
    {
        nameKeywords: ['asahi'],
        logoDark: '/brand-owners-themed/dark/asahi-uk.png',
        logoLight: '/brand-owners-themed/light/asahi-uk.png',
    },
    {
        nameKeywords: ['carlsberg'],
        logoDark: '/brand-owners-themed/dark/carlsberg-marstons-brewing-company.png',
        logoLight: '/brand-owners-themed/light/carlsberg-marstons-brewing-company.png',
    },
    {
        nameKeywords: ['molson coors'],
        logoDark: '/brand-owners-themed/dark/molson-coors.png',
        logoLight: '/brand-owners-themed/light/molson-coors.png',
    },
    {
        nameKeywords: ['fever-tree', 'fever tree'],
        logoDark: '/brand-owners-themed/dark/fever-tree.png',
        logoLight: '/brand-owners-themed/light/fever-tree.png',
    }
];

async function main() {
    try {
        console.log("Connecting to DB...");
        await dbConnect();
        console.log("Connected to MongoDB.");

        const allOwners = await BrandOwner.find({});
        console.log(`Found ${allOwners.length} owners in DB.`);

        for (const update of DB_UPDATES) {
            const matched = allOwners.filter(owner => {
                const ownerName = (owner.name || '').toLowerCase();
                const ownerId = (owner.id || '').toLowerCase();
                return update.nameKeywords.some(kw => ownerName.includes(kw) || ownerId.includes(kw));
            });

            for (const owner of matched) {
                await BrandOwner.updateOne(
                    { _id: owner._id },
                    {
                        $set: {
                            logoDark: update.logoDark,
                            logoLight: update.logoLight,
                            logo: update.logoLight // default fallback
                        }
                    }
                );
                console.log(`✅ Updated ${owner.name} (${owner.id}) with themed logos.`);
            }
        }

        console.log("\nDatabase update completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("DB update error:", err);
        process.exit(1);
    }
}

main();
