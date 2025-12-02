import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface AnimatedCounterProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    size?: 'small' | 'medium' | 'large';
}

export default function AnimatedCounter({
    value,
    onChange,
    min = 1,
    max = 99,
    label,
    size = 'large',
}: AnimatedCounterProps) {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withSpring(1.1, {}, () => {
            scale.value = withSpring(1);
        });
    }, [value]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const sizeClasses = {
        small: {
            button: 'w-10 h-10',
            icon: 20,
            value: 'text-3xl',
            container: 'px-6 py-3',
        },
        medium: {
            button: 'w-12 h-12',
            icon: 24,
            value: 'text-4xl',
            container: 'px-8 py-4',
        },
        large: {
            button: 'w-14 h-14',
            icon: 28,
            value: 'text-5xl',
            container: 'px-12 py-6',
        },
    };

    const config = sizeClasses[size];

    return (
        <View className="flex-row items-center justify-center gap-6 my-8">
            {/* Decrement Button */}
            <TouchableOpacity
                onPress={handleDecrement}
                disabled={value <= min}
                className={`
          ${config.button}
          bg-ghana-green-500 
          rounded-2xl 
          items-center 
          justify-center
          ${value <= min ? 'opacity-40' : ''}
        `}
                style={{
                    shadowColor: '#15803D',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                }}
            >
                <Ionicons name="remove" size={config.icon} color="white" />
            </TouchableOpacity>

            {/* Value Display */}
            <View
                className={`
          ${config.container}
          bg-ghana-green-50 
          rounded-2xl 
          items-center 
          justify-center
          border-2
          border-ghana-green-200
        `}
            >
                <Animated.View style={animatedStyle}>
                    <Text className={`${config.value} font-bold text-ghana-green-600`}>
                        {value}
                    </Text>
                </Animated.View>
                {label && (
                    <Text className="text-ghana-green-600 font-medium mt-1">
                        {label}
                    </Text>
                )}
            </View>

            {/* Increment Button */}
            <TouchableOpacity
                onPress={handleIncrement}
                disabled={value >= max}
                className={`
          ${config.button}
          bg-ghana-green-500 
          rounded-2xl 
          items-center 
          justify-center
          ${value >= max ? 'opacity-40' : ''}
        `}
                style={{
                    shadowColor: '#15803D',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                }}
            >
                <Ionicons name="add" size={config.icon} color="white" />
            </TouchableOpacity>
        </View>
    );
}
