import { GoogleGenerativeAI } from '@google/generative-ai';
import { BudgetFormData, BudgetBreakdown, AIItineraryResponse, TripItinerary } from '../types';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// System prompt for Adepa
const SYSTEM_PROMPT = `You are Adepa, an expert AI travel guide for Ghana with deep local knowledge.

PERSONALITY: Warm, friendly, enthusiastic. Use local expressions like "Chale", "Akwaaba".

INSTRUCTIONS:
1. Prioritize context data (budget, available places) over general knowledge.
2. Be conversational but concise.
3. Return valid JSON for itinerary generation requests.
4. Ensure all recommendations fit within the provided budget.
5. Include authentic Ghanaian experiences and hidden gems.`;

/**
 * Generate a detailed itinerary based on budget and preferences
 */
export async function generateItinerary(
    formData: BudgetFormData,
    budget: BudgetBreakdown
): Promise<AIItineraryResponse> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_PROMPT
        });

        const prompt = buildItineraryPrompt(formData, budget);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in response');
        }

        const parsedResponse: AIItineraryResponse = JSON.parse(jsonMatch[0]);
        return parsedResponse;

    } catch (error) {
        console.error('Error generating itinerary:', error);
        throw new Error('Failed to generate itinerary. Please try again.');
    }
}

/**
 * Build the itinerary generation prompt
 */
function buildItineraryPrompt(formData: BudgetFormData, budget: BudgetBreakdown): string {
    const budgetJson = JSON.stringify(budget, null, 2);
    const formDataJson = JSON.stringify(formData, null, 2);

    return `Generate a detailed day-by-day itinerary for a trip to Ghana.

BUDGET BREAKDOWN:
${budgetJson}

TRIP DETAILS:
${formDataJson}

REQUIREMENTS:
- Create ${formData.duration} days of activities
- Stay within the total budget of GH₵ ${budget.total.toLocaleString()}
- Match the accommodation level: ${formData.accommodationLevel}
- Include activities for: ${formData.activities.join(', ')}
${formData.regions ? `- Focus on regions: ${formData.regions.join(', ')}` : ''}
- Suitable for ${formData.travelerType} travelers (${formData.travelers} people)

Return ONLY valid JSON in this exact format:
{
  "days": [
    {
      "day": 1,
      "location": "Accra",
      "morning": [
        {
          "time": "08:00",
          "activity": "Activity Name",
          "description": "Brief description",
          "cost": 50,
          "duration": "2 hours"
        }
      ],
      "afternoon": [...],
      "evening": [...],
      "meals": {
        "breakfast": {
          "name": "Restaurant Name",
          "location": "Location",
          "estimatedCost": 30,
          "cuisine": "Ghanaian"
        },
        "lunch": {...},
        "dinner": {...}
      },
      "accommodation": {
        "name": "Hotel Name",
        "type": "Hotel/Hostel/etc",
        "location": "Location",
        "estimatedCost": ${budget.accommodation / formData.duration},
        "amenities": ["WiFi", "Pool", etc]
      }
    }
  ],
  "summary": {
    "totalDays": ${formData.duration},
    "regionsVisited": ["Region1", "Region2"],
    "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
    "estimatedTotalCost": ${budget.total}
  }
}`;
}

/**
 * Chat with Adepa for trip planning advice
 */
export async function chatWithAdepa(message: string, context?: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_PROMPT
        });

        const prompt = context
            ? `Context: ${context}\n\nUser: ${message}`
            : message;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error('Error chatting with Adepa:', error);
        throw new Error('Failed to get response from Adepa. Please try again.');
    }
}
