# GoGhana Mobile - Installation & Testing Guide

## 🚀 Quick Start (PowerShell Workaround)

Since PowerShell has script execution restrictions, use **Command Prompt** or **Git Bash** instead:

### Option 1: Using Command Prompt (Recommended)

1. **Open Command Prompt** (not PowerShell):
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to the project**:
   ```cmd
   cd C:\Users\PC\Desktop\goghana-budget-estimator\GoGhanaMobile
   ```

3. **Install dependencies**:
   ```cmd
   npm install
   ```

4. **Set up environment variables**:
   ```cmd
   copy .env.example .env
   ```
   
   Then open `.env` in a text editor and add your Gemini API key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Start the development server**:
   ```cmd
   npm start
   ```

6. **Run the app**:
   - Press `i` for iOS Simulator (Mac only)
   - Press `a` for Android Emulator
   - Scan QR code with **Expo Go** app on your phone

### Option 2: Using Git Bash

If you have Git installed:

```bash
cd /c/Users/PC/Desktop/goghana-budget-estimator/GoGhanaMobile
npm install
cp .env.example .env
# Edit .env to add your API key
npm start
```

### Option 3: Fix PowerShell Execution Policy

If you prefer PowerShell, run this **as Administrator**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then you can use PowerShell normally.

---

## 📱 Testing on Physical Device

### Android
1. Install **Expo Go** from Google Play Store
2. Make sure your phone and computer are on the same WiFi
3. Scan the QR code from the terminal

### iOS
1. Install **Expo Go** from App Store
2. Make sure your phone and computer are on the same WiFi
3. Scan the QR code using the Camera app

---

## 🧪 Manual Testing Checklist

Once the app is running, test these features:

### ✅ Navigation
- [ ] Tap through all 4 tabs (Home, Planner, Saved Trips, Profile)
- [ ] Verify tab icons and labels are correct
- [ ] Check Ghana green theme is applied

### ✅ Budget Form Flow
- [ ] Start budget form from Home or Planner tab
- [ ] Step 1: Adjust duration with +/- buttons
- [ ] Step 2: Set travelers and travel type
- [ ] Step 3: Select accommodation level
- [ ] Step 4: Choose multiple activities
- [ ] Step 5: Toggle flights and insurance
- [ ] Step 6: View budget summary
- [ ] Verify progress bar updates correctly
- [ ] Test Back button navigation

### ✅ Budget Calculation
- [ ] Create a budget with these settings:
  - Duration: 7 days
  - Travelers: 2
  - Type: Couple
  - Accommodation: Mid-range
  - Activities: Culture, Food
  - Insurance: Yes
  - Flights: No
- [ ] Expected total should be around GH₵ 15,000-20,000
- [ ] Verify all categories show amounts

### ✅ AI Itinerary Generation
- [ ] Click "Generate AI Itinerary with Adepa"
- [ ] Wait for AI response (may take 10-30 seconds)
- [ ] Verify itinerary appears with day-by-day breakdown
- [ ] Check if save prompt appears

### ✅ Itinerary Display
- [ ] Tap a day card to expand it
- [ ] Verify animations are smooth
- [ ] Check morning/afternoon/evening activities appear
- [ ] Verify meals and accommodation show
- [ ] Test collapse/expand multiple days

### ✅ Saved Trips
- [ ] Save a trip with a custom name
- [ ] Navigate to Saved Trips tab
- [ ] Verify trip appears in list
- [ ] Tap trip to view full itinerary
- [ ] Test delete functionality

### ✅ Offline Mode
- [ ] Generate and save a trip
- [ ] Enable airplane mode on device
- [ ] Navigate to Saved Trips
- [ ] Open a saved trip
- [ ] Verify itinerary loads from cache

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'expo'"
**Solution**: Run `npm install` in the GoGhanaMobile directory

### Issue: "Metro bundler failed to start"
**Solution**: 
```cmd
npm start -- --clear
```

### Issue: "Network response timed out"
**Solution**: Make sure phone and computer are on same WiFi network

### Issue: QR code won't scan
**Solution**: 
- Try typing the URL manually in Expo Go
- Or use tunnel mode: `npm start -- --tunnel`

### Issue: AI generation fails
**Solution**: 
- Verify your Gemini API key is correct in `.env`
- Check internet connection
- API key should start with `AIza...`

---

## 📊 Expected Test Results

### Budget Calculation Test Cases

**Test 1: 7-day mid-range couple**
- Accommodation: ~GH₵ 4,900
- Food: ~GH₵ 1,960
- Transport: ~GH₵ 4,900
- Activities: ~GH₵ 630
- Essentials: ~GH₵ 3,700
- Total: ~GH₵ 17,700

**Test 2: 5-day luxury solo (December + flights)**
- Should include seasonal multiplier (1.35x)
- Should include flight cost (~GH₵ 14,283)
- Total: ~GH₵ 40,000+

**Test 3: 10-day backpacker (February)**
- Should have lowest costs
- February multiplier (0.9x)
- Total: ~GH₵ 6,000-8,000

---

## 🎯 Success Criteria

The app is working correctly if:

✅ All tabs navigate smoothly
✅ Budget form completes all 6 steps
✅ Budget calculations match expected ranges
✅ AI generates valid JSON itineraries
✅ Trips save and load from storage
✅ Offline mode works for saved trips
✅ Ghana theme colors display correctly
✅ Animations are smooth (no lag)

---

## 📝 Next Steps After Testing

Once testing is complete:

1. **Report Issues**: Note any bugs or unexpected behavior
2. **Performance**: Check if animations are smooth on your device
3. **UI Feedback**: Suggest any design improvements
4. **Features**: Request additional functionality
5. **Deployment**: Prepare for App Store/Play Store submission

---

## 🆘 Need Help?

If you encounter issues:

1. Check the terminal for error messages
2. Try clearing cache: `npm start -- --clear`
3. Restart the Metro bundler
4. Reinstall dependencies: `rm -rf node_modules && npm install`
5. Check Expo documentation: https://docs.expo.dev
