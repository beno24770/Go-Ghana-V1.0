import React, { useState, useEffect } from 'react';
import type { SavedTrip } from '../../types';
import { offlineStorage } from '../../services/offlineStorage';
import emergencyContacts from '../../data/static/emergencyContacts.json';
import { Phone, Trash2, ArrowLeft } from 'lucide-react';

export const OfflineGuide: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'trips' | 'emergency'>('trips');
    const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<SavedTrip | null>(null);

    useEffect(() => {
        setSavedTrips(offlineStorage.getSavedTrips());
    }, []);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this trip?')) {
            offlineStorage.deleteTrip(id);
            setSavedTrips(offlineStorage.getSavedTrips());
        }
    };

    if (selectedTrip) {
        return (
            <div className="min-h-screen bg-gray-50 pb-20">
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10 shadow-sm">
                    <button onClick={() => setSelectedTrip(null)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="font-bold text-lg">{selectedTrip.title}</h2>
                        <p className="text-xs text-gray-500">Saved on {new Date(selectedTrip.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="p-4">
                    {/* Reuse Budget Result display - passing data directly */}
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                        <h3 className="font-bold text-xl mb-4 text-[#CE1126]">Budget Breakdown</h3>
                        {/* We might need to adapt BudgetResult component to accept props instead of location state 
                            For now, let's just display the summary manually to avoid deep refactoring dependencies in this step
                        */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <span className="text-xs text-blue-600 block">Total Budget</span>
                                <span className="text-lg font-bold">GHS {selectedTrip.budgetResult.total.toLocaleString()}</span>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <span className="text-xs text-green-600 block">Per Person</span>
                                <span className="text-lg font-bold">GHS {(selectedTrip.budgetResult.total / selectedTrip.formData.travelers).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Accommodation</span>
                                <span className="font-medium">{selectedTrip.budgetResult.accommodation.toLocaleString()} GHS</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Transport</span>
                                <span className="font-medium">{selectedTrip.budgetResult.transport.toLocaleString()} GHS</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Food & Dining</span>
                                <span className="font-medium">{selectedTrip.budgetResult.food.toLocaleString()} GHS</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Activities</span>
                                <span className="font-medium">{selectedTrip.budgetResult.activities.toLocaleString()} GHS</span>
                            </div>
                        </div>
                    </div>

                    {selectedTrip.itinerary?.days && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-xl text-[#006B3F]">Itinerary</h3>
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                selectedTrip.itinerary.days.map((day: any, idx: number) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#FCD116]">
                                        <h4 className="font-bold">Day {day.day}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{day.theme || 'Exploration'}</p>
                                        <div className="space-y-2">
                                            {day.activities?.morning && <p className="text-sm mt-1">☀️ {day.activities.morning}</p>}
                                            {day.activities?.afternoon && <p className="text-sm mt-1">🌤️ {day.activities.afternoon}</p>}
                                            {day.activities?.evening && <p className="text-sm mt-1">🌙 {day.activities.evening}</p>}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="sticky top-0 bg-[#006B3F] text-white px-6 py-4 z-10 shadow-md">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">Pocket Guide</h1>
                </div>
                <div className="flex mt-4 gap-4 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('trips')}
                        className={`pb-2 border-b-2 transition-colors ${activeTab === 'trips' ? 'border-[#FCD116] text-white' : 'border-transparent text-white/70'}`}
                    >
                        Saved Trips
                    </button>
                    <button
                        onClick={() => setActiveTab('emergency')}
                        className={`pb-2 border-b-2 transition-colors ${activeTab === 'emergency' ? 'border-[#FCD116] text-white' : 'border-transparent text-white/70'}`}
                    >
                        Emergency Contacts
                    </button>
                </div>
            </div>

            <div className="p-4">
                {activeTab === 'trips' ? (
                    <div className="space-y-3">
                        {savedTrips.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No saved trips yet.</p>
                                <p className="text-xs mt-2">Generate a budget and click "Save for Offline" to see it here.</p>
                            </div>
                        ) : (
                            savedTrips.map(trip => (
                                <div key={trip.id} onClick={() => setSelectedTrip(trip)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-98 transition-transform cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{trip.title}</h3>
                                            <p className="text-sm text-gray-500">{new Date(trip.createdAt).toLocaleDateString()}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">{trip.formData.duration} Days</span>
                                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-md">{trip.formData.travelerType}</span>
                                            </div>
                                        </div>
                                        <button onClick={(e) => handleDelete(trip.id, e)} className="text-gray-400 hover:text-red-500 p-2">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {emergencyContacts.map((category, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    {category.category}
                                </h3>
                                <div className="space-y-3">
                                    {category.contacts.map((contact, cIdx) => (
                                        <a href={`tel:${contact.number}`} key={cIdx} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
                                            <div>
                                                <p className="font-semibold text-gray-800">{contact.name}</p>
                                                <p className="text-sm text-[#CE1126] font-mono font-bold">{contact.number}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#006B3F]">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
