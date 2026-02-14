import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { CategoryVariant } from "@/domains/movies/components/category-nav";
import MovieDiscovery from "@/domains/movies/movies";
import { defaultMediaListQueryOptions } from "@/domains/movies/movies.queries";
import { orpc } from "@/orpc/client";

export const Route = createFileRoute("/(home)/movies/")({
    validateSearch: (search): MovieSearchQuery => ({
        query: typeof search.query === "string" ? search.query : undefined,
        activeCategory :search.activeCategory ||"all",
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

export type MovieSearchQuery = { query?: string , activeCategory?: CategoryVariant  }

function RouteComponent() {
	const search = Route.useSearch();
	const navigate = useNavigate();

    const handleSearchChange =async (next: {
        query?: string;
        activeCategory?: CategoryVariant;
    }) => {
        await  navigate({
            search: prev => ({
                ...prev,
                query: next.query?.trim() || undefined,
                activeCategory: next.activeCategory ?? "all",
            }),
            replace: true,
            resetScroll:false,
        });
    };

	return (
		<MovieDiscovery
			query={search}
			onSearchChange={handleSearchChange}
		/>
	);
}
