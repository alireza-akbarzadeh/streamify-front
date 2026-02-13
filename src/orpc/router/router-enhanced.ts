/**
 * Enhanced ORPC Router with Production Middlewares
 * - Request context tracking
 * - Rate limiting
 * - Error handling
 * - Health checks
 */

// import { liveness, metrics, readiness } from "../procedures/health";
// health: os.router({
// 	liveness,
// 	readiness,
// 	metrics,
// }),

import { os } from "@orpc/server";

import { MediaRouter } from "../procedures/media";

const router = os.router({
	media: MediaRouter,
});

export default router;
