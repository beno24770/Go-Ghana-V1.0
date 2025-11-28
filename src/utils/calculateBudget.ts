import type { BudgetFormData, BudgetBreakdown, RegionalBudget } from '../types';
import {
    BASE_COSTS,
    REGIONAL_ADJUSTMENTS,
    SEASONAL_MULTIPLIERS,
    ESSENTIAL_COSTS,
    FLIGHT_ESTIMATES,
    USD_TO_GHS_RATE,
    TRANSPORT_MODE_COSTS,
    ROOM_SHARING_MULTIPLIERS,
    INTEREST_ADDONS
} from '../data/costData';
import { REGION_INFO } from '../data/regionData';

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function calculateBudget(data: BudgetFormData): BudgetBreakdown {
    const travelerCount = data.travelers || TRAVELER_COUNTS[data.travelerType] || 1;
    const duration = data.duration;

    // --- STEP 1: SEASON FACTOR ---
    const seasonFactor = data.month ? (SEASONAL_MULTIPLIERS[data.month] || 1.0) : 1.0;

    // --- STEP 2: BASE COSTS & ROOM SHARING ---
    // Get base daily costs based on Travel Style (accommodationLevel)
    const style = data.accommodationLevel; // backpacker, budget, mid, comfort, luxury
    let baseAccom = BASE_COSTS.accommodation[style];
    const baseFood = BASE_COSTS.food[style];
    let baseTransport = BASE_COSTS.transport[style];

    // Apply Room Sharing Multiplier to Accommodation
    // one_per_room (private) -> 1.0
    // two_sharing (shared) -> 0.6
    // family_sharing (family) -> 0.45
    const roomSharingMult = data.roomSharing && ROOM_SHARING_MULTIPLIERS[data.roomSharing]
        ? ROOM_SHARING_MULTIPLIERS[data.roomSharing]
        : 1.0;

    // --- STEP 3: TRANSPORT LOGIC ---
    // Override base transport if specific mode is selected
    if (data.transportMode && TRANSPORT_MODE_COSTS[data.transportMode] !== undefined) {
        const modeCost = TRANSPORT_MODE_COSTS[data.transportMode];

        if (['private_driver', 'private_driver_suv', 'rental'].includes(data.transportMode)) {
            // Per vehicle costs - divided by travelers
            // Note: private_driver_suv might need to be handled if added to form, currently mapping 'private_driver' to sedan
            // If user selected 'private_driver', we assume Sedan (1000) unless we have extra logic.
            // Prompt says: Sedan 800-1200, SUV 1200-1500.
            // We'll use the value from TRANSPORT_MODE_COSTS.
            baseTransport = modeCost / travelerCount;
        } else if (data.transportMode === 'bolt') {
            // Bolt: 120-200/day. Is this per person?
            // Usually per car. Let's assume 3 people max per Bolt.
            // If solo -> full cost. If 2 -> split.
            // Let's treat it as per-vehicle cost for simplicity, or per-person if public.
            // Prompt: "Inside Accra -> 120-200/day".
            // Let's assume per vehicle cost shared by up to 3 people.
            const carsNeeded = Math.ceil(travelerCount / 3);
            baseTransport = (modeCost * carsNeeded) / travelerCount;
        } else {
            // Public transport is per person
            baseTransport = modeCost;
        }
    }

    // Domestic Flights Logic
    // If Northern, Upper East, Upper West selected -> Add flight cost
    // Prompt: "Accra <-> Tamale/Wa -> Auto-add domestic flight cost"
    // We'll add this as a one-time cost, not daily.
    let domesticFlightCost = 0;
    const northernRegions = ['Northern', 'Upper East', 'Upper West', 'Savannah', 'North East'];
    const hasNorthernLeg = data.regions?.some(r => northernRegions.includes(r));

    if (hasNorthernLeg) {
        // Approx $100-150 USD return flight? Or GHS?
        // Let's estimate 2000 GHS return per person
        domesticFlightCost = 2000;
    }

    // --- STEP 4: INTERESTS & ACTIVITIES ---
    // Calculate daily activity add-on
    let dailyActivityAddon = 0;
    if (data.activities && data.activities.length > 0) {
        data.activities.forEach(activity => {
            // Map interest string to key in INTEREST_ADDONS
            // Interest strings might be capitalized, e.g. "Culture", "Wildlife"
            // activity is already mapped to ActivityInterest type
            if (activity === 'culture') dailyActivityAddon += INTEREST_ADDONS.culture;
            else if (activity === 'adventure') dailyActivityAddon += INTEREST_ADDONS.adventure;
            // nightlife maps to culture dailyActivityAddon += INTEREST_ADDONS.nightlife;
            else if (activity === 'relaxation') dailyActivityAddon += INTEREST_ADDONS.relaxation;
            else if (activity === 'nature') dailyActivityAddon += INTEREST_ADDONS.nature;
            // food maps to culture dailyActivityAddon += INTEREST_ADDONS.food;
        });
    }

    // --- STEP 5: REGIONAL CALCULATIONS ---
    // Iterate through regions to calculate weighted daily costs
    // If no regions selected, default to Accra
    const regions = (data.regions && data.regions.length > 0) ? data.regions : ['Greater Accra'];
    const daysPerRegion = duration / regions.length;

    let totalAccom = 0;
    let totalFood = 0;
    let totalTransport = 0;
    let totalActivities = 0;
    let regionalBreakdown: RegionalBudget[] = [];

    regions.forEach(region => {
        const adjustments = REGIONAL_ADJUSTMENTS[region] || { transport: 1.0, food: 1.0 };

        // Daily Cost Per Person for this Region
        // Formula:
        // (accom * season * room_share) 
        // + (food * region_food_mult) 
        // + (transport * region_transport_mult) 
        // + activity_addon

        // Note: Season factor applies to Accom. Does it apply to Food/Transport?
        // Prompt: "accomodation_cost x season_factor x room_sharing_multiplier"
        // Prompt: "food_cost x regional_food_multiplier" (No season?)
        // Prompt: "transport_cost x regional_transport_multiplier" (No season?)
        // Usually high season means everything is expensive, but prompt specifically put season on accom.
        // Let's follow prompt EXACTLY.

        const regionDailyAccom = baseAccom * seasonFactor * roomSharingMult;
        const regionDailyFood = baseFood * adjustments.food;
        const regionDailyTransport = baseTransport * adjustments.transport;
        const regionDailyActivity = dailyActivityAddon; // Base activity is 0 now, only add-ons

        const regionDays = daysPerRegion; // Simple equal split

        const rAccom = regionDailyAccom * regionDays * travelerCount;
        const rFood = regionDailyFood * regionDays * travelerCount;
        const rTransport = regionDailyTransport * regionDays * travelerCount;
        const rActivity = regionDailyActivity * regionDays * travelerCount;

        totalAccom += rAccom;
        totalFood += rFood;
        totalTransport += rTransport;
        totalActivities += rActivity;

        const info = REGION_INFO[region] || { tips: [], note: '', highlights: [] };

        regionalBreakdown.push({
            region,
            dailyCost: Math.round(regionDailyAccom + regionDailyFood + regionDailyTransport + regionDailyActivity),
            totalCost: Math.round(rAccom + rFood + rTransport + rActivity),
            accommodation: Math.round(rAccom),
            food: Math.round(rFood),
            transport: Math.round(rTransport),
            activities: Math.round(rActivity),
            tips: info.tips,
            note: info.note
        });
    });

    // Add Domestic Flights to Transport Total
    const totalDomesticFlightCost = domesticFlightCost * travelerCount;
    totalTransport += totalDomesticFlightCost;

    // --- STEP 6: ESSENTIALS & INTERNATIONAL FLIGHTS ---
    const essentialsTotal = Math.round(
        (ESSENTIAL_COSTS.visa +
            ESSENTIAL_COSTS.airportTransfer +
            ESSENTIAL_COSTS.simCard +
            (data.includeInsurance ? ESSENTIAL_COSTS.travelInsurance : 0)) * travelerCount
    );

    let flightsTotal = 0;
    if (data.includeFlights) {
        let flightCostUSD = data.flightCost || FLIGHT_ESTIMATES.defaultFlightEstimate;
        flightsTotal = Math.round(flightCostUSD * USD_TO_GHS_RATE * travelerCount);
    }

    // --- STEP 7: TOTALS ---
    const subtotal = totalAccom + totalFood + totalTransport + totalActivities + essentialsTotal + flightsTotal;
    const contingencyAmount = Math.round(subtotal * ESSENTIAL_COSTS.contingency);
    const total = Math.round(subtotal + contingencyAmount);

    return {
        accommodation: Math.round(totalAccom),
        food: Math.round(totalFood),
        transport: Math.round(totalTransport),
        activities: Math.round(totalActivities),
        essentials: essentialsTotal,
        flights: flightsTotal,
        contingency: contingencyAmount,
        total: total,
        regionalBreakdown: regionalBreakdown
    };
}
