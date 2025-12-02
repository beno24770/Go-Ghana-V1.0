# GoGhana Mobile

React Native mobile app for GoGhana AI - Your intelligent Ghana travel planning companion.

## 🚀 Features

- **Smart Budget Planning**: Get accurate cost estimates based on your travel style
- **AI-Powered Itineraries**: Personalized day-by-day plans from Adepa, your AI guide
- **Offline Access**: Save trips and access them without internet
- **Ghana-Themed Design**: Beautiful UI with Ghana's national colors

## 📱 Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **NativeWind** (Tailwind CSS for React Native)
- **React Native Reanimated** for smooth animations
- **Google Gemini AI** for itinerary generation
- **AsyncStorage** for local data persistence

## 🛠️ Setup

### Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Gemini API key:
     ```
     EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
     ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on device/simulator**:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📂 Project Structure

```
GoGhanaMobile/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── planner.tsx    # Planner screen
│   │   ├── saved.tsx      # Saved trips
│   │   └── profile.tsx    # Profile/settings
│   ├── budget-form.tsx    # Multi-step budget form
│   └── itinerary/[id].tsx # Itinerary detail view
├── src/
│   ├── types/             # TypeScript interfaces
│   ├── data/              # Cost data and constants
│   ├── utils/             # Budget calculations
│   └── services/          # AI and storage services
└── assets/                # Images and fonts
```

## 🎨 Design System

The app uses Ghana's national colors:
- **Ghana Green** (#15803D) - Primary color
- **Ghana Yellow** (#D97706) - Accent color
- **Ghana Red** (#B91C1C) - Alerts/warnings

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📦 Building

### Development Build
```bash
npx expo prebuild
```

### Production Build
```bash
eas build --platform ios
eas build --platform android
```

## 🤝 Contributing

This is part of the GoGhana project. See the main web app repository for contribution guidelines.

## 📄 License

Copyright © 2025 GoGhana AI
