import type { BudgetBreakdown, BudgetFormData } from '../types';
import type {
    TripItinerary,
    ItineraryDay,
    ItinerarySummary,
    ItineraryGenerationOptions,
    AccommodationRecommendation,
    RestaurantRecommendation,
    ItineraryActivity,
    DayMeals,
} from '../types/itinerary';
import {
    SAMPLE_ACCOMMODATIONS,
    SAMPLE_RESTAURANTS,
    SAMPLE_ACTIVITIES,
    getAccommodationsByTier,
    getRestaurantsByMealAndTier,
    getActivitiesByType,
} from '../data/itineraryData';
import { generateItineraryWithAI } from '../services/llmService';

/**
 * Main function to generate trip itinerary from budget
 */
export async function generateItinerary(
    budget: BudgetBreakdown,
    formData: BudgetFormData,
    options: ItineraryGenerationOptions = { useAI: true, includeAlternatives: false, optimizeRoute: true }
): Promise<TripItinerary> {

    if (options.useAI) {
        // Use AI to generate personalized itinerary
        return await generateAIItinerary(budget, formData, options);
    } else {
        // Use template-based generation
        return generateTemplateItinerary(budget, formData);
    }
}

/**
 * Generate itinerary using AI (Gemini)
 */
async function generateAIItinerary(
    budget: BudgetBreakdown,
    formData: BudgetFormData,
    options: ItineraryGenerationOptions
): Promise<TripItinerary> {

    // Prepare context for AI
    const context = {
        budget,
        formData,
        options,
        availableAccommodations: SAMPLE_ACCOMMODATIONS,
        availableRestaurants: SAMPLE_RESTAURANTS,
        availableActivities: SAMPLE_ACTIVITIES,
    };

    // Generate itinerary using AI
    const aiItinerary = await generateItineraryWithAI(context);

    return aiItinerary;
}

/**
 * Generate itinerary using templates (fallback)
 */
function generateTemplateItinerary(
    budget: BudgetBreakdown,
    formData: BudgetFormData
): TripItinerary {

    const { duration, regions, accommodationLevel, activities } = formData;
    const travelerCount = formData.travelers || 1;

    // Determine budget tier
    const tier = accommodationLevel;

    // Calculate daily budget
    const dailyBudget = budget.total / duration;

    // Generate days
    const days: ItineraryDay[] = [];
    const regionsToVisit = regions && regions.length > 0 ? regions : ['Greater Accra'];
    const daysPerRegion = Math.floor(duration / regionsToVisit.length);

    let currentDay = 1;

    for (const region of regionsToVisit) {
        const regionDays = currentDay + daysPerRegion > duration
            ? duration - currentDay + 1
            : daysPerRegion;

        for (let i = 0; i < regionDays; i++) {
            const day = generateDay(
                currentDay,
                region,
                tier,
                dailyBudget,
                activities || [],
                i === 0 // First day in region
            );
            days.push(day);
            currentDay++;
        }
    }

    // Calculate summary
    const summary = calculateSummary(days);

    return {
        id: generateId(),
        budget,
        formData,
        days,
        summary,
        createdAt: new Date(),
        updatedAt: new Date(),
        generatedBy: 'template',
    };
}

/**
 * Generate a single day's itinerary
 */
function generateDay(
    dayNumber: number,
    region: string,
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury',
    dailyBudget: number,
    interests: string[],
    isFirstDayInRegion: boolean
): ItineraryDay {

    // Get accommodation
    const accommodations = getAccommodationsByTier(region, tier);
    const accommodation = accommodations[0] || getDefaultAccommodation(region, tier);

    // Get meals
    const meals = generateMeals(region, tier);

    // Get activities based on interests
    const morning = generateMorningActivities(region, interests, isFirstDayInRegion);
    const afternoon = generateAfternoonActivities(region, interests);
    const evening = generateEveningActivities(region, interests);

    // Calculate actual cost
    const actualCost = calculateDayCost(accommodation, meals, morning, afternoon, evening);

    return {
        day: dayNumber,
        location: region,
        region,
        dailyBudget,
        actualCost,
        morning,
        afternoon,
        evening,
        meals,
        accommodation,
        transport: [],
        highlights: generateHighlights(morning, afternoon, evening),
    };
}

/**
 * Generate meals for a day
 */
function generateMeals(
    region: string,
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury'
): DayMeals {

    const breakfast = getRestaurantsByMealAndTier(region, 'breakfast', tier)[0] || getDefaultRestaurant(region, 'breakfast', tier);
    const lunch = getRestaurantsByMealAndTier(region, 'lunch', tier)[0] || getDefaultRestaurant(region, 'lunch', tier);
    const dinner = getRestaurantsByMealAndTier(region, 'dinner', tier)[0] || getDefaultRestaurant(region, 'dinner', tier);

    return { breakfast, lunch, dinner };
}

/**
 * Generate morning activities
 */
