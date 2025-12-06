import { useState } from 'react';
import { Check, MapPin, Star, Tag, Phone, Globe, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { AdepaVerifyButton } from './AdepaVerifyButton';
import { useCurrency } from '../contexts/CurrencyContext';
import type { Recommendation } from '../types/recommendations';
import { cn } from '../lib/utils';

interface RecommendationCardProps {
    recommendation: Recommendation;
    isSelected: boolean;
    onToggleSelection: () => void;
}

export function RecommendationCard({
    recommendation,
    isSelected,
    onToggleSelection
}: RecommendationCardProps) {
    const { convertAndFormat } = useCurrency();
    const [imageError, setImageError] = useState(false);

    const { name, description, priceRange, location, rating, amenities, tags, contactInfo, bookingUrl } = recommendation;

    return (
        <Card className={cn(
            "relative overflow-hidden transition-all duration-200 hover:shadow-lg",
            isSelected && "ring-2 ring-ghana-green shadow-lg"
        )}>
            {/* Selection Checkbox */}
            <div className="absolute top-3 right-3 z-10">
                <button
                    onClick={onToggleSelection}
                    className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected
                            ? "bg-ghana-green border-ghana-green text-white"
                            : "bg-white border-gray-300 hover:border-ghana-green"
                    )}
                >
                    {isSelected && <Check className="h-4 w-4" />}
                </button>
            </div>

            {/* Image */}
            {recommendation.imageUrl && !imageError ? (
                <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                        src={recommendation.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <div className="h-48 bg-gradient-to-br from-ghana-green/20 to-ghana-yellow/20 flex items-center justify-center">
                    <Tag className="h-12 w-12 text-ghana-green/40" />
                </div>
            )}

            <CardContent className="p-4 space-y-3">
                {/* Title & Rating */}
                <div>
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{location}</span>
                        </div>
                        {rating && (
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-ghana-yellow text-ghana-yellow" />
                                <span className="text-xs font-medium text-gray-700">{rating}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-ghana-green">
                        {convertAndFormat(priceRange.min)}
                    </span>
                    {priceRange.max > priceRange.min && (
                        <>
                            <span className="text-gray-400">-</span>
                            <span className="text-xl font-semibold text-ghana-green">
                                {convertAndFormat(priceRange.max)}
                            </span>
                        </>
                    )}
                    {priceRange.period && (
                        <span className="text-sm text-gray-500">/{priceRange.period}</span>
                    )}
                </div>

                {/* Amenities/Tags */}
                {amenities && amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                                {amenity}
                            </span>
                        ))}
                        {amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                +{amenities.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Contact Info */}
                {(contactInfo?.phone || contactInfo?.website || bookingUrl) && (
                    <div className="flex flex-wrap gap-2 text-xs">
                        {contactInfo?.phone && (
                            <a
                                href={`tel:${contactInfo.phone}`}
                                className="flex items-center gap-1 text-ghana-green hover:underline"
                            >
                                <Phone className="h-3 w-3" />
                                Call
                            </a>
                        )}
                        {(contactInfo?.website || bookingUrl) && (
                            <a
                                href={contactInfo?.website || bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-ghana-green hover:underline"
                            >
                                <Globe className="h-3 w-3" />
                                Website
                            </a>
                        )}
                    </div>
                )}

                {/* Adepa Verify Button */}
                <AdepaVerifyButton recommendation={recommendation} />
            </CardContent>
        </Card>
    );
}
