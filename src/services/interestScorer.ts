import interestRegionMapping from '../data/interestRegionMapping.json';
import type { RegionScore } from '../types/local';

export function scoreRegions(interests: string[]): RegionScore[] {
    const scores: Record<string, { score: number; matches: string[] }> = {};

    interests.forEach((interest) => {
        const regions = (interestRegionMapping as Record<string, string[]>)[interest] || [];
        regions.forEach((region) => {
            if (!scores[region]) {
                scores[region] = { score: 0, matches: [] };
            }
            scores[region].score += 1;
            scores[region].matches.push(interest);
        });
    });

    return Object.entries(scores)
        .map(([region, data]) => ({
            region,
            score: data.score,
            matches: data.matches,
        }))
        .sort((a, b) => b.score - a.score);
}
