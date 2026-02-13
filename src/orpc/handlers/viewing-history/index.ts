import { base } from "@/orpc/router/base";
import { getContinueWatching, getViewingHistory } from "./get";
import { updateProgress } from "./update";

export const ViewingHistoryRouter = base.router({
	update: updateProgress,
	get: getViewingHistory,
	continueWatching: getContinueWatching,
});
