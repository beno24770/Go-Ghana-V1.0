import { useLocation, Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { Mail, ArrowLeft } from 'lucide-react';

export function CheckEmailPage() {
    const location = useLocation();
    const email = location.state?.email || 'your email';

    return (
        <AuthLayout title="Check your email" subtitle="">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-10 h-10 text-green-600" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Verify your email</h3>
                    <p className="text-gray-600">
                        We've sent a verification link to<br />
                        <strong className="text-gray-900">{email}</strong>
                    </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <p>
                        <strong>Didn't receive the email?</strong><br />
                        Check your spam folder or wait a few minutes.
                    </p>
                </div>

                <div className="pt-4 space-y-3">
                    <Link
                        to="/login"
                        className="text-[#006B3F] font-medium hover:underline inline-flex items-center gap-1"
                    >
                        <ArrowLeft size={16} />
                        Back to login
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
