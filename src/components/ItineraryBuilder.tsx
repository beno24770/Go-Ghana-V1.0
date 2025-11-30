import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Sparkles, Loader2 } from 'lucide-react';
import type { TripItinerary } from '../types/itinerary';
import type { BudgetBreakdown, BudgetFormData } from '../types';
import { generateItinerary } from '../utils/itineraryGenerator';
import { ItineraryDayCard } from './ItineraryDayCard';
import { Button } from './ui/Button';

interface ItineraryBuilderProps {
    budget: BudgetBreakdown;
    formData: BudgetFormData;
    onBack?: () => void;
}

export function ItineraryBuilder({ budget, formData, onBack }: ItineraryBuilderProps) {
    const [itinerary, setItinerary] = useState<TripItinerary | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const generated = await generateItinerary(budget, formData, {
                useAI: true,
                includeAlternatives: false,
                optimizeRoute: true,
            });
            setItinerary(generated);
        } catch (err) {
            console.error('Failed to generate itinerary:', err);
            setError('Failed to generate itinerary. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Auto-generate on mount
    useState(() => {
        handleGenerate();
    });

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
                <div className="text-center space-y-6 max-w-md">
                    <div className="relative">
                        <div className="w-24 h-24 mx-auto">
                            <Loader2 className="w-24 h-24 text-ghana-green animate-spin" />
                        </div>
                        <Sparkles className="w-8 h-8 text-ghana-yellow absolute top-0 right-1/3 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Creating Your Perfect Ghana Itinerary
                        </h2>
                        <p className="text-gray-600">
                            Our AI is crafting a personalized day-by-day plan just for you...
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-ghana-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-ghana-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-ghana-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span>Analyzing your budget and preferences</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
                        <p className="text-gray-600">{error}</p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Button onClick={handleGenerate} className="bg-ghana-green hover:bg-green-800">
                            Try Again
                        </Button>
                        {onBack && (
                            <Button onClick={onBack} variant="outline">
                                Go Back
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!itinerary) {
        return null;
    }

    const { days, summary } = itinerary;
    const travelerCount = formData.travelers || 1;
    const perPerson = summary.totalCost / travelerCount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-ghana-green to-green-700 text-white">
                <div className="container mx-auto px-4 py-8 sm:py-12">
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="flex items-center gap-2 text-ghana-yellow">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                AI-Generated Itinerary
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            Your Personalized Ghana Adventure
                        </h1>
                        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{formData.duration} Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{formData.regions?.join(', ') || 'Greater Accra'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5" />
                                <span>GH₵ {summary.totalCost.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget Summary */}
            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Breakdown</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Accommodation</p>
                                <p className="text-lg font-bold text-gray-900">
                                    GH₵ {summary.totalAccommodationCost.toLocaleString()}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Food & Dining</p>
                                <p className="text-lg font-bold text-gray-900">
                                    GH₵ {summary.totalFoodCost.toLocaleString()}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Transport</p>
                                <p className="text-lg font-bold text-gray-900">
                                    GH₵ {summary.totalTransportCost.toLocaleString()}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Activities</p>
                                <p className="text-lg font-bold text-gray-900">
                                    GH₵ {summary.totalActivitiesCost.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Per Person</span>
                                <span className="text-2xl font-bold text-ghana-green">
                                    GH₵ {perPerson.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Day Cards */}
                    <div className="space-y-6">
                        {days.map((day) => (
                            <ItineraryDayCard key={day.day} day={day} />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-ghana-green hover:bg-green-800 text-white"
                            onClick={() => {
                                // TODO: Save itinerary
                                alert('Save functionality coming soon!');
                            }}
                        >
                            Save This Itinerary
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-ghana-green text-ghana-green hover:bg-ghana-green hover:text-white"
                            onClick={() => {
                                // TODO: Export to PDF
                                alert('PDF export coming soon!');
                            }}
                        >
                            Download as PDF
                        </Button>
                        {onBack && (
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={onBack}
                            >
                                Back to Budget
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
