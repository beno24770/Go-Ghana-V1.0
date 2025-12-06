import type { Recommendation } from '../../types/recommendations';

/**
 * Curated transport recommendations for Ghana
 * Organized by type and service level
 */

export const TRANSPORT_RECOMMENDATIONS: Recommendation[] = [
    // PRIVATE CAR + DRIVER
    {
        id: 'trans-private-001',
        category: 'transport',
        name: 'Premium SUV with Professional Driver',
        description: 'Luxury SUV (Toyota Land Cruiser or similar) with experienced, English-speaking driver',
        priceRange: { min: 600, max: 800, currency: 'GHS', period: 'day' },
        location: 'Nationwide',
        region: 'All Regions',
        imageUrl: '/images/transport/suv-driver.jpg',
        rating: 4.8,
        amenities: ['AC', 'WiFi', 'Water', 'Professional Driver', 'Fuel Included'],
        tags: ['private', 'luxury', 'driver', 'comfortable'],
        verified: true,
        contactInfo: {
            phone: '+233 244 567 890',
            email: 'bookings@ghanacarrental.com'
        }
    },
    {
        id: 'trans-private-002',
        category: 'transport',
        name: 'Standard Sedan with Driver',
        description: 'Comfortable sedan (Toyota Camry or similar) with reliable driver',
        priceRange: { min: 400, max: 550, currency: 'GHS', period: 'day' },
        location: 'Nationwide',
        region: 'All Regions',
        imageUrl: '/images/transport/sedan-driver.jpg',
        rating: 4.6,
        amenities: ['AC', 'Professional Driver', 'Fuel Included'],
        tags: ['private', 'mid-range', 'driver', 'reliable'],
        verified: true,
        contactInfo: {
            phone: '+233 244 123 456',
            email: 'info@ghanatransport.com'
        }
    },

    // CAR RENTAL (SELF-DRIVE)
    {
        id: 'trans-rental-001',
        category: 'transport',
        name: 'Self-Drive SUV Rental',
        description: 'Rent a 4x4 SUV for independent exploration (insurance included)',
        priceRange: { min: 350, max: 500, currency: 'GHS', period: 'day' },
        location: 'Accra, Kumasi',
        region: 'Greater Accra, Ashanti',
        imageUrl: '/images/transport/suv-rental.jpg',
        rating: 4.4,
        amenities: ['Insurance', 'GPS', 'AC', '24/7 Support'],
        tags: ['self-drive', 'rental', 'suv', 'independent'],
        verified: true,
        contactInfo: {
            phone: '+233 302 123 456',
            website: 'https://www.ghanacarrental.com'
        }
    },
    {
        id: 'trans-rental-002',
        category: 'transport',
        name: 'Economy Car Rental',
        description: 'Budget-friendly compact car for city driving',
        priceRange: { min: 180, max: 280, currency: 'GHS', period: 'day' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/transport/economy-rental.jpg',
        rating: 4.2,
        amenities: ['Insurance', 'AC', 'Fuel Efficient'],
        tags: ['self-drive', 'rental', 'budget', 'city'],
        verified: true,
        contactInfo: {
            phone: '+233 302 987 654',
            website: 'https://www.budgetcargh.com'
        }
    },

    // RIDE-HAILING
    {
        id: 'trans-ridehail-001',
        category: 'transport',
        name: 'Bolt / Uber (Standard)',
        description: 'On-demand rides via Bolt or Uber app - estimated daily cost for typical usage',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'day' },
        location: 'Accra, Kumasi, Takoradi',
        region: 'Greater Accra, Ashanti, Western',
        imageUrl: '/images/transport/bolt-uber.jpg',
        rating: 4.5,
        amenities: ['App-Based', 'Cashless Payment', 'AC', 'GPS Tracking'],
        tags: ['ride-hailing', 'budget', 'convenient', 'city'],
        verified: true
    },
    {
        id: 'trans-ridehail-002',
        category: 'transport',
        name: 'Yango (Budget Rides)',
        description: 'Affordable ride-hailing alternative to Bolt/Uber',
        priceRange: { min: 60, max: 120, currency: 'GHS', period: 'day' },
        location: 'Accra',
        region: 'Greater Accra',
        imageUrl: '/images/transport/yango.jpg',
        rating: 4.3,
        amenities: ['App-Based', 'Cashless Payment', 'AC'],
        tags: ['ride-hailing', 'budget', 'affordable'],
        verified: true
    },

    // PUBLIC TRANSPORT
    {
        id: 'trans-public-001',
        category: 'transport',
        name: 'VIP Bus (Intercity)',
        description: 'Comfortable AC buses for long-distance travel (e.g., Accra-Kumasi)',
        priceRange: { min: 80, max: 150, currency: 'GHS', period: 'trip' },
        location: 'Major Cities',
        region: 'All Regions',
        imageUrl: '/images/transport/vip-bus.jpg',
        rating: 4.4,
        amenities: ['AC', 'Reclining Seats', 'Entertainment', 'Restroom'],
        tags: ['public', 'intercity', 'budget', 'comfortable'],
        verified: true,
        contactInfo: {
            phone: '+233 302 221 212',
            website: 'https://www.vipjeoun.com'
        }
    },
    {
        id: 'trans-public-002',
        category: 'transport',
        name: 'STC Bus (Intercity)',
        description: 'State transport buses connecting major cities',
        priceRange: { min: 60, max: 120, currency: 'GHS', period: 'trip' },
        location: 'Major Cities',
        region: 'All Regions',
        imageUrl: '/images/transport/stc-bus.jpg',
        rating: 4.1,
        amenities: ['AC', 'Scheduled Departures', 'Affordable'],
        tags: ['public', 'intercity', 'budget', 'reliable'],
        verified: true,
        contactInfo: {
            phone: '+233 302 221 192'
        }
    },
    {
        id: 'trans-public-003',
        category: 'transport',
        name: 'Tro-Tro (Local Transport)',
        description: 'Shared minivans - the most economical way to get around (per ride)',
        priceRange: { min: 2, max: 10, currency: 'GHS', period: 'trip' },
        location: 'Citywide',
        region: 'All Regions',
        imageUrl: '/images/transport/trotro.jpg',
        rating: 3.8,
        amenities: ['Very Affordable', 'Frequent', 'Local Experience'],
        tags: ['public', 'local', 'budget', 'authentic'],
        verified: true
    },

    // DOMESTIC FLIGHTS
    {
        id: 'trans-flight-001',
        category: 'transport',
        name: 'Domestic Flight (Accra-Kumasi/Tamale)',
        description: 'Quick flights to northern regions via Africa World Airlines or PassionAir',
        priceRange: { min: 400, max: 800, currency: 'GHS', period: 'trip' },
        location: 'Accra, Kumasi, Tamale',
        region: 'Greater Accra, Ashanti, Northern',
        imageUrl: '/images/transport/domestic-flight.jpg',
        rating: 4.6,
        amenities: ['Fast', 'Comfortable', 'Luggage Included'],
        tags: ['flight', 'domestic', 'fast', 'convenient'],
        verified: true,
        bookingUrl: 'https://www.flyawa.com.gh',
        contactInfo: {
            phone: '+233 302 511 120',
            website: 'https://www.flyawa.com.gh'
        }
    },

    // SPECIALIZED TRANSPORT
    {
        id: 'trans-special-001',
        category: 'transport',
        name: 'Airport Transfer (Private)',
        description: 'Reliable airport pickup/drop-off service',
        priceRange: { min: 100, max: 200, currency: 'GHS', period: 'trip' },
        location: 'Accra Airport',
        region: 'Greater Accra',
        imageUrl: '/images/transport/airport-transfer.jpg',
        rating: 4.7,
        amenities: ['Meet & Greet', 'Luggage Assistance', 'AC', 'Professional Driver'],
        tags: ['airport', 'private', 'convenient', 'reliable'],
        verified: true,
        contactInfo: {
            phone: '+233 244 789 012',
            email: 'transfers@ghanaairport.com'
        }
    },
    {
        id: 'trans-special-002',
        category: 'transport',
        name: 'Motorcycle Taxi (Okada)',
        description: 'Quick motorbike rides for short distances (per ride)',
        priceRange: { min: 5, max: 20, currency: 'GHS', period: 'trip' },
        location: 'Major Cities',
        region: 'All Regions',
        imageUrl: '/images/transport/okada.jpg',
        rating: 3.9,
        amenities: ['Fast', 'Affordable', 'Traffic-Beating'],
        tags: ['motorcycle', 'budget', 'fast', 'short-distance'],
        verified: true
    }
];
