import { z } from "zod";

export const PaginationInputSchema = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(100).default(20),
	search: z.string().optional(),
});

export const PaginationOutputSchema = z.object({
	page: z.number(),
	limit: z.number(),
	total: z.number(),
});

export const PaginatedOutput = <T extends z.ZodTypeAny>(itemSchema: T) =>
	z.object({
		items: z.array(itemSchema),
		pagination: PaginationOutputSchema,
	});

/* -------------------------------------------------------------------------- */
/*                              Standard API Response                          */
/* -------------------------------------------------------------------------- */

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		status: z.number(),
		message: z.string(),
		data: dataSchema,
	});
