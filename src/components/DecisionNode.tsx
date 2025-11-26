import { Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import type { Tour } from '../types';

interface DecisionNodeProps {
    selectedTour: Tour | null;
    onSelectTour: () => void;
    onPlanTrip: () => void;
}

export function DecisionNode({ selectedTour, onSelectTour, onPlanTrip }: DecisionNodeProps) {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto space-y-8 animate-[fadeSlideUp_0.6s_ease-out]">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-foreground">
                            Ready to Plan Your Trip?
                        </h2>
                        <div className="w-32 h-1 bg-[#CE1126] mx-auto rounded-full"></div>
                    </div>

                    {/* Selected Tour Card (if any) */}
                    {selectedTour && (
                        <Card className="border-2 border-[#006B3F] shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-[#006B3F]" />
                                    Selected Tour
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground">{selectedTour.title}</h3>
                                        <p className="text-muted-foreground mt-1">{selectedTour.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-semibold">{selectedTour.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Price</p>
                                            <p className="text-2xl font-bold text-[#006B3F]">${selectedTour.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Decision Options */}
                    <Card className="shadow-lg">
                        <CardContent className="p-8 space-y-6">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {selectedTour ? 'Continue with your selection or explore more options' : 'Choose how you\'d like to proceed'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {selectedTour
                                        ? 'You can continue planning with your selected tour or browse more options'
                                        : 'Browse our recommended tours or start planning your custom trip'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Select/Browse Tours Button */}
                                <Button
                                    variant={selectedTour ? "outline" : "secondary"}
                                    size="lg"
                                    onClick={onSelectTour}
                                    className="w-full py-6"
                                >
                                    {selectedTour ? 'Browse More Tours' : 'Select a Tour'}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>

                                {/* Plan My Trip Button */}
                                <Button
                                    variant="default"
                                    size="lg"
                                    onClick={onPlanTrip}
                                    className="w-full py-6"
                                >
                                    {selectedTour ? `Continue with ${selectedTour.title.split(' ')[0]}` : 'Plan My Trip'}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Note */}
                    <p className="text-center text-sm text-muted-foreground">
                        Don't worry, you can always customize your trip later
                    </p>
                </div>
            </div>
        </div>
    );
}
