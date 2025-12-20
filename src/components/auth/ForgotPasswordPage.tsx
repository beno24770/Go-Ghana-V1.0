import { useState } from 'react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send reset email');
            }

            setSuccess(true);
        } catch (err: unknown) {
            console.error('Reset password error:', err);
            const errorObj = err as { message?: string };
            setError(errorObj.message || 'Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <AuthLayout title="Check your email" subtitle="">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Reset link sent!</h3>
                    <p className="text-gray-600">
                        If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
                    </p>
                    <Link to="/login" className="text-[#006B3F] font-medium hover:underline inline-flex items-center gap-1">
                        <ArrowLeft size={16} />
                        Back to login
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
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
                        disabled={isLoading}
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

                <div className="text-center">
                    <Link to="/login" className="text-sm text-[#006B3F] font-medium hover:underline inline-flex items-center gap-1">
                        <ArrowLeft size={14} />
                        Back to login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
