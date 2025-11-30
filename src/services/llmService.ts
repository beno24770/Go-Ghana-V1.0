// Context data structure for LLM
interface LLMContextData {
    userQuery?: string;
    currentDate?: string;
    userBudget?: Record<string, unknown>;
    knowledgeBase?: Array<{ topic: string; information: string }>;
    availableAccommodations?: unknown[];
    availableRestaurants?: unknown[];
    transportOptions?: unknown[];
    activitiesAndEvents?: unknown[];
    [key: string]: unknown;
}

interface LLMConfig {
    provider: 'openai' | 'gemini';
    apiKey: string;
    model?: string;
}

interface LLMResponse {
    content: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

class LLMService {
    private config: LLMConfig;
    private systemPrompt: string;

    constructor() {
        // Default config
        this.config = {
            provider: 'gemini',
            apiKey: 'AIzaSyAY4e3w9o5mJsmwNsojXOIzzMt9LsEZqNA',
            model: 'gemini-1.5-flash'
        };

        this.systemPrompt = `You are Adepa, an expert AI travel guide for Ghana with deep local knowledge.

PERSONALITY:
- Warm, friendly, and enthusiastic about Ghana
- Use local expressions naturally (e.g., "Chale", "Akwaaba", "Please")
- Knowledgeable but humble - admit when you don't know something
- Practical and budget-conscious
- Provide specific, actionable advice

CRITICAL INSTRUCTIONS:
1. You will receive CONTEXT DATA with each query containing:
   - User's budget details (if they've created one)
   - Knowledge base entries (factual information about Ghana)
   - Available accommodations, restaurants, transport options, and activities
   - Regional information and pricing

2. ALWAYS prioritize the context data over your general knowledge:
   - If budget data is provided, use the EXACT numbers given
   - If accommodations/restaurants are listed, recommend from that list
   - If knowledge base entries are provided, use that information as the source of truth

3. For budget questions:
   - Reference the specific calculations provided
   - Explain multipliers and regional differences
   - Break down costs clearly with the exact figures from context

4. For planning questions:
   - Use the available accommodations, restaurants, and activities from context
   - Provide specific recommendations with names and prices
   - Create detailed itineraries when asked

5. Response style:
   - Be conversational and engaging
   - Use emojis sparingly (1-2 per response)
   - Format with bullet points and clear sections
   - Keep responses concise but comprehensive (aim for 150-300 words)

6. If context data is missing or incomplete:
   - Use your general knowledge about Ghana
   - Be clear when you're using general knowledge vs. specific data
   - Suggest the user create a budget or provide more details for better recommendations

Remember: You are the PRIMARY intelligence. The context data is your source of truth. Use it wisely!`;
    }

    /**
     * Updates the configuration (e.g., if user sets key in UI)
     */
    updateConfig(config: Partial<LLMConfig>) {
        this.config = { ...this.config, ...config };
    }

    /**
     * Generates a response from the LLM
     */
    async generateResponse(
        userMessage: string,
        context: LLMContextData = {},
        // history: ChatMessage[] = [] // Unused for now
    ): Promise<LLMResponse> {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure the LLM settings.");
        }

        // Construct the full prompt with context
        const contextString = JSON.stringify(context, null, 2);
        const fullSystemPrompt = `${this.systemPrompt}\n\nCURRENT TRIP CONTEXT:\n${contextString}`;

        // Google Gemini API Endpoint
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: `${fullSystemPrompt}\n\nUSER QUERY: ${userMessage}` }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

