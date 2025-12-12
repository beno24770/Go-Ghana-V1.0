import { Card } from '../../ui/Card';
import { CloudSun, MoreHorizontal, Wind, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
    region?: string;
    temperature?: number; // Javascript is Celsius by default in most scientific contexts, but let's assume UI preference
    condition?: string;
    className?: string;
}

export function WeatherWidget({ region = "Accra", temperature = 28, condition = "Mostly Sunny", className = "" }: WeatherWidgetProps) {
    return (
        <Card className={`p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none relative overflow-hidden ${className}`}>
            {/* Background Decor */}
            <div className="absolute -right-8 -top-8 text-blue-400/20">
                <CloudSun size={140} />
            </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="font-bold flex items-center gap-2 text-blue-100 uppercase text-xs tracking-wider">
                        <MapPinIcon /> {region}
                    </h3>
                    <p className="text-xs text-blue-200 mt-1">Mon, 12 Aug</p>
                </div>
                <button className="text-blue-200 hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="relative z-10">
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-bold">{temperature}°</span>
                </div>
                <p className="text-lg font-medium text-blue-100 mb-6">{condition}</p>

                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-blue-200 bg-blue-500/30 px-2 py-1 rounded">
                        <Wind className="w-3 h-3" />
                        <span>12 km/h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-200 bg-blue-500/30 px-2 py-1 rounded">
                        <Droplets className="w-3 h-3" />
                        <span>78%</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function MapPinIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
    )
}
