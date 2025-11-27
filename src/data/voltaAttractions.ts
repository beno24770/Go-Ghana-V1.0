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

export const VOLTA_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_VOL_001",
        "name": "Wli Waterfalls",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Nature & Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "The highest waterfall in West Africa.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_002",
        "name": "Mount Afadjato",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Nature & Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "The highest mountain in Ghana, offering hiking opportunities.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_003",
        "name": "Tagbo Falls",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Nature & Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A waterfall known for its beautiful scenery.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_004",
        "name": "Lake Volta",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Nature & Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A large body of water offering water sports and scenic views.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_005",
        "name": "Shai Hills Resource Reserve",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Nature & Adventure",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A wildlife area with a variety of animals.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_006",
        "name": "Tafi Atome Monkey Sanctuary",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Culture & History",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A sanctuary where you can see and interact with monkeys, located within a cultural village.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_007",
        "name": "Fort Prinzenstein",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Culture & History",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historic fort from the transatlantic slave trade era in Keta.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_008",
        "name": "Atorkor Slave Market",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Culture & History",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A memorial site related to the slave trade.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_009",
        "name": "Traditional Villages",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Culture & History",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Villages such as Buipe Kente Village where you can learn about local crafts.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_010",
        "name": "Togoville",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Culture & History",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A historic town with a Catholic cathedral and voodoo shrines.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_011",
        "name": "Akosombo Dam",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Other Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A major dam on the Volta River that is a significant landmark.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_VOL_012",
        "name": "Woe Lighthouse",
        "region": "Volta",
        "location": "Volta Region",
        "type": "Other Attractions",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "A lighthouse located in Woe.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return VOLTA_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return VOLTA_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return VOLTA_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

