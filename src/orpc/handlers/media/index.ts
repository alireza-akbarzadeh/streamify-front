import { base } from "@/orpc/router/base";
import { bulkCreateMedia, createMedia } from "./create";
import { deleteMedia } from "./delete";
import { getMedia, listMedia } from "./get";
import { updateMedia } from "./update";

export const MediaRouter = base.router({
	list: listMedia,
	find: getMedia,
	create: createMedia,
	bulkCreate: bulkCreateMedia,
	update: updateMedia,
	delete: deleteMedia,
});
