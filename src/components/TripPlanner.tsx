import { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { LocalModeToggle } from './local/LocalModeToggle';
import { LocalEstimator } from './local/LocalEstimator';
import type { BudgetFormData, Tour } from '../types';

interface TripPlannerProps {
    formData: BudgetFormData;
    budgetTotal: number;
    selectedTour: Tour | null;
    onContinue: () => void;
}

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function TripPlanner({ formData, budgetTotal, selectedTour, onContinue }: TripPlannerProps) {
    const [isLocalMode, setIsLocalMode] = useState(false);
    const travelerCount = TRAVELER_COUNTS[formData.travelerType];

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto space-y-8 animate-[fadeSlideUp_0.6s_ease-out]">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-4xl font-bold text-foreground">
                            Plan Your Trip
                        </h2>
                        <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                        <p className="text-muted-foreground">
                            Customize your day-by-day itinerary
                        </p>
                    </div>

                    {/* Local Mode Toggle */}
                    <LocalModeToggle onToggle={setIsLocalMode} />

                    {/* Conditional Rendering: Local Mode or International Mode */}
                    {isLocalMode ? (
                        <LocalEstimator />
                    ) : (
                        <>
                            {/* Trip Overview */}
                            <Card className="border-t-4 border-t-[#FCD116] shadow-lg">
                                <CardHeader>
                                    <CardTitle>Your Trip Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-[#CE1126] mb-2" />
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-bold">{formData.duration} days</p>
                                        </div>
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <Users className="h-5 w-5 text-[#006B3F] mb-2" />
                                            <p className="text-sm text-muted-foreground">Travelers</p>
                                            <p className="font-bold">{travelerCount} {travelerCount === 1 ? 'person' : 'people'}</p>
                                        </div>
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <DollarSign className="h-5 w-5 text-[#FCD116] mb-2" />
                                            <p className="text-sm text-muted-foreground">Budget</p>
                                            <p className="font-bold">${budgetTotal.toLocaleString()}</p>
                                        </div>
                                        <div className="p-4 bg-muted/50 rounded-lg">
                                            <MapPin className="h-5 w-5 text-[#CE1126] mb-2" />
                                            <p className="text-sm text-muted-foreground">Regions</p>
                                            <p className="font-bold">{formData.regions?.length || 1}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Selected Tour (if any) */}
                            {selectedTour && (
                                <Card className="border-l-4 border-l-[#006B3F] shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-[#006B3F]" />
                                            Included Tour
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{selectedTour.title}</h3>
                                                <p className="text-sm text-muted-foreground">{selectedTour.duration}</p>
                                            </div>
                                            <p className="text-xl font-bold text-[#006B3F]">${selectedTour.price}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Planner Sections (Placeholder) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Day-by-Day Itinerary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-sm">Coming Soon</p>
                                            <p className="text-xs mt-1">Plan your daily activities</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Hotels & Accommodation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-sm">Coming Soon</p>
                                            <p className="text-xs mt-1">Select your stays</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Transport Options</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                            </svg>
                                            <p className="text-sm">Coming Soon</p>
                                            <p className="text-xs mt-1">Choose your transport</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Activities & Add-ons</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-muted-foreground">
                                            <svg className="h-12 w-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-sm">Coming Soon</p>
                                            <p className="text-xs mt-1">Add experiences</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Continue Button */}
                            <div className="flex justify-center pt-6">
                                <Button
                                    size="lg"
                                    onClick={onContinue}
                                    className="px-12 py-6"
                                >
                                    Continue to Summary
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
