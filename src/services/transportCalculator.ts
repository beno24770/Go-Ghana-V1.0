import localTransportRates from '../data/localTransportRates.json';
import regionDistances from '../data/regionDistances.json';
import type { LocalTransportMode } from '../types/local';

interface TransportCostResult {
    totalCost: number;
    details: string;
}

export function calculateTransportCost(
    mode: LocalTransportMode,
    origin: string,
    destinations: string[],
    groupSize: number
): TransportCostResult {
    let totalCost = 0;
    let details = '';

    // Helper to get distance
    const getDistance = (from: string, to: string): number => {
        const distances = regionDistances as Record<string, Record<string, number>>;
        return distances[from]?.[to] || distances[to]?.[from] || 200; // Default 200km if unknown
    };

    // Helper to get fare
    const getFare = (type: 'trotroFares' | 'vipBusFares', from: string, to: string): number => {
        const fares = localTransportRates[type] as Array<{ from: string; to: string; price: number }>;
        const route = fares.find(
            (f) => (f.from === from && f.to === to) || (f.from === to && f.to === from)
        );
        return route ? route.price : 100; // Default fallback
    };

    let currentLoc = origin;

    for (const dest of destinations) {
        // Simplified: assuming main city of region is destination name for now
        // In real app, would map region -> main city
        const destCity = dest === 'Greater Accra' ? 'Accra' : dest === 'Ashanti' ? 'Kumasi' : dest; // Simplified mapping

        if (currentLoc === destCity) continue;

        const distance = getDistance(currentLoc, destCity);

        switch (mode) {
            case 'Trotro': {
                const fare = getFare('trotroFares', currentLoc, destCity);
                totalCost += fare * groupSize;
                details += `Trotro from ${currentLoc} to ${destCity}: GHS ${fare} x ${groupSize} = ${fare * groupSize}\n`;
                break;
            }
            case 'VIP Bus': {
                const fare = getFare('vipBusFares', currentLoc, destCity);
                totalCost += fare * groupSize;
                details += `VIP Bus from ${currentLoc} to ${destCity}: GHS ${fare} x ${groupSize} = ${fare * groupSize}\n`;
                break;
            }
            case 'Fuel car': {
                const fuelCost =
                    distance *
                    localTransportRates.avgFuelConsumption *
                    localTransportRates.fuelPricePerLitre;
                totalCost += fuelCost;
                details += `Drive ${currentLoc} to ${destCity} (${distance}km): ~GHS ${fuelCost.toFixed(0)} fuel\n`;
                break;
            }
            case 'Bolt/Uber': {
                // Estimate inter-city bolt as high premium
                const estPrice = distance * 10; // Rough estimate
                totalCost += estPrice;
                details += `Bolt/Uber ${currentLoc} to ${destCity}: ~GHS ${estPrice}\n`;
                break;
            }
            case 'Taxi': {
                // Inter-city taxi (charter or shared)
                // Assuming charter for simplicity, slightly cheaper than Uber
                const estPrice = distance * 8;
                totalCost += estPrice;
                details += `Taxi ${currentLoc} to ${destCity}: ~GHS ${estPrice}\n`;
                break;
            }
        }
        currentLoc = destCity;
    }

    return { totalCost, details };
}
