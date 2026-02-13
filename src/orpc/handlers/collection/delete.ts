// src/orpc/procedures/collection.ts
import { z } from "zod";
import { prisma } from "@/lib/db";
import { ApiResponseSchema } from "@/orpc/helpers/response-schema";
import { withRequire } from "@/orpc/middleware/middleware";
import { base } from "@/orpc/router/base";

export const deleteCollection = base
	.use(
		withRequire({
			role: "ADMIN",
			permission: { resource: "collection", action: "delete" },
		}),
	)
	.input(z.object({ id: z.string() }))
	.output(ApiResponseSchema(z.object({ id: z.string() })))
	.handler(async ({ input }) => {
		const collection = await prisma.collection.delete({
			where: { id: input.id },
		});

		return {
			status: 200,
			message: "Collection deleted successfully",
			data: { id: collection.id },
		};
	});
