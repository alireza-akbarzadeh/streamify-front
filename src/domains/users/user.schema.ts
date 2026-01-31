import z from "zod";

export const userAccountSchema = z.object({
	// Core Identity
	name: z.string().min(2, "Name is required"),
	email: z.email("Invalid work email"),
	role: z.enum(["Admin", "Moderator", "User"]),
	status: z.enum(["active", "pending", "suspended"]),
	avatar: z.string().optional(),

	// Security
	twoFactorEnabled: z.boolean().default(false),
	phone: z.string().optional(),
	emailVerified: z.string().optional(),
	mfaMethods: z.array(z.string()).default([]),
	failedLoginAttempts: z.number().default(0),
	lockedUntil: z.string().nullable().optional(),

	// Regional
	country: z.string().min(1, "Country is required"),
	timezone: z.string().default("UTC"),
	locale: z.string().default("en-US"),
	address: z.string().optional(),
	city: z.string().optional(),

	// Billing & Plan
	plan: z.enum(["Free", "Standard", "Premium"]).default("Free"),
	billingStatus: z
		.enum(["active", "past_due", "cancelled", "trialing"])
		.default("active"),
	accountBalance: z.number().default(0),
	credits: z.number().min(0).default(0),
	subscriptionEnd: z.string().nullable().optional(),

	// Admin & Org
	organization: z.string().optional(),
	manager: z.string().optional(),
	notes: z.string().max(500, "Notes are too long").optional(),
	tags: z.array(z.string()).default([]),

	// Activity & Usage
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
	joinedDate: z.string().optional(),
	joinedAt: z.string().optional(),
	lastLogin: z.string().optional(),
	lastSeenAt: z.string().optional(),
	sessionsActive: z.number().default(0),
	profileComplete: z.number().default(0),

	// Media & Storage
	streamingHours: z.number().default(0),
	playlistsCount: z.number().default(0),
	storageUsedMB: z.number().default(0),
	usage: z.number().default(0),

	// Devices
	devices: z.array(z.string()).default([]),
});

export type UserAccount = z.infer<typeof userAccountSchema>;
