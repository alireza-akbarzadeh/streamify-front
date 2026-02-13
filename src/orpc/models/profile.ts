import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              INPUT SCHEMAS                                 */
/* -------------------------------------------------------------------------- */

export const createProfileInput = z.object({
	name: z.string().min(1).max(50),
	image: z.string().url().optional(),
	pin: z.string().length(4).regex(/^\d+$/).optional(),
	isKids: z.boolean().default(false),
	language: z.string().default("en"),
});

export const updateProfileInput = z.object({
	id: z.string(),
	name: z.string().min(1).max(50).optional(),
	image: z.string().url().optional().nullable(),
	pin: z.string().length(4).regex(/^\d+$/).optional().nullable(),
	isKids: z.boolean().optional(),
	language: z.string().optional(),
});

export const profileIdInput = z.object({
	id: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                              OUTPUT SCHEMAS                                */
/* -------------------------------------------------------------------------- */

export const profileOutput = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	image: z.string().nullable(),
	pin: z.string().nullable(),
	isKids: z.boolean(),
	language: z.string(),
});

export const profileListOutput = z.array(profileOutput);
