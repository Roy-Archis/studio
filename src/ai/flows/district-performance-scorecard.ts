'use server';
/**
 * @fileOverview Generates a simplified performance scorecard for a given district's MGNREGA performance.
 *
 * - generateDistrictScorecard - A function that generates the district performance scorecard.
 * - DistrictPerformanceScorecardInput - The input type for the generateDistrictScorecard function.
 * - DistrictPerformanceScorecardOutput - The return type for the generateDistrictScorecard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DistrictPerformanceScorecardInputSchema = z.object({
  districtName: z.string().describe('The name of the district.'),
  stateName: z.string().describe('The name of the state.'),
  performanceData: z.string().describe('A JSON string containing the MGNREGA performance data for the district.'),
});
export type DistrictPerformanceScorecardInput = z.infer<typeof DistrictPerformanceScorecardInputSchema>;

const DistrictPerformanceScorecardOutputSchema = z.object({
  scorecard: z.string().describe('A simplified performance scorecard for the district.'),
});
export type DistrictPerformanceScorecardOutput = z.infer<typeof DistrictPerformanceScorecardOutputSchema>;

export async function generateDistrictScorecard(input: DistrictPerformanceScorecardInput): Promise<DistrictPerformanceScorecardOutput> {
  return districtPerformanceScorecardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'districtPerformanceScorecardPrompt',
  input: {schema: DistrictPerformanceScorecardInputSchema},
  output: {schema: DistrictPerformanceScorecardOutputSchema},
  prompt: `You are an expert in summarizing government program performance data for a rural Indian audience with low literacy.

  Generate a simplified performance scorecard for the following district based on the provided MGNREGA performance data. Highlight key achievements and areas for improvement in simple terms, using culturally relevant examples and avoiding technical jargon. Use the provided JSON data, but do not output JSON in your scorecard.

  District: {{{districtName}}}
  State: {{{stateName}}}
  Performance Data:
  {{#if performanceData}}
  {{performanceData}}
  {{else}}
  No performance data available.
  {{/if}}
  `,
});

const districtPerformanceScorecardFlow = ai.defineFlow(
  {
    name: 'districtPerformanceScorecardFlow',
    inputSchema: DistrictPerformanceScorecardInputSchema,
    outputSchema: DistrictPerformanceScorecardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
