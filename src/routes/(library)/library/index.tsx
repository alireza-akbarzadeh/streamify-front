import { createFileRoute } from "@tanstack/react-router";
import { LibraryDomains } from "@/domains/library/library.domain.tsx";

export const Route = createFileRoute("/(library)/library/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LibraryDomains />;
}
