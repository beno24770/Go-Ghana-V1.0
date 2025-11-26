import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TourRecommendations } from '../components/TourRecommendations';

import { CurrencyProvider } from '../contexts/CurrencyContext';

describe('TourRecommendations', () => {
    it('renders recommendations based on interests', () => {
        render(
            <CurrencyProvider>
                <TourRecommendations interests={['culture']} budget={1000} />
            </CurrencyProvider>
        );

        expect(screen.getByText(/Recommended Tours For Your Budget/i)).toBeInTheDocument();
    });

    it('renders nothing when no matching tours found', () => {
        render(
            <CurrencyProvider>
                <TourRecommendations interests={[]} budget={1000} />
            </CurrencyProvider>
        );
        expect(screen.getByText(/No tours found matching your criteria/i)).toBeInTheDocument();
    });
});
