// Base daily costs per traveler (in GHS - Ghana Cedis)
export const BASE_COSTS = {
    accommodation: {
        backpacker: 150,
        budget: 280,
        mid: 550,
        comfort: 1100,
        luxury: 2200
    },
    food: {
        backpacker: 100,
        budget: 150,
        mid: 300,
        comfort: 500,
        luxury: 800
    },
    transport: {
        backpacker: 50,
        budget: 80,
        mid: 150,
        comfort: 300,
        luxury: 600
    },
    activities: {
        relaxed: 150,
        moderate: 300,
        packed: 600
    }
} as const;

// Inter-region transport costs (one-time per region-to-region move, per traveler)
// These represent the cost of traveling between major regions (e.g., Accra to Kumasi)
export const INTER_REGION_TRANSPORT = {
    backpacker: 80,   // STC bus, shared taxi
    budget: 120,      // Better bus service
    mid: 200,         // VIP bus, private car option
    comfort: 350,     // Private car with comfort
    luxury: 600       // Private SUV with driver
} as const;

// Regional cost multipliers (16 regions of Ghana)
export const REGIONAL_MULTIPLIERS: Record<string, number> = {
    "Greater Accra": 1.40,
    "Ashanti": 0.90,
    "Central": 1.00,
    "Western": 1.20,
    "Eastern": 0.95,
    "Volta": 0.85,
    "Northern": 0.75,
    "Upper East": 0.70,
    "Upper West": 0.72,
    "Bono": 0.85,
    "Bono East": 0.85,
    "Western North": 0.88,
    "Savannah": 0.80,
    "North East": 0.80,
    "Oti": 0.85,
    "Ahafo": 0.90
};

// Seasonal cost multipliers (12 months)
export const SEASONAL_MULTIPLIERS: Record<string, number> = {
    "January": 1.20,
    "February": 1.05,
    "March": 1.00,
    "April": 1.00,
    "May": 0.95,
    "June": 0.95,
    "July": 1.05,
    "August": 1.15,
    "September": 0.90,
    "October": 0.90,
    "November": 1.00,
    "December": 1.30
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

// Budget range thresholds (daily cost per person in GHS)
export const BUDGET_RANGES = {
    backpacker: { min: 0, max: 500 },
    budget: { min: 500, max: 800 },
    mid: { min: 800, max: 1200 },
    comfort: { min: 1200, max: 2000 },
    luxury: { min: 2000, max: Infinity }
} as const;

// Helper function to get budget range from daily cost
export function getBudgetRange(dailyCostPerPerson: number): 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury' {
    if (dailyCostPerPerson <= 500) return 'backpacker';
    if (dailyCostPerPerson <= 800) return 'budget';
    if (dailyCostPerPerson <= 1200) return 'mid';
    if (dailyCostPerPerson <= 2000) return 'comfort';
    return 'luxury';
}
