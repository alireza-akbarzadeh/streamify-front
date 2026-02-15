import { base } from "../../../router/base";
import { createProduct } from "./create-product";
import { updateProduct } from "./update-product";
import { archiveProduct } from "./archive-product";
import { listAllSubscriptions } from "./list-all-subscriptions";
import { listAllCustomers } from "./list-all-customers";

export const PolarAdminRouter = base.router({
	// Product Management
	createProduct,
	updateProduct,
	archiveProduct,

	// Admin Views
	listAllSubscriptions,
	listAllCustomers,
});
