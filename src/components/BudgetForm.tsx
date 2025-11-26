import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calculator, Info, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Checkbox } from './ui/Checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../lib/utils';
import type { BudgetFormData, ActivityInterest, TravelerType, AccommodationLevel } from '../types';

const regionsList = [
    'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra', 'North East',
    'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West', 'Volta', 'Western', 'Western North'
];

const months = [
    { name: 'January', season: 'Peak', isPeak: true },
    { name: 'February', season: 'Shoulder', isPeak: false },
    { name: 'March', season: 'Shoulder', isPeak: false },
    { name: 'April', season: 'Shoulder', isPeak: false },
    { name: 'May', season: 'Wet', isPeak: false },
    { name: 'June', season: 'Wet', isPeak: false },
    { name: 'July', season: 'Wet', isPeak: false },
    { name: 'August', season: 'Peak', isPeak: true },
    { name: 'September', season: 'Shoulder', isPeak: false },
    { name: 'October', season: 'Shoulder', isPeak: false },
    { name: 'November', season: 'Shoulder', isPeak: false },
    { name: 'December', season: 'Peak', isPeak: true },
];

const travelStyles = [
    { id: 'backpacker', label: 'Backpacker', cost: '$30–50/day', desc: 'Hostels, street food, public transport' },
    { id: 'budget', label: 'Budget', cost: '$50–80/day', desc: 'Basic hotels, local eateries' },
    { id: 'mid-range', label: 'Mid-range', cost: '$80–150/day', desc: '3-star hotels, private transport' },
    { id: 'comfort', label: 'Comfort', cost: '$150–250/day', desc: '4-star hotels, driver' },
    { id: 'luxury', label: 'Luxury', cost: '$250+/day', desc: '5-star hotels, premium dining' },
];

const interestOptions = [
    { id: 'Culture & History', mapTo: 'culture' as const },
    { id: 'Adventure', mapTo: 'adventure' as const },
    { id: 'Beach', mapTo: 'relaxation' as const },
    { id: 'Nightlife', mapTo: 'culture' as const },
    { id: 'Food Tours', mapTo: 'culture' as const },
    { id: 'Wildlife', mapTo: 'nature' as const },
];

