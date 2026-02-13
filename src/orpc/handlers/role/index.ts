import { base } from "@/orpc/router/base";
import { createRole } from "./create";
import { removeRole, removeRoleFromUser } from "./delete";
import { listRoles } from "./get";
import { assignRoleToUser, updateRole } from "./update";

export const roleRouter = base.router({
	list: listRoles,
	create: createRole,
	update: updateRole,
	removeRole: removeRole,
	assignRole: assignRoleToUser,
	removeRoleFromUser: removeRoleFromUser,
});
