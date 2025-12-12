import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await resetPassword(email);
            setSubmitted(true);
        } catch (err: unknown) {
            console.error(err);
            const errorObj = err as { code?: string };
            if (errorObj.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (submitted) {
        return (
            <AuthLayout title="Check your inbox">
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8" />
                    </div>
                    <p className="text-gray-600 mb-8 text-lg">
                        We've sent password reset instructions to <span className="font-semibold text-gray-900">{email}</span>.
                    </p>

                    <Link to="/login">
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 h-11">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your email to receive reset instructions">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                        {error}
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
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#006B3F] hover:bg-[#005030] h-11"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    Send Reset Link
                </Button>
            </form>

            <div className="mt-6 text-center">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
            </div>
        </AuthLayout>
    );
}
