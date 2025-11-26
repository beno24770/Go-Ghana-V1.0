export interface CategoryInfo {
    tips: string[];
    note: string;
    highlights?: string[];
}

export const CATEGORY_INFO: Record<string, CategoryInfo> = {
    'Accommodation': {
        tips: [
            "Book at least 2 weeks in advance for December travel.",
            "Look for guesthouses in residential areas for better rates.",
            "Check if breakfast is included to save on morning food costs."
        ],
        note: "Prices vary significantly by season. December rates can double.",
        highlights: ["Hotels", "Guesthouses", "Airbnbs"]
    },
    'Food & Dining': {
        tips: [
            "Try 'Red Red' (beans and plantain) for a filling lunch.",
            "Street food is safe if it's hot and prepared in front of you.",
            "Local 'Chop Bars' offer the most authentic and affordable meals."
        ],
        note: "Western food is significantly more expensive than local dishes.",
        highlights: ["Jollof Rice", "Waakye", "Kelewele"]
    },
    'Transportation': {
        tips: [
            "Use Uber or Bolt in Accra for price transparency.",
            "STC buses are the safest option for inter-city travel.",
            "Tro-tros are cheap but can be crowded and confusing for beginners."
        ],
        note: "Traffic in Accra can be heavy. Plan for extra travel time.",
        highlights: ["Uber/Bolt", "STC Bus", "Tro-tro"]
    },
    'Activities': {
        tips: [
            "Carry cash for entry fees at smaller attractions.",
            "Hire a local guide at historical sites for a deeper experience.",
            "Some beaches charge a small entry fee for maintenance."
        ],
        note: "Entry fees for foreigners are higher than for locals.",
        highlights: ["Canopy Walk", "Castles", "Safaris"]
    },
    'Essentials (Visa, SIM, Insurance)': {
        tips: [
            "Get an MTN SIM card for the best nationwide coverage.",
            "Yellow Fever vaccination card is mandatory for entry.",
            "Carry a power bank as power cuts can happen occasionally."
        ],
        note: "Visa on arrival is generally not available. Apply in advance.",
        highlights: ["Visa", "MTN SIM", "Insurance"]
    },
    'Contingency Buffer (10%)': {
        tips: [
            "Keep this for unexpected opportunities or emergencies.",
            "Useful for tipping guides and drivers (customary in Ghana).",
            "Can cover last-minute souvenir shopping."
        ],
        note: "Better to have it and not need it, than need it and not have it.",
        highlights: ["Tips", "Souvenirs", "Emergencies"]
    }
};
