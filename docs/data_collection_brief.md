# Data Collection Brief: Go Ghana AI Budget Engine (V3)
**Target Audience**: Data Collection Team  
**Persona**: Engineering Lead

## 1. Objective
To stabilize and optimize the V3 Budget Engine, the data team must provide verified, localized price points across all 16 regions of Ghana. Our engine uses a **Baseline + Multiplier** model; therefore, accuracy at the baseline is mission-critical.

---

## 2. Section A: Tier Base Costs (Accra Baseline)
Our engine anchors all calculations to the **Greater Accra** region. Provide the daily baseline cost for a single traveler in these 5 tiers:

| Parameter | Backpacker | Budget | Mid-Range | Comfort | Luxury |
|-----------|------------|--------|-----------|---------|--------|
| **Accommodation** | hostel/shared | 2-star/pvt | 3-star/pvt | 4-star/boutique | 5-star/resort |
| **Daily Food** | Street/Chop | Local Rest | Formal/Casual | Fine Dining | Premium/Buffet |
| **Transport** | Trotro/Public | Bolt/Shared | Private Car | SUV/Chauffeur | Luxury SUV |
| **Daily Activity**| Free/Minimal | Museums | Guided Tours | Specialized | VIP/Private |

**Format Required**: CSV (Columns: `tier`, `category`, `costGHS`)

---

## 3. Section B: Regional Multipliers
Quantify how much more or less expensive each region is compared to Accra (Accra = 1.0).

| Region | Accommodation | Food | Transport | Activity |
|--------|---------------|------|-----------|----------|
| Greater Accra | 1.0 | 1.0 | 1.0 | 1.0 |
| Ashanti | *?* | *?* | *?* | *?* |
| Northern | *?* | *?* | *?* | *?* |
| Western | *?* | *?* | *?* | *?* |
| *(Repeat for all 16)*| | | | |

**Logic**: If a budget hotel in Accra is 500 GHS and a similar one in Tamale is 350 GHS, the multiplier for Northern is **0.7**.

---

## 4. Section C: Transport Details
We need specific data for the following modes:

1.  **Public (Inter-city)**: Average fare per 100km for STC/VIP.
2.  **Bolt**: Average cost for a 10km trip in major cities.
3.  **Private/Rental**: Daily hire rate + average fuel consumption (km/L) for Sedan vs. SUV.
4.  **Domestic Flights**: Fixed return fare for Accra-Tamale and Accra-Kumasi.

---

## 5. Section D: Interests & Activities (POI Data)
Categorize every Point of Interest (POI) by **Interest Category**.

**Required Categories**:
- `culture`: Castles, Museums, Cultural Centers.
- `adventure`: Hiking, Safari, Zip-lining.
- `nature`: Falls, Gardens, Sanctuaries.
- `relaxation`: Beaches, Spas.
- `nightlife`: Bars, Clubs.

**POI Data Format**:
```json
{
  "name": "Kakum National Park",
  "category": "adventure",
  "region": "Central",
  "entryFeeForeigner": 60,
  "entryFeeLocal": 10,
  "estimatedDurationHours": 3
}
```

---

## 6. Section E: Seasonality Data
Verify the **Seasonality Index** for each month:
- **Index > 1.0**: Peak season (Dec, Aug).
- **Index < 1.0**: Low season (May, June).

---

## 7. Delivery Format
- **Static Costs**: Google Sheets or CSV.
- **POI Database**: JSON or a structured Spreadsheet.
- **Photos**: High-resolution (1920x1080) in folders named by POI location.
