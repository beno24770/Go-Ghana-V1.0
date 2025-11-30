import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Calculator, Calendar, MapPin, Plane,
    Briefcase, Heart, ArrowRight, ArrowLeft, Check, Info
} from 'lucide-react';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { cn } from '../lib/utils';
import type { BudgetFormData, ActivityInterest, TravelerType, AccommodationLevel } from '../types';

const regionsList = [
    'Greater Accra', 'Central', 'Volta', 'Ashanti', 'Western',
    'Northern', 'Savannah', 'Upper East', 'Upper West', 'Eastern',
    'Western North', 'Bono', 'Bono East', 'Ahafo', 'Oti', 'North East'
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
    { id: 'budget', label: 'Budget', cost: '$50–80/day', desc: 'Guesthouses, local eateries' },
    { id: 'mid-range', label: 'Mid-Range', cost: '$80–150/day', desc: '3-star hotels, private transport' },
    { id: 'comfort', label: 'Comfort', cost: '$150–250/day', desc: '4-star hotels, driver' },
    { id: 'luxury', label: 'Luxury', cost: '$250+/day', desc: '5-star hotels, premium dining' },
];

const interestOptions = [
    { id: 'Culture & History', mapTo: 'culture' as const },
    { id: 'Beaches', mapTo: 'relaxation' as const },
    { id: 'Adventure', mapTo: 'adventure' as const },
    { id: 'Nightlife', mapTo: 'culture' as const },
    { id: 'Food Tours', mapTo: 'culture' as const },
    { id: 'Wildlife & Safaris', mapTo: 'nature' as const },
];

const transportOptions = [
    { id: 'bolt', label: 'Bolt / Uber', desc: 'Best for solo travelers & short trips inside cities.' },
    { id: 'private_driver', label: 'Private Car + Driver', desc: 'Comfortable, safe, fixed daily rate. (SUV/Sedan)' },
    { id: 'rental', label: 'Self-Drive Car Rental', desc: 'Rental + fuel estimates.' },
    { id: 'public', label: 'Public Transport', desc: 'Trotro / VIP / Intercity buses (most affordable).' },
    { id: 'flight', label: 'Domestic Flight', desc: 'Useful for North (Tamale, Mole, Bolga routes).' },
];

