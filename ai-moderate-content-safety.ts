'use server';
/**
 * @fileOverview An AI content moderation agent for live video streams.
 *
 * - moderateContentSafety - A function that moderates live stream content for sensitive or illegal material.
 * - ModerateContentSafetyInput - The input type for the moderateContentSafety function.
 * - ModerateContentSafetyOutput - The return type for the moderateContentSafety function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentSafetyInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A frame from a live video stream, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  sellerId: z.string().optional().describe('The ID of the seller streaming the content.'),
});
export type ModerateContentSafetyInput = z.infer<typeof ModerateContentSafetyInputSchema>;

const ModerateContentSafetyOutputSchema = z.object({
  isSensitiveContent: z.boolean().describe('True if sensitive content (e.g., nudity, explicit material) is detected.'),
  sensitiveContentDetails: z.string().describe('Details about the sensitive content detected, if any.'),
  isIllegalContent: z.boolean().describe('True if illegal content (e.g., weapons, drugs, violence) is detected.'),
  illegalContentDetails: z.string().describe('Details about the illegal content detected, if any.'),
  suggestedWarning: z.string().describe('A suggested warning message for the user, if applicable (e.g., "18+ Sensitive Content").'),
  suggestedAction: z.enum(['NONE', 'WARN', 'BLUR', 'BLOCK_STREAM']).describe('Recommended action for the application based on content analysis.'),
});
export type ModerateContentSafetyOutput = z.infer<typeof ModerateContentSafetyOutputSchema>;

export async function moderateContentSafety(input: ModerateContentSafetyInput): Promise<ModerateContentSafetyOutput> {
  return moderateContentSafetyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateContentSafetyPrompt',
  model: 'googleai/gemini-2.5-flash',
  input: {schema: ModerateContentSafetyInputSchema},
  output: {schema: ModerateContentSafetyOutputSchema},
  prompt: `Analyze the provided image frame from a live video stream for any sensitive or illegal content.
  
  Sensitive content includes, but is not limited to, nudity, sexually explicit material, graphic violence, or content inappropriate for a general audience.
  Illegal content includes, but is not limited to, weapons, illegal drugs, or criminal activities.

  Based on your analysis, set 'isSensitiveContent' to true if such content is present, and provide 'sensitiveContentDetails'.
  Set 'isIllegalContent' to true if illegal content is present, and provide 'illegalContentDetails'.
  Provide a 'suggestedWarning' message if any sensitive or illegal content is found.
  Finally, suggest an appropriate 'suggestedAction':
  - 'NONE': No issues detected.
  - 'WARN': Sensitive content detected that requires a warning (e.g., '18+ Sensitive Content').
  - 'BLUR': Content detected that should be blurred (e.g., sensitive body parts).
  - 'BLOCK_STREAM': Illegal content detected that requires immediate stream termination.

  Image to analyze: {{media url=photoDataUri}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const moderateContentSafetyFlow = ai.defineFlow(
  {
    name: 'moderateContentSafetyFlow',
    inputSchema: ModerateContentSafetyInputSchema,
    outputSchema: ModerateContentSafetyOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
