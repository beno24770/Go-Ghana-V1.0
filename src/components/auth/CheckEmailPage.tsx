import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';
import { Mail } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export function CheckEmailPage() {
    const { state } = useLocation();
    const email = state?.email || 'your email';
    const { sendVerificationEmail } = useAuth();
    const [resent, setResent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleResend = async () => {
        setSending(true);
        try {
            await sendVerificationEmail();
            setResent(true);
        } catch (e) {
            console.error(e);
        } finally {
            setSending(false);
        }
    };

    return (
        <AuthLayout title="Check your inbox">
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-[#006B3F] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8" />
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                    We've sent a verification link to <span className="font-semibold text-gray-900">{email}</span>. Please click the link to verify your account before logging in.
                </p>

                <div className="space-y-4">
                    <Link to="/login">
                        <Button className="w-full bg-[#006B3F] hover:bg-[#005030] h-11">
                            Back to Login
                        </Button>
                    </Link>

                    <button
                        onClick={handleResend}
                        disabled={resent || sending}
                        className="text-sm text-gray-500 hover:text-gray-900 underline disabled:opacity-50"
                    >
                        {resent ? 'Email Sent!' : sending ? 'Sending...' : "Didn't receive the email? Resend"}
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
