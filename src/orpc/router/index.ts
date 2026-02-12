import { os } from "@orpc/server";
import { MediaRouter } from "../procedures/media";

const router = os.router({
	media: MediaRouter,
});

export default router;
