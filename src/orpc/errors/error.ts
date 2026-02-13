import { ORPCError } from "@orpc/client";

/**
 * Helper function to throw ORPC errors for Prisma database errors
 */
export function throwPrismaError(error: unknown): never {
	// Unique constraint violation
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2002"
	) {
		const field =
			(error as { meta?: { target?: string[] } }).meta?.target?.[0] || "field";
		throw new ORPCError("CONFLICT", {
			message: `A record with this ${field} already exists.`,
			data: { field },
		});
	}

	// Record not found
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2025"
	) {
		throw new ORPCError("NOT_FOUND");
	}

	// Foreign key constraint violation
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2003"
	) {
		throw new ORPCError("VALIDATION_ERROR", {
			message: "Invalid reference. The related record does not exist.",
		});
	}

	// Connection error
	if (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		error.code === "P2024"
	) {
		throw new ORPCError("SERVICE_UNAVAILABLE");
	}

	// Unknown database error
	throw new ORPCError("INTERNAL_ERROR", {
		message:
			process.env.NODE_ENV === "development"
				? error instanceof Error
					? error.message
					: "Database error"
				: "An unexpected error occurred.",
	});
}
