import { base } from "@/orpc/router/base";
import { createCollection } from "./create";
import { deleteCollection } from "./delete";
import { listCollections } from "./get";
import { updateCollection } from "./update";

export const CollectionRouter = base.router({
	list: listCollections,
	create: createCollection,
	update: updateCollection,
	delete: deleteCollection,
});
