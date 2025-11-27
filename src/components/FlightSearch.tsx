import { useState } from 'react';
import { searchFlights, formatDuration } from '../services/flightService';
import type { FlightOffer } from '../services/flightService';

const FlightSearch: React.FC = () => {
    const [origin, setOrigin] = useState('ACC');
    const [destination, setDestination] = useState('KMS');
    const [date, setDate] = useState('2025-12-25');
    const [flights, setFlights] = useState<FlightOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const results = await searchFlights(origin, destination, date);
            setFlights(results);
            if (results.length === 0) {
                setError('No flights found or API keys missing. Please check console.');
            }
        } catch (err) {
            setError('Failed to fetch flights.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Flight Search (Powered by Amadeus)</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Origin (IATA)</label>
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="ACC"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination (IATA)</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value.toUpperCase())}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="KMS"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
            </div>

            <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? 'Searching...' : 'Search Flights'}
            </button>

            {error && (
                <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mt-6 space-y-4">
                {flights.map((flight) => (
                    <div key={flight.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg">{flight.itineraries[0].segments[0].carrierCode} Flight</p>
                                <p className="text-gray-600">
                                    {flight.itineraries[0].segments[0].departure.iataCode}
                                    →
                                    {flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}
                                </p>
                                <p className="text-sm text-gray-500">Duration: {formatDuration(flight.itineraries[0].duration)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-600">
                                    {flight.price.currency} {flight.price.total}
                                </p>
                                <button className="mt-2 text-sm text-blue-600 hover:underline">Select</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightSearch;
