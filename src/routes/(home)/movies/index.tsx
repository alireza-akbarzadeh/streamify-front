import { createFileRoute, useNavigate } from "@tanstack/react-router";
import MovieDiscovery from "@/domains/movies/movies";
import { defaultMediaListQueryOptions } from "@/domains/movies/movies.queries";
import { orpc } from "@/orpc/client";

export const Route = createFileRoute("/(home)/movies/")({
	validateSearch: (search: Record<string, unknown>) => ({
		search: typeof search.search === "string" ? search.search : undefined,
	}),
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(defaultMediaListQueryOptions),
			context.queryClient.ensureQueryData(
				orpc.content.latestReleases.queryOptions({
					input: { type: "MOVIE", limit: 10 },
				}),
			),
			context.queryClient.ensureQueryData(
				orpc.content.popularSeries.queryOptions({
					input: { limit: 10 },
				}),
			),
			context.queryClient.ensureQueryData(
				orpc.recommendations.trending.queryOptions({
					input: { type: "MOVIE", limit: 10, days: 7 },
				}),
			),
			context.queryClient.ensureQueryData(
				orpc.recommendations.topRated.queryOptions({
					input: { type: "MOVIE", limit: 10 },
				}),
			),
			context.queryClient.ensureQueryData(
				orpc.content.animations.queryOptions({
					input: { limit: 10 },
				}),
			),
		]);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { search } = Route.useSearch();
	const navigate = useNavigate();

	const handleSearchChange = (query: string) => {
		navigate({
			to: "/movies",
			search: { search: query.trim() || undefined },
			replace: true,
		});
	};

	return (
		<MovieDiscovery
			searchQuery={search}
			onSearchChange={handleSearchChange}
		/>
	);
}
