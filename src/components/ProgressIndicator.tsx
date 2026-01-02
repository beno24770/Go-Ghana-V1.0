import { ChevronRight } from 'lucide-react';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    onStepClick?: (step: number) => void;
}

const stepLabels = [
    'Duration',
    'Style',
    'Destinations',
    'Transport',
    'Flights',
    'Interests',
    'Review'
];

export function ProgressIndicator({ currentStep, totalSteps, onStepClick }: ProgressIndicatorProps) {
    return (
        <div className="w-full bg-white border-b border-border py-3 sm:py-4">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto overflow-x-auto scrollbar-hide">
                    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
                        const isCompleted = step < currentStep;
                        const isCurrent = step === currentStep;
                        const isClickable = isCompleted && onStepClick;

                        return (
                            <div key={step} className="flex items-center flex-shrink-0">
                                <button
                                    onClick={() => isClickable && onStepClick(step)}
                                    disabled={!isClickable}
                                    className={`
                                        flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-semibold text-xs sm:text-sm
                                        transition-all duration-300
                                        ${isCurrent ? 'bg-[#CE1126] text-white scale-110 shadow-lg' : ''}
                                        ${isCompleted ? 'bg-[#006B3F] text-white hover:scale-105 cursor-pointer' : ''}
                                        ${!isCurrent && !isCompleted ? 'bg-muted text-muted-foreground' : ''}
                                        ${isClickable ? 'hover:shadow-md' : ''}
                                    `}
                                >
                                    {step}
                                </button>
                                {step < totalSteps && (
                                    <ChevronRight
                                        className={`mx-1 sm:mx-2 h-3 w-3 sm:h-4 sm:w-4 hidden sm:block ${isCompleted ? 'text-[#006B3F]' : 'text-muted-foreground'}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-2 sm:mt-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                        {stepLabels[currentStep - 1]}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Step {currentStep} of {totalSteps}
                    </p>
                </div>
            </div>
        </div>
    );
}
