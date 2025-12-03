import { Button } from './ui/Button';
import { ArrowRight, Check, Play, Star, MapPin, Calendar, DollarSign } from 'lucide-react';
import { AnimatedSection } from './ui/AnimatedSection';


interface LandingScreenProps {
    onStart: () => void;
    isLocalMode?: boolean;
    onLocalModeToggle?: (isLocalMode: boolean) => void;
}

export function LandingScreen({ onStart, isLocalMode = false, onLocalModeToggle }: LandingScreenProps) {

    return (
        <div className="min-h-screen relative font-sans text-white overflow-x-hidden">
            {/* Static Background Image */}
            <div className="fixed inset-0 -z-10 bg-black">
                <img
                    src="/cape-coast.jpg"
                    alt="Cape Coast Castle - Ghana"
                    className="w-full h-full object-cover opacity-80"
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
            <div className="relative z-10 container mx-auto px-6 pt-12 pb-24 md:pt-20 md:pb-32 flex flex-col items-center justify-center min-h-[85vh] text-center">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Badge - Animated */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg mb-4 animate-fade-in-up opacity-0 delay-100">
                        <Star className="w-4 h-4 text-ghana-yellow fill-current animate-pulse" />
                        <span className="text-sm font-medium tracking-wide text-white/90">
                            Ghana's First Budget-First AI Travel Planner
                        </span>
                    </div>

                    {/* Main Headline - Animated */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-xl animate-fade-in-up opacity-0 delay-200">
                        PLAN YOUR GHANA TRIP <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ghana-yellow via-white to-ghana-green">
                            ON ANY BUDGET
                        </span>
                    </h1>

                    {/* Subheadline with Handwritten Accent - Animated */}
                    <div className="relative inline-block animate-fade-in-up opacity-0 delay-300">
                        <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto">
                            AI that creates a realistic budget, recommends tours, and builds your full itinerary — all based on what you can afford.
                        </p>
                        <span className="absolute -bottom-8 -right-4 md:-right-12 text-ghana-yellow font-hand text-3xl md:text-4xl -rotate-6 animate-pulse">
                            in just 3 answers!
                        </span>
                    </div>

                    {/* CTA Buttons - Animated */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 animate-fade-in-up opacity-0 delay-400">
                        <Button
                            size="lg"
                            onClick={onStart}
                            className="w-full sm:w-auto bg-ghana-green hover:bg-green-700 text-white h-16 px-10 rounded-full text-xl font-bold shadow-xl hover:shadow-ghana-green/40 hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover-lift"
                        >
                            Start With Your Budget
                            <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto h-16 px-10 rounded-full text-xl font-medium border-2 border-white bg-white text-ghana-green hover:bg-gray-100 transition-all"
                        >
                            <Play className="mr-2 w-5 h-5 fill-current" />
                            How It Works
                        </Button>
                    </div>

                    {/* Positioning Statement */}
                    <div className="pt-12 pb-6 space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                            Not just AI — it’s Ghana’s first budget-first trip planner.
                        </h3>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Most tools tell you where to go. <br className="hidden sm:block" />
                            We help you travel the way your money makes sense.
                        </p>
                    </div>

                    {/* Trust Section */}
                    <div className="border-t border-white/10 pt-8 pb-4">
                        <p className="text-sm font-semibold text-ghana-yellow uppercase tracking-wider mb-3">
                            Trusted by travelers from the US, UK, Germany & Ghana
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-white/70">
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-ghana-green" />
                                Real local pricing
                            </span>
                            <span className="hidden sm:inline text-white/20">•</span>
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-ghana-green" />
                                Real-time recommendations
                            </span>
                            <span className="hidden sm:inline text-white/20">•</span>
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-ghana-green" />
                                Built for Ghana travel
                            </span>
                        </div>
                    </div>
                </div>

                {/* Floating Glass Cards (Decorative) - Moved inside Hero for better positioning */}
                <div className="absolute top-1/3 left-4 lg:left-10 hidden xl:block animate-float" style={{ animationDelay: '0s' }}>
                    <div className="glass-card p-4 rounded-2xl flex items-center gap-3 w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                        <div className="w-12 h-12 rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=100&q=80)' }}></div>
                        <div>
                            <div className="text-xs font-bold text-ghana-green uppercase tracking-wider">Must Visit</div>
                            <div className="text-sm font-bold text-gray-900">Kakum Canopy Walk</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-1/3 right-4 lg:right-10 hidden xl:block animate-float" style={{ animationDelay: '2s' }}>
                    <div className="glass-card p-4 rounded-2xl flex items-center gap-3 w-64 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                        <div className="w-12 h-12 rounded-full bg-ghana-yellow/20 flex items-center justify-center text-ghana-yellow">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Budget</div>
                            <div className="text-lg font-bold text-gray-900">$1,250.00</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works / Features Section Overlay */}
            <div id="how-it-works" className="relative z-20 -mt-24 pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Set Your Budget",
                                desc: (
                                    <div className="space-y-2">
                                        <p>Tell the system how much you want to spend. You’ll instantly get a detailed breakdown of:</p>
                                        <ul className="list-disc list-inside space-y-1 text-white/90">
                                            <li>Accommodation cost</li>
                                            <li>Feeding cost</li>
                                            <li>Transport cost</li>
                                            <li>Activity cost</li>
                                            <li>Hidden fees & local prices</li>
                                        </ul>
                                        <p className="font-medium text-ghana-yellow">Everything is calculated using real Ghana data.</p>
                                    </div>
                                ),
                                icon: <Star className="w-6 h-6 text-white" />,
                                image: new URL('../assets/pick_your_vibe.png', import.meta.url).href
                            },
                            {
                                step: "02",
                                title: "Get Your Plan",
                                desc: (
                                    <div className="space-y-2">
                                        <p>Based on your budget, the system automatically:</p>
                                        <ul className="list-disc list-inside space-y-1 text-white/90">
                                            <li>Recommends tours you can afford</li>
                                            <li>Suggests activities by category</li>
                                            <li>Builds a complete custom itinerary</li>
                                            <li>Lets you edit it to your taste</li>
                                        </ul>
                                        <p className="font-medium text-ghana-yellow">You’re always in control.</p>
                                    </div>
                                ),
                                icon: <MapPin className="w-6 h-6 text-white" />,
                                image: new URL('../assets/get_your_plan.png', import.meta.url).href
                            },
                            {
                                step: "03",
                                title: "Book Trusted Drivers & Guides",
                                desc: (
                                    <div className="space-y-2">
                                        <p>Once you're happy with your itinerary, the system connects you to:</p>
                                        <ul className="list-disc list-inside space-y-1 text-white/90">
                                            <li>Verified drivers</li>
                                            <li>Experienced tour guides</li>
                                            <li>Local experts</li>
                                        </ul>
                                        <p className="font-medium text-ghana-yellow">All vetted for safety and reliability.</p>
                                    </div>
                                ),
                                icon: <Calendar className="w-6 h-6 text-white" />,
                                image: new URL('../assets/hit_the_road.png', import.meta.url).href
                            }
                        ].map((item, idx) => (
                            <AnimatedSection key={idx} delay={idx * 150} className="group relative h-[32rem] rounded-3xl overflow-hidden cursor-pointer shadow-2xl">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="absolute top-6 left-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-white/30">
                                        {item.icon}
                                    </div>

                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-ghana-yellow font-hand text-2xl mb-1">Step {item.step}</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <div className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            {item.desc}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
