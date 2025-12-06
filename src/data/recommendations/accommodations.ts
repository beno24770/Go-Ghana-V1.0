import type { Recommendation } from '../../types/recommendations';

/**
 * Curated accommodation recommendations for Ghana
 * Organized by price tier and region
 */

export const ACCOMMODATION_RECOMMENDATIONS: Recommendation[] = [
    // LUXURY TIER (>800 GHS/night)
    {
        id: 'acc-luxury-001',
        category: 'accommodation',
        name: 'Kempinski Hotel Gold Coast City',
        description: '5-star luxury hotel with ocean views, infinity pool, spa, and fine dining restaurants',
        priceRange: { min: 1200, max: 2500, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/kempinski.jpg',
        rating: 4.8,
        amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach Access', 'Concierge'],
        tags: ['luxury', 'beachfront', 'business'],
        verified: true,
        bookingUrl: 'https://www.kempinski.com/en/accra',
        contactInfo: {
            phone: '+233 302 501 000',
            website: 'https://www.kempinski.com/en/accra'
        }
    },
    {
        id: 'acc-luxury-002',
        category: 'accommodation',
        name: 'Labadi Beach Hotel',
        description: 'Iconic beachfront resort with private beach, multiple pools, and world-class amenities',
        priceRange: { min: 900, max: 1800, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/labadi.jpg',
        rating: 4.6,
        amenities: ['Private Beach', 'Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Casino'],
        tags: ['luxury', 'beachfront', 'resort'],
        verified: true,
        bookingUrl: 'https://www.labadibeachhotel.com',
        contactInfo: {
            phone: '+233 302 772 501',
            website: 'https://www.labadibeachhotel.com'
        }
    },
    {
        id: 'acc-luxury-003',
        category: 'accommodation',
        name: 'Movenpick Ambassador Hotel',
        description: 'Modern luxury hotel in the heart of Accra with rooftop pool and panoramic city views',
        priceRange: { min: 850, max: 1500, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/movenpick.jpg',
        rating: 4.7,
        amenities: ['Rooftop Pool', 'Restaurant', 'WiFi', 'Gym', 'Business Center', 'Spa'],
        tags: ['luxury', 'city-center', 'business'],
        verified: true,
        bookingUrl: 'https://www.movenpick.com/en/africa/ghana/accra',
        contactInfo: {
            phone: '+233 302 763 546',
            website: 'https://www.movenpick.com'
        }
    },

    // MID-RANGE TIER (300-800 GHS/night)
    {
        id: 'acc-mid-001',
        category: 'accommodation',
        name: 'Ibis Styles Accra Airport',
        description: 'Modern 3-star hotel near airport with comfortable rooms and complimentary breakfast',
        priceRange: { min: 400, max: 650, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/ibis.jpg',
        rating: 4.3,
        amenities: ['WiFi', 'Restaurant', 'Airport Shuttle', 'Breakfast Included', 'AC'],
        tags: ['mid-range', 'airport', 'business'],
        verified: true,
        bookingUrl: 'https://all.accor.com/hotel/ibis-styles-accra',
        contactInfo: {
            phone: '+233 302 740 370',
            website: 'https://all.accor.com'
        }
    },
    {
        id: 'acc-mid-002',
        category: 'accommodation',
        name: 'Best Western Plus Atlantic Hotel',
        description: 'Comfortable hotel in Osu with pool, restaurant, and modern amenities',
        priceRange: { min: 450, max: 700, currency: 'GHS', period: 'night' },
        location: 'Accra (Osu)',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/bestwestern.jpg',
        rating: 4.2,
        amenities: ['Pool', 'WiFi', 'Restaurant', 'Gym', 'AC', 'Breakfast'],
        tags: ['mid-range', 'osu', 'nightlife'],
        verified: true,
        bookingUrl: 'https://www.bestwestern.com/ghana',
        contactInfo: {
            phone: '+233 302 773 980',
            website: 'https://www.bestwestern.com'
        }
    },
    {
        id: 'acc-mid-003',
        category: 'accommodation',
        name: 'African Regent Hotel',
        description: 'Boutique hotel in East Legon with personalized service and elegant rooms',
        priceRange: { min: 500, max: 800, currency: 'GHS', period: 'night' },
        location: 'Accra (East Legon)',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/african-regent.jpg',
        rating: 4.4,
        amenities: ['Pool', 'WiFi', 'Restaurant', 'Bar', 'AC', 'Room Service'],
        tags: ['mid-range', 'boutique', 'residential'],
        verified: true,
        contactInfo: {
            phone: '+233 302 522 222',
            website: 'https://www.africanregenthotel.com'
        }
    },

    // BUDGET TIER (<300 GHS/night)
    {
        id: 'acc-budget-001',
        category: 'accommodation',
        name: 'Paloma Hotel',
        description: 'Clean and affordable guesthouse in Airport Residential Area with basic amenities',
        priceRange: { min: 180, max: 280, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/paloma.jpg',
        rating: 4.0,
        amenities: ['WiFi', 'AC', 'Restaurant', 'Parking'],
        tags: ['budget', 'guesthouse', 'clean'],
        verified: true,
        contactInfo: {
            phone: '+233 302 776 701'
        }
    },
    {
        id: 'acc-budget-002',
        category: 'accommodation',
        name: 'Afia Beach Hotel',
        description: 'Budget-friendly beachside hotel with simple rooms and ocean views',
        priceRange: { min: 150, max: 250, currency: 'GHS', period: 'night' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/afia.jpg',
        rating: 3.8,
        amenities: ['Beach Access', 'WiFi', 'Restaurant', 'AC'],
        tags: ['budget', 'beach', 'backpacker'],
        verified: true,
        contactInfo: {
            phone: '+233 302 772 266'
        }
    },
    {
        id: 'acc-budget-003',
        category: 'accommodation',
        name: 'Accra Luxury Apartments',
        description: 'Self-catering apartments with kitchen facilities, perfect for longer stays',
        priceRange: { min: 200, max: 300, currency: 'GHS', period: 'night' },
        location: 'Accra (Cantonments)',
        region: 'Greater Accra',
        imageUrl: '/images/hotels/accra-apartments.jpg',
        rating: 4.1,
        amenities: ['Kitchen', 'WiFi', 'AC', 'Parking', 'Laundry'],
        tags: ['budget', 'apartment', 'self-catering'],
        verified: true,
        contactInfo: {
            phone: '+233 244 123 456'
        }
    },

    // KUMASI / ASHANTI REGION
    {
        id: 'acc-kumasi-001',
        category: 'accommodation',
        name: 'Golden Tulip Kumasi City',
        description: '4-star hotel in the heart of Kumasi with modern facilities and cultural charm',
        priceRange: { min: 600, max: 1000, currency: 'GHS', period: 'night' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/hotels/golden-tulip-kumasi.jpg',
        rating: 4.5,
        amenities: ['Pool', 'WiFi', 'Restaurant', 'Gym', 'Conference Rooms'],
        tags: ['mid-range', 'city-center', 'business'],
        verified: true,
        bookingUrl: 'https://www.goldentulipkumasicity.com',
        contactInfo: {
            phone: '+233 322 022 000',
            website: 'https://www.goldentulipkumasicity.com'
        }
    },
    {
        id: 'acc-kumasi-002',
        category: 'accommodation',
        name: 'Four Villages Inn',
        description: 'Charming boutique hotel with traditional Ashanti architecture and gardens',
        priceRange: { min: 350, max: 550, currency: 'GHS', period: 'night' },
        location: 'Kumasi',
        region: 'Ashanti',
        imageUrl: '/images/hotels/four-villages.jpg',
        rating: 4.3,
        amenities: ['WiFi', 'Restaurant', 'Garden', 'AC', 'Cultural Tours'],
        tags: ['mid-range', 'boutique', 'cultural'],
        verified: true,
        contactInfo: {
            phone: '+233 322 023 716'
        }
    },

    // CAPE COAST / CENTRAL REGION
    {
        id: 'acc-cape-001',
        category: 'accommodation',
        name: 'Coconut Grove Beach Resort',
        description: 'Beachfront resort near Cape Coast Castle with stunning ocean views',
        priceRange: { min: 500, max: 900, currency: 'GHS', period: 'night' },
        location: 'Cape Coast',
        region: 'Central',
        imageUrl: '/images/hotels/coconut-grove.jpg',
        rating: 4.6,
        amenities: ['Private Beach', 'Pool', 'Restaurant', 'WiFi', 'Water Sports'],
        tags: ['mid-range', 'beach', 'resort'],
        verified: true,
        bookingUrl: 'https://www.coconutgroveghana.com',
        contactInfo: {
            phone: '+233 332 132 962',
            website: 'https://www.coconutgroveghana.com'
        }
    },
    {
        id: 'acc-cape-002',
        category: 'accommodation',
        name: 'Elmina Beach Resort',
        description: 'Historic beachside hotel near Elmina Castle with cultural tours',
        priceRange: { min: 400, max: 650, currency: 'GHS', period: 'night' },
        location: 'Elmina',
        region: 'Central',
        imageUrl: '/images/hotels/elmina-beach.jpg',
        rating: 4.2,
        amenities: ['Beach Access', 'Pool', 'Restaurant', 'WiFi', 'Tours'],
        tags: ['mid-range', 'beach', 'historical'],
        verified: true,
        contactInfo: {
            phone: '+233 332 142 638'
        }
    }
];
