# Local Mode Data Collection Specification

**Document Version**: 1.0  
**Date**: December 1, 2025  
**For**: Data Collection Team  
**Project**: GoGhana Local Mode Feature

---

## Executive Summary

This document specifies all data requirements for the **Local Mode** feature, which enables Ghanaian residents to plan domestic trips within Ghana using local pricing, transport options, and Ghana Cedi (GHS) currency.

**Priority**: HIGH  
**Target Launch**: Q1 2026  
**Currency**: All prices in Ghana Cedis (GHS)

---

## 1. ACCOMMODATION DATA

### 1.1 Regional Accommodation Pricing Bands

**File**: `localAccommodationBands.json`

**Current Coverage**: 7 regions  
**Target Coverage**: All 16 regions of Ghana

#### Data Structure
```json
{
  "region": "Region Name",
  "bands": {
    "budget": 150,    // GHS per night
    "mid": 450,       // GHS per night
    "premium": 1200   // GHS per night
  }
}
```

#### Required Data Points

| Field | Description | Data Type | Validation |
|-------|-------------|-----------|------------|
| `region` | Official Ghana region name | String | Must match Ghana's 16 regions |
| `bands.budget` | Budget accommodation (hostels, basic guesthouses) | Number (GHS) | 50-300 GHS |
| `bands.mid` | Mid-range (3-star hotels, lodges) | Number (GHS) | 250-800 GHS |
| `bands.premium` | Premium (4-5 star hotels, resorts) | Number (GHS) | 600-2000 GHS |

#### Regions to Cover

**Currently Have** (7):
- ✅ Greater Accra
- ✅ Ashanti
- ✅ Central
- ✅ Western
- ✅ Eastern
- ✅ Volta
- ✅ Northern

**Need Data For** (9):
- ❌ Western North
- ❌ Bono
- ❌ Bono East
- ❌ Ahafo
- ❌ Oti
- ❌ Savannah
- ❌ North East
- ❌ Upper East
- ❌ Upper West

#### Collection Method
1. Survey 5-10 accommodations per tier per region
2. Calculate average nightly rate
3. Verify prices are current (within last 3 months)
4. Include seasonal variations if significant

#### Data Sources
- Booking.com local listings
- Hotels.com Ghana section
- Jumia Travel Ghana
- Direct hotel websites
- Local tourism boards
- On-ground surveys

---

## 2. ACTIVITY & ATTRACTION COSTS

### 2.1 Regional Activities Database

**File**: `localActivityCosts.json`

**Current Coverage**: 6 activities  
**Target Coverage**: 100+ activities across all regions

#### Data Structure
```json
{
  "id": "unique-activity-id",
  "name": "Activity Name",
  "region": "Region Name",
  "price": 40,              // GHS per person
  "category": "Adventure",  // Adventure, Culture, Nature, Food, Relaxation
  "description": "Brief description",
  "duration": "2-3 hours",
  "location": "Specific town/city",
  "contactInfo": "Phone or website",
  "bestSeason": "Dry/Wet/Year-round",
  "groupDiscounts": {
    "5+": 10,    // 10% discount for 5+ people
    "10+": 20    // 20% discount for 10+ people
  }
}
```

#### Required Fields

| Field | Description | Data Type | Required | Example |
|-------|-------------|-----------|----------|---------|
| `id` | Unique identifier | String | Yes | "kakum-canopy" |
| `name` | Activity name | String | Yes | "Kakum Canopy Walk" |
| `region` | Ghana region | String | Yes | "Central" |
| `price` | Cost per person | Number (GHS) | Yes | 40 |
| `category` | Activity type | Enum | Yes | "Adventure" |
| `description` | Brief description | String | No | "Walk above the rainforest canopy" |
| `duration` | Typical duration | String | No | "2-3 hours" |
| `location` | Specific location | String | No | "Kakum National Park" |
| `contactInfo` | Phone/website | String | No | "+233 24 123 4567" |
| `bestSeason` | Best time to visit | String | No | "Dry season (Nov-Mar)" |
| `groupDiscounts` | Discount tiers | Object | No | {"5+": 10, "10+": 20} |

#### Categories
- **Adventure**: Hiking, canopy walks, safaris, water sports
- **Culture**: Museums, castles, festivals, cultural centers
- **Nature**: National parks, waterfalls, botanical gardens, beaches
- **Food**: Food tours, cooking classes, restaurant experiences
- **Relaxation**: Spas, resorts, beach clubs

