import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// import * as firestoreService from '../services/firestoreService';
import type { SavedTrip } from '../types/user';
import { Button } from './ui/Button';
import { Loader2, Plus, MapPin } from 'lucide-react';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { TripHeaderWidget } from './dashboard/widgets/TripHeaderWidget';
import { BudgetOverviewWidget } from './dashboard/widgets/BudgetOverviewWidget';
import { ItineraryTimelineWidget } from './dashboard/widgets/ItineraryTimelineWidget';
import { PackingListWidget } from './dashboard/widgets/PackingListWidget';
import { WeatherWidget } from './dashboard/widgets/WeatherWidget';
import { FlightWidget } from './dashboard/widgets/FlightWidget';
import { ShareModal } from './sharing/ShareModal';

export function Dashboard() {
    const { currentUser } = useAuth();
    const [trips, setTrips] = useState<SavedTrip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTripId, setActiveTripId] = useState<string | null>(null);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (!currentUser) return;

            try {
                setLoading(true);
                // const tripsData = await firestoreService.getUserTrips(currentUser.uid);
                // setTrips(tripsData);
                setTrips([]); // Mock empty trips for now
                // if (tripsData.length > 0) {
                //     setActiveTripId(tripsData[0].id);
                // }
            } catch (err: unknown) {
                console.error('Error fetching data:', err);
                const error = err as { code?: string; message?: string };
                setError(error.message || 'Failed to load your data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [currentUser]);

    const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-[#006B3F]" />
            </div>
        );
    }

    if (!activeTrip) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="h-8 w-8 text-[#006B3F]" />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <h2 className="text-2xl font-bold mb-2">No trips yet</h2>
                    <p className="text-muted-foreground mb-8">Start planning your Ghana adventure to see your dashboard.</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full bg-[#006B3F] hover:bg-[#005030]"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Plan a Trip
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Navigation Tabs (Mock) */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 mb-6">
                <div className="container mx-auto px-4 overflow-x-auto">
                    <div className="flex items-center gap-1 h-14">
                        <Button variant="ghost" className="bg-[#006B3F]/10 text-[#006B3F] hover:bg-[#006B3F]/20 rounded-full px-4 h-9 text-sm font-medium">
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                            My Trips
                        </Button>
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900 rounded-full px-4 h-9 text-sm font-medium">
                            Wallet
                        </Button>
                    </div>
                </div>
            </div>

            <DashboardLayout>
                {/* 1. Hero Widget (Full Width / Large) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
                    <TripHeaderWidget
                        userName={currentUser?.displayName?.split(' ')[0] || 'Traveler'}
                        destination="Ghana"
                        days={activeTrip.formData.duration}
                        className="h-full min-h-[300px]"
                        onShare={() => setShareModalOpen(true)}
                    />
                </div>

                {/* 2. Budget Widget */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1">
                    <BudgetOverviewWidget
                        totalBudget={activeTrip.breakdown.total}
                        breakdown={activeTrip.breakdown}
                        className="h-full"
                    />
                </div>

                {/* 3. Weather Widget */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1">
                    <WeatherWidget className="h-full" />
                </div>

                {/* 4. Flight Widget */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 row-span-1">
                    <FlightWidget
                        origin={activeTrip.formData.origin}
                        budget={activeTrip.breakdown.flights} // Using logic from breakdown
                        className="h-full"
                    />
                </div>

                {/* 5. Packing List */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2">
                    <PackingListWidget className="h-full" />
                </div>

                {/* 6. Itinerary Timeline (Tall) */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 lg:row-span-2">
                    <ItineraryTimelineWidget
                        days={
                            // Mock itinerary if specific format missing, or use actual
                            // Just simpler to mock for now as itinerary might be complex obj
                            Array.from({ length: activeTrip.formData.duration }).map((_, i) => ({
                                day: i + 1,
                                theme: `Day ${i + 1} Adventure`,
                                activities: {
                                    morning: 'City Tour',
                                    afternoon: 'Cultural Market'
                                }
                            }))
                        }
                        className="h-full"
                    />
                </div>

                {/* 7. Quick Action / Placeholder */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 row-span-1">
                    <div className="bg-[#FCD116] rounded-lg p-6 h-full flex flex-col justify-center items-start text-[#1F2937]">
                        <h3 className="font-bold text-lg mb-2">Ready for your trip?</h3>
                        <p className="text-sm mb-4 opacity-80">Check your visa requirements and vaccinations.</p>
                        <Button variant="outline" className="w-full bg-white/20 border-black/10 hover:bg-white/30 text-black border-none">
                            View Checklist
                        </Button>
                    </div>
                </div>

            </DashboardLayout>

            {/* Simple Trip Selector for verification/switching */}
            {trips.length > 1 && (
                <div className="container mx-auto px-4 mt-8">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Your Other Trips</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {trips.filter(t => t.id !== activeTripId).map(trip => (
                            <button
                                key={trip.id}
                                onClick={() => setActiveTripId(trip.id)}
                                className="min-w-[200px] p-4 bg-white rounded-lg border border-gray-200 hover:border-[#006B3F] transition-colors text-left"
                            >
                                <div className="font-bold text-gray-800">{trip.formData.duration} Days in Ghana</div>
                                <div className="text-xs text-gray-500 mt-1">{new Date(trip.createdAt.seconds * 1000).toLocaleDateString()}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ShareModal */}
            {activeTripId && (
                <ShareModal
                    isOpen={shareModalOpen}
                    onClose={() => setShareModalOpen(false)}
                    tripId={activeTripId}
                    tripName={`${activeTrip.formData.duration}-Day Ghana Adventure`}
                    userId={currentUser?.id || ''}
                />
            )}
        </div>
    );
}

