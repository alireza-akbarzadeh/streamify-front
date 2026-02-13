import { prisma } from "@/lib/db";
import * as ResponseSchema from "@/orpc/helpers/response-schema";
import { authedProcedure } from "@/orpc/context";
import { addToWatchListInput, watchListOutput } from "@/orpc/models/watchlist";

export const addToWatchList = authedProcedure
	.input(addToWatchListInput)
	.output(ResponseSchema.ApiResponseSchema(watchListOutput))
	.handler(async ({ input, context, errors }) => {
		// Check if media exists
		const media = await prisma.media.findUnique({
			where: { id: input.mediaId },
		});

		if (!media) {
			throw errors.NOT_FOUND({ message: "Media not found" });
		}

		// Check if already in watchlist
		const existing = await prisma.watchList.findUnique({
			where: {
				userId_mediaId: {
					userId: context.user.id,
					mediaId: input.mediaId,
				},
			},
		});

		if (existing) {
			throw errors.CONFLICT({ message: "Media already in watch list" });
		}

		const watchList = await prisma.watchList.create({
			data: {
				userId: context.user.id,
				mediaId: input.mediaId,
			},
		});

		return {
			status: 201,
			message: "Added to watch list",
			data: {
				id: watchList.id,
				userId: watchList.userId,
				mediaId: watchList.mediaId,
				createdAt: watchList.createdAt.toISOString(),
			},
		};
	});
