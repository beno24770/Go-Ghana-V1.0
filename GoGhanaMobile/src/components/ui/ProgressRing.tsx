import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
    progress: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showPercentage?: boolean;
    animated?: boolean;
}

export default function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    color = '#15803D',
    backgroundColor = '#E5E7EB',
    showPercentage = true,
    animated = true,
}: ProgressRingProps) {
    const animatedProgress = useSharedValue(0);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        if (animated) {
            animatedProgress.value = withTiming(progress, {
                duration: 1000,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            });
        } else {
            animatedProgress.value = progress;
        }
    }, [progress, animated, animatedProgress]);

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = circumference - (circumference * animatedProgress.value) / 100;
        return {
            strokeDashoffset,
        };
    });

    return (
        <View className="items-center justify-center" style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* Progress Circle */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    animatedProps={animatedProps}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>

            {showPercentage && (
                <View className="absolute items-center justify-center">
                    <Text className="text-2xl font-bold" style={{ color }}>
                        {Math.round(progress)}%
                    </Text>
                </View>
            )}
        </View>
    );
}
