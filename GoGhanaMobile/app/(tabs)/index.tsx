import { View, Text, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PremiumButton from '../../src/components/ui/PremiumButton';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Hero Section with Gradient */}
            <LinearGradient
                colors={['#15803D', '#0f5a2a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-6 pt-12 pb-16"
            >
                <View className="items-center">
                    <Text className="text-5xl font-bold text-white mb-3 text-center">
                        Akwaaba! 🇬🇭
                    </Text>
                    <Text className="text-xl text-white/90 mb-8 text-center px-4">
                        Plan your perfect Ghana adventure with AI-powered insights
                    </Text>

                    <PremiumButton
                        variant="gradient"
                        size="large"
                        icon="arrow-forward"
                        onPress={() => router.push('/budget-form')}
                        fullWidth
                    >
                        Start Your Journey
                    </PremiumButton>
                </View>
            </LinearGradient>

            {/* Features Section */}
            <View className="px-6 py-8 -mt-8">
                <View className="bg-white rounded-3xl p-6 shadow-large mb-6">
                    <Text className="text-2xl font-bold text-ghana-black mb-6">
                        Why GoGhana AI?
                    </Text>

                    <View className="space-y-4">
                        <FeatureCard
                            icon="calculator"
                            iconColor="#15803D"
                            title="Smart Budget Planning"
                            description="Get accurate cost estimates based on your travel style and preferences"
                        />
                        <FeatureCard
                            icon="sparkles"
                            iconColor="#D97706"
                            title="AI-Powered Itineraries"
                            description="Adepa, your AI guide, creates personalized day-by-day plans"
                        />
                        <FeatureCard
                            icon="cloud-offline"
                            iconColor="#15803D"
                            title="Offline Access"
                            description="Save your trips and access them anytime, even without internet"
                        />
                        <FeatureCard
                            icon="heart"
                            iconColor="#B91C1C"
                            title="Local Experiences"
                            description="Discover authentic Ghanaian culture, food, and hidden gems"
                        />
                    </View>
                </View>

                {/* Quick Start Guide */}
                <View className="bg-ghana-green-50 rounded-3xl p-6 mb-6">
                    <Text className="text-xl font-bold text-ghana-green-700 mb-4">
                        Quick Start Guide
                    </Text>
                    <View className="space-y-3">
                        <StepCard number={1} text="Tell us about your trip preferences" />
                        <StepCard number={2} text="Get your personalized budget breakdown" />
                        <StepCard number={3} text="Receive AI-generated itinerary from Adepa" />
                        <StepCard number={4} text="Save and access your trip offline" />
                    </View>
                </View>

                {/* CTA */}
                <PremiumButton
                    variant="primary"
                    size="large"
                    icon="calculator"
                    onPress={() => router.push('/planner')}
                    fullWidth
                >
                    Create Your Budget Now
                </PremiumButton>
            </View>
        </ScrollView>
    );
}

function FeatureCard({ icon, iconColor, title, description }: {
    icon: keyof typeof Ionicons.glyphMap;
    iconColor: string;
    title: string;
    description: string;
}) {
    return (
        <View className="flex-row items-start mb-4">
            <View
                className="p-3 rounded-2xl mr-4"
                style={{ backgroundColor: iconColor + '15' }}
            >
                <Ionicons name={icon} size={28} color={iconColor} />
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold text-ghana-black mb-1">{title}</Text>
                <Text className="text-warm-gray-600 leading-5">{description}</Text>
            </View>
        </View>
    );
}

function StepCard({ number, text }: { number: number; text: string }) {
    return (
        <View className="flex-row items-center">
            <LinearGradient
                colors={['#fbbf24', '#D97706']}
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
            >
                <Text className="text-white font-bold text-lg">{number}</Text>
            </LinearGradient>
            <Text className="text-ghana-green-700 flex-1 font-medium">{text}</Text>
        </View>
    );
}
