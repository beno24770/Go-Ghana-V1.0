import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="px-6 py-8">
                {/* Profile Header */}
                <View className="items-center mb-8">
                    <View className="bg-ghana-green w-24 h-24 rounded-full items-center justify-center mb-4">
                        <Ionicons name="person" size={48} color="white" />
                    </View>
                    <Text className="text-2xl font-bold text-ghana-black">
                        Ghana Traveler
                    </Text>
                    <Text className="text-gray-600">
                        Explore Ghana with confidence
                    </Text>
                </View>

                {/* Settings Section */}
                <View className="mb-6">
                    <Text className="text-lg font-bold text-ghana-black mb-4">
                        Settings
                    </Text>

                    <SettingItem
                        icon="notifications-outline"
                        title="Notifications"
                        subtitle="Manage your notification preferences"
                    />
                    <SettingItem
                        icon="language-outline"
                        title="Language"
                        subtitle="English"
                    />
                    <SettingItem
                        icon="moon-outline"
                        title="Dark Mode"
                        subtitle="Coming soon"
                    />
                </View>

                {/* About Section */}
                <View className="mb-6">
                    <Text className="text-lg font-bold text-ghana-black mb-4">
                        About
                    </Text>

                    <SettingItem
                        icon="information-circle-outline"
                        title="About GoGhana AI"
                        subtitle="Version 1.0.0"
                    />
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        subtitle="Get help with your trip planning"
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Privacy Policy"
                        subtitle="How we protect your data"
                    />
                </View>

                {/* Currency Info */}
                <View className="bg-ghana-green/10 p-4 rounded-lg mb-6">
                    <Text className="text-sm font-semibold text-ghana-green mb-2">
                        💱 Currency Information
                    </Text>
                    <Text className="text-gray-700">
                        All prices are shown in Ghanaian Cedis (GH₵)
                    </Text>
                    <Text className="text-gray-600 text-sm mt-1">
                        Current rate: $1 USD ≈ GH₵ 15.87
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

function SettingItem({ icon, title, subtitle }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
}) {
    return (
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
            <View className="bg-ghana-green/10 p-3 rounded-full mr-4">
                <Ionicons name={icon} size={20} color="#15803D" />
            </View>
            <View className="flex-1">
                <Text className="text-ghana-black font-semibold mb-1">{title}</Text>
                <Text className="text-gray-600 text-sm">{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
    );
}
