export interface TroTroTerminal {
    id: string;
    name: string;
    location: string;
    commonRoutes: string[];
    verified: boolean;
    lastUpdated: string;
}

export interface TroTroRoute {
    id: string;
    routeName: string;
    keyStops: string[];
    fareMin: number;
    fareMax: number;
    currency: string;
    notes: string;
    verified: boolean;
    lastUpdated: string;
}

export interface FarePricing {
    category: string;
    fareMin: number;
    fareMax: number;
    duration: string;
    currency: string;
}

export interface TroTroTip {
    id: string;
    tip: string;
    category: string;
}

// Major TroTro Terminals in Accra
export const ACCRA_TROTRO_TERMINALS: TroTroTerminal[] = [
    {
        id: "TRM_ACC_001",
        name: "Circle (Kwame Nkrumah Interchange)",
        location: "Central Accra",
        commonRoutes: ["Spintex", "Madina", "Achimota", "Kasoa", "Dansoman"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_002",
        name: "Kaneshie Station",
        location: "Western Accra",
        commonRoutes: ["Odorkor", "Mallam", "Kasoa", "Dansoman"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_003",
        name: "Tema Station",
        location: "Near Ministries/Accra Central",
        commonRoutes: ["Madina", "Teshie", "Nungua", "Tema", "Spintex"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_004",
        name: "37 Station",
        location: "Airport area",
        commonRoutes: ["Madina", "Adenta", "Lapaz", "Legon", "Circle"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_005",
        name: "Madina Zongo Junction",
        location: "Eastern Accra",
        commonRoutes: ["37", "Circle", "Accra Central", "Achimota"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_006",
        name: "Accra Mall (Spintex Junction)",
        location: "Tetteh Quarshie area",
        commonRoutes: ["Tema", "Ashaiman", "Nungua", "Circle"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_007",
        name: "Lapaz Station",
        location: "North Kaneshie Road",
        commonRoutes: ["Achimota", "Nima", "Circle", "Madina"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_008",
        name: "Achimota Station",
        location: "Near Achimota Market",
        commonRoutes: ["Dome", "Taifa", "Lapaz", "Circle"],
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "TRM_ACC_009",
        name: "Kasoa Station",
        location: "Central Region border",
        commonRoutes: ["Kaneshie", "Circle", "Mallam", "Weija"],
        verified: true,
        lastUpdated: "2025-11-26"
    }
];

// Popular TroTro Routes in Accra
export const ACCRA_TROTRO_ROUTES: TroTroRoute[] = [
    {
        id: "RTE_ACC_001",
        routeName: "Circle → Madina / Adenta",
        keyStops: ["Nima", "37", "Legon", "Atomic Junction", "Madina Zongo Junction", "Adenta Barrier"],
        fareMin: 10,
        fareMax: 15,
        currency: "GHS",
        notes: "Connects Central Accra with educational and residential hubs in the northeast",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_002",
        routeName: "37 Station → Spintex / Nungua / Tema Community 1",
        keyStops: ["Airport", "Accra Mall", "Batsona", "Baatsona Total", "Nungua Barrier", "Tema Motorway Roundabout"],
        fareMin: 12,
        fareMax: 18,
        currency: "GHS",
        notes: "Commuters to industrial and business zones along Spintex-Tema corridor",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_003",
        routeName: "Kaneshie → Kasoa",
        keyStops: ["First Light", "Mallam", "Weija", "SCC", "Broadcasting", "Tuba", "Kasoa Market"],
        fareMin: 10,
        fareMax: 20,
        currency: "GHS",
        notes: "Serves daily commuters between Greater Accra and Central Region",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_004",
        routeName: "Circle → Achimota → Dome → Taifa",
        keyStops: ["Lapaz", "Tesano", "Dome Market", "Taifa Junction"],
        fareMin: 8,
        fareMax: 12,
        currency: "GHS",
        notes: "Students and residents in northern Accra suburbs",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_005",
        routeName: "Tema Station → Teshie / Nungua",
        keyStops: ["La Palm", "Trade Fair", "Teshie Rasta", "Nungua Barrier"],
        fareMin: 8,
        fareMax: 14,
        currency: "GHS",
        notes: "Scenic coastal route linking central Accra with eastern coastal towns",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_006",
        routeName: "Circle → Dansoman / Odorkor / Mataheko",
        keyStops: ["Zongo Junction", "Odorkor", "Russia Road", "Dansoman Roundabout"],
        fareMin: 6,
        fareMax: 10,
        currency: "GHS",
        notes: "Affordable route serving residential and middle-income communities",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_007",
        routeName: "Achimota → Legon / Madina / Adenta",
        keyStops: ["Dome", "Haatso", "Atomic Junction", "Legon", "Madina"],
        fareMin: 6,
        fareMax: 12,
        currency: "GHS",
        notes: "Useful for students and staff of University of Ghana, GIMPA, UPSA",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_008",
        routeName: "Accra Central → East Legon / Ashaley Botwe / Haatso",
        keyStops: ["37", "Airport", "Accra Mall", "Shiashie", "East Legon", "Ashaley Botwe"],
        fareMin: 10,
        fareMax: 15,
        currency: "GHS",
        notes: "Connects city's business center to upper-middle-class residential zones",
        verified: true,
        lastUpdated: "2025-11-26"
    },
    {
        id: "RTE_ACC_009",
        routeName: "Tema → Circle / Accra Central",
        keyStops: ["Ashaiman", "Motorway", "Tetteh Quarshie", "37", "Circle"],
        fareMin: 15,
        fareMax: 25,
        currency: "GHS",
        notes: "Commuter route for Tema industrial workers heading to central Accra",
        verified: true,
        lastUpdated: "2025-11-26"
    }
];

// Average Fare Pricing by Distance
export const TROTRO_FARE_PRICING: FarePricing[] = [
    {
        category: "Short routes (within one suburb)",
        fareMin: 5,
        fareMax: 8,
        duration: "10 – 15 mins",
        currency: "GHS"
    },
    {
        category: "Medium routes (5–10 km)",
        fareMin: 8,
        fareMax: 15,
        duration: "25 – 40 mins",
        currency: "GHS"
    },
    {
        category: "Long routes (10–25 km)",
        fareMin: 15,
        fareMax: 25,
        duration: "45 – 90 mins",
        currency: "GHS"
    }
];

// Tips for Using TroTros in Accra
export const TROTRO_TIPS: TroTroTip[] = [
    {
        id: "TIP_001",
        tip: "Listen carefully to the mate's call — destinations are often shouted quickly.",
        category: "Navigation"
    },
    {
        id: "TIP_002",
        tip: "Always carry small change, preferably GH¢1 and GH¢2 notes.",
        category: "Payment"
    },
    {
        id: "TIP_003",
        tip: "Ask locals for assistance when unsure about stops or transfers.",
        category: "Navigation"
    },
    {
        id: "TIP_004",
        tip: "Board early (6–7 AM) to avoid long queues and heavy traffic.",
        category: "Timing"
    },
    {
        id: "TIP_005",
        tip: "Be cautious with valuables — keep phones and wallets secure.",
        category: "Safety"
    }
];

// Helper functions
export function getTerminalByName(name: string): TroTroTerminal | undefined {
    return ACCRA_TROTRO_TERMINALS.find(t => t.name.toLowerCase().includes(name.toLowerCase()));
}

export function getRoutesByTerminal(terminalName: string): TroTroRoute[] {
    return ACCRA_TROTRO_ROUTES.filter(r => r.routeName.toLowerCase().includes(terminalName.toLowerCase()));
}

export function searchTroTroRoutes(query: string): TroTroRoute[] {
    const lowerQuery = query.toLowerCase();
    return ACCRA_TROTRO_ROUTES.filter(r =>
        r.routeName.toLowerCase().includes(lowerQuery) ||
        r.keyStops.some(stop => stop.toLowerCase().includes(lowerQuery)) ||
        r.notes.toLowerCase().includes(lowerQuery)
    );
}

export function estimateFare(distance: 'short' | 'medium' | 'long'): FarePricing | undefined {
    if (distance === 'short') return TROTRO_FARE_PRICING[0];
    if (distance === 'medium') return TROTRO_FARE_PRICING[1];
    if (distance === 'long') return TROTRO_FARE_PRICING[2];
    return undefined;
}
