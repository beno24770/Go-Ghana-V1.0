import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as firestoreService from '../services/firestoreService';
import type { SavedTrip } from '../types/user';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { MapPin, DollarSign, Loader2 } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export function Dashboard() {
    const { currentUser } = useAuth();
    const { convertAndFormat } = useCurrency();
    const [trips, setTrips] = useState<SavedTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTrips() {
            if (!currentUser) return;

            try {
                setLoading(true);
                const trips = await firestoreService.getUserTrips(currentUser.uid);
                setTrips(trips);
            } catch (err: unknown) {
                console.error('Error fetching trips:', err);
                const error = err as { code?: string; message?: string };
                if (error.code === 'permission-denied') {
                    setError('Access Denied: Missing or insufficient permissions. Please check your Firestore Security Rules.');
                } else if (error.code === 'failed-precondition') {
                    setError('Missing Index: Please check the browser console for a link to create the required index.');
                } else {
                    setError(error.message || 'Failed to load your trips');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchTrips();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-[#006B3F]" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Trips</h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {trips.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">No trips saved yet</h3>
                    <p className="text-muted-foreground mb-6">Start planning your dream trip to Ghana!</p>
                    {/* Navigation to start planning would go here */}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{trip.formData.duration} Days in Ghana</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {trip.createdAt?.toDate().toLocaleDateString()}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-[#CE1126]" />
                                    <span>{trip.formData.regions?.length || 1} Regions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-[#006B3F]" />
                                    <span className="font-bold text-[#006B3F]">
                                        {convertAndFormat(trip.breakdown.total)}
                                    </span>
                                </div>
                                {trip.selectedTour && (
                                    <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground mb-1">Selected Tour:</p>
                                        <p className="text-sm font-medium truncate">{trip.selectedTour.title}</p>
                                    </div>
                                )}
                                <Button className="w-full mt-4" variant="outline">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
