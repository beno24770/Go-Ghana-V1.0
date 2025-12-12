import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../../ui/Card';
import { MoreHorizontal } from 'lucide-react';

interface BudgetOverviewWidgetProps {
    totalBudget: number;
    spent?: number; // Optional tracking feature for later
    breakdown: {
        accommodation: number;
        food: number;
        transport: number;
        activities: number;
        flights: number;
    };
    className?: string;
}

const COLORS = ['#006B3F', '#FCD116', '#CE1126', '#1F2937', '#6B7280'];

export function BudgetOverviewWidget({ totalBudget, breakdown, className = "" }: BudgetOverviewWidgetProps) {
    const data = [
        { name: 'Accommodation', value: breakdown.accommodation },
        { name: 'Food', value: breakdown.food },
        { name: 'Transport', value: breakdown.transport },
        { name: 'Activities', value: breakdown.activities },
        { name: 'Flights', value: breakdown.flights },
    ].filter(item => item.value > 0);

    return (
        <Card className={`p-6 flex flex-col ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#006B3F] rounded-full"></span>
                        BUDGET
                    </h3>
                    <p className="text-2xl font-bold mt-1">
                        ${totalBudget.toLocaleString()} <span className="text-sm font-normal text-gray-400">Total</span>
                    </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 min-h-[160px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <span className="text-xs text-gray-400 block">Spend</span>
                        <span className="font-bold text-gray-700">0%</span>
                    </div>
                </div>
            </div>

            {/* Legend - simplified */}
            <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-500">
                {data.slice(0, 3).map((item, index) => (
                    <div key={item.name} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                        {item.name}
                    </div>
                ))}
                {data.length > 3 && <span>+{data.length - 3} more</span>}
            </div>
        </Card>
    );
}
