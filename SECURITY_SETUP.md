# 🔒 API Security Setup Guide

## Overview
This guide will help you secure your GoGhana AI application by setting up Firebase Functions to protect your Gemini API key.

## ⚠️ CRITICAL: Rotate Your API Key

**Your Gemini API key was previously exposed in the source code.** You must rotate it immediately:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Delete the old API key: `AIzaSyAY4e3w9o5mJsmwNsojXOIzzMt9LsEZqNA`
3. Create a new API key
4. Save the new key for the next steps

## Phase 1: Environment Variables (Completed ✅)

The hardcoded API keys have been removed from the codebase. Now you need to configure your environment:

### Local Development

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your **NEW** Gemini API key:
   ```bash
   VITE_GEMINI_API_KEY=your_new_gemini_api_key_here
   ```

3. Test locally:
   ```bash
   npm run dev
   ```

## Phase 2: Firebase Functions Setup

### Prerequisites

- Firebase project (you already have one)
- Firebase Blaze plan (pay-as-you-go) - **Required for Cloud Functions**

### Step 1: Upgrade to Blaze Plan

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Upgrade" in the bottom left
4. Choose "Blaze" plan (pay-as-you-go)
   - Don't worry: Firebase has a generous free tier
   - You'll only pay if you exceed the free quota

### Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase

```bash
firebase login
```

### Step 4: Initialize Firebase (if not already done)

```bash
firebase init
```

Select:
- ✅ Functions
- ✅ Firestore (if not already set up)

### Step 5: Install Functions Dependencies

```bash
cd functions
npm install
cd ..
```

### Step 6: Configure Gemini API Key (Server-Side)

Set your **NEW** Gemini API key as a Firebase Functions config:

```bash
firebase functions:config:set gemini.apikey="YOUR_NEW_GEMINI_API_KEY"
```

### Step 7: Deploy Functions

```bash
firebase deploy --only functions
```

This will deploy three functions:
- `generateChatResponse` - For Adepa chat
- `generateItinerary` - For AI itinerary generation
- `verifyRecommendation` - For recommendation verification

### Step 8: Update Vercel Environment Variables

Since you're deploying to Vercel, you need to remove the client-side API key:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. **Remove** `VITE_GEMINI_API_KEY` (it's no longer needed on the client)
5. Keep all Firebase config variables

### Step 9: Deploy to Vercel

```bash
git add .
git commit -m "feat: secure API keys with Firebase Functions backend"
git push
```

Vercel will automatically redeploy.

## Phase 3: Verification

### Test Rate Limiting

The backend now includes rate limiting:
- **Chat**: 50 requests per hour per user
- **Itinerary**: 10 generations per day per user
- **Verification**: 30 requests per hour per user

Try making multiple rapid requests to test the limits.

### Monitor Usage

1. **Firebase Console**: Check Functions logs and usage
2. **Google AI Studio**: Monitor API usage

## Security Features Implemented

✅ **API Key Protection**: Keys are now server-side only  
✅ **Authentication**: All functions require Firebase Auth  
✅ **Rate Limiting**: Prevents API abuse  
✅ **Error Handling**: Graceful degradation  
✅ **Firestore Tracking**: Rate limits stored in database  

## Cost Estimates

### Firebase Functions (Blaze Plan)
- **Free tier**: 2M invocations/month
- **After free tier**: $0.40 per million invocations
- **Your usage**: Likely to stay within free tier

### Gemini API
- **Free tier**: 15 requests per minute, 1500 per day
- **Paid tier**: Varies by model

## Troubleshooting

### "API Key not configured" error
- Run: `firebase functions:config:get`
- Verify `gemini.apikey` is set
- Re-run: `firebase functions:config:set gemini.apikey="YOUR_KEY"`

### Functions not deploying
- Check Firebase plan (must be Blaze)
- Check `firebase.json` exists
- Run: `firebase deploy --only functions --debug`

### Rate limit errors
- Check Firestore for `rateLimits` collection
- Manually delete documents to reset limits (for testing)

## Rollback Plan

If you need to rollback to direct API calls:

1. In `src/services/llmService.ts`, change:
   ```typescript
   this.useBackend = false; // Set to false
   ```

2. Add `VITE_GEMINI_API_KEY` back to `.env.local` and Vercel

3. Redeploy

## Next Steps

- [ ] Rotate your Gemini API key
- [ ] Set up Firebase Functions
- [ ] Deploy to production
- [ ] Monitor usage and costs
- [ ] Consider implementing additional security measures (App Check, CORS)

## Support

If you encounter issues:
1. Check Firebase Functions logs: `firebase functions:log`
2. Check browser console for errors
3. Verify authentication is working
