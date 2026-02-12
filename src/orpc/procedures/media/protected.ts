import { os } from "@orpc/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withRequire } from "@/orpc/middleware";
import { ApiResponseSchema } from "@/orpc/schema";
import { MediaItemSchema } from "./media.schema";

/* -------------------------------------------------------------------------- */
/*                                CREATE MEDIA                                 */
/* -------------------------------------------------------------------------- */
const createMediaInputSchema = z.object({
	title: z.string(),
	description: z.string(),
	thumbnail: z.string(),
	videoUrl: z.string().nullable().optional(),
	audioUrl: z.string().nullable().optional(),
	duration: z.number(),
	releaseYear: z.number(),
	type: z.enum(["MOVIE", "EPISODE", "TRACK"]),
	collectionId: z.string().nullable().optional(),
	sortOrder: z.number().nullable().optional(),
	genreIds: z.array(z.string()).optional(),
	creatorIds: z.array(z.string()).optional(),
});

export const createMedia = os
	.use(withRequire({ role: "ADMIN" }))
	.input(createMediaInputSchema)
	.output(ApiResponseSchema(MediaItemSchema))
	.handler(async ({ input }) => {
		const { genreIds, creatorIds, ...mediaData } = input;

		const media = await prisma.media.create({
			data: {
				...mediaData,
				genres: genreIds
					? { create: genreIds.map((id) => ({ genre: { connect: { id } } })) }
					: undefined,
				creators: creatorIds
					? {
							create: creatorIds.map((id) => ({
								creator: { connect: { id } },
								role: "ARTIST",
							})),
						}
					: undefined,
			},
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

		const parsedMedia = MediaItemSchema.parse(media);

		return {
			status: 200,
			message: "Media created successfully",
			data: parsedMedia,
		};
	});

/* -------------------------------------------------------------------------- */
/*                                UPDATE MEDIA                                 */
/* -------------------------------------------------------------------------- */

export const updateMedia = os
	.use(withRequire({ role: "ADMIN" }))
	.input(createMediaInputSchema.extend({ id: z.string() }))
	.output(ApiResponseSchema(MediaItemSchema))
	.handler(async ({ input }) => {
		const { id, genreIds, creatorIds, ...mediaData } = input;

		// update media
		const media = await prisma.media.update({
			where: { id },
			data: {
				...mediaData,
				genres: genreIds
					? {
							deleteMany: {},
							create: genreIds.map((id) => ({ genre: { connect: { id } } })),
						}
					: undefined,
				creators: creatorIds
					? {
							deleteMany: {},
							create: creatorIds.map((id) => ({
								creator: { connect: { id } },
								role: "ARTIST",
							})),
						}
					: undefined,
			},
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

		const parsedMedia = MediaItemSchema.parse(media);

		return {
			status: 200,
			message: "Media updated successfully",
			data: parsedMedia,
		};
	});

/* -------------------------------------------------------------------------- */
/*                                DELETE MEDIA                                 */
/* -------------------------------------------------------------------------- */

export const deleteMedia = os
	.use(withRequire({ role: "ADMIN" }))
	.input(z.object({ id: z.string() }))
	.output(
		ApiResponseSchema(
			z.object({
				id: z.string(),
			}),
		),
	)
	.handler(async ({ input }) => {
		const media = await prisma.media.delete({
			where: { id: input.id },
		});

		return {
			status: 200,
			message: "Media deleted successfully",
			data: { id: media.id },
		};
	});
