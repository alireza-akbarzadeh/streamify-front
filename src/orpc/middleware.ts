import { os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { SubscriptionStatus } from "@/generated/prisma/enums";
import { auth } from "@/lib/better-auth";
import type { Role, Tier } from "./constants";
import { forbidden, subscriptionRequired, unauthorized } from "./error";
import { userHasPermission } from "./helper";

type SessionType = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export interface AuthContext {
	user: SessionType["user"];
	session: SessionType["session"];
}

/* -------------------------------------------------------------------------- */
/*                              AUTH MIDDLEWARE                               */
/* -------------------------------------------------------------------------- */

export const withAuth = os
	.$context<Partial<AuthContext>>()
	.middleware(async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw unauthorized();
		}

		return next({
			context: {
				user: session.user,
				session: session.session,
			},
		});
	});

/* -------------------------------------------------------------------------- */
/*                        SUBSCRIPTION MIDDLEWARE                             */
/* -------------------------------------------------------------------------- */

export const requireSubscription = (tiers: Tier | Tier[]) =>
	os.$context<AuthContext>().middleware(({ next, context }) => {
		const allowed = Array.isArray(tiers) ? tiers : [tiers];
		const status = context.user.subscriptionStatus as SubscriptionStatus;

		if (!allowed.includes(status as Tier)) {
			throw subscriptionRequired(allowed[0].toLowerCase());
		}

		return next({ context });
	});

/* -------------------------------------------------------------------------- */
/*                               ADMIN MIDDLEWARE                             */
/* -------------------------------------------------------------------------- */

export const requireAdmin = (roles?: Role | Role[]) =>
	os.$context<AuthContext>().middleware(({ next, context }) => {
		const allowed = roles
			? Array.isArray(roles)
				? roles
				: [roles]
			: ["admin"];

		if (!allowed.includes(context.user.role as Role)) {
			throw forbidden("Admin access required");
		}

		return next({ context });
	});

/* -------------------------------------------------------------------------- */
/*                         PERMISSION MIDDLEWARE                              */
/* -------------------------------------------------------------------------- */

export const requirePermission = (resource: string, action: string) =>
	os.$context<AuthContext>().middleware(async ({ next, context }) => {
		const hasPermission = await userHasPermission(
			context.user.id,
			resource,
			action,
		);

		if (!hasPermission) {
			throw forbidden(`Permission denied: ${resource}:${action}`);
		}

		return next({ context });
	});

type RequireOptions = {
	role?: Role | Role[];
	permission?: {
		resource: string;
		action: string;
	};
};

export const withRequire = (options: RequireOptions) =>
	os.$context<Partial<AuthContext>>().middleware(async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw unauthorized();
		}

		const user = session.user;

		/* ---------------------------------------------------------------------- */
		/*                                ROLE CHECK                               */
		/* ---------------------------------------------------------------------- */
		if (options.role) {
			const allowedRoles = Array.isArray(options.role)
				? options.role
				: [options.role];

			if (allowedRoles.includes(user.role as Role)) {
				return next({
					context: { user, session: session.session },
				});
			}
		}

		/* ---------------------------------------------------------------------- */
		/*                             PERMISSION CHECK                            */
		/* ---------------------------------------------------------------------- */
		if (options.permission) {
			const { resource, action } = options.permission;

			const hasPermission = await userHasPermission(user.id, resource, action);

			if (hasPermission) {
				return next({
					context: { user, session: session.session },
				});
			}
		}

		throw forbidden("You don't have permission to perform this action");
	});
