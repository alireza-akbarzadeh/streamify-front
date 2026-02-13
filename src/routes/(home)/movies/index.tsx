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

	// Test new APIs - Trending movies
	const { data: trendingData } = useSuspenseQuery(
		orpc.recommendations.trending.queryOptions({
			input: {
				type: "MOVIE",
				limit: 10,
				days: 7,
			},
		}),
	);

	// Test new APIs - Top rated movies
	const { data: topRatedData } = useSuspenseQuery(
		orpc.recommendations.topRated.queryOptions({
			input: {
				type: "MOVIE",
				limit: 10,
			},
		}),
	);

	console.log("Movies loaded:", data.data.items.length);
	console.log("Trending movies:", trendingData.data.items.length);
	console.log("Top rated movies:", topRatedData.data.items.length);

	return <MovieDiscovery />;
}
