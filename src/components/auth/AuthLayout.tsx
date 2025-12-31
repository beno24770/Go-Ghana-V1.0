import type { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Left Side - Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 py-12 z-10 bg-white">
                <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Logo Area */}
                    <div className="mb-12 flex items-center gap-2">
                        <img src="/goghana-logo.png" alt="Go Ghana AI" className="w-full h-full object-cover" />
                        <span className="text-xl font-bold text-gray-900 tracking-tight">GoGhana</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-500">{subtitle}</p>
                        )}
                    </div>

                    {children}

                </div>
            </div>

            {/* Right Side - Hero Section */}
            <div className="hidden lg:block w-1/2 relative bg-gray-900">
                <div className="absolute inset-0 bg-[url('/assets/images/auth-hero.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-24 text-white">
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            "The journey of a thousand miles begins with a single step."
                        </h2>
                        <p className="text-lg text-gray-300 max-w-lg mb-8">
                            Join thousands of travelers planning their dream trip to Ghana. Experience the culture, the people, and the beauty of the Gold Coast.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-700 bg-[url('/assets/images/avatar-1.png')] bg-cover`} />
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <span className="text-[#FCD116]">★★★★★</span>
                                <span className="ml-2 text-gray-400">Loved by 10k+ travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
