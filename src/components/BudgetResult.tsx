import { Wallet, Utensils, Car, Map as MapIcon, Plane, TrendingUp, Users, Calendar as CalendarIcon, MapPin, Shield, MessageCircle, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { CurrencySelector } from './ui/CurrencySelector';
import { useCurrency } from '../contexts/CurrencyContext';
import { useChat } from '../contexts/ChatContext';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import { BASE_COSTS, REGIONAL_MULTIPLIERS, SEASONAL_MULTIPLIERS, INTER_REGION_TRANSPORT, TRANSPORT_MODE_COSTS, ROOM_SHARING_MULTIPLIERS } from '../data/costData';

import { TourRecommendations } from './TourRecommendations';

interface BudgetResultProps {
    breakdown: BudgetBreakdown | null;
    isLoading?: boolean;
    formData?: BudgetFormData;
    onContinue?: () => void;
}

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function BudgetResult({ breakdown, isLoading = false, formData, onContinue }: BudgetResultProps) {
    const { convertAndFormat } = useCurrency();
    const { toggleChat, setBudgetContext } = useChat();

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto mt-8 space-y-6 animate-pulse">
                <div className="h-12 bg-muted rounded w-3/4 mx-auto"></div>
                <Card>
                    <CardContent className="p-8">
                        <div className="space-y-4">
                            <div className="h-24 bg-muted rounded"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-16 bg-muted rounded"></div>
                                <div className="h-16 bg-muted rounded"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!breakdown) return null;

    // All amounts in breakdown are in GHS (base currency)
    // convertAndFormat will convert to selected currency
    const formatCurrency = (amount: number) => {
        return convertAndFormat(amount);
    };

    const travelerCount = formData ? TRAVELER_COUNTS[formData.travelerType] : 1;
    const perPerson = breakdown.total / travelerCount;
    const dailyAverage = formData ? breakdown.total / formData.duration : breakdown.total / 7;
    const minRange = Math.round(breakdown.total * 0.85);
    const maxRange = Math.round(breakdown.total * 1.15);

    const expenseItems = [
        { label: 'Accommodation', amount: breakdown.accommodation, icon: Wallet, color: '#CE1126' },
        { label: 'Food & Dining', amount: breakdown.food, icon: Utensils, color: '#006B3F' },
        { label: 'Transportation', amount: breakdown.transport, icon: Car, color: '#FCD116' },
        { label: 'Activities', amount: breakdown.activities, icon: MapIcon, color: '#CE1126' },
        { label: 'Essentials (Visa, SIM, Insurance)', amount: breakdown.essentials, icon: Shield, color: '#006B3F' },
    ];

    if (breakdown.flights > 0) {
        expenseItems.push({ label: 'International Flights', amount: breakdown.flights, icon: Plane, color: '#006B3F' });
    }

    expenseItems.push({ label: 'Contingency Buffer (10%)', amount: breakdown.contingency, icon: TrendingUp, color: '#FCD116' });





    const isPeakSeason = formData?.month && ['January', 'August', 'December'].includes(formData.month);

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    💰 Your Ghana Trip Budget Estimate
                </h2>
                <p className="text-xl text-muted-foreground">
                    A breakdown based on your preferences
                </p>
                <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                <div className="flex justify-center pt-2">
                    <CurrencySelector />
                </div>
            </div>

            {/* Key Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[scaleIn_0.5s_ease-out]">
                {/* Total Trip Cost */}
                <Card className="border-t-4 border-t-[#006B3F] shadow-lg bg-gradient-to-br from-white to-[#006B3F]/5">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Trip Cost</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-[#006B3F] tracking-tight">
                            {formatCurrency(breakdown.total)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Range: {formatCurrency(minRange)} - {formatCurrency(maxRange)}
                        </p>
                    </CardContent>
                </Card>

                {/* Cost Per Person */}
                <Card className="border-t-4 border-t-[#FCD116] shadow-lg bg-gradient-to-br from-white to-[#FCD116]/5">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Cost Per Person</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            {formatCurrency(perPerson)}
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{travelerCount} Traveler{travelerCount !== 1 ? 's' : ''}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Breakdown by Category */}
            <Card className="shadow-xl animate-[scaleIn_0.6s_ease-out_0.1s]">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <div className="w-1 h-6 bg-[#CE1126] rounded-full"></div>
                        Breakdown by Category
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Accommodation */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-[#CE1126]" />
                                <span className="font-medium">Accommodation</span>
                            </div>
                            <span className="font-bold">{formatCurrency(breakdown.accommodation)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#CE1126]" style={{ width: `${(breakdown.accommodation / breakdown.total) * 100}%` }} />
                        </div>
                    </div>

                    {/* Transport */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Car className="h-5 w-5 text-[#FCD116]" />
                                <span className="font-medium">Transport</span>
                            </div>
                            <span className="font-bold">{formatCurrency(breakdown.transport)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#FCD116]" style={{ width: `${(breakdown.transport / breakdown.total) * 100}%` }} />
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <MapIcon className="h-5 w-5 text-[#006B3F]" />
                                <span className="font-medium">Activities</span>
                            </div>
                            <span className="font-bold">{formatCurrency(breakdown.activities)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#006B3F]" style={{ width: `${(breakdown.activities / breakdown.total) * 100}%` }} />
                        </div>
                    </div>

                    {/* Food */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Utensils className="h-5 w-5 text-[#CE1126]" />
                                <span className="font-medium">Food</span>
                            </div>
                            <span className="font-bold">{formatCurrency(breakdown.food)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#CE1126]" style={{ width: `${(breakdown.food / breakdown.total) * 100}%` }} />
                        </div>
                    </div>

                    {/* Miscellaneous (Essentials + Contingency) */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-[#FCD116]" />
                                <span className="font-medium">Miscellaneous</span>
                            </div>
                            <span className="font-bold">{formatCurrency(breakdown.essentials + breakdown.contingency)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#FCD116]" style={{ width: `${((breakdown.essentials + breakdown.contingency) / breakdown.total) * 100}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground pl-7">Includes Visa, SIM, Insurance & 10% Contingency</p>
                    </div>

                    {/* Flights & Add-ons */}
                    {breakdown.flights > 0 && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Plane className="h-5 w-5 text-[#006B3F]" />
                                    <span className="font-medium">Flights & Add-ons</span>
                                </div>
                                <span className="font-bold">{formatCurrency(breakdown.flights)}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-[#006B3F]" style={{ width: `${(breakdown.flights / breakdown.total) * 100}%` }} />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Regional Cost Breakdown */}
            {breakdown.regionalBreakdown && breakdown.regionalBreakdown.length > 0 && (
                <div className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out_0.2s]">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-[#CE1126]" />
                        Regional Cost Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {breakdown.regionalBreakdown.map((region) => (
                            <Card key={region.region} className="border-l-4 border-l-[#006B3F]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex justify-between">
                                        <span>{region.region}</span>
                                        <span className="text-[#006B3F]">{formatCurrency(region.totalCost)}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Est. Daily: {formatCurrency(region.dailyCost)}
                                    </p>
                                    {region.note && (
                                        <p className="text-xs italic text-muted-foreground mt-2">"{region.note}"</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Daily Spend Estimate */}
            <Card className="bg-muted/30 animate-[fadeSlideUp_0.7s_ease-out_0.3s]">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-[#006B3F]/10 rounded-full">
                            <CalendarIcon className="h-6 w-6 text-[#006B3F]" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Daily Spend Estimate</p>
                            <p className="text-sm text-muted-foreground">Average cost per day</p>
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-[#006B3F]">{formatCurrency(dailyAverage)}</p>
                </CardContent>
            </Card>

            {/* Suggested Tours */}
            {formData && (
                <TourRecommendations
                    interests={formData.activities}
                    budget={breakdown.total}
                    regions={formData.regions}
                    month={formData.month}
                    embedded={true}
                    onSelectTour={(tour) => {
                        // Handle tour selection - maybe scroll to top or open modal?
                        // For now, we'll just log it or pass it up if onContinue handles it
                        console.log('Selected tour:', tour);
                        // If we had a prop for this, we'd call it.
                        // Since onContinue is for "Continue to Tours" in the old flow,
                        // we might want to repurpose it or add a new prop.
                    }}
                />
            )}

            {/* Action Buttons */}
            {onContinue && (
                <div className="flex flex-col gap-4 pt-6 animate-[fadeSlideUp_0.8s_ease-out_0.3s]">
                    {/* Chat with Adepa Button */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                if (breakdown && formData) {
                                    // Calculate detailed context for Adepa
                                    const travelerCount = TRAVELER_COUNTS[formData.travelerType];

                                    // Calculate multipliers
                                    const regions = formData.regions || [];
                                    const regionalMultipliers = regions.map(r => REGIONAL_MULTIPLIERS[r] || 1.0);
                                    const avgRegionalMultiplier = regionalMultipliers.length > 0
                                        ? regionalMultipliers.reduce((sum, m) => sum + m, 0) / regionalMultipliers.length
                                        : 1.0;
                                    const seasonalMultiplier = formData.month ? (SEASONAL_MULTIPLIERS[formData.month] || 1.0) : 1.0;

                                    // Get base costs with new factors
                                    let accommodationBase = BASE_COSTS.accommodation[formData.accommodationLevel];
                                    if (formData.roomSharing && ROOM_SHARING_MULTIPLIERS[formData.roomSharing]) {
                                        accommodationBase *= ROOM_SHARING_MULTIPLIERS[formData.roomSharing];
                                    }

                                    let transportBase = 0;
                                    if (formData.transportMode && TRANSPORT_MODE_COSTS[formData.transportMode] !== undefined) {
                                        const modeCost = TRANSPORT_MODE_COSTS[formData.transportMode];
                                        if (['private_driver', 'rental'].includes(formData.transportMode)) {
                                            transportBase = modeCost / travelerCount;
                                        } else {
                                            transportBase = modeCost;
                                        }
                                    } else {
                                        transportBase = BASE_COSTS.transport[formData.accommodationLevel];
                                    }

                                    const baseCosts = {
                                        accommodation: accommodationBase,
                                        food: BASE_COSTS.food[formData.accommodationLevel],
                                        transport: transportBase,
                                        activities: BASE_COSTS.activities[formData.intensity?.toLowerCase() as 'relaxed' | 'moderate' | 'packed' || 'moderate']
                                    };

                                    // Calculate daily costs per person
                                    const dailyCosts = {
                                        accommodation: baseCosts.accommodation * avgRegionalMultiplier * seasonalMultiplier,
                                        food: baseCosts.food * avgRegionalMultiplier * seasonalMultiplier,
                                        transport: baseCosts.transport * avgRegionalMultiplier * seasonalMultiplier,
                                        activities: baseCosts.activities * avgRegionalMultiplier * seasonalMultiplier
                                    };

                                    // Calculate inter-region transport
                                    const numRegions = regions.length || 1;
                                    const interRegionMoves = Math.max(0, numRegions - 1);
                                    const interRegionCostPerMove = INTER_REGION_TRANSPORT[formData.accommodationLevel];
                                    const interRegionTotal = interRegionMoves * interRegionCostPerMove * travelerCount;

                                    setBudgetContext({
                                        breakdown,
                                        formData,
                                        calculations: {
                                            dailyCosts,
                                            interRegionTransport: {
                                                moves: interRegionMoves,
                                                costPerMove: interRegionCostPerMove,
                                                total: interRegionTotal
                                            },
                                            multipliers: {
                                                regional: avgRegionalMultiplier,
                                                seasonal: seasonalMultiplier
                                            },
                                            baseCosts
                                        }
                                    });
                                }
                                toggleChat();
                            }}
                            className="px-8 py-6 border-2 border-[#FCD116] hover:bg-[#FCD116] hover:text-black transition-all duration-300 group w-full sm:w-auto"
                        >
                            <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                            Chat with Adepa about this Budget
                        </Button>
                    </div>

                    {/* Book Free Consultation Button */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                window.open('https://calendly.com/weareitv98/30min', '_blank');
                            }}
                            className="px-8 py-6 border-2 border-[#006B3F] hover:bg-[#006B3F] hover:text-white transition-all duration-300 group w-full sm:w-auto"
                        >
                            <Phone className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                            Book a Free 30-Min Consultation
                        </Button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes expandWidth {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }
            `}</style>
        </div>
    );
}
