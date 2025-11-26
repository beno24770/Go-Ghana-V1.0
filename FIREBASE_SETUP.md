# Firebase Setup Guide

Follow these steps to configure Firebase for the GoGhana Budget Estimator.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `goghana-budget-estimator` (or your preferred name)
4. Disable Google Analytics (optional, can enable later)
5. Click "Create project"

## Step 2: Add Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Register app with nickname: `GoGhana Budget Estimator`
3. **Do NOT** check "Also set up Firebase Hosting" (we'll use Vercel/Netlify)
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need these values

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click "Get started"
3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google** sign-in:
   - Click on "Google"
   - Toggle "Enable"
   - Enter support email (your email)
   - Click "Save"

## Step 4: Create Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Select **Start in production mode** (we'll add security rules)
4. Choose Cloud Firestore location (select closest to your users, e.g., `us-central1` or `europe-west1`)
5. Click "Enable"

## Step 5: Deploy Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the content from `firestore.rules` file in the project root
3. Click "Publish"

## Step 6: Configure Environment Variables

1. Create a file named `.env.local` in the project root (next to `package.json`)
2. Copy the Firebase config values from Step 2
3. Add them to `.env.local`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

4. Save the file
5. **IMPORTANT**: Never commit `.env.local` to Git (it's already in `.gitignore`)

## Step 7: Test the Setup

1. Restart the dev server:
   ```bash
   npm run dev
   ```

2. Open the browser console (F12)
3. You should NOT see any Firebase errors
4. If you see errors, double-check your environment variables

## Step 8: Set Up Firebase CLI (Optional - for deploying rules)

If you want to deploy Firestore rules from the command line:

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that `.env.local` exists and has correct values
- Restart the dev server after creating `.env.local`

### "Missing or insufficient permissions"
- Check that Firestore security rules are deployed
- Verify you're signed in with the correct account

### "API key not valid"
- Verify the API key in `.env.local` matches Firebase Console
- Check for extra spaces or quotes in the `.env.local` file

## Next Steps

Once Firebase is configured, you can:
- Sign up for an account in the app
- Save trip plans to the cloud
- Access your trips from any device
- Use Google sign-in for quick authentication

## Security Notes

- Never share your `.env.local` file
- Never commit Firebase config to public repositories
- Review Firestore security rules regularly
- Enable App Check for production (optional but recommended)
