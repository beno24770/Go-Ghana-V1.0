// Category-specific knowledge and suggested questions for Adepa

export interface CategoryKnowledge {
    suggestedQuestions: string[];
    greetingTemplate: (context: any) => string;
    knowledgePoints: string[];
}

export const CATEGORY_KNOWLEDGE: Record<string, CategoryKnowledge> = {
    accommodation: {
        suggestedQuestions: [
            "What are the best hotels in my selected regions for my budget?",
            "Is it safe to book Airbnb in Ghana?",
            "Should I book in advance or find places on arrival?",
            "What neighborhoods are best for tourists?"
        ],
        greetingTemplate: (ctx) => {
            const dailyRate = Math.round(ctx.amount / ctx.duration / ctx.travelers);
            let tier = 'budget-friendly';
            if (dailyRate > 800) tier = 'luxury';
            else if (dailyRate > 400) tier = 'comfortable mid-range';

            return `Hi! I see you're budgeting **${ctx.formattedAmount}** for accommodation over **${ctx.duration} days**${ctx.regions ? ` in **${ctx.regions.join(' and ')}**` : ''}. That's about **GH₵${dailyRate}/night** per person - perfect for ${tier} hotels! 🏨\n\nWhat would you like to know about accommodation options?`;
        },
        knowledgePoints: [
            "Hotel recommendations by budget tier",
            "Neighborhood safety and proximity to attractions",
            "Booking platforms (Booking.com, Airbnb, Jumia Travel)",
            "Seasonal pricing variations",
            "Amenities to expect at each price point"
        ]
    },

    transport: {
        suggestedQuestions: [
            "How much does a private driver cost between cities?",
            "Is Bolt/Uber safe and available?",
            "What's the best way to travel between my selected regions?",
            "Should I rent a car or hire a driver?"
        ],
        greetingTemplate: (ctx) => {
            return `Hi! I see you've allocated **${ctx.formattedAmount}** for transport${ctx.regions ? ` to visit **${ctx.regions.join(', ')}**` : ''}. With your budget, you have great options for comfortable travel! 🚗\n\nWhat transport questions can I help with?`;
        },
        knowledgePoints: [
            "Bolt/Uber pricing and availability in major cities",
            "Tro-tro routes, costs, and safety tips",
            "Private driver costs and booking recommendations",
            "Inter-city bus companies (VIP, STC)",
            "Domestic flight options (Passion Air, Africa World Airlines)"
        ]
    },

    food: {
        suggestedQuestions: [
            "Where can I find the best local food in my regions?",
            "Is street food safe to eat?",
            "What's a typical meal cost at different restaurant types?",
            "Any vegetarian-friendly options?"
        ],
        greetingTemplate: (ctx) => {
            const dailyFood = Math.round(ctx.amount / ctx.duration / ctx.travelers);
            let style = 'authentic street food and local chop bars';
            if (dailyFood > 200) style = 'fine dining and upscale restaurants';
            else if (dailyFood > 100) style = 'comfortable local restaurants and chop bars';

            return `Hi! Your food budget of **${ctx.formattedAmount}** (about **GH₵${dailyFood}/day** per person) is perfect for enjoying ${style}! 🍽️\n\nWhat would you like to know about dining in Ghana?`;
        },
        knowledgePoints: [
            "Restaurant recommendations by budget tier",
            "Must-try Ghanaian dishes and where to find them",
            "Street food safety tips and best vendors",
            "Chop bar etiquette and typical costs",
            "Dietary accommodations (vegetarian, vegan, halal)"
        ]
    },

    activities: {
        suggestedQuestions: [
            "What are must-see attractions in my selected regions?",
            "How much do popular attractions cost?",
            "Do I need a guide or can I explore independently?",
            "What are some hidden gems locals recommend?"
        ],
        greetingTemplate: (ctx) => {
            return `Hi! With **${ctx.formattedAmount}** budgeted for activities${ctx.regions ? ` in **${ctx.regions.join(' and ')}**` : ''}, you'll have amazing experiences! 🎭\n\nWhat activities are you most interested in?`;
        },
        knowledgePoints: [
            "Entrance fees and opening hours for major attractions",
            "Best time to visit popular sites",
            "Guided tour vs. self-guided recommendations",
            "Hidden gems and local favorites by region",
            "Activity booking platforms and tour operators"
        ]
    },

    essentials: {
        suggestedQuestions: [
            "What's included in essentials?",
            "Do I need travel insurance?",
            "How much is a visa for my nationality?",
            "What about SIM cards and mobile data?"
        ],
        greetingTemplate: (ctx) => {
            return `Hi! Your essentials budget of **${ctx.formattedAmount}** covers important items like visa, insurance, SIM cards, and airport transfers. 🛡️\n\nWhat would you like to know about trip essentials?`;
        },
        knowledgePoints: [
            "Visa requirements and costs by nationality",
            "Travel insurance recommendations and costs",
            "Local SIM cards (MTN, Vodafone, AirtelTigo) and data plans",
            "Airport transfer options and costs",
            "Tipping customs and amounts"
        ]
    },

    flights: {
        suggestedQuestions: [
            "When's the best time to book flights?",
            "Which airlines fly to Ghana?",
            "Should I book direct or with layovers?",
            "What about baggage allowance for souvenirs?"
        ],
        greetingTemplate: (ctx) => {
            return `Hi! I see you've budgeted **${ctx.formattedAmount}** for flights. Let me help you find the best options! ✈️\n\nWhat would you like to know about flights to Ghana?`;
        },
        knowledgePoints: [
            "Major airlines flying to Accra (KLM, British Airways, Delta, etc.)",
            "Best booking times (2-3 months in advance)",
            "Direct vs. layover cost comparisons",
            "Baggage allowance and excess fees",
            "Seasonal price variations"
        ]
    }
};

