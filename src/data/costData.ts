// Base daily costs per traveler (in GHS - Ghana Cedis)
export const BASE_COSTS = {
    accommodation: {
        backpacker: 150,
        budget: 220,
        mid: 350,
        comfort: 650,
        luxury: 1300
    },
    food: {
        backpacker: 100,
        budget: 140,
        mid: 180,
        comfort: 250,
        luxury: 375
    },
    transport: {
        backpacker: 120,
        budget: 220,
        mid: 350,
        comfort: 800,
        luxury: 1550
    },
    activities: {
        relaxed: 0, // Now calculated via interest add-ons
        moderate: 0,
        packed: 0
    }
} as const;

// Interest Add-ons (Daily cost per person in GHS)
export const INTEREST_ADDONS = {
    culture: 20,
    adventure: 40,
    nightlife: 30,
    relaxation: 10, // Mapped from 'Beaches'
    nature: 60,     // Mapped from 'Wildlife'
    food: 25        // Food Tours
} as const;

// Transport Mode Daily Costs (per vehicle or per person depending on mode)
export const TRANSPORT_MODE_COSTS = {
    bolt: 160,              // Avg of 120-200
    private_driver: 1000,   // Avg of Sedan (800-1200)
    private_driver_suv: 1350, // Avg of SUV (1200-1500)
    rental: 1200,           // Self-drive rental + fuel est
    public: 55,             // Avg of Local (30-80)
    flight: 0               // Handled separately
} as const;

// Room Sharing Multipliers (applied to accommodation cost)
export const ROOM_SHARING_MULTIPLIERS = {
    private: 1.0,   // one_per_room
    shared: 0.6,    // two_sharing
    family: 0.45    // family_sharing
} as const;

// Regional Adjustments
export const REGIONAL_ADJUSTMENTS: Record<string, { transport: number, food: number }> = {
    "Northern": { transport: 1.3, food: 1.1 },
    "Upper East": { transport: 1.4, food: 1.15 },
    "Upper West": { transport: 1.4, food: 1.15 },
    "Volta": { transport: 1.05, food: 1.0 },
    "Central": { transport: 0.9, food: 0.95 }, // Cape Coast
    "Western": { transport: 1.0, food: 1.0 },
    "Greater Accra": { transport: 1.0, food: 1.0 },
    // Defaults for others
    "Ashanti": { transport: 1.0, food: 1.0 },
    "Eastern": { transport: 1.0, food: 1.0 },
    "Bono": { transport: 1.1, food: 1.0 },
    "Bono East": { transport: 1.1, food: 1.0 },
    "Ahafo": { transport: 1.1, food: 1.0 },
    "Savannah": { transport: 1.3, food: 1.1 },
    "North East": { transport: 1.3, food: 1.1 },
    "Oti": { transport: 1.05, food: 1.0 },
    "Western North": { transport: 1.1, food: 1.0 }
};

// Seasonal cost multipliers
// Peak (Dec 15 – Jan 10): 1.35
// High (July–Sept, December): 1.2
// Shoulder (March–June, Oct–Nov): 1.0
// Low (Feb): 0.9
export const SEASONAL_MULTIPLIERS: Record<string, number> = {
    "January": 1.2,   // Part Peak, Part Shoulder? Using High/Peak avg
    "February": 0.9,  // Low
    "March": 1.0,     // Shoulder
    "April": 1.0,     // Shoulder
    "May": 1.0,       // Shoulder
    "June": 1.0,      // Shoulder
    "July": 1.2,      // High
    "August": 1.2,    // High
    "September": 1.2, // High
    "October": 1.0,   // Shoulder
    "November": 1.0,  // Shoulder
    "December": 1.35  // Peak
};

// Essential one-time costs per traveler (in GHS)
export const ESSENTIAL_COSTS = {
    visa: 1200,
    airportTransfer: 200,
    simCard: 150,
    travelInsurance: 500,
    contingency: 0.10 // 10% buffer
} as const;

// Flight cost estimates (in USD)
export const FLIGHT_ESTIMATES = {
    defaultFlightEstimate: 900,
    regions: {
        US: 1100,
        UK: 850,
        EU: 950,
        Asia: 1200,
        Africa: 400
    }
} as const;

// Approximate Exchange Rate for Estimations (1 USD = ~15.87 GHS)
export const USD_TO_GHS_RATE = 15.87;

// Inter-region transport costs (fallback if not calculated dynamically)
export const INTER_REGION_TRANSPORT = {
    backpacker: 80,
    budget: 120,
    mid: 200,
    comfort: 350,
    luxury: 600
} as const;

// Regional cost multipliers (Legacy support, prefer REGIONAL_ADJUSTMENTS)
export const REGIONAL_MULTIPLIERS: Record<string, number> = {
    "Greater Accra": 1.0,
    "Ashanti": 1.0,
    "Central": 0.95,
    "Western": 1.0,
    "Eastern": 1.0,
    "Volta": 1.0,
    "Northern": 1.1,
    "Upper East": 1.15,
    "Upper West": 1.15,
    "Bono": 1.0,
    "Bono East": 1.0,
    "Western North": 1.0,
    "Savannah": 1.1,
    "North East": 1.1,
    "Oti": 1.0,
    "Ahafo": 1.0
};

// Budget range thresholds (daily cost per person in GHS)
export const BUDGET_RANGES = {
    backpacker: { min: 0, max: 750 },       // 400-750 GHS (Accra-only trips)
    budget: { min: 700, max: 1500 },        // 700-1500 GHS (regional trips minimum)
    mid: { min: 1000, max: 2000 },          // 1000-2000 GHS
    comfort: { min: 1500, max: 2500 },      // 1500-2500 GHS
    luxury: { min: 2000, max: Infinity }    // 2000+ GHS
} as const;

// Helper function to get budget range from daily cost
export function getBudgetRange(dailyCostPerPerson: number): 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury' {
    if (dailyCostPerPerson <= 750) return 'backpacker';    // Accra-only trips
    if (dailyCostPerPerson <= 1500) return 'budget';       // Regional trips minimum
    if (dailyCostPerPerson <= 2000) return 'mid';
    if (dailyCostPerPerson <= 2500) return 'comfort';
    return 'luxury';
}