const formSchema = z.object({
    duration: z.number().min(1).max(30),
    travelers: z.number().min(1).max(10),
    month: z.string(),
    regions: z.array(z.string()).min(1, 'Select at least one region'),
    isNewToGhana: z.boolean(),
    travelStyle: z.string(),
    accommodationType: z.enum(['Hotels', 'Guesthouses', 'Airbnb']),
    intensity: z.enum(['Relaxed', 'Moderate', 'Packed']),
    includeFlights: z.boolean(),
    interests: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export interface BudgetFormProps {
    onSubmit: (data: BudgetFormData) => void;
    isLoading?: boolean;
}

export function BudgetForm({ onSubmit, isLoading = false }: BudgetFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration: 7,
            travelers: 1,
            month: 'March',
            regions: ['Greater Accra'],
            isNewToGhana: false,
            travelStyle: 'mid-range',
            accommodationType: 'Hotels',
            intensity: 'Moderate',
            includeFlights: false,
            interests: [],
        },
    });

    const watchedDuration = useWatch({ control, name: 'duration' });
    const watchedTravelers = useWatch({ control, name: 'travelers' });
    const watchedRegions = useWatch({ control, name: 'regions' });
    const watchedIsNewToGhana = useWatch({ control, name: 'isNewToGhana' });
    const watchedTravelStyle = useWatch({ control, name: 'travelStyle' });
    const watchedIncludeFlights = useWatch({ control, name: 'includeFlights' });
    const watchedInterests = useWatch({ control, name: 'interests' });
    const watchedMonth = useWatch({ control, name: 'month' });

    const handleRegionToggle = (region: string) => {
        const current = watchedRegions;
        if (current.includes(region)) {
            setValue('regions', current.filter(r => r !== region));
        } else {
            setValue('regions', [...current, region]);
        }
    };

    const handleNewToGhanaChange = (checked: boolean) => {
        setValue('isNewToGhana', checked);
        if (checked) {
            const defaults = ['Greater Accra', 'Ashanti', 'Central'];
            setValue('regions', Array.from(new Set([...watchedRegions, ...defaults])));
        }
    };

    const handleInterestToggle = (interest: string) => {
        const current = watchedInterests;
        if (current.includes(interest)) {
            setValue('interests', current.filter(i => i !== interest));
        } else {
            setValue('interests', [...current, interest]);
        }
    };

    const onFormSubmit = (data: FormSchema) => {
        let travelerType: TravelerType = 'solo';
        if (data.travelers === 2) travelerType = 'couple';
        else if (data.travelers > 2 && data.travelers <= 4) travelerType = 'family';
        else if (data.travelers > 4) travelerType = 'group';

        let accommodationLevel: AccommodationLevel = 'mid';
        if (data.travelStyle === 'backpacker') accommodationLevel = 'backpacker';
        else if (data.travelStyle === 'budget') accommodationLevel = 'budget';
        else if (['mid-range'].includes(data.travelStyle)) accommodationLevel = 'mid';
        else if (['comfort'].includes(data.travelStyle)) accommodationLevel = 'comfort';
        else if (['luxury'].includes(data.travelStyle)) accommodationLevel = 'luxury';

        const activities: ActivityInterest[] = [];
        data.interests.forEach(interest => {
            const mapped = interestOptions.find(opt => opt.id === interest)?.mapTo;
            if (mapped && !activities.includes(mapped)) {
                activities.push(mapped);
            }
        });
        if (activities.length === 0) activities.push('culture');

        onSubmit({
            duration: data.duration,
            travelerType,
            accommodationLevel,
            activities,
            month: data.month,
            regions: data.regions,
            intensity: data.intensity,
            includeFlights: data.includeFlights,
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-t-4 border-t-[#FCD116]">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <Calculator className="h-6 w-6 text-[#CE1126]" />
                    Budget Estimator
                </CardTitle>
                <CardDescription>
                    Customize your Ghana experience
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
                    {/* 1. Trip Duration */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="duration" className="text-base font-semibold">Trip Duration</Label>
                            <span className="text-primary font-bold">{watchedDuration} day{watchedDuration !== 1 ? 's' : ''}</span>
                        </div>
                        <input
                            id="duration"
                            type="range"
                            min="1"
                            max="30"
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            {...register('duration', { valueAsNumber: true })}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 day</span>
                            <span>30 days</span>
                        </div>
                    </div>

                    {/* 2. Number of Travelers */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="travelers" className="text-base font-semibold">Number of Travelers</Label>
                            <span className="text-primary font-bold">{watchedTravelers} person{watchedTravelers !== 1 ? '/people' : ''}</span>
                        </div>
                        <input
                            id="travelers"
                            type="range"
                            min="1"
                            max="10"
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            {...register('travelers', { valueAsNumber: true })}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>1 person</span>
                            <span>10 people</span>
                        </div>
                    </div>

                    {/* 3. Travel Month */}
                    <div className="space-y-2">
                        <Label htmlFor="month" className="text-base font-semibold">Travel Month</Label>
                        <div className="relative">
                            <select
                                id="month"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                {...register('month')}
                            >
                                {months.map((m) => (
                                    <option key={m.name} value={m.name}>
                                        {m.name} – {m.season}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {months.find(m => m.name === watchedMonth)?.isPeak && (
                            <div className="flex items-center gap-2 text-amber-600 text-sm mt-1">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Peak season: Expect higher prices and crowds.</span>
                            </div>
                        )}
                    </div>

                    {/* 4. Regions to Visit */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <Label className="text-base font-semibold">Regions to Visit</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="newToGhana"
                                    checked={watchedIsNewToGhana}
                                    onChange={(e) => handleNewToGhanaChange(e.target.checked)}
                                />
                                <Label htmlFor="newToGhana" className="text-sm font-normal cursor-pointer">I’m new to Ghana</Label>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-secondary/20">
                            {regionsList.map((region) => (
                                <div key={region} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`region-${region}`}
                                        checked={watchedRegions.includes(region)}
                                        onChange={() => handleRegionToggle(region)}
                                    />
                                    <Label htmlFor={`region-${region}`} className="cursor-pointer text-sm">
                                        {region}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.regions && <p className="text-sm text-destructive">{errors.regions.message}</p>}
                    </div>

                    {/* 5. Travel Style */}
                    <div className="space-y-3">
                        <Label className="text-sm sm:text-base font-semibold">Travel Style</Label>
                        <div className="space-y-2">
                            {travelStyles.map((style) => (
                                <label
                                    key={style.id}
                                    className={cn(
                                        "flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent",
                                        watchedTravelStyle === style.id ? "border-primary bg-accent" : "border-input"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        value={style.id}
                                        className="mt-1"
                                        {...register('travelStyle')}
                                    />
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center w-full">
                                            <span className="font-medium">{style.label}</span>
                                            <span className="text-sm text-muted-foreground">{style.cost}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{style.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 6. Accommodation Type */}
                    <div className="space-y-3">
                        <Label className="text-sm sm:text-base font-semibold">Accommodation Type</Label>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            {['Hotels', 'Guesthouses', 'Airbnb'].map((type) => (
                                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={type}
                                        {...register('accommodationType')}
                                        className="accent-primary"
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 7. Activity Intensity */}
                    <div className="space-y-3">
                        <Label className="text-sm sm:text-base font-semibold">Activity Intensity</Label>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            {['Relaxed', 'Moderate', 'Packed'].map((level) => (
                                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={level}
                                        {...register('intensity')}
                                        className="accent-primary"
                                    />
                                    <span>{level}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 8. Include International Flights */}
                    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-secondary/10">
                        <Checkbox
                            id="includeFlights"
                            checked={watchedIncludeFlights}
                            onChange={(e) => setValue('includeFlights', e.target.checked)}
                        />
                        <div className="space-y-1">
                            <Label htmlFor="includeFlights" className="font-semibold cursor-pointer">
                                Include International Flights
                            </Label>
                            {watchedIncludeFlights && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Info className="h-3 w-3" /> Est. ~$900/person from US/Europe
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 9. Interests */}
                    <div className="space-y-3">
                        <Label className="text-sm sm:text-base font-semibold">Interests (Optional)</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {interestOptions.map((interest) => (
                                <div
                                    key={interest.id}
                                    onClick={() => handleInterestToggle(interest.id)}
                                    className={cn(
                                        "cursor-pointer text-sm p-2 rounded-md border text-center transition-colors",
                                        watchedInterests.includes(interest.id)
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background hover:bg-secondary"
                                    )}
                                >
                                    {interest.id}
                                </div>
                            ))}
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="px-4 sm:px-6">
                    <Button type="submit" className="w-full text-base sm:text-lg py-5 sm:py-6" disabled={isLoading}>
                        {isLoading ? 'Calculating...' : 'Calculate Budget'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
