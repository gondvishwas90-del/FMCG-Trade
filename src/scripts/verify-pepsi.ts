import 'dotenv/config';
import dbConnect from '../lib/db';
import Brand from '../models/Brand';

async function verify() {
  await dbConnect();
  const pepsi = await Brand.findOne({ id: 'pepsi' }).lean();
  console.log("=== PEPSI BRAND IN MONGODB ===");
  console.log(JSON.stringify({
    id: pepsi?.id,
    name: pepsi?.name,
    image: pepsi?.image,
    country: pepsi?.country
  }, null, 2));
  process.exit(0);
}

verify();
