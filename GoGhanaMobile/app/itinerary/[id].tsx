import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TripItinerary, ItineraryDay } from '../../src/types';
import { getCachedItinerary, getTripById, saveTrip } from '../../src/services/storage';
import { formatCurrency } from '../../src/utils/calculateBudget';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';

export default function ItineraryDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedDay, setExpandedDay] = useState<number | null>(null);

    useEffect(() => {
        loadItinerary();
    }, [id]);

    const loadItinerary = async () => {
        try {
            // Try to load from saved trips first
            const savedTrip = await getTripById(id as string);
            if (savedTrip) {
                setItinerary(savedTrip.itinerary);
            } else {
                // Fall back to cached itinerary
                const cached = await getCachedItinerary();
                if (cached && cached.id === id) {
                    setItinerary(cached);
                }
            }
        } catch (error) {
            console.error('Error loading itinerary:', error);
            Alert.alert('Error', 'Failed to load itinerary');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTrip = async () => {
        if (!itinerary) return;

        Alert.prompt(
            'Save Trip',
            'Enter a name for this trip:',
            async (name) => {
                if (name) {
                    await saveTrip(itinerary, name);
                    Alert.alert('Success', 'Trip saved successfully!');
                }
            },
            'plain-text',
            `Ghana Trip - ${new Date().toLocaleDateString()}`
        );
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-600">Loading itinerary...</Text>
            </View>
        );
    }

    if (!itinerary) {
        return (
            <View className="flex-1 items-center justify-center bg-white px-6">
                <Ionicons name="alert-circle-outline" size={64} color="#6B7280" />
                <Text className="text-xl font-bold text-ghana-black mt-4 mb-2">
                    Itinerary Not Found
                </Text>
                <Text className="text-gray-600 text-center mb-6">
                    This itinerary may have been deleted or is no longer available
                </Text>
                <TouchableOpacity
                    className="bg-ghana-green py-3 px-8 rounded-lg"
                    onPress={() => router.back()}
                >
                    <Text className="text-white font-semibold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-ghana-green px-6 py-8">
                <Text className="text-white text-3xl font-bold mb-2">
                    Your Ghana Adventure
                </Text>
                <Text className="text-white/90 text-lg">
                    {itinerary.formData.duration} days • {itinerary.formData.travelers} {itinerary.formData.travelers === 1 ? 'traveler' : 'travelers'}
                </Text>
            </View>

            {/* Budget Summary */}
            <View className="px-6 py-6 bg-soft-ivory">
                <Text className="text-lg font-bold text-ghana-black mb-3">
                    Total Budget
                </Text>
                <Text className="text-3xl font-bold text-ghana-green mb-2">
                    {formatCurrency(itinerary.budget.total)}
                </Text>
                <Text className="text-gray-600">
                    ≈ {formatCurrency(Math.round(itinerary.budget.total / itinerary.formData.duration / itinerary.formData.travelers))} per person/day
                </Text>
            </View>

            {/* Summary */}
            {itinerary.summary && (
                <View className="px-6 py-6 border-b border-gray-200">
                    <Text className="text-lg font-bold text-ghana-black mb-3">
                        Trip Highlights
                    </Text>
                    {itinerary.summary.highlights.map((highlight, index) => (
                        <View key={index} className="flex-row items-start mb-2">
                            <Ionicons name="checkmark-circle" size={20} color="#15803D" />
                            <Text className="text-gray-700 ml-2 flex-1">{highlight}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Day-by-Day Itinerary */}
            <View className="px-6 py-6">
                <Text className="text-lg font-bold text-ghana-black mb-4">
                    Day-by-Day Itinerary
                </Text>
                {itinerary.days.map((day, index) => (
                    <DayCard
                        key={day.day}
                        day={day}
                        isExpanded={expandedDay === day.day}
                        onToggle={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                    />
                ))}
            </View>

            {/* Save Button */}
            <View className="px-6 py-6">
                <TouchableOpacity
                    className="bg-ghana-yellow py-4 px-8 rounded-lg"
                    onPress={handleSaveTrip}
                >
                    <Text className="text-white text-center font-bold text-lg">
                        💾 Save This Trip
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function DayCard({ day, isExpanded, onToggle }: {
    day: ItineraryDay;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const height = useSharedValue(isExpanded ? 'auto' : 0);

    const animatedStyle = useAnimatedStyle(() => ({
        height: withTiming(height.value, { duration: 300 }),
    }));

    return (
        <View className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <TouchableOpacity
                className="bg-soft-ivory p-4 flex-row justify-between items-center"
                onPress={onToggle}
            >
                <View className="flex-1">
                    <Text className="text-lg font-bold text-ghana-black">
                        Day {day.day}
                    </Text>
                    <Text className="text-gray-600">{day.location}</Text>
                </View>
                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#15803D"
                />
            </TouchableOpacity>

            {isExpanded && (
                <Animated.View entering={FadeIn} exiting={FadeOut} className="p-4">
                    {/* Morning */}
                    <TimeSection title="Morning" activities={day.morning} icon="sunny" />

                    {/* Afternoon */}
                    <TimeSection title="Afternoon" activities={day.afternoon} icon="partly-sunny" />

                    {/* Evening */}
                    <TimeSection title="Evening" activities={day.evening} icon="moon" />

                    {/* Meals */}
                    {day.meals && (
                        <View className="mt-4 pt-4 border-t border-gray-200">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="restaurant" size={20} color="#D97706" />
                                <Text className="text-lg font-semibold text-ghana-black ml-2">
                                    Meals
                                </Text>
                            </View>
                            {day.meals.breakfast && (
                                <MealItem meal={day.meals.breakfast} type="Breakfast" />
                            )}
                            {day.meals.lunch && (
                                <MealItem meal={day.meals.lunch} type="Lunch" />
                            )}
                            {day.meals.dinner && (
                                <MealItem meal={day.meals.dinner} type="Dinner" />
                            )}
                        </View>
                    )}

                    {/* Accommodation */}
                    {day.accommodation && (
                        <View className="mt-4 pt-4 border-t border-gray-200">
                            <View className="flex-row items-center mb-3">
                                <Ionicons name="bed" size={20} color="#D97706" />
                                <Text className="text-lg font-semibold text-ghana-black ml-2">
                                    Accommodation
                                </Text>
                            </View>
                            <View className="bg-soft-ivory p-3 rounded-lg">
                                <Text className="font-semibold text-ghana-black">
                                    {day.accommodation.name}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    {day.accommodation.type} • {day.accommodation.location}
                                </Text>
                                <Text className="text-ghana-green font-semibold mt-1">
                                    {formatCurrency(day.accommodation.estimatedCost)}
                                </Text>
                            </View>
                        </View>
                    )}
                </Animated.View>
            )}
        </View>
    );
}

function TimeSection({ title, activities, icon }: {
    title: string;
    activities: any[];
    icon: keyof typeof Ionicons.glyphMap;
}) {
    if (!activities || activities.length === 0) return null;

    return (
        <View className="mb-4">
            <View className="flex-row items-center mb-2">
                <Ionicons name={icon} size={18} color="#D97706" />
                <Text className="text-base font-semibold text-ghana-black ml-2">
                    {title}
                </Text>
            </View>
            {activities.map((activity, index) => (
                <View key={index} className="ml-6 mb-3">
                    <View className="flex-row items-start">
                        <Text className="text-ghana-green font-semibold mr-2">
                            {activity.time}
                        </Text>
                        <View className="flex-1">
                            <Text className="text-ghana-black font-semibold">
                                {activity.activity}
                            </Text>
                            <Text className="text-gray-600 text-sm mt-1">
                                {activity.description}
                            </Text>
                            {activity.cost && (
                                <Text className="text-ghana-green text-sm mt-1">
                                    {formatCurrency(activity.cost)}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

function MealItem({ meal, type }: { meal: any; type: string }) {
    return (
        <View className="mb-2 ml-6">
            <Text className="text-gray-600 text-sm">{type}</Text>
            <Text className="text-ghana-black font-semibold">{meal.name}</Text>
            <Text className="text-gray-600 text-sm">{meal.location}</Text>
            <Text className="text-ghana-green text-sm">
                {formatCurrency(meal.estimatedCost)}
            </Text>
        </View>
    );
}
