import { base } from "@/orpc/router/base";
import { getGenreBasedRecommendations, getTopRated, getTrending } from "./get";

export const RecommendationRouter = base.router({
	genreBased: getGenreBasedRecommendations,
	trending: getTrending,
	topRated: getTopRated,
});
