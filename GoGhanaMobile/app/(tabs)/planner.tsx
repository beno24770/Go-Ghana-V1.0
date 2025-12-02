import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PlannerScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white px-6 py-8">
            <View className="items-center justify-center flex-1">
                <View className="bg-ghana-green/10 p-8 rounded-full mb-6">
                    <Ionicons name="calculator" size={64} color="#15803D" />
                </View>

                <Text className="text-2xl font-bold text-ghana-black mb-4 text-center">
                    Ready to Plan Your Trip?
                </Text>

                <Text className="text-gray-600 text-center mb-8 px-4">
                    Answer a few questions and get a personalized budget breakdown for your Ghana adventure
                </Text>

                <TouchableOpacity
                    className="bg-ghana-green py-4 px-12 rounded-lg"
                    onPress={() => router.push('/budget-form')}
                >
                    <Text className="text-white text-center font-bold text-lg">
                        Start Budget Form
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
