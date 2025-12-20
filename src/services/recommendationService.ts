import type { BudgetBreakdown, BudgetFormData } from '../types';
import type { Recommendation, RecommendationSet } from '../types/recommendations';
import { ACCOMMODATION_RECOMMENDATIONS } from '../data/recommendations/accommodations';
import { ACTIVITY_RECOMMENDATIONS } from '../data/recommendations/activities';
import { FOOD_RECOMMENDATIONS } from '../data/recommendations/restaurants';
import { TRANSPORT_RECOMMENDATIONS } from '../data/recommendations/transport';

/**
 * Smart recommendation service that matches budget allocations to specific recommendations
 */

interface MatchingOptions {
    maxResults?: number;
    preferredRegions?: string[];
    travelStyle?: string;
}

/**
 * Get personalized recommendations based on budget breakdown and form data
 */
export function getRecommendations(
    breakdown: BudgetBreakdown,
    formData: BudgetFormData,
    options: MatchingOptions = {}
): RecommendationSet {
    const { maxResults = 5, preferredRegions } = options;

    // Calculate daily budgets
    const dailyAccommodation = breakdown.accommodation / formData.duration;
    const dailyFood = breakdown.food / formData.duration;
    const dailyTransport = breakdown.transport / formData.duration;
    const totalActivities = breakdown.activities;

    // Get regions from form data or use defaults
    const regions = preferredRegions || formData.regions || ['Greater Accra'];

    return {
        accommodation: matchAccommodations(dailyAccommodation, regions, maxResults),
        activities: matchActivities(totalActivities, regions, formData.interests || [], maxResults),
        food: matchRestaurants(dailyFood, regions, maxResults),
        transport: matchTransport(dailyTransport, formData.transportMode || 'public', maxResults)
    };
}

/**
 * Match accommodations based on daily budget and regions
 */
function matchAccommodations(
    dailyBudget: number,
    regions: string[],
    maxResults: number
): Recommendation[] {
    // Filter by price range (±20% tolerance)
    const minPrice = dailyBudget * 0.6;
    const maxPrice = dailyBudget * 1.2;

    let matches = ACCOMMODATION_RECOMMENDATIONS.filter(acc => {
        const inPriceRange = acc.priceRange.min <= maxPrice && acc.priceRange.max >= minPrice;
        const inRegion = regions.some(region =>
            acc.region.toLowerCase().includes(region.toLowerCase()) ||
            region.toLowerCase().includes(acc.region.toLowerCase())
        );
        return inPriceRange && inRegion;
    });

    // If no matches in preferred regions, expand search
    if (matches.length === 0) {
        matches = ACCOMMODATION_RECOMMENDATIONS.filter(acc =>
            acc.priceRange.min <= maxPrice && acc.priceRange.max >= minPrice
        );
    }

    // Sort by rating and price match
    matches.sort((a, b) => {
        const aScore = calculateMatchScore(a, dailyBudget);
        const bScore = calculateMatchScore(b, dailyBudget);
        return bScore - aScore;
    });

    return matches.slice(0, maxResults);
}

/**
 * Match activities based on total budget, regions, and interests
 */
function matchActivities(
    totalBudget: number,
    regions: string[],
    interests: string[],
    maxResults: number
): Recommendation[] {
    // Assume budget is for 3-5 activities
    const perActivityBudget = totalBudget / 4;
    const minPrice = perActivityBudget * 0.5;
    const maxPrice = perActivityBudget * 2;

    let matches = ACTIVITY_RECOMMENDATIONS.filter(activity => {
        const inPriceRange = activity.priceRange.min <= maxPrice && activity.priceRange.min >= minPrice;
        const inRegion = regions.some(region =>
            activity.region.toLowerCase().includes(region.toLowerCase()) ||
            region.toLowerCase().includes(activity.region.toLowerCase())
        );

        // Check if activity matches interests
        const matchesInterests = interests.length === 0 || interests.some(interest =>
            activity.tags?.some(tag =>
                tag.toLowerCase().includes(interest.toLowerCase()) ||
                interest.toLowerCase().includes(tag.toLowerCase())
            )
        );

        return inPriceRange && (inRegion || matchesInterests);
    });

    // If no matches, expand search
    if (matches.length < 3) {
        matches = ACTIVITY_RECOMMENDATIONS.filter(activity =>
            activity.priceRange.min <= maxPrice
        );
    }

    // Sort by rating and interest match
    matches.sort((a, b) => {
        const aInterestMatch = interests.some(interest =>
            a.tags?.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
        ) ? 1 : 0;
        const bInterestMatch = interests.some(interest =>
            b.tags?.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
        ) ? 1 : 0;

        if (aInterestMatch !== bInterestMatch) return bInterestMatch - aInterestMatch;
        return (b.rating || 0) - (a.rating || 0);
    });

    return matches.slice(0, maxResults);
}

