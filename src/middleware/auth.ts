import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/better-auth";
import { prisma } from "@/lib/db";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw redirect({ to: "/login" });
	}

	return await next();
});

export const adminMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		// Check if user has admin role (from the role field)
		if (session.user.role !== "admin") {
			throw redirect({
				to: "/unauthorized",
				search: {
					error: "unauthorized",
					from: request.url,
					requiredRole: "admin",
				},
			});
		}

		return await next();
	},
);

type SubscriptionLevel = "PRO" | "PREMIUM";

export const requireSubscription = (requiredLevel: SubscriptionLevel = "PRO") =>
	createMiddleware().server(async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		const { subscriptionStatus } = session.user;

		// Check subscription status
		if (subscriptionStatus === "CANCELLED" || subscriptionStatus === "FREE") {
			throw redirect({
				to: "/pricing",
				search: { required: requiredLevel.toLowerCase() },
			});
		}

		// If required PREMIUM but user has PRO
		if (requiredLevel === "PREMIUM" && subscriptionStatus !== "PREMIUM") {
			throw redirect({
				to: "/pricing",
				search: { required: "premium", upgrade: true },
			});
		}

		return await next();
	});

export const verifiedEmailMiddleware = createMiddleware().server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		if (!session.user.emailVerified) {
			throw redirect({
				to: "/verify-email",
				search: { email: session.user.email },
			});
		}

		return await next();
	},
);

export const requirePermission = (resource: string, action: string) =>
	createMiddleware().server(async ({ next, request }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		// Check if user has direct permission
		const userPermission = await prisma.userPermission.findFirst({
			where: {
				userId: session.user.id,
				permission: {
					resource,
					action,
				},
				OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
			},
		});

		if (userPermission) {
			return await next();
		}

		// Check if user's roles have this permission
		const rolePermission = await prisma.rolePermission.findFirst({
			where: {
				role: {
					users: {
						some: { userId: session.user.id },
					},
				},
				permission: {
					resource,
					action,
				},
			},
		});

		if (!rolePermission) {
			throw redirect({
				to: "/",
				search: { error: "forbidden" },
			});
		}

		return await next();
	});

export const proMiddleware = requireSubscription("PRO");
export const premiumMiddleware = requireSubscription("PREMIUM");

interface RequireOptions {
	verified?: boolean;
	role?: "user" | "admin";
	subscription?: "PRO" | "PREMIUM";
}

export const require = (options: RequireOptions = {}) =>
	createMiddleware().server(async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		// 1. Auth check
		if (!session) {
			throw redirect({ to: "/login" });
		}

		// 2. Verified email check
		if (options.verified && !session.user.emailVerified) {
			throw redirect({
				to: "/verify-email",
				search: { email: session.user.email },
			});
		}

		// 3. Role check
		if (options.role && session.user.role !== options.role) {
			throw redirect({ to: "/" });
		}

		// 4. Subscription check
		if (options.subscription) {
			const { subscriptionStatus } = session.user;

			if (subscriptionStatus === "CANCELLED" || subscriptionStatus === "FREE") {
				throw redirect({
					to: "/pricing",
					search: { required: options.subscription.toLowerCase() },
				});
			}

			if (
				options.subscription === "PREMIUM" &&
				subscriptionStatus !== "PREMIUM"
			) {
				throw redirect({
					to: "/pricing",
					search: { required: "premium", upgrade: true },
				});
			}
		}

		return await next();
	});
