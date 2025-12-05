/* eslint-disable no-undef, @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                // Ghana Green Palette
                'ghana-green': {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#15803D', // Main
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },

                // Ghana Gold/Yellow Palette
                'ghana-gold': {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#D97706', // Main
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },

                // Ghana Red Palette
                'ghana-red': {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#B91C1C', // Main
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },

                // Warm Neutrals
                'warm-gray': {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                },

                // Legacy colors (for compatibility)
                'ghana-black': '#111827',
                'soft-ivory': '#F9FAFB',
                'primary': '#15803D',
                'secondary': '#F3F4F6',
                'accent': '#D97706',
                'background': '#FFFFFF',
                'text': '#111827',
            },

            // Gradient utilities
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #15803D, #0f5a2a)',
                'gradient-gold': 'linear-gradient(135deg, #fbbf24, #D97706)',
                'gradient-sunset': 'linear-gradient(135deg, #D97706, #B91C1C)',
                'gradient-ghana': 'linear-gradient(135deg, #B91C1C, #D97706, #15803D)',
            },

            // Enhanced shadows
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
                'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
                'xl': '0 12px 48px rgba(0, 0, 0, 0.15)',
                'glow-green': '0 0 20px rgba(21, 128, 61, 0.3)',
                'glow-gold': '0 0 20px rgba(217, 119, 6, 0.3)',
            },

            // Border radius
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },

            // Animations
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            },

            // Typography
            fontFamily: {
                'sans': ['System'],
                'heading': ['System'], // Can be replaced with Plus Jakarta Sans
                'body': ['System'], // Can be replaced with Inter
            },

            fontSize: {
                'hero': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
                'display': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
                'title': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
            },
        },
    },
    plugins: [],
}
