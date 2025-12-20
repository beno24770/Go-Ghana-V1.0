import { useMemo } from 'react';
import { MapPin, Check } from 'lucide-react';
import regionData from '../../data/engine/regionCostProfiles.json';

interface RegionMapSelectorProps {
    selectedRegions: string[];
    onToggleRegion: (regionName: string) => void;
}

export function RegionMapSelector({ selectedRegions, onToggleRegion }: RegionMapSelectorProps) {
    // Convert regionData to array for mapping
    const regions = useMemo(() => Object.values(regionData), []);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Select the regions you'd like to visit</span>
            </div>

            {/* Region Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {regions.map((region) => {
                    const isSelected = selectedRegions.includes(region.name);
                    return (
                        <button
                            key={region.name}
                            type="button"
                            onClick={() => onToggleRegion(region.name)}
                            className={`
                                relative flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200
                                ${isSelected
                                    ? 'bg-[#006B3F]/10 border-[#006B3F] shadow-md scale-[1.02]'
                                    : 'bg-white border-gray-200 hover:border-[#006B3F]/40 hover:bg-gray-50'}
                            `}
                        >
                            {/* Checkbox */}
                            <div className={`
                                flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
                                ${isSelected
                                    ? 'bg-[#006B3F] border-[#006B3F]'
                                    : 'border-gray-300 bg-white'}
                            `}>
                                {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                            </div>

                            {/* Region Name */}
                            <span className={`text-sm font-medium ${isSelected ? 'text-[#006B3F]' : 'text-gray-700'}`}>
                                {region.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Selection Summary */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-600">
                    {selectedRegions.length === 0
                        ? 'No regions selected'
                        : `${selectedRegions.length} region${selectedRegions.length > 1 ? 's' : ''} selected`}
                </span>
                {selectedRegions.length > 0 && (
                    <button
                        type="button"
                        onClick={() => selectedRegions.forEach(r => onToggleRegion(r))}
                        className="text-sm text-[#CE1126] hover:underline font-medium"
                    >
                        Clear all
                    </button>
                )}
            </div>
        </div>
    );
}
