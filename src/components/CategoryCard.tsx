import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface CategoryCardProps {
    icon: LucideIcon;
    label: string;
    amount: number;
    percentage: number;
    color: string;
    formatCurrency: (amount: number) => string;
    onEdit?: () => void;
}

export function CategoryCard({
    icon: Icon,
    label,
    amount,
    percentage,
    color,
    formatCurrency,
    onEdit
}: CategoryCardProps) {
    return (
        <Card className="border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                            <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{label}</p>
                            <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(amount)}</p>
                        {onEdit && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onEdit}
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
            </CardContent>
        </Card>
    );
}
