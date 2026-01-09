import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

export function BudgetChart({ data }: BudgetChartProps) {
    const RADIAN = Math.PI / 180;

    interface LabelProps {
        cx: number;
        cy: number;
        midAngle?: number;
        innerRadius?: number;
        outerRadius?: number;
        percent?: number;
    }

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle = 0,
        innerRadius = 0,
        outerRadius = 0,
        percent = 0,
    }: LabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => `GHS ${value.toLocaleString()}`}
                        contentStyle={{
                            backgroundColor: 'var(--tooltip-bg, rgba(255, 255, 255, 0.95))',
                            border: '1px solid var(--tooltip-border, #e5e7eb)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            color: 'var(--tooltip-text, inherit)'
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-sm dark:text-gray-300">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
