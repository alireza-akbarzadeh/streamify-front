import { CollectionRouter } from "../handlers/collection";
import { HealthRouter } from "../handlers/health";
import { MediaRouter } from "../handlers/media";
import { roleRouter } from "../handlers/role";
import { TestAuthRouter } from "../handlers/test-auth";
import { base } from "../router/base";

export const router = base.router({
	health: HealthRouter,
	media: MediaRouter,
	collections: CollectionRouter,
	roles: roleRouter,
	testAuth: TestAuthRouter,
});
