/**
 * Recommendation data structures for Budget Recommendations page
 */

export type RecommendationCategory = 'accommodation' | 'activities' | 'food' | 'transport';

export interface Recommendation {
    id: string;
    category: RecommendationCategory;
    name: string;
    description: string;
    priceRange: {
        min: number;
        max: number;
        currency: 'GHS';
        period?: 'night' | 'person' | 'day' | 'trip';
    };
    location: string;
    region: string;
    imageUrl?: string;
    rating?: number;
    amenities?: string[];
    tags?: string[];
    verified: boolean;
    lastVerified?: Date;
    bookingUrl?: string;
    contactInfo?: {
        phone?: string;
        email?: string;
        website?: string;
    };
}

export interface RecommendationSet {
    accommodation: Recommendation[];
    activities: Recommendation[];
    food: Recommendation[];
    transport: Recommendation[];
}

export interface SelectedRecommendations {
    [categoryId: string]: string[]; // category -> selected recommendation IDs
}

export interface VerificationResult {
    recommendation: Recommendation;
    currentPrice?: {
        min: number;
        max: number;
        currency: string;
        source: string;
    };
    availability?: 'available' | 'limited' | 'unavailable' | 'unknown';
    images?: string[];
    reviews?: {
        rating: number;
        count: number;
        source: string;
    };
    bookingLinks?: Array<{
        platform: string;
        url: string;
    }>;
    lastChecked: Date;
    sources: string[];
}
