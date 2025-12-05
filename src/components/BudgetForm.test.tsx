import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BudgetForm } from './BudgetForm';
import * as delayModule from '../utils/delay';

// Mock the sleep function to return immediately in tests
vi.mock('../utils/delay', () => ({
    sleep: vi.fn(() => Promise.resolve())
}));

describe('BudgetForm', () => {
    it('renders all form fields', () => {
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        // Step 1 fields
        expect(screen.getByText(/Trip Dates/i)).toBeInTheDocument();
        expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
        expect(screen.getByText(/End Date/i)).toBeInTheDocument();
        expect(screen.getByText(/^Travelers$/i)).toBeInTheDocument();
        expect(screen.getByText(/Travel Month/i)).toBeInTheDocument();
    });

    it('calculates duration from dates', async () => {
        const user = userEvent.setup();
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        const startDateInput = screen.getByLabelText(/Start Date/i);
        const endDateInput = screen.getByLabelText(/End Date/i);

        // Set dates: 2024-12-01 to 2024-12-07 (7 days inclusive)
        fireEvent.change(startDateInput, { target: { value: '2024-12-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-12-07' } });

        // Check calculated duration
        // Note: The duration display might be "7 days"
        expect(screen.getByText(/7/)).toBeInTheDocument();
        expect(screen.getByText(/days/)).toBeInTheDocument();
    });

    it('allows custom daily budget input', async () => {
        const user = userEvent.setup();
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        // Go to Step 2
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Wait for Step 2 to render
        await waitFor(() => {
            expect(screen.getByText(/Choose your style/i)).toBeInTheDocument();
        });

        // Select Backpacker
        const backpackerRadio = screen.getByTestId('travel-style-backpacker');
        await user.click(backpackerRadio);

        // Check for custom budget input
        const customInput = screen.getByPlaceholderText(/e.g. 45/i);
        expect(customInput).toBeInTheDocument();

        // Enter value
        await user.type(customInput, '45');
        expect(customInput).toHaveValue(45);
    });

    it('navigates back and forth', async () => {
        const user = userEvent.setup();
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        // Step 1 -> Step 2
        await user.click(screen.getByRole('button', { name: /next/i }));
        expect(screen.getByText(/Choose your style/i)).toBeInTheDocument();

        // Step 2 -> Step 1 (Back)
        await user.click(screen.getByRole('button', { name: /back/i }));
        expect(screen.getByText(/Trip Dates/i)).toBeInTheDocument();
    });

    it('calls onSubmit with valid data', async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();
        render(<BudgetForm onSubmit={mockSubmit} isLoading={false} />);

        // Step 1
        // Set Dates
        const startDateInput = screen.getByLabelText(/Start Date/i);
        const endDateInput = screen.getByLabelText(/End Date/i);
        fireEvent.change(startDateInput, { target: { value: '2024-12-01' } });
        fireEvent.change(endDateInput, { target: { value: '2024-12-14' } }); // 14 days

        // Set Travelers to 2 (Couple)
        const travelersInput = screen.getByRole('slider', { name: /travelers/i });
        fireEvent.change(travelersInput, { target: { value: '2' } });

        // Go to Step 2
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Wait for Step 2 to render (handleNext has 300ms delay)
        await waitFor(() => {
            expect(screen.getByText(/Choose your style/i)).toBeInTheDocument();
        });

        // Step 2
        // Select Travel Style: Luxury
        const luxuryRadio = screen.getByTestId('travel-style-luxury');
        await user.click(luxuryRadio);

        // Go to Step 3
        await user.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => expect(screen.getByText(/Where in Ghana Do You Want to Explore/i)).toBeInTheDocument());

        // Step 3 (New to Ghana is default checked, so we just continue)
        // Go to Step 4
        await user.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => expect(screen.getByText(/How Will You Get Around/i)).toBeInTheDocument());

        // Step 4 (Transport default Bolt)
        // Go to Step 5
        await user.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => expect(screen.getByText(/Flying In/i)).toBeInTheDocument());

        // Step 5 (Flights default No)
        // Go to Step 6
        await user.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => expect(screen.getByText(/What Are You Into/i)).toBeInTheDocument());

        // Step 6
        // Select Interest: Adventure
        const adventureInterest = screen.getByText(/Adventure/i);
        await user.click(adventureInterest);

        // Go to Step 7 (Review)
        await user.click(screen.getByRole('button', { name: /next/i }));
        await waitFor(() => expect(screen.getByText(/Ready to See Your Budget/i)).toBeInTheDocument());

        // Step 7 - Submit
        const submitButton = screen.getByRole('button', { name: /Generate My Budget/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalled();
        });

        const args = mockSubmit.mock.calls[0][0];
        expect(args.duration).toBe(14);
        expect(args.travelerType).toBe('couple');
        expect(args.accommodationLevel).toBe('luxury');
        expect(args.activities).toContain('adventure');
    });
});
