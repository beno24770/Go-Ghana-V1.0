import { NextRequest, NextResponse } from 'next/server';

export const config = {
    runtime: 'edge',
};

interface ChatRequest {
    userMessage: string;
    context?: Record<string, unknown>;
}

export default async function handler(req: NextRequest) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405 }
        );
    }

    try {
        const { userMessage, context = {} }: ChatRequest = await req.json();

        if (!userMessage) {
            return NextResponse.json(
                { error: 'userMessage is required' },
                { status: 400 }
            );
        }

        // Get API key from environment
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not configured');
            return NextResponse.json(
                { error: 'AI service not configured' },
                { status: 500 }
            );
        }

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

        const contextString = JSON.stringify(context, null, 2);
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

        return NextResponse.json({
            content,
            usage: {
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0
            }
        });

    } catch (error) {
        console.error('Chat generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
}
