import { motion, useScroll, useTransform } from "framer-motion";
import {
	Clock,
	Film,
	Heart,
	type LucideIcon,
	Search,
	Sparkles,
	TrendingUp,
	Tv,
} from "lucide-react";
import { useRef, useState } from "react";
import {
	CategoryNav,
	HeroBanner,
	MovieCarousel,
	SearchHeader,
} from "./components";
import { MovieCard } from "./components/movie-card";
import { mediaListQueryOptions } from "./movies.queries";
import type { MediaList } from "@/orpc/models/media.schema";
import { orpc } from "@/orpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export type Categories =
	| "all"
	| "series"
	| "trending"
	| "recent"
	| "favorites"
	| "movies"
	| "animation"
	| "comedy"
	| "romantic";

export type CategoriesType = {
	id: Categories;
	label: string;
	icon: LucideIcon;
};

/** Min height for search results area to avoid layout shift and support LCP */
const SEARCH_RESULTS_MIN_HEIGHT = 420;

function SearchResultsSkeleton() {
	return (
		<div
			className="relative z-10 max-w-450 mx-auto px-6 py-8"
			style={{ minHeight: SEARCH_RESULTS_MIN_HEIGHT }}
			aria-busy="true"
			aria-label="Loading search results"
		>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						className="rounded-2xl overflow-hidden bg-white/5 animate-pulse"
						style={{ aspectRatio: "280/420" }}
					/>
				))}
			</div>
		</div>
	);
}

function SearchResultsEmpty({ query }: { query: string }) {
	return (
		<div
			className="relative z-10 max-w-450 mx-auto px-6 py-12 flex flex-col items-center justify-center text-center"
			style={{ minHeight: SEARCH_RESULTS_MIN_HEIGHT }}
		>
			<Search className="w-16 h-16 text-gray-500 mb-4" />
			<h2 className="text-xl font-semibold text-white mb-2">No results found</h2>
			<p className="text-gray-400 max-w-sm">
				We couldn't find anything for "{query}". Try a different search term.
			</p>
		</div>
	);
}

function SearchResultsList({ movies }: { movies: MediaList[] }) {
	return (
		<div
			className="relative z-10 max-w-450 mx-auto px-6 py-8"
			style={{ minHeight: SEARCH_RESULTS_MIN_HEIGHT }}
		>
			<h2 className="text-2xl font-bold text-white mb-6">Search results</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{movies.map((movie, index) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						index={index}
						showProgress={false}
						variant="standard"
					/>
				))}
			</div>
		</div>
	);
}

export interface MovieDiscoveryProps {
	/** Search query from URL (sync with route search params) */
	searchQuery?: string;
	/** Called when user changes search; parent should navigate to update URL */
	onSearchChange?: (query: string) => void;
}

