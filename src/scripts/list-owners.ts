import 'dotenv/config';
import dbConnect from '../lib/db';
import BrandOwner from '../models/BrandOwner';

async function listOwners() {
    await dbConnect();
    const owners = await BrandOwner.find({}).select('id name category').lean();
    console.log("Found", owners.length, "owners:");
    owners.forEach(o => {
        console.log(`id: "${o.id}" | name: "${o.name}" | category: "${o.category}"`);
    });
    process.exit(0);
}

listOwners();
