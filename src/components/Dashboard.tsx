import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as firestoreService from '../services/firestoreService';
import type { SavedTrip } from '../types/user';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { MapPin, DollarSign, Loader2, Calendar, CheckCircle } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

export function Dashboard() {
    const { currentUser } = useAuth();
    const { convertAndFormat } = useCurrency();
    const [trips, setTrips] = useState<SavedTrip[]>([]);
    const [consultations, setConsultations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) return;

            try {
                setLoading(true);
                const [tripsData, consultationsData] = await Promise.all([
                    firestoreService.getUserTrips(currentUser.uid),
                    firestoreService.getUserConsultations(currentUser.uid)
                ]);
                setTrips(tripsData);
                setConsultations(consultationsData);
            } catch (err: unknown) {
                console.error('Error fetching data:', err);
                const error = err as { code?: string; message?: string };
                if (error.code === 'permission-denied') {
                    setError('Access Denied: Missing or insufficient permissions. Please check your Firestore Security Rules.');
                } else if (error.code === 'failed-precondition') {
                    setError('Missing Index: Please check the browser console for a link to create the required index.');
                } else {
                    setError(error.message || 'Failed to load your data');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Dashboard</h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* My Trips Section */}
            <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#CE1126]" />
                    My Trips
                </h2>
                {trips.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="text-6xl mb-4">✈️</div>
                                <h3 className="text-xl font-semibold mb-2">No trips saved yet</h3>
                                <p className="text-muted-foreground mb-6">Start planning your dream trip to Ghana!</p>
                            </div>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-[#CE1126] hover:bg-[#A00E1E] text-white px-8 py-3"
                                size="lg"
                            >
                                Plan New Trip
                            </Button>
                        </div>
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

            {/* My Consultations Section */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-[#006B3F]" />
                    My Consultations
                </h2>
                {consultations.length === 0 ? (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="text-6xl mb-4">📅</div>
                                <h3 className="text-xl font-semibold mb-2">No consultations booked</h3>
                                <p className="text-muted-foreground">Book a free consultation to get expert advice!</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {consultations.map((consultation) => (
                            <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <span className="flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-[#006B3F]" />
                                            Consultation
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${consultation.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                                                consultation.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                                    consultation.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {consultation.status}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        Requested: {consultation.createdAt?.toDate().toLocaleDateString()}
                                    </p>
                                    {consultation.budgetSummary && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <DollarSign className="h-4 w-4 text-[#006B3F]" />
                                            <span className="font-bold text-[#006B3F]">
                                                {convertAndFormat(consultation.budgetSummary.total)}
                                            </span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
