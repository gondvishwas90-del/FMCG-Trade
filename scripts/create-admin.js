const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

const AdminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

async function createAdmin() {
    const email = 'anuj.admin@gmail.com';
    const password = 'Anuj@123';
    const role = 'super-admin';

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await AdminUser.findOne({ email });
        if (existingUser) {
            console.log(`User ${email} already exists. Updating role and password...`);
            const passwordHash = await bcrypt.hash(password, 12);
            existingUser.passwordHash = passwordHash;
            existingUser.role = role;
            await existingUser.save();
            console.log('User updated successfully');
        } else {
            console.log(`Creating user ${email}...`);
            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new AdminUser({
                email,
                passwordHash,
                role
            });
            await newUser.save();
            console.log('User created successfully');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

createAdmin();
