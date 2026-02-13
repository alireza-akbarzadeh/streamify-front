import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const createGenreInput = z.object({
	name: z.string().min(1).max(100),
	description: z.string().optional(),
	type: z.enum(["MOVIE", "EPISODE", "TRACK"]),
});

export const updateGenreInput = z.object({
	id: z.string(),
	name: z.string().min(1).max(100).optional(),
	description: z.string().optional().nullable(),
});

export const genreIdInput = z.object({
	id: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const genreOutput = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	type: z.enum(["MOVIE", "EPISODE", "TRACK"]),
});

export const genreListOutput = z.array(genreOutput);