// Fallback responses for out-of-scope questions
export const FALLBACK_RESPONSES = {
    medical: "I'm a travel planning assistant, not a medical professional. For health concerns, please consult your doctor or visit a clinic. I can help you find:\n• Travel insurance options\n• Recommended clinics in Ghana\n• General health tips for travelers\n\nWould you like information about any of these?",

    political: "I focus on helping you plan an amazing trip to Ghana! While I don't provide political analysis, I can tell you that Ghana is one of the safest and most stable countries in West Africa for travelers. 🇬🇭\n\nWhat I CAN help with:\n• Safe neighborhoods and areas\n• Travel safety tips\n• Cultural etiquette\n• Budget planning\n\nWhat would you like to know?",

    legal: "I can't provide legal advice, but I can help with travel-related questions like visa requirements, customs regulations, and general travel guidelines.\n\nFor legal matters, please consult:\n• Your country's embassy in Ghana\n• A qualified legal professional\n\nHow else can I help with your trip planning?",

    booking: "I can't make bookings directly, but I can definitely help you find the perfect options!\n\nI recommend these platforms:\n• Booking.com - International hotels\n• Airbnb - Unique local stays\n• Jumia Travel - Popular Ghanaian platform\n• Klook - Activities and tours\n\nWould you like specific recommendations I can share?",

    general: "I don't have specific verified information about that in my knowledge base, but let me see if I can help with general guidance or point you to the right resources.\n\nWhat I specialize in:\n• Ghana travel planning\n• Budget optimization\n• Accommodation, transport, food recommendations\n• Cultural tips and safety advice\n\nWould you like help with any of these areas?"
};

// Helper to determine if question is out of scope
export const isOutOfScope = (question: string): string | null => {
    const lowerQ = question.toLowerCase();

    if (lowerQ.match(/\b(sick|ill|disease|rash|fever|medicine|doctor|prescription)\b/)) {
        return 'medical';
    }
    if (lowerQ.match(/\b(politic|government|election|president|corruption)\b/)) {
        return 'political';
    }
    if (lowerQ.match(/\b(legal|law|lawyer|attorney|sue|contract)\b/)) {
        return 'legal';
    }
    if (lowerQ.match(/\b(book|reserve|purchase|buy) (for me|now|this)\b/)) {
        return 'booking';
    }

    return null;
};
