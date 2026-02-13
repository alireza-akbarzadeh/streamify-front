import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const addFavoriteInput = z.object({
	mediaId: z.string(),
});

export const removeFavoriteInput = z.object({
	mediaId: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const favoriteOutput = z.object({
	id: z.string(),
	userId: z.string(),
	mediaId: z.string(),
	createdAt: z.string(),
});

export const favoriteListOutput = z.array(favoriteOutput);
