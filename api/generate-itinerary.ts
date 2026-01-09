export const config = {
    runtime: 'edge',
};

interface ItineraryRequest {
    budget: Record<string, unknown>;
    formData: Record<string, unknown>;
    availableAccommodations?: unknown[];
    availableRestaurants?: unknown[];
    availableActivities?: unknown[];
}

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const { budget, formData, availableAccommodations, availableRestaurants, availableActivities } = (await req.json()) as ItineraryRequest;

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'AI service not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const itineraryPrompt = `You are an expert Ghana travel planner. Generate a detailed day-by-day itinerary based on the following information:

BUDGET BREAKDOWN:
${JSON.stringify(budget, null, 2)}

TRIP DETAILS:
${JSON.stringify(formData, null, 2)}

AVAILABLE ACCOMMODATIONS:
${JSON.stringify(availableAccommodations, null, 2)}

AVAILABLE RESTAURANTS:
${JSON.stringify(availableRestaurants, null, 2)}

AVAILABLE ACTIVITIES:
${JSON.stringify(availableActivities, null, 2)}

INSTRUCTIONS:
1. Create a day-by-day itinerary matching the trip duration
2. Select accommodations, restaurants, and activities from the provided lists that match the budget tier
3. Ensure daily costs align with the budget breakdown
4. Include morning, afternoon, and evening activities for each day
5. Add breakfast, lunch, and dinner recommendations for each day
6. Provide realistic timing and descriptions
7. Return ONLY valid JSON in the specified format

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: itineraryPrompt }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 4096,
                }
            })
        });

        if (!response.ok) {
            const errorData = (await response.json()) as any;
            throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
        }

        const responseData = (await response.json()) as any;
        const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Parse the JSON response
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const itineraryData = JSON.parse(cleanContent);

        return new Response(JSON.stringify({
            id: `itinerary-ai-${Date.now()}`,
            budget,
            formData,
            days: itineraryData.days || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            generatedBy: 'ai',
            aiModel: 'gemini-1.5-flash',
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Itinerary generation error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate itinerary' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
