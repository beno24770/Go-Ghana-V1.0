import { Star, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { useCurrency } from '../contexts/CurrencyContext';
import type { Tour } from '../types';
import { tours } from '../data/tours';

interface TourRecommendationsProps {
    interests: string[];
    budget: number;
    regions?: string[];
    month?: string;
    onSelectTour?: (tour: Tour) => void;
    onSkip?: () => void;
    embedded?: boolean;
}

export function TourRecommendations({ interests, budget, regions, month, onSelectTour, onSkip, embedded }: TourRecommendationsProps) {
    const { convertAndFormat } = useCurrency();

    // Calculate budget per day per person (simplified: total / 7 days)
    const budgetPerDay = budget / 7;



    const filteredTours = tours.filter((tour) => {
        // Budget filter - compare tour's daily cost against user's daily budget
        // Allow tours within ±30% of daily budget for flexibility
        const budgetMin = budgetPerDay * 0.7;
        const budgetMax = budgetPerDay * 1.3;
        const withinBudget = tour.dailyCost >= budgetMin && tour.dailyCost <= budgetMax;

        // Interest filter - must match at least one interest
        const matchesInterest = tour.category.some((cat) => interests.includes(cat));

        // Region filter - if regions selected, tour must be in one of those regions
        const matchesRegion = !regions || regions.length === 0 ||
            !tour.regions ||
            tour.regions.some(r => regions.includes(r));

        // Month filter - if month selected and tour has bestMonths, check if month is optimal
        const matchesMonth = !month || !tour.bestMonths ||
            tour.bestMonths.includes(month);


        return withinBudget && matchesInterest && matchesRegion && matchesMonth;
    });



    // Categorize tours by their range
    const lowBudget = filteredTours.filter(t => t.range === 'backpacker' || t.range === 'budget');
    const midRange = filteredTours.filter(t => t.range === 'mid');
    const premium = filteredTours.filter(t => t.range === 'comfort' || t.range === 'luxury');

    // Select 3-6 tours across categories
    const selectedTours = [
        ...lowBudget.slice(0, 2),
        ...midRange.slice(0, 2),
        ...premium.slice(0, 2)
    ].sort((a, b) => b.rating - a.rating).slice(0, 6);

    // Helper to check if current month is best time for a tour
    const isBestTime = (tour: Tour) => {
        return month && tour.bestMonths && tour.bestMonths.includes(month);
    };

    // Helper to categorize tour
    const getTourCategory = (tour: Tour) => {
        if (tour.range === 'backpacker') return 'Backpacker';
        if (tour.range === 'budget') return 'Budget-Friendly';
        if (tour.range === 'mid') return 'Mid-Range';
        if (tour.range === 'comfort') return 'Comfort';
        return 'Luxury';
    };

    if (embedded) {
        return (
            <div className="space-y-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
                <div className="flex items-center gap-2 mb-4">
                    <Star className="h-6 w-6 text-[#FCD116] fill-[#FCD116]" />
                    <h3 className="text-2xl font-bold text-foreground">Suggested Tours</h3>
                </div>

                {selectedTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedTours.map((tour) => (
                            <Card
                                key={tour.id}
                                className="hover:border-[#FCD116] hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="px-2 py-1 bg-[#FCD116] text-black text-xs font-semibold rounded">
                                            {getTourCategory(tour)}
                                        </span>
                                        {isBestTime(tour) && (
                                            <span className="flex items-center gap-1 px-2 py-1 bg-[#006B3F] text-white text-xs font-semibold rounded">
                                                <Calendar className="h-3 w-3" />
                                                Best Time!
                                            </span>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-[#CE1126] transition-colors line-clamp-2">
                                        {tour.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 pb-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-[#FCD116] text-[#FCD116]" />
                                        <span className="font-semibold">{tour.rating}</span>
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-2xl font-bold text-[#006B3F]">{convertAndFormat(tour.price)}</p>
                                        <p className="text-xs text-muted-foreground">per person</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {onSelectTour && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-[#006B3F] text-[#006B3F] hover:bg-[#006B3F] hover:text-white"
                                            onClick={() => onSelectTour(tour)}
                                        >
                                            View Details
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center border rounded-lg bg-muted/30">
                        <p className="text-muted-foreground">
                            No specific tours found for your exact budget. Try adjusting your preferences.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto space-y-8 animate-[fadeSlideUp_0.6s_ease-out]">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-4xl font-bold text-foreground">
                            Recommended Tours For Your Budget
                        </h2>
                        <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                        <p className="text-lg text-muted-foreground mt-4">
                            Curated experiences matching your interests, budget, and travel preferences
                        </p>
                    </div>

                    {/* Tours Grid */}
                    {selectedTours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedTours.map((tour, index) => (
                                <Card
                                    key={tour.id}
                                    className="hover:border-[#FCD116] hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <span className="px-2 py-1 bg-[#FCD116] text-black text-xs font-semibold rounded">
                                                {getTourCategory(tour)}
                                            </span>
                                            {isBestTime(tour) && (
                                                <span className="flex items-center gap-1 px-2 py-1 bg-[#006B3F] text-white text-xs font-semibold rounded">
                                                    <Calendar className="h-3 w-3" />
                                                    Best Time!
                                                </span>
                                            )}
                                        </div>
                                        <CardTitle className="group-hover:text-[#CE1126] transition-colors">
                                            {tour.title}
                                        </CardTitle>
                                        <CardDescription>{tour.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>{tour.duration}</span>
                                        </div>
                                        {tour.regions && tour.regions.length > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span>{tour.regions.join(', ')}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-[#FCD116] text-[#FCD116]" />
                                            <span className="font-semibold">{tour.rating}</span>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-3xl font-bold text-[#006B3F]">{convertAndFormat(tour.price)}</p>
                                            <p className="text-xs text-muted-foreground">per person</p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="w-full"
                                        >
                                            View Details
                                        </Button>
                                        {onSelectTour && (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => onSelectTour(tour)}
                                            >
                                                Select This Tour
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-12 text-center">
                            <p className="text-lg text-muted-foreground">
                                No tours found matching your criteria. Try adjusting your budget or interests.
                            </p>
                        </Card>
                    )}

                    {/* Action Buttons */}
                    {onSkip && (
                        <div className="flex justify-center gap-4 pt-6">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onSkip}
                            >
                                Skip Tours - Plan My Own Trip
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
