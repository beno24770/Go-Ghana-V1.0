import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification as firebaseSendEmailVerification,
    OAuthProvider,
    type User,
    type UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Authentication Service
 * Handles all Firebase authentication operations
 */

// Google OAuth provider
const googleProvider = new GoogleAuthProvider();

// Apple OAuth provider
const appleProvider = new OAuthProvider('apple.com');

/**
 * Sign up with email and password
 */
export async function signUp(
    email: string,
    password: string,
    displayName?: string
): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name if provided
    if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(user: User): Promise<void> {
    return firebaseSendEmailVerification(user);
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(auth, googleProvider);
}

/**
 * Sign in with Apple
 */
export async function signInWithApple(): Promise<UserCredential> {
    return signInWithPopup(auth, appleProvider);
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
    return firebaseSignOut(auth);
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
    return auth.currentUser;
}

/**
 * Subscribe to auth state changes
 */
export function onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return auth.onAuthStateChanged(callback);
}
