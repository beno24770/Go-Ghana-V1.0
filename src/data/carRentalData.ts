export interface CarRental {
    id: string;
    category: string;
    vehicleName: string;
    seats: number;
    transmission: string;
    pricePerDay: number;
    priceMax?: number;
    currency: string;
    location: string;
    notes?: string;
    verified: boolean;
    lastUpdated: string;
}

export interface RentalTip {
    id: string;
    tip: string;
    category: string;
}

// Sedans & Small Cars
const SEDANS_SMALL_CARS: CarRental[] = [
    { id: "CAR_SED_001", category: "Sedan", vehicleName: "Toyota Corolla", seats: 5, transmission: "Automatic", pricePerDay: 750, currency: "GHS", location: "Accra", notes: "City rental, air-conditioned", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_002", category: "Sedan", vehicleName: "Hyundai Elantra", seats: 5, transmission: "Automatic", pricePerDay: 750, currency: "GHS", location: "Accra", notes: "Standard sedan", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_003", category: "Sedan", vehicleName: "Nissan Altima", seats: 5, transmission: "Automatic", pricePerDay: 650, currency: "GHS", location: "Accra", notes: "Standard sedan", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_004", category: "Sedan", vehicleName: "Toyota Corolla (2016/2017)", seats: 5, transmission: "Automatic", pricePerDay: 750, currency: "GHS", location: "Accra", notes: "Standard sedan", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_005", category: "Sedan", vehicleName: "Kia Forte", seats: 5, transmission: "Automatic", pricePerDay: 700, priceMax: 750, currency: "GHS", location: "Accra", notes: "Standard sedan", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_006", category: "Sedan", vehicleName: "Honda Accord", seats: 5, transmission: "Automatic", pricePerDay: 850, currency: "GHS", location: "Accra", notes: "Premium sedan", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SED_007", category: "Sedan", vehicleName: "Honda Civic", seats: 3, transmission: "Automatic", pricePerDay: 650, currency: "GHS", location: "Accra", notes: "Compact sedan", verified: true, lastUpdated: "2025-11-26" }
];

