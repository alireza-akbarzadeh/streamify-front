import {
	Activity,
	AlertTriangle,
	BarChart3,
	Bell,
	CreditCard,
	FileText,
	Film,
	FolderArchive,
	Headphones,
	LayoutDashboard,
	Music,
	Server,
	Settings,
	Shield,
	Sparkles,
	Users,
} from "lucide-react";

export type SidebarItem = {
	label: string;
	href?: string;
	icon?: string;
	children?: SidebarItem[];
	permission?: string; // RBAC hook
};

export type SidebarGroup = {
	group: string;
	items: SidebarItem[];
};

export const dashboard_SIDEBAR: SidebarGroup[] = [
	{
		group: "Overview",
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
				icon: "LayoutDashboard",
			},
		],
	},

	{
		group: "Users & Access",
		items: [
			{
				label: "Users",
				href: "/dashboard/users",
				icon: "Users",
			},
			{
				label: "Roles & Permissions",
				href: "/dashboard/roles",
				icon: "Shield",
			},
			{
				label: "Audit Logs",
				href: "/dashboard/audit-logs",
				icon: "Activity",
			},
		],
	},

	{
		group: "Movies",
		items: [
			{
				label: "Movies & Series",
				href: "/dashboard/movies",
				icon: "Film",
			},
		],
	},

	{
		group: "Music",
		items: [
			{
				label: "Artists",
				href: "/dashboard/music/artists",
				icon: "Music",
			},
			{
				label: "Albums",
				href: "/dashboard/music/albums",
			},
			{
				label: "Tracks",
				href: "/dashboard/music/tracks",
			},
		],
	},

	{
		group: "Media",
		items: [
			{
				label: "Media Library",
				href: "/dashboard/media",
				icon: "FolderArchive",
			},
			{
				label: "Uploads",
				href: "/dashboard/media/uploads",
			},
		],
	},

	{
		group: "Streaming",
		items: [
			{
				label: "Active Streams",
				href: "/dashboard/streams",
				icon: "Activity",
			},
			{
				label: "Playback Errors",
				href: "/dashboard/playback/errors",
			},
			{
				label: "DRM & Licenses",
				href: "/dashboard/drm",
			},
		],
	},

	{
		group: "Monetization",
		items: [
			{
				label: "Subscription Plans",
				href: "/dashboard/subscriptions/plans",
				icon: "CreditCard",
			},
			{
				label: "User Subscriptions",
				href: "/dashboard/subscriptions/users",
			},
			{
				label: "Payments",
				href: "/dashboard/payments",
			},
		],
	},

	{
		group: "Analytics",
		items: [
			{
				label: "Overview",
				href: "/dashboard/analytics",
				icon: "BarChart3",
			},
			{
				label: "Content Performance",
				href: "/dashboard/analytics/content",
			},
			{
				label: "User Behavior",
				href: "/dashboard/analytics/users",
			},
			{
				label: "Reports",
				href: "/dashboard/reports",
			},
		],
	},

	{
		group: "Discovery",
		items: [
			{
				label: "Recommendations",
				href: "/dashboard/recommendations",
				icon: "Sparkles",
			},
			{
				label: "Featured Content",
				href: "/dashboard/featured",
			},
			{
				label: "A/B Testing",
				href: "/dashboard/ab-tests",
			},
		],
	},

	{
		group: "Moderation",
		items: [
			{
				label: "User Reports",
				href: "/dashboard/moderation/reports",
				icon: "AlertTriangle",
			},
			{
				label: "DMCA & Copyright",
				href: "/dashboard/moderation/dmca",
			},
			{
				label: "Region Restrictions",
				href: "/dashboard/moderation/region-blocks",
			},
		],
	},

	{
		group: "Communication",
		items: [
			{
				label: "Notifications",
				href: "/dashboard/notifications",
				icon: "Bell",
			},
			{
				label: "Campaigns",
				href: "/dashboard/campaigns",
			},
		],
	},

	{
		group: "Support",
		items: [
			{
				label: "Support Tickets",
				href: "/dashboard/support",
				icon: "Headphones",
			},
		],
	},

	{
		group: "Settings",
		items: [
			{
				label: "General",
				href: "/dashboard/settings/general",
				icon: "Settings",
			},
			{
				label: "Localization",
				href: "/dashboard/settings/localization",
			},
			{
				label: "Feature Flags",
				href: "/dashboard/settings/features",
			},
			{
				label: "Integrations",
				href: "/dashboard/settings/integrations",
			},
		],
	},

	{
		group: "Infrastructure",
		items: [
			{
				label: "Logs",
				href: "/dashboard/logs",
				icon: "Server",
			},
			{
				label: "Monitoring",
				href: "/dashboard/monitoring",
			},
			{
				label: "Backups",
				href: "/dashboard/backups",
			},
		],
	},

	{
		group: "Legal",
		items: [
			{
				label: "Terms of Service",
				href: "/dashboard/legal/terms",
				icon: "FileText",
			},
			{
				label: "Privacy Policy",
				href: "/dashboard/legal/privacy",
			},
			{
				label: "Licenses",
				href: "/dashboard/legal/licenses",
			},
		],
	},
];

export const userPermissions = ["users:read", "movies:read", "analytics:read"];

function filterSidebarByPermission(
	sidebar: typeof dashboard_SIDEBAR,
	permissions: string[],
) {
	return sidebar
		.map((group) => ({
			...group,
			items: group.items.filter(
				(item) => !item.permission || permissions.includes(item.permission),
			),
		}))
		.filter((group) => group.items.length > 0);
}

export const ICON_MAP = {
	Activity,
	AlertTriangle,
	BarChart3,
	Bell,
	CreditCard,
	FileText,
	Film,
	FolderArchive,
	Headphones,
	LayoutDashboard,
	Music,
	Server,
	Settings,
	Shield,
	Sparkles,
	Users,
} as const;
