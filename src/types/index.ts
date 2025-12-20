export type TravelerType = 'solo' | 'couple' | 'family' | 'group';
export type AccommodationLevel = 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
export type ActivityInterest = 'nature' | 'culture' | 'adventure' | 'relaxation';
export type Region = 'Greater Accra' | 'Ashanti' | 'Central' | 'Western' | 'Eastern' | 'Volta' | 'Northern' | 'Upper East' | 'Upper West' | 'Bono' | 'Bono East' | 'Ahafo' | 'Savannah' | 'North East' | 'Oti';
export type BackpackerSubTier = 'urban' | 'classic';

export interface BudgetFormData {
    duration: number;
    travelers: number;
    travelerType: TravelerType;
    accommodationLevel: AccommodationLevel;
    activities: ActivityInterest[];

    // Optional / Advanced fields
    month?: string;
    regions?: string[];
    intensity?: 'Relaxed' | 'Moderate' | 'Packed';
    includeFlights?: boolean;
    flightCost?: number;
    includeInsurance?: boolean;
    exchangeRate?: number; // USD to GHS exchange rate

    // V3 Revamp fields
    roomSharing?: 'private' | 'shared' | 'family';
    arrivalCity?: string;
    transportMode?: 'bolt' | 'private_driver' | 'rental' | 'public' | 'flight';
    accommodationType?: 'hotel' | 'guesthouse' | 'airbnb';
    isNewToGhana?: boolean;
    interests?: string[];
    origin?: string;
    nationality?: string;
    customDailyBudget?: number;
    startDate?: string; // ISO string
    endDate?: string; // ISO string
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
    note?: string;
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
    regionalBreakdown: RegionalBudget[];
    // V3 Scaling/Debug Info
    scaling?: {
        baseScalingFactor: number;
        effectiveScalingFactor?: number;
        seasonAdjustment?: number;
        regionAdjustment?: number;
    };
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
    backpackerSubTier?: BackpackerSubTier;
    images?: string[];
}

export interface LocalItinerary {
    id: string;
    title: string;
    type: 'Cheapest' | 'Balanced' | 'Premium';
    regions: string[];
    duration: number;
    cost: {
        total: number;
        perPerson: number;
    };
    highlights: string[];
}

export interface SavedTrip {
    id: string;
    title: string;
    createdAt: string;
    budgetResult: BudgetBreakdown;
    itinerary?: {
        days: Record<string, unknown>[];
        generatedBy?: string;
    };
    formData: BudgetFormData;
}

