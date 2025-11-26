export interface Activity {
    id: string;
    name: string;
    type: 'Festival' | 'Event' | 'Nightlife' | 'Attraction' | 'Tour' | 'Cultural';
    region: string;
    city: string;
    venue?: string;
    description: string;
    priceRange: {
        min: number;
        max: number;
        currency: 'GHS' | 'USD';
    };
    duration?: string; // e.g., "2 hours", "All day", "3 days"
    bestTime?: string; // e.g., "August", "Weekends", "Year-round"
    highlights: string[];
    targetAudience?: string[]; // e.g., ["Couples", "Families", "Solo", "Groups"]
    bookingRequired?: boolean;
    website?: string;
    contact?: string;
}

export const ACTIVITIES: Activity[] = [
    // Festivals
    {
        id: 'chale-wote-accra',
        name: 'Chale Wote Street Art Festival',
        type: 'Festival',
        region: 'Greater Accra',
        city: 'Accra',
        venue: 'Jamestown',
        description: 'Annual street art and music festival celebrating Ghanaian creativity and culture. Features live performances, art installations, and street food.',
        priceRange: { min: 0, max: 50, currency: 'GHS' },
        duration: '3 days',
        bestTime: 'August',
        highlights: ['Street Art', 'Live Music', 'Cultural Performances', 'Food Stalls'],
        targetAudience: ['Solo', 'Couples', 'Groups'],
        bookingRequired: false
    },
    {
        id: 'homowo-accra',
        name: 'Homowo Festival',
        type: 'Festival',
        region: 'Greater Accra',
        city: 'Accra',
        description: 'Traditional Ga festival celebrating the harvest season. Features processions, traditional drumming, and the famous "kpokpoi" meal.',
        priceRange: { min: 0, max: 0, currency: 'GHS' },
        duration: '1 week',
        bestTime: 'August',
        highlights: ['Traditional Drumming', 'Cultural Processions', 'Local Food', 'Community Celebration'],
        targetAudience: ['Families', 'Cultural Enthusiasts'],
        bookingRequired: false
    },
    {
        id: 'afrochella-accra',
        name: 'Afrochella',
        type: 'Event',
        region: 'Greater Accra',
        city: 'Accra',
        venue: 'El Wak Stadium',
        description: 'Premier Afrobeats music festival featuring top African artists. A celebration of African culture, fashion, and music.',
        priceRange: { min: 300, max: 1500, currency: 'GHS' },
        duration: '1 day',
        bestTime: 'December',
        highlights: ['Live Performances', 'Fashion', 'Art Installations', 'Food & Drinks'],
        targetAudience: ['Young Adults', 'Music Lovers'],
        bookingRequired: true,
        website: 'www.afrochella.com'
    },

    // Nightlife
    {
        id: 'republic-accra',
        name: 'Republic Bar & Grill',
        type: 'Nightlife',
        region: 'Greater Accra',
        city: 'Accra',
        venue: 'Osu Oxford Street',
        description: 'Popular nightclub and lounge with live DJ sets, cocktails, and vibrant atmosphere. Great for dancing and socializing.',
        priceRange: { min: 100, max: 500, currency: 'GHS' },
        duration: 'Evening',
        bestTime: 'Weekends',
        highlights: ['Live DJ', 'Cocktails', 'Dancing', 'Rooftop Lounge'],
        targetAudience: ['Young Adults', 'Couples', 'Groups'],
        bookingRequired: false
    },
    {
        id: 'skybar25-accra',
        name: 'SkyBar 25',
        type: 'Nightlife',
        region: 'Greater Accra',
        city: 'Accra',
        venue: 'Movenpick Ambassador Hotel',
        description: 'Rooftop bar with stunning views of Accra. Premium cocktails and sophisticated ambiance.',
        priceRange: { min: 150, max: 800, currency: 'GHS' },
        duration: 'Evening',
        bestTime: 'Year-round',
        highlights: ['Rooftop Views', 'Premium Cocktails', 'Live Music', 'Upscale Atmosphere'],
        targetAudience: ['Couples', 'Professionals'],
        bookingRequired: false
    },

    // Cultural Attractions
    {
        id: 'kakum-canopy',
        name: 'Kakum Canopy Walkway',
        type: 'Attraction',
        region: 'Central',
        city: 'Cape Coast',
        description: 'Suspended canopy walkway through the rainforest, 40 meters above ground. Unique wildlife viewing experience.',
        priceRange: { min: 50, max: 80, currency: 'GHS' },
        duration: '2-3 hours',
        bestTime: 'Year-round (dry season best)',
        highlights: ['Rainforest Views', 'Wildlife', 'Adventure', 'Photography'],
        targetAudience: ['Families', 'Nature Lovers', 'Adventure Seekers'],
        bookingRequired: false
    },
    {
        id: 'cape-coast-castle',
        name: 'Cape Coast Castle',
        type: 'Cultural',
        region: 'Central',
        city: 'Cape Coast',
        description: 'UNESCO World Heritage Site and former slave trading post. Powerful historical experience with guided tours.',
        priceRange: { min: 40, max: 60, currency: 'GHS' },
        duration: '1-2 hours',
        bestTime: 'Year-round',
        highlights: ['History', 'Guided Tours', 'Ocean Views', 'Museum'],
        targetAudience: ['History Buffs', 'Educational Groups', 'All Ages'],
        bookingRequired: false
    },
    {
        id: 'mole-safari',
        name: 'Mole National Park Safari',
        type: 'Tour',
        region: 'Northern',
        city: 'Larabanga',
        description: 'Walking safari to see elephants, antelopes, and other wildlife in Ghana\'s largest national park.',
        priceRange: { min: 150, max: 300, currency: 'GHS' },
        duration: '2-3 hours',
        bestTime: 'November to April (dry season)',
        highlights: ['Elephants', 'Wildlife Viewing', 'Walking Safari', 'Nature'],
        targetAudience: ['Nature Lovers', 'Photographers', 'Adventure Seekers'],
        bookingRequired: true
    }
];

// Helper functions
export const getActivitiesByType = (type: Activity['type']): Activity[] => {
    return ACTIVITIES.filter(a => a.type === type);
};

export const getActivitiesByRegion = (region: string): Activity[] => {
    return ACTIVITIES.filter(a => a.region === region);
};

export const getFestivals = (): Activity[] => {
    return ACTIVITIES.filter(a => a.type === 'Festival');
};

export const getNightlife = (): Activity[] => {
    return ACTIVITIES.filter(a => a.type === 'Nightlife');
};
