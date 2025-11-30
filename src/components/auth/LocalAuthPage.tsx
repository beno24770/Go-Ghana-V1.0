import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Phone, User, Mail, Lock } from 'lucide-react';

interface LocalAuthPageProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function LocalAuthPage({ onSuccess, onCancel }: LocalAuthPageProps) {
    const { signUp, signIn } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const validateGhanaPhone = (phone: string): boolean => {
        // Ghana phone format: 0XX XXX XXXX or +233 XX XXX XXXX
        const ghanaPhoneRegex = /^(\+233|0)(2[0-9]|5[0-9]|24|54|55|59|20|50)\s?\d{3}\s?\d{4}$/;
        return ghanaPhoneRegex.test(phone.replace(/\s/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                if (!name || !phone) {
                    throw new Error('Name and Phone Number are required for Local Mode.');
                }
                // Validate Ghana phone number format
                if (!validateGhanaPhone(phone)) {
                    throw new Error('Please enter a valid Ghana phone number (e.g., 024 123 4567 or +233 24 123 4567)');
                }
                await signUp(email, password, name, phone);
            }
            onSuccess();
        } catch (err: unknown) {
            console.error(err);
            const error = err as { message?: string };
            setError(error.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#006B3F]/5 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#006B3F] p-8 text-center text-white">
                    <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Local Mode</h2>
                    <p className="text-white/80">
                        {isLogin ? 'Welcome back! Sign in to continue.' : 'Join to access exclusive local deals and features.'}
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-10 w-full"
                                            placeholder="Kwame Mensah"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="pl-10 w-full"
                                            placeholder="024 123 4567"
                                            pattern="(\+233|0)(2[0-9]|5[0-9]|24|54|55|59|20|50)\s?\d{3}\s?\d{4}"
                                            title="Enter a valid Ghana phone number (e.g., 024 123 4567 or +233 24 123 4567)"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Format: 024 123 4567 or +233 24 123 4567</p>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#006B3F] hover:bg-[#005a35] text-white font-bold shadow-lg transition-all mt-6"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-[#006B3F] hover:underline font-medium"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>

                        <div className="border-t pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Cancel and return home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
