import { Wallet, Utensils, Car, Map as MapIcon, Plane, TrendingUp, Users, Calendar as CalendarIcon, MapPin, Shield, MessageCircle, Phone, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { CurrencySelector } from './ui/CurrencySelector';
import { useCurrency } from '../contexts/CurrencyContext';
import { useChat } from '../contexts/ChatContext';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import { BASE_COSTS, REGIONAL_MULTIPLIERS, SEASONAL_MULTIPLIERS, INTER_REGION_TRANSPORT } from '../data/costData';

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
            {/* Success Message with Currency Selector */}
            <div className="text-center space-y-4 animate-[fadeSlideUp_0.6s_ease-out]">
                <h2 className="text-3xl font-bold text-foreground">
                    Your Estimated Budget Is Ready!
                </h2>
                <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                <div className="flex justify-center pt-2">
                    <CurrencySelector />
                </div>
            </div>

            {/* Summary Section */}
            <Card className="shadow-xl border-t-4 border-t-[#FCD116] animate-[scaleIn_0.5s_ease-out] hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Budget Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Grand Total */}
                    <div className="text-center p-6 bg-gradient-to-br from-[#CE1126] to-[#A00E1E] rounded-lg text-white">
                        <p className="text-sm opacity-90 mb-2">Grand Total</p>
                        <p className="text-5xl font-bold tracking-tight">{formatCurrency(breakdown.total)}</p>
                        <p className="text-sm opacity-75 mt-2">Range: {formatCurrency(minRange)} - {formatCurrency(maxRange)}</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-[#006B3F]">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-[#006B3F]" />
                                <p className="text-sm text-muted-foreground">Per Person</p>
                            </div>
                            <p className="text-2xl font-bold text-[#006B3F]">{formatCurrency(perPerson)}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-[#006B3F]">
                            <div className="flex items-center gap-2 mb-2">
                                <CalendarIcon className="h-4 w-4 text-[#006B3F]" />
                                <p className="text-sm text-muted-foreground">Daily Average</p>
                            </div>
                            <p className="text-2xl font-bold text-[#006B3F]">{formatCurrency(dailyAverage)}</p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        {formData?.duration && (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#006B3F] text-white rounded-full text-sm font-medium">
                                <CalendarIcon className="h-3 w-3" />
                                {formData.duration} {formData.duration === 1 ? 'Day' : 'Days'}
                            </div>
                        )}
                        {formData?.regions && formData.regions.length > 0 && (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FCD116] text-black rounded-full text-sm font-medium">
                                <MapPin className="h-3 w-3" />
                                {formData.regions.length} {formData.regions.length === 1 ? 'Region' : 'Regions'}
                            </div>
                        )}
                        {formData?.month && (
                            <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${isPeakSeason ? 'bg-[#CE1126] text-white' : 'bg-[#FCD116] text-black'}`}>
                                {formData.month} {isPeakSeason ? '(Peak Season)' : ''}
                            </div>
                        )}
                        {breakdown.flights > 0 && (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#FCD116] text-black rounded-full text-sm font-medium">
                                <Plane className="h-3 w-3" />
                                Flights Included
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Compact Expense Breakdown Section */}
            <Card className="shadow-lg animate-[scaleIn_0.6s_ease-out_0.1s] hover:scale-[1.01] transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <div className="w-1 h-6 bg-[#CE1126] rounded-full"></div>
                        Expense Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {expenseItems.map((item) => {
                        const Icon = item.icon;
                        const percentage = (item.amount / breakdown.total) * 100;
                        const dailyAvg = item.amount / (formData?.duration || 7);
                        const numRegions = formData?.regions?.length || 1;
                        const interRegionMoves = Math.max(0, numRegions - 1);

                        return (
                            <div key={item.label} className="space-y-1.5">
                                {/* Header Row */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" style={{ color: item.color }} />
                                        <span className="font-medium">{item.label.split(' (')[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-muted-foreground">
                                            Daily: {formatCurrency(dailyAvg)}
                                        </span>
                                        <span className="font-bold text-[#006B3F] min-w-[100px] text-right">
                                            {formatCurrency(item.amount)}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: item.color
                                        }}
                                    />
                                </div>

                                {/* Contextual Note for Transportation */}
                                {item.label.includes('Transportation') && interRegionMoves > 0 && (
                                    <p className="text-xs text-muted-foreground italic pl-6">
                                        Includes {interRegionMoves} inter-region move{interRegionMoves > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {/* Regional Breakdown Section */}
            {breakdown.regionalBreakdown && breakdown.regionalBreakdown.length > 0 && (
                <div className="space-y-6 animate-[fadeSlideUp_0.7s_ease-out_0.2s]">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-[#CE1126]" />
                        Regional Breakdown & Tips
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {breakdown.regionalBreakdown.map((region) => (
                            <Card key={region.region} className="shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-t-[#006B3F]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl flex justify-between items-start">
                                        <span>{region.region} Region</span>
                                        <div className="text-right">
                                            <p className="text-sm font-normal text-muted-foreground">Est. Total</p>
                                            <p className="text-lg font-bold text-[#006B3F]">{formatCurrency(region.totalCost)}</p>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>Daily Approx: <span className="font-semibold text-foreground">{formatCurrency(region.dailyCost)}</span></span>
                                    </div>

                                    {region.note && (
                                        <div className="text-sm italic text-muted-foreground border-l-2 border-[#FCD116] pl-3 py-1">
                                            "{region.note}"
                                        </div>
                                    )}

                                    {region.tips && region.tips.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold flex items-center gap-1">
                                                <Lightbulb className="h-3 w-3 text-[#FCD116]" />
                                                Adepa's Tips:
                                            </p>
                                            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                                                {region.tips.map((tip, i) => (
                                                    <li key={i}>{tip}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
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

                                    // Get base costs
                                    const baseCosts = {
                                        accommodation: BASE_COSTS.accommodation[formData.accommodationLevel],
                                        food: BASE_COSTS.food[formData.accommodationLevel],
                                        transport: BASE_COSTS.transport[formData.accommodationLevel],
                                        activities: BASE_COSTS.activities[formData.intensity?.toLowerCase() as 'relaxed' | 'moderate' | 'packed' || 'moderate']
                                    };

                                    // Calculate multipliers
                                    const regions = formData.regions || [];
                                    const regionalMultipliers = regions.map(r => REGIONAL_MULTIPLIERS[r] || 1.0);
                                    const avgRegionalMultiplier = regionalMultipliers.length > 0
                                        ? regionalMultipliers.reduce((sum, m) => sum + m, 0) / regionalMultipliers.length
                                        : 1.0;
                                    const seasonalMultiplier = formData.month ? (SEASONAL_MULTIPLIERS[formData.month] || 1.0) : 1.0;

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
                            className="px-8 py-6 border-2 border-[#FCD116] hover:bg-[#FCD116] hover:text-black transition-all duration-300 group"
                        >
                            <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                            Chat with Adepa - Your Free Ghana Travel Planner
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
                            className="px-8 py-6 border-2 border-[#006B3F] hover:bg-[#006B3F] hover:text-white transition-all duration-300 group"
                        >
                            <Phone className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                            Book a Free 30-Min Consultation with Our Ghana Experts
                        </Button>
                    </div>

                    {/* Continue to Tours Button */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            onClick={onContinue}
                            className="px-12 py-6 bg-[#CE1126] hover:bg-[#A00E1E] text-white"
                        >
                            Let Me Show You What Tours Your Budget Can Get You
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
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
