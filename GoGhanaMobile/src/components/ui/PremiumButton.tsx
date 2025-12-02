import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface PremiumButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof Ionicons.glyphMap;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
}

export default function PremiumButton({
    onPress,
    children,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'right',
    loading = false,
    disabled = false,
    fullWidth = false,
}: PremiumButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.96);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const sizeClasses = {
        small: 'py-2 px-4',
        medium: 'py-3 px-6',
        large: 'py-4 px-8',
    };

    const textSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    const iconSizes = {
        small: 16,
        medium: 20,
        large: 24,
    };

    if (variant === 'gradient') {
        return (
            <Animated.View style={animatedStyle}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={disabled || loading}
                    activeOpacity={0.8}
                    className={fullWidth ? 'w-full' : ''}
                >
                    <LinearGradient
                        colors={['#fbbf24', '#D97706']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className={`rounded-2xl ${sizeClasses[size]} ${disabled ? 'opacity-50' : ''}`}
                        style={{ shadowColor: '#D97706', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
                    >
                        <View className="flex-row items-center justify-center gap-2">
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    {icon && iconPosition === 'left' && (
                                        <Ionicons name={icon} size={iconSizes[size]} color="white" />
                                    )}
                                    <Text className={`text-white font-bold ${textSizeClasses[size]}`}>
                                        {children}
                                    </Text>
                                    {icon && iconPosition === 'right' && (
                                        <Ionicons name={icon} size={iconSizes[size]} color="white" />
                                    )}
                                </>
                            )}
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    const variantClasses = {
        primary: 'bg-ghana-green-500',
        secondary: 'bg-warm-gray-100 border-2 border-warm-gray-300',
        ghost: 'bg-transparent',
    };

    const textColorClasses = {
        primary: 'text-white',
        secondary: 'text-ghana-green-700',
        ghost: 'text-ghana-green-600',
    };

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={0.8}
                className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          rounded-2xl
          ${disabled ? 'opacity-50' : ''}
          ${fullWidth ? 'w-full' : ''}
        `}
            >
                <View className="flex-row items-center justify-center gap-2">
                    {loading ? (
                        <ActivityIndicator color={variant === 'primary' ? 'white' : '#15803D'} />
                    ) : (
                        <>
                            {icon && iconPosition === 'left' && (
                                <Ionicons
                                    name={icon}
                                    size={iconSizes[size]}
                                    color={variant === 'primary' ? 'white' : '#15803D'}
                                />
                            )}
                            <Text className={`font-bold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
                                {children}
                            </Text>
                            {icon && iconPosition === 'right' && (
                                <Ionicons
                                    name={icon}
                                    size={iconSizes[size]}
                                    color={variant === 'primary' ? 'white' : '#15803D'}
                                />
                            )}
                        </>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
