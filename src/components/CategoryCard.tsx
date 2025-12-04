import { useState } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';

interface CategoryCardProps {
    icon: LucideIcon;
    label: string;
    amount: number;
    percentage: number;
    color: string;
    formatCurrency: (amount: number) => string;
    onEdit?: () => void;
    tips?: string[];
}

export function CategoryCard({
    icon: Icon,
    label,
    amount,
    percentage,
    color,
    formatCurrency,
    onEdit,
    tips
}: CategoryCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
            <CardContent className="p-4">
                <div
                    className="flex items-center justify-between mb-2 cursor-pointer"
                    onClick={() => tips && setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                            <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900">{label}</p>
                                {tips && (
                                    <button className="text-gray-400 hover:text-gray-600">
                                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(amount)}</p>
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit();
                                }}
                                className="text-xs text-gray-500 hover:text-ghana-green h-6 px-2 mt-1"
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                    />
                </div>

                {/* Expandable Tips Section */}
                {tips && isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">💡 What to expect:</p>
                        <ul className="space-y-2">
                            {tips.map((tip, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-ghana-green mt-0.5">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
