import { useState } from 'react';
import { InterestClassifier } from './InterestClassifier';
import { LiveBudgetBreakdown } from './LiveBudgetBreakdown';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { LocalInputData, LocalTransportMode } from '../../types/local';
import { getNextGhanaHoliday } from '../../data/ghanaHolidays';

const CITIES = ['Accra', 'Kumasi', 'Takoradi', 'Ho', 'Sunyani', 'Tamale'];
const TRANSPORT_MODES: LocalTransportMode[] = ['Trotro', 'VIP Bus', 'Fuel car', 'Bolt/Uber', 'Taxi'];

interface LocalInputFormProps {
    onSubmit: (data: LocalInputData) => void;
}

export function LocalInputForm({ onSubmit }: LocalInputFormProps) {
    const [adults, setAdults] = useState(2);
    const [groupSize, setGroupSize] = useState(2);
    const [transportPreference, setTransportPreference] = useState<LocalTransportMode>('Trotro');
    const [departureCity, setDepartureCity] = useState('Accra');
    const [interests, setInterests] = useState<string[]>([]);
    const [budgetTier, setBudgetTier] = useState<'Low' | 'Mid' | 'High'>('Mid');
    const [customBudget, setCustomBudget] = useState<number>(500);
    const [useCustomBudget, setUseCustomBudget] = useState(false);
    const [dateType, setDateType] = useState<'Weekend' | 'Holiday' | 'Custom'>('Custom');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleQuickDateSelect = (type: 'Weekend' | 'Holiday' | 'Custom') => {
        setDateType(type);
        const today = new Date();

        if (type === 'Weekend') {
            // Calculate next Friday
            const nextFriday = new Date(today);
            nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7 || 7));
            const nextSunday = new Date(nextFriday);
            nextSunday.setDate(nextFriday.getDate() + 2);

            setStartDate(nextFriday.toISOString().split('T')[0]);
            setEndDate(nextSunday.toISOString().split('T')[0]);
        } else if (type === 'Holiday') {
            // Get actual next Ghana public holiday
            const nextHoliday = getNextGhanaHoliday();
            if (nextHoliday) {
                const holidayDate = new Date(nextHoliday.date);
                const holidayEnd = new Date(holidayDate);
                holidayEnd.setDate(holidayDate.getDate() + 2); // 3-day holiday weekend

                setStartDate(nextHoliday.date);
                setEndDate(holidayEnd.toISOString().split('T')[0]);
            } else {
                // Fallback if no holidays found
                const fallbackDate = new Date(today);
                fallbackDate.setDate(today.getDate() + 30);
                const fallbackEnd = new Date(fallbackDate);
                fallbackEnd.setDate(fallbackDate.getDate() + 2);

                setStartDate(fallbackDate.toISOString().split('T')[0]);
                setEndDate(fallbackEnd.toISOString().split('T')[0]);
            }
        } else {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (interests.length === 0) {
            alert('Please select at least one interest');
            return;
        }

        if (!startDate || !endDate) {
            alert('Please select travel dates');
            return;
        }

        const data: LocalInputData = {
            adults,
            groupSize,
            transportPreference,
            departureCity,
            interests,
            budgetTier,
            customBudget: useCustomBudget ? customBudget : undefined,
            dates: {
                start: new Date(startDate),
                end: new Date(endDate),
                type: dateType
            },
        };

        onSubmit(data);
    };

    // Construct live data for preview
    const currentData: LocalInputData = {
        adults,
        groupSize,
        transportPreference,
        departureCity,
        interests,
        budgetTier,
        customBudget: useCustomBudget ? customBudget : undefined,
        dates: {
            start: startDate ? new Date(startDate) : new Date(),
            end: endDate ? new Date(endDate) : new Date(),
            type: dateType
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-2 space-y-8 p-6 bg-white rounded-xl border shadow-sm">
                    {/* Traveler Profile */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Traveler Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Adults</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={adults}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        setAdults(val);
                                        setGroupSize(Math.max(groupSize, val));
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Total Group Size</label>
                                <Input
                                    type="number"
                                    min={adults}
                                    max="50"
                                    value={groupSize}
                                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Departure City</label>
                                <select
                                    value={departureCity}
                                    onChange={(e) => setDepartureCity(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B3F] bg-white"
                                >
                                    {CITIES.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Transport Preference</label>
                                <select
                                    value={transportPreference}
                                    onChange={(e) => setTransportPreference(e.target.value as LocalTransportMode)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#006B3F] bg-white"
                                >
                                    {TRANSPORT_MODES.map((mode) => (
                                        <option key={mode} value={mode}>
                                            {mode}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Interests */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Interests</h3>
                        <InterestClassifier selectedInterests={interests} onChange={setInterests} />
                    </section>

                    {/* Budget */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-900">Budget (GHS)</h3>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="customBudget"
                                    checked={useCustomBudget}
                                    onChange={(e) => setUseCustomBudget(e.target.checked)}
                                    className="rounded text-[#006B3F] focus:ring-[#006B3F]"
                                />
                                <label htmlFor="customBudget" className="text-sm text-gray-600">Use Custom Budget</label>
                            </div>
                        </div>

                        {!useCustomBudget ? (
                            <div className="flex gap-3">
                                {(['Low', 'Mid', 'High'] as const).map((tier) => (
                                    <button
                                        key={tier}
                                        type="button"
                                        onClick={() => setBudgetTier(tier)}
                                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${budgetTier === tier
                                            ? 'border-[#006B3F] bg-[#006B3F]/10 font-bold text-[#006B3F]'
                                            : 'border-gray-200 hover:border-[#006B3F]/50 text-gray-600'
                                            }`}
                                    >
                                        {tier}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>GHS 100</span>
                                    <span className="font-bold text-[#006B3F]">GHS {customBudget}</span>
                                    <span>GHS 10,000+</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="10000"
                                    step="100"
                                    value={customBudget}
                                    onChange={(e) => setCustomBudget(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#006B3F]"
                                />
                            </div>
                        )}
                    </section>

                    {/* Dates */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Travel Dates</h3>
                        <div className="flex gap-3 mb-4">
                            {(['Weekend', 'Holiday', 'Custom'] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleQuickDateSelect(type)}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${dateType === type
                                        ? 'bg-[#006B3F] text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {type === 'Weekend' ? 'This Weekend' : type === 'Holiday' ? 'Next Holiday' : 'Custom Dates'}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Start Date</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        setDateType('Custom');
                                    }}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">End Date</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        setDateType('Custom');
                                    }}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Live Breakdown & Actions */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <LiveBudgetBreakdown data={currentData} />

                        <Button type="submit" className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all bg-[#006B3F] hover:bg-[#005a35]">
                            Generate Itineraries
                        </Button>

                        <p className="text-xs text-center text-gray-500">
                            Estimates are based on current local rates and may vary.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
