import { os } from "@orpc/server";
import type { AuthContext } from "./middleware";
import { requireAdmin, requireSubscription, withAuth } from "./middleware";

/* -------------------------------------------------------------------------- */
/*                              BASE CONTEXT                                  */
/* -------------------------------------------------------------------------- */

export type ORPCContext = Partial<AuthContext>;

export const publicProcedure = os.$context<ORPCContext>();

/* -------------------------------------------------------------------------- */
/*                            AUTHED PROCEDURE                                */
/* -------------------------------------------------------------------------- */

export const authedProcedure = publicProcedure.use(withAuth);

/* -------------------------------------------------------------------------- */
/*                             ADMIN PROCEDURE                                */
/* -------------------------------------------------------------------------- */

export const adminProcedure = publicProcedure.use(withAuth).use(requireAdmin());

/* -------------------------------------------------------------------------- */
/*                        SUBSCRIBED PROCEDURE                                 */
/* -------------------------------------------------------------------------- */

export const subscribedProcedure = publicProcedure
	.use(withAuth)
	.use(requireSubscription(["PRO"]));

/* -------------------------------------------------------------------------- */
/*                        PREMIUM ONLY PROCEDURE                              */
/* -------------------------------------------------------------------------- */

export const premiumProcedure = publicProcedure
	.use(withAuth)
	.use(requireSubscription("PRO"));
