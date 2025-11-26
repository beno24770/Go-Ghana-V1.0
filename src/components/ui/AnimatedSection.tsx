import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { cn } from '../../lib/utils';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'pop-in';
    delay?: number;
}

export function AnimatedSection({
    children,
    className,
    animation = 'fade-in-up',
    delay = 0,
    immediate = false
}: AnimatedSectionProps & { immediate?: boolean }) {
    const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

    const shouldAnimate = immediate || isIntersecting;

    return (
        <div
            ref={targetRef}
            className={cn(
                !shouldAnimate && "opacity-0", // Only hide if not immediate and not intersecting
                shouldAnimate && `animate-${animation}`,
                className
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
