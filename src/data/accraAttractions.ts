export interface Attraction {
    id: string;
    name: string;
    region: string;
    location: string;
    type: string;
    rating: {
        overall: number;
        reviewCount: number;
    };
    description: string;
    verified: boolean;
    lastUpdated: string;
}

export const ACCRA_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_ACC_001",
        "name": "Kwame Nkrumah Memorial Park & Mausoleum",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Museum",
        "rating": {
            "overall": 4.5,
            "reviewCount": 3800
        },
        "description": "Museum in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_002",
        "name": "W.E.B Du Bois Memorial Centre for Panafrican Culture - Ghana",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Monument",
        "rating": {
            "overall": 4.3,
            "reviewCount": 2600
        },
        "description": "Monument in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_003",
        "name": "Oxford Street Mall Osu",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Shopping mall",
        "rating": {
            "overall": 4.3,
            "reviewCount": 980
        },
        "description": "Shopping mall in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_004",
        "name": "National Museum of Ghana",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Museum",
        "rating": {
            "overall": 4.1,
            "reviewCount": 1200
        },
        "description": "Museum in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_005",
        "name": "Artists Alliance Gallery",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Art",
        "rating": {
            "overall": 4.3,
            "reviewCount": 579
        },
        "description": "Art in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_006",
        "name": "La Pleasure Beach",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Tourist attraction",
        "rating": {
            "overall": 4.2,
            "reviewCount": 276
        },
        "description": "Tourist attraction in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_007",
        "name": "Bojo Beach",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Beach",
        "rating": {
            "overall": 4.2,
            "reviewCount": 983
        },
        "description": "Beach in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_008",
        "name": "Accra International Conference Centre",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Conference center",
        "rating": {
            "overall": 4.3,
            "reviewCount": 5600
        },
        "description": "Conference center in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_009",
        "name": "Jamestown Light House",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Tourist attraction",
        "rating": {
            "overall": 4.1,
            "reviewCount": 798
        },
        "description": "Tourist attraction in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_010",
        "name": "Fort James",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Fortress",
        "rating": {
            "overall": 4.1,
            "reviewCount": 623
        },
        "description": "Fortress in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_011",
        "name": "The Cathedral Church of the Most Holy Trinity",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Anglican church",
        "rating": {
            "overall": 4.5,
            "reviewCount": 238
        },
        "description": "Anglican church in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_012",
        "name": "National Theatre",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Performing arts theater",
        "rating": {
            "overall": 4.3,
            "reviewCount": 5300
        },
        "description": "Performing arts theater in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_013",
        "name": "Ussher Fort",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Museum",
        "rating": {
            "overall": 4.1,
            "reviewCount": 584
        },
        "description": "Museum in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_014",
        "name": "Accra Mall",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Shopping mall",
        "rating": {
            "overall": 4.4,
            "reviewCount": 34000
        },
        "description": "Shopping mall in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_015",
        "name": "Osu",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Neighborhood",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Neighborhood in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ACC_016",
        "name": "Independence Arch",
        "region": "Greater Accra",
        "location": "Accra",
        "type": "Tourist attraction",
        "rating": {
            "overall": 4.5,
            "reviewCount": 613
        },
        "description": "Tourist attraction in Accra.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return ACCRA_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return ACCRA_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return ACCRA_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

