import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#15803D',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="budget-form"
                    options={{
                        title: 'Plan Your Trip',
                        presentation: 'card'
                    }}
                />
                <Stack.Screen
                    name="itinerary/[id]"
                    options={{
                        title: 'Your Itinerary',
                        presentation: 'card'
                    }}
                />
            </Stack>
        </>
    );
}
