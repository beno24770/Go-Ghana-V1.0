import type {
    AccommodationRecommendation,
    RestaurantRecommendation,
    ActivityRecommendation
} from '../types/itinerary';

/**
 * Sample Accommodation Data
 * TODO: Replace with actual database/API
 */
export const SAMPLE_ACCOMMODATIONS: Record<string, AccommodationRecommendation[]> = {
    'Greater Accra': [
        // Luxury
        {
            id: 'acc-accra-luxury-1',
            name: 'Kempinski Hotel Gold Coast City',
            type: 'hotel',
            location: 'Airport Residential Area',
            region: 'Greater Accra',
            pricePerNight: 800,
            rating: 4.8,
            amenities: ['Pool', 'Spa', 'Restaurant', 'Gym', 'Ocean View'],
            description: '5-star luxury hotel with stunning ocean views and world-class amenities',
            tier: 'luxury',
        },
        // Comfort
        {
            id: 'acc-accra-comfort-1',
            name: 'Movenpick Ambassador Hotel',
            type: 'hotel',
            location: 'Ridge',
            region: 'Greater Accra',
            pricePerNight: 350,
            rating: 4.5,
            amenities: ['Pool', 'Restaurant', 'Gym', 'Conference Rooms'],
            description: '4-star hotel in the heart of Accra with excellent service',
            tier: 'comfort',
        },
        // Mid-range
        {
            id: 'acc-accra-mid-1',
            name: 'Alisa Hotel',
            type: 'hotel',
            location: 'North Ridge',
            region: 'Greater Accra',
            pricePerNight: 180,
            rating: 4.2,
            amenities: ['Pool', 'Restaurant', 'Free WiFi'],
            description: 'Comfortable mid-range hotel with great location',
            tier: 'mid',
        },
        // Budget
        {
            id: 'acc-accra-budget-1',
            name: 'Afrikiko Riverfront Resort',
            type: 'guesthouse',
            location: 'Oyarifa',
            region: 'Greater Accra',
            pricePerNight: 80,
            rating: 4.0,
            amenities: ['Restaurant', 'Garden', 'Free Parking'],
            description: 'Peaceful riverside guesthouse with local charm',
            tier: 'budget',
        },
        // Backpacker
        {
            id: 'acc-accra-backpacker-1',
            name: 'Somewhere Nice Hostel',
            type: 'hostel',
            location: 'Osu',
            region: 'Greater Accra',
            pricePerNight: 35,
            rating: 4.3,
            amenities: ['Shared Kitchen', 'Common Area', 'Free WiFi'],
            description: 'Social hostel perfect for backpackers and solo travelers',
            tier: 'backpacker',
        },
    ],
    'Ashanti': [
        // Luxury
        {
            id: 'acc-kumasi-luxury-1',
            name: 'Golden Tulip Kumasi City',
            type: 'hotel',
            location: 'Kumasi',
            region: 'Ashanti',
            pricePerNight: 450,
            rating: 4.6,
            amenities: ['Pool', 'Restaurant', 'Gym', 'Conference Rooms'],
            description: 'Premium hotel in the heart of the Garden City',
            tier: 'luxury',
        },
        // Comfort
        {
            id: 'acc-kumasi-comfort-1',
            name: 'Lancaster Kumasi',
            type: 'hotel',
            location: 'Kumasi',
            region: 'Ashanti',
            pricePerNight: 280,
            rating: 4.4,
            amenities: ['Pool', 'Restaurant', 'Free WiFi', 'Garden'],
            description: 'Elegant hotel with excellent service and amenities',
            tier: 'comfort',
        },
        // Mid-range
        {
            id: 'acc-kumasi-mid-1',
            name: 'Four Villages Inn',
            type: 'hotel',
            location: 'Kumasi',
            region: 'Ashanti',
            pricePerNight: 150,
            rating: 4.3,
            amenities: ['Pool', 'Restaurant', 'Garden'],
            description: 'Charming hotel in the garden city',
            tier: 'mid',
        },
        {
            id: 'acc-kumasi-mid-2',
            name: 'Miklin Hotel',
            type: 'hotel',
            location: 'Kumasi',
            region: 'Ashanti',
            pricePerNight: 140,
            rating: 4.2,
            amenities: ['Restaurant', 'Free WiFi', 'Conference Rooms'],
            description: 'Comfortable mid-range hotel with good location',
            tier: 'mid',
        },
        // Budget
        {
            id: 'acc-kumasi-budget-1',
            name: 'Kumasi Catering Rest House',
            type: 'guesthouse',
            location: 'Kumasi',
            region: 'Ashanti',
            pricePerNight: 70,
            rating: 4.0,
            amenities: ['Restaurant', 'Free Parking', 'Garden'],
            description: 'Clean and affordable guesthouse',
            tier: 'budget',
        },
    ],
    'Central': [
        // Comfort
        {
            id: 'acc-capecoast-comfort-1',
            name: 'Coconut Grove Beach Resort',
            type: 'resort',
            location: 'Cape Coast',
            region: 'Central',
            pricePerNight: 320,
            rating: 4.7,
            amenities: ['Beach Access', 'Pool', 'Restaurant', 'Spa'],
            description: 'Beachfront resort with stunning ocean views',
            tier: 'comfort',
        },
        // Mid-range
        {
            id: 'acc-capecoast-mid-1',
            name: 'Oasis Beach Resort',
            type: 'resort',
            location: 'Cape Coast',
            region: 'Central',
            pricePerNight: 180,
            rating: 4.4,
            amenities: ['Beach Access', 'Restaurant', 'Pool'],
            description: 'Relaxing beachside resort',
            tier: 'mid',
        },
        {
            id: 'acc-capecoast-mid-2',
            name: 'Elmina Beach Resort',
            type: 'resort',
            location: 'Elmina',
            region: 'Central',
            pricePerNight: 160,
            rating: 4.3,
            amenities: ['Beach Access', 'Restaurant', 'Free WiFi'],
            description: 'Historic coastal resort near Elmina Castle',
            tier: 'mid',
        },
        // Budget
        {
            id: 'acc-capecoast-budget-1',
            name: 'Cape Coast Castle Guesthouse',
            type: 'guesthouse',
            location: 'Cape Coast',
            region: 'Central',
            pricePerNight: 65,
            rating: 3.9,
            amenities: ['Free WiFi', 'Shared Kitchen'],
            description: 'Budget-friendly guesthouse near historical sites',
            tier: 'budget',
        },
    ],
    'Volta': [
        // Mid-range
        {
            id: 'acc-volta-mid-1',
            name: 'Volta Serene Hotel',
            type: 'hotel',
            location: 'Ho',
            region: 'Volta',
            pricePerNight: 120,
            rating: 4.2,
            amenities: ['Restaurant', 'Garden', 'Free WiFi'],
            description: 'Peaceful hotel in the Volta Region',
            tier: 'mid',
        },
        // Budget
        {
            id: 'acc-volta-budget-1',
            name: 'Chances Hotel',
            type: 'hotel',
            location: 'Ho',
            region: 'Volta',
            pricePerNight: 60,
            rating: 4.0,
            amenities: ['Restaurant', 'Free Parking'],
            description: 'Affordable hotel in Ho',
            tier: 'budget',
        },
    ],
    // Add more regions as needed
};

