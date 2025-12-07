import { calculateBudget } from './calculateBudget';
import type { BudgetFormData } from '../types';

describe('Budget Engine V3', () => {
    // Helper to create basic form data
    const createBaseData = (): BudgetFormData => ({
        duration: 10,
        travelers: 1,
        travelerType: 'solo',
        accommodationLevel: 'budget', // 450 base
        activities: ['culture'], // 80 base
        regions: ['Greater Accra', 'Central'],
        transportMode: 'public', // Cheap
        month: 'October', // Shoulder season
        currency: 'USD',
        includeFlights: false,
        includeInsurance: false,
        roomSharing: 'private'
    });

    test('Basic Budget Calculation (Budget Tier)', () => {
        const data = createBaseData();
        const result = calculateBudget(data);

        expect(result.total).toBeGreaterThan(0);
        expect(result.accommodation).toBeGreaterThan(0);
        expect(result.transport).toBeGreaterThan(0); // Accra -> Cape Coast -> Accra
        expect(result.regionalBreakdown.length).toBe(2);
    });

    test('Higher Tier (Luxury) should cost significantly more', () => {
        const budgetData = createBaseData();
        const luxuryData = { ...createBaseData(), accommodationLevel: 'luxury' as const };

        const budgetResult = calculateBudget(budgetData);
        const luxuryResult = calculateBudget(luxuryData);

        expect(luxuryResult.total).toBeGreaterThan(budgetResult.total * 2);
    });

    test('Custom Daily Budget Scaling', () => {
        const normalData = createBaseData(); // Tier 'budget' ~450+250+100+100 = 900 GHS/day base
        // Set custom budget to double that (approx $115 USD ~ 1800 GHS)
        const highBudgetData = { ...createBaseData(), customDailyBudget: 115 };

        const normalResult = calculateBudget(normalData);
        const scaledResult = calculateBudget(highBudgetData);

        expect(scaledResult.total).toBeGreaterThan(normalResult.total * 1.5);
    });

    test('Northern Region Flight Logic', () => {
        const roadData = { ...createBaseData(), regions: ['Greater Accra', 'Northern'], transportMode: 'public' as const };
        const flightData = { ...createBaseData(), regions: ['Greater Accra', 'Northern'], transportMode: 'flight' as const };

        const roadResult = calculateBudget(roadData);
        const flightResult = calculateBudget(flightData);

        // Flight mode should be much more expensive due to flight costs being added
        expect(flightResult.transport).toBeGreaterThan(roadResult.transport);
        // Check reasonable range (Flight is ~1200 * 2 = 2400 GHS + local transport)
        expect(flightResult.transport).toBeGreaterThan(3000);
    });

    test('Seasonality Impact (December vs May)', () => {
        const lowSeasonData = { ...createBaseData(), month: 'May' };
        const peakSeasonData = { ...createBaseData(), month: 'December' };

        const lowResult = calculateBudget(lowSeasonData);
        const peakResult = calculateBudget(peakSeasonData);

        expect(peakResult.total).toBeGreaterThan(lowResult.total);
    });

    test('Occupancy Sharing Savings', () => {
        const soloData = { ...createBaseData(), travelers: 1, roomSharing: 'private' as const };
        const sharedData = { ...createBaseData(), travelers: 2, roomSharing: 'shared' as const };

        const soloResult = calculateBudget(soloData);
        const sharedResult = calculateBudget(sharedData);

        // Per person cost for pair should be lower than solo (total / travelers)
        const soloPerPerson = soloResult.total;
        const sharedPerPerson = sharedResult.total / 2;

        expect(sharedPerPerson).toBeLessThan(soloPerPerson);
    });

    test('Bolt vs Public Transport Cost', () => {
        const publicData = { ...createBaseData(), transportMode: 'public' as const };
        const boltData = { ...createBaseData(), transportMode: 'bolt' as const };

        const publicResult = calculateBudget(publicData);
        const boltResult = calculateBudget(boltData);

        expect(boltResult.transport).toBeGreaterThan(publicResult.transport);
    });

    test('Essentials Calculation (Visa + Int Flight Manual Estimate)', () => {
        const data = {
            ...createBaseData(),
            nationality: 'USA', // Visa cost 1500
            includeFlights: true,
            origin: 'USA' // ~$1500 USD from JSON
        };
        const result = calculateBudget(data);

        // Flight component
        // 1500 USD * 15.8 = 23,700 GHS
        expect(result.essentials).toBeGreaterThan(20000);
    });

    test('Essentials Calculation (Flight Cost Override)', () => {
        const overrideCost = 500; // USD cheap flight
        const data = {
            ...createBaseData(),
            nationality: 'USA',
            includeFlights: true,
            flightCost: overrideCost, // Should override Origin estimate (1500)
            origin: 'USA'
        };
        const result = calculateBudget(data);

        const expectedFlightCostInGHS = overrideCost * 15.8;
        // Essentials = (Visa + SIM + Transfer + Flight)
        // Visa ~1500, Sim 100, Transfer 300, Flight 7900
        // Total ~9800

        expect(result.flights).toBeCloseTo(expectedFlightCostInGHS, -3); // Check within 1000s
        expect(result.essentials).toBeLessThan(15000); // Should be much less than the 23k above
    });

    test('Regional Cost Variation (Accra vs Northern)', () => {
        // Run single region trips to compare daily costs
        const accraData = { ...createBaseData(), regions: ['Greater Accra'] };
        const northData = { ...createBaseData(), regions: ['Northern'] }; // Cheaper region

        const accraResult = calculateBudget(accraData);
        const northResult = calculateBudget(northData);

        // Compare daily costs derived from total
        expect(accraResult.total).toBeGreaterThan(northResult.total);
    });
});