export default function MovieDiscovery({
	searchQuery: searchQueryProp,
	onSearchChange,
}: MovieDiscoveryProps = {}) {
	const [activeCategory, setActiveCategory] = useState<Categories>("all");
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll();

	const searchQuery = searchQueryProp ?? "";
	const setSearchQuery = onSearchChange ?? (() => {});

	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

	// Search results (client-only when search is present; no suspense to allow skeleton)
	const searchQueryOptions = mediaListQueryOptions({
		search: searchQuery || undefined,
		limit: 20,
	});
	const {
		data: searchResponse,
		isLoading: isSearchLoading,
		isFetching: isSearchFetching,
	} = useQuery({
		...searchQueryOptions,
		enabled: searchQuery.length > 0,
	});

	// Carousel data (suspense + loader for LCP)
	const { data: latestData } = useSuspenseQuery(
		orpc.content.latestReleases.queryOptions({
			input: { type: "MOVIE", limit: 10 },
		}),
	);
	const { data: popularSeriesData } = useSuspenseQuery(
		orpc.content.popularSeries.queryOptions({
			input: { limit: 10 },
		}),
	);
	const { data: trendingData } = useSuspenseQuery(
		orpc.recommendations.trending.queryOptions({
			input: { type: "MOVIE", limit: 10, days: 7 },
		}),
	);
	const { data: topRatedData } = useSuspenseQuery(
		orpc.recommendations.topRated.queryOptions({
			input: { type: "MOVIE", limit: 10 },
		}),
	);
	const { data: animationsData } = useSuspenseQuery(
		orpc.content.animations.queryOptions({
			input: { limit: 10 },
		}),
	);

	const latestMovies: MediaList[] = latestData?.data?.items ?? [];
	const popularSeries: MediaList[] = popularSeriesData?.data?.items ?? [];
	const trendingMovies: MediaList[] = trendingData?.data?.items ?? [];
	const topRated: MediaList[] = topRatedData?.data?.items ?? [];
	const animation: MediaList[] = animationsData?.data?.items ?? [];
	const recommended: MediaList[] = [...latestMovies, ...topRated]
		.sort(() => Math.random() - 0.5)
		.slice(0, 6);

	const categories: CategoriesType[] = [
		{ id: "all", label: "All", icon: Sparkles },
		{ id: "movies", label: "Movies", icon: Film },
		{ id: "series", label: "Series", icon: Tv },
		{ id: "animation", label: "Animation", icon: Heart },
		{ id: "trending", label: "Trending", icon: TrendingUp },
		{ id: "recent", label: "Recent", icon: Clock },
		{ id: "favorites", label: "My List", icon: Heart },
	];

	const showSearchResults = searchQuery.length > 0;
	const searchItems: MediaList[] = searchResponse?.data?.items ?? [];
	const searchLoading = isSearchLoading || isSearchFetching;

	return (
		<div
			ref={containerRef}
			className="min-h-screen bg-[#0a0a0a] relative overflow-hidden"
		>
			{/* Animated background layers */}
			<motion.div
				style={{ y: backgroundY }}
				className="fixed inset-0 pointer-events-none"
			>
				<div className="absolute inset-0 bg-linear-to-b from-purple-900/10 via-black to-black" />

				<motion.div
					animate={{
						opacity: [0.3, 0.5, 0.3],
						scale: [1, 1.2, 1],
					}}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
					className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						opacity: [0.2, 0.4, 0.2],
						scale: [1.2, 1, 1.2],
					}}
					transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
					className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
				/>

				<div
					className="absolute inset-0 opacity-5"
					style={{
						backgroundImage:
							"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
					}}
				/>
			</motion.div>

			<SearchHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

			<HeroBanner />

			<div className="relative z-10 max-w-450 mx-auto px-6 mt-20">
				<CategoryNav
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>
			</div>

			{showSearchResults ? (
				<>
					{searchLoading ? (
						<SearchResultsSkeleton />
					) : searchItems.length === 0 ? (
						<SearchResultsEmpty query={searchQuery} />
					) : (
						<SearchResultsList movies={searchItems} />
					)}
				</>
			) : (
				<div className="relative z-10 space-y-12 pb-10 mt-5">
					{latestMovies.length > 0 && (
						<MovieCarousel
							title="Latest Releases"
							subtitle="Fresh from the cinema"
							movies={latestMovies}
							variant="featured"
						/>
					)}

					{trendingMovies.length > 0 && (
						<MovieCarousel
							title="Trending"
							subtitle="Popular this week"
							movies={trendingMovies}
							variant="standard"
						/>
					)}

					{topRated.length > 0 && (
						<MovieCarousel
							title="Top Rated"
							subtitle="Highest rated by critics and audiences"
							movies={topRated}
							variant="standard"
						/>
					)}

					{popularSeries.length > 0 && (
						<MovieCarousel
							title="Popular Series"
							subtitle="Binge-worthy shows everyone's talking about"
							movies={popularSeries}
							variant="standard"
						/>
					)}

					{animation.length > 0 && (
						<MovieCarousel
							title="Animation"
							subtitle="Animated masterpieces for all ages"
							movies={animation}
							variant="standard"
						/>
					)}

					{recommended.length > 0 && (
						<MovieCarousel
							title="Recommended For You"
							subtitle="Based on your viewing history"
							movies={recommended}
							variant="personalized"
						/>
					)}
				</div>
			)}
		</div>
	);
}

