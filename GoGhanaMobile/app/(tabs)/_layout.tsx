import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#15803D',
                tabBarInactiveTintColor: '#6B7280',
                headerStyle: {
                    backgroundColor: '#15803D',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    headerTitle: 'GoGhana AI',
                }}
            />
            <Tabs.Screen
                name="planner"
                options={{
                    title: 'Planner',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calculator" size={size} color={color} />
                    ),
                    headerTitle: 'Budget Planner',
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved Trips',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark" size={size} color={color} />
                    ),
                    headerTitle: 'My Trips',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerTitle: 'Profile',
                }}
            />
        </Tabs>
    );
}
