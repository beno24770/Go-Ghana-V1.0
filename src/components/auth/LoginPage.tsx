
import { LoginForm } from './LoginForm';

interface LoginPageProps {
    onSuccess: () => void;
    onSwitchToSignup: () => void;
}

export function LoginPage({ onSuccess, onSwitchToSignup }: LoginPageProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your saved trips and dashboard
                    </p>
                </div>

                <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
                    <LoginForm
                        onSuccess={onSuccess}
                        onSwitchToSignup={onSwitchToSignup}
                    />
                </div>
            </div>
        </div>
    );
}
