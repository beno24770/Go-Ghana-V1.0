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

export const CENTRAL_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_CEN_001",
        "name": "Cape Coast Castle",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historic castle with a powerful history related to the slave trade.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_002",
        "name": "Elmina Castle",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Another significant historic castle and a UNESCO World Heritage Site.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_003",
        "name": "Fort St Jago",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historical fort overlooking Elmina Castle.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_004",
        "name": "Assin Manso Ancestral Slave River Park",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "The site where enslaved people had their last bath before being transported.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_005",
        "name": "Assin Praso",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Another historic slave route site.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_006",
        "name": "Fort Amsterdam",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historical fort located on the coast.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_007",
        "name": "Fort William",
        "region": "Central",
        "location": "Central Region",
        "type": "Historic & Cultural",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historic fort that offers great views of the coast and the city of Cape Coast.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_008",
        "name": "Kakum National Park",
        "region": "Central",
        "location": "Central Region",
        "type": "Nature & Wildlife",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A national park famous for its canopy walkway suspended in the trees.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_009",
        "name": "International Stingless Bee Centre",
        "region": "Central",
        "location": "Central Region",
        "type": "Nature & Wildlife",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "An attraction focused on stingless bees.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_010",
        "name": "Monkey Forest Resort",
        "region": "Central",
        "location": "Central Region",
        "type": "Nature & Wildlife",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A resort with a focus on nature and wildlife.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_011",
        "name": "Winneba Beach",
        "region": "Central",
        "location": "Central Region",
        "type": "Beaches & Coastal",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A popular and delightful beach.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_012",
        "name": "Brenu Beach",
        "region": "Central",
        "location": "Central Region",
        "type": "Beaches & Coastal",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Another enjoyable beach with a tranquil atmosphere.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_013",
        "name": "Elmina Lagoon",
        "region": "Central",
        "location": "Central Region",
        "type": "Beaches & Coastal",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A marina and coastal area.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_014",
        "name": "Craft Villages",
        "region": "Central",
        "location": "Central Region",
        "type": "Other Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Such as the one in Ajumako, known for wood carving of items like royal regalia and linguist staffs.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_015",
        "name": "Ostrich Farm",
        "region": "Central",
        "location": "Central Region",
        "type": "Other Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Located at Efutu-Mampong.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_CEN_016",
        "name": "Posuban Shrines",
        "region": "Central",
        "location": "Central Region",
        "type": "Other Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A cultural and historical site.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return CENTRAL_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return CENTRAL_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return CENTRAL_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

