# 🔥 Firebase Setup & Configuration Guide

## Issue Fixed: Local Mode Authentication Bypass

**Status**: ✅ **TEMPORARY FIX DEPLOYED**

The Firebase authentication error has been temporarily bypassed for Local Mode. Users can now access the Local Estimator without encountering the "api-key-not-valid" error.

### What Was Changed
- Local Mode now skips the authentication step
- Users go directly to the Local Estimator when toggling Local Mode ON
- This is a **temporary solution** until Firebase is properly configured

---

## 🎯 Permanent Solution: Firebase Setup

To re-enable authentication and unlock full features (user accounts, saved trips, etc.), follow these steps:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select existing project
3. Enter project name: `goghana-app` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click **"Create project"**

### Step 2: Add Web App to Firebase Project

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Register app with nickname: `GoGhana Web App`
3. **Do NOT** check "Also set up Firebase Hosting" (we use Vercel)
4. Click **"Register app"**
5. Copy the Firebase configuration object shown

### Step 3: Enable Authentication Methods

1. In Firebase Console sidebar, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable the following providers:
   - ✅ **Email/Password** (click, toggle on, save)
   - ✅ **Google** (click, add your email as project support email, save)
5. Click **"Save"**

### Step 4: Create Firestore Database

1. In Firebase Console sidebar, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we have security rules)
4. Choose location: **us-central** (or closest to Ghana: europe-west)
5. Click **"Enable"**

### Step 5: Set Up Firestore Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace with the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Trips collection
    match /trips/{tripId} {
      allow read, write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    
    // Consultation requests
    match /consultations/{consultationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 6: Update Environment Variables

#### For Local Development

1. Open `.env.local` in your project root
2. Replace the placeholder values with your Firebase config:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Restart your dev server** for changes to take effect:
```bash
npm run dev
```

#### For Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `goghana-budget-estimator`
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Variable name: `VITE_FIREBASE_API_KEY`
   - Value: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **"Save"**
5. Repeat for all 6 Firebase variables
6. **Redeploy** your app for changes to take effect

### Step 7: Re-enable Authentication in Code

Once Firebase is configured, update `src/App.tsx`:

**Find this code** (around line 167):
```typescript
// Local Mode Toggle Handler
const handleLocalModeToggle = (enabled: boolean) => {
  setIsLocalMode(enabled);
  if (enabled) {
    // Skip authentication for Local Mode (temporary fix for Firebase issue)
    // TODO: Re-enable authentication once Firebase is properly configured
    setCurrentStep(12); // Go directly to Local Estimator
  } else {
    setCurrentStep(1);
  }
};
```

**Replace with**:
```typescript
// Local Mode Toggle Handler
const handleLocalModeToggle = (enabled: boolean) => {
  setIsLocalMode(enabled);
  if (enabled) {
    if (user) {
      setCurrentStep(12); // Go to Local Estimator
    } else {
      setCurrentStep(13); // Go to Local Auth Page
    }
  } else {
    setCurrentStep(1);
  }
};
```

### Step 8: Test Authentication

1. Toggle **Local Mode ON**
2. You should see the Local Auth Page (not an error)
3. Try creating an account with:
   - Name: Test User
   - Phone: 024 123 4567
   - Email: test@example.com
   - Password: test123
4. Verify you can sign up and access Local Estimator

---

## 🔒 Security Considerations

### Current Status (Temporary Fix)
- ❌ No user authentication for Local Mode
- ❌ Cannot save user preferences
- ❌ Cannot save trips to dashboard
- ❌ Cannot track user activity

### After Firebase Setup
- ✅ Secure user authentication
- ✅ Users can save favorite trips
- ✅ Access to personalized dashboard
- ✅ Consultation booking history
- ✅ PDF download with user data

---

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/api-key-not-valid)"
**Solution**: Your `.env.local` file has placeholder values. Follow Step 6 above.

### Error: "Firebase: Error (auth/operation-not-allowed)"
**Solution**: Email/Password authentication not enabled. Follow Step 3 above.

### Error: "Missing permissions"
**Solution**: Firestore security rules not set. Follow Step 5 above.

### Changes not reflecting after updating .env.local
**Solution**: 
1. Stop dev server (Ctrl+C)
2. Restart: `npm run dev`
3. Hard refresh browser (Ctrl+Shift+R)

### Vercel deployment not using new env variables
**Solution**:
1. Verify variables are saved in Vercel dashboard
2. Go to **Deployments** tab
3. Click **"..."** on latest deployment → **"Redeploy"**

---

## 📋 Checklist

Before re-enabling authentication, ensure:

- [ ] Firebase project created
- [ ] Web app added to Firebase project
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled (optional)
- [ ] Firestore database created
- [ ] Security rules published
- [ ] `.env.local` updated with real Firebase config
- [ ] Vercel environment variables updated
- [ ] Dev server restarted
- [ ] Tested sign-up flow locally
- [ ] Code updated to re-enable auth check
- [ ] Changes committed and pushed
- [ ] Vercel redeployed

---

## 🚀 Next Steps

1. **Immediate**: The app works without authentication (current state)
2. **Short-term**: Set up Firebase following this guide
3. **Long-term**: Add additional features:
   - Social login (Facebook, Twitter)
   - Phone number verification (SMS)
   - Email verification
   - Password reset functionality
   - User profile management

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Check browser console for detailed errors
3. Verify all environment variables are set correctly
4. Ensure Firestore rules are published

---

**Last Updated**: December 1, 2025  
**Status**: Temporary bypass active, Firebase setup pending
