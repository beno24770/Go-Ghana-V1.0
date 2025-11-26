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
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
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
            await authService.signIn(email, password);
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
        signOut,
        resetPassword,
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

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="text-muted-foreground mb-6">
                        Please sign in to access this feature.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
