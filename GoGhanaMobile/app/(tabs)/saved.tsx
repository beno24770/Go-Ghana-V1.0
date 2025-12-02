import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getSavedTrips, deleteTrip, SavedTrip } from '../../src/services/storage';
import { formatCurrency } from '../../src/utils/calculateBudget';

export default function SavedTripsScreen() {
    const router = useRouter();
    const [trips, setTrips] = useState<SavedTrip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {
            const savedTrips = await getSavedTrips();
            setTrips(savedTrips);
        } catch (error) {
            console.error('Error loading trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTrip = async (id: string) => {
        Alert.alert(
            'Delete Trip',
            'Are you sure you want to delete this trip?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteTrip(id);
                        loadTrips();
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-600">Loading trips...</Text>
            </View>
        );
    }

    if (trips.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-white px-6">
                <View className="bg-ghana-green/10 p-8 rounded-full mb-6">
                    <Ionicons name="bookmark-outline" size={64} color="#15803D" />
                </View>
                <Text className="text-2xl font-bold text-ghana-black mb-4 text-center">
                    No Saved Trips Yet
                </Text>
                <Text className="text-gray-600 text-center mb-8">
                    Create your first trip plan and save it for offline access
                </Text>
                <TouchableOpacity
                    className="bg-ghana-green py-4 px-12 rounded-lg"
                    onPress={() => router.push('/budget-form')}
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Plan a Trip
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={trips}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-soft-ivory p-4 rounded-lg mb-4 border border-gray-200"
                        onPress={() => router.push(`/itinerary/${item.id}`)}
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <View className="flex-1">
                                <Text className="text-xl font-bold text-ghana-black mb-1">
                                    {item.name}
                                </Text>
                                <Text className="text-gray-600 text-sm">
                                    {new Date(item.savedAt).toLocaleDateString()}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleDeleteTrip(item.id)}
                                className="p-2"
                            >
                                <Ionicons name="trash-outline" size={20} color="#B91C1C" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center mt-3 pt-3 border-t border-gray-300">
                            <View className="flex-1">
                                <Text className="text-gray-600 text-sm">Duration</Text>
                                <Text className="text-ghana-black font-semibold">
                                    {item.itinerary.formData.duration} days
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-600 text-sm">Travelers</Text>
                                <Text className="text-ghana-black font-semibold">
                                    {item.itinerary.formData.travelers}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-600 text-sm">Budget</Text>
                                <Text className="text-ghana-green font-bold">
                                    {formatCurrency(item.itinerary.budget.total)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
