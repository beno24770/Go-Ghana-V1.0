import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import type { LocalItinerary } from '../../types';

interface ItineraryCardProps {
    itinerary: LocalItinerary;
    onViewDetails: () => void;
}

export function ItineraryCard({ itinerary, onViewDetails }: ItineraryCardProps) {
    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'Cheapest':
                return 'bg-green-100 text-green-800';
            case 'Balanced':
                return 'bg-blue-100 text-blue-800';
            case 'Premium':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{itinerary.title}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(itinerary.type)}`}>
                        {itinerary.type}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[#CE1126]" />
                    <span>{itinerary.regions.join(', ')}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-[#006B3F]" />
                    <span>{itinerary.duration} days</span>
                </div>

                <div className="pt-3 border-t">
                    <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm text-muted-foreground">Total Cost</span>
                        <span className="text-2xl font-bold text-[#006B3F]">GHS {itinerary.cost.total.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                        GHS {itinerary.cost.perPerson.toLocaleString()} per person
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium">Highlights:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        {itinerary.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="text-[#FCD116] mt-0.5">★</span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button onClick={onViewDetails} className="w-full" variant="outline">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    );
}
