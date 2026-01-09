import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white/90 dark:bg-ghana-black/90 backdrop-blur shadow-md hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ghana-green"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-ghana-yellow animate-pop-in" />
            ) : (
                <Moon className="w-4 h-4 text-ghana-black animate-pop-in" />
            )}
        </button>
    );
}
