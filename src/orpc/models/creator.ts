import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const createCreatorInput = z.object({
	name: z.string().min(1).max(255),
	bio: z.string().optional(),
	image: z.string().url().optional(),
	birthDate: z.string().datetime().optional(),
});

export const updateCreatorInput = z.object({
	id: z.string(),
	name: z.string().min(1).max(255).optional(),
	bio: z.string().optional().nullable(),
	image: z.string().url().optional().nullable(),
	birthDate: z.string().datetime().optional().nullable(),
});

export const creatorIdInput = z.object({
	id: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const creatorOutput = z.object({
	id: z.string(),
	name: z.string(),
	bio: z.string().nullable(),
	image: z.string().nullable(),
	birthDate: z.string().nullable(),
});

export const creatorListOutput = z.array(creatorOutput);