#### Target Activities Per Region

| Region | Target Count | Priority Activities |
|--------|--------------|---------------------|
| Greater Accra | 20+ | Beaches, museums, nightlife, markets |
| Ashanti | 15+ | Manhyia Palace, Lake Bosomtwe, craft villages |
| Central | 15+ | Castles, Kakum, beaches |
| Western | 12+ | Beaches, Nzulezo, nature reserves |
| Eastern | 12+ | Waterfalls, Aburi Gardens, mountains |
| Volta | 15+ | Wli Falls, Mt. Afadja, Lake Volta |
| Northern | 10+ | Mole Park, Larabanga Mosque |
| Bono/Bono East | 8+ | Kintampo Falls, Boabeng-Fiema |
| Oti | 6+ | Kyabobo Park |
| Others | 5+ each | Regional highlights |

#### Data Collection Priorities
1. **High Priority**: Top 5 attractions per region
2. **Medium Priority**: Secondary attractions (6-15 per region)
3. **Low Priority**: Niche/seasonal activities

---

## 3. TRANSPORT DATA

### 3.1 Inter-City Transport Rates

**File**: `localTransportRates.json`

**Current Coverage**: 6 routes  
**Target Coverage**: 50+ major routes

#### Data Structure
```json
{
  "fuelPricePerLitre": 14.50,      // Current GHS per litre
  "avgFuelConsumption": 0.12,      // Litres per km
  "trotroFares": [
    {
      "from": "Accra",
      "to": "Kumasi",
      "price": 80,                   // GHS per person
      "duration": "4-5 hours",
      "frequency": "Every 30 mins",
      "operators": ["GPRTU", "VIP"]
    }
  ],
  "vipBusFares": [...],
  "boltRates": {
    "Accra": {
      "base": 15,      // Base fare GHS
      "perKm": 7,      // GHS per km
      "min": 25        // Minimum fare GHS
    }
  },
  "vanRentalPerDay": 1500,
  "taxiRates": {...}
}
```

#### Required Data Points

**Trotro (Public Transport)**
- Route pairs (from/to cities)
- Current fare per person (GHS)
- Average journey duration
- Departure frequency
- Major operators/stations

**VIP Bus Services**
- Route pairs
- Fare per person (GHS)
- Journey duration
- Operators (VIP Jeoun, OA Travel, etc.)
- Amenities (AC, WiFi, etc.)

**Ride-Hailing (Bolt/Uber)**
- Base fare per city
- Per-kilometer rate
- Minimum fare
- Surge pricing patterns
- City coverage

**Fuel Car (Self-Drive)**
- Current fuel price (updated monthly)
- Average consumption (L/km)
- Rental rates per day
- Insurance costs

**Taxi (Charter)**
- Inter-city charter rates
- Shared taxi rates
- Per-km rates

#### Priority Routes (50 Total)

**Tier 1 - Major Routes** (15 routes):
- Accra ↔ Kumasi
- Accra ↔ Cape Coast
- Accra ↔ Takoradi
- Accra ↔ Ho
- Accra ↔ Tamale
- Kumasi ↔ Tamale
- Kumasi ↔ Sunyani
- Kumasi ↔ Takoradi
- Cape Coast ↔ Takoradi
- Accra ↔ Koforidua
- Accra ↔ Akosombo
- Kumasi ↔ Techiman
- Tamale ↔ Bolgatanga
- Takoradi ↔ Axim
- Ho ↔ Hohoe

**Tier 2 - Secondary Routes** (20 routes):
- Regional capitals to major towns
- Tourist destination connections

**Tier 3 - Local Routes** (15 routes):
- Within-region transport
- Town-to-attraction routes

#### Data Collection Method
1. **Trotro**: Visit major lorry stations, interview drivers/mates
2. **VIP Bus**: Contact operators directly, check websites
3. **Bolt/Uber**: Use apps, record sample fares
4. **Fuel**: Ghana National Petroleum Authority (GNPA) official rates
5. **Taxi**: Survey charter operators at stations

---

### 3.2 Regional Distance Matrix

**File**: `regionDistances.json`

**Current Coverage**: Partial  
**Target Coverage**: Complete 16x16 matrix

#### Data Structure
```json
{
  "Accra": {
    "Kumasi": 250,     // km
    "Cape Coast": 165,
    "Takoradi": 240,
    ...
  },
  "Kumasi": {
    "Accra": 250,
    "Tamale": 420,
    ...
  }
}
```

