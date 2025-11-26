import { X, MapPin, DollarSign, Bus, Hotel, Utensils, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import type { LocalItinerary } from '../../types/local';

interface ItineraryDetailsModalProps {
    itinerary: LocalItinerary;
    onClose: () => void;
}

export function ItineraryDetailsModal({ itinerary, onClose }: ItineraryDetailsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{itinerary.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Overview */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[#CE1126]" />
                            <div>
                                <div className="text-sm text-muted-foreground">Regions</div>
                                <div className="font-medium">{itinerary.regions.join(', ')}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-[#006B3F]" />
                            <div>
                                <div className="text-sm text-muted-foreground">Total Cost</div>
                                <div className="font-bold text-[#006B3F]">GHS {itinerary.cost.total.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Cost Breakdown
                        </h3>
                        <div className="space-y-2">
                            {[
                                { label: 'Accommodation', value: itinerary.cost.accommodation, icon: Hotel },
                                { label: 'Food', value: itinerary.cost.food, icon: Utensils },
                                { label: 'Transport', value: itinerary.cost.transport, icon: Bus },
                                { label: 'Activities', value: itinerary.cost.activities, icon: Activity },
                                { label: 'Essentials', value: itinerary.cost.essentials, icon: null },
                                { label: 'Contingency (5%)', value: itinerary.cost.contingency, icon: null },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between items-center">
                                    <span className="text-sm flex items-center gap-2">
                                        {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                                        {item.label}
                                    </span>
                                    <span className="font-medium">GHS {item.value.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="pt-2 border-t flex justify-between items-center font-bold">
                                <span>Total</span>
                                <span className="text-[#006B3F]">GHS {itinerary.cost.total.toLocaleString()}</span>
                            </div>
                            <div className="text-sm text-muted-foreground text-right">
                                GHS {itinerary.cost.perPerson.toLocaleString()} per person
                            </div>
                        </div>
                    </div>

                    {/* Transport Plan */}
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Bus className="h-5 w-5" />
                            Transport Plan
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Mode</span>
                                <span className="font-medium">{itinerary.transportPlan.mode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Cost</span>
                                <span className="font-medium">GHS {itinerary.transportPlan.cost.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{itinerary.transportPlan.details}</p>
                        </div>
                    </div>

                    {/* Accommodation */}
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Hotel className="h-5 w-5" />
                            Accommodation
                        </h3>
                        <p className="text-sm text-muted-foreground">{itinerary.accommodationSuggestion}</p>
                    </div>

                    {/* Highlights */}
                    <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Trip Highlights</h3>
                        <ul className="space-y-2">
                            {itinerary.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                    <span className="text-[#FCD116] mt-0.5">★</span>
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button className="flex-1">Add to Planner</Button>
                        <Button variant="outline" className="flex-1">Share Itinerary</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
