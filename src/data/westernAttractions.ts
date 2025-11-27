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

export const WESTERN_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_WES_001",
        "name": "Nzulezo Stilt Village",
        "region": "Western",
        "location": "Western Region",
        "type": "Cultural / Heritage village",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A unique village built entirely on stilts over Lake Tadane.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_002",
        "name": "Fort Metal Cross",
        "region": "Western",
        "location": "Western Region",
        "type": "Fort / Historical site",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Historic fort in Dixcove, linked to the transatlantic slave trade.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_003",
        "name": "Fort San Sebastian",
        "region": "Western",
        "location": "Western Region",
        "type": "Fort / Historical site",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "17th-century fort in Shama, UNESCO World Heritage Site.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_004",
        "name": "Ahanta Heritage Museum",
        "region": "Western",
        "location": "Western Region",
        "type": "Museum",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Museum showcasing the history and culture of the Ahanta people.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_005",
        "name": "Ankasa Conservation Area",
        "region": "Western",
        "location": "Western Region",
        "type": "Nature reserve",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Dense rainforest reserve with rich biodiversity, ideal for wildlife spotting and hiking.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_006",
        "name": "Bia National Park",
        "region": "Western",
        "location": "Western Region",
        "type": "National park",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Protected area with rare animals like elephants, antelope, and primates.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_007",
        "name": "Sefwi Wiawso Forest Reserve",
        "region": "Western",
        "location": "Western Region",
        "type": "Forest reserve",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Offers hiking and eco-tourism experiences.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_008",
        "name": "Cape Three Points",
        "region": "Western",
        "location": "Western Region",
        "type": "Coastal / Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Southernmost tip of Ghana with scenic coastline and lighthouse.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_009",
        "name": "Busua Beach",
        "region": "Western",
        "location": "Western Region",
        "type": "Beach",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Popular beach for surfing and relaxation.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_010",
        "name": "Axim Beach",
        "region": "Western",
        "location": "Western Region",
        "type": "Beach",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Beach near historical forts with a tranquil environment.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_011",
        "name": "Dixcove Beach",
        "region": "Western",
        "location": "Western Region",
        "type": "Beach",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Quiet beach close to Fort Metal Cross.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_012",
        "name": "Ankasa Canopy Walkway",
        "region": "Western",
        "location": "Western Region",
        "type": "Adventure / Nature",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Elevated walkway through the rainforest canopy.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_WES_013",
        "name": "Nzulezu Cultural Experience",
        "region": "Western",
        "location": "Western Region",
        "type": "Cultural / Eco-tourism",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Canoe rides, local crafts, and village interactions in the stilt village.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return WESTERN_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return WESTERN_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return WESTERN_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

