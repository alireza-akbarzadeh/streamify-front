export interface OrpcError {
	code: string;
	status: number;
	message: string;
	data?: unknown;
	stack?: string;
}

export const unauthorized = (): OrpcError => ({
	code: "UNAUTHENTICATED",
	status: 401,
	message: "Authentication required",
});

export const forbidden = (message = "Forbidden"): OrpcError => ({
	code: "FORBIDDEN",
	status: 403,
	message,
});

export const subscriptionRequired = (required: string): OrpcError => ({
	code: "SUBSCRIPTION_REQUIRED",
	status: 403,
	message: "Subscription required",
	data: { required, upgrade: true },
});

export const notFound = (msg = "Not found") => ({
	code: "NOT_FOUND",
	status: 404,
	message: msg,
});

export const conflict = (msg = "Conflict") => ({
	code: "CONFLICT",
	status: 409,
	message: msg,
});

export const validationError = (details: unknown): OrpcError => ({
	code: "VALIDATION_ERROR",
	status: 422,
	message: "The provided data is invalid.",
	data: details,
});

export const rateLimitExceeded = (resetAt: string): OrpcError => ({
	code: "RATE_LIMIT_EXCEEDED",
	status: 429,
	message: "Too many requests. Please try again later.",
	data: { resetAt },
});

export const internalError = (isDev = false): OrpcError => ({
	code: "INTERNAL_ERROR",
	status: 500,
	message: isDev
		? "An internal server error occurred."
		: "Something went wrong. Please try again later.",
});

export const serviceUnavailable = (): OrpcError => ({
	code: "SERVICE_UNAVAILABLE",
	status: 503,
	message: "Service temporarily unavailable. Please try again later.",
});

/**
 * Error mapper for common Prisma errors
 */
export function mapPrismaError(error: any): OrpcError {
	// Unique constraint violation
	if (error.code === "P2002") {
		const field = error.meta?.target?.[0] || "field";
		return conflict(`A record with this ${field} already exists.`);
	}

	// Record not found
	if (error.code === "P2025") {
		return notFound();
	}

	// Foreign key constraint violation
	if (error.code === "P2003") {
		return validationError(
			"Invalid reference. The related record does not exist.",
		);
	}

	// Connection error
	if (error.code === "P2024") {
		return serviceUnavailable();
	}

	return internalError(process.env.NODE_ENV === "development");
}

/**
 * Global error handler middleware
 */
export function handleError(error: unknown): OrpcError {
	// Already an ORPC error
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		"status" in error
	) {
		return error as OrpcError;
	}

	// Prisma error
	if (error && typeof error === "object" && "code" in error) {
		return mapPrismaError(error);
	}

	// Zod validation error
	if (error && typeof error === "object" && "issues" in error) {
		return validationError((error as any).issues);
	}

	// Generic Error
	if (error instanceof Error) {
		return {
			code: "INTERNAL_ERROR",
			status: 500,
			message:
				process.env.NODE_ENV === "development"
					? error.message
					: "An unexpected error occurred.",
			stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
		};
	}

	return internalError(process.env.NODE_ENV === "development");
}
