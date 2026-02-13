import { z } from "zod";
import { prisma } from "@/lib/db";
import { ApiResponseSchema } from "@/orpc/helpers/response-schema";
import { withRequire } from "@/orpc/middleware/middleware";
import { createCollectionInput } from "@/orpc/models/collection";
import { base } from "@/orpc/router/base";

const updateCollectionInput = createCollectionInput.extend({
	id: z.string(),
});

export const updateCollection = base
	.use(
		withRequire({
			role: "ADMIN",
			permission: { resource: "collection", action: "update" },
		}),
	)
	.input(updateCollectionInput)
	.output(
		ApiResponseSchema(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string().nullable(),
				thumbnail: z.string().nullable(),
				type: z.enum(["SERIES", "ALBUM", "PLAYLIST"]),
				createdAt: z.string(),
				updatedAt: z.string(),
			}),
		),
	)
	.handler(async ({ input }) => {
		const { id, ...data } = input;
		const collection = await prisma.collection.update({
			where: { id },
			data,
		});

		return {
			status: 200,
			message: "Collection updated successfully",
			data: {
				...collection,
				createdAt: collection.createdAt.toISOString(),
				updatedAt: collection.updatedAt.toISOString(),
			},
		};
	});
