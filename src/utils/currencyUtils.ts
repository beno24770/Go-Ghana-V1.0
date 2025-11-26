/**
 * Currency Utilities - Formatting and conversion helpers
 */

import type { SupportedCurrency, ExchangeRates } from '../services/currencyService';

/**
 * Currency display information
 */
export const CURRENCY_INFO: Record<SupportedCurrency, { symbol: string; name: string; locale: string }> = {
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
    GHS: { symbol: '₵', name: 'Ghana Cedi', locale: 'en-GH' },
    EUR: { symbol: '€', name: 'Euro', locale: 'en-EU' },
    GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
};

/**
 * Convert amount from one currency to another
 * @param amount - Amount in the source currency
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @param rates - Exchange rates object
 * @returns Converted amount
 */
export function convertAmount(
    amount: number,
    fromCurrency: SupportedCurrency,
    toCurrency: SupportedCurrency,
    rates: ExchangeRates
): number {
    if (fromCurrency === toCurrency) {
        return amount;
    }

    // All rates are relative to GHS (base currency)
    // To convert: amount_in_from -> GHS -> to_currency

    let amountInGHS: number;

    if (fromCurrency === 'GHS') {
        amountInGHS = amount;
    } else {
        // Convert from source currency to GHS
        // If 1 GHS = 0.063 USD, then 1 USD = 1/0.063 GHS
        amountInGHS = amount / rates.rates[fromCurrency];
    }

    if (toCurrency === 'GHS') {
        return amountInGHS;
    }

    // Convert from GHS to target currency
    return amountInGHS * rates.rates[toCurrency];
}

/**
 * Format currency amount with proper symbol and locale
 * @param amount - Amount to format
 * @param currency - Currency code
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
    amount: number,
    currency: SupportedCurrency,
    options: {
        maximumFractionDigits?: number;
        minimumFractionDigits?: number;
        showSymbol?: boolean;
    } = {}
): string {
    const {
        maximumFractionDigits = 0,
        minimumFractionDigits = 0,
        showSymbol = true,
    } = options;

    const info = CURRENCY_INFO[currency];

    if (!showSymbol) {
        return new Intl.NumberFormat(info.locale, {
            maximumFractionDigits,
            minimumFractionDigits,
        }).format(amount);
    }

    return new Intl.NumberFormat(info.locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits,
        minimumFractionDigits,
    }).format(amount);
}

/**
 * Convert and format amount in one step
 * @param amount - Amount in GHS (base currency)
 * @param targetCurrency - Currency to convert to and format
 * @param rates - Exchange rates
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function convertAndFormat(
    amount: number,
    targetCurrency: SupportedCurrency,
    rates: ExchangeRates,
    options?: {
        maximumFractionDigits?: number;
        minimumFractionDigits?: number;
        showSymbol?: boolean;
    }
): string {
    const converted = convertAmount(amount, 'GHS', targetCurrency, rates);
    return formatCurrency(converted, targetCurrency, options);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: SupportedCurrency): string {
    return CURRENCY_INFO[currency].symbol;
}

/**
 * Get currency display name
 */
export function getCurrencyName(currency: SupportedCurrency): string {
    return CURRENCY_INFO[currency].name;
}
