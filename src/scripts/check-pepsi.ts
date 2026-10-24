import 'dotenv/config';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';
import BrandOwner from '../models/BrandOwner';

async function checkPepsi() {
  await dbConnect();
  
  const brands = await Brand.find({
    $or: [
      { name: { $regex: /pepsi/i } },
      { id: { $regex: /pepsi/i } },
      { slug: { $regex: /pepsi/i } }
    ]
  }).lean();
  console.log("=== BRANDS MATCHING PEPSI ===");
  console.log(JSON.stringify(brands, null, 2));

  const owners = await BrandOwner.find({
    $or: [
      { name: { $regex: /pepsi/i } },
      { id: { $regex: /pepsi/i } }
    ]
  }).lean();
  console.log("=== BRAND OWNERS MATCHING PEPSI ===");
  console.log(JSON.stringify(owners, null, 2));

  process.exit(0);
}

checkPepsi();
