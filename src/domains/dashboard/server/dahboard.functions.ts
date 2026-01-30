// domains/dashboard/server/dashboard.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { dashboard_SIDEBAR } from "@/config/admin-sidebar";

export const getSidebarData = createServerFn({ method: "GET" })
	.inputValidator((role: string) => role)
	.handler(async ({ data: role }) => {
		const filteredSidebar = dashboard_SIDEBAR
			.map((group) => ({
				...group,
				items: group.items.filter((item) => {
					if (!item.permission) return true;

					return role === "admin" || item.permission === role;
				}),
			}))
			.filter((group) => group.items.length > 0);

		return filteredSidebar;
	});
