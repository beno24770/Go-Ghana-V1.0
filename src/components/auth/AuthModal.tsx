import { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'signup';
}

type View = 'login' | 'signup' | 'forgot-password';

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const [view, setView] = useState<View>(initialView);

    if (!isOpen) return null;

    const handleSuccess = () => {
        onClose();
        setView('login'); // Reset to login for next time
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-background rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Content */}
                {view === 'login' && (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onSwitchToSignup={() => setView('signup')}
                        onForgotPassword={() => setView('forgot-password')}
                    />
                )}

                {view === 'signup' && (
                    <SignupForm
                        onSuccess={handleSuccess}
                        onSwitchToLogin={() => setView('login')}
                    />
                )}

                {view === 'forgot-password' && (
                    <ForgotPasswordForm onBack={() => setView('login')} />
                )}
            </div>
        </div>
    );
}
