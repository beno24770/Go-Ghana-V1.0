import { BudgetFormData, BudgetBreakdown } from '../types';
import {
    BASE_COSTS,
    INTEREST_ADDONS,
    SEASONAL_MULTIPLIERS,
    ESSENTIAL_COSTS,
    USD_TO_GHS_RATE,
    AVERAGE_FLIGHT_COST_USD
} from '../data/costData';

/**
 * Calculate budget breakdown based on user preferences
 * This matches the exact logic from the web application
 */
export function calculateBudget(data: BudgetFormData): BudgetBreakdown {
    const travelerCount = data.travelers || 1;
    const duration = data.duration;
    const seasonFactor = data.month ? (SEASONAL_MULTIPLIERS[data.month] || 1.0) : 1.0;

    // Base Costs per day
    const style = data.accommodationLevel;
    const baseAccom = BASE_COSTS.accommodation[style];
    const baseFood = BASE_COSTS.food[style];
    const baseTransport = BASE_COSTS.transport[style];

    // Activity Add-ons per day
    let dailyActivityAddon = 0;
    if (data.activities && data.activities.length > 0) {
        data.activities.forEach(activity => {
            const activityLower = activity.toLowerCase();
            if (activityLower === 'culture') {
                dailyActivityAddon += INTEREST_ADDONS.culture;
            } else if (activityLower === 'adventure') {
                dailyActivityAddon += INTEREST_ADDONS.adventure;
            } else if (activityLower === 'nature') {
                dailyActivityAddon += INTEREST_ADDONS.nature;
            } else if (activityLower === 'nightlife') {
                dailyActivityAddon += INTEREST_ADDONS.nightlife;
            } else if (activityLower === 'relaxation') {
                dailyActivityAddon += INTEREST_ADDONS.relaxation;
            } else if (activityLower === 'food') {
                dailyActivityAddon += INTEREST_ADDONS.food;
            }
        });
    }

    // Daily Totals
    const dailyTotal = (baseAccom * seasonFactor) + baseFood + baseTransport + dailyActivityAddon;
    const tripTotal = dailyTotal * duration * travelerCount;

    // Essentials (one-time costs)
    const essentials = (
        ESSENTIAL_COSTS.visa +
        ESSENTIAL_COSTS.simCard +
        (data.includeInsurance ? ESSENTIAL_COSTS.travelInsurance : 0)
    ) * travelerCount;

    // Flights (optional)
    const flights = data.includeFlights
        ? Math.round(AVERAGE_FLIGHT_COST_USD * USD_TO_GHS_RATE * travelerCount)
        : 0;

    // Subtotal and Contingency
    const subtotal = tripTotal + essentials + flights;
    const contingency = Math.round(subtotal * ESSENTIAL_COSTS.contingency);

    return {
        accommodation: Math.round(baseAccom * seasonFactor * duration * travelerCount),
        food: Math.round(baseFood * duration * travelerCount),
        transport: Math.round(baseTransport * duration * travelerCount),
        activities: Math.round(dailyActivityAddon * duration * travelerCount),
        essentials,
        flights,
        contingency,
        total: Math.round(subtotal + contingency)
    };
}

/**
 * Format currency in GHS with proper formatting
 */
export function formatCurrency(amount: number): string {
    return `GH₵ ${amount.toLocaleString('en-GH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

/**
 * Calculate daily budget per person
 */
export function calculateDailyBudget(total: number, duration: number, travelers: number): number {
    return Math.round(total / duration / travelers);
}
