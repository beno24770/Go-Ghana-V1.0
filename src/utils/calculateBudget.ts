import type { BudgetFormData, BudgetBreakdown } from '../types';

// New V3 Data Engine Imports
import tierBaseCosts from '../data/engine/tierBaseCosts.json';
import regionCostProfiles from '../data/engine/regionCostProfiles.json';
import distanceMatrix from '../data/engine/distanceMatrix.json';
import fuelPricing from '../data/engine/fuelPricing.json';
import activityBaseCosts from '../data/engine/activityBaseCosts.json';
import transportModes from '../data/engine/transportModes.json';
import visaRules from '../data/engine/visaRules.json';
import internationalFlights from '../data/engine/internationalFlights.json';

// Constants
const USD_TO_GHS = 15.8; // Fallback or sync with CurrencyContext
const TRAVELER_COUNTS: Record<string, number> = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

// --- HELPER TYPES & INTERFACES ---
interface RegionProfile {
    name: string;
    accommodationMultiplier: number;
    foodMultiplier: number;
    transportMultiplier: number;
    activityMultiplier: number;
    seasonalityIndex: number[];
}

interface TierCost {
    accommodation: number;
    food: number;
    transport: number;
    activity: number;
}

// --- CORE V3 ENGINE ---
export function calculateBudget(data: BudgetFormData): BudgetBreakdown {
    const travelerCount = data.travelers || TRAVELER_COUNTS[data.travelerType] || 1;
    const duration = data.duration;
    const regions = (data.regions && data.regions.length > 0) ? data.regions : ['Greater Accra'];

    // 1. Determine Month Index (0-11) for Seasonality
    const monthMap: Record<string, number> = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    const monthIndex = data.month ? monthMap[data.month] : 9; // Default to October if undefined

    // 2. Base Tier Logic & Adaptive Scaling
    const tier = data.accommodationLevel;
    // @ts-ignore
    const baseCosts: TierCost = tierBaseCosts[tier] || tierBaseCosts['budget'];

    let baseScalingFactor = 1.0;

    // "Flex Tier" / Custom Budget Logic
    if (data.customDailyBudget) {
        const defaultDaily = baseCosts.accommodation + baseCosts.food + baseCosts.transport + baseCosts.activity;
        const targetGHS = data.customDailyBudget * USD_TO_GHS;
        if (defaultDaily > 0) {
            baseScalingFactor = targetGHS / defaultDaily;
        }
    }

    // 3. Regional Adjustments (Average across selected regions)
    let regionAccomMultSum = 0;
    let regionFoodMultSum = 0;
    let regionTransportMultSum = 0;

    regions.forEach(r => {
        // @ts-ignore
        const profile: RegionProfile = regionCostProfiles[r] || regionCostProfiles['Greater Accra'];
        regionAccomMultSum += profile.accommodationMultiplier;
        regionFoodMultSum += profile.foodMultiplier;
        regionTransportMultSum += profile.transportMultiplier;
    });

    const avgRegionAccomMult = regionAccomMultSum / regions.length;
    const avgRegionFoodMult = regionFoodMultSum / regions.length;
    const avgRegionTransportMult = regionTransportMultSum / regions.length;

    // 4. Seasonality Factory (Average across selected regions for the specific month)
    let seasonFactorSum = 0;
    regions.forEach(r => {
        // @ts-ignore
        const profile: RegionProfile = regionCostProfiles[r] || regionCostProfiles['Greater Accra'];
        seasonFactorSum += profile.seasonalityIndex[monthIndex];
    });
    const avgSeasonFactor = seasonFactorSum / regions.length;

    // --- ENGINE: ACCOMMODATION ---
    // Occupancy Smoothing
    let occupancyDivider = 1;
    if (data.roomSharing === 'shared') occupancyDivider = 2; // Split by 2
    else if (data.roomSharing === 'family') occupancyDivider = travelerCount >= 3 ? 2.5 : 1.5; // Approximation

    let dailyAccom = (baseCosts.accommodation * baseScalingFactor * avgRegionAccomMult * avgSeasonFactor) / occupancyDivider;

    // Price Pressure Adjuster (Start basic, refine later)
    // If accom > 55% of budget, we might need to clamp, but let's stick to pure calc for now.

    const totalAccom = dailyAccom * duration * travelerCount;

    // --- ENGINE: TRANSPORT ---
    // Complex Distance Matrix routing
    let totalDistanceKm = 0;
    let currentCity = "Accra"; // Start in Accra

    // Map regions to cities for distance matrix
    const regionToCity: Record<string, string> = {
        "Greater Accra": "Accra", "Ashanti": "Kumasi", "Central": "Cape Coast", "Western": "Takoradi",
        "Volta": "Ho", "Northern": "Tamale", "Bono": "Sunyani", "Eastern": "Koforidua"
    };

    regions.forEach(r => {
        const targetCity = regionToCity[r] || "Accra";
        if (targetCity !== currentCity) {
            // @ts-ignore
            const dist = distanceMatrix[currentCity]?.[targetCity] || distanceMatrix[targetCity]?.[currentCity] || 200;
            totalDistanceKm += dist;
            currentCity = targetCity;
        }
    });
    // Return to Accra
    // @ts-ignore
    totalDistanceKm += (distanceMatrix[currentCity]?.["Accra"] || distanceMatrix["Accra"]?.[currentCity] || 150);

    let totalTransportCost = 0;

    // Handle Transport Modes
    const mode = data.transportMode || 'public';
    // @ts-ignore
    const modeData = transportModes[mode] || transportModes['public'];

    if (mode === 'public') {
        const publicCost = (totalDistanceKm * modeData.costPerKm) + (modeData.baseFare * duration);
        totalTransportCost = publicCost * travelerCount * avgRegionTransportMult;
    }
    else if (mode === 'bolt') {
        // Bolt is mostly city-based + intercity surcharges
        const dailyBolt = modeData.baseFare * 8; // ~8 rides/day equivalent or distance approx
        // Complex bolt calc: (Dist * Cost) + (DailyBase * Days)
        const interCity = totalDistanceKm * modeData.costPerKm;
        const intraCity = duration * 200; // 200 GHS/day local movement
        const vehicles = Math.ceil(travelerCount / modeData.maxPassengers);
        totalTransportCost = (interCity + intraCity) * vehicles;
    }
    else if (mode === 'private_driver' || mode === 'rental') {
        const vehicles = Math.ceil(travelerCount / modeData.maxPassengers);
        const rentalCost = modeData.dailyRate * duration * vehicles;

        // Fuel
        const fuelEfficiencyKmPerLiter = 8; // SUV approx
        const fuelRequired = totalDistanceKm / fuelEfficiencyKmPerLiter;
        // @ts-ignore
        const fuelCost = fuelRequired * fuelPricing.baseFuelPrice * fuelPricing.dieselMultiplier;

        totalTransportCost = rentalCost + (fuelCost * vehicles);
    }
    else if (mode === 'flight') {
        // Domestic Flight Logic (If Northern region is present)
        // If 'flight' is selected, we assume flying to ALL capable airports
        const northernRegions = ['Northern', 'Tamale'];
        const hasNorth = regions.some(r => northernRegions.includes(r));
        const flightCount = hasNorth ? 2 : 0; // To/From Tamale
        // @ts-ignore
        const flightCost = flightCount * transportModes.flight.baseFare * travelerCount;

        // Plus local transport (bolt/taxi)
        const localTransport = duration * 150 * travelerCount;
        totalTransportCost = flightCost + localTransport;
    }

    // --- ENGINE: ACTIVITIES ---
    let dailyActivityCost = 0;
    if (data.activities) {
        data.activities.forEach(act => {
            // @ts-ignore
            const actData = activityBaseCosts[act] || { baseCost: 50, tierMultiplier: 1 };
            // Cost = Base * Tier * Scaling * Season
            dailyActivityCost += actData.baseCost * (baseCosts.activity / 100) * avgSeasonFactor;
        });
    } else {
        dailyActivityCost = baseCosts.activity * avgSeasonFactor;
    }
    const totalActivityCost = dailyActivityCost * duration * travelerCount;

    // --- ENGINE: FOOD ---
    const dailyFood = baseCosts.food * avgRegionFoodMult * baseScalingFactor;
    const totalFoodCost = dailyFood * duration * travelerCount;

    // --- ENGINE: ESSENTIALS ---
    let visaCost = 0;
    if (data.nationality) {
        // @ts-ignore
        const rule = visaRules[data.nationality] || visaRules["Other"];
        visaCost = rule.visaRequired ? rule.cost : 0;
    }

    const simCard = 100; // Static estimate
    const airportTransfer = 300;
    let internationalFlight = 0;

    if (data.includeFlights) {
        if (data.flightCost) {
            internationalFlight = data.flightCost * USD_TO_GHS;
        } else if (data.origin) {
            // @ts-ignore
            const flightData = internationalFlights[data.origin] || internationalFlights["Other"];
            internationalFlight = flightData.standard * USD_TO_GHS;
        }
    }

    const totalEssentials = ((visaCost + simCard + airportTransfer + internationalFlight) * travelerCount);
    // Add insurance
    const insuranceQuote = data.includeInsurance ? ((totalAccom + totalTransportCost + totalActivityCost + totalFoodCost) * 0.05) : 0;

    // --- ENGINE: CONTINGENCY ---
    const isLuxury = tier === 'luxury';
    const isAdventure = data.activities?.includes('adventure');
    const isMultiRegion = regions.length > 2;

    let contingencyPct = 0.10; // Base 10%
    if (isLuxury) contingencyPct += 0.05;
    if (isAdventure) contingencyPct += 0.03;
    if (isMultiRegion) contingencyPct += 0.02;

    const subTotal = totalAccom + totalFoodCost + totalTransportCost + totalActivityCost + totalEssentials + insuranceQuote;
    const contingencyTotal = subTotal * contingencyPct;

    const GRAND_TOTAL = subTotal + contingencyTotal;

    // --- REGIONAL BREAKDOWN GENERATION ---
    const daysPerRegion = duration / regions.length;
    const regionalBreakdown = regions.map(r => {
        // @ts-ignore
        const profile = regionCostProfiles[r] || regionCostProfiles["Greater Accra"];

        // Distribute proportional costs
        const rAccom = (totalAccom / regions.length);
        const rFood = (totalFoodCost / regions.length) * profile.foodMultiplier; // Weighted by profile
        const rTrans = (totalTransportCost / regions.length); // Simplified distribution
        const rAct = (totalActivityCost / regions.length) * profile.activityMultiplier;

        const rTotal = rAccom + rFood + rTrans + rAct;

        return {
            region: r,
            dailyCost: Math.round(rTotal / (daysPerRegion * travelerCount)),
            totalCost: Math.round(rTotal),
            accommodation: Math.round(rAccom),
            food: Math.round(rFood),
            transport: Math.round(rTrans),
            activities: Math.round(rAct),
            tips: [],
            note: `Estimates weighted by ${profile.seasonalityIndex[monthIndex]}x seasonality factor.`
        };
    });

    return {
        accommodation: Math.round(totalAccom),
        food: Math.round(totalFoodCost),
        transport: Math.round(totalTransportCost),
        activities: Math.round(totalActivityCost),
        essentials: Math.round(totalEssentials + insuranceQuote),
        flights: Math.round(internationalFlight * travelerCount),
        contingency: Math.round(contingencyTotal),
        total: Math.round(GRAND_TOTAL),
        regionalBreakdown: regionalBreakdown,
    };
}
