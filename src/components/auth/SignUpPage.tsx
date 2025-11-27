
import { SignupForm } from './SignupForm';

interface SignUpPageProps {
    onSuccess?: () => void;
    onSwitchToLogin?: () => void;
}

export function SignUpPage({ onSuccess, onSwitchToLogin }: SignUpPageProps) {
    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Create Account</h2>
            <p className="text-muted-foreground mb-6">Sign up to save your trip plans and access them from any device.</p>
            <SignupForm onSuccess={onSuccess} onSwitchToLogin={onSwitchToLogin} />
            <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?
                <button onClick={onSwitchToLogin} className="underline hover:text-primary font-medium ml-1">
                    Login
                </button>
            </p>
        </div>
    );
}
