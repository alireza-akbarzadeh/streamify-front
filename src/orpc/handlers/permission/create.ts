import { prisma } from "@/lib/db";
import { adminProcedure } from "@/orpc/context";
import * as ResponseSchema from "@/orpc/helpers/response-schema";
import {
	createPermissionInput,
	permissionOutput,
} from "@/orpc/models/permission";
import { auditLog } from "../user/audit";

export const createPermission = adminProcedure
	.input(createPermissionInput)
	.output(ResponseSchema.ApiResponseSchema(permissionOutput))
	.handler(async ({ input, context, errors }) => {
		// Check if permission already exists (unique resource + action)
		const existing = await prisma.permission.findUnique({
			where: {
				resource_action: {
					resource: input.resource,
					action: input.action,
				},
			},
		});

		if (existing) {
			throw errors.CONFLICT({
				message: "Permission already exists for this resource and action",
				data: { field: "resource_action" },
			});
		}

		const permission = await prisma.permission.create({
			data: input,
		});

		await auditLog({
			userId: context.user.id,
			action: "CREATE_PERMISSION",
			resource: "Permission",
			resourceId: permission.id,
			metadata: input,
		});

		return {
			status: 201,
			message: "Permission created successfully",
			data: {
				id: permission.id,
				name: permission.name,
				description: permission.description,
				resource: permission.resource,
				action: permission.action,
				createdAt: permission.createdAt.toISOString(),
				updatedAt: permission.updatedAt.toISOString(),
			},
		};
	});
