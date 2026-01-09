import { Card } from '../../ui/Card';
import { Calendar, MoreHorizontal, Clock, MapPin } from 'lucide-react';

interface ItineraryTimelineWidgetProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    days?: any[]; // Using flexible type for now as itinerary structure can vary
    className?: string;
}

export function ItineraryTimelineWidget({ days = [], className = "" }: ItineraryTimelineWidgetProps) {
    return (
        <Card className={`p-0 flex flex-col h-full overflow-hidden dark:bg-ghana-black dark:border-gray-800 ${className}`}>
            <div className="p-6 pb-2 flex justify-between items-center bg-white dark:bg-ghana-black sticky top-0 z-10 border-b border-gray-50 dark:border-gray-800">
                <h3 className="font-bold flex items-center gap-2 dark:text-white">
                    <Calendar className="w-4 h-4 text-[#CE1126]" />
                    SCHEDULE
                </h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {days.length === 0 ? (
                    <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-8">Generate an itinerary to see your schedule.</p>
                ) : (
                    days.map((day, idx) => (
                        <div key={idx} className="relative pl-6 border-l-2 border-gray-100 dark:border-gray-800 last:border-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#FAFAFA] dark:bg-ghana-black border-2 border-[#FCD116]" />

                            <div className="mb-1">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Day {day.day}</span>
                                <h4 className="font-semibold text-gray-800 dark:text-white">{day.theme || `Exploration`}</h4>
                            </div>

                            <div className="space-y-2 mt-2">
                                {day.activities && (
                                    <>
                                        {day.activities.morning && (
                                            <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <Clock className="w-3 h-3 mt-0.5 text-gray-400 dark:text-gray-500" />
                                                <span>{day.activities.morning}</span>
                                            </div>
                                        )}
                                        {day.activities.afternoon && (
                                            <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <MapPin className="w-3 h-3 mt-0.5 text-gray-400 dark:text-gray-500" />
                                                <span>{day.activities.afternoon}</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Fade overlay at bottom */}
            <div className="h-8 bg-gradient-to-t from-white dark:from-ghana-black to-transparent pointer-events-none -mt-8 relative z-10" />
        </Card>
    );
}
