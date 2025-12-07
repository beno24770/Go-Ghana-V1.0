# Budget Engine V3 Documentation

## Overview
The V3 Budget Engine replaces static multipliers with a dynamic, data-driven calculation model. It uses regional cost profiles, accurate distance matrices, and adaptive scaling to generate precise travel budget estimates for Ghana.

## Core Components

### 1. Tier Logic & Adaptive Scaling
Instead of 5 fixed budget tiers, the engine uses:
- **Base Tier Costs:** Loaded from `tierBaseCosts.json` (Accommodation, Food, Transport, Activity).
- **Flex Tier:** If a user provides a `customDailyBudget`, the engine calculates a `ScalingFactor` by comparing the custom budget against the default "Backpacker" baseline.
- **Formula:** 
  > EffectivenessScalingFactor = (CustomBudget / BaseTierCost)

### 2. Regional Cost Profiles
Each region has a unique profile in `regionCostProfiles.json` defining:
- `accommodationMultiplier`: Cost variance for hotels/lodges (e.g., Accra = 1.4x, Northern = 0.8x).
- `foodMultiplier`: Dining cost variance.
- `transportMultiplier`: Local transport cost variance.
- `seasonalityIndex`: A 12-month array of multipliers (e.g., Dec = 1.3x).

### 3. Transport Engine
The engine calculates transport costs using:
- **Distance Matrix:** Accurate km distances between 8 major cities (`distanceMatrix.json`).
- **Route Logic:** Assumes a circular route starting and ending in Accra, visiting selected regions sequentially.
- **Modes:**
    - *Public:* Distance-based + Base Fare.
    - *Bolt:* Inter-city pricing + Intra-city daily allowance.
    - *Private/Rental:* Daily rate + Fuel calculation (Distance / Efficiency * FuelPrice).
    - *Flight:* Base fare for Northern legs + Local transport.

### 4. Accommodation Engine
- **Occupancy Smoothing:** 
    - Shared: Cost / 2
    - Family: Cost * Adjustment Factor (not just flat per person)
- **Seasonality:** Applies the specific month's index from the Regional Profile.

### 5. Essentials & Contingency
- **Visa:** Lookup table based on nationality (`visaRules.json`).
- **International Flights:** Estimates based on Origin (`internationalFlights.json`).
- **Contingency:**
    - Base: 10%
    - Luxury Tier: +5%
    - Adventure Activities: +3%
    - Multi-Region (>2): +2%

## Data Dictionary
All data is stored in `src/data/engine/`.

| File | Purpose | Key Fields |
|------|---------|------------|
| `tierBaseCosts.json` | Baseline costs per day | `accommodation`, `food`, `transport` |
| `regionCostProfiles.json` | Regional variances | `multipliers`, `seasonalityIndex` |
| `distanceMatrix.json` | Inter-city distances | City-to-City km map |
| `transportModes.json` | Mode pricing | `costPerKm`, `dailyRate` |

## Example Calculation
**Scenario:** 10 Days, Solo, "Budget" Tier, Region: "Central", Month: "December" vs "May".

1. **Base Cost:** Budget Tier = 450 (Accom) + 250 (Food) ...
2. **Region:** Central Multiplier (Accom) = 1.2
3. **Season:** December Factor = 1.3
4. **Result:** 
   > DailyAccom = 450 * 1.2 * 1.3 = 702 GHS

*Note: In May (Factor 0.9), cost would be ~486 GHS.*
