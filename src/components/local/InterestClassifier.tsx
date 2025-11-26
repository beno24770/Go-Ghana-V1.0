import { Heart, Calendar, Mountain, Users, Utensils, MapPin, Sparkles, PartyPopper } from 'lucide-react';

const INTERESTS = [
    { id: 'Weekend Getaway', label: 'Weekend Getaway', icon: Calendar, description: 'Quick escape nearby' },
    { id: 'Festive Event', label: 'Festive Event', icon: PartyPopper, description: 'Festivals & celebrations' },
    { id: 'Holiday Getaway', label: 'Holiday Getaway', icon: Sparkles, description: 'Extended vacation' },
    { id: 'Adventure Trip', label: 'Adventure Trip', icon: Mountain, description: 'Hiking & outdoor activities' },
    { id: 'Group Excursion', label: 'Group Excursion', icon: Users, description: 'Church, school, or family trips' },
    { id: 'Romantic Trip', label: 'Romantic Trip', icon: Heart, description: 'Couples getaway' },
    { id: 'City Break', label: 'City Break', icon: MapPin, description: 'Urban exploration' },
    { id: 'Food & Culture', label: 'Food & Culture', icon: Utensils, description: 'Culinary & cultural experiences' },
];

interface InterestClassifierProps {
    selectedInterests: string[];
    onChange: (interests: string[]) => void;
}

export function InterestClassifier({ selectedInterests, onChange }: InterestClassifierProps) {
    const toggleInterest = (interestId: string) => {
        if (selectedInterests.includes(interestId)) {
            onChange(selectedInterests.filter((id) => id !== interestId));
        } else {
            onChange([...selectedInterests, interestId]);
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium">
                What type of trip are you planning? <span className="text-muted-foreground">(Select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INTERESTS.map((interest) => {
                    const Icon = interest.icon;
                    const isSelected = selectedInterests.includes(interest.id);
                    return (
                        <button
                            key={interest.id}
                            type="button"
                            onClick={() => toggleInterest(interest.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${isSelected
                                ? 'border-[#006B3F] bg-[#006B3F]/10'
                                : 'border-gray-200 hover:border-[#006B3F]/50'
                                }`}
                        >
                            <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-[#006B3F]' : 'text-gray-500'}`} />
                            <div className="font-medium text-sm">{interest.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">{interest.description}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
