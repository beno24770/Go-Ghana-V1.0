import type { Timestamp } from 'firebase/firestore';
import type { BudgetBreakdown, BudgetFormData, Tour } from './index';
import type { ChatMessage } from './chat';
import type { SupportedCurrency } from '../services/currencyService';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string | null;
    phoneNumber?: string | null;
    photoURL: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    preferences: {
        currency: SupportedCurrency;
        notifications: boolean;
    };
}

export interface SavedTrip {
    id: string;
    userId: string;
    name: string;
    description?: string;
    formData: BudgetFormData;
    breakdown: BudgetBreakdown;
    chatHistory?: ChatMessage[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    isFavorite: boolean;
    selectedTour?: Tour;
}

export interface CreateTripData {
    name: string;
    description?: string;
    formData: BudgetFormData;
    breakdown: BudgetBreakdown;
    chatHistory?: ChatMessage[];
    selectedTour?: Tour;
}

export interface ConsultationRequest {
    id: string;
    userId: string;
    tripId?: string; // Optional link to a saved trip
    status: 'requested' | 'scheduled' | 'completed' | 'cancelled';
    budgetSummary?: BudgetBreakdown; // Snapshot of budget when requested
    formData?: BudgetFormData;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
