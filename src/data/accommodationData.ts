// Accommodation Dataset for GoGhana Budget Estimator
// This data enables specific hotel recommendations and validates budget estimates

import { ACCRA_ACCOMMODATIONS } from './accraAccommodations';

export interface Accommodation {
    // Basic Info
    id: string;
    name: string;
    type: 'hotel' | 'guesthouse' | 'hostel' | 'resort' | 'apartment' | 'boutique' | 'homestay';

    // Location
    region: string;
    city: string;
    neighborhood?: string;
    address: string;

    // Pricing (in GHS)
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury';
    pricePerNight: {
        min: number;
        max: number;
        average: number;
    };
    currency?: 'GHS' | 'USD'; // Defaults to GHS if not specified

    // Amenities
    amenities: string[];

    // Ratings & Reviews
    rating: {
        overall: number;
        reviewCount: number;
    };

    // Contact
    contact: {
        phone: string;
        website?: string;
    };

    // Additional Info
    description: string;
    highlights: string[];

    // Metadata
    verified: boolean;
    lastUpdated: string;
}

// Sample Accommodation Data (10 entries covering different tiers and regions)
export const ACCOMMODATIONS: Accommodation[] = [
    // LUXURY - Greater Accra
    {
        id: 'ACC001',
        name: 'Labadi Beach Hotel',
        type: 'hotel',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Labadi',
        address: '1 Labadi Beach Road, Accra',
        tier: 'luxury',
        pricePerNight: {
            min: 800,
            max: 1500,
            average: 1100
        },
        amenities: ['wifi', 'pool', 'restaurant', 'gym', 'spa', 'parking', 'airport-shuttle', 'ac', 'breakfast', 'beach-access'],
        rating: {
            overall: 4.5,
            reviewCount: 1250
        },
        contact: {
            phone: '+233 302 772 501',
            website: 'https://www.labadi.com'
        },
        description: 'Beachfront luxury hotel with stunning ocean views, world-class spa, and multiple dining options.',
        highlights: [
            'Direct beach access',
            'Award-winning spa',
            '5 restaurants and bars'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },
    {
        id: 'ACC005',
        name: 'Kempinski Hotel Gold Coast City',
        type: 'hotel',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Airport City',
        address: 'Gamel Abdul Nasser Avenue',
        tier: 'luxury',
        pricePerNight: {
            min: 1200,
            max: 2500,
            average: 1800
        },
        amenities: ['wifi', 'pool', 'restaurant', 'gym', 'spa', 'parking', 'airport-shuttle', 'ac', 'breakfast', 'business-center', 'beach-access'],
        rating: {
            overall: 4.7,
            reviewCount: 1450
        },
        contact: {
            phone: '+233 302 610 000',
            website: 'https://www.kempinski.com'
        },
        description: '5-star luxury hotel with private beach access, multiple pools, and world-class amenities.',
        highlights: [
            'Private beach',
            'Multiple pools',
            'Michelin-star dining'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // COMFORT - Greater Accra
    {
        id: 'ACC004',
        name: 'Movenpick Ambassador Hotel',
        type: 'hotel',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Independence Avenue',
        address: 'Independence Avenue, Accra',
        tier: 'comfort',
        pricePerNight: {
            min: 500,
            max: 800,
            average: 650
        },
        amenities: ['wifi', 'pool', 'restaurant', 'gym', 'spa', 'parking', 'ac', 'breakfast', 'business-center'],
        rating: {
            overall: 4.4,
            reviewCount: 980
        },
        contact: {
            phone: '+233 302 610 600',
            website: 'https://www.movenpick.com'
        },
        description: '4-star hotel in the heart of Accra with excellent business facilities and dining options.',
        highlights: [
            'City center location',
            'Business facilities',
            'Rooftop pool'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // MID-RANGE - Greater Accra
    {
        id: 'ACC006',
        name: 'Accra Luxury Apartments',
        type: 'apartment',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'East Legon',
        address: 'East Legon, Accra',
        tier: 'mid',
        pricePerNight: {
            min: 350,
            max: 600,
            average: 475
        },
        amenities: ['wifi', 'kitchen', 'ac', 'parking', 'pool'],
        rating: {
            overall: 4.3,
            reviewCount: 420
        },
        contact: {
            phone: '+233 244 123 456',
            website: 'https://www.accraluxuryapts.com'
        },
        description: 'Serviced apartments with full kitchens, perfect for longer stays and families.',
        highlights: [
            'Full kitchen',
            'Family-friendly',
            'Pool access'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // BUDGET - Greater Accra
    {
        id: 'ACC002',
        name: 'Alisa Hotel',
        type: 'hotel',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Airport Residential',
        address: '24 Liberia Road, Accra',
        tier: 'budget',
        pricePerNight: {
            min: 200,
            max: 350,
            average: 280
        },
        amenities: ['wifi', 'restaurant', 'ac', 'breakfast', 'parking'],
        rating: {
            overall: 4.0,
            reviewCount: 620
        },
        contact: {
            phone: '+233 302 776 701',
            website: 'https://www.alisahotels.com'
        },
        description: 'Comfortable budget hotel near the airport with modern amenities and friendly service.',
        highlights: [
            'Near airport',
            'Free WiFi',
            'Restaurant on-site'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },
    {
        id: 'ACC003',
        name: 'African Regent Hotel',
        type: 'hotel',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Osu',
        address: 'Barnes Road, Osu',
        tier: 'budget',
        pricePerNight: {
            min: 180,
            max: 300,
            average: 250
        },
        amenities: ['wifi', 'restaurant', 'ac', 'breakfast', 'bar'],
        rating: {
            overall: 4.2,
            reviewCount: 850
        },
        contact: {
            phone: '+233 302 774 893',
            website: 'https://www.africanregent.com'
        },
        description: 'Centrally located budget hotel in vibrant Osu, walking distance to Oxford Street.',
        highlights: [
            'Central Osu location',
            'Near Oxford Street',
            'Rooftop bar'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // COMFORT - Ashanti (Kumasi)
    {
        id: 'ASH001',
        name: 'Golden Tulip Kumasi City',
        type: 'hotel',
        region: 'Ashanti',
        city: 'Kumasi',
        neighborhood: 'Adum',
        address: 'Harper Road, Adum',
        tier: 'comfort',
        pricePerNight: {
            min: 400,
            max: 700,
            average: 550
        },
        amenities: ['wifi', 'pool', 'restaurant', 'gym', 'parking', 'ac', 'breakfast', 'business-center'],
        rating: {
            overall: 4.3,
            reviewCount: 720
        },
        contact: {
            phone: '+233 322 022 600',
            website: 'https://www.goldentulipkumasicity.com'
        },
        description: 'Modern 4-star hotel in central Kumasi with excellent conference facilities.',
        highlights: [
            'Central location',
            'Conference facilities',
            'Rooftop pool'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // BUDGET - Ashanti (Kumasi)
    {
        id: 'ASH002',
        name: 'Four Villages Inn',
        type: 'guesthouse',
        region: 'Ashanti',
        city: 'Kumasi',
        neighborhood: 'Asokwa',
        address: 'Asokwa, Kumasi',
        tier: 'budget',
        pricePerNight: {
            min: 150,
            max: 250,
            average: 200
        },
        amenities: ['wifi', 'restaurant', 'ac', 'parking'],
        rating: {
            overall: 4.1,
            reviewCount: 380
        },
        contact: {
            phone: '+233 322 027 844',
            website: 'https://www.fourvillagesinn.com'
        },
        description: 'Cozy guesthouse with traditional Ghanaian hospitality and home-cooked meals.',
        highlights: [
            'Traditional hospitality',
            'Home-cooked meals',
            'Garden setting'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // COMFORT - Central (Elmina)
    {
        id: 'CEN002',
        name: 'Elmina Beach Resort',
        type: 'resort',
        region: 'Central',
        city: 'Elmina',
        neighborhood: 'Beach Road',
        address: 'Coast Road, Elmina',
        tier: 'comfort',
        pricePerNight: {
            min: 450,
            max: 750,
            average: 600
        },
        amenities: ['wifi', 'pool', 'restaurant', 'gym', 'ac', 'beach-access', 'spa', 'parking'],
        rating: {
            overall: 4.5,
            reviewCount: 890
        },
        contact: {
            phone: '+233 332 142 635',
            website: 'https://www.elminabeachresort.com'
        },
        description: 'Luxury beach resort near Elmina Castle with full-service spa and water sports.',
        highlights: [
            'Near Elmina Castle',
            'Water sports',
            'Full-service spa'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    },

    // MID-RANGE - Central (Elmina)
    {
        id: 'CEN001',
        name: 'Coconut Grove Beach Resort',
        type: 'resort',
        region: 'Central',
        city: 'Elmina',
        neighborhood: 'Beach Road',
        address: 'Beach Road, Elmina',
        tier: 'mid',
        pricePerNight: {
            min: 300,
            max: 500,
            average: 400
        },
        amenities: ['wifi', 'restaurant', 'ac', 'beach-access', 'bar', 'parking'],
        rating: {
            overall: 4.4,
            reviewCount: 650
        },
        contact: {
            phone: '+233 332 137 450',
            website: 'https://www.coconutgroveghana.com'
        },
        description: 'Beachfront resort with stunning ocean views and fresh seafood restaurant.',
        highlights: [
            'Beachfront location',
            'Fresh seafood',
            'Ocean view rooms'
        ],
        verified: true,
        lastUpdated: '2025-01-21'
    }
];

// Merge new Accra data
ACCOMMODATIONS.push(...ACCRA_ACCOMMODATIONS);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get accommodations by region
 */
export function getAccommodationsByRegion(region: string): Accommodation[] {
    return ACCOMMODATIONS.filter(acc => acc.region === region);
}

/**
 * Get accommodations by tier
 */
export function getAccommodationsByTier(tier: string): Accommodation[] {
    return ACCOMMODATIONS.filter(acc => acc.tier === tier);
}

/**
 * Get accommodations within budget
 */
export function getAccommodationsByBudget(maxBudget: number): Accommodation[] {
    return ACCOMMODATIONS.filter(acc => {
        const price = acc.currency === 'USD' ? acc.pricePerNight.average * 15.5 : acc.pricePerNight.average;
        return price <= maxBudget;
    });
}

/**
 * Get accommodation recommendations based on criteria
 * Returns top-rated properties matching the criteria
 */
export function getRecommendations(
    region: string,
    tier: string,
    maxBudget: number,
    limit: number = 3
): Accommodation[] {
    return ACCOMMODATIONS
        .filter(acc => {
            const price = acc.currency === 'USD' ? acc.pricePerNight.average * 15.5 : acc.pricePerNight.average;
            return acc.region === region &&
                acc.tier === tier &&
                price <= maxBudget;
        })
        .sort((a, b) => b.rating.overall - a.rating.overall)
        .slice(0, limit);
}

/**
 * Validate budget estimate against actual accommodation prices
 * Returns true if the estimated budget is realistic
 */
export function validateBudgetEstimate(
    region: string,
    tier: string,
    estimatedDailyBudget: number
): {
    isRealistic: boolean;
    averageActualPrice: number;
    difference: number;
    percentageDiff: number;
} {
    const accommodations = ACCOMMODATIONS.filter(
        acc => acc.region === region && acc.tier === tier
    );

    if (accommodations.length === 0) {
        return {
            isRealistic: true, // No data to compare
            averageActualPrice: estimatedDailyBudget,
            difference: 0,
            percentageDiff: 0
        };
    }

    const averageActualPrice = accommodations.reduce(
        (sum, acc) => {
            const price = acc.currency === 'USD' ? acc.pricePerNight.average * 15.5 : acc.pricePerNight.average;
            return sum + price;
        }, 0
    ) / accommodations.length;

    const difference = estimatedDailyBudget - averageActualPrice;
    const percentageDiff = (difference / averageActualPrice) * 100;

    // Budget is realistic if within 20% of actual average
    const isRealistic = Math.abs(percentageDiff) <= 20;

    return {
        isRealistic,
        averageActualPrice: Math.round(averageActualPrice),
        difference: Math.round(difference),
        percentageDiff: Math.round(percentageDiff)
    };
}

/**
 * Get statistics for a region and tier
 */
export function getAccommodationStats(region: string, tier: string) {
    const accommodations = ACCOMMODATIONS.filter(
        acc => acc.region === region && acc.tier === tier
    );

    if (accommodations.length === 0) {
        return null;
    }

    const prices = accommodations.map(acc =>
        acc.currency === 'USD' ? acc.pricePerNight.average * 15.5 : acc.pricePerNight.average
    );
    const ratings = accommodations.map(acc => acc.rating.overall);

    return {
        count: accommodations.length,
        priceRange: {
            min: Math.min(...prices),
            max: Math.max(...prices),
            average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
        },
        averageRating: (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1),
        topRated: accommodations.sort((a, b) => b.rating.overall - a.rating.overall)[0]
    };
}
