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

export const ASHANTI_ATTRACTIONS: Attraction[] = [
    {
        "id": "ATR_ASH_001",
        "name": "Manhyia Palace",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Museum",
        "rating": {
            "overall": 4.4,
            "reviewCount": 2900
        },
        "description": "Museum in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_002",
        "name": "Armed Forces Museum",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Museum",
        "rating": {
            "overall": 4.3,
            "reviewCount": 325
        },
        "description": "Museum in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_003",
        "name": "Manhyia Palace Museum",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Palace",
        "rating": {
            "overall": 0,
            "reviewCount": 0
        },
        "description": "Palace in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_004",
        "name": "Prempeh II Jubilee Museum",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Museum",
        "rating": {
            "overall": 4.3,
            "reviewCount": 108
        },
        "description": "Museum in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_005",
        "name": "Komfo Anokye Sword Site",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Historical place",
        "rating": {
            "overall": 4.2,
            "reviewCount": 1300
        },
        "description": "Historical place in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_006",
        "name": "Lake Bosomtwe",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Lake",
        "rating": {
            "overall": 4.3,
            "reviewCount": 375
        },
        "description": "Lake in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_007",
        "name": "Bobiri Forest Reserve and Butterfly Sanctuary",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Ecological park",
        "rating": {
            "overall": 4.1,
            "reviewCount": 122
        },
        "description": "Ecological park in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_008",
        "name": "Bomfobiri Wildlife Sanctuary",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Nature preserve",
        "rating": {
            "overall": 4.2,
            "reviewCount": 65
        },
        "description": "Nature preserve in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_009",
        "name": "Bobiri Butterfly Sanctuary",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Hiking area",
        "rating": {
            "overall": 3.9,
            "reviewCount": 22
        },
        "description": "Hiking area in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_010",
        "name": "Kogyae Strict Nature Reserve",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "National park",
        "rating": {
            "overall": 4,
            "reviewCount": 91
        },
        "description": "National park in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_011",
        "name": "Owabi Wildlife Sanctuary",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Park",
        "rating": {
            "overall": 3.9,
            "reviewCount": 116
        },
        "description": "Park in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_012",
        "name": "KNUST Botanical Garden",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Botanical garden",
        "rating": {
            "overall": 4.1,
            "reviewCount": 1000
        },
        "description": "Botanical garden in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_013",
        "name": "Rattray Park",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Recreation center",
        "rating": {
            "overall": 4.1,
            "reviewCount": 1000
        },
        "description": "Recreation center in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_014",
        "name": "Ntonso Adinkra Village",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Culture",
        "rating": {
            "overall": 4.1,
            "reviewCount": 473
        },
        "description": "Culture in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_015",
        "name": "Adanwomase Kente Cloth and Tourism",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Culture",
        "rating": {
            "overall": 4.4,
            "reviewCount": 48
        },
        "description": "Culture in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_016",
        "name": "Kumasi City Mall",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Shopping mall",
        "rating": {
            "overall": 4.3,
            "reviewCount": 10000
        },
        "description": "Shopping mall in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    },
    {
        "id": "ATR_ASH_017",
        "name": "Millionaires Casino",
        "region": "Ashanti",
        "location": "Kumasi area",
        "type": "Entertainment",
        "rating": {
            "overall": 4,
            "reviewCount": 45
        },
        "description": "Entertainment in Ashanti Region.",
        "verified": true,
        "lastUpdated": "2025-11-26"
    }
];

// Helper functions
export function getAttractionsByType(type: string): Attraction[] {
    return ASHANTI_ATTRACTIONS.filter(a => a.type.toLowerCase().includes(type.toLowerCase()));
}

export function getAttractionById(id: string): Attraction | undefined {
    return ASHANTI_ATTRACTIONS.find(a => a.id === id);
}

export function searchAttractions(query: string): Attraction[] {
    const lowerQuery = query.toLowerCase();
    return ASHANTI_ATTRACTIONS.filter(a => 
        a.name.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery) ||
        a.type.toLowerCase().includes(lowerQuery)
    );
}

