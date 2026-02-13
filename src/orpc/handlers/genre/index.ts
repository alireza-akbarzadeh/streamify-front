import { base } from "@/orpc/router/base";
import { bulkCreateGenre, createGenre } from "./create";
import { deleteGenre } from "./delete";
import { getGenre, listGenres } from "./get";
import { updateGenre } from "./update";

export const GenreRouter = base.router({
	create: createGenre,
	bulkCreate: bulkCreateGenre,
	get: getGenre,
	list: listGenres,
	update: updateGenre,
	delete: deleteGenre,
});
