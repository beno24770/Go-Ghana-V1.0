import { Button } from './ui/Button';
import { ArrowRight, Check, Play, Star, MapPin, DollarSign } from 'lucide-react';
import { AnimatedSection } from './ui/AnimatedSection';


interface LandingScreenProps {
    onStart: () => void;
    isLocalMode?: boolean;
    onLocalModeToggle?: (isLocalMode: boolean) => void;
    onOpenOfflineGuide?: () => void;
}

export function LandingScreen({ onStart, isLocalMode = false, onLocalModeToggle, onOpenOfflineGuide }: LandingScreenProps) {

    return (
        <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
            {/* Static Background Image */}
            <div className="absolute md:fixed inset-0 -z-10 bg-black h-full w-full">
                <img
                    src="/hero-bg.jpg"
                    alt="Ghana Waterfall Landscape"
                    className="w-full h-full object-cover object-center opacity-80"
                    loading="eager"
                    decoding="async"
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl border-2 border-white/20 shadow-lg">
                            <img
                                src={`${import.meta.env.BASE_URL}goghana-logo.jpg`}
                                alt="GoGhana Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Go Ghana AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
                        <a href="#features" className="hover:text-ghana-yellow transition-colors drop-shadow-sm">Features</a>
                        <a href="#how-it-works" className="hover:text-ghana-yellow transition-colors drop-shadow-sm">How It Works</a>
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

                    <div className="flex items-center gap-4">
                        {/* Local Mode Toggle */}
                        {onLocalModeToggle && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
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
                            onClick={onStart}
                            size="sm"
                            className="bg-white text-black hover:bg-ghana-yellow hover:text-white rounded-full px-6 font-semibold transition-all shadow-lg hover:shadow-ghana-yellow/50"
                        >
                            Start Planning
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-6 pt-12 pb-32 md:pt-20 md:pb-40 flex flex-col items-center justify-center min-h-[90vh] text-center">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg mb-2 animate-fade-in-up opacity-0 delay-100">
                        <Star className="w-4 h-4 text-ghana-yellow fill-current" />
                        <span className="text-sm font-semibold tracking-wide text-white">
                            Ghana's First Budget-First AI Travel Planner
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-2xl animate-fade-in-up opacity-0 delay-200 px-2">
                        PLAN YOUR GHANA TRIP<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghana-yellow via-yellow-300 to-ghana-green">
                            ON ANY BUDGET
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <div className="relative pt-2 pb-2 animate-fade-in-up opacity-0 delay-300">
                        <p className="text-base sm:text-lg lg:text-xl text-white/95 font-normal leading-relaxed max-w-3xl mx-auto">
                            AI that creates a realistic budget, recommends tours, and builds your full itinerary — all based on what you can afford.
                        </p>
                    </div>

                    {/* Handwritten Accent */}
                    <div className="relative animate-fade-in-up opacity-0 delay-350 pb-4">
                        <span className="text-ghana-yellow font-hand text-3xl md:text-5xl drop-shadow-lg">
                            in just 3 answers!
                        </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in-up opacity-0 delay-400">
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="w-full sm:w-auto bg-ghana-green hover:bg-green-600 text-white h-14 px-8 rounded-full text-lg font-bold shadow-2xl hover:shadow-ghana-green/50 hover:scale-105 transition-all duration-300"
                        >
                            Start With Your Budget
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto h-14 px-8 rounded-full text-lg font-semibold border-2 border-white/90 bg-white/95 text-ghana-green hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            <Play className="mr-2 w-5 h-5 fill-current" />
                            How It Works
                        </Button>
                    </div>

                    {/* Positioning Statement */}
                    <div className="pt-16 pb-6 space-y-3 animate-fade-in-up opacity-0 delay-500">
                        <p className="text-base md:text-lg font-bold text-white/95 tracking-wide">
                            Not just AI — it's Ghana's first budget-first trip planner.
                        </p>
                        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Most tools tell you where to go.<br />
                            We help you travel the way your money makes sense.
                        </p>
                    </div>

                    {/* Trust Section */}
                    <div className="border-t border-white/20 pt-8 mt-8 animate-fade-in-up opacity-0 delay-600">
                        <p className="text-xs md:text-sm font-bold text-ghana-yellow uppercase tracking-widest mb-4">
                            Trusted by travelers from the US, UK, Germany & Ghana
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works Section - Glassmorphism Cards */}
            <div id="how-it-works" className="relative z-20 pb-20 md:pb-32 -mt-16">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Section Title */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">How It Works</h2>
                        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4">Three simple steps to plan your perfect Ghana adventure</p>
                    </div>

                    {/* 3-Step Cards */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Set Your Budget",
                                desc: "Tell the system how much you want to spend. You'll instantly get a detailed breakdown of:",
                                items: [
                                    "Accommodation cost",
                                    "Feeding cost",
                                    "Transport cost",
                                    "Activity cost",
                                    "Hidden fees & local prices"
                                ],
                                footer: "Everything is calculated using real Ghana data.",
                                icon: <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-ghana-yellow" />,
                                image: "/steps/step-1.png"
                            },
                            {
                                step: "02",
                                title: "Get Your Plan",
                                desc: "Based on your budget, the system automatically:",
                                items: [
                                    "Recommends tours you can afford",
                                    "Suggests activities by category",
                                    "Builds a complete custom itinerary",
                                    "Lets you edit it to your taste"
                                ],
                                footer: "You're always in control.",
                                icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-ghana-yellow" />,
                                image: "/steps/step-2.png"
                            },
                            {
                                step: "03",
                                title: "Book Trusted Drivers & Guides",
                                desc: "Once you're happy with your itinerary, the system connects you to:",
                                items: [
                                    "Verified drivers",
                                    "Experienced tour guides",
                                    "Local experts"
                                ],
                                footer: "All vetted for safety and reliability.",
                                icon: <Check className="w-6 h-6 md:w-8 md:h-8 text-ghana-yellow" />,
                                image: "/steps/step-3.png"
                            }
                        ].map((item, idx) => (
                            <AnimatedSection
                                key={idx}
                                delay={idx * 150}
                                className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-ghana-yellow/20 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Glassmorphism Card */}
                                <div className="glass-card-premium h-full backdrop-blur-lg md:backdrop-blur-xl bg-white/10 border border-white/20 flex flex-col">

                                    {/* Step Image */}
                                    <div className="relative h-48 md:h-56 w-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Step Number Badge Overlay */}
                                        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3">
                                            <div className="text-ghana-yellow font-hand text-4xl md:text-5xl font-bold drop-shadow-md">
                                                STEP {item.step}
                                            </div>
                                        </div>
                                        {/* Icon Badge Overlay */}
                                        <div className="absolute top-4 right-4 z-20 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/90 text-sm md:text-base mb-4 leading-relaxed">
                                            {item.desc}
                                        </p>

                                        {/* Feature List */}
                                        <ul className="space-y-2 mb-6 flex-1">
                                            {item.items.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-white/85 text-xs md:text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-ghana-yellow mt-1.5 flex-shrink-0"></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-white/20 mt-auto">
                                            <p className="text-ghana-yellow font-semibold text-xs md:text-sm">
                                                {item.footer}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Decorative Gradient */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ghana-yellow/10 to-transparent rounded-bl-full opacity-30 pointer-events-none"></div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
