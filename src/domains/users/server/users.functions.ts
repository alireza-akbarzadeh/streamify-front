// server/users.mock.ts
export type UserStatus =
	| "active"
	| "flagged"
	| "suspended"
	| "pending"
	| "deactivated";

export interface DeviceInfo {
	id: string;
	type: "Desktop" | "Mobile" | "Tablet" | "Unknown";
	lastSeen?: string; // ISO timestamp or human string
	ip?: string;
}

export interface UserAccount {
	id: string;
	name: string;
	email: string;
	avatar: string;
	role: "Admin" | "Moderator" | "User";
	status: UserStatus;
	plan: "Free" | "Standard" | "Premium";
	joinedDate: string; // ISO
	createdAt?: string;
	updatedAt?: string;

	// Contact & verification
	phone?: string;
	phoneVerified?: boolean;
	emailVerified?: boolean;

	// Security
	twoFactorEnabled?: boolean;
	mfaMethods?: string[]; // e.g. ['sms','authenticator']
	failedLoginAttempts?: number;
	lockedUntil?: string | null; // ISO or null
	lastPasswordChange?: string;

	// Activity & sessions
	lastLogin?: string;
	lastSeenAt?: string;
	sessionsActive?: number;
	devices?: DeviceInfo[];

	// Profile & address
	address?: string;
	city?: string;
	country?: string;
	locale?: string;
	timezone?: string;

	// Usage & metrics
	usage?: number; // percent or generic metric
	storageUsedMB?: number;
	streamingHours?: number;
	playlistsCount?: number;

	// Billing/subscription
	billingStatus?: "active" | "past_due" | "cancelled" | "trialing";
	subscriptionEnd?: string | null;
	accountBalance?: number;
	credits?: number;

	// Admin metadata
	profileComplete?: number; // 0-100
	tags?: string[];
	notes?: string;
	organization?: string;
	manager?: string;
	joinedAt?: string;
}

