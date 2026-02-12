import { os } from "@orpc/server";
import { createMedia, deleteMedia, updateMedia } from "./protected";
import { browseMedia, getMedia } from "./public";

export const MediaRouter = os.router({
	list: browseMedia,
	find: getMedia,
	create: createMedia,
	update: updateMedia,
	delete: deleteMedia,
});
