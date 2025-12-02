// Base accommodation costs per night (GHS)
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
        relaxed: 0,
        moderate: 0,
        packed: 0
    }
};

// Interest-based activity add-ons (GHS per day)
export const INTEREST_ADDONS: Record<string, number> = {
    culture: 20,
    adventure: 40,
    nightlife: 30,
    relaxation: 10,
    nature: 60,
    food: 25
};

// Seasonal price multipliers by month
export const SEASONAL_MULTIPLIERS: Record<string, number> = {
    "January": 1.2,
    "February": 0.9,
    "March": 1.0,
    "April": 1.0,
    "May": 1.0,
    "June": 1.0,
    "July": 1.2,
    "August": 1.2,
    "September": 1.2,
    "October": 1.0,
    "November": 1.0,
    "December": 1.35
};

// Essential one-time costs (GHS)
export const ESSENTIAL_COSTS = {
    visa: 1200,
    airportTransfer: 200,
    simCard: 150,
    travelInsurance: 500,
    contingency: 0.10 // 10% of subtotal
};

// Currency conversion rate
export const USD_TO_GHS_RATE = 15.87;

// Average international flight cost (USD)
export const AVERAGE_FLIGHT_COST_USD = 900;