            return {
                content: content,
                usage: {
                    promptTokens: 0, // Gemini doesn't always return token usage in this format
                    completionTokens: 0,
                    totalTokens: 0
                }
            };

        } catch (error) {
            console.error("LLM Error:", error);
            throw error;
        }
    }

    /**
     * Generate a complete trip itinerary using AI
     */
    async generateItinerary(
        context: {
            budget: unknown;
            formData: unknown;
            options: unknown;
            availableAccommodations: unknown;
            availableRestaurants: unknown;
            availableActivities: unknown;
        }
    ): Promise<unknown> {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure the LLM settings.");
        }

        const itineraryPrompt = `You are an expert Ghana travel planner. Generate a detailed day-by-day itinerary based on the following information:

BUDGET BREAKDOWN:
${JSON.stringify(context.budget, null, 2)}

TRIP DETAILS:
${JSON.stringify(context.formData, null, 2)}

AVAILABLE ACCOMMODATIONS:
${JSON.stringify(context.availableAccommodations, null, 2)}

AVAILABLE RESTAURANTS:
${JSON.stringify(context.availableRestaurants, null, 2)}

AVAILABLE ACTIVITIES:
${JSON.stringify(context.availableActivities, null, 2)}

INSTRUCTIONS:
1. Create a day-by-day itinerary matching the trip duration
2. Select accommodations, restaurants, and activities from the provided lists that match the budget tier
3. Ensure daily costs align with the budget breakdown
4. Include morning, afternoon, and evening activities for each day
5. Add breakfast, lunch, and dinner recommendations for each day
6. Provide realistic timing and descriptions
7. Return ONLY valid JSON in this exact format:

{
  "days": [
    {
      "day": 1,
      "location": "Greater Accra",
      "region": "Greater Accra",
      "dailyBudget": 350,
      "actualCost": 340,
      "morning": [
        {
          "time": "9:00 AM - 11:00 AM",
          "activity": "Visit Kwame Nkrumah Memorial Park",
          "location": "High Street, Accra",
          "cost": 10,
          "duration": "2 hours",
          "description": "Explore Ghana's independence history",
          "type": "culture"
        }
      ],
      "afternoon": [...],
      "evening": [...],
      "meals": {
        "breakfast": { "id": "rest-accra-breakfast-1", "name": "...", ... },
        "lunch": { "id": "...", ... },
        "dinner": { "id": "...", ... }
      },
      "accommodation": { "id": "acc-accra-mid-1", "name": "...", ... },
      "transport": [],
      "highlights": ["Kwame Nkrumah Memorial Park", "..."]
    }
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model}:generateContent?key=${this.config.apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: itineraryPrompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 4096,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

            // Parse the JSON response
            try {
                // Remove markdown code blocks if present
                const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const itineraryData = JSON.parse(cleanContent);

                return {
                    id: `itinerary-ai-${Date.now()}`,
                    budget: context.budget,
                    formData: context.formData,
                    days: itineraryData.days || [],
                    summary: this.calculateSummary(itineraryData.days || []),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    generatedBy: 'ai',
                    aiModel: this.config.model,
                };
            } catch (parseError) {
                console.error("Failed to parse AI response:", content);
                throw new Error("AI generated invalid itinerary format");
            }

        } catch (error) {
            console.error("AI Itinerary Generation Error:", error);
            throw error;
        }
    }

    /**
     * Calculate summary from days array
     */
    private calculateSummary(days: any[]): any {
        let totalAccommodationCost = 0;
        let totalFoodCost = 0;
        let totalTransportCost = 0;
        let totalActivitiesCost = 0;

        for (const day of days) {
            if (day.accommodation?.pricePerNight) {
                totalAccommodationCost += day.accommodation.pricePerNight;
            }
            if (day.meals) {
                totalFoodCost += (day.meals.breakfast?.averageCost || 0) +
                    (day.meals.lunch?.averageCost || 0) +
                    (day.meals.dinner?.averageCost || 0);
            }
            if (day.transport) {
                totalTransportCost += day.transport.reduce((sum: number, t: any) => sum + (t.estimatedCost || 0), 0);
            }

            const dayActivities = [...(day.morning || []), ...(day.afternoon || []), ...(day.evening || [])];
            totalActivitiesCost += dayActivities.reduce((sum: number, act: any) => sum + (act.cost || 0), 0);
        }

        const totalCost = totalAccommodationCost + totalFoodCost + totalTransportCost + totalActivitiesCost;

        return {
            totalAccommodationCost,
            totalFoodCost,
            totalTransportCost,
            totalActivitiesCost,
            totalCost,
            budgetUtilization: 0,
        };
    }
}

export const llmService = new LLMService();

/**
 * Convenience function to generate itinerary with AI
 */
export async function generateItineraryWithAI(context: any): Promise<any> {
    return await llmService.generateItinerary(context);
}
