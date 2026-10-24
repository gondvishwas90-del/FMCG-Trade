'use server';

import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import AdminUser from '@/models/AdminUser';
import { createSession, destroySession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
    password: z.string().min(1, 'Password is required'),
});

export type LoginState = {
    error?: string;
    success?: boolean;
};

/**
 * Server action: Authenticate admin user.
 * Returns an error state on failure, or redirects to /admin on success.
 */
export async function loginAdmin(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    // 1. Validate input
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const parsed = loginSchema.safeParse(rawData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { email, password } = parsed.data;

    try {
        await dbConnect();

        // 2. Find admin user
        const admin = await AdminUser.findOne({ email });

        // If user not found, still run bcrypt to prevent timing attacks
        if (!admin) {
            await bcrypt.compare(password, '$2a$12$invalidhashtopreventtimingattacks000000');
            return { error: 'Invalid email or password' };
        }

        // 3. Check account lockout
        if (admin.isLocked) {
            const lockMinutes = Math.ceil(
                ((admin.lockUntil as Date).getTime() - Date.now()) / 60000
            );
            return {
                error: `Account locked. Try again in ${lockMinutes} minute${lockMinutes !== 1 ? 's' : ''}.`,
            };
        }

        // 4. Verify password
        const isMatch = await bcrypt.compare(password, admin.passwordHash);

        if (!isMatch) {
            await admin.incrementLoginAttempts();
            return { error: 'Invalid email or password' };
        }

        // 5. Reset attempts on success & update lastLoginAt
        await admin.resetLoginAttempts();

        // 6. Create session (sets HTTP-only cookie)
        await createSession(admin._id.toString(), admin.email, admin.role);
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'An unexpected error occurred. Please try again.' };
    }

    // 7. Redirect to admin dashboard (must be outside try/catch because redirect throws)
    redirect('/admin');
}

/**
 * Server action: Log out the admin user.
 */
export async function logoutAdmin(): Promise<void> {
    await destroySession();
    redirect('/login');
}
