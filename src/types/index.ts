export type TravelerType = 'solo' | 'couple' | 'family' | 'group';
export type AccommodationLevel = 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
export type ActivityInterest = 'nature' | 'culture' | 'adventure' | 'relaxation';

export interface BudgetFormData {
    duration: number;
    travelerType: TravelerType;
    accommodationLevel: AccommodationLevel;
    activities: ActivityInterest[];
    // New optional fields for enhanced calculations
    month?: string;
    regions?: string[];
    intensity?: 'Relaxed' | 'Moderate' | 'Packed';
    includeFlights?: boolean;
}

export interface RegionalBudget {
    region: string;
    dailyCost: number;
    totalCost: number;
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    tips: string[];
    note: string;
}

export interface BudgetBreakdown {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    essentials: number;
    flights: number;
    contingency: number;
    total: number;
    regionalBreakdown?: RegionalBudget[];
}

export interface Tour {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    rating: number;
    category: ActivityInterest[];
    regions?: string[];
    bestMonths?: string[];
    dailyCost: number;
    range: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
}
