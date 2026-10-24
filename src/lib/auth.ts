import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin-session';
const SESSION_DURATION_HOURS = 8;

export interface SessionPayload extends JWTPayload {
    userId: string;
    email: string;
    role: 'admin' | 'super-admin';
}

function getSecretKey(): Uint8Array {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        throw new Error('SESSION_SECRET environment variable is not set');
    }
    return new TextEncoder().encode(secret);
}

/**
 * Create a signed JWT and set it as an HTTP-only cookie.
 * Used after successful login.
 */
export async function createSession(userId: string, email: string, role: 'admin' | 'super-admin'): Promise<void> {
    const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);

    const token = await new SignJWT({
        userId,
        email,
        role,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(getSecretKey());

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });
}

/**
 * Read and verify the session cookie.
 * Returns the decoded payload, or null if invalid/missing.
 */
export async function verifySession(): Promise<SessionPayload | null> {
    try {
        const cookieStore = await cookies();
        const cookie = cookieStore.get(COOKIE_NAME);

        if (!cookie?.value) {
            return null;
        }

        const { payload } = await jwtVerify(cookie.value, getSecretKey(), {
            algorithms: ['HS256'],
        });

        return payload as SessionPayload;
    } catch {
        return null;
    }
}

/**
 * Delete the session cookie (logout).
 */
export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Guard for server actions. Throws if not authenticated.
 * Call at the top of every mutating server action.
 */
export async function requireAdmin(): Promise<SessionPayload> {
    const session = await verifySession();
    // Allow both regular admin and super-admin
    if (!session || (session.role !== 'admin' && session.role !== 'super-admin')) {
        throw new Error('Unauthorized: Admin access required');
    }
    return session;
}


/**
 * Edge-compatible session verification (for middleware).
 * Does NOT use next/headers; accepts the raw cookie value directly.
 */
export async function verifySessionEdge(cookieValue: string): Promise<SessionPayload | null> {
    try {
        const secret = process.env.SESSION_SECRET;
        if (!secret) return null;

        const { payload } = await jwtVerify(
            cookieValue,
            new TextEncoder().encode(secret),
            { algorithms: ['HS256'] }
        );

        return payload as SessionPayload;
    } catch {
        return null;
    }
}

export { COOKIE_NAME };
