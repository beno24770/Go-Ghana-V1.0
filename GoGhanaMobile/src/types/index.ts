// Budget Form Data Types
export interface BudgetFormData {
    duration: number;
    travelers: number;
    travelerType: 'solo' | 'couple' | 'family' | 'group';
    accommodationLevel: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
    activities: string[];
    month?: string;
    regions?: string[];
    includeFlights?: boolean;
    includeInsurance?: boolean;
}

// Budget Breakdown Result
export interface BudgetBreakdown {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    essentials: number;
    flights: number;
    contingency: number;
    total: number;
}

// Itinerary Types
export interface TripItinerary {
    id: string;
    budget: BudgetBreakdown;
    formData: BudgetFormData;
    days: ItineraryDay[];
    summary: ItinerarySummary;
    createdAt: string;
}

export interface ItineraryDay {
    day: number;
    location: string;
    morning: ItineraryActivity[];
    afternoon: ItineraryActivity[];
    evening: ItineraryActivity[];
    meals: DayMeals;
    accommodation: AccommodationRecommendation;
}

export interface ItineraryActivity {
    time: string;
    activity: string;
    description: string;
    cost?: number;
    duration?: string;
}

export interface DayMeals {
    breakfast?: MealRecommendation;
    lunch?: MealRecommendation;
    dinner?: MealRecommendation;
}

export interface MealRecommendation {
    name: string;
    location: string;
    estimatedCost: number;
    cuisine?: string;
}

export interface AccommodationRecommendation {
    name: string;
    type: string;
    location: string;
    estimatedCost: number;
    amenities?: string[];
}

export interface ItinerarySummary {
    totalDays: number;
    regionsVisited: string[];
    highlights: string[];
    estimatedTotalCost: number;
}

// Storage Types
export interface SavedTrip {
    id: string;
    name: string;
    itinerary: TripItinerary;
    savedAt: string;
}

// AI Response Types
export interface AIItineraryResponse {
    days: ItineraryDay[];
    summary?: ItinerarySummary;
}
