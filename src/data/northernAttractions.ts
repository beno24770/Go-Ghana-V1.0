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

export const NORTHERN_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_NOR_001",
        "name": "Mole National Park",
        "region": "Northern",
        "location": "Northern Region",
        "type": "National park",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Ghana's largest wildlife refuge, home to elephants, buffalo, antelope, and various bird species.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_002",
        "name": "Wechiau Community Hippo Sanctuary",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Wildlife sanctuary",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Community-managed sanctuary where you can see hippos.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_003",
        "name": "Mognori Eco-Village",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Eco-village / Nature tours",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Offers cultural and nature tours, including canoe safaris.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_004",
        "name": "Larabanga Mosque",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Mosque",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Ancient mosque with unique Sudano-Sahelian architecture; one of the oldest in Ghana.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_005",
        "name": "Larabanga Mystic Stone",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Cultural landmark",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Mysterious boulder with local legends, near the mosque.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_006",
        "name": "Salaga Slave Market",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Historical site",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Historical site on the slave route; leg pegs from the slave trade are still visible.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_007",
        "name": "Nalerigu Defence Wall",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Historical fortification",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Ancient defensive wall part of the slave route network.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_008",
        "name": "Zayaa Mud Mosque",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Mosque",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Significant historical mosque with unique mud architecture.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_NOR_009",
        "name": "Tamale Central Market",
        "region": "Northern",
        "location": "Northern Region",
        "type": "Market",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Bustling market to experience local life and commerce.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return NORTHERN_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return NORTHERN_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return NORTHERN_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

