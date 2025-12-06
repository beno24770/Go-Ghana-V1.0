import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Calculator, Calendar, MapPin, Plane,
    Briefcase, Heart, ArrowRight, ArrowLeft, Check, Info
} from 'lucide-react';
import { sleep } from '../utils/delay';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { ProgressIndicator } from './ProgressIndicator';
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
    flightCost: z.preprocess(
        (val) => (val === '' || val === null || Number.isNaN(Number(val)) ? undefined : Number(val)),
        z.number().optional()
    ),
    includeInsurance: z.boolean().optional(),

    interests: z.array(z.string()),
    origin: z.string().optional(),
    nationality: z.string().optional(),
    customDailyBudget: z.preprocess(
        (val) => (val === '' || val === null || Number.isNaN(Number(val)) ? undefined : Number(val)),
        z.number().optional()
    ),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export interface BudgetFormProps {
    onSubmit: (data: BudgetFormData) => void;
    isLoading?: boolean;
    initialStep?: number;
}

export function BudgetForm({ onSubmit, isLoading = false, initialStep = 1 }: BudgetFormProps) {
    const [step, setStep] = useState(initialStep);
    const totalSteps = 7; // Now includes Review & Confirm step
    console.log("BudgetForm loaded - v7.0 (Review Step Added)");

    useEffect(() => {
        setStep(initialStep);
    }, [initialStep]);

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
            origin: 'USA',
            nationality: 'Other',
        },
    });

    const watchedValues = watch();

    const [returnToReview, setReturnToReview] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const handleNext = async () => {
        if (isNavigating) return;
        setIsNavigating(true);

        // Small delay to prevent double-clicks triggering the next button immediately
        await sleep(300);

        if (returnToReview) {
            setStep(totalSteps);
            setReturnToReview(false);
        } else {
            if (step < totalSteps) setStep(s => s + 1);
        }
        setIsNavigating(false);
    };

    const handleBack = () => {
        if (isNavigating) return;
        if (returnToReview) {
            setStep(totalSteps);
            setReturnToReview(false);
        } else if (step > 1) {
            setStep(s => s - 1);
        }
    };

    const onFormSubmit = (data: FormSchema) => {
        console.log('🎯 Form submitted! Data:', data);

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

        const finalRegions = data.regions.length > 0 ? data.regions : ['Greater Accra', 'Central', 'Ashanti'];

        console.log('✅ Calling parent onSubmit with transformed data');
        onSubmit({
            duration: data.duration,
            travelers: data.travelers,
            travelerType,
            accommodationLevel,
            activities,
            month: data.month,
            regions: finalRegions,
            intensity: 'Moderate',
            includeFlights: data.includeFlights,
            flightCost: data.flightCost,
            includeInsurance: data.includeInsurance,

            // New fields
            roomSharing: data.roomSharing,
            arrivalCity: data.arrivalCity,
            transportMode: data.transportMode,
            accommodationType: data.accommodationType.toLowerCase() as 'hotel' | 'guesthouse' | 'airbnb',
            isNewToGhana: data.isNewToGhana,
            origin: data.origin,
            nationality: data.nationality,
        });
    };

    // Helper for Edit action
    const handleEdit = (stepNumber: number) => {
        setStep(stepNumber);
        setReturnToReview(true);
    };

    const renderStep1 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <Label className="text-lg font-bold text-gray-900">Trip Dates</Label>
                        <span className="text-2xl font-bold text-ghana-green">{watchedValues.duration} <span className="text-sm font-medium text-gray-500">days</span></span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-sm font-medium text-gray-500">Start Date</Label>
                            <input
                                id="startDate"
                                type="date"
                                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-white focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors"
                                {...register('startDate', {
                                    onChange: (e) => {
                                        const start = new Date(e.target.value);
                                        const endVal = watch('endDate');
                                        if (endVal) {
                                            const end = new Date(endVal);
                                            const diffTime = Math.abs(end.getTime() - start.getTime());
                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
                                            if (diffDays > 0) setValue('duration', diffDays);

                                            // Set Month automatically
                                            const monthName = start.toLocaleString('default', { month: 'long' });
                                            setValue('month', monthName);
                                        }
                                    }
                                })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate" className="text-sm font-medium text-gray-500">End Date</Label>
                            <input
                                id="endDate"
                                type="date"
                                className="w-full h-12 px-4 rounded-xl border-2 border-gray-100 bg-white focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors"
                                {...register('endDate', {
                                    onChange: (e) => {
                                        const end = new Date(e.target.value);
                                        const startVal = watch('startDate');
                                        if (startVal) {
                                            const start = new Date(startVal);
                                            const diffTime = Math.abs(end.getTime() - start.getTime());
                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
                                            if (diffDays > 0) setValue('duration', diffDays);
                                        }
                                    }
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-end">
                        <Label className="text-lg font-bold text-gray-900">Travelers</Label>
                        <span className="text-2xl font-bold text-ghana-green">{watchedValues.travelers} <span className="text-sm font-medium text-gray-500">{watchedValues.travelers === 1 ? 'person' : 'people'}</span></span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-ghana-green focus:outline-none focus:ring-2 focus:ring-ghana-green/20"
                        aria-label="Travelers"
                        {...register('travelers', { valueAsNumber: true })}
                    />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <Label className="text-lg font-bold text-gray-900">Room Sharing Preference</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { id: 'private', label: 'Private Room', sub: 'One room per person' },
                            { id: 'shared', label: 'Shared Room', sub: 'Two people per room' },
                            { id: 'family', label: 'Family Room', sub: 'Large room for families' }
                        ].map((opt) => (
                            <label
                                key={opt.id}
                                className={cn(
                                    "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                                    watchedValues.roomSharing === opt.id
                                        ? "border-ghana-green bg-ghana-green/5 shadow-sm"
                                        : "border-gray-100 hover:border-ghana-green/30 bg-white"
                                )}
                            >
                                <input
                                    type="radio"
                                    value={opt.id}
                                    className="hidden"
                                    {...register('roomSharing')}
                                />
                                <span className={cn("font-bold text-base mb-1", watchedValues.roomSharing === opt.id ? "text-ghana-green" : "text-gray-700")}>{opt.label}</span>
                                <span className="text-xs text-gray-500 text-center">{opt.sub}</span>
                                {watchedValues.roomSharing === opt.id && (
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-ghana-green" />
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-900">Travel Month</Label>
                        <div className="relative">
                            <select
                                className="flex h-12 w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-base ring-offset-background focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors appearance-none"
                                {...register('month')}
                            >
                                {months.map(m => (
                                    <option key={m.name} value={m.name}>{m.name} ({m.season})</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <Calendar className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-900">Arrival City</Label>
                        <div className="relative">
                            <select
                                className="flex h-12 w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-base ring-offset-background focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors appearance-none"
                                {...register('arrivalCity')}
                            >
                                {['Accra', 'Kumasi', 'Takoradi', 'Tamale'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                <MapPin className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-gray-900">Nationality (for Visa)</Label>
                        <select
                            className="flex h-12 w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-base ring-offset-background focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors appearance-none"
                            {...register('nationality')}
                        >
                            <option value="Other">Other / International</option>
                            <option value="USA">American</option>
                            <option value="UK">British</option>
                            <option value="EU">European (EU)</option>
                            <option value="ECOWAS">ECOWAS (West Africa)</option>
                            <option value="Ghanaian">Ghanaian</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-bold text-gray-900">Choose your style</Label>
                    <div className="grid grid-cols-1 gap-4">
                        {travelStyles.map((style) => (
                            <label
                                key={style.id}
                                className={cn(
                                    "relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                                    watchedValues.travelStyle === style.id
                                        ? "border-ghana-green bg-ghana-green/5 shadow-sm"
                                        : "border-gray-100 hover:border-ghana-green/30 bg-white"
                                )}
                            >
                                <div className="flex items-start space-x-4">
                                    <input
                                        type="radio"
                                        value={style.id}
                                        data-testid={`travel-style-${style.id}`}
                                        className="mt-1.5 accent-ghana-green h-4 w-4"
                                        {...register('travelStyle')}
                                    />
                                    <div className="flex-1">
                                        <div className="flex flex-wrap justify-between items-center mb-1 gap-2">
                                            <span className={cn("font-bold text-lg", watchedValues.travelStyle === style.id ? "text-ghana-green" : "text-gray-900")}>
                                                {style.label}
                                            </span>
                                            <span className="text-xs font-bold text-ghana-green bg-ghana-green/10 px-3 py-1 rounded-full whitespace-nowrap">
                                                {style.cost}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{style.desc}</p>
                                    </div>
                                </div>

                                {/* Custom Budget Input - Only show for selected style */}
                                {watchedValues.travelStyle === style.id && (
                                    <div className="mt-4 pt-4 border-t border-gray-200/50 animate-in fade-in slide-in-from-top-2">
                                        <Label className="text-sm font-bold text-gray-700 mb-2 block">
                                            Want to set a specific daily budget? (USD)
                                        </Label>
                                        <div className="relative max-w-[200px]">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                            <input
                                                type="number"
                                                placeholder="e.g. 45"
                                                className="w-full h-10 pl-7 pr-3 rounded-lg border border-gray-300 focus:border-ghana-green focus:ring-1 focus:ring-ghana-green outline-none transition-all text-sm font-medium"
                                                {...register('customDailyBudget', { valueAsNumber: true })}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                    <Label className="text-lg font-bold text-gray-900">Accommodation Type</Label>
                    <div className="flex flex-wrap gap-3">
                        {['Hotels', 'Guesthouses', 'Airbnb'].map((type) => (
                            <label key={type} className={cn(
                                "flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 cursor-pointer transition-all duration-200",
                                watchedValues.accommodationType === type
                                    ? "bg-ghana-green text-white border-ghana-green shadow-md transform scale-105"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-ghana-green hover:bg-white" // Changed hover bg to white to keep text visible
                            )}>
                                <input
                                    type="radio"
                                    value={type}
                                    className="hidden"
                                    {...register('accommodationType')}
                                />
                                <span className="font-medium">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-6">
                <label className={cn(
                    "flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                    watchedValues.isNewToGhana
                        ? "border-ghana-green bg-ghana-green/5 shadow-sm"
                        : "border-gray-100 hover:border-ghana-green/30 bg-white"
                )}>
                    <input
                        type="checkbox"
                        checked={watchedValues.isNewToGhana}
                        onChange={(e) => {
                            setValue('isNewToGhana', e.target.checked);
                            if (e.target.checked) setValue('regions', []); // Clear manual selection
                        }}
                        className="mt-1 accent-ghana-green h-5 w-5 rounded border-gray-300"
                    />
                    <div>
                        <span className="font-bold text-lg text-gray-900 block mb-1">I’m new to Ghana — recommend for me</span>
                        <span className="text-sm text-gray-500 leading-relaxed">We'll suggest the best regions based on your interests and travel style.</span>
                    </div>
                </label>

                <div className={cn(
                    "space-y-4 transition-all duration-300 pt-6 border-t border-gray-100",
                    watchedValues.isNewToGhana ? "opacity-50 pointer-events-none grayscale" : "opacity-100"
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Label className="text-lg font-bold text-gray-900">Or select regions manually:</Label>
                        <div className="group relative">
                            <Info className="h-5 w-5 text-gray-400 cursor-help hover:text-ghana-green transition-colors" />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl hidden group-hover:block z-10 text-center">
                                Select the regions you want to visit. We'll optimize the route for you.
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {regionsList.map((region) => (
                            <label
                                key={region}
                                className={cn(
                                    "flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all duration-200",
                                    watchedValues.regions?.includes(region)
                                        ? "bg-ghana-green text-white border-ghana-green shadow-md transform scale-105"
                                        : "bg-white text-gray-700 border-gray-100 hover:border-ghana-green/30 hover:bg-gray-50"
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
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                {transportOptions.map((option) => (
                    <label
                        key={option.id}
                        className={cn(
                            "flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                            watchedValues.transportMode === option.id
                                ? "border-ghana-green bg-ghana-green/5 shadow-sm"
                                : "border-gray-100 hover:border-ghana-green/30 bg-white"
                        )}
                    >
                        <input
                            type="radio"
                            value={option.id}
                            className="mt-1.5 accent-ghana-green h-4 w-4"
                            {...register('transportMode')}
                        />
                        <div className="flex-1">
                            <span className={cn("font-bold block text-lg mb-1", watchedValues.transportMode === option.id ? "text-ghana-green" : "text-gray-900")}>
                                {option.label}
                            </span>
                            <p className="text-sm text-gray-500 leading-relaxed">{option.desc}</p>
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
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-6">
                <div className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                    <div className="space-y-1">
                        <Label className="text-lg font-bold text-gray-900">Include International Flights?</Label>
                        <p className="text-sm text-gray-500">Add flight costs to your total budget estimate.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className={cn("text-sm font-bold", !watchedValues.includeFlights ? "text-gray-900" : "text-gray-400")}>No</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={watchedValues.includeFlights}
                                onChange={(e) => setValue('includeFlights', e.target.checked)}
                                aria-label="Include International Flights"
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ghana-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-ghana-green"></div>
                        </label>
                        <span className={cn("text-sm font-bold", watchedValues.includeFlights ? "text-ghana-green" : "text-gray-400")}>Yes</span>
                    </div>
                </div>

                {watchedValues.includeFlights && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <Label htmlFor="flightCost" className="text-base font-bold text-gray-900">Estimated Cost Per Person (USD)</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                <input
                                    id="flightCost"
                                    type="number"
                                    placeholder="e.g. 1200"
                                    className="flex h-12 w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-2 pl-8 text-base ring-offset-background focus:outline-none focus:border-ghana-green focus:ring-0 transition-colors"
                                    {...register('flightCost', { valueAsNumber: true })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="origin" className="text-base font-bold text-gray-900">Flight Origin</Label>
                            <select
                                id="origin"
                                className="flex h-12 w-full rounded-xl border-2 border-gray-100 bg-white px-4 py-2 text-base focus:outline-none focus:border-ghana-green transition-colors"
                                {...register('origin')}
                            >
                                <option value="USA">USA / North America</option>
                                <option value="UK">UK</option>
                                <option value="Europe">Europe</option>
                                <option value="West Africa">West Africa</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 flex items-start gap-3">
                            <Info className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
                            <div className="space-y-2">
                                <p className="font-medium">Not sure? Check real-time prices on Google Flights.</p>
                                <a
                                    href={`https://www.google.com/travel/flights?q=Flights+to+Accra+Ghana+in+${watchedValues.month}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center font-bold hover:underline text-blue-700"
                                >
                                    Open Google Flights <ArrowRight className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between p-5 border-2 border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
                <div className="space-y-1">
                    <Label className="text-lg font-bold text-gray-900">Include Travel Insurance?</Label>
                    <p className="text-sm text-gray-500">Add estimated travel insurance costs.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className={cn("text-sm font-bold", !watchedValues.includeInsurance ? "text-gray-900" : "text-gray-400")}>No</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={watchedValues.includeInsurance}
                            onChange={(e) => setValue('includeInsurance', e.target.checked)}
                            aria-label="Include Travel Insurance"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ghana-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-ghana-green"></div>
                    </label>
                    <span className={cn("text-sm font-bold", watchedValues.includeInsurance ? "text-ghana-green" : "text-gray-400")}>Yes</span>
                </div>
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
                <p className="text-lg text-gray-600">Select what you're into to help us refine your itinerary.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {interestOptions.map((interest) => (
                    <label
                        key={interest.id}
                        className={cn(
                            "cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-md text-center gap-3 h-32",
                            watchedValues.interests.includes(interest.id)
                                ? "bg-ghana-green text-white border-ghana-green shadow-lg transform scale-105"
                                : "bg-white text-gray-700 border-gray-100 hover:border-ghana-green/30 hover:bg-gray-50"
                        )}
                    >
                        <input
                            type="checkbox"
                            value={interest.id}
                            className="hidden"
                            {...register('interests')}
                        />
                        {/* You could add icons here based on interest.id */}
                        <span className="font-bold text-sm sm:text-base">{interest.id}</span>
                        {watchedValues.interests.includes(interest.id) && (
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                        )}
                    </label>
                ))}
            </div>
        </div>
    );

    const renderStep7 = () => {
        const travelStyleLabel = travelStyles.find(s => s.id === watchedValues.travelStyle)?.label || watchedValues.travelStyle;
        const transportLabel = transportOptions.find(t => t.id === watchedValues.transportMode)?.label || watchedValues.transportMode;
        const regions = watchedValues.isNewToGhana
            ? "AI-Selected (Accra, Central, Ashanti)"
            : watchedValues.regions.length > 0 ? watchedValues.regions.join(', ') : "None selected";

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6 border-2 border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h3 className="text-xl font-bold text-gray-900">Trip Overview</h3>
                        <span className="text-sm font-medium text-gray-500">Step 7 of 7 (v7.0.2)</span>
                    </div>

                    <div className="space-y-4">
                        {/* Budget & Duration */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500 block">Duration & Travelers</span>
                                    <span className="text-base font-bold text-gray-900">
                                        {watchedValues.duration} days • {watchedValues.travelers} {watchedValues.travelers === 1 ? 'traveler' : 'travelers'}
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {watchedValues.month} • {watchedValues.arrivalCity} • {watchedValues.roomSharing}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(1)}
                                className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                            >
                                Edit
                            </Button>
                        </div>

                        {/* Travel Style */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500 block">Style & Accommodation</span>
                                    <span className="text-base font-bold text-gray-900">{travelStyleLabel}</span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Staying in: {watchedValues.accommodationType}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(2)}
                                className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                            >
                                Edit
                            </Button>
                        </div>

                        {/* Destinations */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500 block">Destinations</span>
                                    <span className="text-base font-bold text-gray-900 line-clamp-1">{regions}</span>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(3)}
                                className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                            >
                                Edit
                            </Button>
                        </div>

                        {/* Transport */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                    <Calculator className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500 block">Transport</span>
                                    <span className="text-base font-bold text-gray-900">{transportLabel}</span>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(4)}
                                className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                            >
                                Edit
                            </Button>
                        </div>

                        {/* Flights & Insurance */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                    <Plane className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500 block">Flights & Insurance</span>
                                    <div className="flex gap-3 mt-1">
                                        <span className={cn("text-xs px-2 py-1 rounded-full font-bold", watchedValues.includeFlights ? "bg-ghana-green/10 text-ghana-green" : "bg-gray-200 text-gray-500")}>
                                            Flights: {watchedValues.includeFlights ? 'Yes' : 'No'}
                                        </span>
                                        <span className={cn("text-xs px-2 py-1 rounded-full font-bold", watchedValues.includeInsurance ? "bg-ghana-green/10 text-ghana-green" : "bg-gray-200 text-gray-500")}>
                                            Insurance: {watchedValues.includeInsurance ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(5)}
                                className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                            >
                                Edit
                            </Button>
                        </div>

                        {/* Interests */}
                        {watchedValues.interests.length > 0 && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-ghana-green">
                                        <Heart className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 block">Interests</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {watchedValues.interests.map(interest => (
                                                <span key={interest} className="text-xs bg-ghana-green/10 text-ghana-green px-2 py-1 rounded-full font-bold">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(6)}
                                    className="text-ghana-green hover:text-green-800 hover:bg-ghana-green/10 font-medium"
                                >
                                    Edit
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center p-8 bg-ghana-green/5 rounded-2xl border-2 border-ghana-green/10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Everything Look Good?</h3>
                    <p className="text-base text-gray-600 mb-0 max-w-lg mx-auto">
                        Review your selections above. You can edit any section by clicking the "Edit" button, or proceed to generate your personalized budget.
                    </p>
                </div>
            </div>
        );
    };

    const stepTitles = [
        {
            title: "What's Your Budget & How Long Will You Stay?",
            subtitle: "Set your spending limit and trip duration. We'll build everything around what you can afford.",
            icon: Calendar
        },
        {
            title: "How Do You Like to Travel?",
            subtitle: "Choose your comfort level—from backpacker to luxury. This helps us match you with the right accommodations.",
            icon: Briefcase
        },
        {
            title: "Where in Ghana Do You Want to Explore?",
            subtitle: "New to Ghana? Let us suggest the best regions. Already know where you're going? Pick your destinations manually.",
            icon: MapPin
        },
        {
            title: "How Will You Get Around?",
            subtitle: "Choose your preferred mode of transport—this affects your daily costs.",
            icon: Calculator
        },
        {
            title: "Flying In? Need Travel Insurance?",
            subtitle: "Tell us if you need international flights and travel insurance included in your budget estimate.",
            icon: Plane
        },
        {
            title: "What Are You Into?",
            subtitle: "Select your interests to help us refine your itinerary.",
            icon: Heart
        },
        {
            title: "Ready to See Your Budget?",
            subtitle: "Review your selections below. Everything look good? Hit the button and we'll generate your personalized trip budget in seconds.",
            icon: Check
        },
    ];

    return (
        <Card className="w-full max-w-3xl mx-auto shadow-xl border-none bg-white rounded-2xl overflow-hidden">
            <div className="bg-white border-b border-gray-100">
                <ProgressIndicator
                    currentStep={step}
                    totalSteps={totalSteps}
                    onStepClick={(s) => {
                        if (s < step || returnToReview) setStep(s);
                    }}
                />
            </div>
            <CardHeader className="pb-2 pt-6 px-6 sm:px-8 bg-white">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 text-2xl mb-2">
                            {(() => {
                                const Icon = stepTitles[step - 1].icon;
                                return Icon && <span className="p-2 bg-primary/10 rounded-full text-primary"><Icon className="h-6 w-6" /></span>;
                            })()}
                            {stepTitles[step - 1].title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground pl-14">
                            {stepTitles[step - 1].subtitle}
                        </p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                        {step} / {totalSteps}
                    </span>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onFormSubmit, (errors) => {
                console.error("❌ Form validation failed:", errors);
                // Alert the user if there are errors
                alert("Please check your entries. Some required fields are missing or invalid.");
            })}>
                <CardContent className="p-6 sm:p-8 min-h-[400px]">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}
                    {step === 5 && renderStep5()}
                    {step === 6 && renderStep6()}
                    {step === 7 && renderStep7()}
                </CardContent>

                <CardFooter className="flex flex-col-reverse sm:flex-row justify-between p-6 bg-secondary/5 border-t gap-3 sm:gap-0">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        disabled={step === 1 || isNavigating}
                        className={cn("gap-2 w-full sm:w-auto", step === 1 && "invisible")}
                    >
                        <ArrowLeft className="h-4 w-4" /> {returnToReview ? 'Cancel Edit' : 'Back'}
                    </Button>

                    {step < totalSteps ? (
                        <Button
                            type="button"
                            onClick={handleNext}
                            disabled={isNavigating}
                            className="gap-2 px-8 w-full sm:w-auto bg-ghana-green hover:bg-green-800 text-white"
                        >
                            {returnToReview ? 'Save & Return' : 'Next'} <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="gap-2 px-8 bg-ghana-green hover:bg-green-800 w-full sm:w-auto text-white shadow-lg hover:shadow-ghana-green/20"
                            disabled={isLoading || isNavigating}
                        >
                            {isLoading ? 'Calculating...' : 'Generate My Budget →'} <Check className="h-4 w-4" />
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card >
    );
}
