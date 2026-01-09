import { useState } from 'react';
import { Card } from '../../ui/Card';
import { CheckCircle2, Circle, MoreHorizontal, Plus } from 'lucide-react';

interface PackingListWidgetProps {
    className?: string;
}

export function PackingListWidget({ className = "" }: PackingListWidgetProps) {
    // Mock initial state - in real app, these would come from props or storage
    const [items, setItems] = useState([
        { id: 1, text: 'Passport & Visa', checked: true },
        { id: 2, text: 'Yellow Fever Card', checked: true },
        { id: 3, text: 'Sunscreen & Hat', checked: false },
        { id: 4, text: 'Power Adapter (Type G)', checked: false },
        { id: 5, text: 'Insect Repellent', checked: false },
        { id: 6, text: 'Camera', checked: false },
    ]);

    const toggleItem = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const completedCount = items.filter(i => i.checked).length;
    const progress = Math.round((completedCount / items.length) * 100);

    return (
        <Card className={`p-6 flex flex-col bg-white dark:bg-ghana-black text-gray-900 dark:text-white dark:border-gray-800 ${className}`}>
            <div className="flex justify-between items-start mb-6">
                <div className="w-full mr-4">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            PACKING LIST
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{completedCount}/{items.length}</p>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#006B3F] transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto mb-4 scrollbar-hide">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center gap-3 w-full text-left group"
                    >
                        {item.checked ? (
                            <CheckCircle2 className="w-5 h-5 text-[#006B3F]" />
                        ) : (
                            <Circle className="w-5 h-5 text-gray-300 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors" />
                        )}
                        <span className={`text-sm ${item.checked ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                            {item.text}
                        </span>
                    </button>
                ))}
            </div>

            {/* Add Item Button */}
            <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
            </button>
        </Card>
    );
}
