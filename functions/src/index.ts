import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();

// Get Gemini API key from environment
const GEMINI_API_KEY = functions.config().gemini?.apikey;

if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not configured. Set with: firebase functions:config:set gemini.apikey="YOUR_KEY"');
}

// Rate limiting helper
interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

async function checkRateLimit(userId: string, action: string, config: RateLimitConfig): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    const rateLimitRef = db.collection('rateLimits').doc(`${userId}_${action}`);
    const doc = await rateLimitRef.get();

    if (!doc.exists) {
        await rateLimitRef.set({
            requests: [now],
            lastReset: now
        });
        return true;
    }

    const data = doc.data();
    if (!data) return false;

    // Filter out old requests
    const recentRequests = (data.requests as number[]).filter((timestamp: number) => timestamp > windowStart);

    if (recentRequests.length >= config.maxRequests) {
        return false; // Rate limit exceeded
    }

    // Add new request
    recentRequests.push(now);
    await rateLimitRef.update({
        requests: recentRequests,
        lastReset: now
    });

    return true;
}

// Verify authentication
function verifyAuth(context: functions.https.CallableContext): string {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }
    return context.auth.uid;
}

// Generate chat response
export const generateChatResponse = functions.https.onCall(async (data, context) => {
    const userId = verifyAuth(context);

    // Rate limit: 50 requests per hour
    const allowed = await checkRateLimit(userId, 'chat', {
        maxRequests: 50,
        windowMs: 60 * 60 * 1000 // 1 hour
    });

    if (!allowed) {
        throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded. Please try again later.');
    }

    if (!GEMINI_API_KEY) {
        throw new functions.https.HttpsError('failed-precondition', 'AI service not configured');
    }

    const { userMessage, context: tripContext } = data;

    if (!userMessage) {
        throw new functions.https.HttpsError('invalid-argument', 'userMessage is required');
    }

    try {
        const systemPrompt = `You are Adepa, an expert AI travel guide for Ghana with deep local knowledge.

PERSONALITY:
- Warm, friendly, and enthusiastic about Ghana
- Use local expressions naturally (e.g., "Chale", "Akwaaba", "Please")
- Knowledgeable but humble - admit when you don't know something
- Practical and budget-conscious
- Provide specific, actionable advice

Response style:
- Be conversational and engaging
- Use emojis sparingly (1-2 per response)
- Format with bullet points and clear sections
- Keep responses concise but comprehensive (aim for 150-300 words)`;

        const contextString = JSON.stringify(tripContext || {}, null, 2);
        const fullPrompt = `${systemPrompt}\n\nCURRENT TRIP CONTEXT:\n${contextString}\n\nUSER QUERY: ${userMessage}`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: fullPrompt }]
                }],
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

        const responseData = await response.json();
        const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

        return {
            content,
            usage: {
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0
            }
        };
    } catch (error) {
        console.error('Chat generation error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to generate response');
    }
});

// Generate itinerary
export const generateItinerary = functions.https.onCall(async (data, context) => {
    const userId = verifyAuth(context);

    // Rate limit: 10 itineraries per day
    const allowed = await checkRateLimit(userId, 'itinerary', {
        maxRequests: 10,
        windowMs: 24 * 60 * 60 * 1000 // 24 hours
    });

    if (!allowed) {
        throw new functions.https.HttpsError('resource-exhausted', 'Daily itinerary generation limit reached. Please try again tomorrow.');
    }

    if (!GEMINI_API_KEY) {
        throw new functions.https.HttpsError('failed-precondition', 'AI service not configured');
    }

    const { budget, formData, availableAccommodations, availableRestaurants, availableActivities } = data;

    try {
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
            const errorData = await response.json();
            throw new Error(`Gemini API Error: ${errorData.error?.message || response.statusText}`);
        }

        const responseData = await response.json();
        const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Parse the JSON response
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const itineraryData = JSON.parse(cleanContent);

        return {
            id: `itinerary-ai-${Date.now()}`,
            budget,
            formData,
            days: itineraryData.days || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            generatedBy: 'ai',
            aiModel: 'gemini-1.5-flash',
        };
    } catch (error) {
        console.error('Itinerary generation error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to generate itinerary');
    }
});

// Verify recommendation
export const verifyRecommendation = functions.https.onCall(async (data, context) => {
    const userId = verifyAuth(context);

    // Rate limit: 30 verifications per hour
    const allowed = await checkRateLimit(userId, 'verify', {
        maxRequests: 30,
        windowMs: 60 * 60 * 1000 // 1 hour
    });

    if (!allowed) {
        throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded. Please try again later.');
    }

    if (!GEMINI_API_KEY) {
        throw new functions.https.HttpsError('failed-precondition', 'AI service not configured');
    }

    const { recommendation } = data;

    if (!recommendation || !recommendation.name || !recommendation.location) {
        throw new functions.https.HttpsError('invalid-argument', 'Invalid recommendation data');
    }

    try {
        const verificationPrompt = `Search the web for current information about "${recommendation.name}" in ${recommendation.location}, Ghana.

Find and return:
1. Current prices/rates (in GHS if possible)
2. Availability status
3. Recent customer reviews and ratings
4. Booking platforms/links
5. Recent images

Return ONLY valid JSON in this exact format:
{
  "currentPrice": { "min": 400, "max": 650, "currency": "GHS", "source": "Booking.com" },
  "availability": "available",
  "reviews": { "rating": 4.5, "count": 234, "source": "Google Reviews" },
  "bookingLinks": [
    { "platform": "Booking.com", "url": "https://..." }
  ],
  "images": ["url1", "url2"],
  "sources": ["source1.com"]
}

If information is not available, omit that field.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: verificationPrompt }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Verification failed: ${response.statusText}`);
        }

        const responseData = await response.json();
        const content = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const verificationData = JSON.parse(cleanContent);

        return {
            recommendation,
            currentPrice: verificationData.currentPrice,
            availability: verificationData.availability || 'unknown',
            images: verificationData.images || [],
            reviews: verificationData.reviews,
            bookingLinks: verificationData.bookingLinks || [],
            lastChecked: new Date().toISOString(),
            sources: verificationData.sources || []
        };
    } catch (error) {
        console.error('Verification error:', error);
        return {
            recommendation,
            availability: 'unknown',
            lastChecked: new Date().toISOString(),
            sources: []
        };
    }
});
