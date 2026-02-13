import { base } from "@/orpc/router/base";
import { createProfile } from "./create";
import { deleteProfile } from "./delete";
import { getProfile, listProfiles } from "./get";
import { updateProfile } from "./update";

export const ProfileRouter = base.router({
	create: createProfile,
	get: getProfile,
	list: listProfiles,
	update: updateProfile,
	delete: deleteProfile,
});
