import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { X } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<'login' | 'signup'>(initialView);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-background rounded-xl shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">
                        {view === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {view === 'login' ? (
                        <>
                            <p className="text-sm text-muted-foreground mb-6">
                                Sign in to save your trip, book consultations, and access your dashboard.
                            </p>
                            <LoginForm
                                onSuccess={() => {
                                    onSuccess();
                                    onClose();
                                }}
                                onSwitchToSignup={() => setView('signup')}
                                onForgotPassword={() => {
                                    // Handle forgot password - maybe switch to a different view or just close and navigate
                                    console.log('Forgot password clicked');
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground mb-6">
                                Create an account to save your itineraries and get personalized recommendations.
                            </p>
                            <SignupForm
                                onSuccess={() => {
                                    onSuccess();
                                    onClose();
                                }}
                                onSwitchToLogin={() => setView('login')}
                            />
                            <p className="text-center text-sm text-muted-foreground mt-6">
                                Already have an account?
                                <button
                                    onClick={() => setView('login')}
                                    className="underline hover:text-primary font-medium ml-1"
                                >
                                    Login
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
