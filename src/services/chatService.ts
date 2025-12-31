import type { ChatMessage } from '../types/chat';
import { GHANA_KNOWLEDGE_BASE, FALLBACK_RESPONSE } from '../data/chatData';
import { v4 as uuidv4 } from 'uuid';
import type { BudgetContext, CategoryContext } from '../contexts/ChatContext';
import { ACCOMMODATIONS } from '../data/accommodationData';
import { RESTAURANTS } from '../data/restaurantData';
import { TRANSPORT_OPTIONS } from '../data/transportData';
import { ACTIVITIES } from '../data/activityData';

// Type for knowledge base entries
interface KnowledgeBaseEntry {
    id: string;
    keywords: string[];
    response: () => string;
}

// Type for LLM context data
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

export class ChatService {
    /**
     * LLM-FIRST ARCHITECTURE
     * The LLM is the primary brain. We inject all our data as context.
     */
    public async processMessage(content: string, budgetContext?: BudgetContext | null, categoryContext?: CategoryContext | null): Promise<ChatMessage> {
        try {
            // Build comprehensive context for the LLM
            const contextData = this.buildLLMContext(content, budgetContext, categoryContext);

            // Call LLM with full context
            const llmResponse = await import('./llmService').then(m =>
                m.llmService.generateResponse(content, contextData)
            );

            return {
                id: uuidv4(),
                role: 'assistant',
                content: llmResponse.content,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error("LLM Error:", error);

            // Fallback: Try to find relevant knowledge base entry
            const fallbackResponse = this.getFallbackResponse(content, budgetContext);

            return {
                id: uuidv4(),
                role: 'assistant',
                content: fallbackResponse,
                timestamp: Date.now()
            };
        }
    }

    /**
     * Build comprehensive context to inject into LLM
     */
    private buildLLMContext(query: string, budgetContext?: BudgetContext | null, categoryContext?: CategoryContext | null): LLMContextData {
        const context: LLMContextData = {
            userQuery: query,
            currentDate: new Date().toISOString(),
        };

        // 0. Category Context (if available) - High Priority
        if (categoryContext) {
            context.categoryFocus = {
                category: categoryContext.category,
                budgetAmount: categoryContext.amount,
                formattedBudget: categoryContext.formattedAmount,
                suggestedQuestions: categoryContext.suggestedQuestions
            };
        }

        // 1. Budget Context (if available)
        if (budgetContext) {
            const { breakdown, formData, calculations } = budgetContext;
            const travelerCounts = { solo: 1, couple: 2, family: 4, group: 4 };
            const travelerCount = travelerCounts[formData.travelerType];

            context.userBudget = {
                total: breakdown.total,
                duration: formData.duration,
                travelers: {
                    type: formData.travelerType,
                    count: travelerCount
                },
                regions: formData.regions || [],
                accommodationLevel: formData.accommodationLevel,
                intensity: formData.intensity,
                month: formData.month,
                breakdown: {
                    accommodation: breakdown.accommodation,
                    food: breakdown.food,
                    transport: breakdown.transport,
                    activities: breakdown.activities,
                    essentials: breakdown.essentials,
                    contingency: breakdown.contingency
                },
                calculations: calculations ? {
                    baseCosts: calculations.baseCosts,
                    dailyCosts: calculations.dailyCosts,
                    multipliers: calculations.multipliers,
                    interRegionTransport: calculations.interRegionTransport
                } : null,
                regionalBreakdown: breakdown.regionalBreakdown || []
            };
        }

        // 2. Relevant Knowledge Base Entries
        const relevantKnowledge = this.getRelevantKnowledge(query);
        if (relevantKnowledge.length > 0) {
            context.knowledgeBase = relevantKnowledge.map(kb => ({
                topic: kb.id,
                information: kb.response()
            }));
        }

        // 3. Structured Data (Accommodations, Restaurants, Transport, Activities)
        // Only include if query seems relevant
        const queryLower = query.toLowerCase();

        if (queryLower.match(/hotel|accommodation|stay|sleep|lodge/)) {
            context.availableAccommodations = ACCOMMODATIONS.map(a => ({
                name: a.name,
                region: a.region,
                tier: a.tier,
                pricePerNight: a.pricePerNight,
                amenities: a.amenities
            }));
        }

        if (queryLower.match(/restaurant|food|eat|dining|meal/)) {
            context.availableRestaurants = RESTAURANTS.map(r => ({
                name: r.name,
                region: r.region,
                cuisine: r.cuisine,
                priceRange: r.priceRange,
                avgCost: r.avgCostPerPerson
            }));
        }

        if (queryLower.match(/transport|travel|bus|flight|taxi|uber|tro-tro/)) {
            context.transportOptions = TRANSPORT_OPTIONS.map(t => ({
                name: t.name,
                type: t.type,
                origin: t.origin,
                destination: t.destination,
                price: t.priceRange,
                duration: t.duration
            }));
        }

        if (queryLower.match(/activity|activities|tour|festival|event|nightlife|attraction|visit|see|do/)) {
            context.activitiesAndEvents = ACTIVITIES.map(a => ({
                name: a.name,
                type: a.type,
                region: a.region,
                price: a.priceRange,
                bestTime: a.bestTime,
                highlights: a.highlights
            }));
        }

        return context;
    }

    /**
     * Get relevant knowledge base entries for context
     */
    private getRelevantKnowledge(query: string): KnowledgeBaseEntry[] {
        const queryLower = query.toLowerCase();
        const relevant: KnowledgeBaseEntry[] = [];

        // Find matching knowledge base entries
        for (const intent of GHANA_KNOWLEDGE_BASE) {
            const hasMatch = intent.keywords.some(keyword =>
                queryLower.includes(keyword.toLowerCase())
            );

            if (hasMatch && relevant.length < 3) { // Limit to top 3
                relevant.push(intent);
            }
        }

        return relevant;
    }

    /**
     * Fallback response if LLM fails
     */
    private getFallbackResponse(query: string, budgetContext?: BudgetContext | null): string {
        const queryLower = query.toLowerCase();

        // Try to find exact knowledge base match
        const matchedIntent = GHANA_KNOWLEDGE_BASE.find(intent =>
            intent.keywords.some(keyword => queryLower.includes(keyword))
        );

        if (matchedIntent) {
            return matchedIntent.response();
        }

        // Try budget-specific fallback
        if (budgetContext) {
            const budgetFallback = this.getBudgetFallback(queryLower, budgetContext);
            if (budgetFallback) {
                return budgetFallback;
            }
        }

        // Generic fallback
        return FALLBACK_RESPONSE;
    }

    /**
     * Simple budget fallback for when LLM fails
     */
    private getBudgetFallback(query: string, context: BudgetContext): string | null {
        const { breakdown, formData } = context;
        const fmt = (amount: number) => `GH₵${Math.round(amount).toLocaleString()}`;

        if (query.includes('total') || query.includes('budget')) {
            return `Your total budget is ${fmt(breakdown.total)} for ${formData.duration} days.`;
        }

        if (query.includes('accommodation')) {
            return `Your accommodation budget is ${fmt(breakdown.accommodation)} for ${formData.duration} days (${formData.accommodationLevel} level).`;
        }

        if (query.includes('food')) {
            return `Your food budget is ${fmt(breakdown.food)} for ${formData.duration} days.`;
        }

        if (query.includes('transport')) {
            return `Your transport budget is ${fmt(breakdown.transport)} for ${formData.duration} days.`;
        }

        return null;
    }

    public getInitialMessage(): ChatMessage {
        return {
            id: uuidv4(),
            role: 'assistant',
            content: "Hello there! My name is Akua Adepa, your trusted AI guide for Ghana. I'm powered by advanced AI and have access to real-time data about accommodations, restaurants, transport, and activities across Ghana. Ask me anything about planning your trip!",
            timestamp: Date.now(),
            actions: [
                { label: "Is it safe?", type: "NAVIGATE", payload: "safety" },
                { label: "Best time to visit?", type: "NAVIGATE", payload: "weather" },
                { label: "Start Budget Planner", type: "CALCULATE_BUDGET" }
            ]
        };
    }
}

export const chatService = new ChatService();
