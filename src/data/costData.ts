// Base daily costs per traveler (in GHS - Ghana Cedis)
export const BASE_COSTS = {
    accommodation: {
        backpacker: 250,        // Realistic Accra hostels/budget hotels (200-350 GHS)
        budget: 400,            // Budget hotels for regional trips (350-500 GHS)
        mid: 650,               // Mid-range hotels (500-800 GHS)
        comfort: 1200,          // Comfort hotels
        luxury: 2500            // Luxury resorts
    },
    food: {
        backpacker: 150,        // Realistic local meals for tourists
        budget: 200,            // Budget restaurant meals
        mid: 350,               // Mid-range dining
        comfort: 550,           // Quality restaurants
        luxury: 900             // Fine dining
    },
    transport: {
        backpacker: 150,        // Trotro + local transport (realistic Accra cost)
        budget: 200,            // Trotro for regional trips + occasional taxi
        mid: 300,               // AC vehicle/VIP bus
        comfort: 450,           // Comfort vehicle with driver
        luxury: 700             // Private vehicle with driver
    },
    activities: {
        relaxed: 150,
        moderate: 300,
        packed: 600
    }
} as const;

// Transport Mode Daily Costs (per vehicle or per person depending on mode)
export const TRANSPORT_MODE_COSTS = {
    bolt: 350,              // Daily avg for city rides
    private_driver: 1800,   // SUV/Sedan + Driver daily rate
    rental: 1200,           // Self-drive rental + fuel est
    public: 80,             // Trotro/Bus daily avg
    flight: 0               // Handled separately
} as const;

// Room Sharing Multipliers (applied to accommodation cost)
export const ROOM_SHARING_MULTIPLIERS = {
    private: 1.0,   // 1 person per room
    shared: 0.6,    // 2 people per room (cost per person is less)
    family: 0.8     // Family suite/sharing
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

// Approximate Exchange Rate for Estimations (1 USD = ~15.87 GHS)
export const USD_TO_GHS_RATE = 15.87;

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
