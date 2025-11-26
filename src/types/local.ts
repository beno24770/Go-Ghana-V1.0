export type LocalTransportMode = 'Trotro' | 'VIP Bus' | 'Fuel car' | 'Bolt/Uber' | 'Taxi';

export interface LocalInputData {
    adults: number;
    groupSize: number;
    transportPreference: LocalTransportMode;
    departureCity: string;
    interests: string[];
    budgetTier: 'Low' | 'Mid' | 'High';
    customBudget?: number;
    dates: {
        start: Date;
        end: Date;
        type?: 'Weekend' | 'Holiday' | 'Custom';
    };
}

export interface LocalCostBreakdown {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    essentials: number;
    contingency: number;
    total: number;
    perPerson: number;
}

export interface LocalItinerary {
    id: string;
    title: string;
    type: 'Cheapest' | 'Balanced' | 'Premium';
    regions: string[];
    duration: number;
    cost: LocalCostBreakdown;
    transportPlan: {
        mode: LocalTransportMode;
        details: string;
        cost: number;
    };
    highlights: string[];
    accommodationSuggestion: string;
}

export interface RegionScore {
    region: string;
    score: number;
    matches: string[];
}
