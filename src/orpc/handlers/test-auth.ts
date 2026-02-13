import { z } from "zod";
import { ApiResponseSchema } from "@/orpc/helpers/response-schema";
import { withAuth, withRequire } from "@/orpc/middleware/middleware";
import { base } from "../router/base";

/**
 * Public endpoint - anyone can access
 */
export const publicEndpoint = base
	.input(z.void())
	.output(ApiResponseSchema(z.object({ message: z.string() })))
	.handler(async () => {
		return {
			status: 200,
			message: "Success",
			data: { message: "This is a public endpoint" },
		};
	});

/**
 * Protected endpoint - requires authentication
 */
export const protectedEndpoint = base
	.use(withAuth)
	.input(z.void())
	.output(
		ApiResponseSchema(
			z.object({
				message: z.string(),
				userId: z.string(),
			}),
		),
	)
	.handler(async ({ context }) => {
		return {
			status: 200,
			message: "Success",
			data: {
				message: "You are authenticated!",
				userId: context.user.id,
			},
		};
	});

/**
 * Admin-only endpoint - requires admin role
 */
export const adminOnlyEndpoint = base
	.use(
		withRequire({
			role: "ADMIN",
		}),
	)
	.input(z.void())
	.output(ApiResponseSchema(z.object({ message: z.string() })))
	.handler(async ({ context }) => {
		return {
			status: 200,
			message: "Success",
			data: {
				message: `Welcome admin ${context.user.name}!`,
			},
		};
	});

/**
 * Permission-based endpoint
 */
export const permissionEndpoint = base
	.use(
		withRequire({
			permission: { resource: "media", action: "create" },
		}),
	)
	.input(z.void())
	.output(ApiResponseSchema(z.object({ message: z.string() })))
	.handler(async () => {
		return {
			status: 200,
			message: "Success",
			data: {
				message: "You have the required permission!",
			},
		};
	});

export const TestAuthRouter = base.router({
	public: publicEndpoint,
	protected: protectedEndpoint,
	admin: adminOnlyEndpoint,
	permission: permissionEndpoint,
});
