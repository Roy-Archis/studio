'use server';

import { generateDistrictScorecard } from '@/ai/flows/district-performance-scorecard';
import { getSimplifiedExplanation } from '@/ai/flows/simplified-explanations';
import type { MgnregaDataMonth } from '@/lib/types';

export async function getSimpleExplanationAction(term: string) {
  try {
    const result = await getSimplifiedExplanation({ term });
    return result.explanation;
  } catch (error) {
    console.error('Error getting simplified explanation:', error);
    return 'Could not generate explanation at this time.';
  }
}

export async function getScorecardAction(
  districtName: string,
  stateName: string,
  performanceData: MgnregaDataMonth[]
) {
  try {
    // Summarize the most recent 6 months for the scorecard
    const recentData = performanceData
      .sort((a, b) => (a.year * 12 + a.monthIndex > b.year * 12 + b.monthIndex ? -1 : 1))
      .slice(0, 6);

    const result = await generateDistrictScorecard({
      districtName,
      stateName,
      performanceData: JSON.stringify(recentData),
    });
    return result.scorecard;
  } catch (error) {
    console.error('Error generating scorecard:', error);
    return 'Could not generate a performance scorecard at this time. Please check the data and try again.';
  }
}
