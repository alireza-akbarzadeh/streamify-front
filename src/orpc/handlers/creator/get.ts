import { z } from "zod";
import { prisma } from "@/lib/db";
import { publicProcedure } from "@/orpc/context";
import * as ResponseSchema from "@/orpc/helpers/response-schema";
import { creatorOutput } from "@/orpc/models/creator";

/**
 * Get all creators with pagination (public)
 */
export const listCreators = publicProcedure
	.input(
		z
			.object({
				page: z.number().min(1).default(1),
				limit: z.number().min(1).max(100).default(20),
				search: z.string().optional(),
			})
			.optional(),
	)
	.output(
		ResponseSchema.ApiResponseSchema(
			ResponseSchema.PaginatedOutput(creatorOutput),
		),
	)
	.handler(async ({ input = { page: 1, limit: 20 } }) => {
		const { page, limit, search } = input;
		const skip = (page - 1) * limit;

		const where = search
			? {
					name: {
						contains: search,
						mode: "insensitive" as const,
					},
				}
			: undefined;

		const [creators, total] = await Promise.all([
			prisma.creator.findMany({
				where,
				orderBy: { name: "asc" },
				skip,
				take: limit,
			}),
			prisma.creator.count({ where }),
		]);

		return {
			status: 200,
			message: "Creators retrieved successfully",
			data: {
				items: creators.map((c) => ({
					id: c.id,
					name: c.name,
					bio: c.bio,
					image: c.image,
					birthDate: c.birthDate?.toISOString() ?? null,
				})),
				pagination: {
					page,
					limit,
					total,
				},
			},
		};
	});

/**
 * Get a single creator by ID (public)
 */
export const getCreator = publicProcedure
	.input(z.object({ id: z.string() }))
	.output(ResponseSchema.ApiResponseSchema(creatorOutput))
	.handler(async ({ input, errors }) => {
		const creator = await prisma.creator.findUnique({
			where: { id: input.id },
		});

		if (!creator) {
			throw errors.NOT_FOUND({ message: "Creator not found" });
		}

		return {
			status: 200,
			message: "Creator retrieved successfully",
			data: {
				id: creator.id,
				name: creator.name,
				bio: creator.bio,
				image: creator.image,
				birthDate: creator.birthDate?.toISOString() ?? null,
			},
		};
	});
