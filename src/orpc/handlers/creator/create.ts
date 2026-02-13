import { prisma } from "@/lib/db";
import { adminProcedure } from "@/orpc/context";
import * as ResponseSchema from "@/orpc/helpers/response-schema";
import { createCreatorInput, creatorOutput } from "@/orpc/models/creator";
import { auditLog } from "../user/audit";

export const createCreator = adminProcedure
	.input(createCreatorInput)
	.output(ResponseSchema.ApiResponseSchema(creatorOutput))
	.handler(async ({ input, context }) => {
		const { birthDate, ...rest } = input;

		const creator = await prisma.creator.create({
			data: {
				...rest,
				birthDate: birthDate ? new Date(birthDate) : null,
			},
		});

		await auditLog({
			userId: context.user.id,
			action: "CREATE_CREATOR",
			resource: "Creator",
			resourceId: creator.id,
			metadata: input,
		});

		return {
			status: 201,
			message: "Creator created successfully",
			data: {
				id: creator.id,
				name: creator.name,
				bio: creator.bio,
				image: creator.image,
				birthDate: creator.birthDate?.toISOString() ?? null,
			},
		};
	});
