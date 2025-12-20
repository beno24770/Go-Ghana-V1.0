import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../services/authApiService';

interface User {
    id: string;
    email: string;
    displayName: string | null;
    emailVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    currentUser: User | null;
    loading: boolean;
    signUp: (email: string, password: string, displayName?: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => void;
    signInWithApple: () => void;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await authApi.checkAuthStatus();
                setUser(currentUser);
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
        setLoading(true);
        try {
            await authApi.signUp(email, password, displayName);
            // User needs to verify email, don't set user yet
        } finally {
            setLoading(false);
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            const { user: loggedInUser } = await authApi.signIn(email, password);
            setUser(loggedInUser);
        } finally {
            setLoading(false);
        }
    }, []);

    const signInWithGoogle = useCallback(() => {
        authApi.signInWithGoogle();
    }, []);

    const signInWithApple = useCallback(() => {
        authApi.signInWithApple();
    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        try {
            await authApi.signOut();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        await authApi.resetPassword(email);
    }, []);

    const value: AuthContextType = {
        user,
        currentUser: user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithApple,
        signOut,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

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
                    <p className="text-muted-foreground mb-6">Please sign in to access this feature.</p>
                    <a
                        href="/login"
                        className="bg-[#006B3F] text-white px-6 py-2 rounded-md hover:bg-[#005030] inline-block"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    if (!user.emailVerified) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
                    <p className="text-muted-foreground mb-6">Please verify your email address to continue.</p>
                    <a
                        href="/login"
                        className="bg-[#006B3F] text-white px-6 py-2 rounded-md hover:bg-[#005030] inline-block"
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
