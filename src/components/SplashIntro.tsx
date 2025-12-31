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
                        "w-32 h-32 sm:w-48 sm:h-48 transition-all duration-700 ease-in-out",
                        phase === 'walking' ? "animate-[walking-bob_1s_ease-in-out_infinite] translate-y-20 opacity-0" : "translate-y-0 opacity-100",
                        phase === 'settled' || phase === 'revealed' ? "scale-110" : ""
                    )}
                    style={{
                        animation: phase === 'walking' ? 'walking-bob 1s ease-in-out infinite, slide-in 2s ease-out forwards' : 'none'
                    }}
                >
                    <img
                        src="/goghana-logo.png"
                        alt="Go Ghana Logo"
                        className="w-full h-full object-contain rounded-2xl shadow-lg"
                    />
                </div>

                {/* Branding Text */}
                <div className={cn(
                    "mt-8 text-center transition-all duration-1000",
                    phase === 'revealed' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-ghana-black mb-2">
                        GO GHANA <span className="text-ghana-green">AI</span>
                    </h1>
                    <p className="font-hand text-2xl sm:text-3xl text-ghana-yellow animate-pulse">
                        Discover Ghana your way
                    </p>
                </div>
            </div>

            {/* Ghana Colors Accent Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-1.5 flex">
                <div className="flex-1 bg-ghana-red" />
                <div className="flex-1 bg-ghana-yellow" />
                <div className="flex-1 bg-ghana-green" />
            </div>

            <style>{`
                @keyframes slide-in {
                    0% { transform: translateY(50px) translateX(-20px); opacity: 0; }
                    100% { transform: translateY(0) translateX(0); opacity: 1; }
                }
                @keyframes walking-bob {
                    0%, 100% { transform: translateY(0) rotate(-2deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
            `}</style>
        </div>
    );
}
