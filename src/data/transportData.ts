
export interface TransportOption {
    id: string;
    name: string;
    type: 'Bus' | 'Flight' | 'Ride-Hailing' | 'Tro-tro' | 'Private Driver' | 'Train';
    provider?: string; // e.g., "STC", "VIP", "Uber", "Bolt", "PassionAir"
    origin: string; // City or Region
    destination: string; // City or Region
    priceRange: {
        min: number;
        max: number;
        currency: 'GHS' | 'USD';
    };
    duration: string; // e.g., "4 hours", "45 mins"
    frequency?: string; // e.g., "Daily", "Hourly", "On Demand"
    comfortLevel: 'Basic' | 'Standard' | 'Premium' | 'Luxury';
    bookingMethod?: string; // e.g., "Station", "App", "Phone"
    description: string;
    safetyRating?: number; // 1-5
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
    {
        id: 'stc-accra-kumasi',
        name: 'STC Intercity Bus (Accra to Kumasi)',
        type: 'Bus',
        provider: 'STC',
        origin: 'Accra',
        destination: 'Kumasi',
        priceRange: { min: 110, max: 150, currency: 'GHS' },
        duration: '4-5 hours',
        frequency: 'Daily (Multiple departures)',
        comfortLevel: 'Standard',
        bookingMethod: 'Station or Online',
        description: 'Reliable and safe government-run bus service. Air-conditioned and comfortable.',
        safetyRating: 5
    },
    {
        id: 'vip-accra-tamale',
        name: 'VIP Bus (Accra to Tamale)',
        type: 'Bus',
        provider: 'VIP Jeoun',
        origin: 'Accra',
        destination: 'Tamale',
        priceRange: { min: 350, max: 450, currency: 'GHS' },
        duration: '10-12 hours',
        frequency: 'Daily (Evening departures)',
        comfortLevel: 'Standard',
        bookingMethod: 'Station (Circle)',
        description: 'Popular private bus service for long-distance travel. Good legroom and AC.',
        safetyRating: 4
    },
    {
        id: 'flight-accra-kumasi',
        name: 'Flight (Accra to Kumasi)',
        type: 'Flight',
        provider: 'PassionAir / AWA',
        origin: 'Accra',
        destination: 'Kumasi',
        priceRange: { min: 1200, max: 2500, currency: 'GHS' },
        duration: '45 mins',
        frequency: 'Daily (Multiple flights)',
        comfortLevel: 'Premium',
        bookingMethod: 'Online',
        description: 'Fastest way to travel between major cities. Saves significant time.',
        safetyRating: 5
    },
    {
        id: 'uber-accra-city',
        name: 'Uber/Bolt (Accra City Ride)',
        type: 'Ride-Hailing',
        provider: 'Uber / Bolt',
        origin: 'Accra',
        destination: 'Accra',
        priceRange: { min: 30, max: 100, currency: 'GHS' },
        duration: 'Varies',
        frequency: 'On Demand',
        comfortLevel: 'Standard',
        bookingMethod: 'App',
        description: 'Convenient for getting around Accra. Price depends on distance and surge.',
        safetyRating: 4
    },
    {
        id: 'trotro-circle-osu',
        name: 'Tro-tro (Circle to Osu)',
        type: 'Tro-tro',
        origin: 'Circle',
        destination: 'Osu',
        priceRange: { min: 5, max: 10, currency: 'GHS' },
        duration: '20-40 mins',
        frequency: 'Frequent',
        comfortLevel: 'Basic',
        bookingMethod: 'Station',
        description: 'Cheapest way to travel. Crowded minibuses, authentic local experience.',
        safetyRating: 3
    }
];

// Helper functions
export const getTransportByRoute = (origin: string, destination: string): TransportOption[] => {
    return TRANSPORT_OPTIONS.filter(t =>
        (t.origin.toLowerCase() === origin.toLowerCase() && t.destination.toLowerCase() === destination.toLowerCase()) ||
        (t.origin.toLowerCase() === 'accra' && t.destination.toLowerCase() === 'accra') // Include city rides if generic
    );
};
