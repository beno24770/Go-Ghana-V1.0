import { chatService } from '../services/chatService';
import type { BudgetContext } from '../contexts/ChatContext';

// Mock budget context for testing
const mockBudgetContext: BudgetContext = {
    breakdown: {
        accommodation: 1232,
        food: 680,
        transport: 932,
        activities: 1320,
        essentials: 2050,
        flights: 0,
        contingency: 661,
        total: 6175
    },
    formData: {
        duration: 4,
        travelerType: 'couple',
        accommodationLevel: 'mid',
        intensity: 'Moderate',
        regions: ['Greater Accra', 'Ashanti'],
        month: 'March',
        includeFlights: false,
        activities: []
    },
    calculations: {
        baseCosts: {
            accommodation: 250,
            food: 85,
            transport: 50,
            activities: 165
        },
        dailyCosts: {
            accommodation: 350,
            food: 85,
            transport: 58,
            activities: 165
        },
        multipliers: {
            regional: 1.15,
            seasonal: 1.0
        },
        interRegionTransport: {
            moves: 1,
            costPerMove: 466,
            total: 932
        }
    }
};

// Test cases
const testCases = [
    // Generalist Layer Tests
    {
        category: 'Knowledge Base - Safety',
        query: 'Is Ghana safe?',
        expectedKeywords: ['safe', 'ghana', 'precautions']
    },
    {
        category: 'Knowledge Base - Food',
        query: 'Tell me about Jollof rice',
        expectedKeywords: ['jollof', 'rice', 'tomato']
    },
    {
        category: 'Knowledge Base - Weather',
        query: 'What is the best time to visit?',
        expectedKeywords: ['november', 'march', 'dry']
    },

    // Analyst Layer Tests (Budget Context)
    {
        category: 'Budget Context - Accommodation',
        query: 'Why is accommodation expensive?',
        expectedKeywords: ['accommodation', 'GH₵', 'mid-range'],
        requiresContext: true
    },
    {
        category: 'Budget Context - Transport',
        query: 'How was transport calculated?',
        expectedKeywords: ['transport', 'inter-region', 'moves'],
        requiresContext: true
    },
    {
        category: 'Budget Context - Daily',
        query: 'What is my daily budget?',
        expectedKeywords: ['daily', 'GH₵', 'day'],
        requiresContext: true
    },
    {
        category: 'Budget Context - Regional',
        query: 'Why is Greater Accra more expensive?',
        expectedKeywords: ['Greater Accra', 'multiplier', 'expensive'],
        requiresContext: true
    }
];

// Test runner
async function runTests() {
    console.log('🧪 Starting Adepa Intelligence Tests...\n');

    let passed = 0;
    let failed = 0;
    const results: Array<{
        category: string;
        query: string;
        passed: boolean;
        response?: string;
        missingKeywords?: string[];
        error?: string;
    }> = [];

    for (const test of testCases) {
        try {
            const context = test.requiresContext ? mockBudgetContext : undefined;
            const response = await chatService.processMessage(test.query, context);

            const content = response.content.toLowerCase();
            const hasKeywords = test.expectedKeywords.every(keyword =>
                content.includes(keyword.toLowerCase())
            );

            const result = {
                category: test.category,
                query: test.query,
                passed: hasKeywords,
                response: response.content.substring(0, 200) + '...',
                missingKeywords: test.expectedKeywords.filter(k => !content.includes(k.toLowerCase()))
            };

            results.push(result);

            if (hasKeywords) {
                passed++;
                console.log(`✅ PASS: ${test.category}`);
            } else {
                failed++;
                console.log(`❌ FAIL: ${test.category}`);
                console.log(`   Missing keywords: ${result.missingKeywords.join(', ')}`);
            }

            console.log(`   Query: "${test.query}"`);
            console.log(`   Response: ${response.content.substring(0, 100)}...\n`);

        } catch (error) {
            failed++;
            console.log(`❌ ERROR: ${test.category}`);
            console.log(`   ${error}\n`);
            results.push({
                category: test.category,
                query: test.query,
                passed: false,
                error: String(error)
            });
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Test Results: ${passed}/${testCases.length} passed`);
    console.log('='.repeat(50) + '\n');

    return { passed, failed, total: testCases.length, results };
}

// Export for use in test files
export { runTests, testCases, mockBudgetContext };
