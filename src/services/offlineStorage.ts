import { SavedTrip, BudgetBreakdown, BudgetFormData } from '../types';

const STORAGE_KEY = 'go_ghana_saved_trips';

export const offlineStorage = {
    saveTrip: (tripData: {
        title: string;
        budgetResult: BudgetBreakdown;
        formData: BudgetFormData;
        itinerary?: { days: any[] };
    }): SavedTrip => {
        const newTrip: SavedTrip = {
            id: crypto.randomUUID(),
            title: tripData.title,
            createdAt: new Date().toISOString(),
            budgetResult: tripData.budgetResult,
            formData: tripData.formData,
            itinerary: tripData.itinerary
        };

        const existingTrips = offlineStorage.getSavedTrips();
        const updatedTrips = [newTrip, ...existingTrips];

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
            return newTrip;
        } catch (error) {
            console.error('Failed to save trip to local storage', error);
            throw new Error('Storage full or unavailable');
        }
    },

    getSavedTrips: (): SavedTrip[] => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to retrieve trips', error);
            return [];
        }
    },

    getTripById: (id: string): SavedTrip | undefined => {
        const trips = offlineStorage.getSavedTrips();
        return trips.find(t => t.id === id);
    },

    deleteTrip: (id: string): void => {
        const trips = offlineStorage.getSavedTrips();
        const filtered = trips.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};
