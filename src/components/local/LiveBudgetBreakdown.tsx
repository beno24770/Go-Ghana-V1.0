import { useMemo } from 'react';
import { DollarSign, Bus, Hotel, Utensils, Activity } from 'lucide-react';
import { calculateLocalTripCost } from '../../services/localPricingEngine';
import { scoreRegions } from '../../services/interestScorer';
import type { LocalInputData } from '../../types/local';

interface LiveBudgetBreakdownProps {
    data: LocalInputData;
}

export function LiveBudgetBreakdown({ data }: LiveBudgetBreakdownProps) {
    const costBreakdown = useMemo(() => {
        // 1. Derive regions from interests
        const scoredRegions = scoreRegions(data.interests);
        const topRegions = scoredRegions.slice(0, 2).map((r) => r.region);

        // Fallback if no interests/regions found
        if (topRegions.length === 0) {
            topRegions.push('Central', 'Eastern');
        }

        // 2. Calculate Duration
        const duration = Math.ceil(
            (data.dates.end.getTime() - data.dates.start.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (duration <= 0) return null;

        // 3. Calculate Cost
        return calculateLocalTripCost(data, topRegions, duration);
    }, [data]);

    if (!costBreakdown) {
        return (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center text-gray-500">
                <p>Select dates to see your estimated budget breakdown.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#006B3F]/5 p-4 border-b border-[#006B3F]/10 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#006B3F]" />
                    Estimated Cost
                </h3>
                <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#006B3F]">
                        GHS {costBreakdown.total.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        ~GHS {costBreakdown.perPerson.toLocaleString()} per person
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-3">
                {[
                    { label: 'Accommodation', value: costBreakdown.accommodation, icon: Hotel, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Transport', value: costBreakdown.transport, icon: Bus, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Food', value: costBreakdown.food, icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Activities', value: costBreakdown.activities, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${item.bg}`}>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                            GHS {item.value.toLocaleString()}
                        </span>
                    </div>
                ))}

                <div className="pt-3 mt-2 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <div>
                        <span className="block mb-1">Essentials</span>
                        <span className="font-medium text-gray-700">GHS {costBreakdown.essentials.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                        <span className="block mb-1">Contingency (5%)</span>
                        <span className="font-medium text-gray-700">GHS {costBreakdown.contingency.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {data.customBudget && (
                <div className={`p-3 text-sm text-center font-medium border-t ${data.customBudget >= costBreakdown.total
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                    {data.customBudget >= costBreakdown.total
                        ? 'Within your custom budget! 🎉'
                        : `Over budget by GHS ${(costBreakdown.total - data.customBudget).toLocaleString()} ⚠️`}
                </div>
            )}
        </div>
    );
}
