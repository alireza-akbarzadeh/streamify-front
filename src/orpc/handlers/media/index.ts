import { base } from "@/orpc/router/base";
import { deleteMedia } from "./delete";
import { getMedia, listMedia } from "./get";
import { createMedia, updateMedia } from "./update";

export const MediaRouter = base.router({
	list: listMedia,
	find: getMedia,
	create: createMedia,
	update: updateMedia,
	delete: deleteMedia,
});
