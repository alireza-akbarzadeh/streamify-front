import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/dashboard/settings/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(admin)/setting/"!</div>;
}
