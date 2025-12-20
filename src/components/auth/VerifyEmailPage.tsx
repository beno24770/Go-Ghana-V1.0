import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setMessage('No verification token provided.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/auth/verify-email?token=${token}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Verification failed');
                }

                setStatus('success');
                setMessage('Your email has been verified successfully!');
            } catch (err: unknown) {
                console.error('Verification error:', err);
                const errorObj = err as { message?: string };
                setStatus('error');
                setMessage(errorObj.message || 'Verification failed. The link may be expired or invalid.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <AuthLayout title="Email Verification" subtitle="">
            <div className="text-center space-y-6">
                {status === 'loading' && (
                    <>
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
                        </div>
                        <p className="text-gray-600">Verifying your email...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900">Email Verified!</h3>
                            <p className="text-gray-600">{message}</p>
                        </div>
                        <Link
                            to="/login"
                            className="inline-block bg-[#006B3F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#005030] transition-colors"
                        >
                            Continue to Login
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <XCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900">Verification Failed</h3>
                            <p className="text-gray-600">{message}</p>
                        </div>
                        <Link
                            to="/signup"
                            className="inline-block bg-[#006B3F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#005030] transition-colors"
                        >
                            Try Again
                        </Link>
                    </>
                )}
            </div>
        </AuthLayout>
    );
}
