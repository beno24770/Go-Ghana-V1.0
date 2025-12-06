import type { Recommendation } from '../../types/recommendations';

/**
 * Curated activity and attraction recommendations for Ghana
 * Organized by type and region
 */

export const ACTIVITY_RECOMMENDATIONS: Recommendation[] = [
    // ACCRA / GREATER ACCRA REGION
    {
        id: 'act-accra-001',
        category: 'activities',
        name: 'Kwame Nkrumah Memorial Park',
        description: 'Visit the final resting place of Ghana\'s first president and explore the museum',
        priceRange: { min: 20, max: 50, currency: 'GHS', period: 'person' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/activities/nkrumah-park.jpg',
        rating: 4.5,
        tags: ['history', 'culture', 'museum', 'landmark'],
        verified: true
    },
    {
        id: 'act-accra-002',
        category: 'activities',
        name: 'Makola Market Tour',
        description: 'Experience the vibrant chaos of Accra\'s largest market with a local guide',
        priceRange: { min: 50, max: 150, currency: 'GHS', period: 'person' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/activities/makola-market.jpg',
        rating: 4.6,
        tags: ['culture', 'shopping', 'local-experience', 'guided-tour'],
        verified: true
    },
    {
        id: 'act-accra-003',
        category: 'activities',
        name: 'Labadi Beach Day Pass',
        description: 'Relax on Accra\'s most popular beach with music, food, and ocean views',
        priceRange: { min: 10, max: 30, currency: 'GHS', period: 'person' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/activities/labadi-beach.jpg',
        rating: 4.2,
        tags: ['beach', 'relaxation', 'music', 'food'],
        verified: true
    },
    {
        id: 'act-accra-004',
        category: 'activities',
        name: 'Jamestown Walking Tour',
        description: 'Explore historic Jamestown, climb the lighthouse, and visit the boxing academy',
        priceRange: { min: 100, max: 200, currency: 'GHS', period: 'person' },
        location: 'Accra (Jamestown)',
        region: 'Greater Accra',
        imageUrl: '/images/activities/jamestown.jpg',
        rating: 4.7,
        tags: ['history', 'culture', 'walking-tour', 'photography'],
        verified: true
    },
    {
        id: 'act-accra-005',
        category: 'activities',
        name: 'W.E.B. Du Bois Center',
        description: 'Visit the home and memorial of the Pan-African scholar',
        priceRange: { min: 15, max: 40, currency: 'GHS', period: 'person' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/activities/dubois-center.jpg',
        rating: 4.4,
        tags: ['history', 'culture', 'museum', 'pan-africanism'],
        verified: true
    },

    // CAPE COAST / CENTRAL REGION
    {
        id: 'act-cape-001',
        category: 'activities',
        name: 'Cape Coast Castle Tour',
        description: 'UNESCO World Heritage site and former slave trading post with guided tour',
        priceRange: { min: 40, max: 80, currency: 'GHS', period: 'person' },
        location: 'Cape Coast',
        region: 'Central',
        imageUrl: '/images/activities/cape-coast-castle.jpg',
        rating: 4.9,
        amenities: ['Guided Tour', 'Museum', 'Historical Site'],
        tags: ['history', 'unesco', 'slavery-history', 'must-see'],
        verified: true
    },
    {
        id: 'act-cape-002',
        category: 'activities',
        name: 'Elmina Castle Tour',
        description: 'Visit the oldest European building in sub-Saharan Africa',
        priceRange: { min: 40, max: 80, currency: 'GHS', period: 'person' },
        location: 'Elmina',
        region: 'Central',
        imageUrl: '/images/activities/elmina-castle.jpg',
        rating: 4.8,
        amenities: ['Guided Tour', 'Museum', 'Historical Site'],
        tags: ['history', 'unesco', 'slavery-history', 'must-see'],
        verified: true
    },
    {
        id: 'act-cape-003',
        category: 'activities',
        name: 'Kakum National Park Canopy Walk',
        description: 'Walk 40 meters above the rainforest on suspended bridges',
        priceRange: { min: 65, max: 120, currency: 'GHS', period: 'person' },
        location: 'Kakum',
        region: 'Central',
        imageUrl: '/images/activities/kakum-canopy.jpg',
        rating: 4.7,
        amenities: ['Guided Tour', 'Nature Walk', 'Wildlife Viewing'],
        tags: ['nature', 'adventure', 'rainforest', 'must-see'],
        verified: true
    },

    // KUMASI / ASHANTI REGION
    {
        id: 'act-kumasi-001',
        category: 'activities',
        name: 'Manhyia Palace Museum',
        description: 'Explore the seat of the Ashanti Kingdom and learn about royal history',
        priceRange: { min: 30, max: 60, currency: 'GHS', period: 'person' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/activities/manhyia-palace.jpg',
        rating: 4.6,
        tags: ['history', 'culture', 'royalty', 'museum'],
        verified: true
    },
    {
        id: 'act-kumasi-002',
        category: 'activities',
        name: 'Kejetia Market Tour',
        description: 'Visit West Africa\'s largest open-air market with a local guide',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'person' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/activities/kejetia-market.jpg',
        rating: 4.5,
        tags: ['culture', 'shopping', 'local-experience', 'guided-tour'],
        verified: true
    },
    {
        id: 'act-kumasi-003',
        category: 'activities',
        name: 'Bonwire Kente Village Tour',
        description: 'Watch master weavers create traditional Kente cloth and learn the craft',
        priceRange: { min: 100, max: 200, currency: 'GHS', period: 'person' },
        location: 'Bonwire (near Kumasi)',
        region: 'Ashanti',
        imageUrl: '/images/activities/kente-weaving.jpg',
        rating: 4.8,
        tags: ['culture', 'crafts', 'traditional', 'shopping'],
        verified: true
    },

    // VOLTA REGION
    {
        id: 'act-volta-001',
        category: 'activities',
        name: 'Wli Waterfalls Hike',
        description: 'Hike to Ghana\'s highest waterfall and swim in the natural pool',
        priceRange: { min: 50, max: 100, currency: 'GHS', period: 'person' },
        location: 'Wli',
        region: 'Volta',
        imageUrl: '/images/activities/wli-waterfalls.jpg',
        rating: 4.7,
        amenities: ['Guided Hike', 'Swimming', 'Nature'],
        tags: ['nature', 'adventure', 'waterfall', 'hiking'],
        verified: true
    },
    {
        id: 'act-volta-002',
        category: 'activities',
        name: 'Mount Afadja Hike',
        description: 'Climb Ghana\'s highest mountain for stunning panoramic views',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'person' },
        location: 'Afadja',
        region: 'Volta',
        imageUrl: '/images/activities/mount-afadja.jpg',
        rating: 4.6,
        amenities: ['Guided Hike', 'Scenic Views'],
        tags: ['nature', 'adventure', 'hiking', 'mountain'],
        verified: true
    },

    // ADVENTURE ACTIVITIES
    {
        id: 'act-adventure-001',
        category: 'activities',
        name: 'Surfing Lessons at Busua Beach',
        description: 'Learn to surf on Ghana\'s best waves with experienced instructors',
        priceRange: { min: 150, max: 300, currency: 'GHS', period: 'person' },
        location: 'Busua',
        region: 'Western',
        imageUrl: '/images/activities/busua-surf.jpg',
        rating: 4.8,
        amenities: ['Equipment Included', 'Instruction', 'Beach Access'],
        tags: ['adventure', 'beach', 'water-sports', 'surfing'],
        verified: true
    },
    {
        id: 'act-adventure-002',
        category: 'activities',
        name: 'Mole National Park Safari',
        description: 'Spot elephants, antelopes, and monkeys on a guided safari',
        priceRange: { min: 200, max: 400, currency: 'GHS', period: 'person' },
        location: 'Mole',
        region: 'Northern',
        imageUrl: '/images/activities/mole-safari.jpg',
        rating: 4.9,
        amenities: ['Guided Safari', 'Wildlife Viewing', 'Transportation'],
        tags: ['nature', 'adventure', 'wildlife', 'safari'],
        verified: true
    }
];
