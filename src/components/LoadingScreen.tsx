import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const messages = [
    "Crunching numbers...",
    "Analyzing your trip preferences...",
    "Finding the best options for you...",
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Rotate messages
        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 800);

        // Animate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        // Auto-complete after 2 seconds
        const timeout = setTimeout(() => {
            onComplete();
        }, 2000);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-8 animate-[fadeSlideUp_0.5s_ease-out]">
                {/* Spinning Ghana Star */}
                <div className="flex justify-center">
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 100 100"
                        className="animate-spin"
                        style={{ animationDuration: '2s' }}
                    >
                        <polygon
                            points="50,15 61,40 88,40 67,57 75,82 50,65 25,82 33,57 12,40 39,40"
                            fill="#000000"
                        />
                    </svg>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground animate-pulse">
                        {messages[messageIndex]}
                    </h2>

                    {/* Ghana Color Progress Bar */}
                    <div className="w-80 max-w-full mx-auto">
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-300 ease-out"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #CE1126 0%, #FCD116 50%, #006B3F 100%)'
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
