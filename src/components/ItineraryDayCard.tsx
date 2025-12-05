import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Clock, DollarSign, Star } from 'lucide-react';
import type { ItineraryDay } from '../types/itinerary';

interface ItineraryDayCardProps {
    day: ItineraryDay;
}

export function ItineraryDayCard({ day }: ItineraryDayCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const allActivities = [...day.morning, ...day.afternoon, ...day.evening];

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div
                className="bg-gradient-to-r from-ghana-green to-green-700 text-white p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-ghana-yellow font-bold text-sm uppercase tracking-wider">
                                Day {day.day}
                            </span>
                            {day.highlights.length > 0 && (
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {day.highlights.length} Activities
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold">{day.location}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/90">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{day.region}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>GH₵ {day.actualCost.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        {isExpanded ? (
                            <ChevronUp className="w-6 h-6" />
                        ) : (
                            <ChevronDown className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Highlights Preview (when collapsed) */}
                {!isExpanded && day.highlights.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {day.highlights.slice(0, 3).map((highlight, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-white/20 px-3 py-1 rounded-full"
                            >
                                {highlight}
                            </span>
                        ))}
                        {day.highlights.length > 3 && (
                            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                                +{day.highlights.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="p-6 space-y-6">
                    {/* Accommodation */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-lg">🏨</span>
                            Accommodation
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">{day.accommodation.name}</p>
                                    <p className="text-sm text-gray-600">{day.accommodation.location}</p>
                                    <p className="text-xs text-gray-500 mt-1">{day.accommodation.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-ghana-green">
                                        GH₵ {day.accommodation.pricePerNight}
                                    </p>
                                    <p className="text-xs text-gray-500">per night</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-ghana-yellow fill-current" />
                                <span className="text-sm font-medium">{day.accommodation.rating}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {day.accommodation.amenities.map((amenity, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border border-gray-200"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meals */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-lg">🍽️</span>
                            Meals
                        </h4>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {/* Breakfast */}
                            <div className="bg-amber-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-amber-700 uppercase mb-2">Breakfast</p>
                                <p className="font-semibold text-gray-900">{day.meals.breakfast.name}</p>
                                <p className="text-sm text-gray-600 mt-1">{day.meals.breakfast.specialty}</p>
                                <p className="text-sm font-bold text-ghana-green mt-2">
                                    GH₵ {day.meals.breakfast.averageCost}
                                </p>
                            </div>

                            {/* Lunch */}
                            <div className="bg-green-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-green-700 uppercase mb-2">Lunch</p>
                                <p className="font-semibold text-gray-900">{day.meals.lunch.name}</p>
                                <p className="text-sm text-gray-600 mt-1">{day.meals.lunch.specialty}</p>
                                <p className="text-sm font-bold text-ghana-green mt-2">
                                    GH₵ {day.meals.lunch.averageCost}
                                </p>
                            </div>

                            {/* Dinner */}
                            <div className="bg-blue-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Dinner</p>
                                <p className="font-semibold text-gray-900">{day.meals.dinner.name}</p>
                                <p className="text-sm text-gray-600 mt-1">{day.meals.dinner.specialty}</p>
                                <p className="text-sm font-bold text-ghana-green mt-2">
                                    GH₵ {day.meals.dinner.averageCost}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Activities Timeline */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-lg">📅</span>
                            Daily Schedule
                        </h4>
                        <div className="space-y-4">
                            {allActivities.map((activity, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-24 text-right">
                                        <span className="text-sm font-medium text-gray-600">
                                            {activity.time.split(' - ')[0]}
                                        </span>
                                    </div>
                                    <div className="flex-shrink-0 w-px bg-ghana-green relative">
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-ghana-green rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{activity.activity}</p>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {activity.location}
                                                    </p>
                                                </div>
                                                {activity.cost > 0 && (
                                                    <span className="font-bold text-ghana-green whitespace-nowrap">
                                                        GH₵ {activity.cost}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">{activity.description}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {activity.duration}
                                                </span>
                                                <span className="px-2 py-1 bg-white rounded-full capitalize">
                                                    {activity.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Day Total */}
                    <div className="bg-ghana-green/5 rounded-xl p-4 border-2 border-ghana-green/20">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">Day {day.day} Total</span>
                            <span className="text-2xl font-bold text-ghana-green">
                                GH₵ {day.actualCost.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
