import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { getSharedTrip } from '../../services/sharedTripService';
import type { SavedTrip } from '../../types/user';
import { Loader2, AlertCircle, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { TripHeaderWidget } from '../dashboard/widgets/TripHeaderWidget';
import { BudgetOverviewWidget } from '../dashboard/widgets/BudgetOverviewWidget';
import { WeatherWidget } from '../dashboard/widgets/WeatherWidget';
import { FlightWidget } from '../dashboard/widgets/FlightWidget';
import { ItineraryTimelineWidget } from '../dashboard/widgets/ItineraryTimelineWidget';
import { PackingListWidget } from '../dashboard/widgets/PackingListWidget';

export function SharedTripPage() {
    const { userId, tripId } = useParams<{ userId: string; tripId: string }>();
    const [trip, setTrip] = useState<SavedTrip | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadTrip() {
            if (!userId || !tripId) {
                setError('Invalid link');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // const data = await getSharedTrip(userId, tripId);
                const data = null; // Mock no data found
                if (data) {
                    setTrip(data);
                } else {
                    setError('Trip not found or may have been deleted.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load trip');
            } finally {
                setLoading(false);
            }
        }
        loadTrip();
    }, [userId, tripId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-[#006B3F]" />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
                <p className="text-gray-600 mb-6">{error || 'Trip not found'}</p>
                <Link to="/">
                    <Button>Go Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Header / Nav */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 mb-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-14">
                        <Link to="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden sm:block">View Only Mode</span>
                            <Button size="sm" variant="outline" onClick={handleCopyLink}>
                                <Share2 className="h-4 w-4 mr-2" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <DashboardLayout>
                {/* 1. Hero Widget */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
                    <TripHeaderWidget
                        userName="Traveler" // We might not want to expose the real user name for privacy, or fetch it too
                        destination="Ghana"
                        days={trip.formData.duration}
                        className="h-full min-h-[300px]"
                    />
                </div>

                {/* 2. Budget Widget */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1">
                    <BudgetOverviewWidget
                        totalBudget={trip.breakdown.total}
                        breakdown={trip.breakdown}
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
                        origin={trip.formData.origin || 'USA'}
                        budget={trip.formData.flightCost || 1200}
                        date={trip.formData.month}
                        className="h-full"
                    />
                </div>

                {/* 5. Itinerary Timeline (Full Width) */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-3">
                    <ItineraryTimelineWidget
                        days={trip.itinerary?.days || []} // Approximation
                        className="h-full"
                    />
                </div>

                {/* 6. Packing List */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2">
                    <PackingListWidget
                        className="h-full"
                    />
                </div>
            </DashboardLayout>

            <div className="container mx-auto px-4 mt-12 text-center pb-8">
                <div className="max-w-xl mx-auto bg-[#006B3F]/5 p-8 rounded-2xl border border-[#006B3F]/10">
                    <h3 className="text-xl font-bold mb-2">Inspired by this trip?</h3>
                    <p className="text-gray-600 mb-6">Create your own customized Ghana travel plan in minutes with our AI.</p>
                    <Link to="/">
                        <Button size="lg" className="px-8 bg-[#006B3F] hover:bg-[#005030]">Start My Plan</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