function generateMorningActivities(
    region: string,
    interests: string[],
    isFirstDay: boolean
): ItineraryActivity[] {

    if (isFirstDay) {
        return [{
            time: '8:00 AM - 10:00 AM',
            activity: 'Hotel Check-in & Breakfast',
            location: region,
            cost: 0,
            duration: '2 hours',
            description: 'Settle into your accommodation and enjoy breakfast',
            type: 'rest',
        }];
    }

    const activities = getActivitiesByType(region, 'culture');
    const activity = activities[0];

    if (activity) {
        return [{
            time: '9:00 AM - 11:00 AM',
            activity: activity.name,
            location: activity.location,
            cost: activity.cost,
            duration: activity.duration,
            description: activity.description,
            type: activity.type,
            activityDetails: activity,
        }];
    }

    return [];
}

/**
 * Generate afternoon activities
 */
function generateAfternoonActivities(
    region: string,
    interests: string[]
): ItineraryActivity[] {

    const activities = getActivitiesByType(region, 'culture');
    const activity = activities[1] || activities[0];

    if (activity) {
        return [{
            time: '2:00 PM - 5:00 PM',
            activity: activity.name,
            location: activity.location,
            cost: activity.cost,
            duration: activity.duration,
            description: activity.description,
            type: activity.type,
            activityDetails: activity,
        }];
    }

    return [];
}

/**
 * Generate evening activities
 */
function generateEveningActivities(
    region: string,
    interests: string[]
): ItineraryActivity[] {

    const activities = getActivitiesByType(region, 'nightlife');
    const activity = activities[0];

    if (activity) {
        return [{
            time: '8:00 PM - 10:00 PM',
            activity: activity.name,
            location: activity.location,
            cost: activity.cost,
            duration: activity.duration,
            description: activity.description,
            type: activity.type,
            activityDetails: activity,
        }];
    }

    return [];
}

/**
 * Calculate total cost for a day
 */
function calculateDayCost(
    accommodation: AccommodationRecommendation,
    meals: DayMeals,
    morning: ItineraryActivity[],
    afternoon: ItineraryActivity[],
    evening: ItineraryActivity[]
): number {

    const accomCost = accommodation.pricePerNight;
    const mealsCost = meals.breakfast.averageCost + meals.lunch.averageCost + meals.dinner.averageCost;
    const activitiesCost = [
        ...morning,
        ...afternoon,
        ...evening,
    ].reduce((sum, act) => sum + act.cost, 0);

    return accomCost + mealsCost + activitiesCost;
}

/**
 * Calculate summary for entire trip
 */
function calculateSummary(days: ItineraryDay[]): ItinerarySummary {

    let totalAccommodationCost = 0;
    let totalFoodCost = 0;
    let totalTransportCost = 0;
    let totalActivitiesCost = 0;

    for (const day of days) {
        totalAccommodationCost += day.accommodation.pricePerNight;
        totalFoodCost += day.meals.breakfast.averageCost + day.meals.lunch.averageCost + day.meals.dinner.averageCost;
        totalTransportCost += day.transport.reduce((sum, t) => sum + t.estimatedCost, 0);

        const dayActivities = [...day.morning, ...day.afternoon, ...day.evening];
        totalActivitiesCost += dayActivities.reduce((sum, act) => sum + act.cost, 0);
    }

    const totalCost = totalAccommodationCost + totalFoodCost + totalTransportCost + totalActivitiesCost;

    return {
        totalAccommodationCost,
        totalFoodCost,
        totalTransportCost,
        totalActivitiesCost,
        totalCost,
        budgetUtilization: 0, // Will be calculated based on original budget
    };
}

/**
 * Generate highlights for a day
 */
function generateHighlights(
    morning: ItineraryActivity[],
    afternoon: ItineraryActivity[],
    evening: ItineraryActivity[]
): string[] {

    const highlights: string[] = [];

    [...morning, ...afternoon, ...evening].forEach(activity => {
        if (activity.type !== 'rest' && activity.type !== 'transport') {
            highlights.push(activity.activity);
        }
    });

    return highlights;
}

/**
 * Helper functions for defaults
 */
function getDefaultAccommodation(
    region: string,
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury'
): AccommodationRecommendation {
    return {
        id: 'default-acc',
        name: 'Local Guesthouse',
        type: 'guesthouse',
        location: region,
        region,
        pricePerNight: 80,
        rating: 4.0,
        amenities: ['WiFi', 'Breakfast'],
        description: 'Comfortable local accommodation',
        tier,
    };
}

function getDefaultRestaurant(
    region: string,
    mealType: 'breakfast' | 'lunch' | 'dinner',
    tier: 'backpacker' | 'budget' | 'mid' | 'comfort' | 'luxury'
): RestaurantRecommendation {
    return {
        id: `default-rest-${mealType}`,
        name: 'Local Restaurant',
        cuisine: 'Ghanaian',
        location: region,
        region,
        priceRange: 'GH₵ 20-50',
        averageCost: 35,
        rating: 4.0,
        specialty: 'Local Cuisine',
        mealType,
        tier,
    };
}

function generateId(): string {
    return `itinerary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