#### Requirements
- Distance in kilometers between all 16 regional capitals
- Use road distance, not straight-line
- Verify with Google Maps/actual routes
- Include major tourist destinations as nodes

---

## 4. INTEREST-REGION MAPPING

### 4.1 Interest Categories to Regions

**File**: `interestRegionMapping.json`

**Current Coverage**: 8 interest types  
**Target Coverage**: 15+ interest types

#### Data Structure
```json
{
  "Interest Category": [
    "Region 1",
    "Region 2",
    "Region 3"
  ]
}
```

#### Current Interest Categories
1. ✅ Weekend Getaway
2. ✅ Holiday Getaway
3. ✅ Festive Event
4. ✅ Adventure Trip
5. ✅ Romantic Trip
6. ✅ Group Excursion
7. ✅ City Break
8. ✅ Food & Culture

#### New Interest Categories Needed
9. ❌ Beach & Relaxation
10. ❌ Wildlife & Nature
11. ❌ Historical & Heritage
12. ❌ Spiritual & Religious
13. ❌ Shopping & Markets
14. ❌ Nightlife & Entertainment
15. ❌ Eco-Tourism
16. ❌ Photography & Scenery
17. ❌ Wellness & Spa
18. ❌ Educational & Learning

#### Mapping Criteria
- Each interest should map to 3-6 regions
- Based on region's strengths and attractions
- Verified by local tourism experts
- Consider seasonal factors

---

## 5. FOOD & DINING COSTS

### 5.1 Regional Food Pricing

**File**: `localFoodCosts.json` (NEW)

**Current Coverage**: Hardcoded estimates  
**Target Coverage**: Detailed pricing per region

#### Data Structure
```json
{
  "region": "Greater Accra",
  "streetFood": {
    "breakfast": 15,      // GHS average
    "lunch": 25,
    "dinner": 30,
    "snacks": 10
  },
  "localRestaurant": {
    "breakfast": 30,
    "lunch": 50,
    "dinner": 60
  },
  "midRange": {
    "breakfast": 50,
    "lunch": 80,
    "dinner": 100
  },
  "premium": {
    "breakfast": 80,
    "lunch": 150,
    "dinner": 200
  },
  "popularDishes": [
    {
      "name": "Waakye",
      "avgPrice": 20,
      "category": "streetFood"
    }
  ]
}
```

#### Required Data
- Street food prices (chop bars, roadside)
- Local restaurant prices (basic eateries)
- Mid-range restaurant prices
- Premium/fine dining prices
- Popular local dishes and prices
- Regional specialties

#### Collection Method
- Visit 10+ food vendors per tier per region
- Record menu prices
- Calculate averages
- Note regional variations

---

## 6. SPECIAL DEALS & PACKAGES

### 6.1 Local Travel Deals

**File**: `localDeals.json`

**Current Coverage**: 3 sample deals  
**Target Coverage**: 50+ active deals

#### Data Structure
```json
{
  "id": "deal-001",
  "title": "Weekend at Aqua Safari",
  "description": "2 nights stay with breakfast and boat ride",
  "region": "Greater Accra",
  "price": 2500,              // GHS total
  "originalPrice": 3200,      // GHS before discount
  "validUntil": "2025-12-31",
  "tags": ["Weekend Getaway", "Luxury"],
  "provider": "Aqua Safari Resort",
  "contactInfo": "+233 30 123 4567",
  "inclusions": [
    "2 nights accommodation",
    "Breakfast",
    "Boat ride on Volta Lake"
  ],
  "exclusions": ["Transport", "Lunch/Dinner"],
  "minGroupSize": 2,
  "maxGroupSize": 10,
  "bookingLink": "https://..."
}
```

#### Deal Categories
- Weekend packages
- Group discounts
- Holiday specials
- Seasonal offers
- Multi-day tours
- Activity bundles

#### Target Sources
- Hotels and resorts
- Tour operators
- Activity providers
- Travel agencies
- Tourism boards
- Online travel platforms

---

## 7. ADDITIONAL DATA REQUIREMENTS

### 7.1 City/Town Data

**File**: `ghanaLocations.json` (NEW)

```json
{
  "name": "Accra",
  "region": "Greater Accra",
  "type": "Regional Capital",
  "population": 2400000,
  "coordinates": {
    "lat": 5.6037,
    "lng": -0.1870
  },
  "attractions": ["Labadi Beach", "Kwame Nkrumah Memorial Park"],
  "knownFor": ["Beaches", "Nightlife", "Markets"],
  "bestTimeToVisit": "Nov-Mar"
}
```

