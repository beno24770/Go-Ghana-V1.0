import { useState } from 'react';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { RecommendationCard } from './RecommendationCard';
import { useCurrency } from '../contexts/CurrencyContext';
import { getRecommendations } from '../services/recommendationService';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import type { SelectedRecommendations, RecommendationSet } from '../types/recommendations';

interface BudgetRecommendationsProps {
    breakdown: BudgetBreakdown;
    formData: BudgetFormData;
    selectedRecommendations?: SelectedRecommendations;
    onSelectionsChange?: (selections: SelectedRecommendations) => void;
    onContinue?: () => void;
    onBack?: () => void;
}

export function BudgetRecommendations({
    breakdown,
    formData,
    selectedRecommendations = {},
    onSelectionsChange,
    onContinue,
    onBack
}: BudgetRecommendationsProps) {
    const { convertAndFormat } = useCurrency();
    const [activeTab, setActiveTab] = useState<'accommodation' | 'activities' | 'food' | 'transport'>('accommodation');
    const [selections, setSelections] = useState<SelectedRecommendations>(selectedRecommendations);

    // Get personalized recommendations
    const recommendations: RecommendationSet = getRecommendations(breakdown, formData, {
        maxResults: 5,
        preferredRegions: formData.regions,
        travelStyle: formData.travelerType
    });

    const handleToggleSelection = (category: string, recommendationId: string) => {
        const categorySelections = selections[category] || [];
        const isSelected = categorySelections.includes(recommendationId);

        const newSelections = {
            ...selections,
            [category]: isSelected
                ? categorySelections.filter(id => id !== recommendationId)
                : [...categorySelections, recommendationId]
        };

        setSelections(newSelections);
        onSelectionsChange?.(newSelections);
    };

    const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);

    const tabs = [
        { id: 'accommodation' as const, label: 'Accommodation', count: recommendations.accommodation.length },
        { id: 'activities' as const, label: 'Activities', count: recommendations.activities.length },
        { id: 'food' as const, label: 'Food & Dining', count: recommendations.food.length },
        { id: 'transport' as const, label: 'Transport', count: recommendations.transport.length }
    ];

    const currentRecommendations = recommendations[activeTab];
    const currentSelections = selections[activeTab] || [];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        What Your Budget Buys
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Handpicked recommendations tailored to your {convertAndFormat(breakdown.total)} budget
                    </p>
                </div>
                {onBack && (
                    <Button variant="ghost" onClick={onBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Summary
                    </Button>
                )}
            </div>

            {/* Budget Overview */}
            <Card className="bg-gradient-to-r from-ghana-green/10 to-ghana-yellow/10 border-ghana-green/20">
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Accommodation</p>
                            <p className="text-2xl font-bold text-ghana-green">{convertAndFormat(breakdown.accommodation)}</p>
                            <p className="text-xs text-gray-500">{convertAndFormat(breakdown.accommodation / formData.duration)}/night</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Activities</p>
                            <p className="text-2xl font-bold text-ghana-green">{convertAndFormat(breakdown.activities)}</p>
                            <p className="text-xs text-gray-500">Total budget</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Food & Dining</p>
                            <p className="text-2xl font-bold text-ghana-green">{convertAndFormat(breakdown.food)}</p>
                            <p className="text-xs text-gray-500">{convertAndFormat(breakdown.food / formData.duration)}/day</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Transport</p>
                            <p className="text-2xl font-bold text-ghana-green">{convertAndFormat(breakdown.transport)}</p>
                            <p className="text-xs text-gray-500">{convertAndFormat(breakdown.transport / formData.duration)}/day</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Category Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                ${activeTab === tab.id
                                    ? 'border-ghana-green text-ghana-green'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            {tab.label}
                            <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gray-100">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Recommendations Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Recommended {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {currentSelections.length} selected
                    </p>
                </div>

                {currentRecommendations.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500">No recommendations found for your budget in this category.</p>
                            <p className="text-sm text-gray-400 mt-2">Try adjusting your budget allocation or exploring other categories.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentRecommendations.map(recommendation => (
                            <RecommendationCard
                                key={recommendation.id}
                                recommendation={recommendation}
                                isSelected={currentSelections.includes(recommendation.id)}
                                onToggleSelection={() => handleToggleSelection(activeTab, recommendation.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-600">
                    <Check className="inline h-4 w-4 text-ghana-green mr-1" />
                    {totalSelected} recommendations selected across all categories
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            // Save selections to localStorage or Firestore
                            localStorage.setItem('budget-recommendations', JSON.stringify(selections));
                        }}
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" />
                        Save Selections
                    </Button>
                    <Button
                        onClick={onContinue}
                        className="gap-2 bg-ghana-green hover:bg-green-800 text-white"
                    >
                        Continue to Itinerary
                    </Button>
                </div>
            </div>
        </div>
    );
}
