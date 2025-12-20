import { Share2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';

interface TripHeaderWidgetProps {
    userName?: string;
    destination?: string;
    days?: number;
    className?: string;
    onShare?: () => void;
}

export function TripHeaderWidget({
    userName = "Traveler",
    destination = "Ghana",
    days = 10,
    className = "",
    onShare
}: TripHeaderWidgetProps) {
    return (
        <Card className={`relative overflow-hidden group border-none shadow-lg ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="/assets/images/auth-hero.png" // Updated to use the new hero image
                    alt={destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="flex justify-between items-start mb-auto">
                    <div className="inline-flex items-center gap-2">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-medium border border-white/10">
                            Current Trip
                        </span>
                        <span className="px-2 py-1 bg-[#CE1126] rounded-lg text-xs font-bold">
                            {days} Days
                        </span>
                    </div>
                    {onShare && (
                        <Button
                            onClick={onShare}
                            variant="ghost"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                            size="sm"
                        >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    )}
                </div>

                <h2 className="text-3xl font-bold mb-1">Hey {userName}! 👋</h2>
                <p className="text-lg text-white/90">
                    Welcome to your <span className="text-[#FCD116] font-bold">{destination}</span> Adventure.
                </p>
            </div>
        </Card>
    );
}
