import { base } from "@/orpc/router/base";
import { createPermission } from "./create";
import { deletePermission } from "./delete";
import { getPermission, listPermissions } from "./get";
import { updatePermission } from "./update";

export const PermissionRouter = base.router({
	create: createPermission,
	get: getPermission,
	list: listPermissions,
	update: updatePermission,
	delete: deletePermission,
});
