// src/orpc/procedures/collection.ts
import { z } from "zod";

export const createCollectionInput = z.object({
	title: z.string(),
	description: z.string().optional(),
	thumbnail: z.string().url().optional(),
	type: z.enum(["SERIES", "ALBUM", "PLAYLIST"]),
});

export const collectionOutput = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	thumbnail: z.string().nullable(),
	type: z.enum(["SERIES", "ALBUM", "PLAYLIST"]),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const collectionsOutput = z.array(collectionOutput);
