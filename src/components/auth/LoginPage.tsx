import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Checkbox } from '../ui/Checkbox';
import { GoogleButton, AppleButton } from './OAuthButtons';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export function LoginPage() {
    const { signIn, signInWithGoogle, signInWithApple } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await signIn(email, password);
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (err: unknown) {
            console.error('Login error:', err);
            const errorObj = err as { message?: string };
            setError(errorObj.message || 'Failed to log in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            signInWithGoogle();
        } catch (error) {
            console.error(error);
            setError('Failed to sign in with Google.');
        }
    };

    const handleApple = async () => {
        try {
            signInWithApple();
        } catch (error) {
            console.error(error);
            setError('Apple Sign In is not available yet.');
        }
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to access your saved trips and dashboard.">
            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md border border-green-200 flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        {success}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-xs font-medium text-[#006B3F] hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm font-medium text-gray-700 leading-none">
                        Remember me
                    </label>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#006B3F] hover:bg-[#005030] h-11"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-500">Don't have an account? </span>
                <Link to="/signup" className="font-semibold text-[#006B3F] hover:underline">
                    Create free account
                </Link>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="space-y-3">
                <GoogleButton onClick={handleGoogle} />
                <AppleButton onClick={handleApple} />
            </div>
        </AuthLayout>
    );
}
