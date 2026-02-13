import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const updateProgressInput = z.object({
	profileId: z.string(),
	mediaId: z.string(),
	progress: z.number().int().min(0),
	completed: z.boolean().default(false),
});

export const viewingHistoryQueryInput = z.object({
	profileId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const viewingHistoryOutput = z.object({
	id: z.string(),
	profileId: z.string(),
	mediaId: z.string(),
	progress: z.number(),
	completed: z.boolean(),
	viewedAt: z.string(),
});

export const viewingHistoryListOutput = z.array(viewingHistoryOutput);
