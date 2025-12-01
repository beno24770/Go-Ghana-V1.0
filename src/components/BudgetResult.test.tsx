import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BudgetResult } from './BudgetResult';
import { CurrencyProvider } from '../contexts/CurrencyContext';
import { ChatProvider } from '../contexts/ChatContext';

// Mock useCurrency to avoid actual context logic and ensure consistent values
vi.mock('../contexts/CurrencyContext', async () => {
    const actual = await vi.importActual('../contexts/CurrencyContext');
    return {
        ...actual,
        useCurrency: () => ({
            selectedCurrency: 'USD',
            formatCurrency: (amount: number) => `$${(amount || 0).toLocaleString()}`,
            convertAndFormat: (amount: number) => `$${(amount || 0).toLocaleString()}`,
            exchangeRates: { rates: { USD: 1, GHS: 15 } }, // Mock rates
            isLoading: false,
            error: null
        }),
        CurrencyProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
    };
});

// Mock useChat to avoid actual chat context logic
vi.mock('../contexts/ChatContext', async () => {
    const actual = await vi.importActual('../contexts/ChatContext');
    return {
        ...actual,
        useChat: () => ({
            messages: [],
            isOpen: false,
            isTyping: false,
            unreadCount: 0,
            sendMessage: vi.fn(),
            toggleChat: vi.fn(),
            handleAction: vi.fn(),
            setBudgetContext: vi.fn() // Added missing function
        }),
        ChatProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
    };
});

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({
        user: null,
        loading: false
    }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('./TourRecommendations', () => ({
    TourRecommendations: () => <div data-testid="tour-recommendations">Tour Recommendations</div>
}));

describe('BudgetResult', () => {
    const mockBreakdown = {
        accommodation: 500,
        transport: 200, // Changed from 'transportation' to 'transport'
        food: 300,
        activities: 100,
        total: 1100,
        essentials: 50,
        flights: 0,
        contingency: 50
    };

    const mockFormData = {
        duration: 7, // Changed from 'days'
        travelers: 2, // Added travelers field
        travelerType: 'couple' as const, // Changed from 'travelers'
        accommodationLevel: 'budget' as const, // Changed from 'budgetLevel' and 'accommodationType'
        activities: [],
        regions: ['Greater Accra'], // Added a region
        month: 'January',
        intensity: 'Moderate' as const // Added intensity
    };

    it('renders budget breakdown correctly', () => {
        render(
            <ChatProvider>
                <CurrencyProvider>
                    <BudgetResult breakdown={mockBreakdown} formData={mockFormData} />
                </CurrencyProvider>
            </ChatProvider>
        );

        expect(screen.getByText(/\$1,100/i)).toBeInTheDocument();
        expect(screen.getByText(/Accommodation/i)).toBeInTheDocument();
        expect(screen.getByText(/\$500/i)).toBeInTheDocument();
        expect(screen.getByText(/^Food$/i)).toBeInTheDocument();
        expect(screen.getByText(/\$300/i)).toBeInTheDocument();
    });

    it('renders nothing when breakdown is null', () => {
        const { container } = render(
            <ChatProvider>
                <CurrencyProvider>
                    <BudgetResult breakdown={null} formData={mockFormData} />
                </CurrencyProvider>
            </ChatProvider>
        );
        expect(container).toBeEmptyDOMElement();
    });
});
