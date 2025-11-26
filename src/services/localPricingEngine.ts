import localAccommodationBands from '../data/localAccommodationBands.json';
import localActivityCosts from '../data/localActivityCosts.json';

import { calculateTransportCost } from './transportCalculator';
import type { LocalInputData, LocalCostBreakdown } from '../types/local';

export function calculateLocalTripCost(
    input: LocalInputData,
    regions: string[],
    duration: number
): LocalCostBreakdown {
    const { groupSize, transportPreference, budgetTier } = input;

    // 1. Accommodation
    let accommodationTotal = 0;
    regions.forEach((region) => {
        const band = localAccommodationBands.find((b) => b.region === region)?.bands;
        if (band) {
            const nightlyRate =
                budgetTier === 'Low'
                    ? band.budget
                    : budgetTier === 'Mid'
                        ? band.mid
                        : band.premium;
            // Assume 2 people per room if group > 1, else 1 room
            const rooms = Math.ceil(groupSize / 2);
            accommodationTotal += nightlyRate * rooms * (duration / regions.length); // Split duration across regions
        }
    });

    // 2. Food
    const foodDailyPerPerson =
        budgetTier === 'Low' ? 80 : budgetTier === 'Mid' ? 150 : 300;
    const foodTotal = foodDailyPerPerson * groupSize * duration;

    // 3. Transport
    const transportRes = calculateTransportCost(
        transportPreference,
        input.departureCity,
        regions,
        groupSize
    );
    let transportTotal = transportRes.totalCost;



    // Local transport within regions (taxi/trotro around town)
    const localDailyTransport = budgetTier === 'Low' ? 20 : 50;
    transportTotal += localDailyTransport * groupSize * duration;


    // 4. Activities
    // Pick top 2 activities per region
    let activitiesTotal = 0;
    regions.forEach((region) => {
        const regionActivities = localActivityCosts.filter((a) => a.region === region);
        const selected = regionActivities.slice(0, 2);
        selected.forEach((act) => {
            activitiesTotal += act.price * groupSize;
        });
    });

    // 5. Essentials (Sim, Insurance - optional, keeping low for local)
    const essentialsTotal = 50 * groupSize;

    // 6. Contingency
    const subTotal =
        accommodationTotal + foodTotal + transportTotal + activitiesTotal + essentialsTotal;
    const contingency = subTotal * 0.05;

    const total = subTotal + contingency;

    return {
        accommodation: Math.round(accommodationTotal),
        food: Math.round(foodTotal),
        transport: Math.round(transportTotal),
        activities: Math.round(activitiesTotal),
        essentials: Math.round(essentialsTotal),
        contingency: Math.round(contingency),
        total: Math.round(total),
        perPerson: Math.round(total / groupSize),
    };
}
