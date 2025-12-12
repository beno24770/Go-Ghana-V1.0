import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Checkbox } from '../ui/Checkbox';
import { GoogleButton, AppleButton } from './OAuthButtons';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export function SignUpPage() {
    const { signUp, signInWithGoogle, signInWithApple, sendVerificationEmail } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const fullName = `${firstName} ${lastName}`.trim();
            await signUp(email, password, fullName);

            // Send verification email logic
            try {
                await sendVerificationEmail();
            } catch (verErr) {
                console.warn("Failed to send verification email", verErr);
                // Continue anyway, user can resend later
            }

            navigate('/check-email', { state: { email } });
        } catch (err: unknown) {
            console.error(err);
            const errorObj = err as { code?: string };
            if (errorObj.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please sign in.');
            } else if (errorObj.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Failed to sign up with Google.');
        }
    };

    const handleApple = async () => {
        try {
            await signInWithApple();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Apple Sign In is not set up fully yet (needs configuration).');
        }
    };

    return (
        <AuthLayout title="Create your account" subtitle="Join thousands of travelers planning their dream trip to Ghana.">
            <form onSubmit={handleSignUp} className="space-y-5">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            placeholder="Kwame"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            placeholder="Mensah"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
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
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>
                    </label>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#006B3F] hover:bg-[#005030] h-11"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link to="/login" className="font-semibold text-[#006B3F] hover:underline">
                    Login
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
