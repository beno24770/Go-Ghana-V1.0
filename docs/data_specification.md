# Data Specification Report: The "Outstanding" Standard

## 1. Objective
To elevate Go Ghana AI from a "good estimator" to an "outstanding authority," we must move from estimated averages to verified, high-granularity, real-time data.

## 2. Critical Data Requirements

### 🚀 Real-Time Market Data
- **Dynamic Exchange Rate**: Integration with a live API (e.g., ExchangeRate-API) to track GHS volatility.
- **Fuel Pricing**: Live updates for Petrol/Diesel prices in Ghana to maintain transport accuracy.

### 📍 Verified Regional Profiles
- **Accurately Modeled Multipliers**: Transition from estimated regional multipliers (e.g., "1.4x for Accra") to data-derived multipliers from a survey of 50+ establishments per region.
- **Seasonal Granularity**: Month-by-month multipliers for ALL 16 regions (currently some use defaults).

### 🏨 Points of Interest (POI) Database
To make recommendations outstanding, we need a rich metadata layer for all POIs:
- **Media**: High-quality images (min 3 per location).
- **Coordinates**: Precise GPS data for map integration.
- **Pricing**: Dynamic Foreigner vs. Local pricing for attractions (e.g., Kakum, Castles).
- **Operating Hours**: Verified open/close times including holiday variations.

### 🚌 Transport & Logistics
- **Operator Integration**: Official fare tables for STC and VIP buses.
- **Domestic Flight Schedules**: Live or frequently updated schedules for PassionAir and AWA.
- **Ride-Hailing Baselines**: Current per-km rates for Bolt/Uber in major cities.

## 3. Proposed Schema Enhancements

### Enhanced POI Schema
```json
{
  "id": "string",
  "name": "string",
  "category": "accommodation | restaurant | attraction",
  "pricing": {
    "local": "number",
    "foreigner": "number",
    "currency": "GHS"
  },
  "metadata": {
    "images": ["url"],
    "rating": "number",
    "verified": "boolean",
    "amenities": ["string"]
  }
}
```

## 4. Collection Strategy
1.  **Web Scraping**: Automate price collection from Booking.com and TripAdvisor for Ghanaian hotels.
2.  **Official Partnerships**: Contact Ghana Tourism Authority (GTA) for official museum/castle rate cards.
3.  **Local "Runners"**: Deploy local data collectors to verify chop bar and trotro prices in less digital regions (e.g., Upper West, North East).
