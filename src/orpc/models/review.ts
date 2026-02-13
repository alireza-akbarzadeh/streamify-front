import { z } from "zod";

/* --------------------------------- Schemas --------------------------------- */

export const reviewOutputSchema = z.object({
	id: z.string(),
	userId: z.string(),
	mediaId: z.string(),
	rating: z.number().min(1).max(10),
	review: z.string().nullable(),
	helpful: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const reviewWithUserSchema = reviewOutputSchema.extend({
	user: z.object({
		id: z.string(),
		name: z.string().nullable(),
		image: z.string().nullable(),
	}),
});

/* --------------------------------- Inputs --------------------------------- */

export const createReviewInputSchema = z.object({
	mediaId: z.string(),
	rating: z.number().min(1).max(10),
	review: z.string().max(5000).optional(),
});

export const updateReviewInputSchema = z.object({
	id: z.string(),
	rating: z.number().min(1).max(10).optional(),
	review: z.string().max(5000).optional(),
});

export const markHelpfulInputSchema = z.object({
	reviewId: z.string(),
});

export const listReviewsInputSchema = z.object({
	mediaId: z.string(),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(50).default(10),
	sortBy: z.enum(["recent", "highest", "lowest", "helpful"]).default("recent"),
});

/* --------------------------------- Types --------------------------------- */

export type ReviewOutput = z.infer<typeof reviewOutputSchema>;
export type ReviewWithUser = z.infer<typeof reviewWithUserSchema>;
export type CreateReviewInput = z.infer<typeof createReviewInputSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewInputSchema>;
export type MarkHelpfulInput = z.infer<typeof markHelpfulInputSchema>;
export type ListReviewsInput = z.infer<typeof listReviewsInputSchema>;
