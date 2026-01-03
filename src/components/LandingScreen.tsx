import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { ArrowRight, Menu, X } from 'lucide-react';


interface LandingScreenProps {
    onStart: () => void;
    isLocalMode?: boolean;
    onLocalModeToggle?: (isLocalMode: boolean) => void;
    onOpenOfflineGuide?: () => void;
}

const HERO_IMAGES = [
    '/hero-slider/hero-1.jpg',
    '/hero-slider/hero-2.jpg',
    '/hero-slider/hero-3.jpg',
    '/hero-slider/hero-4.png'
];

export function LandingScreen({ onStart, isLocalMode = false, onLocalModeToggle, onOpenOfflineGuide }: LandingScreenProps) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
            {/* Background Image Slider */}
            <div className="absolute md:fixed inset-0 -z-10 bg-black h-full w-full">
                {HERO_IMAGES.map((img, index) => (
                    <img
                        key={img}
                        src={img}
                        alt="Ghana Travel Experience"
                        aria-hidden="true"
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-80' : 'opacity-0'
                            }`}
                        loading={index === 0 ? "eager" : "lazy"}
                    />
                ))}
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-xl border-2 border-white/20 shadow-lg shrink-0">
                            <img
                                src={`${import.meta.env.BASE_URL}goghana-logo.png`}
                                alt="GoGhana Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-base sm:text-xl font-bold tracking-tight text-white drop-shadow-md whitespace-nowrap">Go Ghana AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
                        {onOpenOfflineGuide && (
                            <button
                                onClick={onOpenOfflineGuide}
                                className="hover:text-ghana-yellow transition-colors drop-shadow-sm flex items-center gap-1"
                            >
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Pocket Guide
                            </button>
                        )}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="hover:text-ghana-yellow transition-colors drop-shadow-sm"
                        >
                            Home
                        </button>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Mobile Menu Button - Moved to left of start planning for ergonomics */}
                        <button
                            className="md:hidden p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>

                        <div className="flex items-center gap-2">
                            {/* Local Mode Toggle - Only show on desktop (md) */}
                            {onLocalModeToggle && (
                                <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                    <span className="text-xs font-medium text-white/90 hidden lg:inline">Local Mode</span>
                                    <button
                                        onClick={() => onLocalModeToggle(!isLocalMode)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ghana-yellow focus:ring-offset-2 focus:ring-offset-black ${isLocalMode ? 'bg-ghana-green' : 'bg-white/30'}`}
                                    >
                                        <span
                                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isLocalMode ? 'translate-x-5' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                            )}
                            <Button
                                onClick={() => navigate('/login')}
                                variant="ghost"
                                className="text-white hover:text-ghana-yellow hover:bg-white/10 hidden md:flex"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={onStart}
                                size="sm"
                                className="bg-white text-black hover:bg-ghana-yellow hover:text-white rounded-full px-3 sm:px-6 font-bold transition-all shadow-lg hover:shadow-ghana-yellow/50 text-[10px] sm:text-xs md:text-sm h-8 sm:h-10"
                            >
                                Start Planning
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            {onOpenOfflineGuide && (
                                <button
                                    onClick={() => {
                                        onOpenOfflineGuide();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white/90 hover:text-ghana-yellow flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    </div>
                                    Pocket Guide
                                </button>
                            )}
                            <a
                                href="/login"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/login');
                                    setIsMenuOpen(false);
                                }}
                                className="text-white/90 hover:text-ghana-yellow sm:hidden flex items-center gap-3"
                            >
                                <ArrowRight className="w-5 h-5 text-ghana-yellow" /> Login
                            </a>

                            {/* Mobile Local Mode Toggle */}
                            {onLocalModeToggle && (
                                <div className="sm:hidden flex items-center justify-between py-2 border-t border-white/10">
                                    <span className="text-white/90">Local Mode</span>
                                    <button
                                        onClick={() => onLocalModeToggle(!isLocalMode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isLocalMode ? 'bg-ghana-green' : 'bg-white/30'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isLocalMode ? 'translate-x-6' : 'translate-x-1'}`}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 pb-24 md:pt-20 md:pb-40 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[90vh] text-center">
                <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-2 animate-fade-in-up opacity-0 delay-100 mx-auto">
                        <span className="text-xs sm:text-sm font-medium tracking-wide text-white/80">
                            Ghana's first budget-first AI travel planner
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl animate-fade-in-up opacity-0 delay-200 px-2 mt-2 sm:mt-0">
                        PLAN YOUR GHANA TRIP<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghana-yellow via-yellow-300 to-ghana-green">
                            ON ANY BUDGET
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <div className="relative pt-2 pb-2 animate-fade-in-up opacity-0 delay-300">
                        <p className="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-2xl mx-auto px-4">
                            AI that creates a realistic budget, recommends tours, and builds your full itinerary — all based on what you can afford.
                        </p>
                    </div>

                    {/* Microcopy Accent */}
                    <div className="relative animate-fade-in-up opacity-0 delay-350 pb-4">
                        <span className="text-ghana-yellow font-hand text-xl sm:text-2xl tracking-wide drop-shadow-md">
                            in just 3 answers!
                        </span>
                    </div>

                    {/* CTA Button - Primary Only */}
                    <div className="flex flex-col items-center justify-center pt-8 sm:pt-12 animate-fade-in-up opacity-0 delay-400 w-full px-4 sm:px-0">
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="w-full sm:w-auto bg-ghana-green hover:bg-green-600 text-white h-14 px-8 rounded-full text-lg font-bold shadow-2xl hover:shadow-ghana-green/50 hover:scale-105 transition-all duration-300"
                        >
                            Start With Your Budget
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                    {/* Trust Section */}
                </div>
            </div>
        </div>
    );
}
