import { base } from "@/orpc/router/base";
import { getAnimations, getLatestReleases, getPopularSeries } from "./get";

export const ContentRouter = base.router({
	latestReleases: getLatestReleases,
	popularSeries: getPopularSeries,
	animations: getAnimations,
});
