import { createFileRoute } from "@tanstack/react-router";
import RoleManagementPage from "@/domains/users/containers/role-management-page.tsx";

export const Route = createFileRoute("/(admin)/dashboard/roles/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RoleManagementPage />;
}
