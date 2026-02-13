// src/orpc/procedures/collection.ts

import { z } from "zod";
import { prisma } from "@/lib/db";
import { ApiResponseSchema } from "@/orpc/helpers/response-schema";
import { withRequire } from "@/orpc/middleware/middleware";
import { createCollectionInput } from "@/orpc/models/collection";
import { base } from "@/orpc/router/base";

export const createCollection = base
	.use(
		withRequire({
			role: "ADMIN",
			permission: { resource: "collection", action: "create" },
		}),
	)
	.input(createCollectionInput)
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
		const collection = await prisma.collection.create({
			data: input,
		});

		return {
			status: 200,
			message: "Collection created successfully",
			data: {
				...collection,
				createdAt: collection.createdAt.toISOString(),
				updatedAt: collection.updatedAt.toISOString(),
			},
		};
	});
