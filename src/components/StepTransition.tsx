import type { ReactNode } from 'react';

interface StepTransitionProps {
    children: ReactNode;
    direction?: 'forward' | 'backward';
}

export function StepTransition({ children, direction = 'forward' }: StepTransitionProps) {
    const animationClass = direction === 'forward'
        ? 'animate-[fadeSlideUp_0.6s_ease-out]'
        : 'animate-[fadeSlideDown_0.6s_ease-out]';

    return (
        <div className={animationClass}>
            {children}
        </div>
    );
}
