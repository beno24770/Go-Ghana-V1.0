# Vercel Edge Functions Deployment Guide

## What We've Implemented

Instead of Firebase Functions, we've created **Vercel Edge Functions** which integrate seamlessly with your existing Vercel deployment.

### Created Files:
- `api/generate-chat-response.ts` - Handles Adepa chat interactions
- `api/generate-itinerary.ts` - Generates AI-powered itineraries  
- `api/verify-recommendation.ts` - Verifies accommodation/activity recommendations
- `vercel.json` - Configuration for Edge Functions runtime

### Updated Files:
- `src/services/llmService.ts` - Now calls Vercel API routes instead of direct Gemini API

## Deployment Steps

### 1. Configure Environment Variable in Vercel

Your Gemini API key needs to be set as a **server-side** environment variable in Vercel:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (goghana-budget-estimator)
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyDk9_1WqstmxwbKm3VWUepqo4TbE1J-QUY`
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

### 2. Deploy to Vercel

```bash
git add .
git commit -m "feat: implement Vercel Edge Functions for secure API backend"
git push
```

Vercel will automatically detect the changes and deploy.

### 3. Remove Client-Side API Key (Optional but Recommended)

After deployment, you can remove `VITE_GEMINI_API_KEY` from:
- Your local `.env.local` file (keep it for local development if needed)
- Vercel environment variables (the `VITE_` prefixed one)

The app will now use the server-side `GEMINI_API_KEY` through the Edge Functions.

## How It Works

### Before (Insecure):
```
Browser → Direct API Call → Gemini API (with exposed key)
```

### After (Secure):
```
Browser → Vercel Edge Function → Gemini API (key hidden server-side)
```

## Benefits

✅ **API Key Protection**: Key is server-side only, never exposed to clients  
✅ **No Authentication Setup**: Works immediately with your Vercel deployment  
✅ **Edge Performance**: Functions run at the edge for low latency  
✅ **Auto-Scaling**: Vercel handles scaling automatically  
✅ **Simple Deployment**: Just `git push` to deploy  

## Testing Locally

To test the Edge Functions locally:

```bash
npm install -g vercel
vercel dev
```

This will start a local development server with the Edge Functions running.

## Troubleshooting

### "AI service not configured" error
- Verify `GEMINI_API_KEY` is set in Vercel environment variables
- Redeploy after adding the variable

### Functions not found (404)
- Ensure `api/` directory is in the root of your project
- Check `vercel.json` is present
- Redeploy

### CORS errors
- Edge Functions automatically handle CORS for same-origin requests
- If deploying to a custom domain, ensure it matches your Vercel deployment

## Next Steps

After deployment:
1. Test the chat feature (Adepa)
2. Test itinerary generation
3. Verify no API key is visible in browser network requests
4. Monitor usage in Vercel dashboard

## Cost Considerations

- **Vercel Edge Functions**: Free tier includes 100GB-hours/month
- **Gemini API**: Same as before, no change in API costs
- Your usage will likely stay within free tiers
