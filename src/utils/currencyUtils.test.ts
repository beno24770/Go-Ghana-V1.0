import { describe, it, expect } from 'vitest';
import { convertAmount, formatCurrency, convertAndFormat, getCurrencySymbol, getCurrencyName } from './currencyUtils';
import type { ExchangeRates } from '../services/currencyService';

describe('Currency Utils', () => {
    const mockRates: ExchangeRates = {
        base: 'GHS',
        date: '2024-01-15',
        rates: {
            GHS: 1,
            USD: 0.063,
            EUR: 0.058,
            GBP: 0.050,
        },
    };

    describe('convertAmount', () => {
        it('should return same amount when converting to same currency', () => {
            const result = convertAmount(100, 'USD', 'USD', mockRates);
            expect(result).toBe(100);
        });

        it('should convert from GHS to USD correctly', () => {
            const result = convertAmount(100, 'GHS', 'USD', mockRates);
            expect(result).toBeCloseTo(6.3, 2);
        });

        it('should convert from USD to GHS correctly', () => {
            const result = convertAmount(6.3, 'USD', 'GHS', mockRates);
            expect(result).toBeCloseTo(100, 0);
        });

        it('should convert from USD to EUR correctly', () => {
            // 6.3 USD -> GHS -> EUR
            // 6.3 / 0.063 = 100 GHS
            // 100 * 0.058 = 5.8 EUR
            const result = convertAmount(6.3, 'USD', 'EUR', mockRates);
            expect(result).toBeCloseTo(5.8, 1);
        });

        it('should convert from EUR to GBP correctly', () => {
            const result = convertAmount(5.8, 'EUR', 'GBP', mockRates);
            expect(result).toBeCloseTo(5.0, 1);
        });

        it('should handle zero amounts', () => {
            const result = convertAmount(0, 'USD', 'EUR', mockRates);
            expect(result).toBe(0);
        });

        it('should handle large amounts', () => {
            const result = convertAmount(1000000, 'GHS', 'USD', mockRates);
            expect(result).toBeCloseTo(63000, 0);
        });
    });

    describe('formatCurrency', () => {
        it('should format USD correctly', () => {
            const result = formatCurrency(1234.56, 'USD');
            expect(result).toContain('1,235');
            expect(result).toMatch(/\$|USD/);
        });

        it('should format GHS correctly', () => {
            const result = formatCurrency(1234.56, 'GHS');
            expect(result).toContain('1,235');
        });

        it('should format EUR correctly', () => {
            const result = formatCurrency(1234.56, 'EUR');
            expect(result).toContain('1,235');
            expect(result).toMatch(/€|EUR/);
        });

        it('should format GBP correctly', () => {
            const result = formatCurrency(1234.56, 'GBP');
            expect(result).toContain('1,235');
            expect(result).toMatch(/£|GBP/);
        });

        it('should respect maximumFractionDigits option', () => {
            const result = formatCurrency(1234.56, 'USD', { maximumFractionDigits: 2 });
            expect(result).toContain('1,234.56');
        });

        it('should format without symbol when showSymbol is false', () => {
            const result = formatCurrency(1234, 'USD', { showSymbol: false });
            expect(result).not.toContain('$');
            expect(result).toContain('1,234');
        });

        it('should handle zero amounts', () => {
            const result = formatCurrency(0, 'USD');
            expect(result).toContain('0');
        });

        it('should handle negative amounts', () => {
            const result = formatCurrency(-1234, 'USD');
            expect(result).toContain('1,234');
        });
    });

    describe('convertAndFormat', () => {
        it('should convert from GHS and format in USD', () => {
            const result = convertAndFormat(100, 'USD', mockRates);
            expect(result).toContain('6');
        });

        it('should convert from GHS and format in EUR', () => {
            const result = convertAndFormat(100, 'EUR', mockRates);
            expect(result).toContain('6');
        });

        it('should convert from GHS and format in GBP', () => {
            const result = convertAndFormat(100, 'GBP', mockRates);
            expect(result).toContain('5');
        });

        it('should handle formatting options', () => {
            const result = convertAndFormat(100, 'USD', mockRates, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            });
            expect(result).toMatch(/\d+\.\d{2}/);
        });
    });

    describe('getCurrencySymbol', () => {
        it('should return correct symbol for USD', () => {
            expect(getCurrencySymbol('USD')).toBe('$');
        });

        it('should return correct symbol for GHS', () => {
            expect(getCurrencySymbol('GHS')).toBe('₵');
        });

        it('should return correct symbol for EUR', () => {
            expect(getCurrencySymbol('EUR')).toBe('€');
        });

        it('should return correct symbol for GBP', () => {
            expect(getCurrencySymbol('GBP')).toBe('£');
        });
    });

    describe('getCurrencyName', () => {
        it('should return correct name for USD', () => {
            expect(getCurrencyName('USD')).toBe('US Dollar');
        });

        it('should return correct name for GHS', () => {
            expect(getCurrencyName('GHS')).toBe('Ghana Cedi');
        });

        it('should return correct name for EUR', () => {
            expect(getCurrencyName('EUR')).toBe('Euro');
        });

        it('should return correct name for GBP', () => {
            expect(getCurrencyName('GBP')).toBe('British Pound');
        });
    });
});