**Coverage Needed**: 100+ major cities/towns

---

### 7.2 Seasonal Pricing Variations

**File**: `seasonalMultipliers.json` (NEW)

```json
{
  "peakSeason": {
    "months": ["Dec", "Jan", "Aug"],
    "accommodationMultiplier": 1.3,
    "activityMultiplier": 1.2
  },
  "lowSeason": {
    "months": ["May", "Jun", "Sep"],
    "accommodationMultiplier": 0.8,
    "activityMultiplier": 0.9
  }
}
```

---

### 7.3 Essentials Costs

**File**: `localEssentials.json` (NEW)

```json
{
  "simCard": {
    "providers": ["MTN", "Vodafone", "AirtelTigo"],
    "dataPacks": [
      {
        "size": "5GB",
        "validity": "7 days",
        "price": 20
      }
    ]
  },
  "insurance": {
    "travelInsurance": {
      "perDay": 10,
      "perWeek": 50
    }
  },
  "visaFees": {
    "domestic": 0,
    "note": "No visa required for Ghanaian residents"
  }
}
```

---

## 8. DATA QUALITY STANDARDS

### 8.1 Validation Rules

| Data Type | Validation Criteria |
|-----------|---------------------|
| Prices | Must be positive numbers, in GHS, verified within last 3 months |
| Regions | Must match official Ghana region names |
| Distances | Cross-verified with Google Maps |
| Phone Numbers | Ghana format (+233...) |
| Dates | ISO 8601 format (YYYY-MM-DD) |
| URLs | Valid, accessible links |

### 8.2 Update Frequency

| Data Category | Update Frequency | Responsibility |
|---------------|------------------|----------------|
| Fuel prices | Monthly | Auto-fetch from GNPA |
| Accommodation | Quarterly | Data team survey |
| Transport fares | Quarterly | Field research |
| Activity prices | Bi-annually | Partner updates |
| Deals | Weekly | Automated scraping + manual |

### 8.3 Data Sources Priority

1. **Primary**: Direct from providers (hotels, tour operators)
2. **Secondary**: Official tourism boards, government data
3. **Tertiary**: Online platforms (Booking.com, Jumia Travel)
4. **Verification**: On-ground surveys, user feedback

---

## 9. IMPLEMENTATION TIMELINE

### Phase 1: Critical Data (Weeks 1-4)
- ✅ Complete all 16 regions accommodation data
- ✅ Top 50 transport routes
- ✅ Top 50 activities (10 per major region)

### Phase 2: Enhanced Data (Weeks 5-8)
- ✅ Food pricing per region
- ✅ 100+ activities total
- ✅ 50+ active deals
- ✅ Distance matrix complete

### Phase 3: Optimization (Weeks 9-12)
- ✅ Seasonal variations
- ✅ Essentials costs
- ✅ Location database
- ✅ Interest mapping expansion

---

## 10. DATA SUBMISSION FORMAT

### File Format
- **Format**: JSON
- **Encoding**: UTF-8
- **Validation**: Must pass JSON schema validation
- **Naming**: `[category]_[region]_[date].json`

### Submission Process
1. Collect data using provided templates
2. Validate against schema
3. Submit via Google Drive folder
4. Include source documentation
5. Data team reviews within 48 hours

### Quality Checklist
- [ ] All required fields populated
- [ ] Prices verified within last 3 months
- [ ] Sources documented
- [ ] No duplicate entries
- [ ] Spelling and grammar checked
- [ ] Regional names standardized
- [ ] Contact information verified

---

## 11. CONTACT & SUPPORT

**Data Team Lead**: [Name]  
**Email**: data@goghana.com  
**Slack Channel**: #local-mode-data  
**Documentation**: [Link to Google Drive]

### Questions?
For clarifications on data requirements, contact the technical team or refer to the example files in `/src/data/` directory.

---

## APPENDIX A: Ghana's 16 Regions

1. Greater Accra
2. Ashanti
3. Central
4. Western
5. Western North
6. Eastern
7. Volta
8. Oti
9. Northern
10. Savannah
11. North East
12. Upper East
13. Upper West
14. Bono
15. Bono East
16. Ahafo

---

## APPENDIX B: Sample Data Collection Form

[See separate Google Form template]

---

**Document End**