const formSchema = z.object({
    duration: z.number().min(1).max(30),
    travelers: z.number().min(1).max(10),
    roomSharing: z.enum(['private', 'shared', 'family']),
    month: z.string(),
    arrivalCity: z.string(),

    travelStyle: z.string(),
    accommodationType: z.enum(['Hotels', 'Guesthouses', 'Airbnb']),

    isNewToGhana: z.boolean(),
    regions: z.array(z.string()), // Can be empty if auto-recommended

    transportMode: z.enum(['bolt', 'private_driver', 'rental', 'public', 'flight']),

    includeFlights: z.boolean(),
    flightCost: z.number().optional(),
    includeInsurance: z.boolean().optional(),

    interests: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export interface BudgetFormProps {
    onSubmit: (data: BudgetFormData) => void;
    isLoading?: boolean;
}

export function BudgetForm({ onSubmit, isLoading = false }: BudgetFormProps) {
    const [step, setStep] = useState(1);
    const totalSteps = 6; // Step 7 is result

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration: 7,
            travelers: 1,
            roomSharing: 'private',
            month: 'December',
            arrivalCity: 'Accra',
            travelStyle: 'mid-range',
            accommodationType: 'Hotels',
            isNewToGhana: true,
            regions: [],
            transportMode: 'bolt',
            includeFlights: false,
            flightCost: undefined,
            includeInsurance: false,
            interests: [],
        },
    });

    const watchedValues = watch();

    const handleNext = () => {
        if (step < totalSteps) setStep(s => s + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
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

        // If "New to Ghana" is selected and no regions manually picked, use defaults
        const finalRegions = data.regions.length > 0 ? data.regions : ['Greater Accra', 'Central', 'Ashanti'];

        onSubmit({
            duration: data.duration,
            travelers: data.travelers,
            travelerType,
            accommodationLevel,
            activities,
            month: data.month,
            regions: finalRegions,
            intensity: 'Moderate', // Defaulting for now as removed from UI
            includeFlights: data.includeFlights,
            flightCost: data.flightCost,
            includeInsurance: data.includeInsurance,

            // New fields
            roomSharing: data.roomSharing,
            arrivalCity: data.arrivalCity,
            transportMode: data.transportMode,
            accommodationType: data.accommodationType.toLowerCase() as 'hotel' | 'guesthouse' | 'airbnb',
            isNewToGhana: data.isNewToGhana,
        });
    };

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Trip Duration</Label>
                    <span className="text-primary font-bold text-lg">{watchedValues.duration} days</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="30"
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-ghana-green"
                    {...register('duration', { valueAsNumber: true })}
                />
                <div className="flex gap-2 flex-wrap">
                    {[3, 7, 10, 14, 21].map(d => (
                        <Button
                            key={d}
                            type="button"
                            variant={watchedValues.duration === d ? "default" : "outline"}
                            size="sm"
                            onClick={() => setValue('duration', d)}
                            className="h-8"
                        >
                            {d} days
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Travelers</Label>
                    <span className="text-primary font-bold text-lg">{watchedValues.travelers}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-ghana-green"
                    {...register('travelers', { valueAsNumber: true })}
                />
            </div>

            <div className="space-y-3">
                <Label className="text-base font-semibold">Room Sharing Preference</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { id: 'private', label: 'One room per person' },
                        { id: 'shared', label: 'Two people per room' },
                        { id: 'family', label: 'Family sharing' }
                    ].map((opt) => (
                        <label
                            key={opt.id}
                            className={cn(
                                "flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all hover:bg-accent text-center text-sm",
                                watchedValues.roomSharing === opt.id ? "border-primary bg-accent font-medium" : "border-input"
                            )}
                        >
                            <input
                                type="radio"
                                value={opt.id}
                                className="hidden"
                                {...register('roomSharing')}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="font-semibold">Travel Month</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        {...register('month')}
                    >
                        {months.map(m => (
                            <option key={m.name} value={m.name}>{m.name} ({m.season})</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label className="font-semibold">Arrival City</Label>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        {...register('arrivalCity')}
                    >
                        {['Accra', 'Kumasi', 'Takoradi', 'Tamale'].map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-3">
                <Label className="text-base font-semibold">Choose your style</Label>
                <div className="space-y-3">
                    {travelStyles.map((style) => (
                        <label
                            key={style.id}
                            className={cn(
                                "flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                                watchedValues.travelStyle === style.id
                                    ? "border-ghana-green bg-ghana-green/5 ring-1 ring-ghana-green"
                                    : "border-input hover:border-ghana-green/50"
                            )}
                        >
                            <input
                                type="radio"
                                value={style.id}
                                className="mt-1.5 accent-ghana-green"
                                {...register('travelStyle')}
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-lg">{style.label}</span>
                                    <span className="text-sm font-medium text-ghana-green bg-ghana-green/10 px-2 py-0.5 rounded-full">
                                        {style.cost}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{style.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-base font-semibold">Accommodation Type</Label>
                <div className="flex flex-wrap gap-3">
                    {['Hotels', 'Guesthouses', 'Airbnb'].map((type) => (
                        <label key={type} className={cn(
                            "flex items-center space-x-2 px-4 py-2 rounded-full border cursor-pointer transition-colors",
                            watchedValues.accommodationType === type ? "bg-ghana-green text-white border-ghana-green" : "hover:bg-secondary"
                        )}>
                            <input
                                type="radio"
                                value={type}
                                className="hidden"
                                {...register('accommodationType')}
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                <label className={cn(
                    "flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-all",
                    watchedValues.isNewToGhana ? "border-ghana-green bg-ghana-green/5" : "border-input"
                )}>
                    <input
                        type="checkbox"
                        checked={watchedValues.isNewToGhana}
                        onChange={(e) => {
                            setValue('isNewToGhana', e.target.checked);
                            if (e.target.checked) setValue('regions', []); // Clear manual selection
                        }}

                        className="mt-1 accent-ghana-green h-5 w-5"
                    />
                    <div>
                        <span className="font-bold block">I’m new to Ghana — recommend for me</span>
                        <span className="text-sm text-muted-foreground">We'll suggest the best regions based on your interests.</span>
                    </div>
                </label>

                <div className={cn(
                    "space-y-3 transition-all duration-300",
                    watchedValues.isNewToGhana ? "opacity-50 pointer-events-none grayscale" : "opacity-100"
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Label className="text-base font-semibold">Or select regions manually:</Label>
                        <div className="group relative">
                            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded hidden group-hover:block z-10">
                                We'll optimize the route for you.
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {regionsList.map((region) => (
                            <label
                                key={region}
                                className={cn(
                                    "flex items-center space-x-2 p-2 rounded-md border cursor-pointer text-sm transition-colors",
                                    watchedValues.regions?.includes(region)
                                        ? "bg-ghana-green text-white border-ghana-green"
                                        : "hover:bg-secondary"
                                )}
                            >
                                <input
                                    type="checkbox"
                                    value={region}
                                    checked={watchedValues.regions?.includes(region)}
                                    onChange={(e) => {
                                        const current = watchedValues.regions || [];
                                        if (e.target.checked) {
                                            setValue('regions', [...current, region]);
                                            setValue('isNewToGhana', false); // Uncheck auto-rec if manual select
                                        } else {
                                            setValue('regions', current.filter(r => r !== region));
                                        }
                                    }}
                                    className="hidden"
                                />
                                <span>{region}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-3">
                {transportOptions.map((option) => (
                    <label
                        key={option.id}
                        className={cn(
                            "flex items-start space-x-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md",
                            watchedValues.transportMode === option.id
                                ? "border-ghana-green bg-ghana-green/5 ring-1 ring-ghana-green"
                                : "border-input hover:border-ghana-green/50"
                        )}
                    >
                        <input
                            type="radio"
                            value={option.id}
                            className="mt-1.5 accent-ghana-green"
                            {...register('transportMode')}
                        />
                        <div className="flex-1">
                            <span className="font-bold block text-lg">{option.label}</span>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );

    // Clear flight cost when toggle is turned off
    useEffect(() => {
        if (!watchedValues.includeFlights) {
            setValue('flightCost', undefined);
        }
    }, [watchedValues.includeFlights, setValue]);

    const renderStep5 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border rounded-xl bg-secondary/10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="text-lg font-semibold">Include International Flights?</Label>
                        <p className="text-sm text-muted-foreground">Add flight costs to your total budget estimate.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={cn("text-sm font-medium", !watchedValues.includeFlights && "text-primary")}>No</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={watchedValues.includeFlights}
                                onChange={(e) => setValue('includeFlights', e.target.checked)}
                                aria-label="Include International Flights"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ghana-green/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghana-green"></div>
                        </label>
                        <span className={cn("text-sm font-medium", watchedValues.includeFlights && "text-ghana-green")}>Yes</span>
                    </div>
                </div>

                {watchedValues.includeFlights && (
                    <div className="space-y-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <Label htmlFor="flightCost">Estimated Cost Per Person (USD)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                                <input
                                    id="flightCost"
                                    type="number"
                                    placeholder="e.g. 1200"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-7 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                                    {...register('flightCost', { valueAsNumber: true })}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-3">
                            <Info className="h-5 w-5 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <p>Not sure? Check real-time prices on Google Flights.</p>
                                <a
                                    href={`https://www.google.com/travel/flights?q=Flights+to+Accra+Ghana+in+${watchedValues.month}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center font-semibold hover:underline"
                                >
                                    Open Google Flights <ArrowRight className="h-3 w-3 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border rounded-xl bg-secondary/10 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label className="text-lg font-semibold">Include Travel Insurance?</Label>
                        <p className="text-sm text-muted-foreground">Add estimated travel insurance costs.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={cn("text-sm font-medium", !watchedValues.includeInsurance && "text-primary")}>No</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={watchedValues.includeInsurance}
                                onChange={(e) => setValue('includeInsurance', e.target.checked)}
                                aria-label="Include Travel Insurance"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ghana-green/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghana-green"></div>
                        </label>
                        <span className={cn("text-sm font-medium", watchedValues.includeInsurance && "text-ghana-green")}>Yes</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-4">
                <p className="text-muted-foreground">Select what you're into to help us refine your itinerary.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                    <label
                        key={interest.id}
                        className={cn(
                            "cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border transition-all hover:shadow-sm text-center gap-2 h-24",
                            watchedValues.interests.includes(interest.id)
                                ? "bg-ghana-green text-white border-ghana-green scale-105 font-semibold"
                                : "bg-background hover:bg-secondary"
                        )}
                    >
                        <input
                            type="checkbox"
                            value={interest.id}
                            className="hidden"
                            {...register('interests')}
                        />
                        <span className="font-medium text-sm sm:text-base">{interest.id}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const stepTitles = [
        { title: "Trip Basics", icon: Calendar },
        { title: "Travel Style", icon: Briefcase },
        { title: "Destinations", icon: MapPin },
        { title: "Transport", icon: Calculator }, // Using Calculator as generic icon for now
        { title: "Flights", icon: Plane },
        { title: "Interests", icon: Heart },
    ];

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-2xl border-t-4 border-t-ghana-yellow overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardHeader className="bg-secondary/5 pb-8">
                <div className="flex justify-between items-center mb-6">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        {(() => {
                            const Icon = stepTitles[step - 1].icon;
                            return Icon && <span className="p-2 bg-primary/10 rounded-full text-primary"><Icon className="h-6 w-6" /></span>;
                        })()}
                        Step {step}: {stepTitles[step - 1].title}
                    </CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">
                        {step} / {totalSteps}
                    </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-ghana-green h-full transition-all duration-500 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <CardContent className="p-6 sm:p-8 min-h-[400px]">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                    {step === 5 && renderStep5()}
                    {step === 6 && renderStep6()}
                </CardContent>

                <CardFooter className="flex flex-col-reverse sm:flex-row justify-between p-6 bg-secondary/5 border-t gap-3 sm:gap-0">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1}
                        className={cn("gap-2 w-full sm:w-auto", step === 1 && "invisible")}
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Button>

                    {step < totalSteps ? (
                        <Button type="button" onClick={handleNext} className="gap-2 px-8 w-full sm:w-auto bg-ghana-green hover:bg-green-800 text-white">
                            Next <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit" className="gap-2 px-8 bg-ghana-green hover:bg-green-800 w-full sm:w-auto text-white shadow-lg hover:shadow-ghana-green/20" disabled={isLoading}>
                            {isLoading ? 'Calculating...' : 'See My Budget Summary'} <Check className="h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}
