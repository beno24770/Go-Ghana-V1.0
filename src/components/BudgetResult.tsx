import { useState } from 'react';
import { Wallet, Utensils, Car, Map as MapIcon, Plane, Shield, MessageCircle, Phone, Download, Loader2, Sparkles, Edit2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { BudgetChart } from './BudgetChart';
import { CategoryCard } from './CategoryCard';
import { CurrencySelector } from './ui/CurrencySelector';
import { useCurrency } from '../contexts/CurrencyContext';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { generateBudgetPDF } from '../utils/pdfGenerator';
import * as firestoreService from '../services/firestoreService';
import { CATEGORY_KNOWLEDGE } from '../data/categoryKnowledge';
import type { BudgetBreakdown, BudgetFormData } from '../types';

interface BudgetResultProps {
    breakdown: BudgetBreakdown | null;
    isLoading?: boolean;
    formData?: BudgetFormData;
    onContinue?: () => void;
    onEditBudget?: (step?: number) => void;
}

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function BudgetResult({ breakdown, isLoading = false, formData, onContinue, onEditBudget }: BudgetResultProps) {
    const { convertAndFormat, selectedCurrency } = useCurrency();
    const { toggleChat, setCategoryContext } = useChat();
    const { user } = useAuth();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<'pdf' | 'save' | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [showRegionalDetails, setShowRegionalDetails] = useState(false);

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto mt-8 space-y-6 animate-pulse">
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

    const formatCurrency = (amount: number) => convertAndFormat(amount);
    const travelerCount = formData ? TRAVELER_COUNTS[formData.travelerType] : 1;
    const perPerson = breakdown.total / travelerCount;
    const dailyAverage = formData ? breakdown.total / formData.duration : breakdown.total / 7;

    // Helper function to generate tips based on budget level
    const getAccommodationTips = () => {
        const dailyAccom = breakdown.accommodation / (formData?.duration || 7) / travelerCount;
        if (dailyAccom > 800) {
            return [
                "Luxury hotels and boutique resorts with premium amenities",
                "Expect 4-5 star properties with pools, spas, and fine dining",
                "Popular options: Kempinski, Labadi Beach Hotel, Movenpick"
            ];
        } else if (dailyAccom > 400) {
            return [
                "Mid-range hotels and comfortable guesthouses",
                "Clean, safe accommodations with AC and breakfast included",
                "Good options: Ibis, Best Western, local boutique hotels"
            ];
        } else {
            return [
                "Budget-friendly hostels and guesthouses",
                "Basic but clean rooms, often with shared facilities",
                "Great for backpackers and budget-conscious travelers"
            ];
        }
    };

    const getTransportTips = () => {
        return [
            "Includes inter-city travel and local transportation",
            "Private drivers offer comfort and flexibility",
            "Bolt/Uber available in major cities for convenience",
            "Tro-tros (shared vans) are the most economical option"
        ];
    };

    const getFoodTips = () => {
        const dailyFood = breakdown.food / (formData?.duration || 7) / travelerCount;
        if (dailyFood > 200) {
            return [
                "Fine dining at upscale restaurants and hotel buffets",
                "Mix of international and authentic Ghanaian cuisine",
                "Budget includes drinks, desserts, and special meals"
            ];
        } else if (dailyFood > 100) {
            return [
                "Comfortable local restaurants and chop bars",
                "Authentic Ghanaian dishes: jollof, banku, fufu, waakye",
                "Mix of sit-down meals and street food experiences"
            ];
        } else {
            return [
                "Street food and local chop bars",
                "Authentic and delicious local meals at great prices",
                "Try waakye, kenkey, red-red, and grilled tilapia"
            ];
        }
    };

    const getActivitiesTips = () => {
        return [
            "Entrance fees to castles, museums, and national parks",
            "Guided tours and cultural experiences",
            "Adventure activities like canopy walks and boat rides",
            "Nightlife and entertainment in Accra and Kumasi"
        ];
    };

    const getEssentialsTips = () => {
        return [
            "Visa fees (varies by nationality)",
            "Travel insurance for peace of mind",
            "Local SIM card and mobile data",
            "Airport transfers and tips"
        ];
    };

    const getFlightsTips = () => {
        return [
            "Roundtrip international flights to Accra",
            "Book 2-3 months in advance for best prices",
            "Consider layovers to save money",
            "Check baggage allowance for souvenirs"
        ];
    };

    // Prepare chart data
    const chartData = [
        { name: 'Accommodation', value: breakdown.accommodation, color: '#CE1126' },
        { name: 'Transport', value: breakdown.transport, color: '#FCD116' },
        { name: 'Food', value: breakdown.food, color: '#006B3F' },
        { name: 'Activities', value: breakdown.activities, color: '#CE1126' },
        { name: 'Essentials', value: breakdown.essentials, color: '#FCD116' },
    ];

    if (breakdown.flights > 0) {
        chartData.push({ name: 'Flights', value: breakdown.flights, color: '#006B3F' });
    }

    // Action handlers
    const handleAction = (action: 'pdf' | 'save') => {
        if (!user) {
            setPendingAction(action);
            setShowAuthModal(true);
        } else {
            executeAction(action);
        }
    };

    const executeAction = async (action: 'pdf' | 'save') => {
        if (!formData || !breakdown) return;

        if (action === 'pdf') {
            setIsGeneratingPdf(true);
            try {
                const doc = generateBudgetPDF(breakdown, formData, selectedCurrency);
                doc.save('GoGhana-Budget-Estimate.pdf');
            } catch (error) {
                console.error("Error generating PDF:", error);
            } finally {
                setIsGeneratingPdf(false);
            }
        } else if (action === 'save') {
            setIsSaving(true);
            try {
                if (user) {
                    await firestoreService.saveTrip(user.uid, {
                        name: `Ghana Trip - ${new Date().toLocaleDateString()}`,
                        description: `Budget estimate for ${formData.duration} days`,
                        formData,
                        breakdown
                    });
                }
            } catch (error) {
                console.error("Error saving trip:", error);
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        if (pendingAction) {
            executeAction(pendingAction);
            setPendingAction(null);
        }
    };

    const handleConsultation = async () => {
        setIsBooking(true);
        try {
            if (user && formData) {
                await firestoreService.saveConsultationRequest(user.uid, {
                    budgetSummary: breakdown,
                    formData: formData
                });
            }
            window.open('https://calendly.com/weareitv98/30min', '_blank');
        } catch (error) {
            console.error("Error saving consultation:", error);
            window.open('https://calendly.com/weareitv98/30min', '_blank');
        } finally {
            setIsBooking(false);
        }
    };

    const handleAskAdepa = (category: string, amount: number) => {
        if (!formData || !breakdown) return;

        const categoryKey = category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
        const knowledge = CATEGORY_KNOWLEDGE[categoryKey] || CATEGORY_KNOWLEDGE[category.toLowerCase()];

        if (knowledge) {
            const context = {
                amount,
                formattedAmount: formatCurrency(amount),
                duration: formData.duration,
                travelers: travelerCount,
                regions: formData.regions,
                month: formData.month,
                travelStyle: formData.travelerType
            };

            // Generate greeting and set category context
            const greeting = knowledge.greetingTemplate(context);

            setCategoryContext({
                category: categoryKey,
                greeting,
                suggestedQuestions: knowledge.suggestedQuestions,
                amount,
                formattedAmount: formatCurrency(amount)
            });

            // Chat will open automatically via setCategoryContext
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto mt-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Your Trip Budget Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                    A complete breakdown of your Ghana adventure
                </p>
                <CurrencySelector />
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Budget Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-t-4 border-t-ghana-green">
                            <CardContent className="p-6 text-center">
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Total Budget</p>
                                <p className="text-3xl font-bold text-ghana-green">{formatCurrency(breakdown.total)}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-t-4 border-t-[#FCD116]">
                            <CardContent className="p-6 text-center">
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Per Person</p>
                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(perPerson)}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-t-4 border-t-[#CE1126]">
                            <CardContent className="p-6 text-center">
                                <p className="text-sm font-medium text-gray-500 uppercase mb-1">Daily Average</p>
                                <p className="text-3xl font-bold text-gray-900">{formatCurrency(dailyAverage)}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Budget Visualization */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Budget Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BudgetChart data={chartData} />
                        </CardContent>
                    </Card>

                    {/* Category Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Expense Categories</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <CategoryCard
                                icon={Wallet}
                                label="Accommodation"
                                amount={breakdown.accommodation}
                                percentage={(breakdown.accommodation / breakdown.total) * 100}
                                color="#CE1126"
                                formatCurrency={formatCurrency}
                                onEdit={() => onEditBudget?.(2)} // Step 2: Accommodation
                                tips={getAccommodationTips()}
                                onAskAdepa={() => handleAskAdepa('accommodation', breakdown.accommodation)}
                            />
                            <CategoryCard
                                icon={Car}
                                label="Transport"
                                amount={breakdown.transport}
                                percentage={(breakdown.transport / breakdown.total) * 100}
                                color="#FCD116"
                                formatCurrency={formatCurrency}
                                onEdit={() => onEditBudget?.(4)} // Step 4: Transport
                                tips={getTransportTips()}
                                onAskAdepa={() => handleAskAdepa('transport', breakdown.transport)}
                            />
                            <CategoryCard
                                icon={Utensils}
                                label="Food & Dining"
                                amount={breakdown.food}
                                percentage={(breakdown.food / breakdown.total) * 100}
                                color="#006B3F"
                                formatCurrency={formatCurrency}
                                onEdit={() => onEditBudget?.(2)} // Step 2: Food (tied to tier)
                                tips={getFoodTips()}
                                onAskAdepa={() => handleAskAdepa('food', breakdown.food)}
                            />
                            <CategoryCard
                                icon={MapIcon}
                                label="Activities"
                                amount={breakdown.activities}
                                percentage={(breakdown.activities / breakdown.total) * 100}
                                color="#CE1126"
                                formatCurrency={formatCurrency}
                                onEdit={() => onEditBudget?.(6)} // Step 6: Interests
                                tips={getActivitiesTips()}
                                onAskAdepa={() => handleAskAdepa('activities', breakdown.activities)}
                            />
                            <CategoryCard
                                icon={Shield}
                                label="Essentials"
                                amount={breakdown.essentials}
                                percentage={(breakdown.essentials / breakdown.total) * 100}
                                color="#FCD116"
                                formatCurrency={formatCurrency}
                                tips={getEssentialsTips()}
                                onAskAdepa={() => handleAskAdepa('essentials', breakdown.essentials)}
                            />
                            {breakdown.flights > 0 && (
                                <CategoryCard
                                    icon={Plane}
                                    label="Flights"
                                    amount={breakdown.flights}
                                    percentage={(breakdown.flights / breakdown.total) * 100}
                                    color="#006B3F"
                                    formatCurrency={formatCurrency}
                                    tips={getFlightsTips()}
                                    onAskAdepa={() => handleAskAdepa('flights', breakdown.flights)}
                                    onEdit={() => onEditBudget?.(5)} // Step 5: Flights
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* Regional Breakdown (Collapsible) */}
                    {breakdown.regionalBreakdown && breakdown.regionalBreakdown.length > 0 && (
                        <Card>
                            <CardHeader>
                                <button
                                    onClick={() => setShowRegionalDetails(!showRegionalDetails)}
                                    className="w-full flex items-center justify-between hover:text-ghana-green transition-colors"
                                >
                                    <CardTitle>Regional Cost Details</CardTitle>
                                    {showRegionalDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </button>
                            </CardHeader>
                            {showRegionalDetails && (
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {breakdown.regionalBreakdown.map((region) => (
                                            <Card key={region.region} className="border-l-4 border-l-ghana-green">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg flex justify-between">
                                                        <span>{region.region}</span>
                                                        <span className="text-ghana-green">{formatCurrency(region.totalCost)}</span>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <p className="text-sm text-gray-500">
                                                        Daily Est.: {formatCurrency(region.dailyCost)}
                                                    </p>
                                                    {region.note && (
                                                        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100 italic">
                                                            {region.note}
                                                        </p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    )}
                </div>

                {/* Right Column - Action Panel */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-4">
                        <Card className="border-2 border-ghana-green">
                            <CardHeader>
                                <CardTitle className="text-lg">Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Primary Action */}
                                <Button
                                    size="lg"
                                    onClick={onContinue}
                                    className="w-full bg-gradient-to-r from-[#FCD116] to-[#D97706] hover:from-[#D97706] hover:to-[#FCD116] text-gray-900 font-bold"
                                >
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    See What My Budget Buys
                                </Button>

                                {/* Secondary Actions */}
                                <div className="pt-2 border-t">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Save & Share</p>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => handleAction('save')}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                            Save to My Trips
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={() => handleAction('pdf')}
                                            disabled={isGeneratingPdf}
                                        >
                                            {isGeneratingPdf ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                                            Download PDF
                                        </Button>
                                    </div>
                                </div>

                                {/* Get Help */}
                                <div className="pt-2 border-t">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Get Expert Help</p>
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={toggleChat}
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Chat with Adepa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            onClick={handleConsultation}
                                            disabled={isBooking}
                                        >
                                            {isBooking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Phone className="mr-2 h-4 w-4" />}
                                            Free 30-Min Consultation
                                        </Button>
                                    </div>
                                </div>

                                {/* Edit Budget */}
                                {onEditBudget && (
                                    <div className="pt-2 border-t">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start text-gray-600 hover:text-ghana-green"
                                            onClick={() => onEditBudget?.(1)}
                                        >
                                            <Edit2 className="mr-2 h-4 w-4" />
                                            Edit Full Budget
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

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
