import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';
import * as authService from '../services/authService';
import { createUserProfile } from '../services/firestoreService';

interface AuthContextType {
    user: User | null;
    currentUser: User | null; // Alias for compatibility
    loading: boolean;
    signUp: (email: string, password: string, displayName?: string, phoneNumber?: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = authService.onAuthStateChanged(async (user) => {
            setUser(user);
            setLoading(false);

            // Create user profile in Firestore if new user
            // Note: This automatic creation might miss the phone number if it's not passed here
            // Ideally, we handle profile creation explicitly in signUp
        });

        return unsubscribe;
    }, []);

    const signUp = useCallback(async (email: string, password: string, displayName?: string, phoneNumber?: string) => {
        setLoading(true);
        try {
            const userCredential = await authService.signUp(email, password, displayName);
            // Explicitly create profile with phone number
            if (userCredential.user) {
                await createUserProfile(
                    userCredential.user.uid,
                    email,
                    displayName,
                    null,
                    phoneNumber
                );
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await authService.signIn(email, password);

            // Check for email verification
            if (userCredential.user && !userCredential.user.emailVerified) {
                await authService.signOut();
                throw new Error('Please verify your email address before logging in.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const signInWithGoogle = useCallback(async () => {
        setLoading(true);
        try {
            await authService.signInWithGoogle();
        } finally {
            setLoading(false);
        }
    }, []);

    const signInWithApple = useCallback(async () => {
        setLoading(true);
        try {
            await authService.signInWithApple();
        } finally {
            setLoading(false);
        }
    }, []);

    const sendVerificationEmail = useCallback(async () => {
        if (authService.getCurrentUser()) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await authService.sendVerificationEmail(authService.getCurrentUser()!);
        }
    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        try {
            await authService.signOut();
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        await authService.resetPassword(email);
    }, []);

    const value: AuthContextType = {
        user,
        currentUser: user, // Alias for compatibility
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithApple,
        signOut,
        resetPassword,
        sendVerificationEmail,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Protected route wrapper component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CE1126] mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !user.emailVerified) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        {!user ? 'Authentication Required' : 'Email Verification Required'}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        {!user
                            ? 'Please sign in to access this feature.'
                            : 'Please verify your email address to continue.'}
                    </p>
                    {user && !user.emailVerified && (
                        <button
                            onClick={async () => {
                                await authService.signOut();
                                window.location.href = '/login';
                            }}
                            className="bg-[#006B3F] text-white px-4 py-2 rounded-md hover:bg-[#005030]"
                        >
                            Back to Login
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
