import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, onCheckedChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onCheckedChange?.(e.target.checked);
        };

        return (
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className={cn(
                        'peer h-4 w-4 shrink-0 rounded-sm border border-[#006B3F] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-[#006B3F] checked:border-[#006B3F]',
                        className
                    )}
                    ref={ref}
                    onChange={handleChange}
                    {...props}
                />
                <Check className="absolute left-0 top-0 h-4 w-4 hidden peer-checked:block text-white pointer-events-none" />
            </div>
        );
    }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
