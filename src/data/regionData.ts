export interface RegionInfo {
    tips: string[];
    note: string;
    highlights: string[];
}

export const REGION_INFO: Record<string, RegionInfo> = {
    'Greater Accra': {
        tips: [
            "Use Uber/Bolt for safe and price-transparent travel at night.",
            "Visit the Arts Centre for souvenirs but remember to bargain hard!",
            "Try local food at Osu Night Market for authentic flavors."
        ],
        note: "Accommodation here is the most expensive in the country. Budget extra for hotels.",
        highlights: ["Black Star Square", "Jamestown Lighthouse", "Makola Market"]
    },
    'Ashanti': {
        tips: [
            "Visit the Manhyia Palace early to catch the museum tour.",
            "Kejetia Market is huge - hire a local guide to navigate it easily.",
            "Try 'Fufu and Light Soup', the signature dish of the region."
        ],
        note: "Generally cheaper than Accra. Great value for cultural experiences.",
        highlights: ["Manhyia Palace", "Lake Bosomtwe", "Kejetia Market"]
    },
    'Central': {
        tips: [
            "Book your canopy walk at Kakum National Park in the morning to avoid heat.",
            "Cape Coast Castle tours are emotional; give yourself time to process.",
            "Stingless bees at the International Stingless Bee Centre are a hidden gem."
        ],
        note: "Tourist prices apply at major attractions. Student IDs can get you discounts.",
        highlights: ["Cape Coast Castle", "Kakum National Park", "Elmina Castle"]
    },
    'Western': {
        tips: [
            "Busua Beach is the best spot for surfing lessons.",
            "Visit Nzulezu Stilt Village, but be prepared for a long canoe ride.",
            "Fresh seafood is a must-try here, especially lobster."
        ],
        note: "Transport can be slower due to road conditions. Plan for longer travel times.",
        highlights: ["Busua Beach", "Nzulezu Stilt Village", "Cape Three Points"]
    },
    'Volta': {
        tips: [
            "Hiking Mount Afadja requires good shoes and water.",
            "Wli Waterfalls is refreshing - bring a swimsuit!",
            "Tafi Atome Monkey Sanctuary is great for animal lovers."
        ],
        note: "Very affordable region. Cash is king here as ATMs are fewer.",
        highlights: ["Wli Waterfalls", "Mount Afadja", "Tafi Atome Monkey Sanctuary"]
    },
    'Northern': {
        tips: [
            "Mole National Park safaris are best done at dawn or dusk.",
            "Visit the Larabanga Mosque for its unique architecture.",
            "Shea butter is high quality and cheap here - great souvenir."
        ],
        note: "Travel distances are long. Flights to Tamale save a lot of time.",
        highlights: ["Mole National Park", "Larabanga Mosque", "Tamale Market"]
    },
    'Eastern': {
        tips: [
            "Aburi Botanical Gardens is a perfect cool escape from Accra's heat.",
            "Boti Falls offers a twin waterfall and umbrella rock.",
            "Bead markets in Koforidua are colorful and vibrant."
        ],
        note: "Great for day trips from Accra. Transport is relatively cheap.",
        highlights: ["Aburi Gardens", "Boti Falls", "Koforidua Bead Market"]
    },
    'Brong Ahafo': {
        tips: [
            "Kintampo Waterfalls is a great stopover when traveling North.",
            "Boabeng-Fiema Monkey Sanctuary allows you to walk with monkeys.",
            "Try the yams here - they are famous for being the best."
        ],
        note: "A transit hub region. Accommodation is basic but very affordable.",
        highlights: ["Kintampo Waterfalls", "Boabeng-Fiema Monkey Sanctuary", "Fuller Falls"]
    },
    'Upper East': {
        tips: [
            "Paga Crocodile Pond lets you get close to friendly crocodiles.",
            "Sirigu Pottery Village is excellent for art lovers.",
            "Wear a smock (Fugu) - it's the traditional wear here."
        ],
        note: "Very hot and dry. Stay hydrated and carry sunscreen.",
        highlights: ["Paga Crocodile Pond", "Tongo Hills", "Sirigu Art Village"]
    },
    'Upper West': {
        tips: [
            "Wa Naa's Palace is a masterpiece of Sudano-Sahelian architecture.",
            "Gbelle Game Reserve is good for off-the-beaten-path wildlife.",
            "Try Tuo Zaafi, a local delicacy."
        ],
        note: "Remote and less touristy. Authentic experience but limited luxury options.",
        highlights: ["Wa Naa's Palace", "Wechiau Hippo Sanctuary", "Gbelle Game Reserve"]
    }
};
