'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing simplified explanations of MGNREGA terms and indicators.
 *
 * - `getSimplifiedExplanation` - A function that takes a term or indicator and returns a simplified explanation.
 * - `SimplifiedExplanationInput` - The input type for the `getSimplifiedExplanation` function.
 * - `SimplifiedExplanationOutput` - The return type for the `getSimplifiedExplanation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifiedExplanationInputSchema = z.object({
  term: z.string().describe('The MGNREGA term or indicator to explain.'),
});
export type SimplifiedExplanationInput = z.infer<typeof SimplifiedExplanationInputSchema>;

const SimplifiedExplanationOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the term or indicator.'),
});
export type SimplifiedExplanationOutput = z.infer<typeof SimplifiedExplanationOutputSchema>;

export async function getSimplifiedExplanation(input: SimplifiedExplanationInput): Promise<SimplifiedExplanationOutput> {
  return simplifiedExplanationFlow(input);
}

const simplifiedExplanationPrompt = ai.definePrompt({
  name: 'simplifiedExplanationPrompt',
  input: {schema: SimplifiedExplanationInputSchema},
  output: {schema: SimplifiedExplanationOutputSchema},
  prompt: `You are an expert in explaining complex government programs to people with limited literacy and technical knowledge. You will provide a simple, clear, and culturally relevant explanation of the given MGNREGA term or indicator. Focus on using examples and analogies that would be easily understood by rural Indian citizens.  Use local languages and cultural context where appropriate.

Term/Indicator: {{{term}}}

Explanation:`, // Keep the prompt simple and direct
});

const simplifiedExplanationFlow = ai.defineFlow(
  {
    name: 'simplifiedExplanationFlow',
    inputSchema: SimplifiedExplanationInputSchema,
    outputSchema: SimplifiedExplanationOutputSchema,
  },
  async input => {
    const {output} = await simplifiedExplanationPrompt(input);
    return output!;
  }
);
