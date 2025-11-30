import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { BudgetForm } from './BudgetForm';

describe('BudgetForm Flight Toggle', () => {
    it('should submit successfully when flight toggle is turned on then off', async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();
        render(<BudgetForm onSubmit={mockSubmit} isLoading={false} />);

        // Helper to click Next
        const clickNext = async () => {
            const nextButton = screen.getByRole('button', { name: /Next/i });
            await user.click(nextButton);
        };

        // Step 1: Basics -> Next
        await clickNext();

        // Step 2: Style -> Next
        await clickNext();

        // Step 3: Destinations -> Next
        await clickNext();

        // Step 4: Transport -> Next
        await clickNext();

        // Step 5: Flights
        // Verify we are on Step 5
        expect(screen.getByText(/Include International Flights\?/i)).toBeInTheDocument();

        // Toggle Flights ON
        const flightToggle = screen.getByLabelText(/Include International Flights/i);
        await user.click(flightToggle);

        // Verify Flight Cost input appears
        const flightCostInput = await screen.findByLabelText(/Estimated Cost Per Person/i);
        expect(flightCostInput).toBeInTheDocument();

        // Enter a cost
        await user.type(flightCostInput, '1200');

        // Toggle Flights OFF
        await user.click(flightToggle);

        // Verify Flight Cost input disappears
        await waitFor(() => {
            expect(screen.queryByLabelText(/Estimated Cost Per Person/i)).not.toBeInTheDocument();
        });

        // Click Next to go to Step 6
        await clickNext();

        // Step 6: Interests
        // Click Submit
        const submitButton = screen.getByRole('button', { name: /See My Budget Summary/i });
        await user.click(submitButton);

        // Verify onSubmit is called
        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalled();
        });

        // Verify data
        const formData = mockSubmit.mock.calls[0][0];
        expect(formData.includeFlights).toBe(false);
        expect(formData.flightCost).toBeUndefined();
    });
});