/**
 * Sample Restaurant Data
 * TODO: Replace with actual database/API
 */
export const SAMPLE_RESTAURANTS: Record<string, RestaurantRecommendation[]> = {
    'Greater Accra': [
        // Breakfast
        {
            id: 'rest-accra-breakfast-1',
            name: 'Asanka Local',
            cuisine: 'Ghanaian',
            location: 'Osu',
            region: 'Greater Accra',
            priceRange: 'GH₵ 15-30',
            averageCost: 22,
            rating: 4.5,
            specialty: 'Waakye, Koose, Hausa Koko',
            mealType: 'breakfast',
            tier: 'budget',
        },
        {
            id: 'rest-accra-breakfast-2',
            name: 'Buka Restaurant',
            cuisine: 'Nigerian/Ghanaian',
            location: 'Osu',
            region: 'Greater Accra',
            priceRange: 'GH₵ 30-60',
            averageCost: 45,
            rating: 4.6,
            specialty: 'Jollof Rice, Plantain, Eggs',
            mealType: 'breakfast',
            tier: 'mid',
        },
        // Lunch
        {
            id: 'rest-accra-lunch-1',
            name: 'Azmera Restaurant',
            cuisine: 'Ethiopian',
            location: 'Osu',
            region: 'Greater Accra',
            priceRange: 'GH₵ 40-80',
            averageCost: 60,
            rating: 4.7,
            specialty: 'Injera, Doro Wat',
            mealType: 'lunch',
            tier: 'mid',
        },
        // Dinner
        {
            id: 'rest-accra-dinner-1',
            name: 'Santoku',
            cuisine: 'Japanese',
            location: 'Osu',
            region: 'Greater Accra',
            priceRange: 'GH₵ 80-150',
            averageCost: 115,
            rating: 4.8,
            specialty: 'Sushi, Ramen',
            mealType: 'dinner',
            tier: 'comfort',
        },
        {
            id: 'rest-accra-dinner-2',
            name: 'Chez Clarisse',
            cuisine: 'French/Continental',
            location: 'Airport Residential',
            region: 'Greater Accra',
            priceRange: 'GH₵ 150-300',
            averageCost: 220,
            rating: 4.9,
            specialty: 'Fine Dining',
            mealType: 'dinner',
            tier: 'luxury',
        },
    ],
    // Add more regions
};

