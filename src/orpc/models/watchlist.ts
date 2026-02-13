import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const addToWatchListInput = z.object({
	mediaId: z.string(),
});

export const removeFromWatchListInput = z.object({
	mediaId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const watchListOutput = z.object({
	id: z.string(),
	userId: z.string(),
	mediaId: z.string(),
	createdAt: z.string(),
});

export const watchListListOutput = z.array(watchListOutput);
