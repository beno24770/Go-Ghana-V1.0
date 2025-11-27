import type { Region } from '../types';

export interface Restaurant {
    id: string;
    name: string;
    region: Region;
    city: string; // e.g., "Accra", "Kumasi", "Cape Coast"
    neighborhood?: string; // e.g., "Osu", "East Legon"
    cuisine: string[]; // e.g., ["Local", "Continental", "Seafood"]
    priceRange: 'Budget' | 'Mid-range' | 'High-end'; // Budget (<GH₵50), Mid (GH₵50-150), High (>GH₵150)
    avgCostPerPerson: number; // Estimated cost for a meal + drink in GH₵
    rating: number; // 1-5 stars
    description: string;
    highlights: string[]; // e.g., "Best Jollof", "Live Music", "Ocean View"
    address?: string;
    contact?: string;
    website?: string;
    googleMapsUrl?: string;
}

export const RESTAURANTS: Restaurant[] = [
    {
        id: 'buka-accra',
        name: 'Buka Restaurant',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Osu',
        cuisine: ['Local', 'West African'],
        priceRange: 'Mid-range',
        avgCostPerPerson: 120,
        rating: 4.5,
        description: 'One of the best places in Accra for authentic Ghanaian and Nigerian cuisine in a stylish, open-air setting.',
        highlights: ['Jollof Rice', 'Grilled Tilapia', 'Busy Atmosphere'],
        address: '10th Street, Osu, Accra',
        googleMapsUrl: 'https://goo.gl/maps/example'
    },
    {
        id: 'azmera-accra',
        name: 'Azmera Restaurant',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Roman Ridge',
        cuisine: ['Local'],
        priceRange: 'Mid-range',
        avgCostPerPerson: 100,
        rating: 4.4,
        description: 'Famous for its extensive local buffet. A great place to try a variety of Ghanaian dishes in one go.',
        highlights: ['Local Buffet', 'Fufu', 'Banku'],
        address: 'Roman Ridge, Accra'
    },
    {
        id: 'santoku-accra',
        name: 'Santoku',
        region: 'Greater Accra',
        city: 'Accra',
        neighborhood: 'Airport Residential',
        cuisine: ['Japanese', 'Asian Fusion'],
        priceRange: 'High-end',
        avgCostPerPerson: 450,
        rating: 4.8,
        description: 'World-class Japanese dining in Accra. Known for its sushi, cocktails, and elegant design.',
        highlights: ['Sushi', 'Cocktails', 'Luxury Dining'],
        address: 'Villaggio Vista, North Airport Rd, Accra'
    },
    {
        id: 'ike-cafe-kumasi',
        name: "Ike's Cafe and Grill",
        region: 'Ashanti',
        city: 'Kumasi',
        neighborhood: 'Cultural Centre',
        cuisine: ['Local', 'Grill'],
        priceRange: 'Mid-range',
        avgCostPerPerson: 90,
        rating: 4.3,
        description: 'A popular spot located within the Kumasi Cultural Centre, offering great grilled fish and local dishes.',
        highlights: ['Grilled Tilapia', 'Live Band', 'Cultural Setting'],
        address: 'Kumasi Cultural Centre'
    },
    {
        id: 'castle-beach-cape',
        name: 'Castle Beach Restaurant',
        region: 'Central',
        city: 'Cape Coast',
        neighborhood: 'Cape Coast Castle',
        cuisine: ['Seafood', 'Local'],
        priceRange: 'Budget',
        avgCostPerPerson: 60,
        rating: 4.0,
        description: 'Simple restaurant right next to the Castle with stunning ocean views and fresh seafood.',
        highlights: ['Ocean View', 'Lobster', 'Fresh Fish'],
        address: 'Next to Cape Coast Castle'
    }
];

// Helper functions
export const getRestaurantsByRegion = (region: string): Restaurant[] => {
    return RESTAURANTS.filter(r => r.region === region);
};

export const getRestaurantsByCuisine = (cuisine: string): Restaurant[] => {
    return RESTAURANTS.filter(r => r.cuisine.includes(cuisine));
};
