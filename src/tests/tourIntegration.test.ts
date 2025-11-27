import { describe, it, expect } from 'vitest';
import { tours } from '../data/tours';

describe('Tour Data Integration', () => {
    // IDs of the newly added tours
    const newTourIds = [
        '14', '15', '16', '17', '18', '19', '20', // Budget
        '21', '22', '23', '24', '25', '26', '27', // Mid
        '28', '29', '30'                          // Comfort
    ];

    it('should contain all new tours', () => {
        const tourIds = tours.map(t => t.id);
        newTourIds.forEach(id => {
            expect(tourIds).toContain(id);
        });
    });

    it('should have correct properties for new tours', () => {
        newTourIds.forEach(id => {
            const tour = tours.find(t => t.id === id);
            expect(tour).toBeDefined();
            expect(tour?.price).toBeGreaterThan(0);
            expect(tour?.dailyCost).toBeGreaterThan(0);
            expect(tour?.category.length).toBeGreaterThan(0);
            expect(tour?.regions?.length).toBeGreaterThan(0);
        });
    });

    describe('Recommendation Logic Simulation', () => {
        it('should recommend Comfort Tier tours for a high budget user', () => {
            // User Budget: 14,000 GHS for 7 days = 2,000 GHS/day
            // Logic: dailyCost within 0.7 * 2000 (1400) and 1.3 * 2000 (2600)
            const budget = 14000;
            const budgetPerDay = budget / 7;
            const minCost = budgetPerDay * 0.7;
            const maxCost = budgetPerDay * 1.3;

            const comfortTours = tours.filter(t =>
                ['28', '29', '30'].includes(t.id)
            );

            comfortTours.forEach(tour => {
                expect(tour.dailyCost).toBeGreaterThanOrEqual(minCost);
                expect(tour.dailyCost).toBeLessThanOrEqual(maxCost);
                expect(tour.range).toBe('comfort');
            });
        });

        it('should recommend Mid Tier tours for a medium budget user', () => {
            // User Budget: 10,500 GHS for 7 days = 1,500 GHS/day
            // Logic: dailyCost within 0.7 * 1500 (1050) and 1.3 * 1500 (1950)
            const budget = 10500;
            const budgetPerDay = budget / 7;
            const minCost = budgetPerDay * 0.7;
            const maxCost = budgetPerDay * 1.3;

            const midTours = tours.filter(t =>
                ['21', '22', '23', '24', '25', '26', '27'].includes(t.id)
            );

            midTours.forEach(tour => {
                expect(tour.dailyCost).toBeGreaterThanOrEqual(minCost);
                expect(tour.dailyCost).toBeLessThanOrEqual(maxCost);
                expect(tour.range).toBe('mid');
            });
        });

        it('should recommend Budget Tier tours for a low budget user', () => {
            // User Budget: 6,300 GHS for 7 days = 900 GHS/day
            // Logic: dailyCost within 0.7 * 900 (630) and 1.3 * 900 (1170)
            const budget = 6300;
            const budgetPerDay = budget / 7;
            const minCost = budgetPerDay * 0.7;
            const maxCost = budgetPerDay * 1.3;

            const budgetTours = tours.filter(t =>
                ['14', '15', '16', '17', '18', '19', '20'].includes(t.id)
            );

            budgetTours.forEach(tour => {
                expect(tour.dailyCost).toBeGreaterThanOrEqual(minCost);
                expect(tour.dailyCost).toBeLessThanOrEqual(maxCost);
                expect(tour.range).toBe('budget');
            });
        });
    });
});
