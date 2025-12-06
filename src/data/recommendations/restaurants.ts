import type { Recommendation } from '../../types/recommendations';

/**
 * Curated restaurant and food recommendations for Ghana
 * Organized by cuisine type and price range
 */

export const FOOD_RECOMMENDATIONS: Recommendation[] = [
    // FINE DINING / LUXURY (>150 GHS per person)
    {
        id: 'food-luxury-001',
        category: 'food',
        name: 'Santoku Restaurant & Bar',
        description: 'Upscale Japanese fusion cuisine with sushi, teppanyaki, and cocktails',
        priceRange: { min: 200, max: 400, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/santoku.jpg',
        rating: 4.7,
        amenities: ['Reservations Recommended', 'Bar', 'Outdoor Seating'],
        tags: ['fine-dining', 'japanese', 'sushi', 'cocktails'],
        verified: true,
        contactInfo: {
            phone: '+233 302 782 778'
        }
    },
    {
        id: 'food-luxury-002',
        category: 'food',
        name: 'Chez Clarisse',
        description: 'Elegant French-Ivorian restaurant with refined West African flavors',
        priceRange: { min: 180, max: 350, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/chez-clarisse.jpg',
        rating: 4.8,
        amenities: ['Reservations Required', 'Wine List', 'Romantic Setting'],
        tags: ['fine-dining', 'french', 'west-african', 'romantic'],
        verified: true,
        contactInfo: {
            phone: '+233 302 776 895'
        }
    },

    // MID-RANGE (50-150 GHS per person)
    {
        id: 'food-mid-001',
        category: 'food',
        name: 'Buka Restaurant',
        description: 'Authentic Nigerian cuisine in a vibrant atmosphere',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/buka.jpg',
        rating: 4.5,
        amenities: ['Outdoor Seating', 'Takeaway', 'Live Music (weekends)'],
        tags: ['nigerian', 'west-african', 'jollof', 'suya'],
        verified: true,
        contactInfo: {
            phone: '+233 302 782 094'
        }
    },
    {
        id: 'food-mid-002',
        category: 'food',
        name: 'Azmera Restaurant',
        description: 'Traditional Ghanaian and Ethiopian dishes in a cozy setting',
        priceRange: { min: 60, max: 120, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/azmera.jpg',
        rating: 4.6,
        amenities: ['Vegetarian Options', 'Outdoor Seating', 'Takeaway'],
        tags: ['ghanaian', 'ethiopian', 'traditional', 'vegetarian-friendly'],
        verified: true,
        contactInfo: {
            phone: '+233 302 776 598'
        }
    },
    {
        id: 'food-mid-003',
        category: 'food',
        name: 'Skybar 25',
        description: 'Rooftop bar and restaurant with panoramic city views and international menu',
        priceRange: { min: 100, max: 180, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/skybar25.jpg',
        rating: 4.4,
        amenities: ['Rooftop', 'Bar', 'City Views', 'Live DJ'],
        tags: ['international', 'rooftop', 'cocktails', 'nightlife'],
        verified: true,
        contactInfo: {
            phone: '+233 302 782 925'
        }
    },
    {
        id: 'food-mid-004',
        category: 'food',
        name: 'Chez Afrique',
        description: 'Pan-African cuisine celebrating flavors from across the continent',
        priceRange: { min: 70, max: 130, currency: 'GHS', period: 'person' },
        location: 'Accra (Airport Residential)',
        region: 'Greater Accra',
        imageUrl: '/images/food/chez-afrique.jpg',
        rating: 4.5,
        amenities: ['Outdoor Seating', 'Cultural Decor', 'Takeaway'],
        tags: ['pan-african', 'traditional', 'cultural', 'authentic'],
        verified: true,
        contactInfo: {
            phone: '+233 302 776 234'
        }
    },

    // BUDGET / LOCAL SPOTS (<50 GHS per person)
    {
        id: 'food-budget-001',
        category: 'food',
        name: 'Auntie Muni\'s Waakye',
        description: 'Famous local spot for authentic waakye (rice and beans) with all the fixings',
        priceRange: { min: 15, max: 35, currency: 'GHS', period: 'person' },
        location: 'Accra (Circle)',
        region: 'Greater Accra',
        imageUrl: '/images/food/waakye.jpg',
        rating: 4.7,
        amenities: ['Takeaway', 'Quick Service', 'Local Favorite'],
        tags: ['local', 'street-food', 'waakye', 'budget'],
        verified: true
    },
    {
        id: 'food-budget-002',
        category: 'food',
        name: 'Papaye Fast Food',
        description: 'Popular local chain serving Ghanaian fast food and grills',
        priceRange: { min: 25, max: 50, currency: 'GHS', period: 'person' },
        location: 'Multiple locations',
        region: 'Greater Accra',
        imageUrl: '/images/food/papaye.jpg',
        rating: 4.3,
        amenities: ['Fast Service', 'Takeaway', 'Delivery', 'AC'],
        tags: ['fast-food', 'ghanaian', 'grills', 'budget'],
        verified: true,
        contactInfo: {
            phone: '+233 302 228 822'
        }
    },
    {
        id: 'food-budget-003',
        category: 'food',
        name: 'Osu Night Market Food Stalls',
        description: 'Street food paradise with grilled meats, kebabs, and local snacks',
        priceRange: { min: 10, max: 30, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/osu-night-market.jpg',
        rating: 4.5,
        amenities: ['Outdoor', 'Variety', 'Late Night'],
        tags: ['street-food', 'local', 'grills', 'budget', 'nightlife'],
        verified: true
    },
    {
        id: 'food-budget-004',
        category: 'food',
        name: 'Chop Bar (Various)',
        description: 'Traditional Ghanaian eatery serving home-style meals',
        priceRange: { min: 12, max: 25, currency: 'GHS', period: 'person' },
        location: 'Citywide',
        region: 'Greater Accra',
        imageUrl: '/images/food/chop-bar.jpg',
        rating: 4.4,
        amenities: ['Takeaway', 'Local Atmosphere', 'Quick Service'],
        tags: ['local', 'traditional', 'home-cooking', 'budget'],
        verified: true
    },

    // INTERNATIONAL CUISINE
    {
        id: 'food-int-001',
        category: 'food',
        name: 'Mamma Mia Pizzeria',
        description: 'Authentic Italian pizzas and pasta in a casual setting',
        priceRange: { min: 60, max: 120, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/mamma-mia.jpg',
        rating: 4.4,
        amenities: ['Outdoor Seating', 'Takeaway', 'Delivery'],
        tags: ['italian', 'pizza', 'pasta', 'casual'],
        verified: true,
        contactInfo: {
            phone: '+233 302 782 345'
        }
    },
    {
        id: 'food-int-002',
        category: 'food',
        name: 'Republic Bar & Grill',
        description: 'American-style burgers, steaks, and craft cocktails',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'person' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/food/republic.jpg',
        rating: 4.6,
        amenities: ['Bar', 'Outdoor Seating', 'Sports TV', 'Live Music'],
        tags: ['american', 'burgers', 'steaks', 'bar'],
        verified: true,
        contactInfo: {
            phone: '+233 302 782 567'
        }
    },

    // KUMASI REGION
    {
        id: 'food-kumasi-001',
        category: 'food',
        name: 'Vic Baboo\'s Cafe',
        description: 'Popular spot for Lebanese and Mediterranean cuisine',
        priceRange: { min: 70, max: 130, currency: 'GHS', period: 'person' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/food/vic-baboo.jpg',
        rating: 4.5,
        amenities: ['Outdoor Seating', 'Takeaway', 'Shisha'],
        tags: ['lebanese', 'mediterranean', 'shawarma', 'casual'],
        verified: true,
        contactInfo: {
            phone: '+233 322 028 888'
        }
    },
    {
        id: 'food-kumasi-002',
        category: 'food',
        name: 'Kumasi Fufu Spot',
        description: 'Authentic Ashanti-style fufu with various soups',
        priceRange: { min: 20, max: 45, currency: 'GHS', period: 'person' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/food/fufu-spot.jpg',
        rating: 4.6,
        amenities: ['Takeaway', 'Local Atmosphere', 'Traditional'],
        tags: ['ghanaian', 'fufu', 'traditional', 'local'],
        verified: true
    }
];
