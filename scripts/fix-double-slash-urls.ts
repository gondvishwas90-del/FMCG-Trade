/**
 * fix-double-slash-urls.ts
 *
 * Fixes URLs stored in MongoDB that contain double slashes
 * e.g. "/api/media/file//brand-owners/logos/diageo.jpeg"
 * caused by a leading slash in the `folder` prop not being stripped before concatenation.
 *
 * Run with:
 *   npx tsx scripts/fix-double-slash-urls.ts
 */

import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

/**
 * Collapses double (or more) slashes in the path portion of a URL,
 * preserving protocol slashes (https://) and query strings.
 *
 * "/api/media/file//brand-owners/logos/diageo.jpeg?t=123"
 *   -> "/api/media/file/brand-owners/logos/diageo.jpeg?t=123"
 */
function fixUrl(url: string): string {
  if (!url || typeof url !== "string") return url;

  const [pathPart, ...queryParts] = url.split("?");
  const query = queryParts.length > 0 ? "?" + queryParts.join("?") : "";

  const fixed = pathPart
    .replace("://", "___PROTO___")
    .replace(/\/\/+/g, "/")
    .replace("___PROTO___", "://");

  return fixed + query;
}

async function fixCollection(
  col: mongoose.mongo.Collection,
  label: string,
  fields: string[]
) {
  const docs = await col.find({}).toArray();
  let fixed = 0;

  for (const doc of docs) {
    const updates: Record<string, string> = {};

    for (const field of fields) {
      const val = doc[field];
      if (typeof val === "string" && val.includes("//")) {
        const clean = fixUrl(val);
        if (clean !== val) {
          updates[field] = clean;
          console.log(`  ${label}.${field}`);
          console.log(`    BEFORE: ${val}`);
          console.log(`    AFTER : ${clean}`);
        }
      }
    }

    if (Object.keys(updates).length > 0) {
      await col.updateOne({ _id: doc._id }, { $set: updates });
      fixed++;
    }
  }

  console.log(`  [${label}] Scanned ${docs.length}, fixed ${fixed}\n`);
}

async function fixBrandProducts(col: mongoose.mongo.Collection) {
  const docs = await col.find({}).toArray();
  let fixed = 0;

  for (const doc of docs) {
    if (!Array.isArray(doc.products)) continue;
    let changed = false;

    for (let i = 0; i < doc.products.length; i++) {
      const val = doc.products[i].image;
      if (typeof val === "string" && val.includes("//")) {
        const clean = fixUrl(val);
        if (clean !== val) {
          doc.products[i].image = clean;
          changed = true;
          console.log(`  Brand.products[${i}].image`);
          console.log(`    BEFORE: ${val}`);
          console.log(`    AFTER : ${clean}`);
        }
      }
    }

    if (changed) {
      await col.updateOne({ _id: doc._id }, { $set: { products: doc.products } });
      fixed++;
    }
  }

  console.log(`  [Brand.products] Scanned ${docs.length}, fixed ${fixed}\n`);
}

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.\n");

  const db = mongoose.connection.db!;

  console.log("--- BrandOwners ---");
  await fixCollection(db.collection("brandowners"), "BrandOwner", ["logo"]);

  console.log("--- Brands ---");
  await fixCollection(db.collection("brands"), "Brand", [
    "image",
    "backgroundImage",
    "mobileBackgroundImage",
  ]);
  await fixBrandProducts(db.collection("brands"));

  console.log("--- Categories ---");
  await fixCollection(db.collection("categories"), "Category", [
    "image",
    "mobileImage",
    "backgroundImage",
    "mobileBackgroundImage",
  ]);

  console.log("--- Carousels ---");
  await fixCollection(db.collection("carousels"), "Carousel", ["image"]);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
