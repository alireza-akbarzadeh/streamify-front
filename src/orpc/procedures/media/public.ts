import { os } from "@orpc/server";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/browser";
import { prisma } from "@/lib/db";
import { ApiResponseSchema, PaginatedSchema } from "@/orpc/schema";
import {
	getCollectionInputSchema,
	mediaInputSchema,
} from "./media.input.schema";
import {
	CollectionListItemSchema,
	getGenreOutput,
	MediaItemSchema,
} from "./media.schema";

/* ---------------------------- Browse Media ---------------------------- */

export const browseMedia = os
	.input(mediaInputSchema)
	.output(ApiResponseSchema(PaginatedSchema(MediaItemSchema)))
	.handler(async ({ input }) => {
		const { page, limit, query, genre, type, collectionId, year, sortBy } =
			input;
		const skip = (page - 1) * limit;

		// Build where clause safely
		const where: Prisma.MediaWhereInput = {
			...(type && { type }),
			...(collectionId && { collectionId }),
			...(year && { releaseYear: year }),
			...(query?.trim() && {
				OR: [
					{ title: { contains: query.trim(), mode: "insensitive" } },
					{ description: { contains: query.trim(), mode: "insensitive" } },
				],
			}),
			...(genre && {
				genres: {
					some: { genre: { name: { equals: genre, mode: "insensitive" } } },
				},
			}),
		};

		const orderBy: Prisma.Enumerable<Prisma.MediaOrderByWithRelationInput> =
			sortBy === "title" ? [{ title: "asc" }] : [{ createdAt: "desc" }];

		const [items, total] = await Promise.all([
			prisma.media.findMany({
				where,
				skip,
				take: limit,
				orderBy,
				include: {
					genres: { include: { genre: true } },
					creators: { include: { creator: true } },
					collection: true,
				},
			}),
			prisma.media.count({ where }),
		]);

		// Optional: Zod parse for strict type safety
		const parsedItems = items.map((i) => MediaItemSchema.parse(i));

		return {
			status: 200,
			message: "Media retrieved successfully",
			data: {
				items: parsedItems,
				pagination: { page, limit, total, pages: Math.ceil(total / limit) },
			},
		};
	});

/* ---------------------------- Get Media by ID ---------------------------- */

export const getMedia = os
	.input(z.object({ id: z.string() }))
	.output(ApiResponseSchema(MediaItemSchema))
	.handler(async ({ input }) => {
		const media = await prisma.media.findUnique({
			where: { id: input.id },
			include: {
				genres: { include: { genre: true } },
				creators: { include: { creator: true } },
				collection: {
					include: {
						media: {
							select: { id: true, title: true, thumbnail: true, type: true },
							orderBy: { sortOrder: "asc" },
						},
					},
				},
			},
		});

		if (!media)
			throw { code: "NOT_FOUND", status: 404, message: "Media not found" };

		const parsedMedia = MediaItemSchema.parse(media);

		return {
			status: 200,
			message: "Media retrieved successfully",
			data: parsedMedia,
		};
	});

/* ---------------------------- Get Genres ---------------------------- */

export const getGenres = os
	.output(ApiResponseSchema(getGenreOutput))
	.handler(async () => {
		const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
		return {
			status: 200,
			message: "Genres retrieved successfully",
			data: genres,
		};
	});

/* ---------------------------- Get Collections ---------------------------- */

export const getCollections = os
	.input(getCollectionInputSchema)
	.output(ApiResponseSchema(PaginatedSchema(CollectionListItemSchema)))
	.handler(async ({ input }) => {
		const { type, page, limit } = input;
		const skip = (page - 1) * limit;

		const where: Prisma.CollectionWhereInput = type ? { type } : {};

		const [items, total] = await Promise.all([
			prisma.collection.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					media: {
						select: { id: true, title: true, thumbnail: true, type: true },
						take: 5,
					},
				},
			}),
			prisma.collection.count({ where }),
		]);

		const parsedItems = items.map((i) => CollectionListItemSchema.parse(i));

		return {
			status: 200,
			message: "Collections retrieved successfully",
			data: {
				items: parsedItems,
				pagination: { page, limit, total, pages: Math.ceil(total / limit) },
			},
		};
	});
