import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, SavedTrip, CreateTripData } from '../types/user';
import type { SupportedCurrency } from './currencyService';

/**
 * Firestore Service
 * Handles all database operations for user profiles and saved trips
 */

// Collection references
const USERS_COLLECTION = 'users';
const TRIPS_COLLECTION = 'trips';

/**
 * Create or update user profile
 */
export async function createUserProfile(
    uid: string,
    email: string,
    displayName: string | null = null,
    photoURL: string | null = null,
    phoneNumber: string | null = null
): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
        // Create new profile
        const profile: Omit<UserProfile, 'createdAt' | 'updatedAt'> & {
            createdAt: ReturnType<typeof serverTimestamp>;
            updatedAt: ReturnType<typeof serverTimestamp>;
        } = {
            uid,
            email,
            displayName,
            photoURL,
            phoneNumber,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            preferences: {
                currency: 'GHS' as SupportedCurrency,
                notifications: true,
            },
        };

        await setDoc(userRef, profile);
    } else {
        // Update existing profile
        await updateDoc(userRef, {
            updatedAt: serverTimestamp(),
        });
    }
}

/**
 * Get user profile
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
    }

    return null;
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
    uid: string,
    preferences: Partial<UserProfile['preferences']>
): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
        preferences,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Save a new trip
 */
export async function saveTrip(userId: string, tripData: CreateTripData): Promise<string> {
    const tripsRef = collection(db, USERS_COLLECTION, userId, TRIPS_COLLECTION);
    const newTripRef = doc(tripsRef);

    const trip: Omit<SavedTrip, 'id' | 'createdAt' | 'updatedAt'> & {
        createdAt: ReturnType<typeof serverTimestamp>;
        updatedAt: ReturnType<typeof serverTimestamp>;
    } = {
        userId,
        name: tripData.name,
        description: tripData.description,
        formData: tripData.formData,
        breakdown: tripData.breakdown,
        chatHistory: tripData.chatHistory || [],
        selectedTour: tripData.selectedTour || undefined,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isFavorite: false,
    };

    await setDoc(newTripRef, trip);
    return newTripRef.id;
}

/**
 * Get all trips for a user
 */
export async function getUserTrips(userId: string): Promise<SavedTrip[]> {
    const tripsRef = collection(db, USERS_COLLECTION, userId, TRIPS_COLLECTION);
    const q = query(tripsRef, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as SavedTrip[];
}

/**
 * Get a single trip by ID
 */
export async function getTripById(userId: string, tripId: string): Promise<SavedTrip | null> {
    const tripRef = doc(db, USERS_COLLECTION, userId, TRIPS_COLLECTION, tripId);
    const tripDoc = await getDoc(tripRef);

    if (tripDoc.exists()) {
        return {
            id: tripDoc.id,
            ...tripDoc.data(),
        } as SavedTrip;
    }

    return null;
}

/**
 * Update an existing trip
 */
export async function updateTrip(
    userId: string,
    tripId: string,
    updates: Partial<Omit<SavedTrip, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
    const tripRef = doc(db, USERS_COLLECTION, userId, TRIPS_COLLECTION, tripId);
    await updateDoc(tripRef, {
        ...updates,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Delete a trip
 */
export async function deleteTrip(userId: string, tripId: string): Promise<void> {
    const tripRef = doc(db, USERS_COLLECTION, userId, TRIPS_COLLECTION, tripId);
    await deleteDoc(tripRef);
}

/**
 * Toggle trip favorite status
 */
export async function toggleTripFavorite(
    userId: string,
    tripId: string,
    isFavorite: boolean
): Promise<void> {
    await updateTrip(userId, tripId, { isFavorite });
}

/**
 * Get favorite trips
 */
export async function getFavoriteTrips(userId: string): Promise<SavedTrip[]> {
    const tripsRef = collection(db, USERS_COLLECTION, userId, TRIPS_COLLECTION);
    const q = query(tripsRef, where('isFavorite', '==', true), orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as SavedTrip[];
}