// Minivans & MPVs
const MINIVANS_MPVS: CarRental[] = [
    { id: "CAR_VAN_001", category: "Minivan", vehicleName: "Hyundai H1", seats: 12, transmission: "Automatic", pricePerDay: 180, currency: "USD", location: "Accra", notes: "Air-conditioned, limited luggage", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_VAN_002", category: "Minivan", vehicleName: "Toyota Hiace", seats: 14, transmission: "Automatic", pricePerDay: 1600, currency: "GHS", location: "Greater Accra", notes: "Ideal for group trips", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_VAN_003", category: "Minivan", vehicleName: "Ford Transit", seats: 11, transmission: "Automatic", pricePerDay: 1300, currency: "GHS", location: "Greater Accra", notes: "Air-conditioned", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_VAN_004", category: "Minivan", vehicleName: "Minivan (12-14 seats, AC)", seats: 14, transmission: "Automatic", pricePerDay: 1400, priceMax: 1900, currency: "GHS", location: "Outside Accra", notes: "Regional trips", verified: true, lastUpdated: "2025-11-26" }
];

// 4x4 SUVs & Premium Vehicles
const SUVS_PREMIUM: CarRental[] = [
    { id: "CAR_SUV_001", category: "4x4 SUV", vehicleName: "Mitsubishi Pajero", seats: 7, transmission: "Automatic", pricePerDay: 160, currency: "USD", location: "Accra", notes: "Off-road capable", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_002", category: "4x4 SUV", vehicleName: "Toyota Fortuner", seats: 7, transmission: "Automatic", pricePerDay: 160, currency: "USD", location: "Accra", notes: "Off-road capable", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_003", category: "SUV", vehicleName: "7-seater SUV", seats: 7, transmission: "Automatic", pricePerDay: 3700, priceMax: 4800, currency: "GHS", location: "Accra", notes: "Premium vehicle", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_004", category: "Premium SUV", vehicleName: "Toyota Land Cruiser Prado", seats: 7, transmission: "Automatic", pricePerDay: 1600, priceMax: 2000, currency: "GHS", location: "Greater Accra / Ashanti Region", notes: "Premium SUV", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_005", category: "Luxury SUV", vehicleName: "Land Cruiser V8", seats: 7, transmission: "Automatic", pricePerDay: 3300, currency: "GHS", location: "Greater Accra", notes: "Luxury SUV", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_006", category: "Premium SUV", vehicleName: "Nissan Infiniti QX80", seats: 7, transmission: "Automatic", pricePerDay: 3000, currency: "GHS", location: "Greater Accra", notes: "Premium SUV", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_007", category: "Compact SUV", vehicleName: "Toyota Rush", seats: 6, transmission: "Automatic", pricePerDay: 1300, currency: "GHS", location: "Greater Accra", notes: "Compact SUV", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_SUV_008", category: "4x4 SUV", vehicleName: "4x4 SUV with driver", seats: 7, transmission: "Automatic", pricePerDay: 95, priceMax: 120, currency: "EUR", location: "Outside Accra", notes: "Driver included for trips outside the city", verified: true, lastUpdated: "2025-11-26" }
];

// Buses & Party Vehicles
const BUSES_PARTY: CarRental[] = [
    { id: "CAR_BUS_001", category: "Bus", vehicleName: "Coaster Bus (29-seater)", seats: 29, transmission: "Automatic", pricePerDay: 1400, priceMax: 2000, currency: "GHS", location: "Accra", notes: "Large group transport", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_BUS_002", category: "Bus", vehicleName: "Coaster Bus (29-seater, AC)", seats: 29, transmission: "Automatic", pricePerDay: 2200, priceMax: 3900, currency: "GHS", location: "Outside Accra", notes: "Large group travel", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_BUS_003", category: "Bus", vehicleName: "Yutong 50-Seater Bus", seats: 50, transmission: "Automatic", pricePerDay: 6500, currency: "GHS", location: "Greater Accra", notes: "Full-sized coach", verified: true, lastUpdated: "2025-11-26" },
    { id: "CAR_BUS_004", category: "Luxury Party Vehicle", vehicleName: "Maybach Party Bus", seats: 5, transmission: "Automatic", pricePerDay: 18000, currency: "GHS", location: "Greater Accra", notes: "Luxury party vehicle", verified: true, lastUpdated: "2025-11-26" }
];

// Combine all rentals
export const GHANA_CAR_RENTALS: CarRental[] = [
    ...SEDANS_SMALL_CARS,
    ...MINIVANS_MPVS,
    ...SUVS_PREMIUM,
    ...BUSES_PARTY
];

// Rental Tips
export const CAR_RENTAL_TIPS: RentalTip[] = [
    { id: "TIP_001", tip: "Professional drivers: Most rentals include a driver, especially for trips outside Accra.", category: "Driver Services" },
    { id: "TIP_002", tip: "Chauffeur services: Available for airport transfers, custom itineraries, and full-day tours.", category: "Driver Services" },
    { id: "TIP_003", tip: "Fuel costs: Typically not included; budget separately.", category: "Costs" },
    { id: "TIP_004", tip: "Negotiable rates: Longer bookings or multiple days may allow discounts.", category: "Pricing" },
    { id: "TIP_005", tip: "Automatic transmission: Some vehicles may require an extra charge if automatic is preferred.", category: "Vehicle Features" },
    { id: "TIP_006", tip: "Driver accommodation & allowance: Budget $20/night + $5/day for overnight trips outside city.", category: "Costs" },
    { id: "TIP_007", tip: "Outside Accra: Additional charges of $20–200+ per day may apply for regional trips.", category: "Costs" }
];

// Helper functions
export function getRentalsByCategory(category: string): CarRental[] {
    return GHANA_CAR_RENTALS.filter(r => r.category.toLowerCase().includes(category.toLowerCase()));
}

export function getRentalsBySeats(minSeats: number): CarRental[] {
    return GHANA_CAR_RENTALS.filter(r => r.seats >= minSeats);
}

export function getRentalsByPriceRange(minPrice: number, maxPrice: number, currency: string = "GHS"): CarRental[] {
    return GHANA_CAR_RENTALS.filter(r =>
        r.currency === currency &&
        r.pricePerDay >= minPrice &&
        r.pricePerDay <= maxPrice
    );
}

export function searchRentals(query: string): CarRental[] {
    const lowerQuery = query.toLowerCase();
    return GHANA_CAR_RENTALS.filter(r =>
        r.vehicleName.toLowerCase().includes(lowerQuery) ||
        r.category.toLowerCase().includes(lowerQuery) ||
        (r.notes && r.notes.toLowerCase().includes(lowerQuery))
    );
}

export function getCheapestRentalByCategory(category: string): CarRental | undefined {
    const rentals = getRentalsByCategory(category);
    if (rentals.length === 0) return undefined;

    // Normalize to GHS for comparison (approximate conversion)
    const normalize = (rental: CarRental) => {
        if (rental.currency === "USD") return rental.pricePerDay * 12; // Approx USD to GHS
        if (rental.currency === "EUR") return rental.pricePerDay * 13; // Approx EUR to GHS
        return rental.pricePerDay;
    };

    return rentals.reduce((cheapest, current) =>
        normalize(current) < normalize(cheapest) ? current : cheapest
    );
}
