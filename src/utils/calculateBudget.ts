import type { BudgetFormData, BudgetBreakdown, RegionalBudget } from '../types';
import {
    BASE_COSTS,
    SEASONAL_MULTIPLIERS_V2,
    MONTH_TO_SEASON,
    REGION_MULTIPLIERS_V2,
    ACTIVITY_COSTS_V2,
    FLIGHT_COSTS_BY_ORIGIN,
    CONTINGENCY_RATES_V2,
    TIER_MULTIPLIERS_V2,
    FUEL_RATE_PER_KM,
    VISA_COSTS,
    ESSENTIAL_COSTS,
    USD_TO_GHS_RATE,
    TRANSPORT_MODE_COSTS
} from '../data/costData';
import { REGION_INFO } from '../data/regionData';
import regionDistances from '../data/regionDistances.json';

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function calculateBudget(data: BudgetFormData): BudgetBreakdown {
    const travelerCount = data.travelers || TRAVELER_COUNTS[data.travelerType] || 1;
    const duration = data.duration;

    // Determine Season
    const season = data.month && MONTH_TO_SEASON[data.month] ? MONTH_TO_SEASON[data.month] : "Shoulder";
    const seasonalMultipliers = SEASONAL_MULTIPLIERS_V2[season];

    // Determine Tier
    const tier = data.accommodationLevel; // backpacker, budget, mid, comfort, luxury

    // --- CUSTOM BUDGET SCALING ---
    let scalingFactor = 1.0;
    if (data.customDailyBudget) {
        // Calculate default daily cost for this tier to derive scaling factor
        // We use base rates without seasonality/region for the baseline comparison
        const defaultAccom = BASE_COSTS.accommodation[tier];
        const defaultFood = BASE_COSTS.food[tier];
        const defaultTransport = BASE_COSTS.transport[tier];

        // Estimate daily activity (rough average)
        let defaultActivity = 0;
        if (tier === 'backpacker') defaultActivity = 50;
        else if (tier === 'budget') defaultActivity = 100;
        else if (tier === 'mid') defaultActivity = 200;
        else if (tier === 'comfort') defaultActivity = 400;
        else if (tier === 'luxury') defaultActivity = 800;

        const defaultDailyTotalGHS = defaultAccom + defaultFood + defaultTransport + defaultActivity;
        const targetDailyTotalGHS = data.customDailyBudget * USD_TO_GHS_RATE;

        if (defaultDailyTotalGHS > 0) {
            scalingFactor = targetDailyTotalGHS / defaultDailyTotalGHS;
        }
    }

    // --- STEP 1: ACCOMMODATION ---
    const baseAccomRate = BASE_COSTS.accommodation[tier] * scalingFactor;
    let accomCostPerPerson: number = baseAccomRate;

    if (data.roomSharing === 'shared') {
        accomCostPerPerson = baseAccomRate / Math.min(2, travelerCount);
    } else if (data.roomSharing === 'family') {
        accomCostPerPerson = travelerCount >= 3 ? baseAccomRate * 0.6 : baseAccomRate * 0.75;
    } else {
        // Private
        accomCostPerPerson = baseAccomRate;
    }

    // Apply Seasonality to Accommodation
    accomCostPerPerson *= seasonalMultipliers.accommodation;

    // --- STEP 2: TRANSPORT ---
    // Calculate total distance
    const regions = (data.regions && data.regions.length > 0) ? data.regions : ['Greater Accra'];
    let totalDistance = 0;

    // Assume route: Accra -> Region 1 -> Region 2 ... -> Accra
    let currentLoc = "Accra";
    regions.forEach(r => {
        // Map region name to city name if needed, or use region name if in JSON
        // JSON has "Accra", "Kumasi" (Ashanti), "Cape Coast" (Central), "Takoradi" (Western), "Ho" (Volta), "Tamale" (Northern), "Sunyani" (Bono)
        let targetCity = r;
        if (r === "Greater Accra") targetCity = "Accra";
        if (r === "Ashanti") targetCity = "Kumasi";
        if (r === "Central") targetCity = "Cape Coast";
        if (r === "Western") targetCity = "Takoradi";
        if (r === "Volta") targetCity = "Ho";
        if (r === "Northern") targetCity = "Tamale";
        if (r === "Bono") targetCity = "Sunyani";

        // @ts-ignore
        const dist = regionDistances[currentLoc]?.[targetCity] || regionDistances[targetCity]?.[currentLoc] || 150; // Default 150km
        totalDistance += dist;
        currentLoc = targetCity;
    });
    // Return to Accra
    // @ts-ignore
    const returnDist = regionDistances[currentLoc]?.["Accra"] || regionDistances["Accra"]?.[currentLoc] || 150;
    totalDistance += returnDist;

    let dailyTransportCost = 0;

    if (data.transportMode === 'private_driver' || data.transportMode === 'rental') {
        // Minimum daily cost override
        dailyTransportCost = TRANSPORT_MODE_COSTS[data.transportMode] / travelerCount;
    } else if (data.transportMode === 'bolt') {
        // Bolt (City based) - approx 160/day per vehicle
        dailyTransportCost = (TRANSPORT_MODE_COSTS.bolt * Math.ceil(travelerCount / 3)) / travelerCount;
    } else if (data.transportMode === 'public') {
        // Distance based public transport
        // Base rate + (dist * rate) / days
        const totalPublicCost = (totalDistance * 0.5); // 0.5 GHS per km for public?
        dailyTransportCost = ((BASE_COSTS.transport[tier] * scalingFactor) + (totalPublicCost / duration));
    } else {
        // Default Distance-based calculation
        // transportCost = baseRate + (distanceKm * fuelRate * regionMultiplier * seasonMultiplier)
        // We calculate a daily average
        const baseTransport = BASE_COSTS.transport[tier] * scalingFactor;
        const fuelCostTotal = totalDistance * FUEL_RATE_PER_KM;

        // Average region multiplier
        const avgRegionMult = regions.reduce((sum, r) => sum + (REGION_MULTIPLIERS_V2[r]?.transport || 1.0), 0) / regions.length;

        const totalTransport = (baseTransport * duration) + (fuelCostTotal * avgRegionMult * seasonalMultipliers.transport);
        dailyTransportCost = totalTransport / duration;
    }

    // Domestic Flights (Northern Regions)
    const northernRegions = ['Northern', 'Upper East', 'Upper West', 'Savannah', 'North East'];
    const hasNorthernLeg = regions.some(r => northernRegions.includes(r));
    const domesticFlightCost = hasNorthernLeg ? 2000 : 0;

    // --- STEP 3: ACTIVITIES ---
    // Daily-style costs (mood-based)
    let dailyActivityBase = 0;
    if (data.activities) {
        data.activities.forEach(act => {
            if (act === 'adventure') dailyActivityBase += ACTIVITY_COSTS_V2.daily.adventure;
            if (act === 'culture') dailyActivityBase += ACTIVITY_COSTS_V2.daily.culture;
            if (act === 'nature') dailyActivityBase += ACTIVITY_COSTS_V2.daily.nature;
            if (act === 'relaxation') dailyActivityBase += ACTIVITY_COSTS_V2.daily.relaxation;
        });
    }
    // Apply Tier Multiplier to daily activities
    const tierMult = (TIER_MULTIPLIERS_V2[tier] || 1.0) * scalingFactor;
    dailyActivityBase *= tierMult;

    // Apply Season Multiplier
    dailyActivityBase *= seasonalMultipliers.activities;

    // Fixed activity cost (100 GHS per planned activity)
    // Estimate 1 fixed activity every 2 days
    const estimatedFixedActivities = Math.ceil(duration / 2);
    const totalFixedActivityCost = estimatedFixedActivities * ACTIVITY_COSTS_V2.fixedPerActivity;

    const dailyActivityTotal = dailyActivityBase + (totalFixedActivityCost / duration);


    // --- STEP 4: REGIONAL BREAKDOWN ---
    const daysPerRegion = duration / regions.length;
    let totalAccom = 0;
    let totalFood = 0;
    let totalTransport = 0;
    let totalActivities = 0;
    const regionalBreakdown: RegionalBudget[] = [];

    regions.forEach(region => {
        const modifiers = REGION_MULTIPLIERS_V2[region] || { transport: 1.0, food: 1.0 };

        // Food
        const baseFood = BASE_COSTS.food[tier] * scalingFactor;
        const regionFood = baseFood * modifiers.food;

        // Transport (apply region modifier to daily cost)
        const regionTransport = dailyTransportCost * modifiers.transport;

        // Calculate totals for this region
        const rAccom = accomCostPerPerson * daysPerRegion * travelerCount;
        const rFood = regionFood * daysPerRegion * travelerCount;
        const rTransport = regionTransport * daysPerRegion * travelerCount;
        const rActivity = dailyActivityTotal * daysPerRegion * travelerCount;

        totalAccom += rAccom;
        totalFood += rFood;
        totalTransport += rTransport;
        totalActivities += rActivity;

        const info = REGION_INFO[region] || { tips: [], note: '', highlights: [] };

        regionalBreakdown.push({
            region,
            dailyCost: Math.round(accomCostPerPerson + regionFood + regionTransport + dailyActivityTotal),
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
    totalTransport += (domesticFlightCost * travelerCount);

    // --- STEP 5: ESSENTIALS ---
    // Visa
    let visaCost = 1200; // Default
    if (data.nationality) {
        // Simple lookup or default
        // @ts-ignore
        visaCost = VISA_COSTS[data.nationality] !== undefined ? VISA_COSTS[data.nationality] : VISA_COSTS["Other"];
    }

    // Airport Transfer
    const isAccra = regions.includes("Greater Accra");
    const airportTransfer = isAccra ? 250 : 300; // 200-300 range

    // Insurance (calculated later on subtotal, but here we need a base)
    // We'll calculate it on the (Accom + Food + Transport + Activity + Flights) total

    // International Flights
    let flightCost = 0;
    if (data.includeFlights && data.origin) {
        // @ts-ignore
        const range = FLIGHT_COSTS_BY_ORIGIN[data.origin] || FLIGHT_COSTS_BY_ORIGIN["Other"];
        const avgUSD = (range.min + range.max) / 2;
        flightCost = avgUSD * USD_TO_GHS_RATE;
    } else if (data.includeFlights) {
        flightCost = 900 * USD_TO_GHS_RATE; // Default
    }

    const totalFlightCost = flightCost * travelerCount;

    // Subtotal for Insurance Calculation
    const tripCostForInsurance = totalAccom + totalFood + totalTransport + totalActivities + totalFlightCost;
    const insuranceCost = data.includeInsurance ? (tripCostForInsurance * 0.04) : 0;

    const essentialsTotal = Math.round(
        (visaCost + ESSENTIAL_COSTS.simCard + airportTransfer) * travelerCount + insuranceCost
    );

    // --- STEP 6: CONTINGENCY ---
    let contingencyRate: number = CONTINGENCY_RATES_V2.default;
    if (tier === 'luxury') contingencyRate = CONTINGENCY_RATES_V2.luxury;
    else if (regions.length > 2) contingencyRate = CONTINGENCY_RATES_V2.multiRegion;
    else if (data.activities?.includes('adventure')) contingencyRate = CONTINGENCY_RATES_V2.adventure;

    const subtotal = totalAccom + totalFood + totalTransport + totalActivities + essentialsTotal + totalFlightCost;
    const contingencyAmount = Math.round(subtotal * contingencyRate);
    const total = Math.round(subtotal + contingencyAmount);

    return {
        accommodation: Math.round(totalAccom),
        food: Math.round(totalFood),
        transport: Math.round(totalTransport),
        activities: Math.round(totalActivities),
        essentials: essentialsTotal,
        flights: Math.round(totalFlightCost),
        contingency: contingencyAmount,
        total: total,
        regionalBreakdown: regionalBreakdown
    };
}
