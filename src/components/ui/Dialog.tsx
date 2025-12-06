import type { ReactNode } from 'react';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

interface DialogContentProps {
    children: ReactNode;
    className?: string;
}

interface DialogHeaderProps {
    children: ReactNode;
}

interface DialogTitleProps {
    children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => onOpenChange(false)}
            />
            {/* Content */}
            {children}
        </div>
    );
}

export function DialogContent({ children, className = '' }: DialogContentProps) {
    return (
        <div className={`relative bg-white rounded-lg shadow-xl z-10 ${className}`}>
            {children}
        </div>
    );
}

export function DialogHeader({ children }: DialogHeaderProps) {
    return (
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            {children}
        </div>
    );
}

export function DialogTitle({ children }: DialogTitleProps) {
    return (
        <h2 className="text-xl font-semibold text-gray-900">
            {children}
        </h2>
    );
}
