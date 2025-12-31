import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface SplashIntroProps {
    onComplete: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
    const [phase, setPhase] = useState<'walking' | 'settled' | 'revealed'>('walking');

    useEffect(() => {
        // Timeline for animation phases
        const timer1 = setTimeout(() => setPhase('settled'), 2000); // 2s walking
        const timer2 = setTimeout(() => setPhase('revealed'), 2500); // 0.5s pause then reveal text
        const timer3 = setTimeout(() => onComplete(), 5000); // 5s total duration

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden">
            <div className="relative flex flex-col items-center">
                {/* Walking/Settled Logo */}
                <div
                    className={cn(
                        "w-48 h-48 sm:w-64 sm:h-64 transition-all duration-1000 ease-in-out",
                        phase === 'walking' ? "scale-95 opacity-0" : "scale-100 opacity-100",
                        phase === 'revealed' ? "scale-105" : "scale-100"
                    )}
                    style={{
                        animation: phase === 'walking'
                            ? 'slide-in-realistic 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                            : 'settle-glow 3s ease-in-out infinite'
                    }}
                >
                    <img
                        src="/goghana-logo.png"
                        alt="Go Ghana Logo"
                        className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                    />
                </div>

                {/* Branding Text */}
                <div className={cn(
                    "mt-12 text-center transition-all duration-1000 delay-300",
                    phase === 'revealed' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}>
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-ghana-black mb-3">
                        GO GHANA <span className="text-ghana-green">AI</span>
                    </h1>
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-hand text-3xl sm:text-4xl text-ghana-yellow tracking-wide">
                            Discover Ghana your way
                        </p>
                        <div className="w-16 h-1 bg-ghana-yellow/30 rounded-full animate-width-reveal" />
                    </div>
                </div>
            </div>

            {/* Ghana Colors Accent Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-1.5 flex">
                <div className="flex-1 bg-ghana-red" />
                <div className="flex-1 bg-ghana-yellow" />
                <div className="flex-1 bg-ghana-green" />
            </div>

            <style>{`
                @keyframes slide-in-realistic {
                    0% { transform: scale(0.8) translateY(100px) rotate(-5deg); opacity: 0; }
                    100% { transform: scale(1) translateY(0) rotate(0); opacity: 1; }
                }
                @keyframes walking-cycle {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(2deg); }
                    50% { transform: translateY(0) rotate(0deg); }
                    75% { transform: translateY(-20px) rotate(-2deg); }
                }
                @keyframes settle-glow {
                    0%, 100% { filter: drop-shadow(0 20px 50px rgba(0,0,0,0.15)); }
                    50% { filter: drop-shadow(0 25px 60px rgba(21, 128, 61, 0.2)); }
                }
                @keyframes width-reveal {
                    0% { width: 0; opacity: 0; }
                    100% { width: 4rem; opacity: 1; }
                }
            `}</style>
        </div>
    );
}
