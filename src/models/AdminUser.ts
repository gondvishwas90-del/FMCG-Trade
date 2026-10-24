import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
    email: string;
    passwordHash: string;
    role: 'admin' | 'super-admin';
    lastLoginAt: Date | null;
    loginAttempts: number;
    lockUntil: Date | null;
    createdAt: Date;
    updatedAt: Date;
    isLocked: boolean;
    incrementLoginAttempts(): Promise<void>;
    resetLoginAttempts(): Promise<void>;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

const AdminUserSchema = new Schema<IAdminUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin', 'super-admin'],
        },
        lastLoginAt: {
            type: Date,
            default: null,
        },
        loginAttempts: {
            type: Number,
            default: 0,
        },
        lockUntil: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Virtual: check if currently locked
AdminUserSchema.virtual('isLocked').get(function (this: IAdminUser) {
    return !!(this.lockUntil && this.lockUntil > new Date());
});

// Method: increment login attempts and lock if threshold reached
AdminUserSchema.methods.incrementLoginAttempts = async function () {
    // If previous lock has expired, reset attempts
    if (this.lockUntil && this.lockUntil < new Date()) {
        await this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 },
        });
        return;
    }

    const updates: any = { $inc: { loginAttempts: 1 } };

    // Lock the account if we've reached max attempts
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
        updates.$set = { lockUntil: new Date(Date.now() + LOCK_TIME_MS) };
    }

    await this.updateOne(updates);
};

// Method: reset attempts on successful login
AdminUserSchema.methods.resetLoginAttempts = async function () {
    await this.updateOne({
        $set: { loginAttempts: 0, lastLoginAt: new Date() },
        $unset: { lockUntil: 1 },
    });
};

// Ensure virtuals are included in JSON output
AdminUserSchema.set('toJSON', { virtuals: true });
AdminUserSchema.set('toObject', { virtuals: true });

const AdminUser: Model<IAdminUser> =
    mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

export default AdminUser;
export { MAX_LOGIN_ATTEMPTS, LOCK_TIME_MS };
