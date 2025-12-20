/**
 * Frontend Auth API Service
 * Replaces Firebase Auth with calls to custom backend
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';



interface User {
    id: string;
    email: string;
    displayName: string | null;
    emailVerified: boolean;
}

let currentUser: User | null = null;
let accessToken: string | null = null;

// Token management
export const getAccessToken = () => accessToken;
export const getCurrentUser = () => currentUser;

export const setAuthState = (user: User | null, token: string | null) => {
    currentUser = user;
    accessToken = token;
};

/**
 * Sign up with email and password
 */
export async function signUp(
    email: string,
    password: string,
    displayName?: string
): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, displayName }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return { user: data.data.user };
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    // Store user and token
    setAuthState(data.data.user, data.data.accessToken);

    return { user: data.data.user };
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    setAuthState(null, null);
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<string | null> {
    try {
        const response = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            setAuthState(null, null);
            return null;
        }

        const data = await response.json();
        accessToken = data.data.accessToken;
        return accessToken;
    } catch {
        setAuthState(null, null);
        return null;
    }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
    const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send reset email');
    }
}

/**
 * Google OAuth - redirect to backend
 */
export function signInWithGoogle(): void {
    window.location.href = `${API_BASE}/auth/google`;
}

/**
 * Apple OAuth - redirect to backend
 */
export function signInWithApple(): void {
    window.location.href = `${API_BASE}/auth/apple`;
}

/**
 * Check current auth status on app load
 */
export async function checkAuthStatus(): Promise<User | null> {
    try {
        const token = await refreshToken();
        if (!token) return null;

        // Fetch current user profile
        const response = await fetch(`${API_BASE}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
            credentials: 'include',
        });

        if (!response.ok) return null;

        const data = await response.json();
        currentUser = data.data.user;
        return currentUser;
    } catch {
        return null;
    }
}
