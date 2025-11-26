import { useState } from 'react';
import { LocalInputForm } from './LocalInputForm';
import { ItineraryCard } from './ItineraryCard';
import { ItineraryDetailsModal } from './ItineraryDetailsModal';
import { generateLocalItineraries } from '../../services/tripGenerator';
import type { LocalInputData, LocalItinerary } from '../../types/local';

export function LocalEstimator() {
    const [itineraries, setItineraries] = useState<LocalItinerary[]>([]);
    const [selectedItinerary, setSelectedItinerary] = useState<LocalItinerary | null>(null);

    const handleSubmit = (data: LocalInputData) => {
        const generated = generateLocalItineraries(data);
        setItineraries(generated);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Local Mode Planner</h2>
                <p className="text-muted-foreground">
                    Plan your perfect trip within Ghana with local pricing and transport options
                </p>
            </div>

            <LocalInputForm onSubmit={handleSubmit} />

            {itineraries.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Your Itinerary Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itineraries.map((itinerary) => (
                            <ItineraryCard
                                key={itinerary.id}
                                itinerary={itinerary}
                                onViewDetails={() => setSelectedItinerary(itinerary)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {selectedItinerary && (
                <ItineraryDetailsModal
                    itinerary={selectedItinerary}
                    onClose={() => setSelectedItinerary(null)}
                />
            )}
        </div>
    );
}
