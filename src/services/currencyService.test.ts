import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { fetchExchangeRates, getExchangeRates, clearCachedRates } from './currencyService';
import type { ExchangeRates } from './currencyService';

// Mock fetch
globalThis.fetch = vi.fn();

describe('Currency Service', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        clearCachedRates();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('fetchExchangeRates', () => {
        it('should fetch exchange rates from Frankfurter API', async () => {
            const mockResponse = {
                amount: 1,
                base: 'USD',
                date: '2024-01-15',
                rates: {
                    EUR: 0.92,
                    GBP: 0.79,
                },
            };

            (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const rates = await fetchExchangeRates();

            expect(rates.base).toBe('GHS');
            expect(rates.date).toBe('2024-01-15');
            expect(rates.rates.GHS).toBe(1);
            expect(rates.rates.USD).toBeCloseTo(0.063, 2);
            expect(rates.rates.EUR).toBeGreaterThan(0);
            expect(rates.rates.GBP).toBeGreaterThan(0);

            expect(globalThis.fetch).toHaveBeenCalledWith(
                'https://api.frankfurter.app/latest?from=USD&to=EUR,GBP'
            );
        });

        it('should cache fetched rates in localStorage', async () => {
            const mockResponse = {
                amount: 1,
                base: 'USD',
                date: '2024-01-15',
                rates: {
                    EUR: 0.92,
                    GBP: 0.79,
                },
            };

            (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            await fetchExchangeRates();

            const cached = localStorage.getItem('goghana_exchange_rates');
            expect(cached).toBeTruthy();

            const parsed = JSON.parse(cached!);
            expect(parsed.rates).toBeDefined();
            expect(parsed.timestamp).toBeDefined();
        });

        it('should return default rates on API failure with no cache', async () => {
            (globalThis.fetch as unknown as Mock).mockRejectedValueOnce(new Error('Network error'));

            const rates = await fetchExchangeRates();

            expect(rates.base).toBe('GHS');
            expect(rates.rates.GHS).toBe(1);
            expect(rates.rates.USD).toBeGreaterThan(0);
            expect(rates.rates.EUR).toBeGreaterThan(0);
            expect(rates.rates.GBP).toBeGreaterThan(0);
        });

        it('should use cached rates on API failure when cache exists', async () => {
            // First, cache some rates
            const mockResponse = {
                amount: 1,
                base: 'USD',
                date: '2024-01-15',
                rates: {
                    EUR: 0.92,
                    GBP: 0.79,
                },
            };

            (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            await fetchExchangeRates();

            // Now simulate API failure
            (globalThis.fetch as unknown as Mock).mockRejectedValueOnce(new Error('Network error'));

            const rates = await fetchExchangeRates();

            expect(rates.date).toBe('2024-01-15');
            expect(rates.rates.USD).toBeCloseTo(0.063, 2);
        });
    });

    describe('getExchangeRates', () => {
        it('should return cached rates if cache is valid', async () => {
            // Cache some rates
            const cachedRates: ExchangeRates = {
                base: 'GHS',
                date: '2024-01-15',
                rates: {
                    GHS: 1,
                    USD: 0.063,
                    EUR: 0.058,
                    GBP: 0.050,
                },
            };

            localStorage.setItem(
                'goghana_exchange_rates',
                JSON.stringify({
                    rates: cachedRates,
                    timestamp: Date.now(),
                })
            );

            const rates = await getExchangeRates();

            expect(rates).toEqual(cachedRates);
            expect(globalThis.fetch).not.toHaveBeenCalled();
        });

        it('should fetch new rates if cache is expired', async () => {
            // Cache old rates (25 hours ago)
            const oldRates: ExchangeRates = {
                base: 'GHS',
                date: '2024-01-14',
                rates: {
                    GHS: 1,
                    USD: 0.060,
                    EUR: 0.055,
                    GBP: 0.048,
                },
            };

            const twentyFiveHoursAgo = Date.now() - 25 * 60 * 60 * 1000;

            localStorage.setItem(
                'goghana_exchange_rates',
                JSON.stringify({
                    rates: oldRates,
                    timestamp: twentyFiveHoursAgo,
                })
            );

            const mockResponse = {
                amount: 1,
                base: 'USD',
                date: '2024-01-15',
                rates: {
                    EUR: 0.92,
                    GBP: 0.79,
                },
            };

            (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const rates = await getExchangeRates();

            expect(rates.date).toBe('2024-01-15');
            expect(globalThis.fetch).toHaveBeenCalled();
        });

        it('should fetch new rates if no cache exists', async () => {
            const mockResponse = {
                amount: 1,
                base: 'USD',
                date: '2024-01-15',
                rates: {
                    EUR: 0.92,
                    GBP: 0.79,
                },
            };

            (globalThis.fetch as unknown as Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const rates = await getExchangeRates();

            expect(rates.date).toBe('2024-01-15');
            expect(globalThis.fetch).toHaveBeenCalled();
        });
    });

    describe('clearCachedRates', () => {
        it('should remove cached rates from localStorage', () => {
            localStorage.setItem('goghana_exchange_rates', 'test');
            clearCachedRates();
            expect(localStorage.getItem('goghana_exchange_rates')).toBeNull();
        });
    });
});
