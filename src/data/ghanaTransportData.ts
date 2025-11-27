export interface BusRoute {
    id: string;
    operator: string;
    from: string;
    to: string;
    distance?: number;
    fare: number;
    fareType?: string;
    currency: string;
    duration?: string;
    departureTime1?: string;
    arrivalTime1?: string;
    departureTime2?: string;
    arrivalTime2?: string;
    notes?: string;
    verified: boolean;
    lastUpdated: string;
}

// VIP Buses - Executive Coaches
const VIP_EXECUTIVE_ROUTES: BusRoute[] = [
    { id: "VIP_EXE_001", operator: "VIP Executive", from: "Accra", to: "Kumasi", fare: 150, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_002", operator: "VIP Executive", from: "Accra", to: "Sunyani", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_003", operator: "VIP Executive", from: "Accra", to: "Takyiiman", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_004", operator: "VIP Executive", from: "Accra", to: "Sampa", fare: 230, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_005", operator: "VIP Executive", from: "Accra", to: "Dormaa", fare: 220, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_006", operator: "VIP Executive", from: "Accra", to: "Drobo", fare: 220, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_007", operator: "VIP Executive", from: "Accra", to: "Kintampo", fare: 220, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_008", operator: "VIP Executive", from: "Accra", to: "Nkoranza", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_009", operator: "VIP Executive", from: "Accra", to: "Juaboso", fare: 220, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_010", operator: "VIP Executive", from: "Accra", to: "Goaso", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_011", operator: "VIP Executive", from: "Accra", to: "Mim", fare: 210, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_012", operator: "VIP Executive", from: "Accra", to: "Dunkwa", fare: 180, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_013", operator: "VIP Executive", from: "Accra", to: "Asante Mampong", fare: 160, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_014", operator: "VIP Executive", from: "Accra", to: "Asante Bekwai", fare: 170, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_015", operator: "VIP Executive", from: "Accra", to: "Oboasi", fare: 175, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_016", operator: "VIP Executive", from: "Accra", to: "Tamale", fare: 360, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_017", operator: "VIP Executive", from: "Accra", to: "Yendi", fare: 380, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_018", operator: "VIP Executive", from: "Accra", to: "Bolga", fare: 410, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_019", operator: "VIP Executive", from: "Accra", to: "Navrongo", fare: 420, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_020", operator: "VIP Executive", from: "Accra", to: "Wa", fare: 390, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_021", operator: "VIP Executive", from: "Accra", to: "Bawku", fare: 430, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_022", operator: "VIP Executive", from: "Accra", to: "Atwima Abuakwa", fare: 160, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_023", operator: "VIP Executive", from: "Accra", to: "Wassa Akropong", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_024", operator: "VIP Executive", from: "Kumasi", to: "Goaso", fare: 70, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_025", operator: "VIP Executive", from: "Kumasi", to: "Sunyani", fare: 70, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_026", operator: "VIP Executive", from: "Kumasi", to: "Wa", fare: 240, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_027", operator: "VIP Executive", from: "Kumasi", to: "Tamale", fare: 210, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_028", operator: "VIP Executive", from: "Kumasi", to: "Bolga", fare: 250, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_EXE_029", operator: "VIP Executive", from: "Kumasi", to: "Bawku", fare: 270, currency: "GHS", verified: true, lastUpdated: "2025-11-26" }
];

