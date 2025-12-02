import AsyncStorage from '@react-native-async-storage/async-storage';
import { TripItinerary, SavedTrip } from '../types';

const STORAGE_KEYS = {
    TRIPS: '@goghana:trips',
    USER_PREFERENCES: '@goghana:preferences',
    CACHED_ITINERARY: '@goghana:cached_itinerary',
};

/**
 * Save a trip itinerary locally
 */
export async function saveTrip(trip: TripItinerary, name: string): Promise<void> {
    try {
        const savedTrip: SavedTrip = {
            id: trip.id,
            name,
            itinerary: trip,
            savedAt: new Date().toISOString(),
        };

        // Get existing trips
        const existingTrips = await getSavedTrips();

        // Add new trip
        const updatedTrips = [...existingTrips, savedTrip];

        await AsyncStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(updatedTrips));
    } catch (error) {
        console.error('Error saving trip:', error);
        throw new Error('Failed to save trip');
    }
}

/**
 * Get all saved trips
 */
export async function getSavedTrips(): Promise<SavedTrip[]> {
    try {
        const tripsJson = await AsyncStorage.getItem(STORAGE_KEYS.TRIPS);
        return tripsJson ? JSON.parse(tripsJson) : [];
    } catch (error) {
        console.error('Error getting saved trips:', error);
        return [];
    }
}

/**
 * Get a specific trip by ID
 */
export async function getTripById(id: string): Promise<SavedTrip | null> {
    try {
        const trips = await getSavedTrips();
        return trips.find(trip => trip.id === id) || null;
    } catch (error) {
        console.error('Error getting trip:', error);
        return null;
    }
}

/**
 * Delete a saved trip
 */
export async function deleteTrip(id: string): Promise<void> {
    try {
        const trips = await getSavedTrips();
        const updatedTrips = trips.filter(trip => trip.id !== id);
        await AsyncStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(updatedTrips));
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw new Error('Failed to delete trip');
    }
}

/**
 * Cache the current itinerary for offline access
 */
export async function cacheItinerary(itinerary: TripItinerary): Promise<void> {
    try {
        await AsyncStorage.setItem(
            STORAGE_KEYS.CACHED_ITINERARY,
            JSON.stringify(itinerary)
        );
    } catch (error) {
        console.error('Error caching itinerary:', error);
    }
}

/**
 * Get cached itinerary
 */
export async function getCachedItinerary(): Promise<TripItinerary | null> {
    try {
        const cachedJson = await AsyncStorage.getItem(STORAGE_KEYS.CACHED_ITINERARY);
        return cachedJson ? JSON.parse(cachedJson) : null;
    } catch (error) {
        console.error('Error getting cached itinerary:', error);
        return null;
    }
}

/**
 * Clear all cached data
 */
export async function clearCache(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.CACHED_ITINERARY);
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
}

/**
 * Save user preferences
 */
export async function savePreferences(preferences: Record<string, any>): Promise<void> {
    try {
        await AsyncStorage.setItem(
            STORAGE_KEYS.USER_PREFERENCES,
            JSON.stringify(preferences)
        );
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

/**
 * Get user preferences
 */
export async function getPreferences(): Promise<Record<string, any>> {
    try {
        const prefsJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        return prefsJson ? JSON.parse(prefsJson) : {};
    } catch (error) {
        console.error('Error getting preferences:', error);
        return {};
    }
}
