/**
 * Currency Selector Component
 * Dropdown for selecting display currency (USD, GHS, EUR, GBP)
 */

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import type { SupportedCurrency } from '../../services/currencyService';
import { CURRENCY_INFO } from '../../utils/currencyUtils';

interface CurrencySelectorProps {
    className?: string;
}

export function CurrencySelector({ className = '' }: CurrencySelectorProps) {
    const { selectedCurrency, setSelectedCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currencies: SupportedCurrency[] = ['USD', 'GHS', 'EUR', 'GBP'];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Close dropdown on Escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    const handleSelect = (currency: SupportedCurrency) => {
        setSelectedCurrency(currency);
        setIsOpen(false);
    };

    const currentInfo = CURRENCY_INFO[selectedCurrency];

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCD116] focus:ring-offset-2"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label="Select currency"
            >
                <span className="text-2xl">{currentInfo.symbol}</span>
                <span className="font-medium text-sm">{selectedCurrency}</span>
                <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl z-50 animate-[fadeSlideUp_0.2s_ease-out]"
                    role="listbox"
                    aria-label="Currency options"
                >
                    <div className="py-1">
                        {currencies.map((currency) => {
                            const info = CURRENCY_INFO[currency];
                            const isSelected = currency === selectedCurrency;

                            return (
                                <button
                                    key={currency}
                                    onClick={() => handleSelect(currency)}
                                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors ${isSelected ? 'bg-muted/50' : ''
                                        }`}
                                    role="option"
                                    aria-selected={isSelected}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{info.symbol}</span>
                                        <div className="text-left">
                                            <div className="font-semibold text-sm">{currency}</div>
                                            <div className="text-xs text-muted-foreground">{info.name}</div>
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <Check className="h-4 w-4 text-[#006B3F]" aria-hidden="true" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Info Footer */}
                    <div className="border-t border-border px-4 py-2 bg-muted/30">
                        <p className="text-xs text-muted-foreground">
                            Exchange rates updated daily
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