export const mockUsers: UserAccount[] = [
	{
		id: "USR-001",
		name: "Alex Rivera",
		email: "alex@rivera.com",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
		role: "Admin",
		status: "active",
		plan: "Premium",
		joinedDate: "2024-01-15T10:00:00Z",
		createdAt: "2024-01-15T10:00:00Z",
		updatedAt: "2026-01-20T09:12:00Z",
		phone: "+1-555-1001",
		phoneVerified: true,
		emailVerified: true,
		twoFactorEnabled: true,
		mfaMethods: ["authenticator"],
		failedLoginAttempts: 0,
		lastPasswordChange: "2025-12-01T08:00:00Z",
		lastLogin: "2026-01-29T18:22:00Z",
		lastSeenAt: "2026-01-29T18:22:00Z",
		sessionsActive: 2,
		devices: [
			{
				id: "dev-101",
				type: "Desktop",
				lastSeen: "2026-01-29T18:22:00Z",
				ip: "203.0.113.5",
			},
			{
				id: "dev-102",
				type: "Mobile",
				lastSeen: "2026-01-28T09:10:00Z",
				ip: "198.51.100.12",
			},
		],
		address: "120 Market St",
		city: "San Francisco",
		country: "USA",
		locale: "en-US",
		timezone: "America/Los_Angeles",
		usage: 85,
		storageUsedMB: 2048,
		streamingHours: 340,
		playlistsCount: 24,
		billingStatus: "active",
		subscriptionEnd: "2026-01-15T00:00:00Z",
		accountBalance: 0,
		credits: 50,
		profileComplete: 92,
		tags: ["team-internal", "vip"],
		notes: "Key admin — contact for escalations",
		organization: "Vibe Inc",
		manager: "CEO",
		joinedAt: "2024-01-15T10:00:00Z",
	},
	{
		id: "USR-002",
		name: "Jordan Smith",
		email: "j.smith@workspace.com",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
		role: "User",
		status: "pending",
		plan: "Free",
		joinedDate: "2024-01-20T14:30:00Z",
		createdAt: "2024-01-20T14:30:00Z",
		updatedAt: "2026-01-15T11:05:00Z",
		phone: "+1-555-1002",
		phoneVerified: false,
		emailVerified: false,
		twoFactorEnabled: false,
		mfaMethods: [],
		failedLoginAttempts: 3,
		lockedUntil: null,
		lastPasswordChange: "2024-01-20T14:30:00Z",
		lastLogin: "2026-01-14T07:40:00Z",
		lastSeenAt: "2026-01-14T07:40:00Z",
		sessionsActive: 0,
		devices: [
			{
				id: "dev-201",
				type: "Mobile",
				lastSeen: "2026-01-14T07:40:00Z",
				ip: "198.51.100.45",
			},
		],
		city: "Austin",
		country: "USA",
		locale: "en-US",
		timezone: "America/Chicago",
		usage: 12,
		storageUsedMB: 120,
		streamingHours: 5,
		playlistsCount: 1,
		billingStatus: "trialing",
		subscriptionEnd: null,
		accountBalance: 0,
		credits: 0,
		profileComplete: 40,
		tags: ["onboarding"],
		notes: "Email confirmation pending",
		joinedAt: "2024-01-20T14:30:00Z",
	},
	{
		id: "USR-003",
		name: "Priya Desai",
		email: "priya@vibe.com",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
		role: "Moderator",
		status: "active",
		plan: "Standard",
		joinedDate: "2023-11-02T09:20:00Z",
		createdAt: "2023-11-02T09:20:00Z",
		updatedAt: "2026-01-10T12:00:00Z",
		phone: "+44-20-7000-3003",
		phoneVerified: true,
		emailVerified: true,
		twoFactorEnabled: true,
		mfaMethods: ["sms", "authenticator"],
		failedLoginAttempts: 1,
		lastPasswordChange: "2025-08-10T06:00:00Z",
		lastLogin: "2026-01-28T21:00:00Z",
		lastSeenAt: "2026-01-28T21:00:00Z",
		sessionsActive: 1,
		devices: [
			{
				id: "dev-301",
				type: "Desktop",
				lastSeen: "2026-01-28T21:00:00Z",
				ip: "203.0.113.22",
			},
		],
		city: "London",
		country: "UK",
		locale: "en-GB",
		timezone: "Europe/London",
		usage: 62,
		storageUsedMB: 850,
		streamingHours: 120,
		playlistsCount: 8,
		billingStatus: "active",
		subscriptionEnd: "2026-11-02T00:00:00Z",
		accountBalance: 10.5,
		credits: 0,
		profileComplete: 78,
		tags: ["moderation"],
		notes: "Moderator for EMEA region",
		joinedAt: "2023-11-02T09:20:00Z",
	},
	{
		id: "USR-004",
		name: "Liu Wei",
		email: "liu.wei@vibe.com",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liu",
		role: "User",
		status: "suspended",
		plan: "Premium",
		joinedDate: "2022-09-11T08:45:00Z",
		createdAt: "2022-09-11T08:45:00Z",
		updatedAt: "2026-01-05T10:30:00Z",
		phone: "+86-10-5555-0123",
		phoneVerified: true,
		emailVerified: true,
		twoFactorEnabled: false,
		failedLoginAttempts: 12,
		lockedUntil: "2026-02-15T00:00:00Z",
		lastPasswordChange: "2025-01-01T00:00:00Z",
		lastLogin: "2026-01-04T16:00:00Z",
		lastSeenAt: "2026-01-04T16:00:00Z",
		sessionsActive: 0,
		devices: [],
		city: "Beijing",
		country: "CN",
		locale: "zh-CN",
		timezone: "Asia/Shanghai",
		usage: 2,
		storageUsedMB: 50,
		streamingHours: 2,
		playlistsCount: 0,
		billingStatus: "past_due",
		subscriptionEnd: "2025-09-11T00:00:00Z",
		accountBalance: 120.0,
		credits: 0,
		profileComplete: 20,
		tags: ["risk-high"],
		notes: "Suspended after fraud detection — under review",
		joinedAt: "2022-09-11T08:45:00Z",
	},
	{
		id: "USR-005",
		name: "Amelie Dupont",
		email: "amelie@vibe.fr",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amelie",
		role: "User",
		status: "active",
		plan: "Standard",
		joinedDate: "2023-05-21T07:30:00Z",
		createdAt: "2023-05-21T07:30:00Z",
		updatedAt: "2026-01-18T08:40:00Z",
		phone: "+33-1-2345-6789",
		phoneVerified: true,
		emailVerified: true,
		twoFactorEnabled: false,
		mfaMethods: [],
		failedLoginAttempts: 0,
		lastPasswordChange: "2024-11-11T10:00:00Z",
		lastLogin: "2026-01-20T13:00:00Z",
		lastSeenAt: "2026-01-20T13:00:00Z",
		sessionsActive: 1,
		devices: [
			{
				id: "dev-501",
				type: "Mobile",
				lastSeen: "2026-01-20T13:00:00Z",
				ip: "203.0.113.88",
			},
		],
		city: "Paris",
		country: "FR",
		locale: "fr-FR",
		timezone: "Europe/Paris",
		usage: 45,
		storageUsedMB: 640,
		streamingHours: 85,
		playlistsCount: 6,
		billingStatus: "active",
		subscriptionEnd: "2026-05-21T00:00:00Z",
		accountBalance: 0,
		credits: 5,
		profileComplete: 67,
		tags: ["premium-candidate"],
		notes: "Interested in family plan",
		joinedAt: "2023-05-21T07:30:00Z",
	},
	{
		id: "USR-006",
		name: "Oluwaseun Adebayo",
		email: "seun@vibe.ng",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Seun",
		role: "User",
		status: "active",
		plan: "Free",
		joinedDate: "2025-03-03T12:00:00Z",
		createdAt: "2025-03-03T12:00:00Z",
		updatedAt: "2026-01-25T15:00:00Z",
		phone: "+234-700-000-0000",
		phoneVerified: false,
		emailVerified: true,
		twoFactorEnabled: false,
		failedLoginAttempts: 0,
		lastLogin: "2026-01-25T14:58:00Z",
		lastSeenAt: "2026-01-25T14:58:00Z",
		sessionsActive: 1,
		devices: [
			{
				id: "dev-601",
				type: "Mobile",
				lastSeen: "2026-01-25T14:58:00Z",
				ip: "102.22.33.44",
			},
		],
		city: "Lagos",
		country: "NG",
		locale: "en-NG",
		timezone: "Africa/Lagos",
		usage: 18,
		storageUsedMB: 75,
		streamingHours: 12,
		playlistsCount: 2,
		billingStatus: "active",
		subscriptionEnd: null,
		accountBalance: 0,
		credits: 0,
		profileComplete: 50,
		tags: [],
		notes: "Registered via social sign-in",
		joinedAt: "2025-03-03T12:00:00Z",
	},
	{
		id: "USR-007",
		name: "Sofia Martinez",
		email: "sofia@vibe.es",
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
		role: "User",
		status: "flagged",
		plan: "Standard",
		joinedDate: "2021-12-01T09:00:00Z",
		createdAt: "2021-12-01T09:00:00Z",
		updatedAt: "2026-01-12T09:00:00Z",
		phone: "+34-600-123-456",
		phoneVerified: true,
		emailVerified: true,
		twoFactorEnabled: true,
		mfaMethods: ["sms"],
		failedLoginAttempts: 5,
		lastPasswordChange: "2024-06-01T08:00:00Z",
		lastLogin: "2026-01-11T10:00:00Z",
		lastSeenAt: "2026-01-11T10:00:00Z",
		sessionsActive: 0,
		devices: [
			{
				id: "dev-701",
				type: "Desktop",
				lastSeen: "2026-01-11T10:00:00Z",
				ip: "198.51.100.99",
			},
		],
		city: "Barcelona",
		country: "ES",
		locale: "es-ES",
		timezone: "Europe/Madrid",
		usage: 30,
		storageUsedMB: 420,
		streamingHours: 200,
		playlistsCount: 12,
		billingStatus: "active",
		subscriptionEnd: "2026-12-01T00:00:00Z",
		accountBalance: 0,
		credits: 15,
		profileComplete: 80,
		tags: ["reviewed"],
		notes: "Flagged for content moderation — waiting results",
		joinedAt: "2021-12-01T09:00:00Z",
	},
];

// server/users.functions.ts
export async function getUsers(): Promise<UserAccount[]> {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 800));
	return mockUsers;
}
