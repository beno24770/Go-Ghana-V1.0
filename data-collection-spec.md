# GoGhana Budget Estimator - Data Collection Specification
**Version:** 1.0  
**Date:** November 28, 2024  
**Purpose:** Complete data requirements for F-01 (Smart Budget Estimator)  
**Target Audience:** Data Collection Team

---

## 📋 Table of Contents

1. [Overview & Objectives](#1-overview--objectives)
2. [Data Collection Priorities](#2-data-collection-priorities)
3. [Cost Data Specifications](#3-cost-data-specifications)
4. [Accommodation Data](#4-accommodation-data)
5. [Restaurant & Food Data](#5-restaurant--food-data)
6. [Transport Data](#6-transport-data)
7. [Activity & Attraction Data](#7-activity--attraction-data)
8. [Regional Information](#8-regional-information)
9. [Tour Packages](#9-tour-packages)
10. [Seasonal & Event Data](#10-seasonal--event-data)
11. [Data Formats & Templates](#11-data-formats--templates)
12. [Quality Assurance](#12-quality-assurance)

---

## 1. Overview & Objectives

### 1.1. Purpose
This document specifies ALL data required to make the GoGhana Budget Estimator F-01 feature production-ready with accurate, comprehensive, and up-to-date information for travelers planning trips to Ghana.

### 1.2. Success Criteria
- **Accuracy:** All prices within ±10% of current market rates
- **Coverage:** Minimum data points met for all 16 regions
- **Recency:** All data collected/verified within last 30 days
- **Completeness:** 100% of required fields populated
- **Quality:** All data validated against specified rules

### 1.3. Timeline
- **Data Collection:** 2 weeks
- **Validation:** 3 days
- **Integration:** 2 days
- **Total:** 3 weeks

---

## 2. Data Collection Priorities

### 🔴 CRITICAL (Week 1)
1. **Base Cost Validation** - Accommodation, food, transport daily rates
2. **Accra Data** - Complete coverage for Greater Accra region
3. **Top 5 Regions** - Accra, Ashanti, Central, Eastern, Volta
4. **Transport Costs** - All modes with current pricing

### 🟡 HIGH (Week 2)
5. **Remaining 11 Regions** - Northern, Western, etc.
6. **Activity Pricing** - Top 50 attractions with costs
7. **Restaurant Database** - 100+ restaurants with menus
8. **Seasonal Pricing** - Validate multipliers for 2024-2025

### 🟢 MEDIUM (Ongoing)
9. **Tour Packages** - 30+ curated tours
10. **Event Calendar** - Festivals, holidays, peak dates
11. **Safety Information** - Regional advisories

---

## 3. Cost Data Specifications

### 3.1. Accommodation Costs (Per Night, Per Room)

**Data Required:** Daily accommodation rates for 5 travel styles across all regions.

#### Collection Method
- Survey 10+ hotels per region per category
- Use Booking.com, Hotels.com, Airbnb for verification
- Collect prices for December 2024 (peak season)
- Calculate average and validate against current estimates

#### Data Template

| Region | Backpacker | Budget | Mid-Range | Comfort | Luxury |
|--------|-----------|--------|-----------|---------|--------|
| Greater Accra | 150-200 GHS | 250-300 GHS | 400-500 GHS | 800-1000 GHS | 1500-2000 GHS |
| Ashanti | ? | ? | ? | ? | ? |
| Central | ? | ? | ? | ? | ? |
| ... | ... | ... | ... | ... | ... |

**Current Estimates (Validate These):**
```typescript
accommodation: {
  backpacker: 120,  // ⚠️ May be too low
  budget: 220,      // ✅ Likely accurate
  mid: 350,         // ✅ Likely accurate
  comfort: 800,     // ✅ Likely accurate
  luxury: 1550      // ⚠️ Verify against 5-star hotels
}
```

**Validation Rules:**
- Backpacker: Hostels, budget guesthouses (shared bathroom)
- Budget: 2-star hotels, private guesthouses (private bathroom)
- Mid-Range: 3-star hotels, quality Airbnb
- Comfort: 4-star hotels, boutique hotels
- Luxury: 5-star hotels, luxury resorts

**Sources:**
- Booking.com (filter by star rating)
- Airbnb (filter by price range)
- Direct hotel websites
- TripAdvisor reviews for validation

---

### 3.2. Food & Dining Costs (Per Person, Per Day)

**Data Required:** Daily food costs for 5 travel styles.

#### Collection Method
- Visit 20+ restaurants per category in Accra
- Collect menu prices for breakfast, lunch, dinner
- Calculate daily total (3 meals + 1 snack)
- Validate against current estimates

#### Data Template

| Travel Style | Breakfast | Lunch | Dinner | Snack | **Daily Total** |
|-------------|-----------|-------|--------|-------|-----------------|
| Backpacker | Street food (10-15 GHS) | Local chop bar (20-30 GHS) | Street food (15-20 GHS) | 5-10 GHS | **50-75 GHS** |
| Budget | Local restaurant (20-30 GHS) | Chop bar (30-50 GHS) | Local restaurant (40-60 GHS) | 10-15 GHS | **100-155 GHS** |
| Mid-Range | Hotel breakfast (50-80 GHS) | Mid-range restaurant (80-120 GHS) | Nice restaurant (100-150 GHS) | 20-30 GHS | **250-380 GHS** |
| Comfort | Hotel buffet (100-150 GHS) | Upscale restaurant (150-200 GHS) | Fine dining (200-300 GHS) | 30-50 GHS | **480-700 GHS** |
| Luxury | 5-star buffet (200+ GHS) | Premium restaurant (300+ GHS) | Fine dining (400+ GHS) | 50+ GHS | **950+ GHS** |

**Current Estimates (Validate These):**
```typescript
food: {
  backpacker: 160,  // ⚠️ May be too high for street food
  budget: 220,      // ✅ Likely accurate
  mid: 350,         // ✅ Likely accurate
  comfort: 550,     // ✅ Likely accurate
  luxury: 800       // ⚠️ Verify against fine dining
}
```

**Specific Restaurants to Survey:**
- **Backpacker:** Waakye sellers, kenkey spots, street food vendors
- **Budget:** Papaye, Chicken Republic, local chop bars
- **Mid-Range:** Buka, Azmera, Santoku, Chez Clarisse
- **Comfort:** Skybar 25, Coco Lounge, Republic Bar & Grill
- **Luxury:** Kempinski, Movenpick, Labadi Beach Hotel restaurants

**Regional Multipliers:**
Collect food prices in other regions to validate these multipliers:

| Region | Food Multiplier | Rationale |
|--------|----------------|-----------|
| Greater Accra | 1.0 | Baseline |
| Ashanti (Kumasi) | 1.0 | Similar to Accra |
| Central | 0.9 | Slightly cheaper |
| Northern | 0.8 | Significantly cheaper |
| ... | ? | To be determined |

---

### 3.3. Transport Costs (Per Day)

**Data Required:** Daily transport costs for 5 modes across all regions.

#### 3.3.1. Bolt / Uber (Ride-Hailing)

**Collection Method:**
- Take 10 sample trips in Accra (various distances)
- Record cost per km
- Calculate average daily cost for tourist (4-6 trips/day)

**Data Template:**

| Trip Type | Distance | Current Cost | Notes |
|-----------|----------|--------------|-------|
| Airport to Osu | 15 km | 40-60 GHS | Peak vs. off-peak |
| Osu to Labadi Beach | 5 km | 15-25 GHS | |
| Accra Mall to Makola | 8 km | 25-35 GHS | |
| ... | ... | ... | ... |
| **Daily Average (6 trips)** | **~40 km** | **150-200 GHS** | ⚠️ Current estimate: 150 GHS |

**Validation:** Current estimate of **150 GHS/day** seems LOW. Update to **200-250 GHS/day**.

#### 3.3.2. Private Driver (Sedan)

**Collection Method:**
- Contact 10+ private driver services
- Request quotes for full-day hire (8 hours)
- Include fuel, driver fee, but exclude tolls

**Data Template:**

| Service Provider | Contact | Daily Rate (8 hrs) | Vehicle Type | Notes |
|-----------------|---------|-------------------|--------------|-------|
| Example Tours | +233 XXX | 800 GHS | Toyota Corolla | Fuel included |
| Ghana Drivers | +233 XXX | 900 GHS | Honda Accord | Fuel extra |
| ... | ... | ... | ... | ... |
| **Average** | - | **850 GHS** | - | ⚠️ Current: 800 GHS |

**Validation:** Current estimate of **800 GHS/day** is ACCURATE. Keep as is.

#### 3.3.3. Private Driver (SUV)

**NEW DATA REQUIRED** - Currently missing from system!

| Service Provider | Contact | Daily Rate (8 hrs) | Vehicle Type | Notes |
|-----------------|---------|-------------------|--------------|-------|
| Example Tours | +233 XXX | 1200 GHS | Toyota Land Cruiser | Fuel included |
| Ghana Drivers | +233 XXX | 1400 GHS | Nissan Patrol | Fuel extra |
| ... | ... | ... | ... | ... |
| **Average** | - | **1300 GHS** | - | ⚠️ ADD TO SYSTEM |

#### 3.3.4. Car Rental

**Collection Method:**
- Contact Europcar, Avis, local rental companies
- Request quotes for 7-day rental (economy car)
- Include insurance, exclude fuel

**Data Template:**

| Rental Company | Vehicle | Daily Rate | Insurance | Deposit | Total/Day |
|---------------|---------|-----------|-----------|---------|-----------|
| Europcar Ghana | Toyota Yaris | 450 GHS | 100 GHS | 2000 GHS | 550 GHS |
| Avis Ghana | Hyundai i10 | 500 GHS | 120 GHS | 2500 GHS | 620 GHS |
| ... | ... | ... | ... | ... | ... |
| **Average** | - | - | - | - | **585 GHS** |

**Validation:** Current estimate of **600 GHS/day** is ACCURATE. Keep as is.

**Additional Data Needed:**
- Fuel costs per day (estimate 100-150 GHS for 100 km)
- Toll costs (Accra-Kumasi: 10 GHS, Accra-Cape Coast: 5 GHS)
- Parking fees (Accra: 10-20 GHS/day)

#### 3.3.5. Public Transport

**Collection Method:**
- Ride STC, VIP, Metro Mass buses
- Take trotros for common routes
- Record fares and journey times

**Data Template:**

| Route | Mode | Cost | Duration | Frequency |
|-------|------|------|----------|-----------|
| Accra-Kumasi | STC Bus | 80 GHS | 4 hours | Hourly |
| Accra-Cape Coast | VIP Bus | 50 GHS | 2.5 hours | Every 30 min |
| Accra-Tamale | STC Bus | 150 GHS | 12 hours | 2x daily |
| Osu-Madina (trotro) | Trotro | 3 GHS | 45 min | Every 10 min |
| ... | ... | ... | ... | ... |

**Daily Average Calculation:**
- Assume 2 inter-city trips per week (avg 65 GHS/trip)
- Assume 4 local trotro trips per day (avg 3 GHS/trip)
- Daily average: (65 × 2 ÷ 7) + (3 × 4) = **30 GHS/day**

**Validation:** Current estimate of **55 GHS/day** seems HIGH. Update to **40-50 GHS/day**.

#### 3.3.6. Domestic Flights

**Collection Method:**
- Check PassionAir, Africa World Airlines websites
- Get quotes for Accra-Tamale, Accra-Kumasi
- Record prices for various booking windows

**Data Template:**

| Route | Airline | Advance Booking | Price (One-Way) | Return |
|-------|---------|----------------|-----------------|--------|
| Accra-Tamale | PassionAir | 1 month | 800 GHS | 1600 GHS |
| Accra-Tamale | PassionAir | 1 week | 1000 GHS | 2000 GHS |
| Accra-Tamale | Africa World | 1 month | 850 GHS | 1700 GHS |
| Accra-Kumasi | PassionAir | 1 month | 600 GHS | 1200 GHS |
| ... | ... | ... | ... | ... |

**Validation:** Current estimate of **2000 GHS per person (return)** is ACCURATE for Accra-Tamale. Keep as is.

---

### 3.4. Essential Costs

**Data Required:** One-time costs for trip essentials.

| Item | Current Estimate | Validation Required | Updated Cost |
|------|-----------------|---------------------|--------------|
| Visa Fee | 150 GHS | ✅ Verify on Ghana Immigration website | ? |
| Airport Transfer | 100 GHS | ⚠️ Check Bolt/Uber from airport to Osu | ? |
| SIM Card (MTN/Vodafone) | 50 GHS | ⚠️ Check current data bundle prices | ? |
| Travel Insurance | 200 GHS | ⚠️ Check SafetyWing, World Nomads | ? |

**Detailed Requirements:**

**Visa Fees:**
- Tourist visa (single entry): ? GHS
- Tourist visa (multiple entry): ? GHS
- Visa on arrival: ? GHS
- Source: https://www.ghanaimmigration.org/

**SIM Card & Data:**
- MTN Starter pack: ? GHS
- 5GB data bundle (1 month): ? GHS
- 10GB data bundle (1 month): ? GHS
- Vodafone equivalent: ? GHS

**Travel Insurance:**
- 7-day coverage: ? GHS
- 14-day coverage: ? GHS
- 30-day coverage: ? GHS
- Source: SafetyWing, World Nomads, local providers

---

### 3.5. Seasonal Multipliers

**Data Required:** Validate pricing variations by month.

**Collection Method:**
- Check hotel prices on Booking.com for each month
- Compare December (peak) vs. February (low) vs. June (shoulder)
- Calculate actual multiplier

**Data Template:**

| Month | Season | Current Multiplier | Hotel Price Sample | Actual Multiplier |
|-------|--------|-------------------|-------------------|-------------------|
| January | Peak | 1.15 | ? | ? |
| February | Low | 0.85 | ? | ? |
| March | Shoulder | 1.0 | ? | ? |
| April | Shoulder | 1.0 | ? | ? |
| May | Shoulder | 1.0 | ? | ? |
| June | Shoulder | 1.0 | ? | ? |
| July | High | 1.15 | ? | ? |
| August | High | 1.15 | ? | ? |
| September | High | 1.15 | ? | ? |
| October | Shoulder | 1.0 | ? | ? |
| November | Shoulder | 1.0 | ? | ? |
| December | Peak | 1.3 | ? | ? |

**Validation Focus:**
- December (Detty December): Verify 1.3x multiplier
- February (Low season): Verify 0.85x multiplier
- August (Diaspora return): Verify 1.15x multiplier

---

## 4. Accommodation Data

### 4.1. Hotel Database Requirements

**Target:** 100+ hotels across all regions (minimum 10 per region)

#### Data Fields (Required)

| Field | Type | Example | Validation |
|-------|------|---------|------------|
| `name` | String | "Labadi Beach Hotel" | Required, max 100 chars |
| `region` | String | "Greater Accra" | Must match 16 regions |
| `city` | String | "Accra" | Required |
| `address` | String | "1 La Bypass, Accra" | Required |
| `coordinates` | Object | `{lat: 5.6037, lng: -0.1870}` | Required for mapping |
| `category` | Enum | "luxury" | backpacker/budget/mid/comfort/luxury |
| `starRating` | Number | 5 | 1-5 stars |
| `pricePerNight` | Number | 1800 | In GHS |
| `priceRange` | String | "1500-2000" | For display |
| `amenities` | Array | ["Pool", "WiFi", "Restaurant"] | Min 5 amenities |
| `images` | Array | ["url1", "url2", "url3"] | Min 3 images |
| `description` | String | "Luxury beachfront hotel..." | Max 500 chars |
| `contactPhone` | String | "+233 302 772 501" | Required |
| `contactEmail` | String | "info@labadibeach.com" | Optional |
| `website` | String | "https://labadibeach.com" | Optional |
| `bookingUrl` | String | "https://booking.com/..." | Preferred |
| `rating` | Number | 4.5 | TripAdvisor/Google rating |
| `reviewCount` | Number | 1250 | Number of reviews |
| `checkInTime` | String | "14:00" | 24-hour format |
| `checkOutTime` | String | "12:00" | 24-hour format |
| `cancellationPolicy` | String | "Free cancellation up to 24h" | Required |
| `breakfast` | Boolean | true | Breakfast included? |
| `parking` | Boolean | true | Free parking? |
| `airportShuttle` | Boolean | true | Airport transfer? |

#### Collection Template (CSV Format)

```csv
name,region,city,address,lat,lng,category,starRating,pricePerNight,amenities,images,description,phone,email,website,bookingUrl,rating,reviewCount
"Labadi Beach Hotel","Greater Accra","Accra","1 La Bypass",5.6037,-0.1870,"luxury",5,1800,"Pool|WiFi|Restaurant|Gym|Spa","img1.jpg|img2.jpg|img3.jpg","Luxury beachfront hotel with stunning ocean views","+233 302 772 501","info@labadibeach.com","https://labadibeach.com","https://booking.com/hotel/gh/labadi-beach.html",4.5,1250
```

#### Priority Hotels to Include

**Greater Accra (Minimum 20 hotels):**
- **Luxury:** Kempinski Gold Coast, Movenpick Ambassador, Labadi Beach Hotel
- **Comfort:** Alisa Hotel, Tang Palace, Best Western Premier
- **Mid-Range:** Ibis Styles, African Regent, Fiesta Royale
- **Budget:** Afia Beach Hotel, Paloma Hotel, Volta Serene Hotel
- **Backpacker:** Accra Backpackers Hostel, Somewhere Nice Guesthouse

**Ashanti - Kumasi (Minimum 15 hotels):**
- **Luxury:** Golden Tulip Kumasi, Lancaster Kumasi
- **Comfort:** Four Villages Inn, Miklin Hotel
- **Mid-Range:** Royal Basin Resort, Noda Hotel
- **Budget:** Kumasi Catering Rest House
- **Backpacker:** Kumasi Hostel

**Central - Cape Coast (Minimum 10 hotels):**
- **Comfort:** Elmina Beach Resort, Coconut Grove Beach Resort
- **Mid-Range:** Anomabo Beach Resort, Hans Cottage Botel
- **Budget:** Oasis Beach Resort, Mighty Victory Hotel

**Continue for all 16 regions...**

---

## 5. Restaurant & Food Data

### 5.1. Restaurant Database Requirements

**Target:** 200+ restaurants across all regions (minimum 15 per region)

#### Data Fields (Required)

| Field | Type | Example | Validation |
|-------|------|---------|------------|
| `name` | String | "Buka Restaurant" | Required |
| `region` | String | "Greater Accra" | Must match 16 regions |
| `city` | String | "Accra" | Required |
| `neighborhood` | String | "Osu" | Optional |
| `address` | String | "Oxford Street, Osu" | Required |
| `coordinates` | Object | `{lat: 5.5600, lng: -0.1800}` | Required |
| `category` | Enum | "mid-range" | backpacker/budget/mid/comfort/luxury |
| `cuisineType` | Array | ["Ghanaian", "African"] | Min 1 cuisine |
| `priceRange` | String | "50-150 GHS" | Average meal cost |
| `avgMealCost` | Number | 100 | In GHS per person |
| `menuItems` | Array | [{name, price, description}] | Min 10 items |
| `images` | Array | ["url1", "url2"] | Min 2 images |
| `description` | String | "Authentic Ghanaian cuisine..." | Max 300 chars |
| `contactPhone` | String | "+233 XXX" | Required |
| `website` | String | "https://buka.com.gh" | Optional |
| `openingHours` | Object | {mon: "11:00-22:00", ...} | Required |
| `rating` | Number | 4.3 | Google/TripAdvisor rating |
| `reviewCount` | Number | 450 | Number of reviews |
| `delivery` | Boolean | true | Delivery available? |
| `reservations` | Boolean | true | Accepts reservations? |
| `outdoorSeating` | Boolean | false | Outdoor seating? |
| `vegetarianOptions` | Boolean | true | Vegetarian menu? |
| `alcoholServed` | Boolean | true | Serves alcohol? |

#### Menu Items Template

```json
{
  "name": "Buka Restaurant",
  "menuItems": [
    {
      "name": "Jollof Rice with Chicken",
      "price": 45,
      "category": "Main Course",
      "description": "Spicy Ghanaian jollof with grilled chicken",
      "vegetarian": false,
      "spicy": true
    },
    {
      "name": "Waakye with Fish",
      "price": 35,
      "category": "Main Course",
      "description": "Rice and beans with fried fish and shito",
      "vegetarian": false
    },
    // ... minimum 10 items
  ]
}
```

#### Priority Restaurants to Include

**Greater Accra (Minimum 30 restaurants):**

**Backpacker (Street Food & Chop Bars):**
- Waakye sellers (Auntie Muni, Circle Waakye)
- Kenkey spots (Jamestown, Chorkor)
- Banku joints (Osu, Madina)
- Average meal: 10-25 GHS

**Budget (Local Restaurants):**
- Papaye Fast Food (multiple locations)
- Chicken Republic
- Frankie's
- Local chop bars
- Average meal: 30-60 GHS

**Mid-Range (Casual Dining):**
- Buka Restaurant
- Azmera Restaurant
- Santoku Japanese
- Chez Clarisse
- Asanka Local
- Average meal: 80-150 GHS

**Comfort (Upscale Casual):**
- Skybar 25
- Coco Lounge
- Republic Bar & Grill
- Zen Garden
- Average meal: 150-250 GHS

**Luxury (Fine Dining):**
- Kempinski Hotel restaurants
- Movenpick restaurants
- Labadi Beach Hotel
- Average meal: 300+ GHS

**Continue for all regions...**

---

## 6. Transport Data

### 6.1. Inter-City Transport Routes

**Data Required:** Routes, schedules, and fares for major transport providers.

#### 6.1.1. Bus Companies

**STC (State Transport Corporation)**

| Route | Departure Times | Fare (GHS) | Duration | Frequency |
|-------|----------------|-----------|----------|-----------|
| Accra-Kumasi | 06:00, 08:00, 10:00, 14:00, 16:00 | 80 | 4 hours | 5x daily |
| Accra-Cape Coast | 07:00, 09:00, 12:00, 15:00 | 50 | 2.5 hours | 4x daily |
| Accra-Tamale | 08:00, 20:00 | 150 | 12 hours | 2x daily |
| Accra-Takoradi | 07:00, 10:00, 14:00 | 70 | 4 hours | 3x daily |
| ... | ... | ... | ... | ... |

**VIP Transport**

| Route | Departure Times | Fare (GHS) | Duration | Frequency |
|-------|----------------|-----------|----------|-----------|
| Accra-Kumasi | Every 30 min (06:00-18:00) | 85 | 4 hours | 24x daily |
| Accra-Cape Coast | Every 30 min (06:00-18:00) | 55 | 2.5 hours | 24x daily |
| ... | ... | ... | ... | ... |

**Metro Mass Transit (Budget Option)**

| Route | Fare (GHS) | Duration | Notes |
|-------|-----------|----------|-------|
| Accra-Kumasi | 40 | 5 hours | Slower, more stops |
| Accra-Cape Coast | 25 | 3 hours | Slower, more stops |
| ... | ... | ... | ... |

#### 6.1.2. Trotro Routes (Accra)

**Major Routes:**

| Route | Fare (GHS) | Duration | Operating Hours |
|-------|-----------|----------|-----------------|
| Circle-Madina | 3 | 45 min | 05:00-22:00 |
| Kaneshie-Tema | 5 | 1 hour | 05:00-21:00 |
| Accra Mall-Osu | 2 | 20 min | 06:00-20:00 |
| Airport-Circle | 4 | 30 min | 05:00-22:00 |
| ... | ... | ... | ... |

**Collection Method:**
- Ride 20+ major trotro routes
- Record exact fares and journey times
- Note operating hours and frequency

---

## 7. Activity & Attraction Data

### 7.1. Activity Database Requirements

**Target:** 100+ activities across all regions (minimum 8 per region)

#### Data Fields (Required)

| Field | Type | Example | Validation |
|-------|------|---------|------------|
| `name` | String | "Kakum Canopy Walkway" | Required |
| `region` | String | "Central" | Must match 16 regions |
| `city` | String | "Cape Coast" | Required |
| `category` | Enum | "adventure" | culture/adventure/nature/beach/food/nightlife |
| `description` | String | "Walk 40m above the forest..." | Max 500 chars |
| `price` | Number | 60 | In GHS (foreigner price) |
| `priceLocal` | Number | 10 | In GHS (Ghanaian price) |
| `duration` | String | "2-3 hours" | Estimated time |
| `difficulty` | Enum | "moderate" | easy/moderate/hard |
| `bestTime` | String | "Morning (7-10am)" | Best time to visit |
| `bestSeason` | Array | ["Nov", "Dec", "Jan", "Feb"] | Best months |
| `coordinates` | Object | `{lat: 5.3500, lng: -1.2167}` | Required |
| `address` | String | "Kakum National Park" | Required |
| `contactPhone` | String | "+233 XXX" | Required |
| `website` | String | "https://kakumnationalpark.org" | Optional |
| `bookingRequired` | Boolean | false | Advance booking needed? |
| `bookingUrl` | String | "https://..." | If booking required |
| `images` | Array | ["url1", "url2", "url3"] | Min 3 images |
| `rating` | Number | 4.7 | TripAdvisor rating |
| `reviewCount` | Number | 3500 | Number of reviews |
| `included` | Array | ["Guide", "Entry fee"] | What's included |
| `notIncluded` | Array | ["Transport", "Food"] | What's not included |
| `whatToBring` | Array | ["Comfortable shoes", "Water"] | Recommended items |
| `accessibility` | String | "Not wheelchair accessible" | Accessibility info |
| `ageRestriction` | String | "Minimum 5 years old" | Age requirements |

#### Priority Activities by Category

**Culture & History (30+ activities):**
- Elmina Castle (Central) - 40 GHS
- Cape Coast Castle (Central) - 40 GHS
- Manhyia Palace Museum (Ashanti) - 20 GHS
- National Museum (Accra) - 10 GHS
- W.E.B. Du Bois Centre (Accra) - 10 GHS
- Kwame Nkrumah Memorial Park (Accra) - 10 GHS
- Larabanga Mosque (Northern) - 10 GHS
- Assin Manso Slave River (Central) - 20 GHS
- ... (collect 22 more)

**Adventure (20+ activities):**
- Kakum Canopy Walkway (Central) - 60 GHS
- Wli Waterfall Hike (Volta) - 30 GHS
- Boti Falls (Eastern) - 20 GHS
- Aburi Mountain Trails (Eastern) - Free
- Mole National Park Safari (Northern) - 200 GHS
- Kintampo Waterfalls (Bono East) - 15 GHS
- ... (collect 14 more)

**Nature & Wildlife (20+ activities):**
- Mole National Park (Northern) - 200 GHS
- Kakum National Park (Central) - 60 GHS
- Shai Hills Reserve (Accra) - 50 GHS
- Aburi Botanical Gardens (Eastern) - 10 GHS
- Monkey Sanctuary (Volta) - 30 GHS
- ... (collect 15 more)

**Beaches & Relaxation (15+ activities):**
- Labadi Beach (Accra) - 10 GHS
- Kokrobite Beach (Accra) - Free
- Busua Beach (Western) - Free
- Anomabo Beach (Central) - Free
- Ada Foah (Greater Accra) - Free
- ... (collect 10 more)

**Food & Culinary (10+ activities):**
- Makola Market Food Tour (Accra) - 100 GHS
- Jamestown Street Food Tour (Accra) - 80 GHS
- Cooking Class at Buka (Accra) - 150 GHS
- ... (collect 7 more)

**Nightlife (5+ activities):**
- Osu Oxford Street Pub Crawl - 50 GHS
- Labadi Beach Night Party - 30 GHS
- Twist Nightclub (Accra) - 50 GHS entry
- ... (collect 2 more)

---

## 8. Regional Information

### 8.1. Regional Data Enrichment

**For Each of 16 Regions, Collect:**

#### 8.1.1. Transport Information

```json
{
  "region": "Central",
  "transport": {
    "fromAccra": {
      "distance": 165,  // km
      "duration": "2.5 hours",
      "busCost": 50,  // GHS (STC/VIP)
      "privateCar": 800,  // GHS (full day hire)
      "trotro": 30  // GHS (cheaper but slower)
    },
    "intraRegion": {
      "averageDailyCost": 40,  // GHS for local transport
      "mainMode": "Trotro",
      "notes": "Taxis available in Cape Coast and Elmina"
    }
  }
}
```

#### 8.1.2. Safety Information

```json
{
  "region": "Central",
  "safety": {
    "rating": "safe",  // safe / caution / avoid
    "crimeLevelOverall": "low",
    "crimeLevelTouristAreas": "very low",
    "healthRisks": ["Malaria - use prophylaxis", "Drink bottled water"],
    "scamAlerts": ["Beach vendors can be pushy", "Agree taxi fares upfront"],
    "emergencyNumbers": {
      "police": "191",
      "ambulance": "193",
      "fire": "192",
      "touristPolice": "+233 XXX"
    },
    "hospitals": [
      {
        "name": "Cape Coast Teaching Hospital",
        "phone": "+233 XXX",
        "address": "..."
      }
    ]
  }
}
```

#### 8.1.3. Best Time to Visit

```json
{
  "region": "Central",
  "bestTime": {
    "overall": "November to March (dry season)",
    "festivals": [
      {
        "name": "Fetu Afahye",
        "month": "September",
        "description": "Annual festival in Cape Coast"
      }
    ],
    "weather": {
      "drySeasonMonths": ["Nov", "Dec", "Jan", "Feb", "Mar"],
      "wetSeasonMonths": ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      "hottestMonths": ["Feb", "Mar", "Apr"],
      "coolestMonths": ["Jul", "Aug"]
    }
  }
}
```

#### 8.1.4. Top Highlights (Expand Existing)

```json
{
  "region": "Central",
  "highlights": [
    {
      "name": "Elmina Castle",
      "description": "UNESCO World Heritage Site, oldest European building in sub-Saharan Africa",
      "cost": 40,
      "duration": "2 hours",
      "category": "culture"
    },
    {
      "name": "Kakum Canopy Walkway",
      "description": "Walk 40m above the rainforest on suspended bridges",
      "cost": 60,
      "duration": "3 hours",
      "category": "adventure"
    }
    // ... add 8 more
  ]
}
```

---

## 9. Tour Packages

### 9.1. Tour Database Requirements

**Target:** 30+ curated tours (currently have 12)

#### Data Fields (Required)

| Field | Type | Example | Validation |
|-------|------|---------|------------|
| `id` | String | "heritage-trail-7d" | Unique ID |
| `title` | String | "Heritage Trail: Slave Forts & Culture" | Required |
| `description` | String | "7-day journey through Ghana's history..." | Max 1000 chars |
| `duration` | Number | 7 | In days |
| `price` | Number | 12000 | In GHS (converted from USD) |
| `priceUSD` | Number | 800 | Original USD price |
| `regions` | Array | ["Greater Accra", "Central", "Ashanti"] | Min 1 region |
| `difficulty` | Enum | "easy" | easy/moderate/hard |
| `groupSize` | Object | {min: 2, max: 12} | Required |
| `category` | Array | ["culture", "history"] | Min 1 category |
| `highlights` | Array | ["Elmina Castle", "Kakum", ...] | Min 5 highlights |
| `itinerary` | Array | [{day, title, activities, meals, accommodation}] | Full day-by-day |
| `included` | Array | ["Accommodation", "Meals", ...] | Min 5 items |
| `notIncluded` | Array | ["Flights", "Visa", ...] | Min 3 items |
| `images` | Array | ["url1", "url2", "url3"] | Min 5 images |
| `operator` | Object | {name, phone, email, website} | Required |
| `availability` | Array | ["2024-12", "2025-01", ...] | Available months |
| `bookingUrl` | String | "https://..." | Required |
| `rating` | Number | 4.8 | TripAdvisor rating |
| `reviewCount` | Number | 156 | Number of reviews |

#### Priority Tours to Add (18 new tours)

**Cultural Tours (5 new):**
1. "Accra City Heritage Walk" (1 day) - 600 GHS
2. "Ashanti Kingdom Experience" (3 days) - 4500 GHS
3. "Volta Region Cultural Immersion" (4 days) - 5500 GHS
4. "Northern Ghana Tribal Tour" (7 days) - 11000 GHS
5. "Pan-African Heritage Journey" (10 days) - 18000 GHS

**Adventure Tours (4 new):**
1. "Hiking Ghana's Waterfalls" (5 days) - 7000 GHS
2. "Mountain Biking Aburi Hills" (2 days) - 3000 GHS
3. "Mole Safari & Waterfalls" (6 days) - 9000 GHS
4. "Extreme Ghana Adventure" (8 days) - 13000 GHS

**Beach & Relaxation (3 new):**
1. "Western Beaches Retreat" (4 days) - 5000 GHS
2. "Ada Estuary Escape" (3 days) - 4000 GHS
3. "Coastal Paradise Tour" (7 days) - 10000 GHS

**Food & Culinary (2 new):**
1. "Taste of Ghana Food Tour" (3 days) - 4500 GHS
2. "Farm to Table Experience" (2 days) - 3500 GHS

**Festival Tours (2 new):**
1. "Aboakyer Festival Experience" (3 days, May only) - 5000 GHS
2. "Homowo Festival Tour" (4 days, Aug only) - 6000 GHS

**Combo Tours (2 new):**
1. "Best of Ghana in 10 Days" (10 days) - 16000 GHS
2. "Ghana Highlights Express" (5 days) - 8000 GHS

---

## 10. Seasonal & Event Data

### 10.1. Ghana Public Holidays 2024-2025

**Collect Official Dates:**

| Holiday | 2024 Date | 2025 Date | Impact on Travel |
|---------|-----------|-----------|------------------|
| New Year's Day | Jan 1 | Jan 1 | High demand, prices up |
| Independence Day | Mar 6 | Mar 6 | Celebrations in Accra |
| Good Friday | Mar 29 | Apr 18 | Banks closed |
| Easter Monday | Apr 1 | Apr 21 | Banks closed |
| May Day | May 1 | May 1 | Banks closed |
| Eid al-Fitr | Apr 10 | Mar 30 | Muslim holiday |
| Eid al-Adha | Jun 16 | Jun 6 | Muslim holiday |
| Founders' Day | Aug 4 | Aug 4 | Celebrations nationwide |
| Kwame Nkrumah Day | Sep 21 | Sep 21 | Memorial events |
| Farmers' Day | Dec 6 | Dec 5 | Rural celebrations |
| Christmas Day | Dec 25 | Dec 25 | Peak season |
| Boxing Day | Dec 26 | Dec 26 | Peak season |

### 10.2. Major Festivals & Events

**Collect Dates and Details:**

| Festival | Region | Usual Month | 2024 Date | 2025 Date | Description |
|----------|--------|-------------|-----------|-----------|-------------|
| Aboakyer (Deer Hunt) | Central | May | May 4 | May 3 | Winneba festival |
| Homowo | Greater Accra | Aug | Aug 10 | Aug 9 | Ga harvest festival |
| Odwira | Eastern | Sep | Sep 14 | Sep 13 | Akuapem festival |
| Fetu Afahye | Central | Sep | Sep 7 | Sep 6 | Cape Coast festival |
| Hogbetsotso | Volta | Nov | Nov 2 | Nov 1 | Anlo Ewe festival |
| Panafest | Central | Biennial | - | Jul 2025 | Pan-African festival |
| Chale Wote | Greater Accra | Aug | Aug 20-25 | Aug 19-24 | Street art festival |
| Afrochella | Greater Accra | Dec | Dec 28-29 | Dec 27-28 | Music festival |
| Detty December | Greater Accra | Dec | All month | All month | Party season |

**For Each Festival, Collect:**
- Exact dates
- Location (specific town/city)
- Ticket prices (if applicable)
- Accommodation impact (price multiplier)
- Transport impact
- Recommended booking advance (e.g., "Book 2 months ahead")

---

## 11. Data Formats & Templates

### 11.1. Master Data Collection Spreadsheet

**Create Google Sheets with tabs:**

1. **Cost_Data_Validation**
   - Columns: Category, Current_Value, Surveyed_Value, Source, Date_Collected, Validator_Name
   
2. **Accommodations**
   - Columns: All fields from section 4.1
   - 100+ rows

3. **Restaurants**
   - Columns: All fields from section 5.1
   - 200+ rows

4. **Transport_Routes**
   - Columns: Route, Mode, Operator, Fare, Duration, Frequency, Source

5. **Activities**
   - Columns: All fields from section 7.1
   - 100+ rows

6. **Regional_Info**
   - Columns: Region, Transport_From_Accra, Safety_Rating, Best_Time, Highlights

7. **Tours**
   - Columns: All fields from section 9.1
   - 30+ rows

8. **Events_Calendar**
   - Columns: Event_Name, Date_2024, Date_2025, Region, Type, Impact

### 11.2. JSON Export Format

**After collection, export to JSON:**

```json
{
  "costData": {
    "accommodation": {...},
    "food": {...},
    "transport": {...},
    "essentials": {...}
  },
  "accommodations": [...],
  "restaurants": [...],
  "activities": [...],
  "tours": [...],
  "regions": {...},
  "events": [...]
}
```

---

## 12. Quality Assurance

### 12.1. Validation Checklist

**Before submitting data, verify:**

- [ ] All prices in GHS (not USD/EUR)
- [ ] All prices collected within last 30 days
- [ ] All coordinates verified on Google Maps
- [ ] All phone numbers tested (call to verify)
- [ ] All websites checked (links work)
- [ ] All images high-quality (min 1200px width)
- [ ] No duplicate entries
- [ ] All required fields populated
- [ ] Spelling and grammar checked
- [ ] Sources documented for all data

### 12.2. Data Sources Priority

**Preferred Sources (in order):**
1. Direct contact (phone/email/visit)
2. Official websites
3. Booking.com / Airbnb / Hotels.com
4. TripAdvisor
5. Google Maps / Google Reviews
6. Social media (Facebook, Instagram)
7. Travel blogs (verify with 2+ sources)

### 12.3. Validation Rules

**Prices:**
- Must be realistic (flag if >50% different from estimate)
- Must include currency (GHS)
- Must specify what's included (per person? per room? per day?)

**Contact Info:**
- Phone numbers must include country code (+233)
- Test all phone numbers
- Verify email addresses (send test email)

**Locations:**
- Coordinates must be accurate (±100m)
- Address must be specific (not just city name)

**Images:**
- Minimum 1200px width
- No watermarks (except official branding)
- Recent photos (within 2 years)
- Properly licensed (permission obtained)

---

## 13. Submission & Timeline

### 13.1. Deliverables

**Week 1 Deliverables (CRITICAL):**
1. Cost Data Validation Report (all sections of Section 3)
2. Accra Accommodation Database (20+ hotels)
3. Accra Restaurant Database (30+ restaurants)
4. Transport Cost Validation (all modes)

**Week 2 Deliverables (HIGH):**
5. Remaining 15 Regions - Accommodation (80+ hotels total)
6. Remaining 15 Regions - Restaurants (170+ restaurants total)
7. Top 50 Activities with pricing
8. Transport routes and schedules

**Week 3 Deliverables (MEDIUM):**
9. 18 New tour packages
10. Events calendar 2024-2025
11. Regional safety information
12. Final QA and corrections

### 13.2. Submission Format

**Submit via:**
- Google Sheets (shared with edit access)
- JSON export (for technical team)
- Photo folder (Google Drive / Dropbox)
- Validation report (PDF)

### 13.3. Contact & Support

**Data Team Lead:** [To be assigned]  
**Technical Contact:** [To be assigned]  
**Questions:** Submit via [Slack channel / Email]

---

## Appendix A: Sample Data Collection Form

**Hotel Data Collection Form:**

```
HOTEL INFORMATION FORM
Date Collected: __________
Collector Name: __________

Basic Information:
- Hotel Name: _______________
- Region: _______________
- City: _______________
- Address: _______________
- GPS Coordinates: Lat: _____ Lng: _____

Contact:
- Phone: _______________
- Email: _______________
- Website: _______________

Pricing (December 2024):
- Standard Room (per night): _____ GHS
- Deluxe Room (per night): _____ GHS
- Suite (per night): _____ GHS
- Breakfast included? Yes / No
- Cancellation policy: _______________

Amenities (check all that apply):
[ ] WiFi
[ ] Pool
[ ] Restaurant
[ ] Bar
[ ] Gym
[ ] Spa
[ ] Parking
[ ] Airport Shuttle
[ ] Air Conditioning
[ ] Room Service

Rating:
- Star Rating: 1 / 2 / 3 / 4 / 5
- TripAdvisor Rating: _____
- Google Rating: _____

Photos:
- Photo 1 URL: _______________
- Photo 2 URL: _______________
- Photo 3 URL: _______________

Notes: _______________
```

---

**END OF DATA COLLECTION SPECIFICATION**

**Version:** 1.0  
**Last Updated:** November 28, 2024  
**Next Review:** After data collection completion
