import z from "zod";

export const mediaInputSchema = z.object({
	query: z.string().optional(),
	genre: z.string().optional(),
	type: z.enum(["MOVIE", "EPISODE", "TRACK"]).optional(),
	collectionId: z.string().optional(),
	year: z.number().optional(),
	sortBy: z.enum(["recent", "popular", "title"]).default("recent"),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(50).default(20),
});

export const getCollectionInputSchema = z.object({
	type: z.enum(["SERIES", "ALBUM", "PLAYLIST"]).optional(),
	page: z.number().min(1).default(1),
	limit: z.number().min(1).max(50).default(20),
});
