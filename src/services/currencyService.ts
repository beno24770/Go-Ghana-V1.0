/**
 * Currency Service - Handles exchange rate fetching and caching
 * Uses Frankfurter API (https://frankfurter.app) - Free, no API key required
 */

export type SupportedCurrency = 'USD' | 'GHS' | 'EUR' | 'GBP';

export interface ExchangeRates {
    base: SupportedCurrency;
    date: string;
    rates: {
        USD: number;
        GHS: number;
        EUR: number;
        GBP: number;
    };
}

interface CachedRates {
    rates: ExchangeRates;
    timestamp: number;
}

const CACHE_KEY = 'goghana_exchange_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

/**
 * Fetch latest exchange rates from ExchangeRate-API
 * Base currency is USD
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        // Transform API response to our format with GHS as base
        // API returns rates relative to USD (base)
        const usdToGhs = data.rates.GHS;

        const rates: ExchangeRates = {
            base: 'GHS',
            date: data.date,
            rates: {
                GHS: 1, // Base
                USD: 1 / usdToGhs, // Inverse
                EUR: (data.rates.EUR) / usdToGhs, // Cross rate
                GBP: (data.rates.GBP) / usdToGhs, // Cross rate
            },
        };

        // Cache the rates
        cacheRates(rates);

        return rates;
    } catch {
        console.warn('Failed to fetch rates, using fallback');

        // Try to use cached rates as fallback
        const cached = getCachedRates();
        if (cached) {
            console.warn('Using cached exchange rates due to API failure');
            return cached;
        }

        // If no cache available, return default rates
        console.warn('No cached rates available, using default rates');
        return getDefaultRates();
    }
}

/**
 * Get exchange rates - tries cache first, then API
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
    // Check cache first
    const cached = getCachedRates();
    if (cached && !isCacheExpired()) {
        return cached;
    }

    // Cache expired or doesn't exist, fetch new rates
    return fetchExchangeRates();
}

/**
 * Cache exchange rates in localStorage
 */
function cacheRates(rates: ExchangeRates): void {
    try {
        const cached: CachedRates = {
            rates,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
    } catch (error) {
        console.error('Failed to cache exchange rates:', error);
    }
}

/**
 * Get cached exchange rates from localStorage
 */
function getCachedRates(): ExchangeRates | null {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const parsed: CachedRates = JSON.parse(cached);
        return parsed.rates;
    } catch (error) {
        console.error('Failed to read cached rates:', error);
        return null;
    }
}

/**
 * Check if cached rates are expired
 */
function isCacheExpired(): boolean {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return true;

        const parsed: CachedRates = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        return age > CACHE_DURATION;
    } catch {
        return true;
    }
}

/**
 * Get default exchange rates (fallback when API and cache fail)
 * These are approximate rates and should only be used as last resort
 */
function getDefaultRates(): ExchangeRates {
    return {
        base: 'GHS',
        date: new Date().toISOString().split('T')[0],
        rates: {
            GHS: 1,
            USD: 0.063, // Approximate: 1 GHS ≈ 0.063 USD
            EUR: 0.058, // Approximate: 1 GHS ≈ 0.058 EUR
            GBP: 0.050, // Approximate: 1 GHS ≈ 0.050 GBP
        },
    };
}

/**
 * Clear cached rates (useful for testing or forcing refresh)
 */
export function clearCachedRates(): void {
    try {
        localStorage.removeItem(CACHE_KEY);
    } catch (error) {
        console.error('Failed to clear cached rates:', error);
    }
}
