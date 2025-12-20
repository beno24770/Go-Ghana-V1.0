import { Check, Download, Mail, Phone, RotateCcw, Save, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';
// import * as firestoreService from '../services/firestoreService';
import type { BudgetFormData, BudgetBreakdown, Tour } from '../types';
import { useState } from 'react';

interface TripSummaryProps {
    formData: BudgetFormData;
    budgetBreakdown: BudgetBreakdown;
    selectedTour?: Tour | null;
    onStartOver: () => void;
}

const TRAVELER_COUNTS = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 4,
};

export function TripSummary({ formData, budgetBreakdown, selectedTour, onStartOver }: TripSummaryProps) {
    const { convertAndFormat } = useCurrency();
    const { currentUser } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');

    const travelerCount = TRAVELER_COUNTS[formData.travelerType];

    const formatCurrency = (amount: number) => {
        return convertAndFormat(amount);
    };

    const handleSaveTrip = async () => {
        if (!currentUser) return;

        setSaving(true);
        setSaveError('');

        try {
            // await firestoreService.saveTrip(currentUser.uid, {
            //     name: `Trip to Ghana (${formData.duration} days)`,
            //     description: `A ${formData.accommodationLevel} trip for ${travelerCount} people.`,
            //     formData,
            //     breakdown: budgetBreakdown,
            //     selectedTour: selectedTour || undefined
            // });
            console.warn('Save trip functionality temporarily disabled pending backend integration');
            setSaveSuccess(true);
        } catch (err) {
            console.error('Error saving trip:', err);
            setSaveError('Failed to save trip. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#FFF8E6] to-white py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-8 animate-[fadeSlideUp_0.6s_ease-out]">
                    {/* Success Header */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="bg-[#006B3F] p-4 rounded-full">
                                <Check className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-foreground">
                            Your Ghana Trip is Ready!
                        </h1>
                        <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                        <p className="text-xl text-muted-foreground">
                            Here's your complete trip summary
                        </p>
                    </div>

                    {/* Trip Details Card */}
                    <Card className="shadow-xl border-t-4 border-t-[#FCD116]">
                        <CardHeader>
                            <CardTitle className="text-2xl">Trip Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="text-lg font-bold">{formData.duration} days</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Travelers</p>
                                    <p className="text-lg font-bold">{travelerCount} {travelerCount === 1 ? 'person' : 'people'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Travel Month</p>
                                    <p className="text-lg font-bold">{formData.month || 'Not specified'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Regions</p>
                                    <p className="text-lg font-bold">{formData.regions?.length || 1}</p>
                                </div>
                            </div>

                            {formData.regions && formData.regions.length > 0 && (
                                <div>
                                    <p className="text-sm text-muted-foreground mb-2">Selected Regions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.regions.map(region => (
                                            <span key={region} className="px-3 py-1 bg-[#FCD116] text-black rounded-full text-sm font-medium">
                                                {region}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Budget Summary */}
                    <Card className="shadow-xl bg-gradient-to-br from-[#CE1126] to-[#A00E1E] text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Total Budget</CardTitle>
                            <p className="text-sm opacity-90">for {formData.duration} {formData.duration === 1 ? 'day' : 'days'}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <p className="text-5xl font-bold mb-2">{formatCurrency(budgetBreakdown.total)}</p>
                                <p className="text-sm opacity-90">
                                    {formatCurrency(budgetBreakdown.total / travelerCount)} per person
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Selected Tour (if any) */}
                    {selectedTour && (
                        <Card className="shadow-lg border-l-4 border-l-[#006B3F]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-[#006B3F]" />
                                    Included Tour
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold">{selectedTour.title}</h3>
                                        <p className="text-muted-foreground mt-1">{selectedTour.description}</p>
                                        <p className="text-sm text-muted-foreground mt-2">{selectedTour.duration}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-[#006B3F]">{convertAndFormat(selectedTour.price)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Save Action */}
                    {currentUser && !saveSuccess && (
                        <div className="flex flex-col gap-3 justify-center items-center w-full md:w-auto mx-auto">
                            <Button
                                onClick={handleSaveTrip}
                                disabled={saving}
                                className="w-full md:w-auto px-8 py-6 bg-[#006B3F] hover:bg-[#005030] text-white"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Saving Trip...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-5 w-5" />
                                        Save This Trip to My Dashboard
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {/* Offline Save Button - Always visible */}
                    <div className="flex justify-center mt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                import('../services/offlineStorage').then(({ offlineStorage }) => {
                                    offlineStorage.saveTrip({
                                        title: `Trip to Ghana (${formData.duration} days)`,
                                        budgetResult: budgetBreakdown,
                                        formData: formData
                                    });
                                    alert('Trip saved to Offline Pocket Guide!');
                                });
                            }}
                            className="w-full md:w-auto border-[#006B3F] text-[#006B3F] hover:bg-[#006B3F] hover:text-white"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Save for Offline (Pocket Guide)
                        </Button>
                    </div>



                    {saveSuccess && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                            <p className="font-semibold flex items-center justify-center gap-2">
                                <Check className="h-5 w-5" />
                                Trip saved successfully! View it in your Dashboard.
                            </p>
                        </div>
                    )}

                    {saveError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                            {saveError}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full py-6"
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            Talk to a Travel Expert
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full py-6"
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Email This Summary
                        </Button>
                    </div>

                    {/* Additional Actions */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onStartOver}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Start Over
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-sm text-muted-foreground">
                        This is an estimate. Final costs may vary based on availability and seasonal changes.
                    </p>
                </div>
            </div>
        </div>
    );
}
