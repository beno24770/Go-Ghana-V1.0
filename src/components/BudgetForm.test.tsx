import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BudgetForm } from './BudgetForm';

describe('BudgetForm', () => {
    it('renders all form fields', () => {
        render(<BudgetForm onSubmit={vi.fn()} isLoading={false} />);

        expect(screen.getByText(/Trip Duration/i)).toBeInTheDocument();
        expect(screen.getByText(/Number of Travelers/i)).toBeInTheDocument();
        expect(screen.getByText(/Travel Month/i)).toBeInTheDocument();
        expect(screen.getByText(/Regions to Visit/i)).toBeInTheDocument();
        expect(screen.getByText(/Travel Style/i)).toBeInTheDocument();
        expect(screen.getByText(/Accommodation Type/i)).toBeInTheDocument();
        expect(screen.getByText(/Activity Intensity/i)).toBeInTheDocument();
        expect(screen.getByText(/Interests/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Calculate Budget/i })).toBeInTheDocument();
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

        // Set Duration to 14
        const durationInput = screen.getByRole('slider', { name: /duration/i });
        fireEvent.change(durationInput, { target: { value: '14' } });

        // Set Travelers to 2 (Couple)
        const travelersInput = screen.getByRole('slider', { name: /travelers/i });
        fireEvent.change(travelersInput, { target: { value: '2' } });

        // Select Travel Style: Luxury
        const luxuryRadio = screen.getByDisplayValue('luxury');
        await user.click(luxuryRadio);

        // Select Interest: Adventure
        const adventureInterest = screen.getByText(/Adventure/i);
        await user.click(adventureInterest);

        const submitButton = screen.getByRole('button', { name: /Calculate Budget/i });
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
