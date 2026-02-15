import { z } from "zod";

// Product Schemas
export const PolarProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	isRecurring: z.boolean(),
	isArchived: z.boolean(),
	organizationId: z.string(),
	prices: z.array(
		z.object({
			id: z.string(),
			createdAt: z.string(),
			amountType: z.enum(["fixed", "custom"]),
			isArchived: z.boolean(),
			productId: z.string(),
			priceCurrency: z.string(),
			priceAmount: z.number(),
			recurringInterval: z.enum(["day", "week", "month", "year"]).nullable(),
		}),
	),
});

export const ProductResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	priceAmount: z.number(),
	priceCurrency: z.string(),
	recurringInterval: z.enum(["day", "week", "month", "year"]).nullable(),
	isRecurring: z.boolean(),
});

// Subscription Schemas
export const SubscriptionStatusSchema = z.enum([
	"incomplete",
	"incomplete_expired",
	"trialing",
	"active",
	"past_due",
	"canceled",
	"unpaid",
]);

export const PolarSubscriptionSchema = z.object({
	id: z.string(),
	status: SubscriptionStatusSchema,
	currentPeriodStart: z.string(),
	currentPeriodEnd: z.string().nullable(),
	cancelAtPeriodEnd: z.boolean(),
	startedAt: z.string().nullable(),
	endedAt: z.string().nullable(),
	customerId: z.string(),
	productId: z.string(),
	priceId: z.string(),
	userId: z.string(),
	product: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	price: z
		.object({
			id: z.string(),
			priceAmount: z.number(),
			priceCurrency: z.string(),
			recurringInterval: z.enum(["day", "week", "month", "year"]).nullable(),
		})
		.nullable(),
});

export const SubscriptionResponseSchema = z.object({
	id: z.string(),
	status: z.string(),
	productName: z.string(),
	amount: z.number(),
	currency: z.string(),
	interval: z.string().nullable(),
	currentPeriodStart: z.string(),
	currentPeriodEnd: z.string().nullable(),
	cancelAtPeriodEnd: z.boolean(),
});

// Customer Schemas
export const PolarCustomerSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().nullable(),
	billingAddress: z
		.object({
			line1: z.string().nullable(),
			line2: z.string().nullable(),
			city: z.string().nullable(),
			state: z.string().nullable(),
			postalCode: z.string().nullable(),
			country: z.string(),
		})
		.nullable(),
	taxId: z.string().nullable(),
	organizationId: z.string(),
});

export const CustomerResponseSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	subscriptionCount: z.number(),
	totalSpent: z.number(),
});

// Checkout Schemas
export const CheckoutCreateInputSchema = z.object({
	productPriceId: z.string(),
	successUrl: z.string().optional(),
	customerEmail: z.string().email().optional(),
});

export const CheckoutResponseSchema = z.object({
	id: z.string(),
	url: z.string(),
	customerId: z.string().nullable(),
	productId: z.string().nullable(),
	productPriceId: z.string().nullable(),
	amount: z.number().nullable(),
	currency: z.string().nullable(),
	status: z.string(),
});

// Webhook Schemas
export const WebhookEventSchema = z.object({
	type: z.string(),
	data: z.unknown(),
});

// Query Schemas
export const ListQuerySchema = z.object({
	limit: z.number().min(1).max(100).default(20),
	page: z.number().min(1).default(1),
});

export const SubscriptionListQuerySchema = ListQuerySchema.extend({
	status: SubscriptionStatusSchema.optional(),
	productId: z.string().optional(),
});

// Input Schemas
export const CancelSubscriptionInputSchema = z.object({
	subscriptionId: z.string(),
	immediatelys: z.boolean().default(false),
});

export const UpdateSubscriptionInputSchema = z.object({
	subscriptionId: z.string(),
	productPriceId: z.string().optional(),
	cancelAtPeriodEnd: z.boolean().optional(),
});

// Types
export type PolarProduct = z.infer<typeof PolarProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type PolarSubscription = z.infer<typeof PolarSubscriptionSchema>;
export type SubscriptionResponse = z.infer<typeof SubscriptionResponseSchema>;
export type PolarCustomer = z.infer<typeof PolarCustomerSchema>;
export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;
export type CheckoutCreateInput = z.infer<typeof CheckoutCreateInputSchema>;
export type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;
export type ListQuery = z.infer<typeof ListQuerySchema>;
export type SubscriptionListQuery = z.infer<typeof SubscriptionListQuerySchema>;
export type CancelSubscriptionInput = z.infer<
	typeof CancelSubscriptionInputSchema
>;
export type UpdateSubscriptionInput = z.infer<
	typeof UpdateSubscriptionInputSchema
>;
