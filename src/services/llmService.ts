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
}

export const llmService = new LLMService();