/**
 * Sample Activity Data
 * TODO: Replace with actual database/API
 */
export const SAMPLE_ACTIVITIES: Record<string, ActivityRecommendation[]> = {
    'Greater Accra': [
        {
            id: 'act-accra-culture-1',
            name: 'Kwame Nkrumah Memorial Park',
            location: 'High Street, Accra',
            region: 'Greater Accra',
            cost: 10,
            duration: '1-2 hours',
            description: 'Visit the final resting place of Ghana\'s first president and learn about independence history',
            type: 'culture',
            rating: 4.5,
            bestTimeOfDay: 'morning',
        },
        {
            id: 'act-accra-culture-2',
            name: 'Jamestown & Lighthouse',
            location: 'Jamestown, Accra',
            region: 'Greater Accra',
            cost: 15,
            duration: '2-3 hours',
            description: 'Explore historic Jamestown and climb the lighthouse for panoramic city views',
            type: 'culture',
            rating: 4.6,
            bestTimeOfDay: 'afternoon',
        },
        {
            id: 'act-accra-nightlife-1',
            name: '+233 Jazz Bar & Grill',
            location: 'Osu',
            region: 'Greater Accra',
            cost: 20,
            duration: '2-3 hours',
            description: 'Live jazz music and great atmosphere',
            type: 'nightlife',
            rating: 4.7,
            bestTimeOfDay: 'evening',
        },
    ],
    'Central': [
        {
            id: 'act-central-culture-1',
            name: 'Cape Coast Castle',
            location: 'Cape Coast',
            region: 'Central',
            cost: 40,
            duration: '2-3 hours',
            description: 'UNESCO World Heritage site and former slave trading post',
            type: 'culture',
            rating: 4.9,
            bestTimeOfDay: 'morning',
        },
        {
            id: 'act-central-nature-1',
            name: 'Kakum National Park Canopy Walk',
            location: 'Kakum',
            region: 'Central',
            cost: 60,
            duration: '3-4 hours',
            description: 'Walk through the rainforest canopy on suspended bridges',
            type: 'nature',
            rating: 4.8,
            bestTimeOfDay: 'morning',
        },
    ],
    // Add more regions
};

/**
 * Helper function to get accommodations by region and tier
 */
export function getAccommodationsByTier(
    region: string,
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury'
): AccommodationRecommendation[] {
    const accommodations = SAMPLE_ACCOMMODATIONS[region] || [];
    return accommodations.filter(acc => acc.tier === tier);
}

/**
 * Helper function to get restaurants by region, meal type, and tier
 */
export function getRestaurantsByMealAndTier(
    region: string,
    mealType: 'breakfast' | 'lunch' | 'dinner',
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury'
): RestaurantRecommendation[] {
    const restaurants = SAMPLE_RESTAURANTS[region] || [];
    return restaurants.filter(rest =>
        rest.mealType === mealType &&
        (rest.tier === tier || rest.tier === 'mid') // Allow mid-tier for flexibility
    );
}

/**
 * Helper function to get activities by region and type
 */
export function getActivitiesByType(
    region: string,
    type: 'culture' | 'nature' | 'adventure' | 'relaxation' | 'food' | 'nightlife'
): ActivityRecommendation[] {
    const activities = SAMPLE_ACTIVITIES[region] || [];
    return activities.filter(act => act.type === type);
}
