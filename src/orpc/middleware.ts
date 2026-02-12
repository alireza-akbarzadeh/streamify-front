// lib/orpc/middleware/auth.ts

import { os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/better-auth";
import { forbidden, subscriptionRequired, unauthorized } from "./error";
import { userHasPermission } from "./helper";

type SessionType = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export interface AuthContext {
	user: SessionType["user"];
	session: SessionType["session"];
}

type BaseContext = { auth?: AuthContext };

export type Role = "ADMIN" | "USER" | "MODERATOR" | "GUEST" | "CUSTOMER";
export type Tier = "FREE" | "PRO" | "PREMIUM" | "CANCELLED";

/* -------------------------------------------------------------------------- */
/*                              Base Auth Loader                              */
/* -------------------------------------------------------------------------- */

export const withAuth = os
	.$context<{ auth?: AuthContext }>()
	.middleware(async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw unauthorized();
		}

		return next({
			context: {
				auth: {
					user: session.user,
					session: session.session,
				},
			},
		});
	});

/* -------------------------------------------------------------------------- */
/*                               Role Middleware                              */
/* -------------------------------------------------------------------------- */

export const requireRole = (roles: Role | Role[]) =>
	os.$context<{ auth: AuthContext }>().middleware(({ next, context }) => {
		const allowed = Array.isArray(roles) ? roles : [roles];
		const userRole = context.auth.user.role as Role;

		if (!allowed.includes(userRole)) {
			throw forbidden("You don't have permission");
		}

		return next({ context });
	});

/* -------------------------------------------------------------------------- */
/*                           Subscription Middleware                          */
/* -------------------------------------------------------------------------- */

export const requireSubscription = (tiers: Tier | Tier[]) =>
	os.$context<{ auth: AuthContext }>().middleware(({ next, context }) => {
		const allowed = Array.isArray(tiers) ? tiers : [tiers];
		const tier = context.auth.user.subscriptionStatus as Tier;

		if (tier === "FREE" || tier === "CANCELLED") {
			throw subscriptionRequired(allowed[0].toLowerCase());
		}

		if (!allowed.includes(tier)) {
			throw subscriptionRequired(allowed[0].toLowerCase());
		}

		return next({ context });
	});

/* -------------------------------------------------------------------------- */
/*                           Permission Middleware                            */
/* -------------------------------------------------------------------------- */

export const requirePermission = (resource: string, action: string) =>
	os.$context<{ auth: AuthContext }>().middleware(async ({ next, context }) => {
		const hasPermission = await userHasPermission(
			context.auth.user.id,
			resource,
			action,
		);

		if (!hasPermission) {
			throw forbidden(`Permission denied: ${resource}:${action}`);
		}

		return next({ context });
	});

/* -------------------------------------------------------------------------- */
/*                           Combined Builder                                 */
/* -------------------------------------------------------------------------- */

export const withRequire = <T extends BaseContext>(options: {
	role?: Role | Role[];
	subscription?: Tier | Tier[];
	permission?: { resource: string; action: string };
}) =>
	os.$context<T>().middleware(async ({ next, context }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw unauthorized();
		}

		const user = session.user;
		const userRole = user.role as Role;
		const userTier = user.subscriptionStatus as Tier;

		/* ------------------------------- Role -------------------------------- */

		if (options.role) {
			const allowed = Array.isArray(options.role)
				? options.role
				: [options.role];

			if (!allowed.includes(userRole)) {
				throw forbidden("You don't have permission");
			}
		}

		/* --------------------------- Subscription ----------------------------- */

		if (options.subscription) {
			const allowed = Array.isArray(options.subscription)
				? options.subscription
				: [options.subscription];

			if (userTier === "FREE" || userTier === "CANCELLED") {
				throw subscriptionRequired(allowed[0].toLowerCase());
			}

			if (!allowed.includes(userTier)) {
				throw subscriptionRequired(allowed[0].toLowerCase());
			}
		}

		/* ----------------------------- Permission ----------------------------- */

		if (options.permission) {
			const { resource, action } = options.permission;

			const hasPermission = await userHasPermission(user.id, resource, action);

			if (!hasPermission) {
				throw forbidden(`Permission denied: ${resource}:${action}`);
			}
		}

		/* ------------------------------ Context -------------------------------- */

		return next({
			context: {
				...context,
				auth: {
					user: session.user,
					session: session.session,
				},
			} as T & { auth: AuthContext },
		});
	});
