import { useSlider } from '../hooks/useSlider';

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
    const { currentIndex, isPlaying, goTo, pause, resume } = useSlider({
        imageCount: images.length,
        interval,
        autoPlay: true,
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <div
            className={`fixed inset-0 -z-10 ${className}`}
            onMouseEnter={pause}
            onMouseLeave={resume}
            aria-label="Background image slider"
        >
            {/* Image Slides */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        animation: !prefersReducedMotion && index === currentIndex
                            ? 'kenBurns 20s ease-out infinite'
                            : 'none',
                    }}
                >
                    <img
                        src={image}
                        alt={`Ghana background ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                </div>
            ))}

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentIndex}
                    />
                ))}
            </div>

            {/* Play/Pause Indicator (optional) */}
            {!isPlaying && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    Paused
                </div>
            )}

            {/* Ken Burns Animation */}
            <style>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.1) translate(-2%, -2%);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
        </div>
    );
}
