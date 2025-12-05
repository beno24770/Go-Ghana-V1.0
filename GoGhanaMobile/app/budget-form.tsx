import { View, Text, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BudgetFormData, BudgetBreakdown, TripItinerary } from '../src/types';
import { calculateBudget, formatCurrency } from '../src/utils/calculateBudget';
import { generateItinerary } from '../src/services/gemini';
import { cacheItinerary, saveTrip } from '../src/services/storage';

// const MONTHS = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
// ];

const ACCOMMODATION_LEVELS = [
    { value: 'backpacker', label: 'Backpacker', description: 'Hostels & budget stays' },
    { value: 'budget', label: 'Budget', description: 'Simple hotels' },
    { value: 'mid', label: 'Mid-Range', description: 'Comfortable hotels' },
    { value: 'comfort', label: 'Comfort', description: 'Quality hotels' },
    { value: 'luxury', label: 'Luxury', description: 'Premium resorts' },
];

const ACTIVITIES = [
    { value: 'culture', label: 'Culture & History', icon: 'library' },
    { value: 'adventure', label: 'Adventure', icon: 'bicycle' },
    { value: 'nature', label: 'Nature & Wildlife', icon: 'leaf' },
    { value: 'food', label: 'Food & Cuisine', icon: 'restaurant' },
    { value: 'nightlife', label: 'Nightlife', icon: 'musical-notes' },
    { value: 'relaxation', label: 'Relaxation', icon: 'sunny' },
];

