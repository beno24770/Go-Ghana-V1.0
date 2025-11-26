import { ChevronRight } from 'lucide-react';

interface ProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
    onStepClick?: (step: number) => void;
}

const stepLabels = [
    'Start',
    'Trip Details',
    'Processing',
    'Budget',
    'Tours',
    'Decision',
    'Planner',
    'Summary'
];

export function ProgressIndicator({ currentStep, totalSteps, onStepClick }: ProgressIndicatorProps) {
    return (
        <div className="w-full bg-white border-b border-border py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
                        const isCompleted = step < currentStep;
                        const isCurrent = step === currentStep;
                        const isClickable = isCompleted && onStepClick;

                        return (
                            <div key={step} className="flex items-center">
                                <button
                                    onClick={() => isClickable && onStepClick(step)}
                                    disabled={!isClickable}
                                    className={`
                                        flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
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
                                        className={`mx-2 h-4 w-4 ${isCompleted ? 'text-[#006B3F]' : 'text-muted-foreground'}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="text-center mt-3">
                    <p className="text-sm font-medium text-foreground">
                        {stepLabels[currentStep - 1]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Step {currentStep} of {totalSteps}
                    </p>
                </div>
            </div>
        </div>
    );
}
