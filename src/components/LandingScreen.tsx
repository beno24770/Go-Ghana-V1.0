import { Button } from './ui/Button';
import { ArrowRight, Check, Play, Star, Calculator, Calendar } from 'lucide-react';
import { AnimatedSection } from './ui/AnimatedSection';

interface LandingScreenProps {
    onStart: () => void;
    isLocalMode?: boolean;
    onLocalModeToggle?: (isLocalMode: boolean) => void;
}

export function LandingScreen({ onStart, isLocalMode = false, onLocalModeToggle }: LandingScreenProps) {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-sans">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Organic Shapes */}
                <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-gradient-to-br from-[#006B3F]/10 to-[#FCD116]/10 rounded-full blur-3xl opacity-60 animate-pulse duration-[4s]"></div>
                <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-[#CE1126]/5 to-[#FCD116]/5 rounded-full blur-3xl opacity-60"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-40"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-50 container mx-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 shadow-sm">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#FCD116] rounded-xl rotate-3 opacity-50"></div>
                            <img
                                src="/goghana-logo.jpg"
                                alt="GoGhana Logo"
                                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-sm object-cover"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">GoGhana</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#features" className="text-gray-600 hover:text-[#006B3F] transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-[#006B3F] transition-colors">How It Works</a>
                        <a href="#about" className="text-gray-600 hover:text-[#006B3F] transition-colors">About</a>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-gray-600 hover:text-[#006B3F] transition-colors flex items-center gap-1"
                        >
                            <span>🏠</span> Home
                        </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Local Mode Toggle - Compact Header Version */}
                        {onLocalModeToggle && (
                            <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-xs font-medium text-gray-600 hidden lg:inline">Local Mode</span>
                                <button
                                    onClick={() => onLocalModeToggle(!isLocalMode)}
                                    className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:ring-offset-2 ${isLocalMode ? 'bg-[#006B3F]' : 'bg-gray-300'}`}
                                    role="switch"
                                    aria-checked={isLocalMode}
                                    aria-label="Toggle Local Mode"
                                    title="Switch between International and Local Mode"
                                >
                                    <span
                                        className={`inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition-transform ${isLocalMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        )}
                        <Button
                            onClick={onStart}
                            size="sm"
                            className="bg-[#006B3F] hover:bg-[#005a35] text-white rounded-full px-4 sm:px-6 text-xs sm:text-sm"
                        >
                            <span className="hidden sm:inline">Get Started</span>
                            <span className="sm:hidden">Start</span>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 md:pt-20 md:pb-32">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <AnimatedSection animation="fade-in-up" delay={100} immediate={true}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm mb-6">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CE1126] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CE1126]"></span>
                                </span>
                                <span className="text-xs font-semibold tracking-wide uppercase text-gray-600">
                                    AI-Powered Travel Planner
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
                                Experience Ghana, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B3F] via-[#FCD116] to-[#CE1126]">
                                    Your Way.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Plan your perfect trip in seconds. Get accurate budget estimates, curated tours, and personalized itineraries powered by local insights.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-in-up" delay={300} immediate={true}>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
                                <Button
                                    size="lg"
                                    onClick={onStart}
                                    className="w-full sm:w-auto bg-[#006B3F] hover:bg-[#005a35] text-white h-12 sm:h-14 px-6 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-[#006B3F]/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Start Planning Free
                                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-full text-base sm:text-lg font-medium border-2 border-gray-200 hover:border-[#006B3F] hover:text-[#006B3F] bg-white/50 backdrop-blur-sm"
                                >
                                    <Play className="mr-2 w-4 h-4 fill-current" />
                                    See How It Works
                                </Button>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fade-in-up" delay={500} immediate={true}>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 text-xs sm:text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-[#006B3F]" />
                                    <span>Free Forever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-[#006B3F]" />
                                    <span>Instant Results</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 sm:w-5 h-4 sm:h-5 text-[#006B3F]" />
                                    <span>No Signup</span>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Right Content - Visual */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <AnimatedSection animation="pop-in" delay={200} className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md" immediate={true}>
                            {/* Floating Elements */}
                            <div className="absolute top-10 -left-4 sm:-left-10 z-20 animate-[fade-in-up_1s_ease-out_1s_forwards] opacity-0">
                                <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 bg-[#FCD116]/20 rounded-full flex items-center justify-center">
                                        <Star className="w-5 h-5 text-amber-600 fill-current" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Top Rated</div>
                                        <div className="text-sm font-bold text-gray-900">Kakum Park</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-20 -right-2 sm:-right-5 z-20 animate-[fade-in-up_1s_ease-out_1.2s_forwards] opacity-0">
                                <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 bg-[#006B3F]/20 rounded-full flex items-center justify-center">
                                        <span className="text-[#006B3F] font-bold text-xs">GH₵</span>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Budget Saved</div>
                                        <div className="text-sm font-bold text-gray-900">$450.00</div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Phone Mockup */}
                            <div className="relative z-10 bg-gray-900 rounded-[2rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 sm:border-[6px] border-gray-800 rotate-[-6deg] hover:rotate-0 transition-transform duration-500 ease-out">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                                <div className="relative bg-white rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden h-[480px] sm:h-[580px] w-[240px] sm:w-[280px] mx-auto">
                                    {/* App UI Mockup */}
                                    <div className="h-full bg-gray-50 flex flex-col">
                                        <div className="bg-[#006B3F] p-6 pb-10 text-white">
                                            <div className="flex justify-between items-center mb-6">
                                                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                            </div>
                                            <div className="text-2xl font-bold mb-1">My Trip</div>
                                            <div className="text-white/80 text-sm">7 Days in Ghana</div>
                                        </div>

                                        <div className="flex-1 px-4 -mt-6 space-y-4 overflow-hidden">
                                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Total Budget</div>
                                                <div className="text-3xl font-bold text-gray-900">$2,450</div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                                                    <div className="bg-[#006B3F] h-full w-[70%] rounded-full"></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white p-3 rounded-2xl shadow-sm">
                                                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mb-2">
                                                        <div className="w-4 h-4 bg-[#CE1126] rounded-full"></div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">Hotel</div>
                                                    <div className="font-bold">$850</div>
                                                </div>
                                                <div className="bg-white p-3 rounded-2xl shadow-sm">
                                                    <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center mb-2">
                                                        <div className="w-4 h-4 bg-[#FCD116] rounded-full"></div>
                                                    </div>
                                                    <div className="text-xs text-gray-500">Food</div>
                                                    <div className="font-bold">$420</div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-4 rounded-2xl shadow-sm">
                                                <div className="text-sm font-bold mb-3">Recommended</div>
                                                <div className="flex gap-3 overflow-hidden">
                                                    <div className="w-28 flex-shrink-0">
                                                        <div className="h-20 bg-gray-200 rounded-xl mb-2 overflow-hidden relative">
                                                            <img src="/cape-coast.jpg" alt="Cape Coast" className="w-full h-full object-cover" />
                                                            <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#006B3F]">$45</div>
                                                        </div>
                                                        <div className="text-[10px] font-bold leading-tight">Cape Coast Castle</div>
                                                        <div className="text-[9px] text-gray-500">Historical Tour</div>
                                                    </div>
                                                    <div className="w-28 flex-shrink-0">
                                                        <div className="h-20 bg-gray-200 rounded-xl mb-2 overflow-hidden relative">
                                                            <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=300&q=80" alt="Kakum" className="w-full h-full object-cover" />
                                                            <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#006B3F]">$35</div>
                                                        </div>
                                                        <div className="text-[10px] font-bold leading-tight">Kakum Canopy</div>
                                                        <div className="text-[9px] text-gray-500">Nature Walk</div>
                                                    </div>
                                                    <div className="w-28 flex-shrink-0">
                                                        <div className="h-20 bg-gray-200 rounded-xl mb-2 overflow-hidden relative">
                                                            <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=300&q=80" alt="Mole" className="w-full h-full object-cover" />
                                                            <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#006B3F]">$120</div>
                                                        </div>
                                                        <div className="text-[10px] font-bold leading-tight">Mole Safari</div>
                                                        <div className="text-[9px] text-gray-500">Wildlife</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#006B3F]/20 to-[#FCD116]/20 rounded-full blur-3xl -z-10"></div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <AnimatedSection animation="fade-in-up" delay={600} className="relative z-10 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center md:divide-x divide-gray-100">
                        <div className="p-2 sm:p-4">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#006B3F] mb-1">16</div>
                            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Regions</div>
                        </div>
                        <div className="p-2 sm:p-4">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#006B3F] mb-1">50+</div>
                            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Destinations</div>
                        </div>
                        <div className="p-2 sm:p-4">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#006B3F] mb-1">10k+</div>
                            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Estimates</div>
                        </div>
                        <div className="p-2 sm:p-4">
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#006B3F] mb-1">4.9</div>
                            <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">User Rating</div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Features Section */}
            <div id="features" className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Everything You Need to Plan
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            We combine real local data with AI to give you the most accurate trip estimates, so you can travel with confidence.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Smart Budgeting",
                                desc: "Get detailed cost breakdowns for accommodation, food, transport, and activities based on your travel style.",
                                icon: <Calculator className="w-6 h-6" />,
                                color: "bg-[#006B3F]/20 text-[#006B3F]"
                            },
                            {
                                title: "Curated Tours",
                                desc: "Discover hand-picked tours and experiences that match your budget and interests perfectly.",
                                icon: <Star className="w-6 h-6" />,
                                color: "bg-[#FCD116]/30 text-amber-600"
                            },
                            {
                                title: "Itinerary Planning",
                                desc: "Build a day-by-day plan that makes the most of your time in Ghana without breaking the bank.",
                                icon: <Calendar className="w-6 h-6" />,
                                color: "bg-[#CE1126]/20 text-[#CE1126]"
                            }
                        ].map((feature, idx) => (
                            <AnimatedSection key={idx} delay={idx * 100} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600">
                            Planning your dream trip is as easy as 1-2-3
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-100 -z-10"></div>

                        {[
                            { step: "1", title: "Enter Details", desc: "Tell us about your travel style, duration, and interests.", color: "border-[#006B3F] text-[#006B3F]" },
                            { step: "2", title: "Get Estimate", desc: "Receive an instant, detailed budget breakdown for your trip.", color: "border-[#FCD116] text-amber-500" },
                            { step: "3", title: "Start Planning", desc: "Explore recommended tours and finalize your itinerary.", color: "border-[#CE1126] text-[#CE1126]" }
                        ].map((item, idx) => (
                            <AnimatedSection key={idx} delay={idx * 200} className="text-center bg-white p-6">
                                <div className={`w-24 h-24 bg-white border-4 ${item.color} rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-sm`}>
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="py-24 bg-[#006B3F] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">
                            Ready to Explore Ghana?
                        </h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-12 leading-relaxed">
                            GoGhana Planner is your free, AI-powered companion for discovering the beauty, culture, and warmth of West Africa's gem.
                        </p>
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="bg-[#FCD116] text-black hover:bg-white hover:text-[#006B3F] text-lg px-12 py-8 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Start Your Journey
                        </Button>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}

