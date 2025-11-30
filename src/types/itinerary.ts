// Itinerary Types and Interfaces

export interface AccommodationRecommendation {
    id: string;
    name: string;
    type: 'hotel' | 'guesthouse' | 'airbnb' | 'hostel' | 'resort';
    location: string;
    region: string;
    pricePerNight: number;
    rating: number;
    amenities: string[];
    imageUrl?: string;
    bookingUrl?: string;
    description: string;
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface RestaurantRecommendation {
    id: string;
    name: string;
    cuisine: string;
    location: string;
    region: string;
    priceRange: string; // e.g., "GH₵ 20-50"
    averageCost: number;
    rating: number;
    specialty: string;
    imageUrl?: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'any';
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
}

export interface ActivityRecommendation {
    id: string;
    name: string;
    location: string;
    region: string;
    cost: number;
    duration: string; // e.g., "2-3 hours"
    description: string;
    type: 'culture' | 'nature' | 'adventure' | 'relaxation' | 'food' | 'nightlife';
    rating: number;
    imageUrl?: string;
    bookingUrl?: string;
    bestTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'any';
}

export interface TransportRecommendation {
    from: string;
    to: string;
    mode: 'uber' | 'bolt' | 'trotro' | 'taxi' | 'rental_car' | 'vip_bus' | 'flight' | 'walking';
    estimatedCost: number;
    duration: string;
    distance?: string;
    notes?: string;
}

export interface ItineraryActivity {
    time: string;
    activity: string;
    location: string;
    cost: number;
    duration: string;
    description: string;
    type: 'culture' | 'nature' | 'adventure' | 'relaxation' | 'food' | 'nightlife' | 'transport' | 'rest';
    activityDetails?: ActivityRecommendation;
}

export interface DayMeals {
    breakfast: RestaurantRecommendation;
    lunch: RestaurantRecommendation;
    dinner: RestaurantRecommendation;
}

export interface ItineraryDay {
    day: number;
    date?: string;
    location: string;
    region: string;
    dailyBudget: number;
    actualCost: number;
    morning: ItineraryActivity[];
    afternoon: ItineraryActivity[];
    evening: ItineraryActivity[];
    meals: DayMeals;
    accommodation: AccommodationRecommendation;
    transport: TransportRecommendation[];
    highlights: string[];
}

export interface ItinerarySummary {
    totalAccommodationCost: number;
    totalFoodCost: number;
    totalTransportCost: number;
    totalActivitiesCost: number;
    totalCost: number;
    budgetUtilization: number; // Percentage of budget used
}

export interface TripItinerary {
    id: string;
    userId?: string;
    budget: import('../types').BudgetBreakdown;
    formData: import('../types').BudgetFormData;
    days: ItineraryDay[];
    summary: ItinerarySummary;
    createdAt: Date;
    updatedAt: Date;
    generatedBy: 'ai' | 'template';
    aiModel?: string;
}

export interface ItineraryGenerationOptions {
    useAI: boolean;
    includeAlternatives: boolean;
    optimizeRoute: boolean;
    preferredCuisines?: string[];
    dietaryRestrictions?: string[];
    mobilityConsiderations?: string[];
}
