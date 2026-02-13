import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import MovieDiscovery from "@/domains/movies/movies";
import { orpc } from "@/orpc/client";

export const Route = createFileRoute("/(home)/movies/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			orpc.media.list.queryOptions({
				input: {
					status: ["PUBLISHED"],
				},
			}),
		);
	},
});

function RouteComponent() {
	const { data } = useSuspenseQuery(
		orpc.media.list.queryOptions({
			input: {
				status: ["PUBLISHED"],
			},
		}),
	);


	console.log("Movies loaded:", data.data.items.length);

	return <MovieDiscovery />;
}