// VIP Buses - Standard Tour
const VIP_STANDARD_ROUTES: BusRoute[] = [
    { id: "VIP_STD_001", operator: "VIP Standard", from: "Accra", to: "Kumasi", fare: 120, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_002", operator: "VIP Standard", from: "Accra", to: "Sunyani", fare: 170, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_003", operator: "VIP Standard", from: "Accra", to: "Tamale", fare: 290, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_004", operator: "VIP Standard", from: "Accra", to: "Bolga", fare: 325, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_005", operator: "VIP Standard", from: "Accra", to: "Wa", fare: 315, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_006", operator: "VIP Standard", from: "Accra", to: "Bawku", fare: 335, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_007", operator: "VIP Standard", from: "Accra", to: "Cape Coast", fare: 110, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_008", operator: "VIP Standard", from: "Accra", to: "Takoradi", fare: 115, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_009", operator: "VIP Standard", from: "Kumasi", to: "Wa", fare: 115, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_010", operator: "VIP Standard", from: "Kumasi", to: "Tamale", fare: 150, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "VIP_STD_011", operator: "VIP Standard", from: "Kumasi", to: "Bolga", fare: 200, currency: "GHS", verified: true, lastUpdated: "2025-11-26" }
];

// 2M Express (Mini Vans)
const TWO_M_EXPRESS_ROUTES: BusRoute[] = [
    { id: "2M_001", operator: "2M Express", from: "Accra", to: "Kumasi", distance: 250, fare: 110, currency: "GHS", duration: "4–5 hours", verified: true, lastUpdated: "2025-11-26" },
    { id: "2M_002", operator: "2M Express", from: "Kumasi", to: "Accra", distance: 250, fare: 110, currency: "GHS", duration: "4–5 hours", verified: true, lastUpdated: "2025-11-26" },
    { id: "2M_003", operator: "2M Express", from: "Kumasi", to: "Tamale", distance: 400, fare: 110, currency: "GHS", duration: "6–7 hours", verified: true, lastUpdated: "2025-11-26" },
    { id: "2M_004", operator: "2M Express", from: "Tamale", to: "Kumasi", distance: 400, fare: 110, currency: "GHS", duration: "6–7 hours", verified: true, lastUpdated: "2025-11-26" },
    { id: "2M_005", operator: "2M Express", from: "Accra", to: "Tamale", distance: 600, fare: 110, currency: "GHS", duration: "8–9 hours", verified: true, lastUpdated: "2025-11-26" },
    { id: "2M_006", operator: "2M Express", from: "Tamale", to: "Accra", distance: 600, fare: 110, currency: "GHS", duration: "8–9 hours", verified: true, lastUpdated: "2025-11-26" }
];

// Metro Mass (State-Owned) - Sample of major routes
const METRO_MASS_ROUTES: BusRoute[] = [
    { id: "MM_001", operator: "Metro Mass", from: "Accra", to: "Kumasi", fare: 120, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_002", operator: "Metro Mass", from: "Kumasi", to: "Accra", fare: 120, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_003", operator: "Metro Mass", from: "Accra", to: "Tamale", fare: 300, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_004", operator: "Metro Mass", from: "Tamale", to: "Accra", fare: 300, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_005", operator: "Metro Mass", from: "Accra", to: "Wenchi", fare: 150, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_006", operator: "Metro Mass", from: "Yendi", to: "Accra", fare: 315, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_007", operator: "Metro Mass", from: "Bolga", to: "Accra", fare: 340, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_008", operator: "Metro Mass", from: "Navrongo", to: "Accra", fare: 350, currency: "GHS", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_009", operator: "Metro Mass", from: "Cape Coast", to: "Accra", distance: 145, fare: 40, currency: "GHS", departureTime1: "05:30", arrivalTime1: "08:00", departureTime2: "07:30", arrivalTime2: "10:00", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_010", operator: "Metro Mass", from: "Cape Coast", to: "Kumasi", distance: 250, fare: 65, currency: "GHS", departureTime1: "04:00", arrivalTime1: "22:00", departureTime2: "06:30", arrivalTime2: "12:30", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_011", operator: "Metro Mass", from: "Kumasi", to: "Tamale", distance: 384, fare: 110, currency: "GHS", departureTime1: "09:00", arrivalTime1: "16:00", departureTime2: "09:00", arrivalTime2: "16:00", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_012", operator: "Metro Mass", from: "Sunyani", to: "Tamale", distance: 320, fare: 90, currency: "GHS", departureTime1: "05:30", arrivalTime1: "11:00", departureTime2: "12:00", arrivalTime2: "18:00", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_013", operator: "Metro Mass", from: "Ho", to: "Accra", distance: 160, fare: 40, currency: "GHS", departureTime1: "06:00", arrivalTime1: "10:30", departureTime2: "12:30", arrivalTime2: "17:00", verified: true, lastUpdated: "2025-11-26" },
    { id: "MM_014", operator: "Metro Mass", from: "Koforidua", to: "Accra", distance: 94, fare: 30, currency: "GHS", departureTime1: "05:00", arrivalTime1: "08:00", departureTime2: "12:00", arrivalTime2: "15:00", verified: true, lastUpdated: "2025-11-26" }
];

// Combine all routes
export const GHANA_BUS_ROUTES: BusRoute[] = [
    ...VIP_EXECUTIVE_ROUTES,
    ...VIP_STANDARD_ROUTES,
    ...TWO_M_EXPRESS_ROUTES,
    ...METRO_MASS_ROUTES
];

// Helper functions
export function getRoutesByOperator(operator: string): BusRoute[] {
    return GHANA_BUS_ROUTES.filter(r => r.operator.toLowerCase().includes(operator.toLowerCase()));
}

export function getRoutesByDestination(from: string, to: string): BusRoute[] {
    return GHANA_BUS_ROUTES.filter(r =>
        r.from.toLowerCase().includes(from.toLowerCase()) &&
        r.to.toLowerCase().includes(to.toLowerCase())
    );
}

export function searchBusRoutes(query: string): BusRoute[] {
    const lowerQuery = query.toLowerCase();
    return GHANA_BUS_ROUTES.filter(r =>
        r.from.toLowerCase().includes(lowerQuery) ||
        r.to.toLowerCase().includes(lowerQuery) ||
        r.operator.toLowerCase().includes(lowerQuery)
    );
}

export function getRoutesByPriceRange(minFare: number, maxFare: number): BusRoute[] {
    return GHANA_BUS_ROUTES.filter(r => r.fare >= minFare && r.fare <= maxFare);
}

export function getCheapestRoute(from: string, to: string): BusRoute | undefined {
    const routes = getRoutesByDestination(from, to);
    if (routes.length === 0) return undefined;
    return routes.reduce((cheapest, current) =>
        current.fare < cheapest.fare ? current : cheapest
    );
}