export default function BudgetFormScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<BudgetFormData>({
        duration: 7,
        travelers: 1,
        travelerType: 'solo',
        accommodationLevel: 'mid',
        activities: [],
        includeFlights: false,
        includeInsurance: true,
    });

    const [budget, setBudget] = useState<BudgetBreakdown | null>(null);

    const updateFormData = (updates: Partial<BudgetFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            handleCalculateBudget();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    const handleCalculateBudget = () => {
        const calculatedBudget = calculateBudget(formData);
        setBudget(calculatedBudget);
        setStep(6); // Show budget summary
    };

    const handleGenerateItinerary = async () => {
        if (!budget) return;

        setLoading(true);
        try {
            const aiResponse = await generateItinerary(formData, budget);

            const itinerary: TripItinerary = {
                id: Date.now().toString(),
                budget,
                formData,
                days: aiResponse.days,
                summary: aiResponse.summary || {
                    totalDays: formData.duration,
                    regionsVisited: formData.regions || ['Accra'],
                    highlights: [],
                    estimatedTotalCost: budget.total,
                },
                createdAt: new Date().toISOString(),
            };

            await cacheItinerary(itinerary);

            Alert.alert(
                'Itinerary Generated!',
                'Would you like to save this trip?',
                [
                    { text: 'Not Now', onPress: () => router.push(`/itinerary/${itinerary.id}`) },
                    {
                        text: 'Save Trip',
                        onPress: async () => {
                            await saveTrip(itinerary, `Ghana Trip - ${new Date().toLocaleDateString()}`);
                            router.push(`/itinerary/${itinerary.id}`);
                        },
                    },
                ]
            );
        } catch {
            Alert.alert('Error', 'Failed to generate itinerary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1Duration formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <Step2Travelers formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <Step3Accommodation formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <Step4Activities formData={formData} updateFormData={updateFormData} />;
            case 5:
                return <Step5Extras formData={formData} updateFormData={updateFormData} />;
            case 6:
                return budget ? (
                    <Step6Summary budget={budget} formData={formData} onGenerateItinerary={handleGenerateItinerary} loading={loading} />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 bg-white">
            {/* Progress Bar */}
            {step < 6 && (
                <View className="px-6 pt-4 pb-2">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-sm text-gray-600">Step {step} of 5</Text>
                        <Text className="text-sm text-ghana-green font-semibold">{Math.round((step / 5) * 100)}%</Text>
                    </View>
                    <View className="h-2 bg-gray-200 rounded-full">
                        <View
                            className="h-2 bg-ghana-green rounded-full"
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </View>
                </View>
            )}

            <ScrollView className="flex-1 px-6 py-4">
                {renderStep()}
            </ScrollView>

            {/* Navigation Buttons */}
            <View className="px-6 py-4 border-t border-gray-200">
                <View className="flex-row gap-3">
                    <TouchableOpacity
                        className="flex-1 bg-gray-200 py-4 rounded-lg"
                        onPress={handleBack}
                    >
                        <Text className="text-ghana-black text-center font-semibold">
                            {step === 1 ? 'Cancel' : 'Back'}
                        </Text>
                    </TouchableOpacity>

                    {step < 6 && (
                        <TouchableOpacity
                            className="flex-1 bg-ghana-green py-4 rounded-lg"
                            onPress={handleNext}
                        >
                            <Text className="text-white text-center font-semibold">
                                {step === 5 ? 'Calculate Budget' : 'Next'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

// Step Components
function Step1Duration({ formData, updateFormData }: StepProps) {
    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                How long is your trip?
            </Text>
            <Text className="text-gray-600 mb-6">
                Choose the number of days you'll be in Ghana
            </Text>

            <View className="flex-row items-center justify-center gap-4 my-8">
                <TouchableOpacity
                    className="bg-ghana-green p-4 rounded-full"
                    onPress={() => updateFormData({ duration: Math.max(1, formData.duration - 1) })}
                >
                    <Ionicons name="remove" size={24} color="white" />
                </TouchableOpacity>

                <View className="bg-ghana-green/10 px-8 py-4 rounded-lg">
                    <Text className="text-4xl font-bold text-ghana-green text-center">
                        {formData.duration}
                    </Text>
                    <Text className="text-ghana-green text-center mt-1">days</Text>
                </View>

                <TouchableOpacity
                    className="bg-ghana-green p-4 rounded-full"
                    onPress={() => updateFormData({ duration: formData.duration + 1 })}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Step2Travelers({ formData, updateFormData }: StepProps) {
    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                Who's traveling?
            </Text>
            <Text className="text-gray-600 mb-6">
                Tell us about your travel group
            </Text>

            <View className="flex-row items-center justify-center gap-4 mb-8">
                <TouchableOpacity
                    className="bg-ghana-green p-4 rounded-full"
                    onPress={() => updateFormData({ travelers: Math.max(1, formData.travelers - 1) })}
                >
                    <Ionicons name="remove" size={24} color="white" />
                </TouchableOpacity>

                <View className="bg-ghana-green/10 px-8 py-4 rounded-lg">
                    <Text className="text-4xl font-bold text-ghana-green text-center">
                        {formData.travelers}
                    </Text>
                    <Text className="text-ghana-green text-center mt-1">travelers</Text>
                </View>

                <TouchableOpacity
                    className="bg-ghana-green p-4 rounded-full"
                    onPress={() => updateFormData({ travelers: formData.travelers + 1 })}
                >
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text className="text-lg font-semibold text-ghana-black mb-3">Travel Type</Text>
            <View className="gap-3">
                {[
                    { value: 'solo', label: 'Solo Traveler', icon: 'person' },
                    { value: 'couple', label: 'Couple', icon: 'heart' },
                    { value: 'family', label: 'Family', icon: 'people' },
                    { value: 'group', label: 'Group', icon: 'people-circle' },
                ].map((type) => (
                    <TouchableOpacity
                        key={type.value}
                        className={`flex-row items-center p-4 rounded-lg border-2 ${formData.travelerType === type.value
                            ? 'border-ghana-green bg-ghana-green/10'
                            : 'border-gray-200 bg-white'
                            }`}
                        onPress={() => updateFormData({ travelerType: type.value as any })}
                    >
                        <Ionicons
                            name={type.icon as any}
                            size={24}
                            color={formData.travelerType === type.value ? '#15803D' : '#6B7280'}
                        />
                        <Text className={`ml-3 text-lg ${formData.travelerType === type.value ? 'text-ghana-green font-semibold' : 'text-gray-700'
                            }`}>
                            {type.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function Step3Accommodation({ formData, updateFormData }: StepProps) {
    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                Accommodation Style
            </Text>
            <Text className="text-gray-600 mb-6">
                Choose your preferred accommodation level
            </Text>

            <View className="gap-3">
                {ACCOMMODATION_LEVELS.map((level) => (
                    <TouchableOpacity
                        key={level.value}
                        className={`p-4 rounded-lg border-2 ${formData.accommodationLevel === level.value
                            ? 'border-ghana-green bg-ghana-green/10'
                            : 'border-gray-200 bg-white'
                            }`}
                        onPress={() => updateFormData({ accommodationLevel: level.value as any })}
                    >
                        <Text className={`text-lg font-semibold ${formData.accommodationLevel === level.value ? 'text-ghana-green' : 'text-ghana-black'
                            }`}>
                            {level.label}
                        </Text>
                        <Text className="text-gray-600 text-sm mt-1">{level.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function Step4Activities({ formData, updateFormData }: StepProps) {
    const toggleActivity = (activity: string) => {
        const current = formData.activities || [];
        const updated = current.includes(activity)
            ? current.filter(a => a !== activity)
            : [...current, activity];
        updateFormData({ activities: updated });
    };

    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                What interests you?
            </Text>
            <Text className="text-gray-600 mb-6">
                Select all that apply
            </Text>

            <View className="gap-3">
                {ACTIVITIES.map((activity) => {
                    const isSelected = formData.activities?.includes(activity.value);
                    return (
                        <TouchableOpacity
                            key={activity.value}
                            className={`flex-row items-center p-4 rounded-lg border-2 ${isSelected
                                ? 'border-ghana-green bg-ghana-green/10'
                                : 'border-gray-200 bg-white'
                                }`}
                            onPress={() => toggleActivity(activity.value)}
                        >
                            <Ionicons
                                name={activity.icon as any}
                                size={24}
                                color={isSelected ? '#15803D' : '#6B7280'}
                            />
                            <Text className={`ml-3 text-lg flex-1 ${isSelected ? 'text-ghana-green font-semibold' : 'text-gray-700'
                                }`}>
                                {activity.label}
                            </Text>
                            {isSelected && (
                                <Ionicons name="checkmark-circle" size={24} color="#15803D" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

function Step5Extras({ formData, updateFormData }: StepProps) {
    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                Additional Options
            </Text>
            <Text className="text-gray-600 mb-6">
                Customize your budget calculation
            </Text>

            <View className="gap-4">
                <TouchableOpacity
                    className={`flex-row items-center justify-between p-4 rounded-lg border-2 ${formData.includeFlights
                        ? 'border-ghana-green bg-ghana-green/10'
                        : 'border-gray-200 bg-white'
                        }`}
                    onPress={() => updateFormData({ includeFlights: !formData.includeFlights })}
                >
                    <View className="flex-row items-center flex-1">
                        <Ionicons
                            name="airplane"
                            size={24}
                            color={formData.includeFlights ? '#15803D' : '#6B7280'}
                        />
                        <View className="ml-3 flex-1">
                            <Text className={`text-lg ${formData.includeFlights ? 'text-ghana-green font-semibold' : 'text-gray-700'
                                }`}>
                                Include International Flights
                            </Text>
                            <Text className="text-gray-600 text-sm">≈ GH₵ 14,283 per person</Text>
                        </View>
                    </View>
                    <View className={`w-6 h-6 rounded border-2 ${formData.includeFlights ? 'bg-ghana-green border-ghana-green' : 'border-gray-400'
                        } items-center justify-center`}>
                        {formData.includeFlights && (
                            <Ionicons name="checkmark" size={16} color="white" />
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-row items-center justify-between p-4 rounded-lg border-2 ${formData.includeInsurance
                        ? 'border-ghana-green bg-ghana-green/10'
                        : 'border-gray-200 bg-white'
                        }`}
                    onPress={() => updateFormData({ includeInsurance: !formData.includeInsurance })}
                >
                    <View className="flex-row items-center flex-1">
                        <Ionicons
                            name="shield-checkmark"
                            size={24}
                            color={formData.includeInsurance ? '#15803D' : '#6B7280'}
                        />
                        <View className="ml-3 flex-1">
                            <Text className={`text-lg ${formData.includeInsurance ? 'text-ghana-green font-semibold' : 'text-gray-700'
                                }`}>
                                Travel Insurance
                            </Text>
                            <Text className="text-gray-600 text-sm">GH₵ 500 per person</Text>
                        </View>
                    </View>
                    <View className={`w-6 h-6 rounded border-2 ${formData.includeInsurance ? 'bg-ghana-green border-ghana-green' : 'border-gray-400'
                        } items-center justify-center`}>
                        {formData.includeInsurance && (
                            <Ionicons name="checkmark" size={16} color="white" />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Step6Summary({ budget, formData, onGenerateItinerary, loading }: {
    budget: BudgetBreakdown;
    formData: BudgetFormData;
    onGenerateItinerary: () => void;
    loading: boolean;
}) {
    return (
        <View>
            <Text className="text-2xl font-bold text-ghana-black mb-2">
                Your Budget Summary
            </Text>
            <Text className="text-gray-600 mb-6">
                {formData.duration} days • {formData.travelers} {formData.travelers === 1 ? 'traveler' : 'travelers'}
            </Text>

            {/* Total */}
            <View className="bg-ghana-green p-6 rounded-lg mb-6">
                <Text className="text-white text-sm mb-1">Estimated Total Budget</Text>
                <Text className="text-white text-4xl font-bold">
                    {formatCurrency(budget.total)}
                </Text>
                <Text className="text-white/80 text-sm mt-2">
                    ≈ {formatCurrency(Math.round(budget.total / formData.duration / formData.travelers))} per person/day
                </Text>
            </View>

            {/* Breakdown */}
            <View className="gap-3 mb-6">
                <BudgetItem label="Accommodation" amount={budget.accommodation} />
                <BudgetItem label="Food & Dining" amount={budget.food} />
                <BudgetItem label="Transportation" amount={budget.transport} />
                <BudgetItem label="Activities" amount={budget.activities} />
                <BudgetItem label="Essentials (Visa, SIM, etc.)" amount={budget.essentials} />
                {budget.flights > 0 && <BudgetItem label="International Flights" amount={budget.flights} />}
                <BudgetItem label="Contingency (10%)" amount={budget.contingency} />
            </View>

            <TouchableOpacity
                className="bg-ghana-yellow py-4 px-8 rounded-lg"
                onPress={onGenerateItinerary}
                disabled={loading}
            >
                <Text className="text-white text-center font-bold text-lg">
                    {loading ? 'Generating Itinerary...' : '✨ Generate AI Itinerary with Adepa'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function BudgetItem({ label, amount }: { label: string; amount: number }) {
    return (
        <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
            <Text className="text-gray-700">{label}</Text>
            <Text className="text-ghana-black font-semibold">{formatCurrency(amount)}</Text>
        </View>
    );
}

type StepProps = {
    formData: BudgetFormData;
    updateFormData: (updates: Partial<BudgetFormData>) => void;
};
