import { Card } from '../../ui/Card';
import { Plane, MoreHorizontal } from 'lucide-react';

interface FlightWidgetProps {
    origin?: string;
    destination?: string;
    date?: string;
    budget?: number; // Estimated flight cost
    className?: string;
}

export function FlightWidget({ origin = "JFK", destination = "ACC", date = "Pending", budget = 1200, className = "" }: FlightWidgetProps) {
    return (
        <Card className={`p-6 bg-[#4B0082] dark:bg-ghana-black text-white border-none dark:border dark:border-gray-800 ${className}`}>
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-wider text-purple-200">
                    <Plane className="w-3 h-3" />
                    Flight Details
                </h3>
                <button className="text-purple-200 hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center px-2">
                    <div className="text-center">
                        <div className="text-xs text-purple-300 mb-1">{date !== "Pending" ? date : "Departure"}</div>
                        <div className="text-2xl font-bold">{origin}</div>
                    </div>

                    <div className="flex-1 px-4 flex flex-col items-center">
                        <div className="w-full h-[1px] bg-purple-400/50 relative">
                            <Plane className="w-4 h-4 text-purple-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-purple-300 mb-1">Arrival</div>
                        <div className="text-2xl font-bold">{destination}</div>
                    </div>
                </div>

                <div className="bg-purple-900/50 rounded-lg p-3 flex justify-between items-center text-sm">
                    <span className="text-purple-200">Est. Cost</span>
                    <span className="font-bold">${budget}</span>
                </div>
            </div>
        </Card>
    );
}
