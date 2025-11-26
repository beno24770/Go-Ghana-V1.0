import { useState } from 'react';

interface LocalModeToggleProps {
    onToggle: (isLocalMode: boolean) => void;
}

export function LocalModeToggle({ onToggle }: LocalModeToggleProps) {
    const [isLocalMode, setIsLocalMode] = useState(false);

    const handleToggle = () => {
        const newValue = !isLocalMode;
        setIsLocalMode(newValue);
        onToggle(newValue);
    };

    return (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#006B3F]/10 to-[#CE1126]/10 rounded-lg border border-[#006B3F]/20">
            <div className="flex-1">
                <h3 className="font-semibold text-lg">Local Mode</h3>
                <p className="text-sm text-muted-foreground">
                    Planning a trip within Ghana? Switch to Local Mode for GHS pricing and local transport options.
                </p>
            </div>
            <button
                onClick={handleToggle}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#006B3F] focus:ring-offset-2 ${isLocalMode ? 'bg-[#006B3F]' : 'bg-gray-300'
                    }`}
                role="switch"
                aria-checked={isLocalMode}
                aria-label="Toggle Local Mode"
            >
                <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isLocalMode ? 'translate-x-7' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
}
