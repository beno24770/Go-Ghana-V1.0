import { useState, useEffect } from 'react';

interface BackgroundSliderProps {
    images: string[];
    interval?: number;
    className?: string;
}

export function BackgroundSlider({
    images,
    interval = 5000,
    className = ''
}: BackgroundSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const promises = images.map((src) => {
                return new Promise<string>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(src);
                    img.onerror = () => reject(src);
                });
            });

            try {
                // Wait for at least the first image to load
                const firstImage = await promises[0];
                setLoadedImages(prev => [...prev, firstImage]);

                // Then load the rest
                Promise.all(promises.slice(1)).then(loaded => {
                    setLoadedImages(prev => [...prev, ...loaded]);
                });
            } catch (error) {
                console.error("Failed to load images", error);
            }
        };

        loadImages();
    }, [images]);

    // Auto-advance
    useEffect(() => {
        if (loadedImages.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval, loadedImages.length]);

    return (
        <div
            className={`fixed inset-0 -z-10 bg-black ${className}`}
            aria-label="Background image slider"
        >
            {/* Image Slides */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={image}
                        alt={`Ghana background ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentIndex}
                    />
                ))}
            </div>
        </div>
    );
}
