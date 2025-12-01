import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BudgetForm } from './BudgetForm';

describe('BudgetForm', () => {
    it('renders all form fields', () => {
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        // Step 1 fields
        expect(screen.getByText(/Trip Duration/i)).toBeInTheDocument();
        expect(screen.getByText(/^Travelers$/i)).toBeInTheDocument();
        expect(screen.getByText(/Travel Month/i)).toBeInTheDocument();
    });

    it('validates duration input', async () => {
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        // Check default value - use name attribute
        const durationInput = screen.getByRole('slider', { name: /duration/i }) as HTMLInputElement;
        expect(durationInput.value).toBe('7');
    });

    it('calls onSubmit with valid data', async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();
        render(<BudgetForm onSubmit={mockSubmit} isLoading={false} />);

        // Step 1
        // Set Duration to 14
        const durationInput = screen.getByRole('slider', { name: /duration/i });
        fireEvent.change(durationInput, { target: { value: '14' } });

        // Set Travelers to 2 (Couple)
        const travelersInput = screen.getByRole('slider', { name: /travelers/i });
        fireEvent.change(travelersInput, { target: { value: '2' } });

        // Go to Step 2
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 2
        // Select Travel Style: Luxury
        const luxuryRadio = screen.getByDisplayValue('luxury');
        await user.click(luxuryRadio);

        // Go to Step 3
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 3 (New to Ghana is default checked, so we just continue)
        // Go to Step 4
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 4 (Transport default Bolt)
        // Go to Step 5
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 5 (Flights default No)
        // Go to Step 6
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 6
        // Select Interest: Adventure
        const adventureInterest = screen.getByText(/Adventure/i);
        await user.click(adventureInterest);

        const submitButton = screen.getByRole('button', { name: /See My Budget Summary/i });
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
