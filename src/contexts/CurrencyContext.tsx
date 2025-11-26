/**
 * Currency Context - Global state management for currency selection and exchange rates
 */

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SupportedCurrency, ExchangeRates } from '../services/currencyService';
import { getExchangeRates } from '../services/currencyService';
import { convertAmount, formatCurrency as formatCurrencyUtil } from '../utils/currencyUtils';

interface CurrencyContextValue {
    selectedCurrency: SupportedCurrency;
    setSelectedCurrency: (currency: SupportedCurrency) => void;
    exchangeRates: ExchangeRates | null;
    isLoading: boolean;
    error: string | null;
    convertAmount: (amount: number, fromCurrency: SupportedCurrency, toCurrency: SupportedCurrency) => number;
    formatCurrency: (amount: number, currency?: SupportedCurrency) => string;
    convertAndFormat: (amountInGHS: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const SELECTED_CURRENCY_KEY = 'goghana_selected_currency';

interface CurrencyProviderProps {
    children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
    // Initialize from localStorage or default to USD
    const [selectedCurrency, setSelectedCurrencyState] = useState<SupportedCurrency>(() => {
        try {
            const saved = localStorage.getItem(SELECTED_CURRENCY_KEY);
            if (saved && ['USD', 'GHS', 'EUR', 'GBP'].includes(saved)) {
                return saved as SupportedCurrency;
            }
        } catch (error) {
            console.error('Failed to read selected currency from localStorage:', error);
        }
        return 'USD';
    });

    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch exchange rates on mount
    useEffect(() => {
        async function fetchRates() {
            try {
                setIsLoading(true);
                setError(null);
                const rates = await getExchangeRates();
                setExchangeRates(rates);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch exchange rates';
                setError(errorMessage);
                console.error('Error fetching exchange rates:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRates();
    }, []);

    // Persist selected currency to localStorage
    const setSelectedCurrency = (currency: SupportedCurrency) => {
        setSelectedCurrencyState(currency);
        try {
            localStorage.setItem(SELECTED_CURRENCY_KEY, currency);
        } catch (error) {
            console.error('Failed to save selected currency to localStorage:', error);
        }
    };

    // Helper function to convert amounts
    const convert = (amount: number, fromCurrency: SupportedCurrency, toCurrency: SupportedCurrency): number => {
        if (!exchangeRates) {
            console.warn('Exchange rates not loaded, returning original amount');
            return amount;
        }
        return convertAmount(amount, fromCurrency, toCurrency, exchangeRates);
    };

    // Helper function to format currency
    const formatCurrency = (amount: number, currency?: SupportedCurrency): string => {
        const currencyToUse = currency || selectedCurrency;
        return formatCurrencyUtil(amount, currencyToUse, { maximumFractionDigits: 0 });
    };

    // Helper to convert from GHS (base) and format in selected currency
    const convertAndFormat = (amountInGHS: number): string => {
        if (!exchangeRates) {
            return formatCurrency(amountInGHS, 'GHS');
        }
        const converted = convert(amountInGHS, 'GHS', selectedCurrency);
        return formatCurrency(converted, selectedCurrency);
    };

    const value: CurrencyContextValue = {
        selectedCurrency,
        setSelectedCurrency,
        exchangeRates,
        isLoading,
        error,
        convertAmount: convert,
        formatCurrency,
        convertAndFormat,
    };

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

/**
 * Hook to use currency context
 * @throws Error if used outside CurrencyProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCurrency(): CurrencyContextValue {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
