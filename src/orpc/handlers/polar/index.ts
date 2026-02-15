import { base } from "../../router/base";
import { getProduct } from "./get-product";
import { listProducts } from "./list-products";
import { listSubscriptions } from "./list-subscriptions";
import { getSubscription } from "./get-subscription";
import { cancelSubscription } from "./cancel-subscription";
import { updateSubscription } from "./update-subscription";
import { getCustomer } from "./get-customer";
import { createCheckout } from "./create-checkout";
import { getWebhookStats, syncSubscriptionStatus } from "./webhook-utils";

export const PolarRouter = base.router({
	// Products
	listProducts,
	getProduct,

	// Subscriptions
	listSubscriptions,
	getSubscription,
	cancelSubscription,
	updateSubscription,

	// Customer
	getCustomer,

	// Checkout
	createCheckout,

	// Webhooks & Utilities
	getWebhookStats,
	syncSubscriptionStatus,
});
