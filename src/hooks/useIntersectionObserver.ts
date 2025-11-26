import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentTarget = targetRef.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                // Once visible, we can stop observing if we only want the animation to happen once
                if (currentTarget) {
                    observer.unobserve(currentTarget);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px',
            ...options
        });

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(options)]);

    return { targetRef, isIntersecting };
}
