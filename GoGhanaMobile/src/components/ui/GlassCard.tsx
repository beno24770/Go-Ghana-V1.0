import { View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';

interface GlassCardProps extends ViewProps {
    children: ReactNode;
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
    elevated?: boolean;
}

export default function GlassCard({
    children,
    intensity = 20,
    tint = 'light',
    elevated = true,
    style,
    ...props
}: GlassCardProps) {
    return (
        <View
            className={`rounded-2xl overflow-hidden ${elevated ? 'shadow-large' : ''}`}
            style={[
                elevated && {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 16,
                    elevation: 8,
                },
                style
            ]}
            {...props}
        >
            <BlurView
                intensity={intensity}
                tint={tint}
                className="p-4"
            >
                <View className="bg-white/80 rounded-2xl p-4">
                    {children}
                </View>
            </BlurView>
        </View>
    );
}
