import { scoreRegions } from './interestScorer';
import { calculateLocalTripCost } from './localPricingEngine';
import type { LocalInputData, LocalItinerary } from '../types/local';

export function generateLocalItineraries(input: LocalInputData): LocalItinerary[] {
    const scoredRegions = scoreRegions(input.interests);
    const topRegions = scoredRegions.slice(0, 2).map((r) => r.region);

    if (topRegions.length === 0) {
        // Fallback if no interests match
        topRegions.push('Central', 'Eastern');
    }

    const duration = Math.ceil(
        (input.dates.end.getTime() - input.dates.start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const itineraries: LocalItinerary[] = [];

    // Option 1: Cheapest / Budget
    const budgetInput = { ...input, budgetTier: 'Low' as const };
    const budgetCost = calculateLocalTripCost(budgetInput, topRegions, duration);
    itineraries.push({
        id: 'opt-budget',
        title: 'Budget Friendly Escape',
        type: 'Cheapest',
        regions: topRegions,
        duration,
        cost: budgetCost,
        transportPlan: {
            mode: input.transportPreference,
            details: 'Standard local transport / fuel efficient routing',
            cost: budgetCost.transport,
        },
        highlights: [`Explore ${topRegions.join(' & ')}`, 'Local street food experience', 'Budget guesthouses'],
        accommodationSuggestion: 'Clean, basic guesthouses or hostels',
    });

    // Option 2: Balanced
    const balancedInput = { ...input, budgetTier: 'Mid' as const };
    const balancedCost = calculateLocalTripCost(balancedInput, topRegions, duration);
    itineraries.push({
        id: 'opt-balanced',
        title: 'Comfort & Culture',
        type: 'Balanced',
        regions: topRegions,
        duration,
        cost: balancedCost,
        transportPlan: {
            mode: input.transportPreference,
            details: 'Comfortable transport mix',
            cost: balancedCost.transport,
        },
        highlights: [`Best of ${topRegions.join(' & ')}`, 'Mid-range hotels with AC', 'Guided tours'],
        accommodationSuggestion: '3-star hotels or lodges',
    });

    // Option 3: Premium
    const premiumInput = { ...input, budgetTier: 'High' as const };
    const premiumCost = calculateLocalTripCost(premiumInput, topRegions, duration);
    itineraries.push({
        id: 'opt-premium',
        title: 'Luxury Local',
        type: 'Premium',
        regions: topRegions,
        duration,
        cost: premiumCost,
        transportPlan: {
            mode: input.transportPreference,
            details: 'Private / Premium transport',
            cost: premiumCost.transport,
        },
        highlights: [`VIP experience in ${topRegions.join(' & ')}`, 'Top-tier resorts', 'Private guides'],
        accommodationSuggestion: '4-5 star resorts or boutique hotels',
    });

    return itineraries;
}
