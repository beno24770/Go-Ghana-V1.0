import { describe, it, expect } from 'vitest';
import { scoreRegions } from '../services/interestScorer';
import { calculateTransportCost } from '../services/transportCalculator';
import { calculateLocalTripCost } from '../services/localPricingEngine';
import { generateLocalItineraries } from '../services/tripGenerator';
import type { LocalInputData } from '../types/local';

describe('Local Mode Services', () => {
    describe('interestScorer', () => {
        it('should score regions based on interests', () => {
            const interests = ['Weekend Getaway', 'Adventure Trip'];
            const scored = scoreRegions(interests);

            expect(scored.length).toBeGreaterThan(0);
            expect(scored[0]).toHaveProperty('region');
            expect(scored[0]).toHaveProperty('score');
            expect(scored[0]).toHaveProperty('matches');
        });

        it('should return higher scores for regions matching multiple interests', () => {
            const interests = ['Weekend Getaway', 'Romantic Trip'];
            const scored = scoreRegions(interests);

            // Greater Accra should match both
            const accra = scored.find(s => s.region === 'Greater Accra');
            expect(accra).toBeDefined();
            expect(accra!.score).toBe(2);
        });
    });

    describe('transportCalculator', () => {
        it('should calculate Trotro cost correctly', () => {
            const result = calculateTransportCost('Trotro', 'Accra', ['Central'], 2);

            expect(result.totalCost).toBeGreaterThan(0);
            expect(result.details).toContain('Trotro');
        });

        it('should calculate Self-drive cost based on distance', () => {
            const result = calculateTransportCost('Self-drive', 'Accra', ['Ashanti'], 2);

            expect(result.totalCost).toBeGreaterThan(0);
            expect(result.details).toContain('Drive');
        });

        it('should calculate higher costs for more passengers on Trotro', () => {
            const result1 = calculateTransportCost('Trotro', 'Accra', ['Central'], 2);
            const result2 = calculateTransportCost('Trotro', 'Accra', ['Central'], 4);

            expect(result2.totalCost).toBeGreaterThan(result1.totalCost);
        });
    });

    describe('localPricingEngine', () => {
        it('should calculate trip cost correctly', () => {
            const input: LocalInputData = {
                adults: 2,
                groupSize: 2,
                transportPreference: 'Trotro',
                departureCity: 'Accra',
                interests: ['Weekend Getaway'],
                budgetTier: 'Mid',
                dates: {
                    start: new Date('2025-12-01'),
                    end: new Date('2025-12-03'),
                },
            };

            const cost = calculateLocalTripCost(input, ['Central'], 2);

            expect(cost.total).toBeGreaterThan(0);
            expect(cost.accommodation).toBeGreaterThan(0);
            expect(cost.food).toBeGreaterThan(0);
            expect(cost.transport).toBeGreaterThan(0);
            expect(cost.perPerson).toBe(Math.round(cost.total / 2));
        });

        it('should calculate higher costs for premium tier', () => {
            const inputMid: LocalInputData = {
                adults: 2,
                groupSize: 2,
                transportPreference: 'Trotro',
                departureCity: 'Accra',
                interests: ['Weekend Getaway'],
                budgetTier: 'Mid',
                dates: {
                    start: new Date('2025-12-01'),
                    end: new Date('2025-12-03'),
                },
            };

            const inputHigh: LocalInputData = { ...inputMid, budgetTier: 'High' };

            const costMid = calculateLocalTripCost(inputMid, ['Central'], 2);
            const costHigh = calculateLocalTripCost(inputHigh, ['Central'], 2);

            expect(costHigh.total).toBeGreaterThan(costMid.total);
        });
    });

    describe('tripGenerator', () => {
        it('should generate 3 itinerary options', () => {
            const input: LocalInputData = {
                adults: 2,
                groupSize: 2,
                transportPreference: 'Trotro',
                departureCity: 'Accra',
                interests: ['Weekend Getaway'],
                budgetTier: 'Mid',
                dates: {
                    start: new Date('2025-12-01'),
                    end: new Date('2025-12-03'),
                },
            };

            const itineraries = generateLocalItineraries(input);

            expect(itineraries).toHaveLength(3);
            expect(itineraries[0].type).toBe('Cheapest');
            expect(itineraries[1].type).toBe('Balanced');
            expect(itineraries[2].type).toBe('Premium');
        });

        it('should generate itineraries with increasing costs', () => {
            const input: LocalInputData = {
                adults: 2,
                groupSize: 2,
                transportPreference: 'Trotro',
                departureCity: 'Accra',
                interests: ['Weekend Getaway'],
                budgetTier: 'Mid',
                dates: {
                    start: new Date('2025-12-01'),
                    end: new Date('2025-12-03'),
                },
            };

            const itineraries = generateLocalItineraries(input);

            expect(itineraries[1].cost.total).toBeGreaterThan(itineraries[0].cost.total);
            expect(itineraries[2].cost.total).toBeGreaterThan(itineraries[1].cost.total);
        });
    });
});
