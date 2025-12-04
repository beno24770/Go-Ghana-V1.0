import { useState } from 'react';
import { Wallet, Utensils, Car, Map as MapIcon, Plane, TrendingUp, Users, Calendar as CalendarIcon, MapPin, Shield, MessageCircle, Phone, Download, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { SplitButton } from './ui/SplitButton';
import { ItineraryBuilder } from './ItineraryBuilder';
import { CurrencySelector } from './ui/CurrencySelector';
import { useCurrency } from '../contexts/CurrencyContext';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { generateBudgetPDF } from '../utils/pdfGenerator';
import * as firestoreService from '../services/firestoreService';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import { BASE_COSTS, REGIONAL_MULTIPLIERS, SEASONAL_MULTIPLIERS, INTER_REGION_TRANSPORT, TRANSPORT_MODE_COSTS, ROOM_SHARING_MULTIPLIERS } from '../data/costData';

import { TourRecommendations } from './TourRecommendations';

interface BudgetResultProps {
    breakdown: BudgetBreakdown | null;
    isLoading?: boolean;
    formData?: BudgetFormData;
    onContinue?: () => void;
    onEditBudget?: () => void;
}

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function BudgetResult({ breakdown, isLoading = false, formData, onContinue, onEditBudget }: BudgetResultProps) {
    const { convertAndFormat, selectedCurrency } = useCurrency();
    const { toggleChat, setBudgetContext } = useChat();
    const { user } = useAuth();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<'chat' | 'consultation' | 'pdf' | 'itinerary' | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [showItinerary, setShowItinerary] = useState(false);

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

    // Show itinerary builder if requested
    if (showItinerary && formData) {
        return (
            <ItineraryBuilder
                budget={breakdown}
                formData={formData}
                onBack={() => setShowItinerary(false)}
            />
        );
    }

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

    // --- ACTION HANDLERS ---

    const handleAction = (action: 'chat' | 'consultation' | 'pdf' | 'itinerary') => {
        if (action === 'pdf' && !user) {
            setPendingAction(action);
            setShowAuthModal(true);
        } else {
            executeAction(action);
        }
    };

    const executeAction = async (action: 'chat' | 'consultation' | 'pdf' | 'itinerary') => {
        if (!formData || !breakdown) return;

        switch (action) {
            case 'itinerary':
                // Show itinerary builder
                setShowItinerary(true);
                break;
            case 'chat':
                prepareAndOpenChat();
                break;
            case 'consultation':
                await handleConsultationBooking();
                break;
            case 'pdf':
                await handlePdfDownload();
                break;
        }
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        if (pendingAction) {
            executeAction(pendingAction);
            setPendingAction(null);
        }
    };

    const prepareAndOpenChat = () => {
        if (breakdown && formData) {
            // Calculate detailed context for Adepa
            const travelerCount = TRAVELER_COUNTS[formData.travelerType];

            // Calculate multipliers
            const regions = formData.regions || [];
            const regionalMultipliers = regions.map((r: string) => REGIONAL_MULTIPLIERS[r] || 1.0);
            const avgRegionalMultiplier = regionalMultipliers.length > 0
                ? regionalMultipliers.reduce((sum: number, m: number) => sum + m, 0) / regionalMultipliers.length
                : 1.0;
            const seasonalMultiplier = formData.month ? (SEASONAL_MULTIPLIERS[formData.month] || 1.0) : 1.0;

            // Get base costs with new factors
            let accommodationBase = BASE_COSTS.accommodation[formData.accommodationLevel as keyof typeof BASE_COSTS.accommodation];
            if (formData.roomSharing && ROOM_SHARING_MULTIPLIERS[formData.roomSharing as keyof typeof ROOM_SHARING_MULTIPLIERS]) {
                accommodationBase *= ROOM_SHARING_MULTIPLIERS[formData.roomSharing as keyof typeof ROOM_SHARING_MULTIPLIERS];
            }

            let transportBase = 0;
            if (formData.transportMode && TRANSPORT_MODE_COSTS[formData.transportMode as keyof typeof TRANSPORT_MODE_COSTS] !== undefined) {
                const modeCost = TRANSPORT_MODE_COSTS[formData.transportMode as keyof typeof TRANSPORT_MODE_COSTS];
                if (['private_driver', 'rental'].includes(formData.transportMode)) {
                    transportBase = modeCost / travelerCount;
                } else {
                    transportBase = modeCost;
                }
            } else {
                transportBase = BASE_COSTS.transport[formData.accommodationLevel as keyof typeof BASE_COSTS.transport];
            }

            const baseCosts = {
                accommodation: accommodationBase,
                food: BASE_COSTS.food[formData.accommodationLevel as keyof typeof BASE_COSTS.food],
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
            const interRegionCostPerMove = INTER_REGION_TRANSPORT[formData.accommodationLevel as keyof typeof INTER_REGION_TRANSPORT];
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
    };

    const handleConsultationBooking = async () => {
        if (!formData) return;
        setIsBooking(true);
        try {
            // Save consultation request if user is logged in
            if (user) {
                await firestoreService.saveConsultationRequest(user.uid, {
                    budgetSummary: breakdown,
                    formData: formData
                });
            }

            // Open Calendly
            window.open('https://calendly.com/weareitv98/30min', '_blank');
        } catch (error) {
            console.error("Error saving consultation:", error);
            // Still open calendly even if save fails
            window.open('https://calendly.com/weareitv98/30min', '_blank');
        } finally {
            setIsBooking(false);
        }
    };

    const handlePdfDownload = async () => {
        if (!user || !formData || !breakdown) return;
        setIsGeneratingPdf(true);
        try {
            // Generate PDF
            const doc = generateBudgetPDF(breakdown, formData, selectedCurrency);

            // Save trip to dashboard (if not already saved - logic could be refined to avoid dupes)
            // For now, we'll save a new trip record to ensure the PDF corresponds to a saved trip
            await firestoreService.saveTrip(user.uid, {
                name: `Ghana Trip - ${new Date().toLocaleDateString()}`,
                description: `Budget estimate for ${formData.duration} days`,
                formData,
                breakdown
            });

            // Download PDF
            doc.save('GoGhana-Budget-Estimate.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

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
                        {breakdown.regionalBreakdown.map((region: { region: string; totalCost: number; dailyCost: number; note?: string }) => (
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
                    onSelectTour={(tour: unknown) => {
                        console.log('Selected tour:', tour);
                    }}
                />
            )}

            {/* Edit Budget Button */}
            {onEditBudget && (
                <div className="flex justify-center pt-4 animate-[fadeSlideUp_0.7s_ease-out_0.2s]">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={onEditBudget}
                        className="px-8 py-6 border-2 border-[#FCD116] hover:bg-[#FCD116] hover:text-gray-900 transition-all duration-300 group w-full sm:w-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Budget Inputs
                    </Button>
                </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-6 animate-[fadeSlideUp_0.8s_ease-out_0.3s]">
                {/* 1. Split Button: See What My Budget Buys Me / Chat with Expert */}
                <div className="flex justify-center">
                    <SplitButton
                        primaryLabel="See What My Budget Buys Me"
                        primaryIcon={<Sparkles className="h-5 w-5" />}
                        onPrimaryClick={() => handleAction('itinerary')}
                        options={[
                            {
                                label: 'Chat with Travel Expert',
                                icon: <MessageCircle className="h-5 w-5" />,
                                onClick: () => handleAction('chat'),
                            },
                        ]}
                        size="lg"
                        className="bg-gradient-to-r from-[#FCD116] to-[#D97706] hover:from-[#D97706] hover:to-[#FCD116] text-gray-900 font-bold border-0 hover:shadow-2xl hover:shadow-[#FCD116]/30"
                    />
                </div>

                {/* 2. Book a Free 30-Min Consultation */}
                <div className="flex justify-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleAction('consultation')}
                        disabled={isBooking}
                        className="px-8 py-6 border-2 border-[#006B3F] hover:bg-[#006B3F] hover:text-white transition-all duration-300 group w-full sm:w-auto"
                    >
                        {isBooking ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Phone className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                        )}
                        Book a Free 30-Min Consultation
                    </Button>
                </div>

                {/* 3. Download This Budget as PDF */}
                <div className="flex justify-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => handleAction('pdf')}
                        disabled={isGeneratingPdf}
                        className="px-8 py-6 border-2 border-[#CE1126] hover:bg-[#CE1126] hover:text-white transition-all duration-300 group w-full sm:w-auto"
                    >
                        {isGeneratingPdf ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                        )}
                        Download This Budget as PDF
                    </Button>
                </div>
            </div>

            {/* Continue Button */}
            {onContinue && (
                <div className="flex justify-center pt-4 pb-8 animate-[fadeSlideUp_0.9s_ease-out_0.4s]">
                    <Button
                        onClick={onContinue}
                        className="gap-2 px-8 py-6 text-lg bg-ghana-green hover:bg-green-800 text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                        Continue to Tour Recommendations <ArrowRight className="h-5 w-5" />
                    </Button>
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

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
                initialView="login"
            />
        </div>
    );
}
