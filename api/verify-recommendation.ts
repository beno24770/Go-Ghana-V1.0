export const config = {
    runtime: 'edge',
};

interface VerificationRequest {
    recommendation: {
        name: string;
        location: string;
        [key: string]: unknown;
    };
}

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const { recommendation }: VerificationRequest = await req.json();

        if (!recommendation || !recommendation.name || !recommendation.location) {
            return new Response(
                JSON.stringify({ error: 'Invalid recommendation data' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return new Response(
                JSON.stringify({ error: 'AI service not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

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

        return new Response(JSON.stringify({
            recommendation,
            currentPrice: verificationData.currentPrice,
            availability: verificationData.availability || 'unknown',
            images: verificationData.images || [],
            reviews: verificationData.reviews,
            bookingLinks: verificationData.bookingLinks || [],
            lastChecked: new Date().toISOString(),
            sources: verificationData.sources || []
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Verification error:', error);
        return new Response(JSON.stringify({
            recommendation: (req as any).recommendation || {},
            availability: 'unknown',
            lastChecked: new Date().toISOString(),
            sources: []
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