/**
 * Match restaurants based on daily food budget and regions
 */
function matchRestaurants(
    dailyBudget: number,
    regions: string[],
    maxResults: number
): Recommendation[] {
    // Assume 2-3 meals per day
    const perMealBudget = dailyBudget / 2.5;
    const minPrice = perMealBudget * 0.5;
    const maxPrice = perMealBudget * 2;

    let matches = FOOD_RECOMMENDATIONS.filter(restaurant => {
        const inPriceRange = restaurant.priceRange.min <= maxPrice && restaurant.priceRange.max >= minPrice;
        const inRegion = regions.some(region =>
            restaurant.region.toLowerCase().includes(region.toLowerCase()) ||
            region.toLowerCase().includes(restaurant.region.toLowerCase())
        );
        return inPriceRange && inRegion;
    });

    // If no matches, expand search
    if (matches.length < 3) {
        matches = FOOD_RECOMMENDATIONS.filter(restaurant =>
            restaurant.priceRange.min <= maxPrice && restaurant.priceRange.max >= minPrice
        );
    }

    // Sort by rating and price match
    matches.sort((a, b) => {
        const aScore = calculateMatchScore(a, perMealBudget);
        const bScore = calculateMatchScore(b, perMealBudget);
        return bScore - aScore;
    });

    return matches.slice(0, maxResults);
}

/**
 * Match transport options based on daily budget and preferred mode
 */
function matchTransport(
    dailyBudget: number,
    transportMode: string,
    maxResults: number
): Recommendation[] {
    const minPrice = dailyBudget * 0.5;
    const maxPrice = dailyBudget * 1.5;

    const matches = TRANSPORT_RECOMMENDATIONS.filter(transport => {
        const inPriceRange = transport.priceRange.min <= maxPrice && transport.priceRange.min >= minPrice;

        // Match transport mode preference
        const modeMatch =
            (transportMode === 'bolt' && transport.tags?.includes('ride-hailing')) ||
            (transportMode === 'private_driver' && transport.tags?.includes('private')) ||
            (transportMode === 'rental' && transport.tags?.includes('rental')) ||
            (transportMode === 'public' && transport.tags?.includes('public')) ||
            (transportMode === 'flight' && transport.tags?.includes('flight'));

        return inPriceRange && (modeMatch || true); // Allow all if no exact match
    });

    // Sort by mode match and rating
    matches.sort((a, b) => {
        const aModeMatch = a.tags?.some(tag => transportMode.includes(tag)) ? 1 : 0;
        const bModeMatch = b.tags?.some(tag => transportMode.includes(tag)) ? 1 : 0;

        if (aModeMatch !== bModeMatch) return bModeMatch - aModeMatch;
        return (b.rating || 0) - (a.rating || 0);
    });

    return matches.slice(0, maxResults);
}

/**
 * Calculate match score based on price alignment and rating
 */
function calculateMatchScore(recommendation: Recommendation, targetBudget: number): number {
    const avgPrice = (recommendation.priceRange.min + recommendation.priceRange.max) / 2;
    const priceDiff = Math.abs(avgPrice - targetBudget);
    const priceScore = 1 / (1 + priceDiff / targetBudget); // Closer to budget = higher score
    const ratingScore = (recommendation.rating || 4) / 5; // Normalize rating to 0-1

    return priceScore * 0.6 + ratingScore * 0.4; // Weight price match more heavily
}

/**
 * Get a single recommendation by ID
 */
export function getRecommendationById(id: string): Recommendation | undefined {
    const allRecommendations = [
        ...ACCOMMODATION_RECOMMENDATIONS,
        ...ACTIVITY_RECOMMENDATIONS,
        ...FOOD_RECOMMENDATIONS,
        ...TRANSPORT_RECOMMENDATIONS
    ];

    return allRecommendations.find(rec => rec.id === id);
}
