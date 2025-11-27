
import { ACCRA_TROTRO_ROUTES } from './accraTransportData';
import type { TroTroRoute } from './accraTransportData';
import { GHANA_BUS_ROUTES } from './ghanaTransportData';
import type { BusRoute } from './ghanaTransportData';
import { GHANA_CAR_RENTALS } from './carRentalData';
import type { CarRental } from './carRentalData';

export interface TransportOption {
    id: string;
    name: string;
    type: 'Bus' | 'Flight' | 'Ride-Hailing' | 'Tro-tro' | 'Private Driver' | 'Train' | 'Car Rental';
    provider?: string; // e.g., "STC", "VIP", "Uber", "Bolt", "PassionAir"
    origin: string; // City or Region
    destination: string; // City or Region
    priceRange: {
        min: number;
        max: number;
        currency: 'GHS' | 'USD' | 'EUR';
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

// Mappers to convert detailed data to TransportOption

const mapTroTroToOption = (route: TroTroRoute): TransportOption => {
    const parts = route.routeName.split('→').map(s => s.trim());
    const origin = parts[0] || 'Accra';
    const destination = parts[1] || 'Accra';

    return {
        id: route.id,
        name: `Tro-tro: ${route.routeName}`,
        type: 'Tro-tro',
        provider: 'Private / Union',
        origin,
        destination,
        priceRange: { min: route.fareMin, max: route.fareMax, currency: 'GHS' },
        duration: 'Varies',
        frequency: 'Frequent',
        comfortLevel: 'Basic',
        bookingMethod: 'Station',
        description: route.notes,
        safetyRating: 3
    };
};

const mapBusToOption = (route: BusRoute): TransportOption => {
    let comfort: 'Basic' | 'Standard' | 'Premium' = 'Standard';
    if (route.operator.includes('Executive')) comfort = 'Premium';
    if (route.operator.includes('Metro Mass')) comfort = 'Basic';

    return {
        id: route.id,
        name: `${route.operator}: ${route.from} to ${route.to}`,
        type: 'Bus',
        provider: route.operator,
        origin: route.from,
        destination: route.to,
        priceRange: { min: route.fare, max: route.fare, currency: 'GHS' },
        duration: route.duration || 'Varies',
        frequency: 'Daily',
        comfortLevel: comfort,
        bookingMethod: 'Station',
        description: route.notes || `Bus service by ${route.operator}`,
        safetyRating: 4
    };
};

const mapCarRentalToOption = (rental: CarRental): TransportOption => {
    let comfort: 'Standard' | 'Premium' | 'Luxury' = 'Standard';
    if (rental.pricePerDay > 1000) comfort = 'Premium';
    if (rental.pricePerDay > 3000) comfort = 'Luxury';

    return {
        id: rental.id,
        name: `Rental: ${rental.vehicleName}`,
        type: 'Car Rental',
        provider: 'Rental Agency',
        origin: rental.location,
        destination: 'Any',
        priceRange: { min: rental.pricePerDay, max: rental.priceMax || rental.pricePerDay, currency: rental.currency as 'GHS' | 'USD' | 'EUR' },
        duration: 'Per Day',
        frequency: 'On Demand',
        comfortLevel: comfort,
        bookingMethod: 'Agency',
        description: `${rental.category} - ${rental.notes || ''}`,
        safetyRating: 5
    };
};

export const ALL_TRANSPORT_OPTIONS: TransportOption[] = [
    ...TRANSPORT_OPTIONS,
    ...ACCRA_TROTRO_ROUTES.map(mapTroTroToOption),
    ...GHANA_BUS_ROUTES.map(mapBusToOption),
    ...GHANA_CAR_RENTALS.map(mapCarRentalToOption)
];

// Helper functions
export const getTransportByRoute = (origin: string, destination: string): TransportOption[] => {
    return ALL_TRANSPORT_OPTIONS.filter(t =>
        (t.origin.toLowerCase().includes(origin.toLowerCase()) && t.destination.toLowerCase().includes(destination.toLowerCase())) ||
        (t.origin.toLowerCase() === 'accra' && t.destination.toLowerCase() === 'accra' && origin.toLowerCase() === 'accra')
    );
};

export * from './accraTransportData';
export * from './ghanaTransportData';
export * from './carRentalData';
