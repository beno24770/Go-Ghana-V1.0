// LLM Service with Vercel Edge Functions Backend
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
    private useBackend: boolean;

    constructor() {
        // Use backend API routes (Vercel Edge Functions)
        this.useBackend = true;

        // Fallback config for direct API calls (development only)
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        this.config = {
            provider: 'gemini',
            apiKey: apiKey || '',
            model: 'gemini-1.5-flash'
        };
    }

    /**
     * Updates the configuration
     */
    updateConfig(config: Partial<LLMConfig>) {
        this.config = { ...this.config, ...config };
    }

    /**
     * Generates a response from the LLM using Vercel Edge Functions
     */
    async generateResponse(
        userMessage: string,
        context: LLMContextData = {},
    ): Promise<LLMResponse> {
        if (this.useBackend) {
            try {
                const response = await fetch('/api/generate-chat-response', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userMessage,
                        context
                    })
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                }

                return await response.json();
            } catch (error: unknown) {
                console.error("Backend chat error:", error);
                throw new Error('Failed to generate response. Please try again.');
            }
        }

        // Fallback to direct API call (not recommended for production)
        return this.generateResponseDirect(userMessage, context);
    }

    /**
     * Direct API call (fallback, not recommended for production)
     */
    private async generateResponseDirect(
        userMessage: string,
        context: LLMContextData = {},
    ): Promise<LLMResponse> {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure the LLM settings.");
        }

        const systemPrompt = `You are Adepa, an expert AI travel guide for Ghana with deep local knowledge.`;
        const contextString = JSON.stringify(context, null, 2);
        const fullSystemPrompt = `${systemPrompt}\n\nCURRENT TRIP CONTEXT:\n${contextString}`;

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
                    promptTokens: 0,
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
     * Generate a complete trip itinerary using Vercel Edge Functions
     */
    async generateItinerary(
        context: Record<string, unknown>
    ): Promise<Record<string, unknown>> {
        if (this.useBackend) {
            try {
                const response = await fetch('/api/generate-itinerary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(context)
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                }

                return await response.json();
            } catch (error: unknown) {
                console.error("Backend itinerary error:", error);
                throw new Error('Failed to generate itinerary. Please try again.');
            }
        }

        throw new Error('Itinerary generation requires backend functions');
    }
}

export const llmService = new LLMService();

/**
 * Convenience function to generate itinerary with AI
 */
export async function generateItineraryWithAI(context: Record<string, unknown>): Promise<Record<string, unknown>> {
    return await llmService.generateItinerary(context);
}

import type { Recommendation, VerificationResult } from '../types/recommendations';

/**
 * Verify a recommendation using Vercel Edge Functions
 */
export async function verifyRecommendation(recommendation: Recommendation): Promise<VerificationResult> {
    try {
        const response = await fetch('/api/verify-recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recommendation })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: unknown) {
        console.error("Verification error:", error);

        // Return minimal data on error
        return {
            recommendation,
            availability: 'unknown',
            lastChecked: new Date(),
            sources: []
        };
    }
}
