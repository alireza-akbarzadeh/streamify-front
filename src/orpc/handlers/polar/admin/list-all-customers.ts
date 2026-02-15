import { z } from "zod";
import { polarClient } from "@/integrations/polar/polar-client";
import { adminProcedure } from "@/orpc/context";

const AdminListCustomersInputSchema = z.object({
	limit: z.number().min(1).max(100).default(20),
	page: z.number().min(1).default(1),
});

/**
 * List all customers (admin only)
 */
export const listAllCustomers = adminProcedure
	.input(AdminListCustomersInputSchema)
	.output(
		z.object({
			customers: z.array(
				z.object({
					id: z.string(),
					email: z.string(),
					name: z.string().nullable(),
					createdAt: z.string(),
				}),
			),
			total: z.number(),
			page: z.number(),
			limit: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		try {
			const response = await polarClient.customers.list({
				limit: input.limit,
				page: input.page,
			});

			const customers = response.result.items.map((customer) => ({
				id: customer.id,
				email: customer.email,
				name: customer.name,
				createdAt:
					customer.createdAt instanceof Date
						? customer.createdAt.toISOString()
						: customer.createdAt,
			}));

			return {
				customers,
				total: response.result.pagination.totalCount || 0,
				page: input.page,
				limit: input.limit,
			};
		} catch (error) {
			console.error("Error fetching all customers:", error);
			throw new Error("Failed to fetch customers");
		}
	});
