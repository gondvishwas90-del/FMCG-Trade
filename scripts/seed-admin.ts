/**
 * Admin User Seed Script
 * 
 * Run with:   npx tsx scripts/seed-admin.ts
 * 
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env,
 * hashes the password, and upserts the admin user into MongoDB.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_ROLE = process.env.ADMIN_ROLE || 'admin';

async function seedAdmin() {
    // Validate env vars
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is not set in .env');
        process.exit(1);
    }
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
        process.exit(1);
    }
    if (ADMIN_PASSWORD.length < 8) {
        console.error('❌ ADMIN_PASSWORD must be at least 8 characters');
        process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);

    const db = mongoose.connection.db!;
    const collection = db.collection('adminusers');

    // Hash the password with 12 salt rounds
    console.log('🔐 Hashing password...');
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Upsert: create if not exists, update if exists
    const result = await collection.updateOne(
        { email: ADMIN_EMAIL.toLowerCase().trim() },
        {
            $set: {
                email: ADMIN_EMAIL.toLowerCase().trim(),
                passwordHash,
                role: ADMIN_ROLE,
                loginAttempts: 0,
                updatedAt: new Date(),
            },
            $setOnInsert: {
                lastLoginAt: null,
                lockUntil: null,
                createdAt: new Date(),
            },
        },
        { upsert: true }
    );

    if (result.upsertedCount > 0) {
        console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
    } else {
        console.log(`✅ Admin user updated: ${ADMIN_EMAIL}`);
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
}

seedAdmin().catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
});
