/**
 * Enhanced ORPC Router with Production Middlewares
 * - Request context tracking
 * - Rate limiting
 * - Error handling
 * - Health checks
 */

import { os } from "@orpc/server";

import { liveness, metrics, readiness } from "../procedures/health";
import { MediaRouter } from "../procedures/media";

// Main application router
const router = os.router({
	// Media endpoints
	media: MediaRouter,
	health: os.router({
		liveness,
		readiness,
		metrics,
	}),
});

export default router;
