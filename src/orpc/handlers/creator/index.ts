import { base } from "@/orpc/router/base";
import { createCreator } from "./create";
import { deleteCreator } from "./delete";
import { getCreator, listCreators } from "./get";
import { updateCreator } from "./update";

export const CreatorRouter = base.router({
	create: createCreator,
	get: getCreator,
	list: listCreators,
	update: updateCreator,
	delete: deleteCreator,
});
