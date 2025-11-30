import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

interface SplitButtonOption {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
}

interface SplitButtonProps {
    primaryLabel: string;
    primaryIcon?: React.ReactNode;
    onPrimaryClick: () => void;
    options: SplitButtonOption[];
    variant?: 'default' | 'outline';
    size?: 'sm' | 'lg';
    className?: string;
}

export function SplitButton({
    primaryLabel,
    primaryIcon,
    onPrimaryClick,
    options,
    variant = 'default',
    size = 'lg',
    className = '',
}: SplitButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const baseClasses = cn(
        'flex items-center gap-0 rounded-full overflow-hidden shadow-lg transition-all duration-300',
        className
    );

    const mainButtonClasses = cn(
        'flex-1 rounded-r-none border-r-0',
        size === 'lg' && 'px-8 py-6 text-lg',
        size === 'sm' && 'px-4 py-2 text-sm'
    );

    const dropdownButtonClasses = cn(
        'rounded-l-none px-3',
        size === 'lg' && 'py-6',
        size === 'sm' && 'py-2'
    );

    return (
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <div className={baseClasses}>
                {/* Main Button */}
                <Button
                    size={size}
                    variant={variant}
                    onClick={onPrimaryClick}
                    className={mainButtonClasses}
                >
                    {primaryIcon && <span className="mr-2">{primaryIcon}</span>}
                    {primaryLabel}
                </Button>

                {/* Dropdown Toggle */}
                <Button
                    size={size}
                    variant={variant}
                    onClick={() => setIsOpen(!isOpen)}
                    className={dropdownButtonClasses}
                    aria-label="More options"
                >
                    <ChevronDown
                        className={cn(
                            'h-5 w-5 transition-transform duration-200',
                            isOpen && 'rotate-180'
                        )}
                    />
                </Button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                option.onClick();
                                setIsOpen(false);
                            }}
                            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-gray-900 font-medium"
                        >
                            {option.icon && <span className="text-gray-500">{option.icon}</span>}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
