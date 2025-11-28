import type { BudgetFormData, BudgetBreakdown, RegionalBudget } from '../types';
import {
    BASE_COSTS,
    REGIONAL_MULTIPLIERS,
    SEASONAL_MULTIPLIERS,
    ESSENTIAL_COSTS,
    FLIGHT_ESTIMATES,
    INTER_REGION_TRANSPORT,
    USD_TO_GHS_RATE,
    TRANSPORT_MODE_COSTS,
    ROOM_SHARING_MULTIPLIERS
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

    // 1. Get base costs from accommodation level and activity intensity
    let accommodationCost = BASE_COSTS.accommodation[data.accommodationLevel];

    // Apply Room Sharing Multiplier
    if (data.roomSharing && ROOM_SHARING_MULTIPLIERS[data.roomSharing]) {
        accommodationCost *= ROOM_SHARING_MULTIPLIERS[data.roomSharing];
    }

    const foodCost = BASE_COSTS.food[data.accommodationLevel];

    // Determine Transport Cost based on Mode or Fallback to Tier
    let transportCost = 0;
    if (data.transportMode && TRANSPORT_MODE_COSTS[data.transportMode] !== undefined) {
        // Some modes are per vehicle (Private Driver, Rental), others per person (Bolt, Public)
        // We need to normalize to "per person" for the daily calculation
        const modeCost = TRANSPORT_MODE_COSTS[data.transportMode];

        if (['private_driver', 'rental'].includes(data.transportMode)) {
            // Cost is per vehicle, so divide by travelers
            transportCost = modeCost / travelerCount;
        } else {
            // Cost is per person (Bolt, Public)
            transportCost = modeCost;
        }
    } else {
        // Fallback to tier-based transport cost
        transportCost = BASE_COSTS.transport[data.accommodationLevel];
    }

    const activityCost = BASE_COSTS.activities[data.intensity?.toLowerCase() as 'relaxed' | 'moderate' | 'packed' || 'moderate'];

    // 2. Calculate average regional multiplier
    let avgRegionalMultiplier = 1.0;
    if (data.regions && data.regions.length > 0) {
        const multipliers = data.regions
            .map(region => REGIONAL_MULTIPLIERS[region] || 1.0);
        avgRegionalMultiplier = multipliers.reduce((sum, m) => sum + m, 0) / multipliers.length;
    }

    // 3. Get seasonal multiplier
    const seasonalMultiplier = data.month ? (SEASONAL_MULTIPLIERS[data.month] || 1.0) : 1.0;

    // 4. Calculate daily cost per traveler
    const dailyCostPerTraveler =
        (accommodationCost + foodCost + transportCost + activityCost) *
        avgRegionalMultiplier *
        seasonalMultiplier;

    // 5. Calculate total daily costs
    const totalDailyCost = dailyCostPerTraveler * duration * travelerCount;

    // 6. Calculate breakdown components
    const accommodationTotal = Math.round(
        accommodationCost * duration * travelerCount * avgRegionalMultiplier * seasonalMultiplier
    );
    const foodTotal = Math.round(
        foodCost * duration * travelerCount * avgRegionalMultiplier * seasonalMultiplier
    );

    // Calculate transport with inter-region travel costs
    const numRegions = data.regions?.length || 1;
    const interRegionMoves = Math.max(0, numRegions - 1);
    const interRegionCostPerMove = INTER_REGION_TRANSPORT[data.accommodationLevel];
    const interRegionTotal = interRegionMoves * interRegionCostPerMove * travelerCount;

    const transportTotal = Math.round(
        (transportCost * duration * travelerCount * avgRegionalMultiplier * seasonalMultiplier) +
        interRegionTotal
    );
    const activitiesTotal = Math.round(
        activityCost * duration * travelerCount * avgRegionalMultiplier * seasonalMultiplier
    );

    // 7. Calculate essential costs (one-time per traveler)
    const essentialsTotal = Math.round(
        (ESSENTIAL_COSTS.visa +
            ESSENTIAL_COSTS.airportTransfer +
            ESSENTIAL_COSTS.simCard +
            (data.includeInsurance ? ESSENTIAL_COSTS.travelInsurance : 0)) * travelerCount
    );

    // 8. Calculate flight costs (if included)
    let flightsTotal = 0;
    if (data.includeFlights) {
        let flightCostUSD = 0;
        if (data.flightCost && data.flightCost > 0) {
            // Use user-provided estimate (USD)
            flightCostUSD = data.flightCost;
        } else {
            // Fallback to default estimate (USD)
            flightCostUSD = FLIGHT_ESTIMATES.defaultFlightEstimate;
        }
        // Convert USD to GHS
        flightsTotal = Math.round(flightCostUSD * USD_TO_GHS_RATE * travelerCount);
    }

    // 9. Calculate subtotal
    const subtotal = totalDailyCost + essentialsTotal + flightsTotal;

    // 10. Apply contingency (10% buffer)
    const contingencyAmount = Math.round(subtotal * ESSENTIAL_COSTS.contingency);
    const total = Math.round(subtotal + contingencyAmount);

    // 11. Calculate Regional Breakdown
    let regionalBreakdown: RegionalBudget[] = [];
    if (data.regions && data.regions.length > 0) {
        const numRegions = data.regions.length;
        const daysPerRegion = duration / numRegions;

        regionalBreakdown = data.regions.map(region => {
            const regionMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;
            const info = REGION_INFO[region] || { tips: [], note: '', highlights: [] };

            // Calculate daily cost for this specific region
            // We use the base costs * region specific multiplier * seasonal multiplier
            const regionDailyCostPerTraveler =
                (accommodationCost + foodCost + transportCost + activityCost) *
                regionMultiplier *
                seasonalMultiplier;

            const regionTotalCost = Math.round(regionDailyCostPerTraveler * daysPerRegion * travelerCount);

            // Breakdown for this region (approximate based on ratios)
            const regionAccom = Math.round(accommodationCost * daysPerRegion * travelerCount * regionMultiplier * seasonalMultiplier);
            const regionFood = Math.round(foodCost * daysPerRegion * travelerCount * regionMultiplier * seasonalMultiplier);

            // Transport includes local daily transport + allocated inter-region cost
            const regionLocalTransport = Math.round(transportCost * daysPerRegion * travelerCount * regionMultiplier * seasonalMultiplier);
            const allocatedInterRegionCost = Math.round(interRegionTotal / numRegions); // Distribute inter-region costs evenly
            const regionTransport = regionLocalTransport + allocatedInterRegionCost;

            const regionActivities = Math.round(activityCost * daysPerRegion * travelerCount * regionMultiplier * seasonalMultiplier);

            return {
                region,
                dailyCost: Math.round(regionDailyCostPerTraveler * travelerCount), // Daily cost for the whole group
                totalCost: regionTotalCost,
                accommodation: regionAccom,
                food: regionFood,
                transport: regionTransport,
                activities: regionActivities,
                tips: info.tips,
                note: info.note
            };
        });
    }

    return {
        accommodation: accommodationTotal,
        food: foodTotal,
        transport: transportTotal,
        activities: activitiesTotal,
        essentials: essentialsTotal,
        flights: flightsTotal,
        contingency: contingencyAmount,
        total: total,
        regionalBreakdown: regionalBreakdown
    };
}
