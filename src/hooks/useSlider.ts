import { useState, useEffect, useCallback } from 'react';

interface UseSliderOptions {
    imageCount: number;
    interval?: number;
    autoPlay?: boolean;
}

interface UseSliderReturn {
    currentIndex: number;
    isPlaying: boolean;
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    pause: () => void;
    resume: () => void;
}

export function useSlider({
    imageCount,
    interval = 5000,
    autoPlay = true,
}: UseSliderOptions): UseSliderReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, [imageCount]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }, [imageCount]);

    const goTo = useCallback((index: number) => {
        if (index >= 0 && index < imageCount) {
            setCurrentIndex(index);
        }
    }, [imageCount]);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const resume = useCallback(() => {
        setIsPlaying(true);
    }, []);

    // Auto-advance effect
    useEffect(() => {
        if (!isPlaying || imageCount <= 1) return;

        // Delay start slightly to ensure initial render is stable
        const startTimer = setTimeout(() => {
            const timer = setInterval(next, interval);
            return () => clearInterval(timer);
        }, 100);

        return () => clearTimeout(startTimer);
    }, [isPlaying, interval, next, imageCount]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [next, prev]);

    return {
        currentIndex,
        isPlaying,
        next,
        prev,
        goTo,
        pause,
        resume,
    };
}
