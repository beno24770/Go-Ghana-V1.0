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

export const EASTERN_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_EAS_001",
        "name": "Boti Falls",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Natural Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A seasonal waterfall with options for climbing Umbrella Rock and seeing the unique three-headed palm tree nearby.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_002",
        "name": "Umbrella Rock",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Natural Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A distinctive rock formation near Boti Falls.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_003",
        "name": "Asenema Waterfalls",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Natural Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A beautiful waterfall in the region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_004",
        "name": "Tini Waterfall",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Natural Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A waterfall cascading over a rock formation with an ancient cave.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_005",
        "name": "Atewa Range Forest Reserve",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Natural Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A nature and wildlife area.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_006",
        "name": "Aburi Botanical Gardens",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Gardens featuring native and imported plants and trees, set against the lush Akwapim hills.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_007",
        "name": "Tetteh Quashie Cocoa Farm",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "One of the first cocoa farms in Ghana, where visitors learn about cocoa cultivation.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_008",
        "name": "Akosombo Dam",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A large hydroelectric dam on the Volta River.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_009",
        "name": "Adomi Bridge",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historic bridge on the Volta River.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_010",
        "name": "Aburi Crafts Village",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A place to find and purchase local crafts.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_011",
        "name": "Anagkazo Campus",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Historical & Cultural Sites",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Scenic campus in the Akwapim Mountains with a history museum, crocodile pond, and tortoise enclosure.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_012",
        "name": "Shai Hills Resource Reserve",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Wildlife & Ecotourism",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Resource reserve offering safari experiences to see animals.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_013",
        "name": "Bunso Eco Park",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Wildlife & Ecotourism",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Nature and wildlife park with diverse flora and fauna.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_014",
        "name": "Paragliding Festival",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Adventure & Recreation",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Africa's first paragliding festival at the Odweanoma Mountains.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_015",
        "name": "ATV Aburi",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Adventure & Recreation",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Offers ATV experiences for adventure seekers.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_EAS_016",
        "name": "Lake Volta",
        "region": "Eastern",
        "location": "Eastern Region",
        "type": "Adventure & Recreation",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Large lake providing opportunities for water activities.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return EASTERN_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return EASTERN_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return EASTERN_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

